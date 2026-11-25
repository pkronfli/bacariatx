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
  // back (south) face: upstairs windows and boarded doors onto the deck, lower-floor windows
  [[26,29],[32,35]].forEach(([a,b])=>box(a,b,12,18.5,85,85.25,glass));
  // version 19 (S014): the back doors are glass. Black steel frames, clear glass (frosted on the restroom door), pull bars.
  const steelF=mat(0x1e1f21),doorGlass=mat(0x86a9ba),frostGlass=mat(0xdbe6ea),DOORGLOW=[];
  // one door leaf on the south face (z = face, opening outward toward +z); kick = height of the solid bottom rail
  const leafS=(a,b,y0,y1,z,gm,kick)=>{box(a,b,y0,y1,z,z+.16,steelF);box(a+.22,b-.22,y0+kick,y1-.25,z+.16,z+.2,gm);DOORGLOW.push(['s',a+.22,b-.22,y0+kick,y1-.25,z+.21]);};
  // version 20 (Robert, S014 follow-up): the three doors onto the upper deck are replaced by one big glass door: a 16 ft opening (x 39.6..55.4) with four steel-framed folding glass panels
  box(39.3,55.7,10,18.4,85,85.1,white);
  [0,1,2,3].forEach(i=>{const a=39.6+i*3.95,b=a+3.95;leafS(a+.02,b-.02,10,18.1,85.1,doorGlass,.6);});
  [47.3,47.7].forEach(x=>box(x-.04,x+.04,12.8,15.6,85.3,85.42,C.rail));
  [[29,32],[48,51]].forEach(([a,b])=>box(a,b,3,6.6,85,85.25,glass));
  box(56,56.3,-.5,21,40,62,darkWood);
  // existing upper deck: now only along the east face, on round concrete columns
  // version 28 (Patrick, S023): the back (south) part of the upper deck and its white pergola are removed; the deck stops at the line of the back wall (z 85)
  wbox(56,64,9.4,10,62,85,C.upper,'z');
  [64,74,84.2].forEach(z=>cyl(.75,9.9,63.2,-.5,z,conc,14));
  const rail=(x0,z0,x1,z1,y)=>{const L=Math.hypot(x1-x0,z1-z0),alongX=z0===z1;
    [1.3,2.5,3.5].forEach(h=>alongX?box(x0,x1,y+h-.1,y+h+.1,z0-.1,z0+.1,C.rail):box(x0-.1,x0+.1,y+h-.1,y+h+.1,z0,z1,C.rail));
    const n=Math.max(1,Math.round(L/6));for(let i=0;i<=n;i++){const x=x0+(x1-x0)*i/n,z=z0+(z1-z0)*i/n;box(x-.15,x+.15,y,y+3.6,z-.15,z+.15,C.rail);}};
  rail(64,62,64,85,10);rail(56,85,64,85,10);
  // version 28: with the deck gone, the big folding glass door gets a black steel Juliet railing just outside it
  rail(39.3,85.6,55.7,85.6,10);box(39.3,55.7,9.7,10,85.15,86,steelF);

  // ROBERT'S SERVICE PLAN
  // kitchen double door where the window is now, on the south wall under the deck
  box(36.6,43.4,0,7.9,85,85.2,white);
  // version 19: now a pair of steel-framed glass doors with a kick plate and horizontal push bars
  leafS(37,39.95,0,7.5,85.2,doorGlass,1);leafS(40.05,43,0,7.5,85.2,doorGlass,1);
  [[37.4,39.6],[40.4,42.6]].forEach(([a,b])=>box(a,b,3.4,3.6,85.4,85.55,C.rail));
  // wall at the deck columns makes the hidden service corridor; staff door at its east end; partition keeps guests on the restroom side
  box(24,64,-.5,9.4,93,93.4,C.wood);box(63.6,64,0,8,85.2,93,clad);box(56.3,64,0,9.4,84.8,85.2,C.wood);
  // guest restroom door on the east wall, under the deck
  // version 19: steel-framed door of frosted glass (obscured for privacy), with a pull bar
  box(56,56.3,0,7.5,65.5,69,steelF);box(56.3,56.34,.8,7.25,65.72,68.78,frostGlass);box(56.34,56.46,2.6,5,65.95,66.05,C.rail);
  DOORGLOW.push(['e',56.35,56.36,.8,7.25,65.72,68.78]);
  // version 5: glass double door on the upper floor's east wall, onto the upper deck beside the stairs down to the high deck
  box(56,56.2,9.6,18.2,65.4,72.6,white);
  [[65.8,69.15],[69.25,72.2]].forEach(([a,b])=>{box(56.2,56.32,10,17.8,a,b,C.dark);box(56.32,56.36,10.6,17.2,a+.3,b-.3,glass);});
  [68.8,69.6].forEach(z=>box(56.36,56.5,13,15.2,z-.06,z+.06,C.rail));

  // front terrace edge, and steps from street level down to the high deck
  const stepM=mat(0xa9a39a);
  rail(62,.5,62,17,8.5);rail(62,21,62,36,8.5);
  stairs(62,19,8.5,5,1,0,4,stepM);
