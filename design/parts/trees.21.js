  // trees, traced from the satellite view: two large live oaks (front, and the heritage oak behind the building) and smaller trees
  const trees=new T.Group();scene.add(trees);
  // version 12: TEXAS LIVE OAKS. A short thick trunk with a flared base forks low into long, sinuous limbs that reach out more than
  // up; side branches and many flattened leaf clusters (two greens) make a broad dense dome much wider than it is tall.
  // liveOak({x,y,z, F fork height, r trunk radius, R canopy radius, H height to top of canopy, n limbs, low:[azimuths of sweeping
  // low limbs], avoid:[azimuth,k] shortens limbs that way, lean,dir: trunk lean (radians) and its azimuth (x=cos, z=sin), bark, seed})
  const treeMat2=mat(0x557040,{transparent:true,opacity:.35,depthWrite:false});
  treeMat.color.setHex(0x3e5a2f);
  const barkM=mat(0x4a4038),UPV=new T.Vector3(0,1,0),LEAF=new T.IcosahedronGeometry(1,2);
  const FAIRY=[],FLEAF=[];   // version 18: limbs and leaf clusters of the live oaks, for fairy lights
  const limb=(p0,p1,r0,r1,m)=>{FAIRY.push([p0.clone(),p1.clone(),r0]);const dd=p1.clone().sub(p0),L=dd.length(),me=new T.Mesh(new T.CylinderGeometry(r1,r0,L,8),m);
    me.position.copy(p0).addScaledVector(dd,.5);me.quaternion.setFromUnitVectors(UPV,dd.normalize());me.castShadow=true;me.receiveShadow=true;trees.add(me);};
  const liveOak=o=>{let sd=o.seed||11;const rn=()=>{sd=(sd*16807)%2147483647;return sd/2147483647;};
    const m=o.bark||barkM,R=o.R,lean=o.lean||0,dir=o.dir||0,r=o.r;
    const base=new T.Vector3(o.x,o.y,o.z),td=new T.Vector3(Math.sin(lean)*Math.cos(dir),Math.cos(lean),Math.sin(lean)*Math.sin(dir));
    const mid=base.clone().addScaledVector(td,o.F*.55).add(new T.Vector3((rn()-.5)*.5*r,0,(rn()-.5)*.5*r)),fork=base.clone().addScaledVector(td,o.F);
    limb(base.clone().addScaledVector(td,-.6),base.clone().addScaledVector(td,1.4),r*1.5,r*1.05,m);   // root flare
    limb(base,mid,r*1.08,r*.96,m);limb(mid,fork,r*.96,r*.86,m);
    const top=o.y+o.H,crownY=top-R*.17;
    const leaf=(p,s)=>{FLEAF.push([p.clone(),s]);const c=new T.Mesh(LEAF,rn()<.62?treeMat:treeMat2);c.position.copy(p);c.scale.set(s*(.95+rn()*.3),s*(.42+rn()*.12),s*(.95+rn()*.3));
      c.rotation.y=rn()*6.3;c.castShadow=true;trees.add(c);};
    const dirV=(az,h,y)=>new T.Vector3(Math.cos(az)*h,y,Math.sin(az)*h);
    const reachK=az=>o.avoid?1-o.avoid[1]*Math.max(0,Math.cos(az-o.avoid[0])):1;
    const grow=(az,low)=>{const reach=R*(.66+rn()*.16)*reachK(az),tipY=low?fork.y+(crownY-fork.y)*.28:fork.y+(crownY-fork.y)*(.5+rn()*.22);
      const fr=low?[.34,.36,.30]:[.32,.36,.32],ry=low?[.75,.3,-.05]:[.55,.33,.12],rr=[r*.62,r*.42,r*.25,r*.11];
      let p=fork.clone(),a=az;const pts=[p];
      for(let k=0;k<3;k++){a+=(rn()-.5)*.45;const q=p.clone().add(dirV(a,reach*fr[k],(tipY-fork.y)*ry[k]+(rn()-.5)*.6));limb(p,q,rr[k],rr[k+1],m);pts.push(q);p=q;
        if(k<2){const sa=a+(rn()<.5?-1:1)*(.55+rn()*.4),sl=R*(.22+rn()*.12),sq=q.clone().add(dirV(sa,sl,sl*.28));limb(q,sq,rr[k+1]*.7,rr[k+1]*.25,m);
          leaf(sq.clone().add(new T.Vector3(0,R*.06,0)),R*(.16+rn()*.05));}}
      // leaf clusters along the outer two-thirds of the limb, scattered sideways and up so the crown reads billowy, not blobby
      for(let j=0;j<6;j++){const t=.35+j*.13,a2=pts[1+Math.min(2,Math.floor(t*3))],b2=pts[Math.min(3,2+Math.floor(t*3))],q=a2.clone().lerp(b2,(t*3)%1);
        leaf(q.add(new T.Vector3((rn()-.5)*R*.22,R*(.06+rn()*.1),(rn()-.5)*R*.22)),R*(.15+rn()*.06));}
      leaf(pts[3].clone().add(new T.Vector3(0,R*.04,0)),R*(.19+rn()*.05));};
    const n=o.n||6,ph=rn()*6.3;
    for(let i=0;i<n;i++)grow(ph+i*2*Math.PI/n+(rn()-.5)*.5,false);
    (o.low||[]).forEach(az=>grow(az,true));
    // crown fill: the top of the dome
    const cc=fork.clone();for(let i=0;i<10;i++){const a=rn()*6.3,h=R*(i?.12+rn()*.4:0)*reachK(a);leaf(new T.Vector3(cc.x+Math.cos(a)*h,crownY+R*(.04-h/R*.18+(rn()-.5)*.06),cc.z+Math.sin(a)*h),R*(.2+rn()*.06));}
    return {fork,crown:new T.Vector3(fork.x,crownY,fork.z)};};
  const fallMat=treeMat2;
  const OAKS=[];
  OAKS.push([liveOak({x:32,y:8.5,z:18,F:8.5,r:1.6,R:25,H:31,n:7,low:[Math.PI*.95],seed:301}),32,8.5,18,1.6,[.6,2.7,4.6]]);                       // front oak over the terrace
  OAKS.push([liveOak({x:17,y:-1.2,z:108,F:9.5,r:2.0,R:29,H:38,n:7,low:[Math.PI*.75],avoid:[-Math.PI/2,.45],seed:577}),17,-1.2,108,2.0,[.3,2.4,4.4]]); // heritage oak behind the building
  OAKS.push([liveOak({x:100,y:0,z:14,F:10,r:1.1,R:16,H:25,n:6,seed:83}),100,5,14,1.1,[1.2,4.3]]);                                              // oak on the high deck
  OAKS.push([liveOak({x:133,y:0,z:99,F:8,r:.9,R:13,H:21,n:5,avoid:[0,.5],seed:919}),133,0,99,.9,[2.4,4.4]]);                                   // east-side oak
