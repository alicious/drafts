shafts = 24;
treadles = 26;

colors = ["#FFFFFF","#000000", "#aa8ccc"];

tieup = buildTwillTieup([12,12]);
tieup = (tabbyTreadles(24)).concat(tieup);

var threadingLine = [];
for (var i = 1; i <= 300; i++) {
  //threadingLine.push(cubeQuad(1/48214, 150, 70, i)); //300
  threadingLine.push(cubeQuad(1/67500, 150, 50, i)); //300
}

function cubeQuad (slope, xOffset, yOffset, x) {
  var result = x - xOffset;
  result = Math.pow(result, 3);
  result = result*slope;
  result = result + yOffset;
  return Math.ceil(result);
}

for (var i = 0; i < (threadingLine.length/2); i++) {
  threadingLine[i]++;
}

threadingLine = trill(threadingLine); 
threading = echo([12], threadingLine);
threading = threading.slice(21,-21);

var treadlingLine = [];
var straightLength = 48;
for (var i = 2; i < 10; i++) {
  treadlingLine = treadlingLine.concat(stretch(i, buildStraight(straightLength)));
}

/*
var sCurve = [1,2,3,4,5,6,
                     7,7,8,8,9,9,
                     10,10,10,11,11,11,
                     12,12,12,12,13,13,13,13,
                     14,14,14,15,15,15,
                     16,16,17,17,18,18,
                     19,20,21,22,23,24
                     ];

for (var i = 1; i < 10; i++) {
  treadlingLine = treadlingLine.concat(stretch(i,sCurve));
}
*/

treadling = buildTaqueteTreadling(treadlingLine);

//log(treadling.length);

for (var i = 0; i < threading.length/2; i++) {
  threads.push(0);
  threads.push(1);
}

for (var i = 0; i < treadling.length; i++)
  weftThreads.push(2);

logWif();

// BUILT-IN FUNCTIONS

function tabbyTreadles(shafts) {
  var result = [[],[]];
  for (var i = 0; i < shafts; i += 2) {
    result[0].push(i+1);
    result[1].push(i+2);
  }
  return result;
}

function echo(intervals, line) { //UNTESTED
  var echoLine = [];
  
  for (var i = 0; i < line.length; i++) {
    for (var j = 0; j < intervals.length; j ++) {
      echoLine.push(line[i]);
      echoLine.push(plus(line[i], intervals[j]));
    }
  }
  
  return echoLine;
}


function drawOnNetwork (line) { //UNTESTED
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
  line = collapse(shafts, line);
  
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
  return collapse(treadles, crackleTreadling);
}

function trill (line) {
  var result = [];
  
  for (var i = 0; i < line.length; i++) {
    result.push(line[i]);
    
    if (line[i] === line[i+1])
      result.push(line[i] + 1);
  }
  
  return collapse(shafts, result);
}

function buildPoint (height, line) {
  var result = [];
  var peak = 0;
  
  for (var i = 0; i < (line.length); i++) {
    
    peak = line[i] + height - 1;
    
    for (var j = line[i]; j < peak; j++){
      result.push(j);
    }
    
    for (var j = (peak); j >= line[i]; j--) {
      result.push(j);
    }
    
    if (line[i] === line[i+1])
      result.pop();
  }
  return collapse(shafts, result);
}


function buildTwillTieup (initial) {
  var height = initial.reduce((x,y) => x + y);
  var result = [];
  var initialShafts = [];
 
  var currentShaft = 0;
  for (var i = 0; i < initial.length; i++) {
    if (i%2 == 0) {
      for (var j = 0; j < initial[i]; j++) {
        currentShaft++;
        initialShafts.push(currentShaft);
      }
    }
    else {
      for (var j = 0; j < initial[i]; j++)
        currentShaft++;
    }
  }
  
  for (var i = 0; i < height; i++) {
    var treadle = [];
    for (var j = 0; j < initialShafts.length; j++) {
      treadle.push(minus(initialShafts[j], i));
    }
    result.push(treadle);
  }
  
  return result;
}


function buildNetworkTreadling (designLine) { //FIX FOR NON-8 SHAFTS
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


function pointReflect (array) {
  return array.concat(array.slice(0, -1).reverse());
}


function collapse (height, line) {
      var result = [];
        for (var i = 0; i < line.length; i++) {
                result.push(((line[i]-1) % height) + 1);
                  }
          return result;
}


function plus (x, y) {
      if (y < 0)
              return minus(x, Math.abs(y));
        if ((x < 1) || (x > shafts))
                log("unexpected value for x: " + x);
          return (x + y - 1) % shafts + 1;
}


function minus (x, y) {
      if ((x < 1) || (x > shafts))
              log("unexpected value for x: " + x);
        return ( (x - 1) + ( shafts - y % shafts ) )% shafts + 1;
}


function buildStraight(length) {
  var result = [];
  for (var i = 1; i <= length; i++) {
    result.push(i);
  }
  return result;
}


function advance (line) {
  var advancingLine= [];
  for (var i = 0; i < shafts; i++) {
    for (var j = 0; j < line.length; j++) {
      advancingLine.push(line[j] + i);
    }
  }
  return advancingLine;
}
