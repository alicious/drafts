shafts = 24;
treadles = 24;

// PALETTES
var fadeFactor = 8;
var peachLav = [
  "#BFB3BD", 
  "#DDD1E2", 
  "#E8D1CA",
];

var peachFade = [peachLav[2],"#ffffff"];
peachFade = gradate(peachFade, fadeFactor);

var blues = [
  "#859EBF", 
  "#A0AEBA", 
  "#BAD3E4",
];

var blueFade = [blues[0], "#ffffff"];
blueFade = gradate(blueFade, fadeFactor);

//colors = peachFade.concat(repeat(286, ["#FFFFFF"])).concat(blueFade.reverse());
colors = peachFade.concat(blueFade.reverse());


// THREADING
var threadingLineA = buildStraight(colors.length/2);
var threadingLineB = threadingLineA.reverse();

var threadingA = drawOnNetwork(threadingLineA);
log(threadingA);
log(threadingLineA);

// TREADLING
var treadlingLine = [];

// TIEUP
tieup = buildTwillTieup(24, [1,2,3,7,8,9,13,15,17,19,21,23]);

// COLOR ASSIGNMENT

for (var i = 0; i < colors.length/2; i++) {
  threads.push(i);
  threads.push(i+colors.length/2);
}

threads = buildStraight(colors.length); //subwarp preview

for (var i = 0; i < treadling.length; i++) {
  weftThreads.push(0);
}
logWif();


//FUNCTIONS

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
  var result = [];
  
  for (var i = 0; i < shafts; i++) {
    var treadle = [];
    for (var j = 0; j < initial.length; j++) {
      treadle.push(minus(initial[j], i));
    }
    result.push(treadle);
  }
  
  return result;
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


// BUILT-IN FUNCTIONS
function pointReflect (array) {
  return array.concat(array.slice(0, -1).reverse());
}

function collapse (shafts, line) {
      var result = [];
        for (var i = 0; i < line.length; i++) {
                result.push(((line[i]-1) % shafts) + 1);
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

function dilute (hex, strength) {
  var result = "#";
  
  for (var j = 1; j < 6; j+=2) {
    var color = parseInt(hex.substr(j,2), 16);
    var diff = (255 - color)/strength;
    var adj = Math.floor(color + diff);
    result = result.concat(adj.toString(16));
  }
  
  return result;
}

function midhue (hexA, hexB) {
  var result = "#";
  
  for (var j = 1; j < 6; j+=2) {
    var colorA = parseInt(hexA.substr(j,2), 16);
    var colorB = parseInt(hexB.substr(j,2), 16);
    
    var adj = Math.floor((colorA + colorB)/2);
    result = result.concat(adj.toString(16));
  }
  
  return result;
}

function interhues (array) {
  var result = [];
  
  result.push(array[0]);
  for (var i = 0; i < (array.length - 1) ; i++) {
    result.push(midhue(array[i], array[i+1]));
    result.push(array[i+1]);
  }
 
  return result;
}

function gradate (array, x) {
  var result = array;
  for (var i = 0; i < x; i++) {
    result = interhues(result);
  }
 
  return result;
}

function twoBlend (a, b) {
  var result = [];
  result = result.concat(repeat(4, [a,a]));
  result = result.concat(repeat(2, [a,b,a,a]));
  result = result.concat(repeat(4, [a,b]));
  result = result.concat(repeat(2, [b,b,a,b]));
  
  return result;
}
