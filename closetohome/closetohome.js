harmoniousColors = [
  "#CCE0B8", //lime
  "#928c87", //gris fonce
  "#332500", //brun chocolat
  "#4d4d33", //taupe
  "#a5c0b3", //seaton
  "#DDEEEE", //chambray
  "#f9efd2", //ivoire
  "#eabc7b", //honey
  "#FFF8F5", //naturel
  "#c2c20a", //limette pale
  "#fbc3b6", //saumon
]

//colorMap = [1, 2, 3, 4, 5, 4, 3, 2];
colorMap = [1, 0, 3, 2, 5, 4, 7, 6];

colors = harmoniousColors;

shafts = 8;
treadles = 8;
threading = [];
weftThreads = [];
treadling = [];
tieup = [];

var twill = [1, 4, 6, 8];
for (var i = 0; i < treadles; i++) {
  var treadle = [];
  for (var j = 0; j < 4; j++) {
    treadle.push(minus(twill[j], i));
  }
  tieup.push(treadle);
}

threads = [ ];

var threadingLine = [8, 8];
var shingle = [8, 8, 8, 7, 7, 6, 6, 5, 4, 3, 1, 1, 1, 2, 2, 3, 3, 4, 5, 6, 7];
threadingLine = collapse(advancingShift(shingle, 5), 8);
//var stationaryShingle = [3, 3, 3, 2, 2, 1, 1, 8, 7, 6, 4, 4, 4, 5, 5, 6, 6, 7, 8, 1];
//threadingLine = repeat(5, stationaryShingle);

var treadlingLine = [];
for (var i = 1; i <= 8; i++) {
  treadlingLine.push(i);
}
treadlingLine.push(8);
treadlingLine = pointReflect(treadlingLine);
treadlingLine.push(1);
treadlingLine.push(1);
//treadlingLine = stretch(2, repeat(4, treadlingLine));
treadlingLine = collapse(advancingShift(treadlingLine, 8), 8);
treadlingLine = stretch(2, treadlingLine);
for (var i = 0; i < threadingLine.length; i++) {
  threading.push(plus(threadingLine[i], 6));
  threading.push(plus(threadingLine[i], 7));
  threading.push(plus(threadingLine[i], 4));
  threading.push(plus(threadingLine[i], 5));
  threading.push(plus(threadingLine[i], 2));
  threading.push(plus(threadingLine[i], 3));
  threading.push(threadingLine[i]);
  threading.push(plus(threadingLine[i], 1));
}

for (var i = 0; i < (threading.length/8); i++) {
  threads = threads.concat(colorMap);
}

//treadling = collapse(buildPoint(treadlingLine, 2), 8);
treadling = buildCrackleTreadling(treadlingLine);

for (i = 0; i < treadling.length; i++)
  weftThreads.push(8);

logWif();

function pointReflect (array) {
  return array.concat(array.slice(0, -1).reverse());
}

function foldReflect (array) {
  return array.concat(array.slice(0).reverse());
}

function advancingShift (array, times) {
  var result = [];
  var shiftedArray = [];
  for (var i = 0; i < times; i++) {
    result = result.concat(array);
    for (var j = 0; j < array.length; j++) {
      shiftedArray[j] = array[j] + 1; 
    }
    array = shiftedArray;
  }
  return result;
}

function plus (x, y) {
  if (y < 0)
    return minus(x, Math.abs(y));
  if ((x < 1) || (x > 8))
    log("unexpected value for x: " + x);
  return (x + y - 1) % 8 + 1;
}

function minus (x, y) {
  if ((x < 1) || (x > 8))
    log("unexpected value for x: " + x);
  return ( (x - 1) + ( 8 - y % 8 ) )% 8 + 1;
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

function buildQuarterCircle (radius) {
  var result = [];
  for (var i = 0; i < radius; i++) {
    result.push(Math.floor(Math.sqrt(Math.pow((radius-1), 2) - Math.pow(i, 2)))+1);
  }
  return result;
}

function buildHalfCircle (radius) {
  var quarterCircle = buildQuarterCircle(radius).reverse();
  quarterCircle.pop();
  var halfCircle = foldReflect(quarterCircle);
  halfCircle.pop();
  halfCircle.pop();
  halfCircle.shift();
  var downShift = halfCircle[0] - 1;
  for (var i = 0; i < halfCircle.length; i++)
    halfCircle[i] = halfCircle[i] - downShift;
  return halfCircle;
}

function collapse (line, shafts) {
      var result = [];
        for (var i = 0; i < line.length; i++) {
                result.push(((line[i]-1) % shafts) + 1);
                  }
          return result;
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
