  // EXISTING BUILDING. Two floors: the upper floor is level with W 6th (one story from the street), the lower floor opens onto the patio.
  // version 12: building painted light blue (its own materials, so the bar's stucco keeps its color)
  const paintBlue=mat(0xa9cce4),paintBand=mat(0x8fb5d1),paintLap=mat(0xb6d4ea);
  box(10,56,-3,21,40,85,paintBlue);box(9.8,56.2,9.2,9.6,39.8,85.2,paintBand);
  box(9.6,56.4,21,21.6,39.6,85.4,white);box(11,55,21.6,21.9,41,84,roofG);
  [[21,52],[35,61],[45,72]].forEach(([x,z])=>box(x-2.2,x+2.2,21.9,24.4,z-1.6,z+1.6,unitM));
  // taller block at the south-west corner, with cedar cladding on its lower floor
  box(10,23,-3,25.5,71,88,paintLap);box(9.6,23.4,25.5,26.1,70.6,88.4,white);box(9.8,23.2,-1.5,8.4,70.8,88.2,clad);
  [12.5,15.5,18.5].forEach(x=>box(x,x+2,12,20.5,88,88.25,glass));box(9.75,10,13,18.5,76,82.5,board);
  // street face: windows, front door and the brick chimney
  [[14,18],[20,24],[44,48],[50,54]].forEach(([a,b])=>box(a,b,10.5,17.5,39.75,40,glass));box(35.5,39,8.5,16.5,39.75,40,C.dark);
  box(27,30.5,8.5,26,38.3,40.2,brick);
  // back (south) face: upstairs windows, lower-floor windows
  [[26,29],[32,35]].forEach(([a,b])=>box(a,b,12,18.5,85,85.25,glass));
  // version 19 (Patrick, S014): the three boarded doors onto the upper deck become glass doors: white trim, dark steel frame, full glass, brass pull
  [[40,43],[46,49],[52,55]].forEach(([a,b])=>{box(a-.25,b+.25,10,18,85,85.15,white);box(a,b,10,17.5,85.15,85.27,C.dark);
    box(a+.25,b-.25,10.35,17.2,85.27,85.31,glass);box(a+.25,b-.25,13.65,13.85,85.27,85.33,C.dark);box(b-.55,b-.45,12.6,14.6,85.33,85.45,C.rail);});
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
