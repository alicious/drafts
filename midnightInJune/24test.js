shafts = 24;
treadles = 24;

colors = ["#FFFFFF","#000000"];

tieup = buildTwillTieup([1,2,1,3,1,4,1,3,1,2,1,4]);

threading = collapse(shafts, buildStraight(100));
treadling = threading;

for (var i = 0; i < threading.length; i++)
  threads.push(0);

for (var i = 0; i < treadling.length; i++)
  weftThreads.push(1);

logWif();

// BUILT-IN FUNCTIONS

function echo(intervals, line) { //UNTESTED
  var echoLine = [];
  
  for (var i = 0; i < line.length; i++) {
    for (var j = 0; j < intervals.length; j ++) 
      echoLine.push(plus(line[i], intervals[j]));
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
  
  for (var i = 0; i < line.length; i++) {
    taqueteTreadling.push(i%2 + 1);
    taqueteTreadling.push(line[i] + 2);
  }
  
  return collapse(treadles, taqueteTreadling);
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
