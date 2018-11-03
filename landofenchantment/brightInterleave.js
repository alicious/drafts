colors = [
  "#bd0102", //cerise
  "#c04613", //cayenne
  "#d27822", //orange brule
  "#d39938", //vieil or

  "#07978d", //aqua marine
  "#3b647a", //jeans
  "#ab4e83", //magenta
  "#b72d69", //fuschia
  
  "#000000", //black
];

var fibonacci = [1, 1];
for (var i = 2; i < 4; i++) {
  fibonacci.push(fibonacci[i-1] + fibonacci[i-2]);
}

shafts = 8;
treadles = 8;


// THREADING
var threadingLine = [];
for (var i = 99; i < 114; i++) {
  threadingLine.push(i);
};

for (var i = 114; i > 86; i--) {
  threadingLine.push(i);
};

for (var i = 86; i < 101; i++) {
  threadingLine.push(i);
};
threadingLine = buildPoint(4, threadingLine);
threadingLine = threadingLine.slice(3, -3);

for (var i = 0; i < threadingLine.length; i++) {
  threading.push(threadingLine[i]);
  threading.push(plus(threadingLine[i], 4));
}

threading = [1, 2, 3, 4].concat(threading);
threading = threading.concat([1, 2, 3,4 ]);

// TREADLING/TIEUP

//advancing point
var treadlingLine = [1, 2, 3, 4, 5, 6, 7, 8];
treadlingLine = stretch(2, treadlingLine);
treadling = buildPoint(4, treadlingLine);
treadling = repeat(4, treadling);

tieup = build8ShaftTwillTieup([1, 2, 4, 8]);

// PINK-TEAL 
var pt = [];

var ptBouts = [
  [4, 4, 4, 4],
  [4, 4, 4, 4],
  [4, 4, 4, 5],
  [4, 4, 5, 6],
  [4, 5, 6, 6],
  [5, 6, 6, 7],
  [5, 6, 7, 7],
  [6, 7, 7, 7],
  ];

for (var i = 0; i < ptBouts.length; i++) {
  pt = pt.concat(blendBouts(fibonacci, ptBouts[i], ptBouts[i+1]));
}
pt = pt.slice(0, 400);
pt = shuffleBouts(pt, 4);

// RED-ORANGE
var ro = [];

var roBouts = [
  [0, 0, 0, 0],
  [0, 0, 0, 1],
  [0, 0, 1, 1],
  [0, 1, 1, 2],
  [1, 1, 2, 2],
  [1, 2, 2, 3],
  [2, 2, 3, 3],
  [2, 3, 3, 3],
  ];

for (var i = 0; i < roBouts.length; i++) {
  ro = ro.concat(blendBouts(fibonacci, roBouts[i], roBouts[i+1]));
}
ro = ro.slice(0, 400);
ro = shuffleBouts(ro, 4);

// COLOR ASSIGNMENT

threads = [8, 8, 8, 8];
for (var i = 0; i < 400; i++) {
  threads.push(pt[i]);
  threads.push(ro[i]);
}
threads = threads.concat([8, 8, 8, 8]);

//threads = ro.concat(pt);

for (var i = 0; i < treadling.length; i++) {
  weftThreads.push(8);
}
logWif();


//FUNCTIONS

function blendBouts (blendScheme, bout1, bout2) {
 
  var result = [];
  
  for (var i = 0; i < blendScheme.length; i++) {
    for (var j = 0; j < blendScheme[blendScheme.length - (i+1)]; j++) {
      result = result.concat(bout1);
    }
    for (var j = 0; j < blendScheme[i]; j++) {
      result = result.concat(bout2);
    }
  }
  
  return result;
  
}

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
  return collapse(8, result);
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
        if ((x < 1) || (x > 8))
                log("unexpected value for x: " + x);
          return (x + y - 1) % 8 + 1;
}

function minus (x, y) {
      if ((x < 1) || (x > 8))
              log("unexpected value for x: " + x);
        return ( (x - 1) + ( 8 - y % 8 ) )% 8 + 1;
}
