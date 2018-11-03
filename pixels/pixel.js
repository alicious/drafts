var shafts = 24;
var liftplan = [];
var threading = [];
var colors = ["#000000", "#FFFFFF", "#FF0000"];
var threads = [];
var weftThreads = [];

var test = [[3,14,15,20]
           ,[4,14,17,19,22]
           ,[5,8,14,16]
           ,[6,7,14,15,16,17]
           ,[7,14,22]
           ,[8,14]];

var waves = [
  [2,6,16,20],
  [1,6,15,20],
  [6,15,19],
  [5,14,19],
  [4,12,13,18],
  [2,3,11,12,17,21,22],
  [1,8,9,10,15,16,20],
  [5,6,7,13,14,19],
  [3,4,5,10,11,12,17,18,21,22],
  [2,3,7,8,9,14,15,16,20],
  [2,5,6,12,13,19],
  [1,4,10,11,18,22],
  [4,8,9,17,21],
  [3,7,17,20],
  [3,7,16,20]];

var xLaurenPixels = [
  0,2,5,7,10,12,14,17,19,21,22
  ];

var yLaurenPixels = [
  0,2,5,7,9,12,14,17,19,21,24,27,29,31,34,36,39,41,43,46,48,
  50,53,55,58,60,62,65,67,69,71,73,75,78,80,82,85,87,90,92
  ];

var laurenPixels = [
  [1,2,3,4,5,6,7,8,9,10],
  [1,3,5,7,8,9],
  [1,2,3,4,5,6,7,8,9,10],
  [1,2,3,5,6,7,9,10],
  [1,2,3,4,5,6,7,8,9,10],
  [1,3,5,7,9],
  [1,2,3,4,5,6,7,8,9,10],
  [1,2,3,5,7,9,10],
  [1,2,3,4,5,6,7,8,9,10],
  [1,3,5,7,9],
  [1,2,4,5,6,8,9,10], 
  [1,3,5,7,9],
  [2,3,4,6,7,8,10],
  [1,3,5,7,9],
  [1,2,4,6,8,9,10],
  [1,3,5,7,9],
  [2,3,4,6,7,8,10],
  [1,3,5,7,9],
  [2,4,6,8,10],
  [1,3,5,7,9],
  [2,3,4,6,8,10],
  [1,3,5,7,9],
  [2,4,6,8,10],
  [1,3,5,7,9],
  [2,4,6,8,10],
  [1,3,5,7,9],
  [2,4,6,8,10],
  [1,3,5,7,9],
  [2,6,8,10],
  [2,6,10],
  [1,3,5,7,9],
  [],
  [1,3,5,7,9],
  [2,6,10],
  [1,3,5,7,9],
  [],
  [1,3,5,7,9],
  [2,10],
  [],
  ];

var computedLP = [];

var fullRow = [];
for (var i = 1; i <= 22; i++)
  fullRow.push(i);

for (var i = 0; i < 5; i++)
  computedLP.push(fullRow.slice());  

for (var i = 0; i < laurenPixels.length; i++) {
  var rowLP = [];

  if (laurenPixels[i].length === 0)
    rowLP = [];
  else
    for (var j = 0; j < laurenPixels[i].length; j++) {
      var thisPixel = laurenPixels[i][j];
      for (var k = (xLaurenPixels[thisPixel-1]+1); k <= xLaurenPixels[thisPixel]; k++) {
        rowLP.push(k);
      }
    }
  
  for (var j = yLaurenPixels[i]; j < yLaurenPixels[i+1]; j++) {
    computedLP.push(rowLP.slice());
  }
}

for (var i = 0; i < 50; i++)
  computedLP.push([])

//log(computedLP);
//var rows = waves; 
var rows = computedLP; 

for (var i = 0; i < rows.length; i++) {
  for (var j = 0; j < rows[i].length; j++) {
    rows[i][j] += 2;
  }
}

var blockWidth = 4;

// [THREADING]
for (var i = 3; i <=24; i++) {
  for (var j = 0; j < blockWidth; j++) {
    threading = threading.concat([1,i,2,i]);
  }
}

for (var i = 0; i < threading.length; i++) {
  threads.push(2);
}

// [LIFTPLAN]
var pick = [];
for (var i = 0; i < rows.length; i++) {
  pick = rows[i];
  
  for (var j = 0; j < blockWidth; j++) {
    liftplan.push(pick.concat([2]));  
    liftplan.push(inverse(pick).slice(2,24).concat([2]));  
    liftplan.push(pick.concat([1]));  
    liftplan.push(inverse(pick).slice(2,24).concat([1]));  
  }
}

for (var i = 0; i < liftplan.length; i++) {
  weftThreads.push(i%2);
}

//log(liftplan);
logWif2();

function inverse (pick) {

  var a = new Array(24);
  var result = [];

  for (var i = 0; i < pick.length; i ++) {
    a[pick[i] - 1] = true;
  } 

  for (var i = 0; i < a.length; i++) {
    if (a[i] != true)
      result.push(i + 1);
  }

  return result;
}

function logWif2 () {

    log("[WIF]");
    log("Version=1.1\nSource Program=WarpEngine\nSource Version=1.0\nDate=December 4, 2015\n");
  
    log("[CONTENTS]");
    log("WEAVING=1");
    log("COLOR PALETTE=1");
    log("COLOR TABLE=1");
    log("WARP=1");
    log("WEFT=1");
    log("THREADING=1");
    log("WARP COLORS=1");
    log("TREADLING=1");
    log("WEFT COLORS=1");
    log("LIFTPLAN=1");
    log("\n");

    log("[WEAVING]");
    log("Rising Shed=1");
    log("Shafts=" + shafts);
    log("\n");

    log("[COLOR PALETTE]");
    log("Entries=" + colors.length);
    log("Range=0,255");
    log("\n");

    log("[COLOR TABLE]");
    for (i=0; i < colors.length; i++)
        log((i+1) + "=" + hexToRgb(colors[i]));
    log("\n");

    log("[WARP]");
    log("Threads=" + threads.length);
    log("\n");

    log("[WEFT]");
    log("Threads=" + liftplan.length);
    log("\n");

    log("[THREADING]");
    for (i=0; i < threading.length; i++)
        log((i+1) + "=" + threading[i]);
    log("\n");
    
    log("[WARP COLORS]");
    for (i=0; i < threads.length; i++)
        log((i+1) + "=" + (threads[i] + 1));
    log("\n");

    log("[LIFTPLAN]");
    for (i=0; i < liftplan.length; i++)
        log((i+1) + "=" + liftplan[i]);
    log("\n");

    log("[WEFT COLORS]");
    for (i=0; i < weftThreads.length; i++)
        log((i+1) + "=" + (weftThreads[i] + 1));
    log("\n");
}

function hexToRgb(hex) {
    var rgb = [];
    rgb.push(parseInt(hex.slice(1,3), 16));
    rgb.push(parseInt(hex.slice(3,5), 16));
    rgb.push(parseInt(hex.slice(5), 16));
    return rgb.join();
}

function log (text) {
  console.log (text);
}

function repeat ( count, values ) {
    var result = [];

    for ( var i = 0 ; i < count ; i++ )
        result = result.concat( values );

    return result;
}
