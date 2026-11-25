  // string lights radiating from the bar
  const bulbMat=new T.MeshBasicMaterial({color:0xfff4d6});
  const bulbG=new T.SphereGeometry(.28,8,6),lineMat=new T.LineBasicMaterial({color:0x2b2b2b});
  const P0=new T.Vector3(BX,17,BZ),glow=[];
  [[66,27.5],[87.5,27.2],[96.5,27.2],[118,27.5],[118,86.5],[96.5,86.5],[88.3,83.3],[65.6,82.5]].forEach(([x,z])=>{
    const P1=new T.Vector3(x,13,z);cyl(.18,13,x,0,z,C.rail,6);const pts=[];
    for(let i=0;i<=24;i++){const t=i/24,q=P0.clone().lerp(P1,t);q.y-=3*4*t*(1-t);pts.push(q);if(i%2===1){const b=new T.Mesh(bulbG,bulbMat);b.position.copy(q);scene.add(b);}}
    scene.add(new T.Line(new T.BufferGeometry().setFromPoints(pts),lineMat));glow.push(pts[12]);});
  const lamps=[new T.PointLight(0xffc678,0,50,1.4)];lamps[0].position.set(BX,10,BZ);
  glow.forEach((q,i)=>{if(i%2===0){const l=new T.PointLight(0xffc678,0,34,1.4);l.position.copy(q);lamps.push(l);}});
  lamps.forEach(l=>scene.add(l));
