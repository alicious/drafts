colors = [
  "#98cdcd",
  "#b32d00",
  "#cc6500",
  "#ffe680",
  "#000000",
];

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

var straight = [1, 2, 3, 4, 5, 6, 7, 8];
var longPoint = pointReflect(repeat(3, straight)).slice(0, -1);
var halfM = [2, 3, 4, 3, 2, 1, 8, 7, 6];
var fullM = pointReflect(halfM);
var undulatingLine = [1, 2, 3, 4, 5, 5, 6, 6, 7, 7, 8, 8, 8,
                  1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 6, 7, 8]

var undulatingPoint = pointReflect(undulatingLine);
var edge = undulatingLine.slice(0, 12).concat(undulatingLine.slice(14)).reverse();
var threadingLine = edge.concat(fullM).concat(undulatingPoint).concat(halfM);
threadingLine = foldReflect(threadingLine);
var treadlingLine = longPoint;
//treadlingLine = repeat(2, stretch(2, treadlingLine));
treadlingLine = repeat(2, straight).concat(repeat(2,(stretch(2, straight))).reverse());
for (var i = 0; i < threadingLine.length; i++) {
  for (var j = 0; j < 8; j += 2) 
    threading.push(plus(threadingLine[i], j));
}

for (var i = 0; i < threading.length; i++) {
  threads.push(i%4);
}

for (var i = 0; i < 4; i++)
  threads[i] = 4;
for (var i = (threading.length - 4); i < threading.length; i++)
  threads[i] = 4;
treadling = buildCrackleTreadling(treadlingLine);

for (i = 0; i < treadling.length; i++)
  weftThreads.push(4);

logWif();

function pointReflect (array) {
  return array.concat(array.slice(0, -1).reverse());
}

function foldReflect (array) {
  return array.concat(array.slice(0).reverse());
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
