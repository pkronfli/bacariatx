  // version 17: STREET DETAIL. W 6th one-way westbound (three lanes, north-curb parking), Pressler one-way north below W 6th and
  // two-way above it, crosswalks across Pressler, ONE WAY signs, street lights, and cars all heading the right way.
  {const yel=mat(0xe8b923),wht=mat(0xf2f0ea),gut=mat(0xbdb8ae),poleG=mat(0x6c7075),Y=8;
   const mk=(x0,x1,z0,z1,m)=>{const me=box(x0,x1,Y,Y+.05,z0,z1,m);me.castShadow=false;};
   const segs=[[-170,-108],[-68,340]];
   segs.forEach(([a,b])=>{mk(a,b,-13.4,-13.05,yel);                                                       // yellow edge line on the left (south) side
     mk(a,b,-44.2,-43.85,wht);                                                                             // parking lane line along the north curb
     for(let x=a;x<b-6;x+=40){mk(x,x+10,-33.5,-33.2,wht);mk(x,x+10,-22.9,-22.6,wht);}});                    // dashed lane lines
   [[-12,-13.6],[-52,-50.4]].forEach(([e,g2])=>{const me=box(-170,340,Y,Y+.03,Math.min(e,g2),Math.max(e,g2),gut);me.castShadow=false;});
   for(let x=-101;x<=-77;x+=4){mk(x,x+2,-10,-2,wht);mk(x,x+2,-62,-54,wht);}                                   // crosswalks across Pressler
   for(let x=173;x<=195;x+=4)mk(x,x+2,-62,-54,wht);                                                         // and across Winflo Dr
   // lane arrows pointing west (the direction of travel), and north on Pressler below W 6th
   const arrow=(x,z,y,ry)=>{const g=new T.Group();g.position.set(x,y,z);g.rotation.y=ry;scene.add(g);
     const a1=box(-3,3,0,.05,-.3,.3,wht,g);const sh=new T.Shape();sh.moveTo(-5.2,0);sh.lineTo(-3,-1.3);sh.lineTo(-3,1.3);sh.lineTo(-5.2,0);
     const hd=new T.Mesh(new T.ShapeGeometry(sh),wht);hd.rotation.x=-Math.PI/2;hd.position.y=.06;g.add(hd);};
   [[60,-38.6],[60,-28],[60,-17.4],[250,-38.6],[250,-28],[250,-17.4],[-140,-28]].forEach(([x,z])=>arrow(x,z,Y+.02,0));
   {const yz=z=>8+(-6-8)*z/330;[30,90].forEach(z=>arrow(-88,z,yz(z)+.08,-Math.PI/2));}
   // ONE WAY signs at the Pressler corners, arrows pointing west
   const owTex=right=>{const c=document.createElement('canvas');c.width=256;c.height=86;const g=c.getContext('2d');g.fillStyle='#111';g.fillRect(0,0,256,86);
     g.fillStyle='#fff';g.fillRect(6,6,244,74);g.save();if(right){g.translate(256,0);g.scale(-1,1);}g.fillStyle='#111';g.beginPath();g.moveTo(14,43);g.lineTo(60,14);g.lineTo(60,30);g.lineTo(242,30);
     g.lineTo(242,56);g.lineTo(60,56);g.lineTo(60,72);g.closePath();g.fill();g.restore();g.fillStyle='#fff';g.font='bold 22px Arial';g.textAlign='center';g.fillText('ONE WAY',right?106:150,51);
     return new T.MeshLambertMaterial({map:new T.CanvasTexture(c)});};
   const owF=owTex(false),owB=owTex(true);   // front faces +z, back faces -z; both point west
   [[-69,-11],[-107,-53],[-69,-53]].forEach(([x,z])=>{cyl(.12,10.5,x,8.5,z,poleG,6);
     put(new T.PlaneGeometry(3,1),owF,x,17.6,z+.03);const bk=put(new T.PlaneGeometry(3,1),owB,x,17.6,z-.03);bk.rotation.y=Math.PI;});
   // cobra-head street lights; the heads glow at night
   const headM=new T.MeshBasicMaterial({color:0xd9d4c4});lamps.push({set intensity(v){headM.color.setHex(v?0xffe2a8:0xd9d4c4);}});
   const sl2=(x,z,dir)=>{cyl(.28,24,x,8.5,z,poleG,8);box(x-.15,x+.15,31.6,32.1,Math.min(z,z+dir*7),Math.max(z,z+dir*7),poleG);
     box(x-.9,x+.9,31.3,32.1,z+dir*6.2-1.4,z+dir*6.2+1.4,poleG);const h=box(x-.7,x+.7,31.15,31.3,z+dir*6.2-1.1,z+dir*6.2+1.1,headM);h.castShadow=false;};
   [-150,-40,40,130,220,310].forEach(x=>sl2(x,-11,-1));[-130,-20,85,160,225,300].forEach(x=>sl2(x,-53,1));
   // cars: all heading west on W 6th (front faces -x); parked along the north curb, moving in the three lanes
   const glassC=mat(0x2a3440),tire=mat(0x1b1b1c),rim=mat(0x9a9d9f);const wheelG=new T.CylinderGeometry(1.05,1.05,.7,14);wheelG.rotateX(Math.PI/2);
   const car=(x,z,ry,hex,len,y)=>{len=len||15;const g=new T.Group();g.position.set(x,y==null?Y:y,z);g.rotation.y=ry;scene.add(g);const bm=mat(hex);
     const b=(x0,x1,y0,y1,z0,z1,m)=>box(x0,x1,y0,y1,z0,z1,m,g);const L=len/2;
     b(-L,L,1.1,3.2,-3,3,bm);b(-L*.45,L*.35,3.2,4.9,-2.7,2.7,glassC);b(-L*.42,L*.32,4.9,5.1,-2.6,2.6,bm);
     b(L-.1,L+.05,2.3,2.8,-2.6,-1.6,mat(0xfff3cf));b(L-.1,L+.05,2.3,2.8,1.6,2.6,mat(0xfff3cf));b(-L-.05,-L+.1,2.3,2.8,-2.6,-1.6,mat(0xa3201c));b(-L-.05,-L+.1,2.3,2.8,1.6,2.6,mat(0xa3201c));
     [[-L*.62,-2.75],[L*.62,-2.75],[-L*.62,2.75],[L*.62,2.75]].forEach(([wx,wz])=>{const w=new T.Mesh(wheelG,tire);w.position.set(wx,1.05,wz);w.castShadow=true;g.add(w);
       const r=new T.Mesh(new T.CylinderGeometry(.55,.55,.72,10).rotateX(Math.PI/2),rim);r.position.set(wx,1.05,wz);g.add(r);});};
   const COL=[0xf2f2f0,0xb9bdc2,0x1f2226,0x2b3d5e,0x9e2b25,0x5f6670,0x2f6f6a,0xd8cfbd,0x41474f];let ci=0;const W=Math.PI;
   [-150,-128,-45,-8,30,68,140,218,280,302].forEach(x=>car(x,-48.2,W,COL[ci++%9],x===68?17:15));                    // parked along the north curb
   car(15,-38.6,W,COL[ci++%9]);car(150,-28,W,COL[ci++%9]);car(-20,-17.4,W,COL[ci++%9],17);car(260,-17.4,W,COL[ci++%9]);   // moving west
   {const yz=z=>8+(-6-8)*z/330,sl=Math.atan2(14,330);[[-94.5,70],[-94.5,92]].forEach(([x,z])=>{car(x,z,-Math.PI/2,COL[ci++%9],15,yz(z));});}  // parked on Pressler
   [[90,-120,0],[118,-200,0],[146,-120,0],[235,-131,0],[262,-131,0]].forEach(([x,z,r])=>car(x+4,z+9,Math.PI/2,COL[ci++%9],15,8.5));  // in the lots across the street
  }
