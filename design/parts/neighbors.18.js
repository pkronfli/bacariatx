  // title company (west neighbor): a house with two hip roofs
  const shingle=mat(0x9a968c,{side:T.DoubleSide}),siding=mat(0xe6e1d6);
  box(-52,-10,-1,19,12,50,siding);hip(-54,-8,10,52,19,8,shingle);
  box(-42,-8,-1,14.5,50,86,siding);hip(-44,-6,50,88,14.5,6.5,shingle);
  // back alley between the property and the apartments, from Pressler St to the parking garage
  sbox(-74,215,-3,-1.8,130,152,asphT);
  // Pressler Apartments: five stories in a ring around a pool courtyard, with the parking garage to the east
  const backB=new T.Group();scene.add(backB);   // version 14: apartments + garage, hideable from the page
  const apt=mat(0xc9ccd0),aptD=mat(0x9aa3ad),aptRoof=mat(0xdddcd6);
  [[-42,100,152,192],[-42,100,268,306],[-42,0,192,268],[58,100,192,268]].forEach(([x0,x1,z0,z1])=>{box(x0,x1,-3,55,z0,z1,apt,backB);box(x0+1.5,x1-1.5,55,55.7,z0+1.5,z1-1.5,aptRoof,backB);});
  for(let f=0;f<5;f++){const y=3+f*10.4;box(-40,98,y,y+5.2,151.7,152,aptD,backB);box(-42.3,-42,y,y+5.2,156,302,aptD,backB);box(2,56,y,y+5.2,192,192.3,aptD,backB);}
  for(let x=-30;x<=90;x+=15)box(x-2.5,x+2.5,55.7,58,168,173,unitM,backB);
  box(0,58,-3,-1,192,268,C.garden,backB);box(14,44,-1,-.5,214,244,mat(0x4fb3c8),backB);
  box(104,215,-3,37,156,240,mat(0xc4c1b8),backB);box(105.5,213.5,37,37.5,157.5,238.5,mat(0xd9cfb6),backB);
  for(let f=0;f<4;f++){const y=1+f*9;box(104,215,y,y+4.5,155.7,156,mat(0x6f7275),backB);box(103.7,104,y,y+4.5,158,238,mat(0x6f7275),backB);}
  // neighbor parking lot, and the salon and print shop: a two-story flat-roof block with a lower wing on its east side
  wedge(138,189,0,152,8.5,1.5,asph);for(let z=24;z<=144;z+=9){const y=8.5-7*z/152;box(140,156,y,y+.06,z,z+.4,stripe);}
  box(189,226,-3,31,8,126,mat(0xe9e7e1));box(190.2,224.8,31,31.6,9.2,124.8,mat(0xd9d0b8));
  box(226,262,-3,23,14,126,mat(0xdad8d2));box(227,261,23,23.5,15,125,mat(0x9c9c98));
  [[200,30],[212,62],[204,98]].forEach(([x,z])=>box(x-2.5,x+2.5,31.6,34.2,z-2,z+2,unitM));
