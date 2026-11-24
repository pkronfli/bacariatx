/* Bacari Austin design concept: model version 8.
   One file per version. The page (../index.html) loads the live version and calls build().
   CHANGES FROM VERSION 7 (Robert's suggestions S008-S009): some two-tops are now four-tops (the front row on the high deck is four
   four-tops instead of five two-tops, the two west tables on the front terrace lawn are four-tops, and two pairs of two-tops on the
   low deck's front row are merged into four-tops); more planters throughout: glazed and terracotta pots with flowering shrubs at the
   street gate, the front door, the steps down to the high deck, on every deck and at the garden stairs, plus corten planter boxes
   along the high deck's back rail and the medium deck's east-side rail, keeping the staff aisles clear.
   EARLIER, FROM VERSION 6 (Robert's suggestions S006-S007): every deck (upper, high, medium, low) and its stairs is now drawn as
   wood: individual deck boards with gaps, butt joints, grain and color variation, laid along each deck's length, with horizontal
   fascia boards on the deck edges; the W 6th street gate is more ornate: two pillars with lanterns, an iron arch with a scroll
   ring over the opening, and leaves with a wood lower panel, iron pickets with finials, a center ring and a rising top rail.
   EARLIER, FROM VERSION 5 (Patrick): the W 6th street gate is drawn as a double gate standing partly open, so it reads as a
   door; banquette back cushions restyled like Bacari LA: full-length back cushions in bright patterned prints over grey-striped
   seat cushions.
   EARLIER, FROM VERSION 4 (Robert's suggestions S004-S005): every chair and bar stool back now stands straight up (the backs had a
   small tilt that made chairs facing east or west lean sideways); new glass double door on the upper (second) floor's east wall,
   opening onto the upper deck next to the stairs down to the high deck.
   EARLIER, FROM VERSION 3 (Robert's suggestions S001-S003): bar stools rebuilt as four-leg rattan bistro bar stools with a woven
   seat at 30 in, footrest ring and full hoop back; 12 more two-tops (front terrace lawn, a front row on the low deck, the medium
   deck and the garden paving), keeping aisles of about 3½ ft or more for staff; the two smaller trees with brown tops are now green.
   EARLIER, FROM VERSION 2: tables and chairs restyled to match Bacari's Los Angeles patios (Silver Lake, W 3rd):
   square walnut-top tables on black iron bases, French rattan bistro chairs with woven seats, navy built-in banquettes with
   striped cushions and bright throw pillows along the fences, rattan-back bar stools.
   EARLIER, FROM VERSION 1: building and neighbors reshaped from Google Earth and the site videos; the upper deck now wraps the
   back (south) and east sides on round columns; kitchen door, service corridor and restroom route moved to match Robert's video;
   existing landscaping added; billboard removed.

   COORDINATES (feet): x runs west to east along W 6th St, from the west property line (x=0) to the east line (x=137).
   z runs from the W 6th sidewalk (z=0) to the back property line at the alley (z=130). y is height above the existing patio (y=0).
   The street and front terrace are at y=8.5; the back of the lot is about y=-1.9.
   EXISTING: building x 10..56, z 40..85, two floors (upper floor at street level, lower floor at patio level), taller block at its
   south-west corner; upper deck along the south face (x 24..64, z 85..94) wrapping the east face (x 56..64, z 62..85).
   CONCEPT (Robert Kronfli): kitchen double door on the south wall under the deck, wall at the deck columns making a hidden service
   corridor; high deck along the W 6th side, medium deck at the NE corner and down the east side, low deck along the back,
   garden with the central bar in the middle (BX,BZ), tall wall at the back.

   HELPERS passed to build(): box(x0,x1,y0,y1,z0,z1,material,parent?), cyl(radius,height,x,yBase,z,material,segments?),
   stairs(x,z,yTop,yBot,dx,dz,width,material) starting at the edge (x,z) and descending in direction (dx,dz),
   put(geometry,material,x,y,z,parent?), mat(hexColor,options?), deckMats(topMaterial), C = shared materials.
   notes[].p and tags[].p are [x,y,z] positions of the numbered pins and labels. views are [cameraPosition, lookAt]. */
window.PATIO_MODEL={
version:8,
lede:"A 3D concept model of the ideas in Robert's walkthrough video, set on the real lot. Decks step down from the upper deck in three levels around a garden, with a big bar in the middle as \"the nucleus of the energy of the patio.\" The lot is about 137 ft along W 6th by 130 ft deep, from Travis County records checked against Google satellite and 3D imagery, with a wooden fence on the property line and the alley behind. Ground heights come from USGS lidar: the front terrace is level with the street, and the patio sits about 9 ft lower. Deck heights and exact positions are still estimates.",
levels:[["#cdb994", "Street + front terrace +8½ ft"], ["#8f6342", "Upper deck ~+9½ ft (existing)"], ["#a8744a", "High deck ~5 ft"], ["#c08d5c", "Medium deck ~3 ft"], ["#d6ac7c", "Low deck ~1½ ft"], ["#cdb994", "Garden at patio level (0)"], ["#6f9b4a", "Turf lawn (existing)"], ["#b4aea2", "River-rock paths"]],
notes:[
 {p:[40,5,95],t:'Kitchen double door + hidden service corridor',d:'The kitchen door goes where the window is now, on the back wall under the upper deck: "a double door or whatever." A wall at the deck\'s concrete columns turns the space under the deck into a hidden staff corridor. Staff come in with dirty dishes, drop them at the dish pit, go on to the line, pick up plates, and come back out to the patio through a service door at the east end.',f:'Check: one double door or separate in and out doors, and whether a serving window is wanted. Corridor width and the dish route set where the wall goes.'},
 {p:[57.5,4,67],t:'Guest route to the restrooms',d:'Guests reach the restrooms through their own door on the east side of the building. A partition under the deck closes that side off from the service corridor, so the corridor stays staff-only.'},
 {p:[60,13.5,76],t:'Upper deck, railing opened',d:'The existing upper deck wraps the back and east sides of the building, level with the street and about 9–10 ft above the patio. At its north end a section of railing opens to stairs that lead down to the high deck.'},
 {p:[84,7.5,22],t:'High deck (about 5 ft, half a level down)',d:'Runs along the W 6th side, where the barrel-roof pavilion is now. It sits about 3½ ft below the sidewalk, behind the retaining wall, so it is not at street level. Guests can also step down to it from the front terrace. Like the treehouse feel at Silver Lake: different decks, different paths.',f:'Check: a drop this high needs guardrails, and how much street noise the wall blocks.'},
 {p:[128,5.5,62],t:'Medium deck (about 3 ft, hip height)',d:'Starts at the north-east corner, a step down from the high deck, and runs along the east side where the leaf-covered yard is now. The neighbor\'s parking lot beyond the fence is about 5½ ft higher than the patio.',f:'Check: how tall the east fence needs to be to screen the parking lot.'},
 {p:[100,4,116],t:'Low deck (about 1½ ft)',d:'Runs along the back of the space, in front of the tall wall, where the concrete lot is now. Steps lead down to the garden.'},
 {p:[92,7,72],t:'Central bar',d:'A big round or square bar in the middle of the whole space. "Think of this as the field in a stadium," with everyone looking down at it from the decks.',f:'Check: water, drains, power and ice all have to run under the garden.'},
 {p:[111,3,88],t:'Seating pockets',d:'Small seating areas set into the planting around the bar, each one its own zone.'},
 {p:[75,10.5,49.5],t:'Pergola pocket',d:'A pergola over one of the pockets, reached by its own path.'},
 {p:[108,1.5,72],t:'River-rock paths',d:'Solid paths running from each deck, the restroom door and the service door to the bar and the pockets.'},
 {p:[100,11.5,127.8],t:'Tall back wall',d:'Along the back of the lot, about as tall as the existing fence. It blocks the view of the alley and the apartments, so the space feels fully closed in. The model also adds a screen wall to hide the service yard behind the building. Robert didn\'t describe that part.',f:'Check: Austin\'s height limit for walls.'},
 {p:[17,36,108],t:'Heritage oak',d:'Two large live oaks stand on the property: one behind the building, which Patrick pointed out as the heritage tree, and one over the front terrace. Smaller trees are along the east side. Positions and sizes are traced from the satellite view.',f:'Check: an arborist and Austin\'s rules on digging near protected trees.'},
 {p:[37,6,129.7],t:'Back alley + service gate',d:'The alley runs from Pressler St past the apartments to the parking garage. The model puts a service gate on it behind the building, leading to the staff end of the service corridor. Robert didn\'t say how deliveries and trash should work.'},
 {p:[66,8,19],t:'Grade change: street down to the garden',d:'The site falls about 9 ft from W 6th to the patio. In the concept, guests come off the sidewalk onto the front terrace under the oak, go down a short flight to the high deck, and on down to the garden.',f:'Check: accessibility. Wheelchair users need a ramp or lift from street level down to the garden and the restrooms.'},
 {p:[137.4,12,84],t:'Wooden fence around the property',d:'A wooden fence about 6½ ft tall follows the whole property line: 137 ft along W 6th, 130 ft down each side, and along the back alley. It has a guest gate on W 6th and a wider service gate on the alley. On the east side it stands on the retaining edge of the neighbor\'s higher parking lot.',f:'Check: Austin\'s fence height limits, and whether a solid fence on W 6th should have openings so the patio shows from the street.'},
 {p:[73,3.5,79],t:'Existing landscaping, kept',d:'Landscaping that shows in the site videos, worked into the garden: the turf lawn, the teal block walls with terracotta pots on top, steel planters with agaves and yuccas, cedar slat screens, the stamped concrete patio, mulch beds, bamboo along the west edge, and the lawn under the front oak.',f:'Check: which of these Robert wants to keep. They are placed where they fit the concept, not exactly where they stand today.'}
,
{p:[102,3,97],t:'Tables and chairs like Bacari LA',d:'Furniture follows Bacari\'s Los Angeles patios: 30-inch square walnut tables on black iron bases, pushed together for four or six; French rattan bistro chairs with woven seats; navy built-in banquettes with striped cushions and bright pillows along the east fence and the back wall; rattan bistro bar stools with woven seats, footrest rings and hoop backs at the bar. Version 4 adds two-tops on the front terrace lawn, a front row on the low deck, and more on the medium deck and the garden paving. Version 8 turns some two-tops into four-tops: the front row on the high deck, the two west tables on the front terrace lawn, and two on the low deck front row. That makes about 150 seats with the bar, keeping aisles of about 3½ ft or more so staff can get through.',f:'Check: seat count per deck against the occupant load, and the exact bar stool, chair and table models used at the other restaurants.'},
{p:[100,6,30],t:'Wooden decks',d:'Version 7 draws every deck as real wood: separate deck boards about 6 in wide with small gaps, staggered joints and natural color variation, running along each deck\'s length, with wood fascia boards on the edges and wooden stair treads. Each level keeps its own tone, darker up high and lighter toward the garden.',f:'Check: wood species or composite, board color, and which way the boards should run.'},
{p:[44,19.5,0],t:'Ornate street gate',d:'Version 7 dresses up the W 6th gate: two pillars with lanterns, an iron arch with a scroll ring over the opening, and gate leaves with a wood lower panel, iron pickets with finials and a center ring, rising toward the middle.',f:'Check: send a photo of the Silver Lake door so the gate can match it.'},
{p:[96,5,45],t:'More planters',d:'Version 8 adds planters all through the patio: glazed blue, cream and terracotta pots with leafy shrubs and flowers at the street gate, the front door, the steps down to the high deck, the corners of the upper, medium and low decks and the foot of the garden stairs, and corten planter boxes along the high deck\'s back rail and the medium deck\'s east rail. They sit at the edges and corners so the staff aisles stay clear.',f:'Check: which plants (flowering, herbs, citrus), pot styles and colors to use, and who waters them.'},
{p:[56.5,19,69],t:'Upper-floor door to the deck',d:'Version 5 adds a glass double door on the east wall of the upper (street-level) floor. It opens onto the upper deck right beside the opened railing and the stairs down to the high deck, so guests upstairs can walk straight out and down into the patio.',f:'Check: whether this is the spot Robert has in mind, and whether the existing boarded doors on the back wall should open up too.'}
],
tags:[{p:[124,9.5,-6],t:'486 ft · sidewalk',h:1},{p:[22,9.2,8],t:'486 ft · front terrace',h:1},{p:[104,1,62],t:'477.5 ft · patio',h:1},{p:[104,-.8,141],t:'476 ft · alley',h:1},{p:[164,7,80],t:'483 ft · neighbor parking',h:1},{p:[92,7,3],t:'Retaining wall + bank',h:1},{p:[70,9.5,-26],t:'W 6th St'},{p:[-88,3,70],t:'Pressler St'},{p:[30,60,170],t:'Pressler Apartments'},{p:[160,42,196],t:'Parking garage'},{p:[-30,31,32],t:'Title company'},{p:[8,-.8,141],t:'Back alley'},{p:[226,35,66],t:'Salon + print shop'},{p:[33,26,58],t:'Bar Peached building'}],
views:{overview:[[250,125,165],[72,0,66]],deck:[[61,16,90],[102,2,58]],bar:[[80,5.4,96],[110,5,44]],street:[[64,24,-32],[92,0,72]],up:[[104,5.5,98],[74,7,8]],plan:[[70,240,65.5],[70,0,65]]},
build(kit){
  const {T,scene,C,mat,put,box,cyl,deckMats,stairs}=kit;
  const BX=92,BZ=72;  // center of the bar
  // version 7: WOOD DECKS. Deck boards drawn in code on a canvas (6 in boards with gaps, staggered butt joints, grain),
  // mapped in world feet so boards keep their size on every box. along='z' turns the boards to run north-south.
  const woodTex=(hex,vertical)=>{const c=document.createElement('canvas');c.width=c.height=256;const g=c.getContext('2d');
    const r0=hex>>16&255,g0=hex>>8&255,b0=hex&255,sh=(k)=>`rgb(${Math.min(255,r0*k)|0},${Math.min(255,g0*k)|0},${Math.min(255,b0*k)|0})`;
    let seed=hex%97+3;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
    const n=8,h=256/n;g.fillStyle=sh(.45);g.fillRect(0,0,256,256);
    for(let i=0;i<n;i++){const y=i*h;let x=-rnd()*256;
      while(x<256){const L=96+rnd()*160,k=.82+rnd()*.32;g.fillStyle=sh(k);g.fillRect(x+1.5,y+1.5,L-3,h-3);
        for(let j=0;j<5;j++){g.strokeStyle=sh(k*(.84+rnd()*.1));g.lineWidth=.8+rnd();g.beginPath();const yy=y+3+rnd()*(h-6);g.moveTo(x+2,yy);
          g.bezierCurveTo(x+L*.3,yy+(rnd()-.5)*4,x+L*.6,yy+(rnd()-.5)*4,x+L-2,yy+(rnd()-.5)*3);g.stroke();}
        if(rnd()<.35){g.fillStyle=sh(k*.7);g.beginPath();g.ellipse(x+L*rnd(),y+h/2,3,1.6,0,0,Math.PI*2);g.fill();}
        g.fillStyle=sh(.6);[x+5,x+L-6].forEach(px=>{g.fillRect(px,y+6,1.6,1.6);g.fillRect(px,y+h-8,1.6,1.6);});
        x+=L;}}
    const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;return t;};
  const woodM={};const wood=(m,along)=>{const key=m.uuid+(along||'x');if(!woodM[key]){
      woodM[key]=new T.MeshLambertMaterial({color:0xffffff,map:woodTex(m.color.getHex())});woodM[key].userData.along=along||'x';}return woodM[key];};
  const fasciaM=new T.MeshLambertMaterial({color:0xffffff,map:woodTex(0x6f4d33)});fasciaM.userData.along='x';
  const TILE=4; // one texture tile = 4 ft = eight 6-in boards
  const woodGeo=(x0,x1,y0,y1,z0,z1,along)=>{const geo=new T.BoxGeometry(x1-x0,y1-y0,z1-z0),p=geo.attributes.position,nm=geo.attributes.normal,uv=geo.attributes.uv,
      cx=(x0+x1)/2,cy=(y0+y1)/2,cz=(z0+z1)/2;
    for(let i=0;i<p.count;i++){const x=p.getX(i)+cx,y=p.getY(i)+cy,z=p.getZ(i)+cz,ax=Math.abs(nm.getX(i)),ay=Math.abs(nm.getY(i));
      let u,v;if(ay>.5){u=along==='z'?z:x;v=along==='z'?x:z;}else if(ax>.5){u=z;v=y;}else{u=x;v=y;}uv.setXY(i,u/TILE,v/TILE);}
    uv.needsUpdate=true;return geo;};
  // a deck slab: plank top, fascia-board sides
  const wbox=(x0,x1,y0,y1,z0,z1,m,along)=>{const tm=wood(m,along);
    return put(woodGeo(x0,x1,y0,y1,z0,z1,along),[fasciaM,fasciaM,tm,fasciaM,fasciaM,fasciaM],(x0+x1)/2,(y0+y1)/2,(z0+z1)/2);};
  // wooden stairs, same layout as the page's stairs() helper, treads laid across the run
  const wstairs=(x,z,yTop,yBot,dx,dz,w,m)=>{const n=Math.max(2,Math.round((yTop-yBot)/.6)),r=(yTop-yBot)/n,al=dx?'z':'x';
    for(let i=1;i<n;i++){const top=yTop-r*i,cx=x+dx*(i-.5),cz=z+dz*(i-.5),hx=dx?.5:w/2,hz=dz?.5:w/2;
      wbox(cx-hx,cx+hx,yBot,top,cz-hz,cz+hz,m,al);}};
  const treeMat=mat(0x4d6a3b,{transparent:true,opacity:.35,depthWrite:false});
  // terrain. Heights are feet relative to the existing patio (about 477.5 ft above sea level, USGS lidar 2017).
  const wedge=(x0,x1,z0,z1,yF,yB,m,base)=>{base=base==null?-3:base;const sh=new T.Shape();sh.moveTo(z0,base);sh.lineTo(z1,base);sh.lineTo(z1,yB);sh.lineTo(z0,yF);sh.lineTo(z0,base);
    const geo=new T.ExtrudeGeometry(sh,{depth:x1-x0,bevelEnabled:false});geo.rotateY(-Math.PI/2);const me=new T.Mesh(geo,m);me.position.set(x1,0,0);me.castShadow=false;me.receiveShadow=true;scene.add(me);return me;};
  // roofs: hip(x0,x1,z0,z1,eaveY,rise,material) with the ridge along the longer side
  const roofGeo=(P,F)=>{const v=[];F.forEach(f=>{for(let i=1;i<f.length-1;i++)[f[0],f[i],f[i+1]].forEach(k=>v.push(...P[k]));});
    const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(v,3));g.computeVertexNormals();return g;};
  const hip=(x0,x1,z0,z1,y,h,m)=>{const ax=x1-x0>=z1-z0,d=(ax?z1-z0:x1-x0)/2,xc=(x0+x1)/2,zc=(z0+z1)/2;
    const P=[[x0,y,z0],[x1,y,z0],[x1,y,z1],[x0,y,z1],ax?[x0+d,y+h,zc]:[xc,y+h,z0+d],ax?[x1-d,y+h,zc]:[xc,y+h,z1-d]];
    const me=new T.Mesh(roofGeo(P,ax?[[0,1,5,4],[2,3,4,5],[3,0,4],[1,2,5]]:[[0,1,4],[1,2,5,4],[2,3,5],[3,0,4,5]]),m);me.castShadow=true;me.receiveShadow=true;scene.add(me);return me;};
  const g=new T.Mesh(new T.PlaneGeometry(1100,1100),C.lot);g.rotation.x=-Math.PI/2;g.position.set(70,-3,100);g.receiveShadow=true;scene.add(g);
  const road=mat(0x6d6f72),walk=mat(0xd9d4c8),asph=mat(0x55585c),stripe=mat(0xf2f2f2),cmu=mat(0xb3ada3),bank=mat(0x7f9a5c),gravel=mat(0xbdb7aa);
  const white=mat(0xf7f6f2),lap=mat(0xf1eee6),glass=mat(0x5b6f7c),board=mat(0xc9a66b),roofG=mat(0x8d9093),unitM=mat(0xaeb1b3),brick=mat(0x9a5a3c),darkWood=mat(0x4a362a),clad=mat(0xb98a5f),conc=mat(0xbdb9b0);
  box(-170,340,-3,8.4,-42,-12,road);box(-170,340,-3,8.5,-12,0,walk);
  // Pressler St, about 68 ft west of the property line, falling to the south
  wedge(-102,-74,0,330,8.4,-6,road);wedge(-74,-68,0,330,8.5,-5.9,walk);
  wedge(-68,-1,0,130,8.5,-1,C.garden);
  // title company (west neighbor): a house with two hip roofs
  const shingle=mat(0x9a968c,{side:T.DoubleSide}),siding=mat(0xe6e1d6);
  box(-52,-10,-1,19,12,50,siding);hip(-54,-8,10,52,19,8,shingle);
  box(-42,-8,-1,14.5,50,86,siding);hip(-44,-6,50,88,14.5,6.5,shingle);
  // back alley between the property and the apartments, from Pressler St to the parking garage
  box(-74,215,-3,-1.8,130,152,asph);
  // Pressler Apartments: five stories in a ring around a pool courtyard, with the parking garage to the east
  const apt=mat(0xc9ccd0),aptD=mat(0x9aa3ad),aptRoof=mat(0xdddcd6);
  [[-42,100,152,192],[-42,100,268,306],[-42,0,192,268],[58,100,192,268]].forEach(([x0,x1,z0,z1])=>{box(x0,x1,-3,55,z0,z1,apt);box(x0+1.5,x1-1.5,55,55.7,z0+1.5,z1-1.5,aptRoof);});
  for(let f=0;f<5;f++){const y=3+f*10.4;box(-40,98,y,y+5.2,151.7,152,aptD);box(-42.3,-42,y,y+5.2,156,302,aptD);box(2,56,y,y+5.2,192,192.3,aptD);}
  for(let x=-30;x<=90;x+=15)box(x-2.5,x+2.5,55.7,58,168,173,unitM);
  box(0,58,-3,-1,192,268,C.garden);box(14,44,-1,-.5,214,244,mat(0x4fb3c8));
  box(104,215,-3,37,156,240,mat(0xc4c1b8));box(105.5,213.5,37,37.5,157.5,238.5,mat(0xd9cfb6));
  for(let f=0;f<4;f++){const y=1+f*9;box(104,215,y,y+4.5,155.7,156,mat(0x6f7275));box(103.7,104,y,y+4.5,158,238,mat(0x6f7275));}
  // neighbor parking lot, and the salon and print shop: a two-story flat-roof block with a lower wing on its east side
  wedge(138,189,0,152,8.5,1.5,asph);for(let z=24;z<=144;z+=9){const y=8.5-7*z/152;box(140,156,y,y+.06,z,z+.4,stripe);}
  box(189,226,-3,31,8,126,mat(0xe9e7e1));box(190.2,224.8,31,31.6,9.2,124.8,mat(0xd9d0b8));
  box(226,262,-3,23,14,126,mat(0xdad8d2));box(227,261,23,23.5,15,125,mat(0x9c9c98));
  [[200,30],[212,62],[204,98]].forEach(([x,z])=>box(x-2.5,x+2.5,31.6,34.2,z-2,z+2,unitM));
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
    box(dir*(L-.45)-.06,dir*(L-.45)+.06,11,11.9,.14,.3,C.rail,leaf);});fence(47,.3,137,.3,()=>8.5);
  fence(.3,.3,.3,130,gW);fence(137.4,.3,137.4,130,gE);
  fence(0,129.7,30,129.7,()=>-1.9);fence(30,129.7,44,129.7,()=>-1.9,gateM);fence(44,129.7,137,129.7,()=>-1.9);
  for(let z=0;z<130;z+=10)box(137,138.2,-3,gE(z+5),z,Math.min(z+10,130),cmu);

  // EXISTING BUILDING. Two floors: the upper floor is level with W 6th (one story from the street), the lower floor opens onto the patio.
  box(10,56,-3,21,40,85,C.stucco);box(9.8,56.2,9.2,9.6,39.8,85.2,mat(0xd8d2c6));
  box(9.6,56.4,21,21.6,39.6,85.4,white);box(11,55,21.6,21.9,41,84,roofG);
  [[21,52],[35,61],[45,72]].forEach(([x,z])=>box(x-2.2,x+2.2,21.9,24.4,z-1.6,z+1.6,unitM));
  // taller block at the south-west corner, with cedar cladding on its lower floor
  box(10,23,-3,25.5,71,88,lap);box(9.6,23.4,25.5,26.1,70.6,88.4,white);box(9.8,23.2,-1.5,8.4,70.8,88.2,clad);
  [12.5,15.5,18.5].forEach(x=>box(x,x+2,12,20.5,88,88.25,glass));box(9.75,10,13,18.5,76,82.5,board);
  // street face: windows, front door and the brick chimney
  [[14,18],[20,24],[44,48],[50,54]].forEach(([a,b])=>box(a,b,10.5,17.5,39.75,40,glass));box(35.5,39,8.5,16.5,39.75,40,C.dark);
  box(27,30.5,8.5,26,38.3,40.2,brick);
  // back (south) face: upstairs windows and boarded doors onto the deck, lower-floor windows
  [[26,29],[32,35]].forEach(([a,b])=>box(a,b,12,18.5,85,85.25,glass));[[40,43],[46,49],[52,55]].forEach(([a,b])=>box(a,b,10,17.5,85,85.25,board));
  [[29,32],[48,51]].forEach(([a,b])=>box(a,b,3,6.6,85,85.25,glass));
  box(56,56.3,-.5,21,40,62,darkWood);
  // existing upper deck: wraps the south and east faces on round concrete columns, white steel pergola over its west half
  wbox(24,64,9.4,10,85,94,C.upper);wbox(56,64,9.4,10,62,85,C.upper,'z');
  [28,40,52,63.2].forEach(x=>cyl(.75,9.9,x,-.5,93.2,conc,14));[64,74].forEach(z=>cyl(.75,9.9,63.2,-.5,z,conc,14));
  const rail=(x0,z0,x1,z1,y)=>{const L=Math.hypot(x1-x0,z1-z0),alongX=z0===z1;
    [1.3,2.5,3.5].forEach(h=>alongX?box(x0,x1,y+h-.1,y+h+.1,z0-.1,z0+.1,C.rail):box(x0-.1,x0+.1,y+h-.1,y+h+.1,z0,z1,C.rail));
    const n=Math.max(1,Math.round(L/6));for(let i=0;i<=n;i++){const x=x0+(x1-x0)*i/n,z=z0+(z1-z0)*i/n;box(x-.15,x+.15,y,y+3.6,z-.15,z+.15,C.rail);}};
  rail(24,94,64,94,10);rail(64,62,64,94,10);rail(24,85,24,94,10);
  [[25,86],[25,93],[45,86],[45,93]].forEach(([x,z])=>box(x-.15,x+.15,10,19,z-.15,z+.15,white));
  [86,93].forEach(z=>box(25,45,19,19.3,z-.15,z+.15,white));for(let x=25;x<=45;x+=2.5)box(x-.1,x+.1,19.3,19.5,85.5,93.5,white);

  // ROBERT'S SERVICE PLAN
  // kitchen double door where the window is now, on the south wall under the deck
  box(36.6,43.4,0,7.9,85,85.2,white);box(37,39.95,0,7.5,85.2,85.4,C.dark);box(40.05,43,0,7.5,85.2,85.4,C.dark);
  // wall at the deck columns makes the hidden service corridor; staff door at its east end; partition keeps guests on the restroom side
  box(24,64,-.5,9.4,93,93.4,C.wood);box(63.6,64,0,8,85.2,93,clad);box(56.3,64,0,9.4,84.8,85.2,C.wood);
  // guest restroom door on the east wall, under the deck
  box(56,56.3,0,7.5,65.5,69,C.teal);
  // version 5: glass double door on the upper floor's east wall, onto the upper deck beside the stairs down to the high deck
  box(56,56.2,9.6,18.2,65.4,72.6,white);
  [[65.8,69.15],[69.25,72.2]].forEach(([a,b])=>{box(56.2,56.32,10,17.8,a,b,C.dark);box(56.32,56.36,10.6,17.2,a+.3,b-.3,glass);});
  [68.8,69.6].forEach(z=>box(56.36,56.5,13,15.2,z-.06,z+.06,C.rail));

  // front terrace edge, and steps from street level down to the high deck
  const stepM=mat(0xa9a39a);
  rail(62,.5,62,17,8.5);rail(62,21,62,36,8.5);
  stairs(62,19,8.5,5,1,0,4,stepM);

  // DECKS: high along the W 6th side, medium at the north-east corner and down the east side, low along the back
  const deckAt=(x0,x1,z0,z1,y,top,base,along)=>wbox(x0,x1,base==null?0:base,y,z0,z1,top,along);
  deckAt(62,108,5,40,5,C.high);deckAt(57,65,40,54.5,5,C.high,null,'z');
  // the upper deck railing opens at its north end: stairs down to the high deck
  rail(56,62,58.5,62,10);wstairs(61,62,10,5,0,-1,5,C.high);
  deckAt(108,137,5,40,3,C.med);deckAt(119,137,40,104,3,C.med,null,'z');
  wstairs(108,22,5,3,1,0,5,C.med);
  deckAt(57,137,104,127.3,1.5,C.low,-2);
  wstairs(128,104,3,1.5,0,1,5,C.low);
  rail(65,40,65,54.5,5);rail(65,40,90,40,5);rail(94,40,108,40,5);rail(108,40,119,40,3);rail(119,40,119,70,3);rail(119,74,119,104,3);

  // steps down to the garden, and river-rock paths to the bar
  wstairs(92,40,5,0,0,1,4,C.high);wstairs(119,72,3,0,-1,0,4,C.med);wstairs(92,104,1.5,0,0,-1,4,C.low);
  box(90,94,.12,.3,48,60.5,C.rock);box(103.5,114,.12,.3,70,74,C.rock);box(90,94,.12,.3,83.5,102,C.rock);
  box(56.3,82,.12,.3,65,69,C.rock);box(73,77,.12,.3,55,65,C.rock);
  box(64,84.5,.12,.3,87.5,91.5,C.rock);box(80.5,84.5,.12,.3,80,87.5,C.rock);
  const ringG=new T.RingGeometry(7.2,11.5,64);ringG.rotateX(-Math.PI/2);put(ringG,C.rock,BX,.31,BZ);

  // central bar
  const ring=(ro,ri,d,m,y)=>{const sh=new T.Shape();sh.absarc(0,0,ro,0,Math.PI*2,false);const h=new T.Path();h.absarc(0,0,ri,0,Math.PI*2,true);sh.holes.push(h);
    const geo=new T.ExtrudeGeometry(sh,{depth:d,bevelEnabled:false,curveSegments:56});geo.rotateX(-Math.PI/2);return put(geo,m,BX,y,BZ);};
  ring(7,4.6,3.4,C.stucco,0);ring(7.6,4.3,.25,C.top,3.4);
  cyl(2,5.5,BX,0,BZ,C.wood,24);cyl(2.6,.2,BX,3.2,BZ,C.top,24);cyl(.25,11.5,BX,5.5,BZ,C.rail,8);
  const stoolRing=[];for(let i=0;i<18;i++)stoolRing.push(i/18*Math.PI*2);

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
  const tbl=(x,y,z,w,d,ry)=>{add('tt',G.box,F.walnut,x,y+2.38,z,ry,w,.14,d);
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
  [[72,79,0],[72,97,0],[82,98,0],[102,97,0],[111,88,Math.PI/2],[111,58,Math.PI/2],[103,49,0]].forEach(([x,z,r])=>table(x,.22,z,4,true,r));
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
  planter(96,102,53,55.5);planter(80,86,61.5,64);planter(100,106,86,88.5);planter(106,112,65,67.5);planter(58,64,97,99.5);
  [[68,100],[116,98],[111,44],[87,46.5],[98,100],[106,78.5],[68,61.5]].forEach(([x,z])=>{const sh=put(new T.SphereGeometry(1.6,10,8),C.shrub,x,1.1,z);sh.scale.y=.7;});
  [70,80,90,100].forEach(x=>table(x,5,11,4));                                       // version 8: front row of four-tops on the high deck
  [70,78,102].forEach(x=>table(x,5,29,2));
  [[115,12],[128,12],[115,31],[128,31],[133,22]].forEach(([x,z])=>table(x,3,z,2));
  // version 4: more two-tops, keeping staff aisles of about 3½ ft or more
  [[16,12],[16,27]].forEach(([x,z])=>table(x,8.58,z,4));[[54,10],[54,30]].forEach(([x,z])=>table(x,8.58,z,2)); // front terrace lawn (version 8: west two are four-tops)
  [72,104].forEach(x=>table(x,1.5,108,4));[84,116].forEach(x=>table(x,1.5,108,2));   // front row on the low deck, clear of both stairs (version 8: two four-tops)
  table(110,.2,99,2);                                                                  // garden paving, south-east
  for(let z=48;z<=96;z+=8)two(129.6,3,z,-Math.PI/2,true);banq(132.4,45,132.4,99,3,-Math.PI/2);
  for(let x=64;x<=120;x+=8)two(x,1.5,117.4,Math.PI,true);banq(61,120.2,123,120.2,1.5,Math.PI);
  [[30,89.5,Math.PI/2],[38,89.5,Math.PI/2],[50,89.5,Math.PI/2],[60,82,0],[60,72,0]].forEach(([x,z,r])=>table(x,10,z,2,false,r));
  {const x0=69,x1=81,z0=44,z1=55;[[x0,z0],[x1,z0],[x0,z1],[x1,z1]].forEach(([x,z])=>box(x-.3,x+.3,0,9,z-.3,z+.3,C.post));
   box(x0-.5,x1+.5,8.6,9.2,z0-.3,z0+.3,C.post);box(x0-.5,x1+.5,8.6,9.2,z1-.3,z1+.3,C.post);
   for(let x=x0;x<=x1;x+=1.5)box(x-.12,x+.12,9.2,9.6,z0-1,z1+1,C.wood);table(75,.12,49.5,6,true);}
  // front path from the W 6th gate to the front door and the steps
  box(41,47,8.5,8.7,0,40,C.rock);box(47,62,8.5,8.7,17,21,C.rock);

  // EXISTING LANDSCAPING seen in the site videos, worked into the concept
  const turf=mat(0x6f9b4a),lawn=mat(0x86a35c),mulch=mat(0x6e4f35),paver=mat(0xdcd7cb),terra=mat(0xb5552f),cedar=mat(0xb9854f),cane=mat(0x7fa650),tuftM=mat(0xa9b06a),leafM=mat(0x4f7a3f);
  // turf lawn beside the building, stamped concrete patio in the south of the garden
  box(66,80,.12,.22,71.5,86,turf);box(96,118,.12,.2,78,103,paver);box(57,88,.12,.2,92,102,paver);
  // teal block walls with terracotta pots on top
  const pot=(x,y,z)=>{cyl(.7,1.2,x,y,z,terra,10);const s=put(new T.SphereGeometry(.8,8,6),leafM,x,y+1.5,z);s.scale.y=.8;};
  const tealWall=(x0,x1,z0,z1)=>{box(x0,x1,0,7,z0,z1,C.teal);const ax=x1-x0>z1-z0,L=ax?x1-x0:z1-z0,n=Math.max(2,Math.round(L/3.5));
    for(let i=0;i<n;i++){const t=(i+.5)/n;pot(ax?x0+L*t:(x0+x1)/2,7,ax?(z0+z1)/2:z0+L*t);}};
  tealWall(66,78,70.5,71.5);tealWall(66,80,86,87);tealWall(88,89,93,102);
  // steel planters with yuccas
  const yucca=(x,y,z)=>{cyl(.25,1.2,x,y,z,C.trunk,6);for(let i=0;i<16;i++){const c=put(new T.ConeGeometry(.16,3,4),C.agave,x,y+1.6,z);
      const a=i*2.4,t=.35+(i%4)*.3;c.rotation.set(Math.sin(a)*t,0,Math.cos(a)*t);c.translateY(1.3);}};
  const bigPlanter=(x,z)=>{box(x-1.5,x+1.5,0,2.5,z-1.5,z+1.5,C.corten);yucca(x,2.5,z);};
  [[79,74],[85.5,42.5],[99.5,42.5],[116.5,47.5],[116.5,93.5],[58.5,72.5]].forEach(([x,z])=>bigPlanter(x,z));
  // cedar slat screens beside the seating pockets
  const screen=(x0,z0,x1,z1)=>{const ax=z0===z1;for(let i=0;i<8;i++){const y=.5+i*.72;ax?box(x0,x1,y,y+.5,z0-.1,z0+.1,cedar):box(x0-.1,x0+.1,y,y+.5,z0,z1,cedar);}
    [[x0,z0],[x1,z1]].forEach(([x,z])=>box(x-.2,x+.2,0,6.4,z-.2,z+.2,C.post));};
  screen(104,68.5,114,68.5);screen(107,75.8,117,75.8);screen(83.5,45,83.5,55);
  // mulch beds with grasses at the foot of the decks
  const tuft=(x,z,y)=>{for(let i=0;i<5;i++){const c=put(new T.ConeGeometry(.3,2.2,5),tuftM,x+Math.cos(i*1.3)*.4,(y||.25)+1,z+Math.sin(i*1.3)*.4);c.rotation.set(Math.cos(i*2)*.35,0,Math.sin(i*2)*.35);}};
  box(69,89,.12,.26,40.3,43,mulch);box(95,118.5,.12,.26,40.3,43,mulch);box(116,118.8,.12,.26,43,69.5,mulch);box(116,118.8,.12,.26,74.5,101,mulch);box(58,89,.12,.26,102,103.8,mulch);box(95,118.5,.12,.26,103,103.9,mulch);
  for(let x=71;x<=81;x+=5)tuft(x,41.6);for(let x=103;x<=113;x+=5)tuft(x,41.6);for(let z=52;z<=67;z+=5)tuft(117.4,z);for(let z=78;z<=88;z+=5)tuft(117.4,z);for(let x=60;x<=85;x+=5)tuft(x,102.9);
  // front terrace: lawn and a mulch ring under the front oak; mulch under the heritage oak; bamboo along the west edge
  box(1,61.6,8.5,8.58,1,40,lawn);cyl(7,.12,32,8.56,18,mulch,20);cyl(9,.15,17,-1.25,108,mulch,20);
  const bamboo=(x,z,y)=>{for(let i=0;i<6;i++)cyl(.12,13+i%3*2,x+Math.cos(i*1.1)*.9,y,z+Math.sin(i*1.1)*.9,cane,5);
    const s=put(new T.IcosahedronGeometry(2.6,1),leafM,x,y+12,z);s.scale.set(1,2.2,1);};
  for(let z=6;z<=36;z+=6)bamboo(3.5,z,8.5);

  // version 8: MORE PLANTERS (S009). Tapered pots (glazed blue, cream, terracotta) with a leafy shrub and flowers, and corten
  // planter boxes, placed at edges, corners and stair landings so the staff aisles stay clear. Instanced with the furniture.
  G.pot=new T.CylinderGeometry(.5,.36,1,14);G.pot.translate(0,.5,0);G.ball=new T.SphereGeometry(.5,10,8);
  const potMs=[mat(0x2f5d7c),mat(0xe8e1d2),terra],leaf2=mat(0x5c8a45),bloomMs=[mat(0xd94f7a),mat(0xf2c14e),mat(0xf7f3ea),mat(0xa865cf)];
  let pk=0;const potP=(x,y,z,s)=>{s=s||1;const k=pk++;add('pp'+k%3,G.pot,potMs[k%3],x,y,z,0,1.9*s,1.8*s,1.9*s);
    add(k%2?'pgA':'pgB',G.ball,k%2?leafM:leaf2,x,y+2.1*s,z,k,1.9*s,1.5*s,1.9*s);
    for(let i=0;i<6;i++){const a=i*1.05+k;add('pf'+((k%2)*2+i%2),G.ball,bloomMs[(k%2)*2+i%2],x+Math.cos(a)*.62*s,y+(2.45+(i%3)*.18)*s,z+Math.sin(a)*.62*s,0,.3*s,.3*s,.3*s);}};
  const boxP=(x0,x1,z0,z1,y)=>{box(x0,x1,y,y+1.8,z0,z1,C.corten);box(x0+.15,x1-.15,y+1.8,y+1.85,z0+.15,z1-.15,mulch);
    const ax=x1-x0>=z1-z0,L=ax?x1-x0:z1-z0,n=Math.max(2,Math.round(L/1.6));
    for(let i=0;i<n;i++){const t=(i+.5)/n,x=ax?x0+L*t:(x0+x1)/2,z=ax?(z0+z1)/2:z0+L*t;
      add(i%2?'pgA':'pgB',G.ball,i%2?leafM:leaf2,x,y+2.2,z,i,1.3,1.1,1.3);if(i%2===0)add('pf'+i%4,G.ball,bloomMs[i%4],x,y+2.85,z,0,.34,.34,.34);}};
  // front terrace: either side of the street gate, the front door, and the steps down to the high deck
  [[38.4,4],[49.6,4],[33.8,38.4],[40.2,38.4],[60,14.6],[60,23.4]].forEach(([x,z])=>potP(x,8.5,z));
  // upper deck: the open south-east corner
  [[62.6,92.6],[57.6,92.6]].forEach(([x,z])=>potP(x,10,z,.9));
  // high deck: pots at the west end, corten boxes along the back rail either side of the garden stairs
  potP(64.6,5,8,.9);potP(106.4,5,8,.9);boxP(66,74,37.6,39.4,5);boxP(97,105,37.6,39.4,5);
  // medium deck: corner pots, and boxes along the inside of the east-side rail
  [[135,6.8],[135,37.5],[111,37.5]].forEach(([x,z])=>potP(x,3,z,.9));boxP(119.3,120.9,45,55,3);boxP(119.3,120.9,86,97,3);
  // low deck: pots at both ends
  [[58.6,107],[58.6,124.8],[135,110],[135,124.8]].forEach(([x,z])=>potP(x,1.5,z));
  // garden: either side of the high-deck stairs, by the low-deck stairs, and two pots just outside the bar's rock ring
  [[88.4,45.2],[95.6,45.2],[96.2,101.6],[100.8,80.8],[100.8,63.2]].forEach(([x,z])=>potP(x,.2,z,1.1));

  // tall back wall, and a screen wall hiding the service yard behind the building
  const walls=new T.Group();scene.add(walls);
  box(55.5,137,-2,10,127.3,128.3,C.wall,walls);box(55.5,56.5,-1.5,9,93.4,128.3,C.wall,walls);

  // trees, traced from the satellite view: two large live oaks (front, and the heritage oak behind the building) and smaller trees
  const trees=new T.Group();scene.add(trees);
  const oak=(x,z,k,leaf,y0)=>{k=k||1;y0=y0||0;const t=put(new T.CylinderGeometry(.9*k,1.3*k,13,10),C.trunk,x,y0+6.5,z,trees);t.rotation.z=.06;
    [[0,19,0,11],[6,17,3,8],[-6,18,-2,9],[2,21,-6,8],[-3,16,6,8]].forEach(([dx,y,dz,r])=>{const c=put(new T.IcosahedronGeometry(r*k,1),leaf||treeMat,x+dx*k,y0+y*(k>1?1.08:1),z+dz*k,trees);c.scale.y=.55;c.castShadow=true;});};
  const fallMat=mat(0xb98a3e,{transparent:true,opacity:.35,depthWrite:false});
  oak(32,18,1.6,null,8.5);oak(17,108,1.8,null,-1.2);oak(100,14,1.1,null,0);oak(133,99,.9,null,0);

  // string lights radiating from the bar
  const bulbMat=new T.MeshBasicMaterial({color:0xfff4d6});
  const bulbG=new T.SphereGeometry(.28,8,6),lineMat=new T.LineBasicMaterial({color:0x2b2b2b});
  const P0=new T.Vector3(BX,17,BZ),glow=[];
  [[67,56],[96,44.5],[117,42],[117,72],[117,102],[92,102],[67,102],[65.5,78]].forEach(([x,z])=>{
    const P1=new T.Vector3(x,13,z);cyl(.18,13,x,0,z,C.rail,6);const pts=[];
    for(let i=0;i<=24;i++){const t=i/24,q=P0.clone().lerp(P1,t);q.y-=3*4*t*(1-t);pts.push(q);if(i%2===1){const b=new T.Mesh(bulbG,bulbMat);b.position.copy(q);scene.add(b);}}
    scene.add(new T.Line(new T.BufferGeometry().setFromPoints(pts),lineMat));glow.push(pts[12]);});
  const lamps=[new T.PointLight(0xffc678,0,50,1.4)];lamps[0].position.set(BX,10,BZ);
  glow.forEach((q,i)=>{if(i%2===0){const l=new T.PointLight(0xffc678,0,34,1.4);l.position.copy(q);lamps.push(l);}});
  lamps.forEach(l=>scene.add(l));

  flush();
  return {fences,walls,trees,treeMats:[treeMat,fallMat],bulbMat,lamps};
}
};

