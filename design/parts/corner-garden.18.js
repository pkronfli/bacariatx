  // version 11: NORTH-EAST CORNER GARDEN (Patrick, S011). The grassy bank inside the corner of W 6th and the neighbor's driveway
  // (x 108..137, z 0..17) becomes the showpiece garden: three curved dry-stacked limestone walls step it down from sidewalk level
  // (8.5) to the medium deck (3); Texas natives on the terraces; the existing leaning trees kept and up-lit; a winding flagstone path
  // with steps up to a stone bench overlook; a stone runnel spilling into a bubbling basin by the deck.
  {
  let sd=1103;const rnd=()=>{sd=(sd*16807)%2147483647;return sd/2147483647;};
  const S=Math.sin,PI=Math.PI;
  // wall lines z = zb(x), from the street (A) down to the deck (C); terrace levels [top edge, bottom edge]
  const WALLS=[x=>4.2+1.6*S(PI*(x-108)/29),x=>8.8+1.4*S(PI*(x-104)/33),x=>12.9+1.2*S(PI*(x-112)/27)];
  const TER=[[8.5,7.8],[6.6,6.2],[4.9,4.5],[3.3,3.0]];
  const hG=(x,z)=>{let lo=0;for(let i=0;i<3;i++){const zb=WALLS[i](x)+.2;if(z<zb){const t=Math.max(0,(z-lo)/(zb-lo));return TER[i][0]+(TER[i][1]-TER[i][0])*t;}lo=zb;}
    const t=Math.min(1,(z-lo)/(17-lo));return TER[3][0]+(TER[3][1]-TER[3][0])*t;};
  // terraced ground: mulch with a little grass showing through
  const tg=new T.PlaneGeometry(29,16.7,116,68);tg.rotateX(-PI/2);tg.translate(122.5,0,.3+16.7/2);
  const tp=tg.attributes.position,cols=[];
  for(let i=0;i<tp.count;i++){const x=tp.getX(i),z=tp.getZ(i);tp.setY(i,hG(x,z));const k=.85+rnd()*.3;
    cols.push(...(rnd()<.8?[.43*k,.31*k,.21*k]:[.4*k,.5*k,.26*k]));}
  tg.setAttribute('color',new T.Float32BufferAttribute(cols,3));tg.computeVertexNormals();
  const terr=new T.Mesh(tg,new T.MeshLambertMaterial({vertexColors:true}));terr.receiveShadow=true;scene.add(terr);
  const lime=[mat(0xd9cfb8),mat(0xcbbd9e),mat(0xe4dccb),mat(0xbfb193)];
  const STONE=new T.BoxGeometry(1,1,1);STONE.translate(0,.5,0);
  // the path climbs each wall straight up a pair of limestone steps at these x positions
  const CROSS=[[0,125.5],[1,118.4],[2,126]];   // [wall, x]
  CROSS.forEach(([w,x])=>{const zb=WALLS[w](x),yUp=hG(x,zb-.3),yLo=hG(x,zb+.9),ym=(yUp+yLo)/2;
    box(x-1.6,x+1.6,yLo-.4,yUp+.06,zb-1.05,zb+.5,lime[0]);box(x-1.6,x+1.6,yLo-.4,ym,zb+.5,zb+1.4,lime[2]);});
  // along the garden frontage the solid wood fence gives way to an open iron fence on a limestone curb, so the garden shows from W 6th
  box(108,137.4,7.9,9.0,0,.65,lime[1],fences);
  for(let x=108.2;x<=137.2;x+=7.25){box(x-.2,x+.2,9,14.4,.13,.53,ironM,fences);put(new T.SphereGeometry(.24,8,6),ironM,x,14.6,.33,fences);}
  [9.5,13.6].forEach(y=>box(108,137.4,y-.07,y+.07,.27,.39,ironM,fences));
  for(let x=108.6;x<137;x+=.5)add('g_pk',G.box,ironM,x,9,.33,0,.07,5,.07);
  // dry-stacked walls: three courses of rough limestone blocks following each curve, with a gap at the steps
  const stone=(w,xa,xb,j,n)=>{if(xb-xa<.3)return;const xm=(xa+xb)/2,f=WALLS[w],lo=hG(xm,f(xm)+.9)-.25,hi=hG(xm,f(xm)-.4)+.22,ch=(hi-lo)/n,
      ry=-Math.atan(f(xm+.5)-f(xm-.5)),k=(rnd()*4)|0;
    add('g_lw'+k,STONE,lime[k],xm,lo+j*ch,f(xm)-.125+(rnd()-.5)*.08,ry,xb-xa,ch-.05+(j===n-1?rnd()*.12:0),1.25+(rnd()-.5)*.1);};
  [0,1,2].forEach(w=>{const sx=CROSS.find(c=>c[0]===w)[1];
    for(let j=0;j<3;j++){let x=108.2,first=true;while(x<136.95){let len=first&&j%2?.5+rnd()*.5:1.1+rnd();first=false;len=Math.min(len,136.95-x);
      const xa=x,xb=x+len;x=xb+.06;
      if(xa<sx+1.6&&xb>sx-1.6){stone(w,xa,sx-1.6,j,3);stone(w,sx+1.6,xb,j,3);}else stone(w,xa,xb,j,3);}}});
  // cheek wall where the garden meets the high deck (x 108), a low curb on the deck side
  for(let z=.3;z<17.2;){const len=Math.min(1.1+rnd(),17.3-z),zm=z+len/2,top=Math.max(hG(108.7,zm)+.25,5.55),y0=zm<5?0:4.6,n=Math.max(1,Math.round((top-y0)/.5));
    for(let j=0;j<n;j++){const k=(rnd()*4)|0;add('g_lw'+k,STONE,lime[k],107.8,y0+j*(top-y0)/n,zm,PI/2,len-.06,(top-y0)/n-.04,.85);}z+=len;}
  // winding flagstone path from the medium deck up through the terraces to the bench (segments 1, 4 and 7 are the steps)
  const zA=WALLS[0](125.5),zB=WALLS[1](118.4),zC=WALLS[2](126);
  const PATH=[[126,16.9],[126,zC+1.2],[126,zC-1.2],[122.5,12.1],[118.4,zB+1.2],[118.4,zB-1.2],[121.5,8.0],[125.5,zA+1.2],[125.5,zA-1.2],[123.6,3.6],[121,3.4]];
  const FLAG=new T.CylinderGeometry(1,1,.16,7);FLAG.translate(0,.08,0);
  const flagM=[mat(0xb7aa90),mat(0xa89a80),mat(0xc4b89f)];let fi=0;
  const flag=(x,z,s)=>{const k=fi++%3;add('g_fl'+k,FLAG,flagM[k],x,hG(x,z)-.06,z,rnd()*6,s*(1+rnd()*.25),1,s);};
  for(let i=0;i<PATH.length-1;i++){if(i===1||i===4||i===7)continue;const [ax,az]=PATH[i],[bx,bz]=PATH[i+1],n=Math.max(1,Math.round(Math.hypot(bx-ax,bz-az)/1.45));
    for(let j=0;j<=n;j++){if(j===n&&i<PATH.length-2)continue;const t=j/n;flag(ax+(bx-ax)*t+(rnd()-.5)*.3,az+(bz-az)*t+(rnd()-.5)*.3,.62+rnd()*.2);}}
  [[119.4,3.5],[122.6,3.2],[120.2,4.6],[122,4.5]].forEach(([x,z])=>flag(x,z,.6+rnd()*.15));
  // stone bench overlook under the trees, facing down over the patio
  {const y=hG(121,1.8);box(118.9,119.7,y-.2,y+1.35,1.2,2.4,lime[1]);box(122.3,123.1,y-.2,y+1.35,1.2,2.4,lime[1]);box(118.4,123.6,y+1.35,y+1.75,1.05,2.55,lime[2]);}
  // water feature: a stone runnel along the third terrace spills over wall C into a bubbling limestone basin beside the deck
  const water=new T.MeshPhongMaterial({color:0x5f9fbe,shininess:80,specular:0xddeeff}),sheetM=new T.MeshPhongMaterial({color:0x9cc8dc,transparent:true,opacity:.7,side:T.DoubleSide,shininess:80}),
    foamM=new T.MeshLambertMaterial({color:0xeaf4f7,transparent:true,opacity:.85});
  const RX=115.5,BZ2=15.45,by=hG(RX,BZ2),zR=WALLS[2](RX),yT=hG(RX,zR-.4)+.22;
  {const sh=new T.Shape();sh.absarc(0,0,1.45,0,PI*2,false);const h=new T.Path();h.absarc(0,0,1.1,0,PI*2,true);sh.holes.push(h);
   const geo=new T.ExtrudeGeometry(sh,{depth:1.15,bevelEnabled:false,curveSegments:28});geo.rotateX(-PI/2);put(geo,lime[0],RX,by-.1,BZ2);
   cyl(1.12,.95,RX,by-.1,BZ2,lime[3],24);const wg=new T.CircleGeometry(1.1,28);wg.rotateX(-PI/2);put(wg,water,RX,by+.86,BZ2);
   put(new T.SphereGeometry(.3,12,6,0,PI*2,0,PI/2),foamM,RX,by+.86,BZ2);
   [.5,.8].forEach(r=>{const t=put(new T.TorusGeometry(r,.03,4,28),foamM,RX,by+.88,BZ2);t.rotation.x=PI/2;});}
  box(RX-.5,RX+.5,yT-.55,yT+.18,10.6,zR+1.15,lime[2]);box(RX-.25,RX+.25,yT+.1,yT+.2,10.9,zR+1.15,water);
  {const d=yT+.15-(by+.86),sg=new T.PlaneGeometry(.5,d);put(sg,sheetM,RX,by+.86+d/2,zR+1.12);}
  // trees from the walk-along video: five mature trees with trunks leaning out at angles, kept, each with an up-light
  const TREES=[[111.5,6.8,.38,PI+.4,21,.65,1],[116,2.6,.28,-PI/2-.3,22,.72,1.1],[128.5,2.8,.33,-PI/2+.5,21,.68,1.05],[133.5,8.0,.42,.2,19,.58,.95],[131,11.8,.45,PI/2-.3,18,.55,.9]];
  const BOULD=[[110.6,2.4,1.5],[129.6,6.8,1.3],[112.3,15.8,1.1],[130.6,16.0,1.2],[114.0,11.4,1.0]];
  const Yv=new T.Vector3(0,1,0),fixM=mat(0x3b3226),lensM=new T.MeshBasicMaterial({color:0xffe6b0}),upTrunk=mat(0x4a4038);
  // the page sets every lamp's intensity for day and night; this one warms the up-lit trunks at night
  lamps.push({set intensity(v){upTrunk.emissive.setHex(v?0x4a2e16:0);}});
  TREES.forEach(([x,z,lean,dir,L,r,k],i)=>{
    const o=liveOak({x,y:hG(x,z)-.3,z,F:L*.5,r:r*1.15,R:9.5*k,H:L*.98,n:5,lean:lean*.9,dir,bark:upTrunk,seed:41+i*97});
    const p2=o.crown;
    // up-light: small bronze fixture on the far side of the lean, aimed up the trunk into the canopy (Night button)
    const fx=x-Math.cos(dir)*1.3,fz=z-S(dir)*1.3,fy=hG(fx,fz);
    box(fx-.25,fx+.25,fy-.1,fy+.35,fz-.25,fz+.25,fixM);put(new T.CircleGeometry(.18,10),lensM,fx,fy+.36,fz).rotation.x=-PI/2;
    const sp=new T.SpotLight(0xffd6a0,0,42,.62,.45,1);sp.position.set(fx,fy+.5,fz);sp.target.position.set(p2.x,p2.y,p2.z);
    scene.add(sp,sp.target);lamps.push(sp);});
  const DOD=new T.DodecahedronGeometry(1,0);
  BOULD.forEach(([x,z,s])=>{const k=(rnd()*4)|0;add('g_bd'+k,DOD,lime[k],x,hG(x,z)+.4*s,z,rnd()*6,s*1.4,s*.85,s*1.1);});
  // Texas natives: pink Gulf muhly, Turk's cap with red flowers, salvia, agaves and sotol
  const ICO=new T.IcosahedronGeometry(1,1),LEAF=new T.ConeGeometry(.24,1,5),SPEAR=new T.ConeGeometry(.05,1,3),DOT=new T.SphereGeometry(.12,6,4);
  LEAF.translate(0,.5,0);SPEAR.translate(0,.5,0);
  const muhM=mat(0xd98cb5,{transparent:true,opacity:.85}),muhG=mat(0x8a9a5b),tcLeaf=mat(0x3f6a33),tcRed=mat(0xc8231f),
    salG=mat(0x5f7f4a),salP=mat(0x6a4fb3),salR=mat(0xc23a4a),sotM=mat(0x8d9c7c),stalkM=mat(0xd9caa0);
  const muhly=(x,y,z)=>{const s=.85+rnd()*.35;add('g_mg',ICO,muhG,x,y+.15,z,0,s*.95,s*.5,s*.95);add('g_mh',ICO,muhM,x,y+.8*s,z,rnd()*6,s*1.25,s*.95,s*1.25);};
  const turksCap=(x,y,z)=>{const s=.95+rnd()*.3;add('g_tc',ICO,tcLeaf,x,y+1.2*s,z,rnd()*6,s*1.3,s*1.3,s*1.2);
    for(let i=0;i<10;i++){const a=rnd()*PI*2,e=rnd()*1.2;add('g_tr',DOT,tcRed,x+Math.cos(a)*Math.cos(e)*1.3*s,y+1.2*s+S(e)*1.28*s,z+S(a)*Math.cos(e)*1.2*s);}};
  const salvia=(x,y,z)=>{const s=.75+rnd()*.3,p=rnd()<.6;add('g_sg',ICO,salG,x,y+.3*s,z,rnd()*6,s,s*.6,s);
    for(let i=0;i<7;i++){const a=i/7*PI*2+rnd(),rr=.4*s;add(p?'g_sp':'g_sr',SPEAR,p?salP:salR,x+Math.cos(a)*rr,y+.5*s,z+S(a)*rr,a,1.8,1.1*s,1.8,.25);}};
  const agaveI=(x,y,z)=>{const s=.9+rnd()*.3;for(let i=0;i<11;i++)add('g_ag',LEAF,C.agave,x,y,z,i*2.4,s,(1.9-(i%3)*.3)*s,s,.5+(i%3)*.32);};
  const sotol=(x,y,z,stalk)=>{for(let i=0;i<26;i++)add('g_so',SPEAR,sotM,x,y,z,i*2.4,1.3,2.8+(i%3)*.4,1.3,.15+(i%5)*.22);
    if(stalk){add('g_sk',G.cyl,stalkM,x,y,z,0,.1,7,.1);add('g_sk',G.cyl,stalkM,x,y+5,z,0,.3,2.6,.3);}};
  const distSeg=(px,pz,a,b)=>{const dx=b[0]-a[0],dz=b[1]-a[1],L2=dx*dx+dz*dz;const t=Math.max(0,Math.min(1,L2?((px-a[0])*dx+(pz-a[1])*dz)/L2:0));return Math.hypot(px-a[0]-dx*t,pz-a[1]-dz*t);};
  const PL=[];
  const free=(x,z,r)=>{if(x<108.6+r||x>136.7-r*.6||z<.7+r*.5||z>16.7-r*.4)return false;
    if(WALLS.some(f=>{const zb=f(x);return z>zb-.75-r*.6&&z<zb+.5+r*.8;}))return false;
    for(let i=0;i<PATH.length-1;i++)if(distSeg(x,z,PATH[i],PATH[i+1])<1.1+r)return false;
    if(TREES.some(t=>Math.hypot(x-t[0],z-t[1])<1+r||Math.hypot(x-t[0]+Math.cos(t[3])*1.3,z-t[1]+S(t[3])*1.3)<.6+r))return false;
    if(BOULD.some(b=>Math.hypot(x-b[0],z-b[1])<b[2]*1.4+r))return false;
    if(x>117.8-r&&x<124.2+r&&z<4.4+r)return false;
    if(Math.hypot(x-RX,z-BZ2)<1.6+r||(Math.abs(x-RX)<.6+r&&z>10.3-r&&z<15))return false;
    return !PL.some(p=>Math.hypot(p[0]-x,p[1]-z)<p[2]+r+.15);};
  // Turk's cap along the east fence and the street fence
  for(let z=1.6;z<16.4;z+=2.1)if(free(135.6,z,1.05)){PL.push([135.6,z,1.05]);turksCap(135.6,hG(135.6,z),z);}
  [[110.2,1.5],[112.6,1.4],[131.2,1.4],[133.4,1.6]].forEach(([x,z])=>{if(free(x,z,1.05)){PL.push([x,z,1.05]);turksCap(x,hG(x,z),z);}});
  // the rest of each terrace, drifts of muhly with salvia, agaves and sotol mixed in
  let so=0;
  for(let x=109.6;x<135;x+=1.6)for(let z=1.2;z<16.6;z+=1.6){const px=x+(rnd()-.5)*1,pz=z+(rnd()-.5)*1,r=rnd(),low=pz>12;
    const kind=r<(low?.3:.5)?'m':r<(low?.75:.75)?'s':r<.88?'a':'t',rad={m:.95,s:.7,a:1.1,t:1.2}[kind];
    if(!free(px,pz,rad))continue;PL.push([px,pz,rad]);const y=hG(px,pz);
    kind==='m'?muhly(px,y,pz):kind==='s'?salvia(px,y,pz):kind==='a'?agaveI(px,y,pz):sotol(px,y,pz,so++%2===0);}
  }
