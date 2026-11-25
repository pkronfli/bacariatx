  // version 14: BACARI-STYLE NIGHT LIGHTING. Zigzag canopies of warm bistro bulbs on black poles over each deck and the front
  // terrace, rattan globe pendants under the pergola, a votive on every table, brass sconces on the building, low path lights.
  // Everything glows through materials and lights that the page switches with the Night button (via lamps[]).
  {const glowOn=0xffc46b,glowOff=0x8c7a5c,glowM=new T.MeshBasicMaterial({color:glowOff}),votM=new T.MeshBasicMaterial({color:0xb9a47c});
   lamps.push({set intensity(v){glowM.color.setHex(v?glowOn:glowOff);votM.color.setHex(v?0xffb14a:0xb9a47c);}});
   const poleM=mat(0x1d1d1f),brass=mat(0xa8823e),rattanG=mat(0xa77445,{transparent:true,opacity:.75});
   const BULB=[],wireM=new T.LineBasicMaterial({color:0x2b2b2b});
   const strand=(a,b,sag)=>{const A=new T.Vector3(...a),B=new T.Vector3(...b),L=A.distanceTo(B),n=Math.max(4,Math.round(L/2.2)),pts=[];
     for(let i=0;i<=n;i++){const t=i/n,q=A.clone().lerp(B,t);q.y-=sag*4*t*(1-t);pts.push(q);if(i>0&&i<n)BULB.push(q.clone().add(new T.Vector3(0,-.25,0)));}
     scene.add(new T.Line(new T.BufferGeometry().setFromPoints(pts),wireM));};
   const pole=(x,z,y0,h)=>{cyl(.14,h,x,y0,z,poleM,6);put(new T.SphereGeometry(.2,8,6),poleM,x,y0+h+.05,z);return [x,y0+h,z];};
   // canopy over a rectangle: poles along two long sides, strands zigzag between them
   const canopy=(x0,x1,z0,z1,y,h,step,alongZ,skip)=>{const sideA=[],sideB=[];
     if(!alongZ){for(let x=x0;x<=x1+.01;x+=step){if(skip&&skip(x,z0))sideA.push(null);else sideA.push(pole(x,z0,y,h));if(skip&&skip(x,z1))sideB.push(null);else sideB.push(pole(x,z1,y,h));}}
     else{for(let z=z0;z<=z1+.01;z+=step){sideA.push(skip&&skip(x0,z)?null:pole(x0,z,y,h));sideB.push(skip&&skip(x1,z)?null:pole(x1,z,y,h));}}
     for(let i=0;i<sideA.length;i++){if(sideA[i]&&sideB[i])strand(sideA[i],sideB[i],1.1);
       if(i+1<sideA.length){if(sideB[i]&&sideA[i+1])strand(sideB[i],sideA[i+1],1.3);if(sideA[i]&&sideA[i+1])strand(sideA[i],sideA[i+1],.6);if(sideB[i]&&sideB[i+1])strand(sideB[i],sideB[i+1],.6);}}};
   canopy(4,58,2.2,37.5,8.5,8.6,13.5,false,(x,z)=>Math.hypot(x-41.5,z-2.2)<3.5||Math.hypot(x-44,z-2.2)<3.5);   // front terrace (clear of the gate)
   canopy(63.5,106.5,6.2,38.6,5,9,10.75,false);                                                           // high deck
   canopy(120.2,136.4,42,78,3,9,12,true);                                                                // medium deck, east side
   canopy(62,134,105.5,125.8,0,10,12,false);                                                              // version 21: back seating at garden level
   // upper deck: bulbs looped along the white pergola beams
   for(let x=25;x<45;x+=4){strand([x,19.2,86],[x+4,19.2,93],.5);strand([x,19.2,93],[x+4,19.2,86],.5);}strand([25,19.2,86],[45,19.2,86],.4);strand([25,19.2,93],[45,19.2,93],.4);
   {const g=new T.SphereGeometry(.2,8,6),im=new T.InstancedMesh(g,bulbMat,BULB.length),O2=new T.Object3D();
    BULB.forEach((q,i)=>{O2.position.copy(q);O2.updateMatrix();im.setMatrixAt(i,O2.matrix);});scene.add(im);}
   // rattan globe pendants under the pergola pocket (beams at y 9.2), each with a warm bulb inside
   [[72,47],[78,47],[72,52],[78,52],[75,49.5]].forEach(([x,z])=>{box(x-.02,x+.02,7.2,9.2,z-.02,z+.02,poleM);
     const sh=put(new T.SphereGeometry(.85,10,8),rattanG,x,6.6,z);sh.castShadow=false;put(new T.SphereGeometry(.35,8,6),glowM,x,6.6,z).castShadow=false;});
   // a glass votive on every table
   // (version 18: table candles moved to the night-only group further down)
   // brass wall sconces on the building: street face, back face under the deck, east face by the restroom and upper doors
   [[19,13.6,39.55,0],[42,13.6,39.55,0],[51,13.6,39.55,0],[31,6.2,85.45,1],[45.5,6.2,85.45,1],[56.35,5.6,64.6,2],[56.35,5.6,70,2],[56.35,14.8,64.6,2],[56.35,14.8,73.3,2]].forEach(([x,y,z,f])=>{
     const dx=f===2?.22:0,dz=f===0?-.22:f===1?.22:0,wx=f===2?.08:.35,wz=f===2?.35:.08;
     box(x-wx,x+wx,y-.5,y+.5,z-wz,z+wz,brass);put(new T.CylinderGeometry(.22,.16,.6,10),glowM,x+dx,y+.1,z+dz).castShadow=false;});
   // low path lights along the river-rock paths and the front path
   [[89.35,50],[94.65,57],[89.35,64],[94.65,98],[89.35,106],[94.65,114],[106,79.35],[111,84.65],[60,64.4],[68.6,73],[72,79.35],[78,84.65],[40.4,6],[47.6,14],[40.4,24],[47.6,33]].forEach(([x,z])=>{
     const y=z<40&&x<62?8.6:.2;cyl(.13,1.5,x,y,z,poleM,8);put(new T.CylinderGeometry(.2,.2,.18,10),glowM,x,y+1.55,z).castShadow=false;
     box(x-.24,x+.24,y+1.66,y+1.74,z-.24,z+.24,poleM);});
   // warm fill over each lit area (no shadows), switched by the page with the other lamps
   [[30,15.5,20,44],[85,13.5,22,40],[128,11.5,72,46],[97,10,116,52],[35,19,89.5,26],[75,8,49.5,20]].forEach(([x,y,z,d])=>{const l=new T.PointLight(0xffc27a,0,d,1.5);l.position.set(x,y,z);scene.add(l);lamps.push(l);});}

  // version 15: TREE UP-LIGHTS (Patrick, S013). Flush in-grade well lights around each big live oak's trunk (set into the deck
  // boards on the decks), one warm spotlight per oak washing up the trunk into the canopy, and a small brass spike up-light in
  // the open corner of every corten planter. Bark and canopies also pick up a warm glow at night, switched with the Night button.
  {const wellM=mat(0x2a2620),brassU=mat(0xa8823e),lensOff=0x9a8f78,lensU=new T.MeshBasicMaterial({color:lensOff}),
     plM=[barkM,treeMat,treeMat2,oliveM,laurelM,bark],plE=[0x3a2410,0x1c1606,0x1c1606,0x3a2c12,0x2a2410,0x3a2410];
   lamps.push({set intensity(v){lensU.color.setHex(v?0xfff0c8:lensOff);plM.forEach((m,i)=>m.emissive.setHex(v?plE[i]:0));}});
   const RING=new T.CylinderGeometry(.42,.42,.08,14),LENS=new T.CircleGeometry(.3,14);
   OAKS.forEach(([o,x,y,z,r,azs])=>{const d=r*1.5+1.1;
     azs.forEach(a=>{const fx=x+Math.cos(a)*d,fz=z+Math.sin(a)*d;put(RING,wellM,fx,y+.04,fz).castShadow=false;
       put(LENS,lensU,fx,y+.085,fz).rotation.x=-Math.PI/2;});
     const a=azs[0],sp=new T.SpotLight(0xffd6a0,0,o.crown.y-y+22,.75,.5,1);
     sp.position.set(x+Math.cos(a)*d,y+.4,z+Math.sin(a)*d);sp.target.position.set(o.crown.x,o.crown.y-2,o.crown.z);
     scene.add(sp,sp.target);lamps.push(sp);});
   PLT.forEach(([x,z,y,h])=>{const fx=x-(h-.6),fz=z+(h-.6),fy=y+2.92;
     cyl(.04,.35,fx,fy,fz,wellM,6);const head=put(new T.CylinderGeometry(.16,.12,.42,10),brassU,fx,fy+.48,fz);head.rotation.set(-.35,0,-.35);
     const l=put(new T.CircleGeometry(.12,10),lensU,fx+.08,fy+.72,fz-.08);l.rotation.set(-Math.PI/2+.35,0,.35);l.castShadow=false;});}
