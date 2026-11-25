  const {T,scene,C,mat,put,box,cyl,deckMats,stairs}=kit;
  const BX=92,BZ=56.5;  // center of the bar: the middle of the garden (version 25)
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
