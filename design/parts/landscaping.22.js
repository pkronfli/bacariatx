  // front path from the W 6th gate to the front door and the steps
  box(41,47,8.5,8.7,0,40,C.rock);box(47,62,8.5,8.7,17,21,C.rock);

  // EXISTING LANDSCAPING seen in the site videos, worked into the concept
  const turf=mat(0x6f9b4a),lawn=mat(0x86a35c),mulch=mat(0x6e4f35),paver=mat(0xdcd7cb),terra=mat(0xb5552f),cedar=mat(0xb9854f),cane=mat(0x7fa650),tuftM=mat(0xa9b06a),leafM=mat(0x4f7a3f);
  // turf lawn beside the building, stamped concrete patio in the south of the garden
  box(66,80,.12,.22,71.5,86,turf);box(96,118,.12,.2,78,88,paver);
  // teal block walls with terracotta pots on top
  const pot=(x,y,z)=>{cyl(.7,1.2,x,y,z,terra,10);const s=put(new T.SphereGeometry(.8,8,6),leafM,x,y+1.5,z);s.scale.y=.8;};
  const tealWall=(x0,x1,z0,z1)=>{box(x0,x1,0,7,z0,z1,C.teal);const ax=x1-x0>z1-z0,L=ax?x1-x0:z1-z0,n=Math.max(2,Math.round(L/3.5));
    for(let i=0;i<n;i++){const t=(i+.5)/n;pot(ax?x0+L*t:(x0+x1)/2,7,ax?(z0+z1)/2:z0+L*t);}};
  tealWall(66,78,70.5,71.5);tealWall(66,80,86,87);
  // steel planters with yuccas
  const yucca=(x,y,z)=>{cyl(.25,1.2,x,y,z,C.trunk,6);for(let i=0;i<16;i++){const c=put(new T.ConeGeometry(.16,3,4),C.agave,x,y+1.6,z);
      const a=i*2.4,t=.35+(i%4)*.3;c.rotation.set(Math.sin(a)*t,0,Math.cos(a)*t);c.translateY(1.3);}};
  const bigPlanter=(x,z)=>{box(x-1.5,x+1.5,0,2.5,z-1.5,z+1.5,C.corten);yucca(x,2.5,z);};
  [[79,74],[85.5,42.5],[99.5,42.5],[116.5,47.5],[58.5,72.5]].forEach(([x,z])=>bigPlanter(x,z));
  // cedar slat screens beside the seating pockets
  const screen=(x0,z0,x1,z1)=>{const ax=z0===z1;for(let i=0;i<8;i++){const y=.5+i*.72;ax?box(x0,x1,y,y+.5,z0-.1,z0+.1,cedar):box(x0-.1,x0+.1,y,y+.5,z0,z1,cedar);}
    [[x0,z0],[x1,z1]].forEach(([x,z])=>box(x-.2,x+.2,0,6.4,z-.2,z+.2,C.post));};
  screen(104,68.5,114,68.5);screen(107,75.8,117,75.8);screen(83.5,45,83.5,55);
  // mulch beds with grasses at the foot of the decks
  const tuft=(x,z,y)=>{for(let i=0;i<5;i++){const c=put(new T.ConeGeometry(.3,2.2,5),tuftM,x+Math.cos(i*1.3)*.4,(y||.25)+1,z+Math.sin(i*1.3)*.4);c.rotation.set(Math.cos(i*2)*.35,0,Math.sin(i*2)*.35);}};
  box(69,89,.12,.26,40.3,43,mulch);box(95,118.5,.12,.26,40.3,43,mulch);box(116,118.8,.12,.26,43,69.5,mulch);box(116,118.8,.12,.26,74.5,87.8,mulch);
  for(let x=71;x<=81;x+=5)tuft(x,41.6);for(let x=103;x<=113;x+=5)tuft(x,41.6);for(let z=52;z<=67;z+=5)tuft(117.4,z);for(let z=78;z<=83;z+=5)tuft(117.4,z);
  // front terrace: lawn and a mulch ring under the front oak; mulch under the heritage oak; bamboo along the west edge
  box(1,61.6,8.5,8.58,1,40,lawn);cyl(7,.12,32,8.56,18,mulch,20);cyl(9,.15,17,-1.25,108,mulch,20);
  const bamboo=(x,z,y)=>{for(let i=0;i<6;i++)cyl(.12,13+i%3*2,x+Math.cos(i*1.1)*.9,y,z+Math.sin(i*1.1)*.9,cane,5);
    const s=put(new T.IcosahedronGeometry(2.6,1),leafM,x,y+12,z);s.scale.set(1,2.2,1);};
  for(let z=6;z<=36;z+=6)bamboo(3.5,z,8.5);

  // tall wall where the courtyard ends, in line with the back of the building (version 22, Patrick's Line A); the parking lot is behind it
  const walls=new T.Group();scene.add(walls);
  box(56.5,137,-1,10,88,89,C.wall,walls);
  // version 22 (Robert, S021): a classical marble statue of a nude man on a plinth against the back wall, at the end of the path from the bar
  {const SX=92,SZ=86.4,marble=mat(0xe9e5dc),stone=mat(0xb9b2a5),st=new T.Group();st.position.set(SX,3.2,SZ);st.rotation.y=Math.PI;scene.add(st);
   box(90.4,93.6,0,.5,84.9,87.9,stone);box(90.7,93.3,.5,3,85.2,87.6,stone);box(90.5,93.5,3,3.2,85,87.8,stone);
   const P=(geo,x,y,z,rx,rz,sx,sy,sz)=>{const m=put(geo,marble,x,y,z,st);m.rotation.set(rx||0,0,rz||0);if(sx)m.scale.set(sx,sy,sz);return m;};
   const limb=(r0,r1,L)=>{const g=new T.CylinderGeometry(r1,r0,L,10);g.translate(0,-L/2,0);return g;};
   // legs in contrapposto: weight on the right leg, the left knee eased forward
   P(limb(.3,.2,1.65),-.32,3.15,0,0,.03);P(limb(.2,.15,1.5),-.36,1.5,0,0,0);
   P(limb(.3,.2,1.6),.34,3.15,0,.12,-.06);P(limb(.2,.15,1.5),.42,1.56,.2,-.12,0);
   P(new T.BoxGeometry(.38,.14,.75),-.36,.07,.12);P(new T.BoxGeometry(.38,.14,.75),.44,.07,.22);
   // hips, torso, shoulders, neck, head
   P(new T.SphereGeometry(.5,12,8),0,3.25,0,0,.05,1.08,.72,.78);
   P(new T.CylinderGeometry(.68,.5,1.9,12),0,4.35,0,0,-.04,1,1,.62);
   P(new T.SphereGeometry(.45,12,8),0,5.25,0,0,0,1.75,.62,.85);
   P(new T.CylinderGeometry(.17,.2,.45,10),0,5.6,0);
   P(new T.SphereGeometry(.36,14,10),.04,6.08,.03,0,0,1,1.18,1);
   P(new T.SphereGeometry(.37,12,8),.04,6.24,-.05,0,0,1.02,.7,1.02);   // curls
   // right arm hanging, left arm bent up to the shoulder
   P(limb(.17,.13,1.35),-.82,5.35,0,0,-.12);P(limb(.13,.1,1.25),-.98,4.02,0,0,.05);P(new T.SphereGeometry(.14,8,6),-.93,2.8,0);
   P(limb(.17,.13,1.3),.82,5.35,0,-.5,0);P(limb(.13,.1,1.15),.82,4.21,.62,2.89,0);P(new T.SphereGeometry(.14,8,6),.8,5.3,.35);
   // joints, so the limbs read as one figure
   const J=new T.SphereGeometry(1,10,8);[[-.32,1.5,0,.2],[.4,1.55,.2,.2],[-.98,4.02,0,.135],[.82,4.21,.62,.135],[-.8,5.3,0,.2],[.8,5.3,0,.2]].forEach(([x,y,z,r])=>P(J,x,y,z,0,0,r,r,r));}
