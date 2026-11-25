  // DECKS: high along the W 6th side, medium at the north-east corner and down the east side to the courtyard's back fence (z 88).
  // Version 25 (Patrick): the high deck is 18 ft deep, the same width as the east (medium) deck.
  const deckAt=(x0,x1,z0,z1,y,top,base,along)=>wbox(x0,x1,base==null?0:base,y,z0,z1,top,along);
  deckAt(62,108,5,23,5,C.high);deckAt(57,65,23,54.5,5,C.high,null,'z');
  // the upper deck railing opens at its north end: stairs down to the high deck
  rail(56,62,58.5,62,10);wstairs(61,62,10,5,0,-1,5,C.high);
  deckAt(108,137,17,23,3,C.med);deckAt(119,137,23,88,3,C.med,null,'z');
  wstairs(108,20,5,3,1,0,5,C.med);
  rail(65,23,65,54.5,5);rail(65,23,90,23,5);rail(94,23,108,23,5);rail(108,23,119,23,3);rail(119,23,119,54.5,3);rail(119,58.5,119,88,3);

  // GARDEN (version 25): the bar in the middle, four seating pockets (quadrants) set into planting around it, split by two
  // river-rock cross paths: north-south from the high-deck stairs to the statue, east-west from the building to the medium-deck
  // stairs. Side paths come from the restroom door and the service door.
  wstairs(92,23,5,0,0,1,4,C.high);wstairs(119,56.5,3,0,-1,0,4,C.med);
  box(90,94,.12,.3,30.5,45.5,C.rock);box(90,94,.12,.3,67.5,85,C.rock);                 // north-south
  box(57,80.5,.12,.3,54.7,58.3,C.rock);box(103.5,115,.12,.3,54.7,58.3,C.rock);          // east-west
  box(56.3,70,.12,.3,65,68.6,C.rock);box(66.4,70,.12,.3,58.3,65,C.rock);               // restroom door
  box(62,90,.12,.3,84.2,87.6,C.rock);                                                    // service door, along the back fence
  const ringG=new T.RingGeometry(7.2,11.5,64);ringG.rotateX(-Math.PI/2);put(ringG,C.rock,BX,.31,BZ);

  // central bar
  const ring=(ro,ri,d,m,y)=>{const sh=new T.Shape();sh.absarc(0,0,ro,0,Math.PI*2,false);const h=new T.Path();h.absarc(0,0,ri,0,Math.PI*2,true);sh.holes.push(h);
    const geo=new T.ExtrudeGeometry(sh,{depth:d,bevelEnabled:false,curveSegments:56});geo.rotateX(-Math.PI/2);return put(geo,m,BX,y,BZ);};
  ring(7,4.6,3.4,C.stucco,0);ring(7.6,4.3,.25,C.top,3.4);
  cyl(2,5.5,BX,0,BZ,C.wood,24);cyl(2.6,.2,BX,3.2,BZ,C.top,24);cyl(.25,11.5,BX,5.5,BZ,C.rail,8);
  const stoolRing=[];for(let i=0;i<18;i++)stoolRing.push(i/18*Math.PI*2);
