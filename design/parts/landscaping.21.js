  // front path from the W 6th gate to the front door and the steps
  box(41,47,8.5,8.7,0,40,C.rock);box(47,62,8.5,8.7,17,21,C.rock);

  // EXISTING LANDSCAPING seen in the site videos, worked into the concept
  const turf=mat(0x6f9b4a),lawn=mat(0x86a35c),mulch=mat(0x6e4f35),paver=mat(0xdcd7cb),terra=mat(0xb5552f),cedar=mat(0xb9854f),cane=mat(0x7fa650),tuftM=mat(0xa9b06a),leafM=mat(0x4f7a3f);
  // turf lawn beside the building, stamped concrete patio in the south of the garden
  box(57,137,.12,.2,105,127.3,paver);  // version 21: paving under the back seating
  // teal block walls with terracotta pots on top
  const pot=(x,y,z)=>{cyl(.7,1.2,x,y,z,terra,10);const s=put(new T.SphereGeometry(.8,8,6),leafM,x,y+1.5,z);s.scale.y=.8;};
  const tealWall=(x0,x1,z0,z1)=>{box(x0,x1,0,7,z0,z1,C.teal);const ax=x1-x0>z1-z0,L=ax?x1-x0:z1-z0,n=Math.max(2,Math.round(L/3.5));
    for(let i=0;i<n;i++){const t=(i+.5)/n;pot(ax?x0+L*t:(x0+x1)/2,7,ax?(z0+z1)/2:z0+L*t);}};
  // version 21 (Patrick, S017): the teal block walls and the turf lawn are taken out
  // steel planters with yuccas
  const yucca=(x,y,z)=>{cyl(.25,1.2,x,y,z,C.trunk,6);for(let i=0;i<16;i++){const c=put(new T.ConeGeometry(.16,3,4),C.agave,x,y+1.6,z);
      const a=i*2.4,t=.35+(i%4)*.3;c.rotation.set(Math.sin(a)*t,0,Math.cos(a)*t);c.translateY(1.3);}};
  const bigPlanter=(x,z)=>{box(x-1.5,x+1.5,0,2.5,z-1.5,z+1.5,C.corten);yucca(x,2.5,z);};
  [[85.5,42.5],[99.5,42.5],[116.5,47.5],[116.5,93.5],[58.5,72.5]].forEach(([x,z])=>bigPlanter(x,z));
  // cedar slat screens beside the seating pockets
  const screen=(x0,z0,x1,z1)=>{const ax=z0===z1;for(let i=0;i<8;i++){const y=.5+i*.72;ax?box(x0,x1,y,y+.5,z0-.1,z0+.1,cedar):box(x0-.1,x0+.1,y,y+.5,z0,z1,cedar);}
    [[x0,z0],[x1,z1]].forEach(([x,z])=>box(x-.2,x+.2,0,6.4,z-.2,z+.2,C.post));};
  // version 21 (S017): the cedar slat screens are taken out
  // mulch beds with grasses at the foot of the decks
  const tuft=(x,z,y)=>{for(let i=0;i<5;i++){const c=put(new T.ConeGeometry(.3,2.2,5),tuftM,x+Math.cos(i*1.3)*.4,(y||.25)+1,z+Math.sin(i*1.3)*.4);c.rotation.set(Math.cos(i*2)*.35,0,Math.sin(i*2)*.35);}};
  box(69,89,.12,.26,40.3,43,mulch);box(95,118.5,.12,.26,40.3,43,mulch);box(116,118.8,.12,.26,43,79,mulch);
  for(let x=71;x<=81;x+=5)tuft(x,41.6);for(let x=103;x<=113;x+=5)tuft(x,41.6);for(let z=52;z<=77;z+=5)tuft(117.4,z);
  // front terrace: lawn and a mulch ring under the front oak; mulch under the heritage oak; bamboo along the west edge
  box(1,61.6,8.5,8.58,1,40,lawn);cyl(7,.12,32,8.56,18,mulch,20);cyl(9,.15,17,-1.25,108,mulch,20);
  const bamboo=(x,z,y)=>{for(let i=0;i<6;i++)cyl(.12,13+i%3*2,x+Math.cos(i*1.1)*.9,y,z+Math.sin(i*1.1)*.9,cane,5);
    const s=put(new T.IcosahedronGeometry(2.6,1),leafM,x,y+12,z);s.scale.set(1,2.2,1);};
  for(let z=6;z<=36;z+=6)bamboo(3.5,z,8.5);

  // tall back wall, and a screen wall hiding the service yard behind the building
  const walls=new T.Group();scene.add(walls);
  box(55.5,137,-2,10,127.3,128.3,C.wall,walls);box(55.5,56.5,-1.5,9,93.4,128.3,C.wall,walls);
