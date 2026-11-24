  // version 9: MORE PLANTERS (Robert, S009), kept out of the staff aisles: corners, stair landings, edges and railings
  const oliveM=mat(0x7f9160),boxM=mat(0x3f6b34),trailM=mat(0x5d8a45),bloomM=mat(0xe7e2f2),troughM=mat(0x8a5a36);
  // version 10: BIG PLANTERS WITH TREES (Robert, S010). Corten box h ft square (default 3.6) and 3 ft tall with a top lip,
  // holding a small tree about 10-12 ft tall: 'olive' = multi-trunk olive (silvery), 'laurel' = Texas mountain laurel (dark green)
  const laurelM=mat(0x3d6232),bark=mat(0x5e5246);
  const stem=(x,y,z,h,lx,lz,r)=>{const s=put(new T.CylinderGeometry(r*.6,r,h,6),bark,x+lx*h/2,y+h/2,z+lz*h/2);s.rotation.set(lz,0,-lx);return [x+lx*h,y+h,z+lz*h];};
  const treeOlive=(x,y,z)=>{[[.18,.1],[-.16,.12],[0,-.2]].forEach(([lx,lz],i)=>{const [tx,ty,tz]=stem(x,y,z,5.2+i*.4,lx,lz,.17);
      [[0,1.2,0,1.9],[.9,.6,.5,1.4],[-.8,.8,-.4,1.5],[.2,2.1,-.3,1.3]].forEach(([dx,dy,dz,r])=>{const c=put(new T.IcosahedronGeometry(r,1),oliveM,tx+dx,ty+dy,tz+dz);c.scale.y=.72;c.castShadow=true;});});};
  const treeLaurel=(x,y,z)=>{const [tx,ty,tz]=stem(x,y,z,4.6,.04,-.03,.24);[[.25,.05],[-.25,.1]].forEach(([lx,lz])=>stem(tx,ty-1.2,tz,2.2,lx,lz,.12));
    [[0,2.4,0,2.9],[1.6,1.6,.6,1.9],[-1.5,1.8,-.5,2],[.4,1.5,-1.6,1.8],[-.3,1.4,1.6,1.8],[.2,4,.1,2]].forEach(([dx,dy,dz,r])=>{
      const c=put(new T.IcosahedronGeometry(r,1),laurelM,tx+dx,ty+dy,tz+dz);c.scale.y=.8;c.castShadow=true;});};
  const PLT=[];  // version 15: planter spots, for their tree up-lights
  const tallPlanter=(x,z,y,kind,h)=>{h=(h||3.6)/2;PLT.push([x,z,y,h]);const H=3;box(x-h,x+h,y,y+H,z-h,z+h,C.corten);box(x-h-.08,x+h+.08,y+H,y+H+.12,z-h-.08,z+h+.08,C.corten);
    box(x-h+.15,x+h-.15,y+H-.1,y+H-.02,z-h+.15,z+h-.15,mulch);
    [[-1,-1],[1,1],[1,-1],[-1,1]].forEach(([a,b],i)=>{if(i<3){const s=put(new T.SphereGeometry(.55,10,7),boxM,x+a*(h-.65),y+H+.35,z+b*(h-.65));s.scale.y=.8;}});
    kind==='olive'?treeOlive(x,y+H-.05,z):treeLaurel(x,y+H-.05,z);};
  [[64,7.2,5,'olive'],[106.2,7.2,5,'laurel'],[106.2,37.6,5,'olive'],          // high deck: west and east corners by the street wall, south-east corner by the rail
   [121,42.6,3,'olive'],[121,101.4,3,'laurel'],                              // medium deck: inside corner by the rail, beside the stairs down to the low deck
   [59.2,107.4,1.5,'olive'],[134.8,109.8,1.5,'laurel'],                       // low deck: west and east ends
   [62.4,92.4,10,'olive',3],                                                  // upper deck: south-east corner (narrower deck, 3 ft box)
   [37.6,3.4,8.5,'laurel'],[50.4,3.4,8.5,'laurel'],[60,13.6,8.5,'olive'],[60,24.4,8.5,'olive']  // front terrace: flanking the gate, and the steps down to the high deck
  ].forEach(([x,z,y,k,h])=>tallPlanter(x,z,y,k,h));
  // trailing greenery with small pale flowers, along a trough from (x0,z0) to (x1,z1) whose soil is at height y
  const greens=(x0,z0,x1,z1,y,drape)=>{const L=Math.hypot(x1-x0,z1-z0),n=Math.max(2,Math.round(L/1.4));
    for(let i=0;i<n;i++){const t=(i+.5)/n,x=x0+(x1-x0)*t,z=z0+(z1-z0)*t,s=put(new T.SphereGeometry(.7,8,6),i%3?trailM:boxM,x,y+.25,z);s.scale.set(1.1,.7,1.1);
      if(i%2===0)put(new T.SphereGeometry(.16,6,4),bloomM,x+.3,y+.65,z+.2);
      if(drape){const d=put(new T.ConeGeometry(.35,drape,5),trailM,x,y-drape/2,z+.25);d.rotation.x=Math.PI;}}};
  // cedar troughs hung on the outside of the upper deck's south railing (between the posts, clear of the columns)
  [[26,37],[41,51],[55,62]].forEach(([a,b])=>{box(a,b,10.4,11.6,94.2,95.4,troughM);greens(a+.4,94.8,b-.4,94.8,11.6,1.6);});
  // low planted trough on top of the retaining wall along W 6th, in front of the high and medium decks
  [[66,88],[94,98]].forEach(([a,b])=>{box(a,b,4.5,5.4,4,4.9,troughM);greens(a+.4,4.45,b-.4,4.45,5.4,0);});
