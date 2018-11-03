colors = [
  "#FFFFFF", // white
  "#DDEEEE", // chambray
  "#BEF4DA", // vert pale
  "#18C4AE", // turquoise
  "#000000", // black
  "#9C3930", // brick
  "#BD4E29", // rouille
  "#D27822", // orange brule
  "#D8A642", // vieil or
];

var fibonacci = [1, 1];
for (var i = 2; i < 5; i++) {
  fibonacci.push(fibonacci[i-1] + fibonacci[i-2]);
}
for (var i = 0; i < fibonacci.length; i++) {
//  fibonacci[i] = fibonacci[i] * 2;
}
fibonacci = stretch(2, fibonacci);

shafts = 8;
treadles = 8;

// THREADING
var threadingLine = collapse(buildPoint(buildQuarterCircle(52), 4), 8);
for (var i = 0; i < threadingLine.length; i++) {
  threading.push(threadingLine[i]);
  threading.push(plus(threadingLine[i], 4));
}

// TREADLING/TIEUP

var circleSlice = buildQuarterCircle(200).slice(10, 150);
var treadlingLine = circleSlice;
for (var i = 0; i < circleSlice.length; i++) {
  treadlingLine[i] = treadlingLine[i] - 133;
}

treadling = collapse(buildPoint(pointReflect(treadlingLine), 4), 8);

//advancing point
/*
*/
//treadling = buildNetworkTreadling(stretch(3, repeat(50, [8, 7, 6, 5, 4, 3, 2, 1])));
tieup = build8ShaftTwillTieup([1, 2, 4, 8]);

//taquete
/*
//treadling = buildTaqueteTreadling(collapse(buildPoint(pointReflect(treadlingLine.slice(49)), 4), 8));
treadling = buildTaqueteTreadling(treadling);

treadles = 10
tieup = build8ShaftTaqueteTieup();
*/


// BLUE-WHITE
var blueWhite = [];
var blueWhiteGuide = [];

var blueWhiteBouts = [
  [0, 1, 0, 1],
  [0, 1, 2, 1],
  [0, 1, 2, 3],
  ];

var blueWhiteBlend = fibonacci;
for (var i = 0; i < 4; i++) {
  blueWhite = blueWhite.concat(blueWhiteBouts[0]);
  blueWhiteGuide.push(0);
}

for (var i = 0; i < blueWhiteBlend.length; i++) {
  for (var j = 0; j < blueWhiteBlend[blueWhiteBlend.length - (i+1)]; j++) {
    blueWhite = blueWhite.concat(blueWhiteBouts[0]);
    blueWhiteGuide.push(0);
  }
  for (var j = 0; j < blueWhiteBlend[i]; j++) {
    blueWhite = blueWhite.concat(blueWhiteBouts[1]);
    blueWhiteGuide.push(1);
  }
}

for (var i = 0; i < blueWhiteBlend.length; i++) {
  for (var j = 0; j < blueWhiteBlend[blueWhiteBlend.length - (i+1)]; j++) {
    blueWhite = blueWhite.concat(blueWhiteBouts[1]);
    blueWhiteGuide.push(1);
  }
  for (var j = 0; j < blueWhiteBlend[i]; j++) {
    blueWhite = blueWhite.concat(blueWhiteBouts[2]);
    blueWhiteGuide.push(2);
  }
}

blueWhite = shuffleBouts(blueWhite, 4);

// RED-ORANGE
var redOrange = [];
var redOrangeGuide = [];

var redOrangeBouts = [
  [4, 5, 6, 7],
  [7, 8, 4, 4]
  ];

var redOrangeBlend = stretch(2, fibonacci);

for (var i = 0; i < redOrangeBlend.length; i++) {
  for (var j = 0; j < redOrangeBlend[redOrangeBlend.length - (i+1)]; j++) {
    redOrange = redOrange.concat(redOrangeBouts[0]);
    redOrangeGuide.push(0);
  }
  for (var j = 0; j < redOrangeBlend[i]; j++) {
    redOrange = redOrange.concat(redOrangeBouts[1]);
    redOrangeGuide.push(1);
  }
}

for (var i = 0; i < 4; i++) {
  redOrange = redOrange.concat(redOrangeBouts[1]);
  redOrangeGuide.push(1);
}

redOrange = shuffleBouts(redOrange, 4);

// COLOR ASSIGNMENT
threads = redOrange.concat(blueWhite);

/*
threads.push(4);
for (var i = 0; i < 400; i++) {
  threads.push(blueWhite[i]);
  threads.push(redOrange[i]);
}
threads.push(4);

for (var i = 0; i < treadling.length; i++) {
  weftThreads.push(4);
}

logWif();
*/


// WINDING GUIDE
var guideCounter = 1;
var combinedGuide = [];

/*
log("COMBINED GUIDE:");
for (var i = 0; i < blueWhiteGuide.length; i++) {
  combinedGuide.push([blueWhiteGuide[i]].concat(redOrangeGuide[i]));
}

for (var i = 0; i < combinedGuide.length-1; i++) {
  if (combinedGuide[i].join() === combinedGuide[i+1].join()) {
    guideCounter++;
  } else {
    log(guideCounter + " times: " + blueWhiteBouts[combinedGuide[i][0]].concat(redOrangeBouts[combinedGuide[i][1]]));
    guideCounter = 1;
  }
}
log(guideCounter + " times: " + blueWhiteBouts[combinedGuide[99][0]].concat(redOrangeBouts[combinedGuide[99][1]]));
*/

/*
log("BLUE-WHITE:");

for (var i = 0; i < blueWhiteGuide.length; i++) {
  if (blueWhiteGuide[i] === blueWhiteGuide[i+1]) {
    guideCounter++;
  } else {
    log(guideCounter + " times: " + blueWhiteBouts[blueWhiteGuide[i]]);
    guideCounter = 1;
  }
}
*/

/*
log("RED-ORANGE:");

for (var i = 0; i < redOrangeGuide.length; i++) {
  if (redOrangeGuide[i] === redOrangeGuide[i+1]) {
    guideCounter++;
  } else {
    log(guideCounter + " times: " + redOrangeBouts[redOrangeGuide[i]]);
    log(redOrangeBouts[redOrangeGuide[i]]);
    guideCounter = 1;
  }
}
*/



//FUNCTIONS

function shuffleBouts (threadArray, boutSize) {
  var result = [];
  
  var numBouts = threadArray.length/boutSize;
  if (numBouts != Math.floor(numBouts))
    log("Warning (shuffleBouts): threadArray.length not equally divisible by boutSize");
  
  for (var i = 0; i < numBouts; i++) {
    var start = i * boutSize;
    result = result.concat(shuffle(threadArray.slice(start, start + boutSize)));
  }
  
  return result;
}

function drawOnEcho (line) {
  var echoLine = [];
  
  for (var i = 0; i < line.length; i++) {
    for (var j = 0; j < 8; j += 2) 
      echoLine.push(plus(line[i], j));
  }
  
  return echoLine;
}

function drawOnNetwork (line) {
  var networkLine = [];
  
  for (var i = 0; i < line.length; i++) {
    if (i%2 != line[i]%2) {
      networkLine.push(line[i]);
    } else {
      networkLine.push(plus(line[i], 1));
    }
  }
  
  return networkLine;
}

function buildTaqueteTreadling (line) {
  var taqueteTreadling = [];
  
  for (var i = 0; i < line.length; i++) {
    taqueteTreadling.push(i%2 + 1);
    taqueteTreadling.push(line[i] + 2);
  }
  
  return taqueteTreadling;
}

function buildCrackleTreadling (line) {
  var crackleTreadling = [];
  for (var i = 0; i < line.length; i++) {
    crackleTreadling.push(line[i]);
    crackleTreadling.push(plus(line[i], 1));
    crackleTreadling.push(plus(line[i], 2));
    crackleTreadling.push(plus(line[i], 1));

    var nextBlock = 0;
    if (i === line.length - 1)
      nextBlock = line[0];
    else
      nextBlock = line[i + 1];

    if (line[i] === nextBlock) {
      // no adjustment needed
    } else if ((plus(line[i], 1) === nextBlock) || (minus(line[i], 1) === nextBlock)) {
      crackleTreadling.push(line[i]);
    } else {
      log("treadling line skip > 1 at ["+i+"] : "+line[i]+", "+line[i+1]);
    }
  }
  return crackleTreadling;
}

function buildPoint (line, height) {
  var pointLine = [];
  var leftHand = 0;
  var rightHand = 0;
  
  for (var i = 0; i < (line.length - 1); i++) {
    if (line[i] > line[i+1]) {
      leftHand = height;
      rightHand = height + line[i] - line[i+1];
    } else if (line[i] === line[i+1]) {
      leftHand = height + 1;
      rightHand = height + 1;
    } else {
      leftHand = height + line[i+1] - line[i];
      rightHand = height;
    }
    
    for (var j = 0; j < leftHand; j++) {
      pointLine.push(line[i] + j);
    }
  
    var peak = line[i] + leftHand - 1;
    
    for (var j = 1; j < (rightHand-1); j++) {
      pointLine.push(peak - j);
    }
  }
  
  pointLine.push(line.slice(-1));
 
  return pointLine;
}

function build8ShaftTwillTieup (initial) {
  var result = [];
  
  for (var i = 0; i < 8; i++) {
    var treadle = [];
    for (var j = 0; j < 4; j++) {
      treadle.push(minus(initial[j], i));
    }
    result.push(treadle);
  }
  
  return result;
}

function build8ShaftTaqueteTieup () {
  var result = [];
  result.push([1, 3, 5, 7]);
  result.push([2, 4, 6, 8]);
  return result.concat(build8ShaftTwillTieup([1, 2, 3, 4]));
}

function buildQuarterCircle (radius) {
  var result = [];
  
  for (var i = 1; i <= radius; i++) {
    result.push(Math.ceil(Math.sqrt(radius*radius - i*i)) + 1);
  }
  
  return result;
}

function buildNetworkTreadling (designLine) {
  var networkBlocks = [
    [1, 2, 3, 4],
    [5, 2, 3, 4],
    [5, 6, 3, 4],
    [5, 6, 7, 4],
    [5, 6, 7, 8],
    [1, 6, 7, 8],
    [1, 2, 7, 8],
    [1, 2, 3, 8]
  ];
  var networkTreadling = [];
  for (var i = 0; i < designLine.length; i ++) {
    for (var j = 0; j < 4; j++) 
      networkTreadling.push(networkBlocks[designLine[i]-1][j]);
  }
  return networkTreadling;
}
