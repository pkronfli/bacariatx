  // DECKS: high along the W 6th side, medium at the north-east corner and down the east side, low along the back
  const deckAt=(x0,x1,z0,z1,y,top,base,along)=>wbox(x0,x1,base==null?0:base,y,z0,z1,top,along);
  deckAt(62,108,5,40,5,C.high);deckAt(57,65,40,54.5,5,C.high,null,'z');
  // the upper deck railing opens at its north end: stairs down to the high deck
  rail(56,62,58.5,62,10);wstairs(61,62,10,5,0,-1,5,C.high);
  deckAt(108,137,17,40,3,C.med);deckAt(119,137,40,104,3,C.med,null,'z');
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
