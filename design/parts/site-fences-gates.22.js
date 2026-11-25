  // site: front terrace at street level, retaining wall and bank, patio pad, sloping back of the lot
  box(0,62,-3,8.5,0,40,C.garden);box(61.6,62.2,-3,8.6,0,40,cmu);
  wedge(0,10,40,85,8.5,-.5,C.garden);
  wedge(62,108,0,4,8.5,4.5,bank);box(62,108,-3,4.5,4,4.8,cmu);
  box(56,137,-3,0,4.8,88.5,C.garden);
  // version 22: the courtyard ends at the wall in line with the back of the building (z 88, Patrick, Line A); behind it is a parking lot
  wedge(0,56,85,130,-.5,-1.9,asph);wedge(56,137,88.5,130,-.4,-1.9,asph);
  {const yAt=z=>-.4-1.5*(z-88.5)/41.5;   // white stall lines, nose-in to the wall, 9 ft stalls 18 ft deep
   for(let x=60;x<=132;x+=9)for(let z=89.5;z<107.5;z+=3)box(x-.2,x+.2,yAt(z+1.5)-.05,yAt(z+1.5)+.05,z,z+3,stripe);
   for(let x=60;x<132;x+=9)for(let z=103.5;z<106.5;z+=3)box(x+3,x+6,yAt(z+1.5)-.05,yAt(z+1.5)+.05,z+1.2,z+1.6,stripe);}
  // wooden fence around the whole property line, following the ground, with a street gate and an alley gate
  const fences=new T.Group();scene.add(fences);
  const fenceM=mat(0xb0834f),fenceP=mat(0x7a5536),gateM=mat(0xcfa873);
  const gW=z=>z<40?8.5:z<85?8.5-9*(z-40)/45:-.5-1.4*(z-85)/45,gE=z=>8.5-7*z/152;
  const fence=(x0,z0,x1,z1,gy,m)=>{const L=Math.hypot(x1-x0,z1-z0),n=Math.max(1,Math.round(L/8)),ax=x0===x1;
    for(let i=0;i<=n;i++){const a=i/n,b=Math.min(1,(i+1)/n),xa=x0+(x1-x0)*a,xb=x0+(x1-x0)*b,za=z0+(z1-z0)*a,zb=z0+(z1-z0)*b,y=gy((za+zb)/2);
      if(i<n){ax?box(xa-.15,xa+.15,y-.6,y+6.5,za,zb,m||fenceM,fences):box(xa,xb,y-.6,y+6.5,za-.15,za+.15,m||fenceM,fences);}
      box(xa-.3,xa+.3,gy(za)-.6,gy(za)+7,za-.3,za+.3,fenceP,fences);}};
  fence(0,.3,41,.3,()=>8.5);// W 6th street gate: two 3 ft leaves hinged on the posts, swung partly open into the front terrace
  // version 7: ornate gate. Two pillars with lanterns, an iron arch with a scroll ring, and two leaves (wood lower panel,
  // iron pickets with finials, a center ring, top rail rising toward the middle), hinged on the pillars and standing partly open.
  const gateFrame=mat(0x5a3d26),ironM=mat(0x1f1d1c),pillarM=mat(0xd9d1c2),capM=mat(0x9a948a),lanternM=new T.MeshBasicMaterial({color:0xffe1a3});
  [[39.6,41],[47,48.4]].forEach(([a,b])=>{box(a,b,8.4,16,-.5,1.1,pillarM,fences);box(a-.2,b+.2,16,16.4,-.7,1.3,capM,fences);box(a-.2,b+.2,8.4,9,-.7,1.3,capM,fences);
    const m=(a+b)/2;box(m-.35,m+.35,16.4,16.55,-.05,.65,ironM,fences);box(m-.28,m+.28,16.55,17.5,.02,.58,lanternM,fences);
    [[-.3,-.3],[.3,-.3],[-.3,.3],[.3,.3]].forEach(([dx,dz])=>box(m+dx-.04,m+dx+.04,16.55,17.5,.3+dz-.04,.3+dz+.04,ironM,fences));
    const roof=put(new T.ConeGeometry(.5,.55,4),ironM,m,17.78,.3,fences);roof.rotation.y=Math.PI/4;});
  {const arch=put(new T.TorusGeometry(3,.09,6,40,Math.PI),ironM,44,16,.3,fences);
   const arch2=put(new T.TorusGeometry(2.6,.06,6,40,Math.PI),ironM,44,16,.3,fences);
   put(new T.TorusGeometry(.6,.06,6,24),ironM,44,17.7,.3,fences);
   [-1,1].forEach(k=>{const sc=put(new T.TorusGeometry(.35,.05,6,16,Math.PI*1.5),ironM,44+k*1.4,16.65,.3,fences);sc.rotation.z=k>0?0:Math.PI/2;});
   for(let i=1;i<8;i++){const a=i/8*Math.PI;box(44+Math.cos(a)*2.6-.03,44+Math.cos(a)*2.6+.03,16+Math.sin(a)*2.6,16+Math.sin(a)*3,.25,.35,ironM,fences);}}
  [[41,1],[47,-1]].forEach(([hx,dir])=>{const leaf=new T.Group();leaf.position.set(hx,0,.3);leaf.rotation.y=-dir*.55;fences.add(leaf);
    const L=2.95,y0=8.1,y1=14.2,rise=.9,mid=y0+3.1,topAt=a=>y1+rise*a/L,X=(a,b)=>[Math.min(dir*a,dir*b),Math.max(dir*a,dir*b)];
    // lower wood panel: vertical boards between the bottom rail and the mid rail
    for(let i=0;i<6;i++){const a=.05+i*L/6,[p,q]=X(a,a+L/6-.06);box(p,q,y0,mid,-.08,.08,gateM,leaf);}
    // frame: bottom and mid rails, hinge and latch stiles
    [y0+.3,mid].forEach(y=>{const [p,q]=X(0,L);box(p,q,y-.18,y+.18,-.14,.14,gateFrame,leaf);});
    {const [p,q]=X(0,.3);box(p,q,y0,topAt(0),-.14,.14,gateFrame,leaf);}
    {const [p,q]=X(L-.3,L);box(p,q,y0,topAt(L),-.14,.14,gateFrame,leaf);}
    // sloped top rail rising toward the middle of the double gate
    {const tr=new T.Mesh(new T.BoxGeometry(Math.hypot(L,rise),.3,.26),gateFrame);tr.position.set(dir*L/2,y1+rise/2,0);tr.rotation.z=dir*Math.atan2(rise,L);tr.castShadow=true;leaf.add(tr);}
    // iron pickets with ball finials poking above the top rail
    for(let i=1;i<=6;i++){const a=i*L/7,t=topAt(a);box(dir*a-.04,dir*a+.04,mid+.18,t+.45,-.04,.04,ironM,leaf);
      put(new T.SphereGeometry(.09,8,6),ironM,dir*a,t+.5,0,leaf);}
    // center ring and two small scrolls in the iron panel
    const ringY=(mid+y1)/2+.1;put(new T.TorusGeometry(.55,.05,6,24),ironM,dir*L/2,ringY,0,leaf);
    put(new T.TorusGeometry(.25,.04,6,16),ironM,dir*L/2,ringY,0,leaf);
    [-1,1].forEach(k=>{const sc=put(new T.TorusGeometry(.22,.04,6,14,Math.PI*1.4),ironM,dir*L/2+k*.85,mid+.55,0,leaf);sc.rotation.z=k*.8;});
    // latch handle
    box(dir*(L-.45)-.06,dir*(L-.45)+.06,11,11.9,.14,.3,C.rail,leaf);});fence(47,.3,108,.3,()=>8.5);   // version 11: open iron fence along the corner garden, below
  fence(.3,.3,.3,130,gW);fence(137.4,.3,137.4,130,gE);
  fence(0,129.7,22,129.7,()=>-1.9);fence(42,129.7,137,129.7,()=>-1.9);
  // version 14: AUTOMATED SLIDING GATE for the back lot. A 20 ft opening (x 22..42) in the alley fence; the gate leaf rolls on a
  // ground track inside the fence and slides west behind it. Drawn partly open (about 9 ft) so it reads as a sliding gate.
  {const yb=-1.9,zg=129.05,open=9,gx0=22-open,gx1=gx0+21,steel=mat(0x2b2724),slat=mat(0xb0834f),galv=mat(0x9a9d9f),motorM=mat(0x3d4246),
     eyeM=new T.MeshBasicMaterial({color:0xd63b2a}),padM=mat(0xb9b5ab);
   box(2,43,yb,yb+.12,zg-.12,zg+.12,galv,fences);                                                      // ground track
   box(gx0,gx1,yb+.55,yb+.85,zg-.14,zg+.14,steel,fences);box(gx0,gx1,yb+6.9,yb+7.2,zg-.14,zg+.14,steel,fences);   // bottom and top rails
   [gx0,gx0+7,gx0+14,gx1-.3].forEach(x=>box(x,x+.3,yb+.55,yb+7.2,zg-.14,zg+.14,steel,fences));                   // uprights
   for(let y=yb+1.05;y<yb+6.8;y+=.62)box(gx0+.3,gx1-.3,y,y+.48,zg-.06,zg+.06,slat,fences);                    // horizontal cedar slats
   [gx0+2,gx1-2].forEach(x=>{const w=put(new T.CylinderGeometry(.32,.32,.22,14),galv,x,yb+.4,zg,fences);w.rotation.x=Math.PI/2;});  // V-wheels on the track
   [[21.4,zg-.45],[21.4,zg+.45]].forEach(([x,z])=>{box(x-.2,x+.2,yb,yb+7.8,z-.2,z+.2,steel,fences);
     put(new T.CylinderGeometry(.16,.16,.3,10),galv,x,yb+7.4,z+(z<zg?.25:-.25),fences);});           // guide posts with top rollers
   box(42.1,42.7,yb,yb+7.8,zg-.35,zg+.35,steel,fences);box(41.9,42.1,yb+3,yb+4.5,zg-.2,zg+.2,galv,fences);  // receiver post and catch
   box(18.2,21,yb,yb+.25,126.4,128.4,padM,fences);box(18.8,20.4,yb+.25,yb+2.1,126.9,128,motorM,fences);   // operator motor on its pad
   box(19.4,19.8,yb+2.1,yb+2.25,127.2,127.7,galv,fences);
   [[22.6,127.9],[41.4,127.9]].forEach(([x,z])=>{box(x-.15,x+.15,yb,yb+2.2,z-.15,z+.15,steel,fences);put(new T.SphereGeometry(.09,8,6),eyeM,x,yb+1.9,z+.18,fences);});  // photo-eye safety posts
   box(45.6,45.9,yb,yb+3.4,132,132.3,steel,fences);box(45.1,45.95,yb+3.4,yb+4.6,131.9,132.4,motorM,fences);}  // keypad pedestal on the alley side
  for(let z=0;z<130;z+=10)box(137,138.2,-3,gE(z+5),z,Math.min(z+10,130),cmu);
