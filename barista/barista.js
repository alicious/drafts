colors = 
  [ "#fcf7e9" //natural
  , "#dbc5a4" //flax
  //, "#ffd57a" //chamois
  , "#eabc7b" //honey
  , "#846c48" //sierra
  ];

colorPlan = 
  [ doubleDouble([3,3,3,2],[3,3,3,3])
  , repeat(8, [3,3,3,2])
  , doubleDouble([3,2,3,2],[3,3,3,2])
  , repeat(8, [3,2,3,2])
  , doubleDouble([3,2,1,2],[3,2,3,2])
  , repeat(8, [3,2,1,2])
  , doubleDouble([3,2,1,0],[3,2,1,2])
  , repeat(8, [3,2,1,0])
  , doubleDouble([1,2,1,0],[3,2,1,0])
  , repeat(8, [1,2,1,0])
  , doubleDouble([1,0,1,0],[1,2,1,0])
  , repeat(8, [1,0,1,0])
  , doubleDouble([1,0,0,0],[1,0,1,0])
  , repeat(8, [1,0,0,0])
  , doubleDouble([0,0,0,0],[1,0,0,0])
  , repeat(64, [0,0,0,0])
  ];

for (var i = 0; i < colorPlan.length; i++ ) {
  threads = threads.concat(shuffle(colorPlan[i]));
}

function doubleDouble (a, b) {
  return repeat(2, repeat(2, a.concat(b)));
}
