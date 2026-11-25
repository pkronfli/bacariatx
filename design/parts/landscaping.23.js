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
  // the statue (Robert, S021; version 23 sculpts it as a life-size man): a classical marble nude in contrapposto, weight on his
  // right leg, left arm raised to the shoulder like a Renaissance David, a marble fig leaf. Faces the bar from the back wall.
  {const SX=92,SZ=86.4,marble=mat(0xebe6dc),stone=mat(0xb9b2a5),st=new T.Group();st.position.set(SX,3.2,SZ);st.rotation.y=Math.PI;scene.add(st);
   box(90.4,93.6,0,.5,84.9,87.9,stone);box(90.7,93.3,.5,3,85.2,87.6,stone);box(90.5,93.5,3,3.2,85,87.8,stone);
   const V=a=>new T.Vector3(a[0],a[1],a[2]),UPv=new T.Vector3(0,1,0),BALL=new T.SphereGeometry(1,16,12);
   const blob=(p,sx,sy,sz,rx,ry,rz)=>{const m=put(BALL,marble,p[0],p[1],p[2],st);m.scale.set(sx,sy==null?sx:sy,sz==null?sx:sz);m.rotation.set(rx||0,ry||0,rz||0);return m;};
   // a limb piece from a to b, radius r0 at a and r1 at b, rounded at both ends so the joints flow
   const seg=(a,b,r0,r1)=>{const A=V(a),B=V(b),d=B.clone().sub(A),m=put(new T.CylinderGeometry(r1,r0,d.length(),16),marble,(a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2,st);
     m.quaternion.setFromUnitVectors(UPv,d.normalize());blob(a,r0);blob(b,r1);};
   // torso turned on a lathe (hips, waist, rib cage, shoulders), flattened front to back
   const prof=[[0,2.98],[.36,3.02],[.47,3.22],[.47,3.45],[.41,3.75],[.38,3.98],[.43,4.3],[.5,4.68],[.56,5.0],[.6,5.25],[.5,5.45],[.26,5.58],[0,5.62]].map(([r,y])=>new T.Vector2(r,y));
   const tor=put(new T.LatheGeometry(prof,28),marble,0,0,0,st);tor.scale.z=.6;tor.rotation.z=-.03;
   blob([-.2,3.2,-.17],.25,.24,.18);blob([.21,3.16,-.17],.24,.23,.18);               // seat
   {const lf=new T.Shape();lf.moveTo(0,-.2);lf.quadraticCurveTo(.2,-.12,.17,.05);lf.quadraticCurveTo(.12,.16,0,.12);lf.quadraticCurveTo(-.12,.16,-.17,.05);lf.quadraticCurveTo(-.2,-.12,0,-.2);
    const g=new T.ExtrudeGeometry(lf,{depth:.03,bevelEnabled:true,bevelThickness:.012,bevelSize:.012,bevelSegments:2});put(g,marble,0,3.08,.29,st).rotation.x=.12;}   // fig leaf
   // legs: right leg straight and carrying the weight, left knee eased forward and out
   seg([-.27,3.2,0],[-.27,1.74,.03],.28,.19);seg([-.27,1.74,.03],[-.28,1.15,0],.19,.205);seg([-.28,1.15,0],[-.28,.3,-.03],.205,.11);
   seg([.28,3.14,0],[.4,1.72,.2],.27,.19);seg([.4,1.72,.2],[.46,1.15,.17],.19,.2);seg([.46,1.15,.17],[.52,.32,.06],.2,.11);
   blob([-.3,1.52,-.08],.15,.2,.12);blob([.42,1.5,.1],.15,.2,.12);                    // calves
   blob([-.28,.13,.13],.15,.11,.38);blob([-.28,.08,.42],.13,.08,.12);blob([.53,.13,.2],.15,.11,.38,0,.25);blob([.6,.08,.47],.13,.08,.12);   // feet
   // arms: right hangs by the thigh, left bent up with the hand at the shoulder
   blob([-.62,5.3,0],.22,.2,.2);blob([.62,5.36,0],.22,.2,.2);                         // shoulders
   seg([-.66,5.22,0],[-.78,4.2,-.04],.16,.115);seg([-.78,4.2,-.04],[-.8,3.25,.06],.115,.08);blob([-.8,3.08,.07],.07,.18,.1);
   seg([.68,5.26,0],[.92,4.5,.32],.16,.115);seg([.92,4.5,.32],[.6,5.12,.46],.115,.08);blob([.55,5.22,.48],.07,.17,.1,.3,0,.4);
   // neck and head: jaw, nose, brow, ears, curls
   seg([0,5.5,0],[.02,5.8,.03],.17,.15);
   blob([.02,6.04,.03],.27,.33,.3);blob([.02,5.86,.1],.19,.14,.2);
   const nose=put(new T.ConeGeometry(.055,.2,6),marble,.02,6.0,.33,st);nose.rotation.x=-.25;
   blob([-.25,6.02,0],.05,.1,.07);blob([.29,6.02,0],.05,.1,.07);
   for(let i=0;i<22;i++){const a=i/22*Math.PI*2,y=6.18+.1*Math.sin(i*1.7);if(Math.sin(a)>.55&&y<6.25)continue;blob([.02+Math.cos(a)*.25,y+.06,.02+Math.sin(a)*.25],.1);}
   blob([.02,6.27,-.02],.25,.13,.25);}
