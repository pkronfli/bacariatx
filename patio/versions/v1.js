/* Bacari Austin patio concept: model version 1.
   One file per version. The page (../index.html) loads the live version and calls build().

   COORDINATES (feet): x runs west to east along W 6th St, from the west property line (x=0) to the east line (x=137).
   z runs from the W 6th sidewalk (z=0) to the back property line at the alley (z=130). y is height above the existing patio (y=0).
   The street and front terrace are at y=8.5; the back of the lot is about y=-1.9.
   EXISTING: building x 10..56, z 40..85 (front door faces W 6th; lower floor opens east at y=0); upper deck on its east side.
   CONCEPT (Robert Kronfli): high deck along the W 6th side, medium deck at the NE corner and down the east side,
   low deck along the back, garden with the central bar in the middle (BX,BZ), tall wall at the back.

   HELPERS passed to build(): box(x0,x1,y0,y1,z0,z1,material,parent?), cyl(radius,height,x,yBase,z,material,segments?),
   stairs(x,z,yTop,yBot,dx,dz,width,material) starting at the edge (x,z) and descending in direction (dx,dz),
   put(geometry,material,x,y,z,parent?), mat(hexColor,options?), deckMats(topMaterial), C = shared materials.
   notes[].p and tags[].p are [x,y,z] positions of the numbered pins and labels. views are [cameraPosition, lookAt]. */
window.PATIO_MODEL={
version:1,
lede:"A 3D concept model of the ideas in Robert's walkthrough video, set on the real lot. Decks step down from the upper deck in three levels around a garden, with a big bar in the middle as \"the nucleus of the energy of the patio.\" The lot is about 137 ft along W 6th by 130 ft deep, from Travis County records checked against Google satellite and 3D imagery, with a wooden fence on the property line and the alley behind. Ground heights come from USGS lidar: the front terrace is level with the street, and the patio sits about 9 ft lower. Deck heights and exact positions are still estimates.",
levels:[["#cdb994", "Street + front terrace +8½ ft"], ["#8f6342", "Upper deck ~+9½ ft (existing)"], ["#a8744a", "High deck ~5 ft"], ["#c08d5c", "Medium deck ~3 ft"], ["#d6ac7c", "Low deck ~1½ ft"], ["#cdb994", "Garden at patio level (0)"], ["#b4aea2", "River-rock paths"]],
notes:[
 {p:[60,6,53],t:'Kitchen door + hidden service corridor',d:'The kitchen door goes where the window is now, on the building\'s east side under the upper deck. A wall along the deck posts turns the space under the deck into a hidden staff corridor: dirty dishes in, drop at the dish pit, pick up at the line, then out to the patio at the corridor\'s south end.',f:'Check: corridor width and the dish route for the health code set where this wall goes.'},
 {p:[60.5,4,41.5],t:'Guest route to the restrooms',d:'Guests reach the restrooms through their own door at the north end, under the deck. A partition closes it off from the service corridor.'},
 {p:[60.5,13.5,56],t:'Upper deck, railing opened',d:'The existing upper deck on the east side of the building, level with the street and about 9–10 ft above the patio. A section of railing opens to stairs that lead down to the high deck.'},
 {p:[84,7.5,22],t:'High deck (about 5 ft, half a level down)',d:'Runs along the W 6th side, where the barrel-roof walkway is now. It sits about 3½ ft below the sidewalk, behind the retaining wall, so it is not at street level. Guests can also step down to it from the front terrace. Like the treehouse feel at Silver Lake: different decks, different paths.',f:'Check: a drop this high needs guardrails, and how much street noise the wall blocks.'},
 {p:[128,5.5,62],t:'Medium deck (about 3 ft, hip height)',d:'Starts at the north-east corner, a step down from the high deck, and runs along the east side where the leaf-covered yard is now. The neighbor\'s parking lot beyond the fence is about 5½ ft higher than the patio.',f:'Check: how tall the east fence needs to be to screen the parking lot.'},
 {p:[100,4,116],t:'Low deck (about 1½ ft)',d:'Runs along the back of the space, in front of the tall wall, where the concrete lot is now. Steps lead down to the garden.'},
 {p:[92,7,72],t:'Central bar',d:'A big round or square bar in the middle of the whole space. "Think of this as the field in a stadium," with everyone looking down at it from the decks.',f:'Check: water, drains, power and ice all have to run under the garden.'},
 {p:[111,3,88],t:'Seating pockets',d:'Small seating areas set into the planting around the bar, each one its own zone.'},
 {p:[75,10.5,49.5],t:'Pergola pocket',d:'A pergola over a pocket near the building, about where the teal walls are now, reached by its own path.'},
 {p:[108,1.5,72],t:'River-rock paths',d:'Solid paths running from each deck down to the bar and the pockets.'},
 {p:[100,11.5,127.8],t:'Tall back wall',d:'Along the back of the lot, about as tall as the existing fence. It blocks the view of the alley and the apartments, so the space feels fully closed in. The model also adds a screen wall on the west side to hide the yard behind the building. Robert didn\'t describe that part.',f:'Check: Austin\'s height limit for walls.'},
 {p:[17,36,108],t:'Heritage oak',d:'Two large live oaks stand on the property: one behind the building, which Patrick pointed out as the heritage tree, and one over the front terrace. Smaller trees are along the east side and near the building\'s back corner. Positions and sizes are traced from the satellite view.',f:'Check: an arborist and Austin\'s rules on digging near protected trees.'},
 {p:[37,6,129.7],t:'Back alley + service gate',d:'The alley runs from Pressler St to the neighbor\'s parking, between this property and the apartments. The model puts a service gate on it behind the building. Robert didn\'t say how deliveries and trash should work.'},
 {p:[66,8,19],t:'Grade change: street down to the garden',d:'The site falls about 9 ft from W 6th to the patio. In the concept, guests come off the sidewalk onto the front terrace under the oak, go down a short flight to the high deck, and on down to the garden.',f:'Check: accessibility. Wheelchair users need a ramp or lift from street level down to the garden and the restrooms.'},
 {p:[137.4,12,84],t:'Wooden fence around the property',d:'A wooden fence about 6½ ft tall follows the whole property line: 137 ft along W 6th, 130 ft down each side, and along the back alley. It has a guest gate on W 6th and a wider service gate on the alley. On the east side it stands on the retaining edge of the neighbor\'s higher parking lot.',f:'Check: Austin\'s fence height limits, and whether a solid fence on W 6th should have openings so the patio shows from the street.'},
 {p:[134,41,27],t:'Billboard (existing)',d:'A billboard on a tall pole stands at the north-east corner, next to the neighbor\'s parking. It shows in the satellite view and in the walkthrough videos.',f:'Check: whether it sits on this property, who controls it under the lease, and where its pole lands in the medium deck.'}
],
tags:[{p:[124,9.5,-6],t:'486 ft · sidewalk',h:1},{p:[22,9.2,8],t:'486 ft · front terrace',h:1},{p:[76,1,90],t:'477.5 ft · patio',h:1},{p:[104,-.8,141],t:'476 ft · alley',h:1},{p:[164,7,80],t:'483 ft · neighbor parking',h:1},{p:[92,7,3],t:'Retaining wall + bank',h:1},{p:[70,9.5,-26],t:'W 6th St'},{p:[-88,3,70],t:'Pressler St'},{p:[52,58,196],t:'Pressler Apartments'},{p:[-23,26,50],t:'Title company'},{p:[8,-.8,141],t:'Back alley'},{p:[242,26,70],t:'Salon + print shop'},{p:[33,24,62],t:'Bar Peached building'}],
views:{overview:[[250,125,165],[72,0,66]],deck:[[60.5,16,52],[104,2,86]],bar:[[78,5.4,90],[112,5,40]],street:[[64,24,-32],[92,0,72]],up:[[104,5.5,98],[74,7,8]],plan:[[70,240,65.5],[70,0,65]]},
build(kit){
  const {T,scene,C,mat,put,box,cyl,deckMats,stairs}=kit;
  const BX=92,BZ=72;  // center of the bar
  const treeMat=mat(0x4d6a3b,{transparent:true,opacity:.35,depthWrite:false});
  // terrain. Heights are feet relative to the existing patio (about 477.5 ft above sea level, USGS lidar 2017).
  // x runs west to east along W 6th, z runs from the sidewalk to the back of the lot.
  const wedge=(x0,x1,z0,z1,yF,yB,m,base)=>{base=base==null?-3:base;const sh=new T.Shape();sh.moveTo(z0,base);sh.lineTo(z1,base);sh.lineTo(z1,yB);sh.lineTo(z0,yF);sh.lineTo(z0,base);
    const geo=new T.ExtrudeGeometry(sh,{depth:x1-x0,bevelEnabled:false});geo.rotateY(-Math.PI/2);const me=new T.Mesh(geo,m);me.position.set(x1,0,0);me.castShadow=false;me.receiveShadow=true;scene.add(me);return me;};
  const g=new T.Mesh(new T.PlaneGeometry(900,900),C.lot);g.rotation.x=-Math.PI/2;g.position.set(70,-3,80);g.receiveShadow=true;scene.add(g);
  const road=mat(0x6d6f72),walk=mat(0xd9d4c8),asph=mat(0x55585c),stripe=mat(0xf2f2f2),cmu=mat(0xb3ada3),bank=mat(0x7f9a5c),gravel=mat(0xbdb7aa);
  box(-170,340,-3,8.4,-42,-12,road);box(-170,340,-3,8.5,-12,0,walk);
  // Pressler St, about 68 ft west of the property line, falling to the south
  wedge(-102,-74,0,175,8.4,-2.7,road);wedge(-74,-68,0,175,8.5,-2.6,walk);
  wedge(-68,-1,0,130,8.5,-1,C.garden);box(-40,-6,-1,24,14,88,C.ctx);
  // back alley between the property and the apartments, from Pressler St to the neighbor's parking
  box(-74,189,-3,-1.8,130,152,asph);
  box(-42,148,-3,55,152,240,C.ctx);for(let f=1;f<6;f++)box(-40,146,f*9,f*9+4,151.8,152,mat(0x9aa3ad));
  wedge(138,189,0,152,8.5,1.5,asph);for(let z=24;z<=144;z+=9){const y=8.5-7*z/152;box(140,156,y,y+.06,z,z+.4,stripe);}
  box(189,295,-3,24,8,125,C.ctx);
  // site: front terrace at street level, retaining wall and bank, patio pad, sloping back of the lot
  box(0,62,-3,8.5,0,40,C.garden);box(61.6,62.2,-3,8.6,0,40,cmu);
  wedge(0,10,40,85,8.5,-.5,C.garden);
  wedge(62,137,0,4,8.5,4.5,bank);box(62,137,-3,4.5,4,4.8,cmu);
  box(56,137,-3,0,4.8,106,C.garden);
  wedge(0,56,85,130,-.5,-1.9,gravel);wedge(56,137,106,130,-1.2,-1.9,gravel);
  // wooden fence around the whole property line, following the ground, with a street gate and an alley gate
  const fences=new T.Group();scene.add(fences);
  const fenceM=mat(0xb0834f),fenceP=mat(0x7a5536),gateM=mat(0xcfa873);
  const gW=z=>z<40?8.5:z<85?8.5-9*(z-40)/45:-.5-1.4*(z-85)/45,gE=z=>8.5-7*z/152;
  const fence=(x0,z0,x1,z1,gy,m)=>{const L=Math.hypot(x1-x0,z1-z0),n=Math.max(1,Math.round(L/8)),ax=x0===x1;
    for(let i=0;i<=n;i++){const a=i/n,b=Math.min(1,(i+1)/n),xa=x0+(x1-x0)*a,xb=x0+(x1-x0)*b,za=z0+(z1-z0)*a,zb=z0+(z1-z0)*b,y=gy((za+zb)/2);
      if(i<n){ax?box(xa-.15,xa+.15,y-.6,y+6.5,za,zb,m||fenceM,fences):box(xa,xb,y-.6,y+6.5,za-.15,za+.15,m||fenceM,fences);}
      box(xa-.3,xa+.3,gy(za)-.6,gy(za)+7,za-.3,za+.3,fenceP,fences);}};
  fence(0,.3,41,.3,()=>8.5);fence(41,.3,47,.3,()=>8.5,gateM);fence(47,.3,137,.3,()=>8.5);
  fence(.3,.3,.3,130,gW);fence(137.4,.3,137.4,130,gE);
  fence(0,129.7,30,129.7,()=>-1.9);fence(30,129.7,44,129.7,()=>-1.9,gateM);fence(44,129.7,137,129.7,()=>-1.9);
  for(let z=0;z<130;z+=10)box(137,138.2,-3,gE(z+5),z,Math.min(z+10,130),cmu);
  // existing billboard on a pole at the north-east corner
  const steel=mat(0x7d8288);
  cyl(.9,36,134,gE(27)-.5,27,steel,10);box(132.6,135.4,32.4,33,5,49,steel);box(133.2,134.8,33,47,5,49,mat(0xe8e6e0));

  // building: front on W 6th at street level; the lower floor opens east onto the patio
  box(10,56,-3,22,40,85,C.stucco);box(8.2,10,-1,26,52,57,mat(0x9a5a3c));box(10,56,-.5,7.5,85,85.25,mat(0x9c6a45));box(9.9,56.1,9.3,9.7,40,85.1,mat(0xd8d2c6));
  box(30,36,8.5,16,39.7,40.1,C.dark);
  box(56,56.3,0,7.5,47,53,C.dark);box(56,56.3,0,7.5,40.6,43.4,C.teal);
  // existing upper deck on the east side, with the hidden service corridor under it
  box(56,65,9.4,10,36,62,C.upper);
  [38,46,54,61.5].forEach(z=>box(64,65,0,9.4,z-.5,z+.5,C.post));
  box(64.6,65,0,9.4,44,62,C.wood);box(56,65,0,9.4,43.8,44.2,C.wood);
  const rail=(x0,z0,x1,z1,y)=>{const L=Math.hypot(x1-x0,z1-z0),alongX=z0===z1;
    [1.3,2.5,3.5].forEach(h=>alongX?box(x0,x1,y+h-.1,y+h+.1,z0-.1,z0+.1,C.rail):box(x0-.1,x0+.1,y+h-.1,y+h+.1,z0,z1,C.rail));
    const n=Math.max(1,Math.round(L/6));for(let i=0;i<=n;i++){const x=x0+(x1-x0)*i/n,z=z0+(z1-z0)*i/n;box(x-.15,x+.15,y,y+3.6,z-.15,z+.15,C.rail);}};
  rail(65,40,65,62,10);rail(56,62,65,62,10);rail(62,36,65,36,10);
  // front terrace edge, and steps from street level down to the high deck
  const stepM=mat(0xa9a39a);
  rail(62,.5,62,17,8.5);rail(62,21,62,36,8.5);
  stairs(62,19,8.5,5,1,0,4,stepM);

  // decks: high along the W 6th side, medium at the north-east corner and down the east side, low along the back
  const deckAt=(x0,x1,z0,z1,y,top,base)=>box(x0,x1,base==null?0:base,y,z0,z1,deckMats(top));
  deckAt(62,108,5,40,5,C.high);
  stairs(65,38,10,5,1,0,4,C.high);
  deckAt(108,137,5,40,3,C.med);deckAt(119,137,40,104,3,C.med);
  stairs(108,22,5,3,1,0,5,C.med);
  deckAt(57,137,104,127.3,1.5,C.low,-2);
  stairs(128,104,3,1.5,0,1,5,C.low);
  rail(65,40,90,40,5);rail(94,40,108,40,5);rail(108,40,119,40,3);rail(119,40,119,70,3);rail(119,74,119,104,3);

  // steps down to the garden, and river-rock paths to the bar
  stairs(92,40,5,0,0,1,4,C.high);stairs(119,72,3,0,-1,0,4,C.med);stairs(92,104,1.5,0,0,-1,4,C.low);
  box(90,94,.12,.3,48,60.5,C.rock);box(103.5,114,.12,.3,70,74,C.rock);box(90,94,.12,.3,83.5,102,C.rock);
  box(56,66,.12,.3,62,68,C.rock);box(62,66,.12,.3,68,70,C.rock);box(62,80.5,.12,.3,70,74,C.rock);
  box(65,68,.12,.3,40,60.5,C.rock);box(65,90,.12,.3,57.5,60.5,C.rock);
  const ringG=new T.RingGeometry(7.2,11.5,64);ringG.rotateX(-Math.PI/2);put(ringG,C.rock,BX,.31,BZ);

  // central bar
  const ring=(ro,ri,d,m,y)=>{const sh=new T.Shape();sh.absarc(0,0,ro,0,Math.PI*2,false);const h=new T.Path();h.absarc(0,0,ri,0,Math.PI*2,true);sh.holes.push(h);
    const geo=new T.ExtrudeGeometry(sh,{depth:d,bevelEnabled:false,curveSegments:56});geo.rotateX(-Math.PI/2);return put(geo,m,BX,y,BZ);};
  ring(7,4.6,3.4,C.stucco,0);ring(7.6,4.3,.25,C.top,3.4);
  cyl(2,5.5,BX,0,BZ,C.wood,24);cyl(2.6,.2,BX,3.2,BZ,C.top,24);cyl(.25,11.5,BX,5.5,BZ,C.rail,8);
  for(let i=0;i<18;i++){const a=i/18*Math.PI*2;cyl(.65,2.5,BX+Math.cos(a)*8.6,.3,BZ+Math.sin(a)*8.6,C.stool,12);}

  // furniture and planting
  const table=(x,y,z,n,big)=>{const r=big?1.4:1;cyl(r,.15,x,y+2.4,z,C.top,18);cyl(.14,2.4,x,y,z,C.rail,6);
    for(let i=0;i<n;i++){const a=i/n*Math.PI*2+.4,d=r+1;box(x+Math.cos(a)*d-.6,x+Math.cos(a)*d+.6,y,y+1.5,z+Math.sin(a)*d-.6,z+Math.sin(a)*d+.6,C.chair);}};
  const agave=(x,y,z)=>{for(let i=0;i<7;i++){const c=put(new T.ConeGeometry(.22,2.2,5),C.agave,x,y+1,z);c.rotation.set(Math.cos(i)*.7,i,Math.sin(i*1.7)*.7);}};
  const planter=(x0,x1,z0,z1)=>{box(x0,x1,0,2.2,z0,z1,C.corten);const cx=(x0+x1)/2,cz=(z0+z1)/2,L=Math.max(x1-x0,z1-z0),along=x1-x0>z1-z0;
    for(let k=-1;k<=1;k+=2)agave(along?cx+k*L/4:cx,2.2,along?cz:cz+k*L/4);};
  [[72,82],[76,92],[84,97],[102,97],[111,88],[111,58],[103,49]].forEach(([x,z])=>table(x,.12,z,4,true));
  planter(96,102,53,55.5);planter(80,86,62,64.5);planter(78,84,84,86.5);planter(100,106,86,88.5);planter(66,72,76,78.5);planter(106,112,65,67.5);
  [[68,100],[116,99],[116,44],[84,44],[98,101],[106,78],[70,66]].forEach(([x,z])=>{const sh=put(new T.SphereGeometry(1.6,10,8),C.shrub,x,1.1,z);sh.scale.y=.7;});
  for(let x=70;x<=102;x+=8){table(x,5,11,2);if(x<88||x>96)table(x,5,29,2);}
  [[115,12],[128,12],[115,31],[128,31]].forEach(([x,z])=>table(x,3,z,2));
  for(let z=48;z<=96;z+=8)table(129,3,z,2);
  for(let x=64;x<=120;x+=8)table(x,1.5,117,2);
  for(let z=44;z<=58;z+=7)table(60.5,10,z,2);
  {const x0=69,x1=81,z0=44,z1=55;[[x0,z0],[x1,z0],[x0,z1],[x1,z1]].forEach(([x,z])=>box(x-.3,x+.3,0,9,z-.3,z+.3,C.post));
   box(x0-.5,x1+.5,8.6,9.2,z0-.3,z0+.3,C.post);box(x0-.5,x1+.5,8.6,9.2,z1-.3,z1+.3,C.post);
   for(let x=x0;x<=x1;x+=1.5)box(x-.12,x+.12,9.2,9.6,z0-1,z1+1,C.wood);table(75,.12,49.5,6,true);}
  // front path from the W 6th gate to the front door and the steps
  box(41,47,8.5,8.7,0,40,C.rock);box(47,62,8.5,8.7,17,21,C.rock);

  // tall back wall, and a screen wall hiding the service yard behind the building
  const walls=new T.Group();scene.add(walls);
  box(55.5,137,-2,10,127.3,128.3,C.wall,walls);box(55.5,56.5,-1.5,9,85,128.3,C.wall,walls);

  // trees, traced from the satellite view: two large live oaks (front, and the heritage oak behind the building) and smaller trees
  const trees=new T.Group();scene.add(trees);
  const oak=(x,z,k,leaf,y0)=>{k=k||1;y0=y0||0;const t=put(new T.CylinderGeometry(.9*k,1.3*k,13,10),C.trunk,x,y0+6.5,z,trees);t.rotation.z=.06;
    [[0,19,0,11],[6,17,3,8],[-6,18,-2,9],[2,21,-6,8],[-3,16,6,8]].forEach(([dx,y,dz,r])=>{const c=put(new T.IcosahedronGeometry(r*k,1),leaf||treeMat,x+dx*k,y0+y*(k>1?1.08:1),z+dz*k,trees);c.scale.y=.55;c.castShadow=true;});};
  const fallMat=mat(0xb98a3e,{transparent:true,opacity:.35,depthWrite:false});
  oak(32,18,1.6,null,8.5);oak(17,108,1.8,null,-1.2);oak(100,14,1.1,fallMat,0);oak(61,97,.9,fallMat,0);oak(133,99,.9,fallMat,0);

  // string lights radiating from the bar
  const bulbMat=new T.MeshBasicMaterial({color:0xfff4d6});
  const bulbG=new T.SphereGeometry(.28,8,6),lineMat=new T.LineBasicMaterial({color:0x2b2b2b});
  const P0=new T.Vector3(BX,17,BZ),glow=[];
  [[67,42],[92,43],[117,42],[117,72],[117,102],[92,102],[67,102],[67,72]].forEach(([x,z])=>{
    const P1=new T.Vector3(x,13,z);cyl(.18,13,x,0,z,C.rail,6);const pts=[];
    for(let i=0;i<=24;i++){const t=i/24,q=P0.clone().lerp(P1,t);q.y-=3*4*t*(1-t);pts.push(q);if(i%2===1){const b=new T.Mesh(bulbG,bulbMat);b.position.copy(q);scene.add(b);}}
    scene.add(new T.Line(new T.BufferGeometry().setFromPoints(pts),lineMat));glow.push(pts[12]);});
  const lamps=[new T.PointLight(0xffc678,0,50,1.4)];lamps[0].position.set(BX,10,BZ);
  glow.forEach((q,i)=>{if(i%2===0){const l=new T.PointLight(0xffc678,0,34,1.4);l.position.copy(q);lamps.push(l);}});
  lamps.forEach(l=>scene.add(l));

  return {fences,walls,trees,treeMats:[treeMat,fallMat],bulbMat,lamps};
}
};
