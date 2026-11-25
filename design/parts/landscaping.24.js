  // front path from the W 6th gate to the front door and the steps
  box(41,47,8.5,8.7,0,40,C.rock);box(47,62,8.5,8.7,17,21,C.rock);

  // EXISTING LANDSCAPING seen in the site videos, worked into the concept
  const turf=mat(0x6f9b4a),lawn=mat(0x86a35c),mulch=mat(0x6e4f35),paver=mat(0xdcd7cb),terra=mat(0xb5552f),cedar=mat(0xb9854f),cane=mat(0x7fa650),tuftM=mat(0xa9b06a),leafM=mat(0x4f7a3f);
  // turf lawn beside the building, stamped concrete patio in the south of the garden
  box(66,80,.12,.22,71.5,86,turf);box(96,118,.12,.2,78,88,paver);
  // steel planters with yuccas
  const yucca=(x,y,z)=>{cyl(.25,1.2,x,y,z,C.trunk,6);for(let i=0;i<16;i++){const c=put(new T.ConeGeometry(.16,3,4),C.agave,x,y+1.6,z);
      const a=i*2.4,t=.35+(i%4)*.3;c.rotation.set(Math.sin(a)*t,0,Math.cos(a)*t);c.translateY(1.3);}};
  const bigPlanter=(x,z)=>{box(x-1.5,x+1.5,0,2.5,z-1.5,z+1.5,C.corten);yucca(x,2.5,z);};
  [[79,74],[85.5,42.5],[99.5,42.5],[116.5,47.5],[58.5,72.5]].forEach(([x,z])=>bigPlanter(x,z));
  // mulch beds with grasses at the foot of the decks
  const tuft=(x,z,y)=>{for(let i=0;i<5;i++){const c=put(new T.ConeGeometry(.3,2.2,5),tuftM,x+Math.cos(i*1.3)*.4,(y||.25)+1,z+Math.sin(i*1.3)*.4);c.rotation.set(Math.cos(i*2)*.35,0,Math.sin(i*2)*.35);}};
  box(69,89,.12,.26,40.3,43,mulch);box(95,118.5,.12,.26,40.3,43,mulch);box(116,118.8,.12,.26,43,69.5,mulch);box(116,118.8,.12,.26,74.5,87.8,mulch);
  for(let x=71;x<=81;x+=5)tuft(x,41.6);for(let x=103;x<=113;x+=5)tuft(x,41.6);for(let z=52;z<=67;z+=5)tuft(117.4,z);for(let z=78;z<=83;z+=5)tuft(117.4,z);
  // front terrace: lawn and a mulch ring under the front oak; mulch under the heritage oak; bamboo along the west edge
  box(1,61.6,8.5,8.58,1,40,lawn);cyl(7,.12,32,8.56,18,mulch,20);cyl(9,.15,17,-1.25,108,mulch,20);
  const bamboo=(x,z,y)=>{for(let i=0;i<6;i++)cyl(.12,13+i%3*2,x+Math.cos(i*1.1)*.9,y,z+Math.sin(i*1.1)*.9,cane,5);
    const s=put(new T.IcosahedronGeometry(2.6,1),leafM,x,y+12,z);s.scale.set(1,2.2,1);};
  for(let z=6;z<=36;z+=6)bamboo(3.5,z,8.5);

  // where the courtyard ends, in line with the back of the building (Patrick's Line A, version 22): the wooden fence, like the
  // rest of the property line (version 23), at patio level and on the medium deck; the parking lot is behind it
  const walls=new T.Group();scene.add(walls);
  fence(56.5,88.4,119,88.4,()=>0);fence(119,88.4,137.4,88.4,()=>3);
  const DAVID_TURN=Math.PI;
  // the statue (Robert, S021; version 24): Michelangelo's David, from the Scan the World 3D scan on Wikimedia Commons
  // ("David (Michelangelo).stl"), simplified to 60,000 triangles in design/assets/david.bin, about 7 ft tall on a stone plinth
  // against the back fence at the end of the path from the bar, facing the bar. The file loads after the rest of the model.
  {const SX=92,SZ=86.4,marble=mat(0xece7de),stone=mat(0xb9b2a5),st=new T.Group();st.position.set(SX,3.2,SZ);st.rotation.y=DAVID_TURN;scene.add(st);
   box(90.4,93.6,0,.5,84.9,87.9,stone);box(90.7,93.3,.5,3,85.2,87.6,stone);box(90.5,93.5,3,3.2,85,87.8,stone);
   fetch('assets/david.bin').then(r=>{if(!r.ok)throw new Error('statue '+r.status);return r.arrayBuffer();}).then(b=>{
     // file: "BDV1", vertex and triangle counts, the scan's min corner and size (mm, z up), positions as 16-bit fractions, 16-bit indices
     const dv=new DataView(b),nv=dv.getUint32(4,true),nt=dv.getUint32(8,true),mn=[0,1,2].map(i=>dv.getFloat32(12+i*4,true)),rg=[0,1,2].map(i=>dv.getFloat32(24+i*4,true));
     const q=new Uint16Array(b,36,nv*3),idx=new Uint16Array(b,36+nv*6,nt*3),s=7.2/rg[2],cx=82.5,cy=56.9,pos=new Float32Array(nv*3);
     for(let i=0;i<nv;i++){const x=mn[0]+q[i*3]/65535*rg[0],y=mn[1]+q[i*3+1]/65535*rg[1],z=mn[2]+q[i*3+2]/65535*rg[2];
       pos[i*3]=(x-cx)*s;pos[i*3+1]=(z-mn[2])*s;pos[i*3+2]=-(y-cy)*s;}
     const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(pos,3));g.setIndex(new T.BufferAttribute(idx,1));g.computeVertexNormals();
     const m=new T.Mesh(g,marble);m.castShadow=m.receiveShadow=true;st.add(m);if(window.__bacariInvalidate)window.__bacariInvalidate();})
     .catch(e=>console.warn('statue did not load',e));}
