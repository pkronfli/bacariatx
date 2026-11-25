// Layout check for tables, chairs and banquettes.
//   node _tools/layout.mjs            checks the version being edited in _work/ (builds a preview first)
//   node _tools/layout.mjs --v 28     checks a published version
// For every piece of furniture it looks straight down at its corners and middle: the first thing under it must be the
// floor it stands on (not a deck edge, planter, bed, plant, path light or rail, and not empty air past an edge). It also
// checks that no two pieces overlap. Prints one line per problem and exits 1 if there are any.
import fs from 'fs';import path from 'path';import http from 'http';import os from 'os';import {execFileSync} from 'child_process';
import {createRequire} from 'module';import {fileURLToPath} from 'url';
const req=createRequire(import.meta.url);const pw=req('/opt/npm-tools/node_modules/playwright');
const HERE=path.dirname(fileURLToPath(import.meta.url)),REPO=path.dirname(HERE),three=path.join(HERE,'.cache','package');
const arg=k=>{const i=process.argv.indexOf(k);return i>0?process.argv[i+1]:null;};
let SITE=REPO,V=arg('--v');
if(!V){SITE=fs.mkdtempSync(path.join(os.tmpdir(),'bacari-layout-'));execFileSync('node',[path.join(HERE,'model.mjs'),'preview',SITE],{stdio:'ignore'});
  const vs=JSON.parse(fs.readFileSync(path.join(SITE,'design','versions.json')));V=String(vs.versions[vs.versions.length-1].n);}
if(!fs.existsSync(path.join(three,'build','three.min.js'))){console.error('run node _tools/render.mjs once first (it caches three.js)');process.exit(2);}
const type=f=>f.endsWith('.html')?'text/html':f.endsWith('.json')?'application/json':f.endsWith('.bin')?'application/octet-stream':'text/javascript';
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p.endsWith('/'))p+='index.html';const f=path.join(SITE,p);
  if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.writeHead(404);return r.end();}r.writeHead(200,{'Content-Type':type(f)});fs.createReadStream(f).pipe(r);});
await new Promise(o=>srv.listen(0,'127.0.0.1',o));
const HOOK=`;(function(){const W=THREE.WebGLRenderer;THREE.WebGLRenderer=function(o){const r=new W(o);const rd=r.render.bind(r);r.render=(s,c)=>{window.__scene=s;window.__frames=(window.__frames||0)+1;return rd(s,c);};return r;};})();`;
const b=await pw.chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--no-sandbox']});
const pg=await (await b.newContext({viewport:{width:900,height:700}})).newPage();
const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.route(/three\.min\.js/,r=>r.fulfill({contentType:'text/javascript',body:fs.readFileSync(three+'/build/three.min.js','utf8')+HOOK}));
await pg.route(/OrbitControls\.js/,r=>r.fulfill({contentType:'text/javascript',body:fs.readFileSync(three+'/examples/js/controls/OrbitControls.js','utf8')}));
await pg.route(/script\.google\.com/,r=>r.fulfill({contentType:'application/json',body:JSON.stringify({ok:true,live:+V,items:[]})}));
await pg.route(/fonts\./,r=>r.abort());
await pg.goto(`http://127.0.0.1:${srv.address().port}/design/?nobatch&r=${V}#v${V}`);
await pg.waitForFunction(()=>(window.__frames||0)>=2&&window.__bacariFurn,null,{timeout:180000});await pg.waitForTimeout(1500);
const out=await pg.evaluate(()=>{
  const T=THREE,F=window.__bacariFurn,S=window.__scene,obs=[];
  S.updateMatrixWorld(true);S.traverse(o=>{if(o.isMesh&&o.visible&&!o.userData.furn)obs.push(o);});
  const NOT_FLOOR={'6e4f35':'a planting bed (mulch)','b4aea2':'a river-rock path','a9b06a':'grasses'};
  const rc=new T.Raycaster(),down=new T.Vector3(0,-1,0),up=new T.Vector3(0,1,0),probs=[];
  obs.forEach(o=>{const m=Array.isArray(o.material)?o.material:[o.material];m.forEach(x=>{x.side=T.DoubleSide;});});
  const BX=obs.map(o=>new T.Box3().setFromObject(o));
  const pts=(f,inset,n)=>{const hw=f.w/2-inset,hd=f.d/2-inset,c=Math.cos(f.ry),s=Math.sin(f.ry),P=[];
    for(let a=0;a<n;a++)for(let b=0;b<n;b++){const dx=(a/(n-1)*2-1)*hw,dz=(b/(n-1)*2-1)*hd;P.push([f.x+dx*c+dz*s,f.z-dx*s+dz*c]);}return P;};
  const what=o=>{let n=o.name||'';for(let p=o.parent;!n&&p&&p!==S;p=p.parent)n=p.name||'';
    const c=o.material&&o.material.color?'#'+o.material.color.getHexString():'?';return (n?n+' ':'')+c+' '+o.geometry.type.replace('BufferGeometry','');};
  F.forEach((f,i)=>{const top=f.k==='banquette'?4.6:f.k==='table'?2.5:3.4;
    // the pieces' own box, to pick the few objects near it
    const fb=new T.Box3(new T.Vector3(f.x-Math.max(f.w,f.d),f.y+.15,f.z-Math.max(f.w,f.d)),new T.Vector3(f.x+Math.max(f.w,f.d),f.y+top,f.z+Math.max(f.w,f.d)));
    const near=obs.filter((o,k)=>BX[k].intersectsBox(fb));
    let bad=null;
    // 1. is any point of the piece inside something solid? (a ray straight up crosses that object's surface an odd number of times)
    for(const [px,pz] of pts(f,.08,5)){for(const h of [.4,1.4,top-.15]){rc.set(new T.Vector3(px,f.y+h,pz),up);rc.far=80;
      const cnt=new Map();rc.intersectObjects(near,false).forEach(x=>cnt.set(x.object,(cnt.get(x.object)||0)+1));
      for(const [o,c] of cnt)if(c%2){bad=`runs into something at ${h.toFixed(1)} ft (${what(o)})`;break;}if(bad)break;}
      if(bad){probs.push({i,f,p:[px,pz],why:bad});break;}}
    if(bad)return;
    // 2. is there floor under every corner?
    for(const [px,pz] of pts(f,.1,4)){rc.set(new T.Vector3(px,f.y+.5,pz),down);rc.far=1.5;const h=rc.intersectObjects(obs,false)[0];
      if(!h||h.point.y<f.y-.35){probs.push({i,f,p:[px,pz],why:h?`hangs over a drop of ${(f.y-h.point.y).toFixed(1)} ft`:'nothing under it (past an edge)'});break;}
      const col=h.object.material&&h.object.material.color?h.object.material.color.getHexString():'';
      if(NOT_FLOOR[col]){probs.push({i,f,p:[px,pz],why:'stands on '+NOT_FLOOR[col]});break;}}});
  // overlaps between pieces (rotated rectangles, separating-axis test)
  const corners=f=>{const c=Math.cos(f.ry),s=Math.sin(f.ry),hw=f.w/2,hd=f.d/2;return [[-hw,-hd],[hw,-hd],[hw,hd],[-hw,hd]].map(([dx,dz])=>[f.x+dx*c+dz*s,f.z-dx*s+dz*c]);};
  const sep=(A,B)=>{for(const P of [A,B])for(let i=0;i<4;i++){const [x1,z1]=P[i],[x2,z2]=P[(i+1)%4],nx=z2-z1,nz=x1-x2;
    const pa=A.map(([x,z])=>x*nx+z*nz),pb=B.map(([x,z])=>x*nx+z*nz),L=Math.hypot(nx,nz)*.08;
    if(Math.max(...pa)<=Math.min(...pb)+L||Math.max(...pb)<=Math.min(...pa)+L)return true;}return false;};
  const C=F.map(corners);
  for(let i=0;i<F.length;i++)for(let j=i+1;j<F.length;j++){const a=F[i],b=F[j];if(Math.abs(a.y-b.y)>1||Math.hypot(a.x-b.x,a.z-b.z)>9)continue;
    if(!sep(C[i],C[j]))probs.push({i,f:a,p:[a.x,a.z],why:`overlaps the ${b.k} at (${b.x.toFixed(1)}, ${b.z.toFixed(1)})`});}
  const seats=F.filter(f=>f.k==='chair').length+F.filter(f=>f.k==='banquette').reduce((n,f)=>n+Math.round(f.w/2.5),0);
  return {n:F.length,seats,probs:probs.map(p=>({k:p.f.k,at:[+p.f.x.toFixed(1),+p.f.y.toFixed(1),+p.f.z.toFixed(1)],p:p.p.map(v=>+v.toFixed(1)),why:p.why}))};});
console.log(`version ${V}: ${out.n} pieces, about ${out.seats} seats (chairs plus banquette places, bar stools not counted)`);
out.probs.forEach(p=>console.log(`  ${p.k} at x ${p.at[0]}, floor ${p.at[1]}, z ${p.at[2]}: ${p.why} near (${p.p[0]}, ${p.p[1]})`));
if(errs.length)console.log('page errors:',errs);
console.log(out.probs.length?`${out.probs.length} problems`:'No problems.');
await b.close();srv.close();process.exit(out.probs.length||errs.length?1:0);
