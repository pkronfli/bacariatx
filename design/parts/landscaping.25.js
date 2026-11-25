  // front path from the W 6th gate to the front door and the steps
  box(41,47,8.5,8.7,0,40,C.rock);box(47,62,8.5,8.7,17,21,C.rock);

  // EXISTING LANDSCAPING seen in the site videos, worked into the concept
  const turf=mat(0x6f9b4a),lawn=mat(0x86a35c),mulch=mat(0x6e4f35),paver=mat(0xdcd7cb),terra=mat(0xb5552f),cedar=mat(0xb9854f),cane=mat(0x7fa650),tuftM=mat(0xa9b06a),leafM=mat(0x4f7a3f);
  // turf lawn beside the building, stamped concrete patio in the south of the garden
  box(66,86,.12,.22,63,83,turf);box(98,118,.12,.2,63,84,paver);   // version 25: lawn pocket (south-west), stamped concrete pocket (south-east)
  box(97,117,.12,.18,30,49,mat(0xcbbf9f));                         // decomposed granite under the north-east pocket
  // steel planters with yuccas
  const yucca=(x,y,z)=>{cyl(.25,1.2,x,y,z,C.trunk,6);for(let i=0;i<16;i++){const c=put(new T.ConeGeometry(.16,3,4),C.agave,x,y+1.6,z);
      const a=i*2.4,t=.35+(i%4)*.3;c.rotation.set(Math.sin(a)*t,0,Math.cos(a)*t);c.translateY(1.3);}};
  const bigPlanter=(x,z)=>{box(x-1.5,x+1.5,0,2.5,z-1.5,z+1.5,C.corten);yucca(x,2.5,z);};
  [[86,26.5],[98,26.5],[116.5,52],[116.5,61],[68,52],[68,90]].filter(([x,z])=>z<88).forEach(([x,z])=>bigPlanter(x,z));
  // mulch beds with grasses at the foot of the decks, and (version 25) along the cross paths, so each pocket is its own planted zone
  const tuft=(x,z,y)=>{for(let i=0;i<5;i++){const c=put(new T.ConeGeometry(.3,2.2,5),tuftM,x+Math.cos(i*1.3)*.4,(y||.25)+1,z+Math.sin(i*1.3)*.4);c.rotation.set(Math.cos(i*2)*.35,0,Math.sin(i*2)*.35);}};
  [[66,89,23.3,26],[95,118.5,23.3,26],[116,118.8,26,53],[116,118.8,60,87.8],[87.2,89.8,29,44],[94.2,96.8,29,44],[87.2,89.8,69,83],[94.2,96.8,69,83],
   [66,79.5,51.6,54.4],[104.5,115.8,51.6,54.4],[70.5,79.5,58.6,61.4],[104.5,115.8,58.6,61.4]].forEach(([x0,x1,z0,z1])=>{box(x0,x1,.12,.26,z0,z1,mulch);
    const ax=x1-x0>z1-z0,L=ax?x1-x0:z1-z0;for(let t=2;t<L-1;t+=4.5)tuft(ax?x0+t:(x0+x1)/2,ax?(z0+z1)/2:z0+t);});
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
