colors = [
  "#7b5b6b",//plum
  "#dbc5a4",//flax
  
  "#666666", //black
];


shafts = 8;
treadles = 8;

// THREADING

//var cmb = [2,10,4,6,4,5,2,3,1,2,1];
var cmb = [2,8,4,6,4,5,2,3,1];
cmb = repeat(2, cmb);
cmb = cmb.map(function(x) {
   return x * 3;
})

var threadingLine = [];
for (var i = 0; i < cmb.length; i++) {
  var current = cmb[i];
  var next = cmb[i+1];
  
  if (next > current) {
    for (var j = current; j < next; j++) {
      threadingLine.push(j);
    }
  } else if (next < current) {
    for (var j = current; j > next; j--) {
      threadingLine.push(j);
    }
  }
}

var curvedCMB = [
  6, 6, 6, 5, 5, 4, 4,
  3, 3, 3, 4, 4, 5, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 15, 16, 16,
  17, 17, 17, 16, 16, 15, 15, 14, 13, 12, 11, 10, 9, 8, 7, 7, 6, 6,
  5, 5, 5, 6, 7, 7,
  8, 8, 8, 7, 7, 6, 6, 
  5, 5, 5, 6, 6, 7, 7, 
  8, 8, 8, 7, 7, 6, 5, 4, 4, 
  3, 3, 3, 4, 4, 
  5, 5, 5, 4, 4, 3, 3,
  2, 2, 1, 1, 8, 8, 7, 7, 6, 6, 5, 4, 3, 2, 1
];
                     
//var threadingLine = stretch(2, curvedCMB);
//var threadingLine = stretch(2, cmb);
threadingLine = collapse(8, threadingLine);
threadingLine = pointReflect(threadingLine);
threadingLine = stretch(2, threadingLine);

for (var i = 0; i < threadingLine.length; i++) {
  threading.push(threadingLine[i]);
  threading.push(plus(threadingLine[i], 4));
}
threading = threading.slice(18,-18);

// TREADLING
var treadlingLine = [];
for (var i = 0; i < 3; i++) {
  treadlingLine = treadlingLine.concat(pointReflect(buildStraight(i*8)));
}
//treadlingLine = treadlingLine.concat(buildStraight(40));
//treadlingLine = pointReflect(treadlingLine);
treadlingLine = buildPoint(4, treadlingLine);
treadling = treadlingLine;

treadling = buildTaqueteTreadling(treadlingLine);
treadles = 10

// TIEUP
tieup = build8ShaftTaqueteTieup();
//tieup = build8ShaftTwillTieup([1, 2, 4, 8]);

// COLORPLAN

// subwarp 1

var sw1 = [];
for (var i = 0; i < threading.length/2; i++)
  sw1.push(0);

// subwarp 2 

var sw2 = [];
for (var i = 0; i < threading.length/2; i++)
  sw2.push(1);

// COLOR ASSIGNMENT

for (var i = 0; i < sw1.length; i++) {
  threads.push(sw1[i]);
  threads.push(sw2[i]);
}

//logWindingPlan(threads);

//threads = sw1.concat(sw2); //subwarp preview

for (var i = 0; i < treadling.length; i++) {
  weftThreads.push(2);
}

logWif();


//FUNCTIONS

function fibonacciBlend (array1, array2, slope1, slope2) {
  if (slope1=== undefined)
    slope1= 1;
  if (slope2=== undefined)
    slope2= slope1;
  var a1 = array1.slice();
  var a2 = array2.slice();
  var result = [];
  var fib1 = buildFibonacci(a1.length, slope1);
  var fib2 = buildFibonacci(a2.length, slope2);
  
  if(fib1.length > fib2.length) {
    slimDown(fib1, fib2.length);
  } else if (fib2.length > fib1.length) {
    slimDown(fib2, fib1.length);
  }
 
  fib1.reverse();
  
  for (var i = 0; i < fib1.length; i++) {
    for (var j = 0; j < fib1[i]; j++) {
      result.push(a1.shift());
    }
    for (var j = 0; j < fib2[i]; j++) {
      result.push(a2.shift());
    }
  }
  
  return result;
  
  function buildFibonacci (size, slope) {
    var fib = [1, 1];
    var sum = 2;
    for (var i = 0; sum < size; i++) {
      var value = Math.ceil((fib[i] + fib[i+1]) * slope);
      sum += value;
      fib.push(value);
    }
    var leftover = fib.slice(-1) - (sum - size);
    fib.pop();
    leftover += fib.pop();
    fib.push(leftover);

    return fib;
  }
 
  function slimDown(array, croppedLength) {
    var extras = 0;
    for (var i = 0; array.length > croppedLength; i++) {
      extras += array.shift();
    }
    
    var distributed = extras/array.length;
    var rolling = 0;

    for (var i = 0; i < array.length ; i++ ) {
      var increase = array[i] + distributed + rolling;
      var update   = Math.floor(increase);
      array[i] = update;
      rolling = increase - update;
    }
  }

}

function simpleFib (fadeLength, colorArray) {
  var result = [];
  
  var fibonacci = [1, 1];
  for (var i = 0; i < fadeLength; i++) {
    fibonacci.push(fibonacci[i] + fibonacci[i+1]);
  }
  
  for (var i = 1; i < colorArray.length; i++) {
    for (var j = 1; j < fibonacci.length; j++) {
      for (var k = 0; k < fibonacci[fibonacci.length - (j)]; k++) {
        result = result.concat(colorArray[i - 1]);
      }
      if (j != (fibonacci.length - 1)) {
        for (var k = 0; k < fibonacci[j]; k++) {
          result = result.concat(colorArray[i]);
        }
      }
    }
  }
  
  var last = colorArray.slice(-1)[0];
  
  for (var i = 0; i < fibonacci.slice(-1); i++) {
    result = result.concat(last);
  }
  
  return result;
}

function logWindingPlan (warp) {
 
  var boutSize = 4;
  var sectionSize = 56;
  
  var start = 0;
  var end = 0;
  var bout = [];
  var nextBout = [];
  var times = 1;
  
  for (var i = 0; i < 10; i++) {
    
    log("section " + (i+1) + ":");
    log("ends: " + sectionSize);
    
    end = start + sectionSize;
    var section = warp.slice(start, end);
      
    for (var j = 0; j < section.length; j = j + boutSize) {
      bout = section.slice(j, j+boutSize).sort().join(", ");
      nextBout = section.slice(j+boutSize, j+(2*boutSize)).sort().join(", ");
      if (bout === nextBout) {
        times++;
      }
      else {
        log(times + "x: " + bout);
        times = 1;
      }
    }
    
    log("");
    start = end;
  }

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

function zigZag (array) {
  var result = [0];
  var upDown = 1; // 1 == up, 0 == down
  var start = 0;
  
  for (var i = 0; i < array.length; i++) {
    if (upDown == 1) {
      for (j = 1; j <= array[i]; j++)
        result.push(start + j);
      upDown = 0;
    } else if (upDown == 0) {
      for (j = 1; j <= array[i]; j++)
        result.push(start - j);
      upDown = 1;
    } else {
      log("error, zigZag: neither odd or even");
    }
    start = result[result.length - 1];
  }
  return result;
}

function collapse (shafts, line) {
  var result = [];
  for (var i = 0; i < line.length; i++) {
    if (line[i] < 0) {
      result.push(shafts + ((line[i]+1) % shafts))
    } else {
      result.push(((line[i]) % shafts) + 1);
    }
  }
  return result;
}
