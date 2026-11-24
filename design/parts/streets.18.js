  // version 16: STREETS. Asphalt and concrete drawn in code (speckle, patches, scored sidewalk joints), mapped in world feet.
  const surf=(base,fn,ft)=>{const c=document.createElement('canvas');c.width=c.height=256;const g=c.getContext('2d');g.fillStyle=base;g.fillRect(0,0,256,256);
    let sd=base.length*977+ft;const rn=()=>{sd=(sd*16807)%2147483647;return sd/2147483647;};fn(g,rn);const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.userData={ft};return t;};
  const asphT=surf('#3b3d40',(g,rn)=>{for(let i=0;i<5200;i++){const v=40+rn()*55|0;g.fillStyle=`rgb(${v},${v},${v+3})`;g.fillRect(rn()*256,rn()*256,1+rn()*1.6,1+rn()*1.6);}
      g.strokeStyle='rgba(15,15,15,.5)';g.lineWidth=1;for(let i=0;i<4;i++){g.beginPath();let x=rn()*256,y=rn()*256;g.moveTo(x,y);for(let k=0;k<6;k++){x+=(rn()-.5)*40;y+=(rn()-.5)*40;g.lineTo(x,y);}g.stroke();}},24);
  const walkT=surf('#cfcac0',(g,rn)=>{for(let i=0;i<2600;i++){const v=185+rn()*35|0;g.fillStyle=`rgb(${v},${v-3},${v-9})`;g.fillRect(rn()*256,rn()*256,1.4,1.4);}
      g.fillStyle='rgba(90,85,78,.55)';for(let k=0;k<256;k+=64){g.fillRect(k,0,2,256);g.fillRect(0,k,256,2);}},20);
  // box top faces span 0..1 in UV: repeat the texture by the box size in feet; wedge tops use world-feet UVs already
  const boxSurf=(t,w,d)=>{const tt=t.clone();tt.needsUpdate=true;tt.repeat.set(w/t.userData.ft,d/t.userData.ft);return new T.MeshLambertMaterial({map:tt});};
  const wedgeSurf=t=>{const tt=t.clone();tt.needsUpdate=true;tt.repeat.set(1/t.userData.ft,1/t.userData.ft);return new T.MeshLambertMaterial({map:tt});};
  const sbox=(x0,x1,y0,y1,z0,z1,t)=>{const me=box(x0,x1,y0,y1,z0,z1,boxSurf(t,x1-x0,z1-z0));me.castShadow=false;return me;};
  sbox(-170,340,-3,8,-52,-12,asphT);                                                   // W 6th, about 40 ft curb to curb (one-way westbound)
  // south sidewalk, with the curb cut for the neighbor's parking-lot driveway just east of the lot (x 138..152)
  sbox(-170,-102,-3,8.5,-12,0,walkT);sbox(-74,138,-3,8.5,-12,0,walkT);sbox(152,340,-3,8.5,-12,0,walkT);sbox(138,152,-3,8.5,-8.5,0,walkT);
  sbox(-102,-74,-3,8,-12,0,asphT);
  // north side: sidewalk with curb cuts (parking-lot driveway x 105..125, Winflo Dr x 172..198, lot entrance x 246..262), Pressler
  // continuing north, and ground at street level with the two parking lots and grass beyond
  [[-170,-102],[-74,105],[125,172],[198,246],[262,340]].forEach(([a,b])=>sbox(a,b,-3,8.5,-64,-52,walkT));
  [[105,125],[246,262]].forEach(([a,b])=>sbox(a,b,-3,8.5,-64,-55.5,walkT));
  sbox(-102,-74,-3,8,-300,-52,asphT);sbox(172,198,-3,8,-300,-52,asphT);                                   // Pressler and Winflo Dr, north
  sbox(-108,-102,-3,8.5,-300,-64,walkT);sbox(-74,-68,-3,8.5,-300,-64,walkT);sbox(166,172,-3,8.5,-300,-64,walkT);sbox(198,204,-3,8.5,-300,-64,walkT);
  {const grass=mat(0x7d9a58),lotA=mat(0x55585c);
   [[-170,-108],[-68,166],[204,340]].forEach(([a,b])=>{const me=box(a,b,-3,8.45,-300,-64,grass);me.castShadow=false;});
   [[80,170,-230,-89],[220,296,-186,-84]].forEach(([a,b,c,d])=>{const me=sbox(a,b,-3,8.5,c,d,asphT);});
   [[105,125,-89,-64],[246,262,-84,-64]].forEach(([a,b,c,d])=>sbox(a,b,-3,8.48,c,d,asphT));
   for(let x=84;x<166;x+=9){box(x,x+.3,8.5,8.53,-128,-110,mat(0xf2f0ea));box(x,x+.3,8.5,8.53,-210,-192,mat(0xf2f0ea));}
   for(let x=224;x<294;x+=9)box(x,x+.3,8.5,8.53,-140,-122,mat(0xf2f0ea));}
  // Pressler St, about 68 ft west of the property line, falling to the south
  wedge(-102,-74,0,330,8,-6,wedgeSurf(asphT));wedge(-74,-68,0,330,8.5,-5.9,wedgeSurf(walkT));wedge(-108,-102,0,330,8.5,-5.9,wedgeSurf(walkT));
  {const ap=mat(0xc9c4ba);wedge(138,152,-12,-8.5,8.03,8.5,ap,7.9);[[105,125],[246,262]].forEach(([a,b])=>wedge(a,b,-55.5,-52,8.5,8.03,ap,7.9));}
  wedge(-68,-1,0,130,8.5,-1,C.garden);
