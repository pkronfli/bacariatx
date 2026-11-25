  // version 18: MORE BACARI NIGHT LIGHT. Everything in this group shows only at night (the page's Night button sets lamps[]).
  {const night=new T.Group();night.visible=false;scene.add(night);
   const gc=document.createElement('canvas');gc.width=gc.height=64;{const g=gc.getContext('2d'),gr=g.createRadialGradient(32,32,0,32,32,32);
     gr.addColorStop(0,'rgba(255,226,160,1)');gr.addColorStop(.22,'rgba(255,190,100,.6)');gr.addColorStop(1,'rgba(255,150,60,0)');g.fillStyle=gr;g.fillRect(0,0,64,64);}
   const glowTex=new T.CanvasTexture(gc),haloM=new T.SpriteMaterial({map:glowTex,transparent:true,depthWrite:false,blending:T.AdditiveBlending});
   const halo=(x,y,z,s,par)=>{const sp=new T.Sprite(haloM);sp.position.set(x,y,z);sp.scale.set(s,s,1);(par||night).add(sp);return sp;};
   const flameM=new T.MeshBasicMaterial({color:0xffc35a}),hurrM=new T.MeshLambertMaterial({color:0xd9a35a,transparent:true,opacity:.45,emissive:0x6a3a10}),
     waxM=new T.MeshBasicMaterial({color:0xf3e6cc}),lantG=new T.MeshBasicMaterial({color:0xffcf80}),iron=mat(0x1c1b1a),stone=mat(0xcfc6b2);
   // candles on every table: amber glass hurricane, wax, flame, halo
   const CND=[];TBLS.forEach(([x,y,z,w,d,ry])=>{const n=w>4?2:1;for(let k=0;k<n;k++){const [px,pz]=loc(x,z,ry,n>1?(k?1.6:-1.6):0,0);CND.push([px,y+2.45,pz]);}});
   // tea lights around the bar top
   for(let i=0;i<14;i++){const a=i/14*Math.PI*2;CND.push([BX+Math.cos(a)*6.2,3.65,BZ+Math.sin(a)*6.2]);}
   {const gH=new T.CylinderGeometry(.24,.2,.6,10,1,true),gW=new T.CylinderGeometry(.12,.12,.16,8),gF=new T.ConeGeometry(.06,.2,6);
    const mk=(g,m)=>{const im=new T.InstancedMesh(g,m,CND.length);night.add(im);return im;};const iH=mk(gH,hurrM),iW=mk(gW,waxM),iF=mk(gF,flameM),O3=new T.Object3D();
    CND.forEach(([x,y,z],i)=>{O3.position.set(x,y+.3,z);O3.updateMatrix();iH.setMatrixAt(i,O3.matrix);O3.position.set(x,y+.08,z);O3.updateMatrix();iW.setMatrixAt(i,O3.matrix);
      O3.position.set(x,y+.27,z);O3.updateMatrix();iF.setMatrixAt(i,O3.matrix);halo(x,y+.3,z,1.5);});}
   // fairy lights wrapped along the oak limbs and hanging through the underside of each canopy
   {let sd=4242;const rn=()=>{sd=(sd*16807)%2147483647;return sd/2147483647;};const P=[];
    FAIRY.forEach(([a,b,r])=>{if(r<.12)return;const d=b.clone().sub(a),L=d.length(),n=Math.max(2,Math.round(L*1.1)),u=new T.Vector3(),v=new T.Vector3();
      u.set(1,0,0).cross(d).normalize();if(u.lengthSq()<.1)u.set(0,0,1);v.copy(d).cross(u).normalize();
      for(let i=0;i<n;i++){const t=(i+rn())/n,ang=t*L*1.6+rn(),rr=r*1.15+.05;P.push(a.x+d.x*t+(u.x*Math.cos(ang)+v.x*Math.sin(ang))*rr,a.y+d.y*t+(u.y*Math.cos(ang)+v.y*Math.sin(ang))*rr,a.z+d.z*t+(u.z*Math.cos(ang)+v.z*Math.sin(ang))*rr);}});
    FLEAF.forEach(([p,s])=>{for(let i=0;i<10;i++){const a=rn()*6.283,q=Math.sqrt(rn())*s*.95;P.push(p.x+Math.cos(a)*q,p.y-s*.32-rn()*s*.35,p.z+Math.sin(a)*q);}});
    const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(P,3));
    const fairy=new T.Points(g,new T.PointsMaterial({color:0xffd58a,size:.85,map:glowTex,transparent:true,depthWrite:false,blending:T.AdditiveBlending}));
    fairy.visible=false;trees.add(fairy);lamps.push({set intensity(v){fairy.visible=!!v;}});}
   // stone fire pit on the front terrace lawn, logs by day, flames at night
   {const fx=27,fz=33.5,fy=8.5;cyl(2.6,1.3,fx,fy,fz,stone,20);cyl(2.1,.06,fx,fy+1.3,fz,iron,20);
    [[0,.5],[1.1,-.6],[2.2,.9]].forEach(([a,o])=>{const lg=put(new T.CylinderGeometry(.16,.16,2.6,6),mat(0x4a3423),fx+Math.cos(a)*.2,fy+1.45,fz+o*.3);lg.rotation.set(Math.PI/2,a,0);});
    [[0,0,1.6],[.5,.3,1.1],[-.5,-.2,1.2],[.2,-.5,1]].forEach(([dx,dz,h])=>{const f=put(new T.ConeGeometry(.45,h,7),new T.MeshBasicMaterial({color:h>1.3?0xffb347:0xff7b2a}),fx+dx,fy+1.5+h/2,fz+dz,night);f.castShadow=false;});
    halo(fx,fy+2.4,fz,7);const fl=new T.PointLight(0xff9a4a,0,26,1.6);fl.position.set(fx,fy+3,fz);scene.add(fl);lamps.push(fl);}
   // Edison pendants on a steel ring over the bar, warm glow strip under the counter
   {const ringR=6.2,ry=12.2;const rg=put(new T.TorusGeometry(ringR,.09,6,48),iron,BX,ry,BZ);rg.rotation.x=Math.PI/2;
    for(let i=0;i<4;i++){const a=i*Math.PI/2;box(BX+Math.min(0,Math.cos(a)*ringR)-.05,BX+Math.max(0,Math.cos(a)*ringR)+.05,ry-.05,ry+.05,BZ+Math.min(0,Math.sin(a)*ringR)-.05,BZ+Math.max(0,Math.sin(a)*ringR)+.05,iron);}
    for(let i=0;i<12;i++){const a=(i+.5)/12*Math.PI*2,x=BX+Math.cos(a)*ringR,z=BZ+Math.sin(a)*ringR,drop=2+((i*7)%3)*.5;box(x-.02,x+.02,ry-drop,ry,z-.02,z+.02,iron);
      put(new T.SphereGeometry(.3,10,8),bulbMat,x,ry-drop-.25,z).castShadow=false;halo(x,ry-drop-.25,z,2.4);}
    const strip=new T.Mesh(new T.TorusGeometry(7.45,.06,4,72),lantG);strip.rotation.x=Math.PI/2;strip.position.set(BX,3.05,BZ);night.add(strip);
    const bl=new T.PointLight(0xffc27a,0,22,1.5);bl.position.set(BX,9,BZ);scene.add(bl);lamps.push(bl);}
   // iron lanterns along the tall back wall and the inside of the east fence
   const lantern=(x,y,z,fx)=>{const g=new T.Group();g.position.set(x,y,z);scene.add(g);
     box(-.45,.45,-.7,.7,-.45,.45,iron,g);const gl=new T.Mesh(new T.BoxGeometry(.7,1.1,.7),lantG);g.add(gl);put(new T.ConeGeometry(.6,.5,4),iron,0,.95,0,g).rotation.y=Math.PI/4;
     halo(x+fx[0]*.6,y,z+fx[1]*.6,3.2);};
   for(let x=62;x<=132;x+=14)lantern(x,8,126.7,[0,-1]);
   for(let z=46;z<=100;z+=13)lantern(136.4,9.6,z,[-1,0]);
   // version 19: the glass back doors glow warm from inside at night
   {const dg=new T.MeshBasicMaterial({color:0xffd9a0}),df=new T.MeshBasicMaterial({color:0xf6e2c2});
    DOORGLOW.forEach(d=>{const me=d[0]==='s'?box(d[1],d[2],d[3],d[4],d[5],d[5]+.01,dg,night):box(d[1],d[2],d[3],d[4],d[5],d[6],df,night);me.castShadow=false;});
    halo(41.5,4,86.5,7);halo(46,14,86,9);halo(56.8,4,67.2,5);}
   lamps.push({set intensity(v){night.visible=!!v;}});}
