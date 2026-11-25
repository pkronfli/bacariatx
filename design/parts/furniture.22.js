  // furniture and planting
  // FURNITURE in the style of Bacari's LA patios (Silver Lake, W 3rd): 30-inch square walnut tops on black iron bases,
  // French rattan bistro chairs with woven seats, navy banquettes with striped cushions and bright pillows. Instanced for speed.
  const IN={};const inst=(k,geo,m)=>{IN[k]=IN[k]||{geo,m,list:[]};return IN[k];};
  const O=new T.Object3D();O.rotation.order='YXZ';
  const add=(k,geo,m,x,y,z,ry,sx,sy,sz,rx)=>{O.position.set(x,y,z);O.rotation.set(rx||0,ry||0,0);O.scale.set(sx||1,sy||1,sz||1);O.updateMatrix();inst(k,geo,m).list.push(O.matrix.clone());};
  const G={box:new T.BoxGeometry(1,1,1),cyl:new T.CylinderGeometry(.5,.5,1,10),hoop:new T.TorusGeometry(.62,.06,6,16,Math.PI),foot:new T.TorusGeometry(.58,.045,6,20)};
  G.foot.rotateX(Math.PI/2);
  G.cyl.translate(0,.5,0);G.box.translate(0,.5,0);
  const F={walnut:mat(0x5a3823),iron:mat(0x1d1d1f),rattan:mat(0xa77445),weave:mat(0x8c8578),navy:mat(0x2b3d5e),cush:mat(0xcfc8b8)};
  // fabric textures drawn in code: grey ticking stripe for seats, bright prints for back cushions (as at Silver Lake)
  const fabric=draw=>{const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');draw(g);const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;return t;};
  const stripeTex=fabric(g=>{g.fillStyle='#d9d4c7';g.fillRect(0,0,128,128);g.fillStyle='#7d7f86';for(let x=0;x<128;x+=16)g.fillRect(x,0,6,128);});
  stripeTex.repeat.set(6,1);
  const print=(bg,a,b,c)=>fabric(g=>{g.fillStyle=bg;g.fillRect(0,0,128,128);
    for(let i=0;i<4;i++)for(let j=0;j<4;j++){const x=i*32+16,y=j*32+16;g.fillStyle=(i+j)%2?a:b;g.beginPath();g.moveTo(x,y-13);g.lineTo(x+11,y);g.lineTo(x,y+13);g.lineTo(x-11,y);g.closePath();g.fill();
      g.fillStyle=c;g.beginPath();g.arc(x,y,4,0,Math.PI*2);g.fill();g.fillStyle=a;g.beginPath();g.arc(x+16,y+16,3,0,Math.PI*2);g.fill();}});
  const prints=[print('#d6457a','#f2a33a','#3b2b6b','#f7e7c6'),print('#2f8f8a','#e3c04a','#c2412d','#f7e7c6'),print('#e08a2e','#7a2e6b','#2f6f9a','#fbe9c8'),
    print('#6b3f8f','#e86aa0','#f2c14e','#f3ecdf'),print('#b33b3b','#2b3d5e','#e9b44c','#f6ead6'),print('#2c5aa0','#f08a5d','#7cc4b8','#f8eedf')];
  const pillowM=prints.map(t=>new T.MeshLambertMaterial({map:t}));
  const seatM=new T.MeshLambertMaterial({map:stripeTex});
  const loc=(x,z,ry,dx,dz)=>[x+dx*Math.cos(ry)+dz*Math.sin(ry),z-dx*Math.sin(ry)+dz*Math.cos(ry)];
  // bistro chair at (x,z) on floor y, facing angle ry (0 = facing +z)
  const chair=(x,y,z,ry)=>{
    [[-.6,-.6],[.6,-.6],[-.6,.6],[.6,.6]].forEach(([dx,dz])=>{const [px,pz]=loc(x,z,ry,dx,dz);add('cl',G.cyl,F.rattan,px,y,pz,0,.1,1.55,.1);});
    add('cs',G.box,F.weave,x,y+1.45,z,ry,1.4,.14,1.35);
    const [bx,bz]=loc(x,z,ry,0,-.68);add('cb',G.box,F.weave,bx,y+1.6,bz,ry,1.15,1.15,.08);
    add('ch',G.hoop,F.rattan,bx,y+2.75,bz,ry,1,1,1,0);
    [[-.62],[.62]].forEach(([dx])=>{const [px,pz]=loc(x,z,ry,dx,-.68);add('cu',G.cyl,F.rattan,px,y+1.5,pz,0,.09,1.3,.09);});};
  // table: w x d feet (2.5 = 30 in), black iron base, walnut top at 30 in
  const TBLS=[];
  const tbl=(x,y,z,w,d,ry)=>{TBLS.push([x,y,z,w,d,ry]);add('tt',G.box,F.walnut,x,y+2.38,z,ry,w,.14,d);
    const posts=w>3.5||d>3.5?[[-(w/2-1.25),0],[w/2-1.25,0]]:[[0,0]];
    posts.forEach(([dx,dz])=>{const [px,pz]=loc(x,z,ry,dx,dz);add('tp',G.cyl,F.iron,px,y,pz,0,.2,2.38,.2);
      add('tb',G.box,F.iron,px,y,pz,ry+Math.PI/4,1.7,.08,.18);add('tb',G.box,F.iron,px,y,pz,ry-Math.PI/4,1.7,.08,.18);});};
  // two-top with chairs on both sides (ry = direction the long axis faces)
  const two=(x,y,z,ry,bench)=>{tbl(x,y,z,2.5,2.5,ry);if(!bench){const [ax,az]=loc(x,z,ry,0,-2.1);chair(ax,y,az,ry);}
    const [cx,cz]=loc(x,z,ry,0,2.1);chair(cx,y,cz,ry+Math.PI);};
  // four-top: two 30-in squares pushed together, two chairs per long side
  const four=(x,y,z,ry,n)=>{n=n||4;const w=n===6?7.5:5;tbl(x,y,z,w,2.5,ry);
    const per=n/2;for(let i=0;i<per;i++){const dx=-w/2+w/per*(i+.5);
      const [ax,az]=loc(x,z,ry,dx,-2.1);chair(ax,y,az,ry);const [cx,cz]=loc(x,z,ry,dx,2.1);chair(cx,y,cz,ry+Math.PI);}};
  // banquette from (x0,z0) to (x1,z1), seat facing direction ry
  let pc=0;const banq=(x0,z0,x1,z1,y,ry)=>{const L=Math.hypot(x1-x0,z1-z0),mx=(x0+x1)/2,mz=(z0+z1)/2;
    add('bq',G.box,F.navy,mx,y,mz,ry,L,1.4,2.1);const [kx,kz]=loc(mx,mz,ry,0,-.85);add('bk',G.box,F.navy,kx,y,kz,ry,L,3.2,.4);
    add('bc',G.box,seatM,mx,y+1.4,mz,ry,L-.2,.35,2);
    // full-length back cushions, one per seat, each in a different print
    const n=Math.max(1,Math.round(L/2.5)),w=L/n;
    for(let i=0;i<n;i++){const t=(i+.5)/n,px=x0+(x1-x0)*t,pz=z0+(z1-z0)*t,[qx,qz]=loc(px,pz,ry,0,-.5),k=pc++%pillowM.length;
      add('p'+k,G.box,pillowM[k],qx,y+1.7,qz,ry,w-.12,1.55,.42,-.16);}};
  const table=(x,y,z,n,big,ry)=>{ry=ry||0;if(n>=6)four(x,y,z,ry,6);else if(n>=4)four(x,y,z,ry);else two(x,y,z,ry);};
  const agave=(x,y,z)=>{for(let i=0;i<7;i++){const c=put(new T.ConeGeometry(.22,2.2,5),C.agave,x,y+1,z);c.rotation.set(Math.cos(i)*.7,i,Math.sin(i*1.7)*.7);}};
  const planter=(x0,x1,z0,z1)=>{box(x0,x1,0,2.2,z0,z1,C.corten);const cx=(x0+x1)/2,cz=(z0+z1)/2,L=Math.max(x1-x0,z1-z0),along=x1-x0>z1-z0;
    for(let k=-1;k<=1;k+=2)agave(along?cx+k*L/4:cx,2.2,along?cz:cz+k*L/4);};
  [[72,79,0],[111,83,0],[111,58,Math.PI/2],[103,49,0]].forEach(([x,z,r])=>table(x,.22,z,4,true,r));
  // bar stools: four-leg French rattan bistro bar stools, woven seat at 30 in (for the 42-44 in bar top), footrest ring, hoop back
  stoolRing.forEach(a=>{const x=BX+Math.cos(a)*8.6,z=BZ+Math.sin(a)*8.6,ry=Math.atan2(-Math.cos(a),-Math.sin(a)),y=.31;
    [[-.48,-.48],[.48,-.48],[-.48,.48],[.48,.48]].forEach(([dx,dz])=>{const [px,pz]=loc(x,z,ry,dx,dz);add('sl',G.cyl,F.rattan,px,y,pz,0,.13,2.35,.13);});
    add('sf',G.foot,F.rattan,x,y+.95,z,ry);
    add('ss',G.cyl,F.weave,x,y+2.35,z,0,1.45,.16,1.45);add('sr',G.foot,F.rattan,x,y+2.45,z,ry,1.22,1,1.22);
    [[-.58],[.58]].forEach(([dx])=>{const [px,pz]=loc(x,z,ry,dx,-.6);add('su',G.cyl,F.rattan,px,y+2.45,pz,0,.1,1.25,.1);});
    const [bx,bz]=loc(x,z,ry,0,-.62);add('sb',G.box,F.weave,bx,y+2.65,bz,ry,1.1,.95,.08);
    add('sh',G.hoop,F.rattan,bx,y+3.65,bz,ry,.95,.8,1);});
  const flush=()=>{Object.values(IN).forEach(({geo,m,list})=>{const im=new T.InstancedMesh(geo,m,list.length);list.forEach((mx,i)=>im.setMatrixAt(i,mx));
    im.castShadow=true;im.receiveShadow=true;scene.add(im);});};
  planter(96,102,53,55.5);planter(80,86,61.5,64);planter(100,106,85,87.5);planter(106,112,65,67.5);
  [[111,44],[87,46.5],[106,78.5],[68,61.5]].forEach(([x,z])=>{const sh=put(new T.SphereGeometry(1.6,10,8),C.shrub,x,1.1,z);sh.scale.y=.7;});
  // version 8: some two-tops become four-tops (Robert, S008), keeping 3½ ft+ aisles and clear of the high-deck oak at (100,14)
  const FOUR8=new Set(['70,11','86,11','70,29','102,29']);
  for(let x=70;x<=102;x+=8){table(x,5,11,FOUR8.has(x+',11')?4:2);if(x<88||x>96)table(x,5,29,FOUR8.has(x+',29')?4:2);}
  [[121,22,4],[133,22,4],[115,31,4],[128,31,2]].forEach(([x,z,n])=>table(x,3,z,n));   // version 11: off the bank, medium deck from z 17
  // version 4: more two-tops, keeping staff aisles of about 3½ ft or more
  [[16,12,4],[16,27,4],[54,10,2],[54,30,2]].forEach(([x,z,n])=>table(x,8.58,z,n));            // front terrace lawn
  for(let z=48;z<=84;z+=8)two(129.6,3,z,-Math.PI/2,true);banq(132.4,45,132.4,87,3,-Math.PI/2);
  [[30,89.5,Math.PI/2],[38,89.5,Math.PI/2],[50,89.5,Math.PI/2],[60,82,0],[60,72,0]].forEach(([x,z,r])=>table(x,10,z,2,false,r));
  {const x0=69,x1=81,z0=44,z1=55;[[x0,z0],[x1,z0],[x0,z1],[x1,z1]].forEach(([x,z])=>box(x-.3,x+.3,0,9,z-.3,z+.3,C.post));
   box(x0-.5,x1+.5,8.6,9.2,z0-.3,z0+.3,C.post);box(x0-.5,x1+.5,8.6,9.2,z1-.3,z1+.3,C.post);
   for(let x=x0;x<=x1;x+=1.5)box(x-.12,x+.12,9.2,9.6,z0-1,z1+1,C.wood);table(75,.12,49.5,6,true);}
