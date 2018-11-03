colors = [
  "#000000",
  
  "#d9ccee", 
  "#f5e5ff", 
  "#fde8e8", 
  "#ffe7d6", 
  "#ebdfcd", 
  "#ffe390", 
  "#ffd57a", 
  "#ffc77f", 
];
 
shafts = 8;
treadles = 8;
threading = [];
weftThreads = [];
treadling = [];
tieup = [];

var twill = [0, 1, 4, 6];
for (var i = 0; i < 8; i++) {
  var treadle = [];
  for (var j = 0; j < 4; j++)
    treadle[j] = ((twill[j] + i) % 8) + 1;
  tieup.push(treadle);
}
threads = [];

var sliceColorPlan = [
  [1, 2, 1, 2],
  [1, 2, 1, 3],
  [1, 2, 3, 2],
  [2, 3, 2, 1, 2, 4, 2, 3],
  [2, 3, 2, 4],
  [2, 3, 5, 4],
  [3, 5, 4, 6],
  [4, 5, 7, 6],
  [5, 7, 6, 8],
  ];

var sliceWidths = [5, 6, 7, 4, 9, 10, 11, 12, 7];
var straightThreadings = ["parallel straight", "broken straight", "straight"];
var pointThreadings = ["long point", "peak and valley", "point", "broken point"];

var slices = [];

for (var i = 0; i < sliceColorPlan.length; i++) {
  var currentSlice = [];
  for (var j = 0; j < sliceWidths[i]; j++)
    //currentSlice = currentSlice.concat(((sliceColorPlan[i])));
    currentSlice = currentSlice.concat((shuffle(sliceColorPlan[i])));
  slices.push(currentSlice);
}

var lastSlice = slices[slices.length - 1];
slices[slices.length - 1] = lastSlice.concat(lastSlice.slice(0).reverse());
slices = slices.concat(slices.slice(0, -1).reverse());

//slight adjustment for weird threading
slices[8].push(slices[9].pop());
slices[8].push(slices[9].pop());
var sliceThreadings = [];
var straightCounter = 0;
var pointCounter = 0;

for (var i = 0; i < slices.length; i++) {
  sliceThreadings.push(straightThreadings[straightCounter % straightThreadings.length]);
  straightCounter++;
  sliceThreadings.push(pointThreadings[pointCounter % pointThreadings.length]);
  pointCounter++;
}
sliceThreadings[8] = "peak and valley";

for (var i = 0; i < slices.length; i++) {
  threads = threads.concat(repeat(4, [0]));
  threads = threads.concat(slices[i]); 
  threading = threading.concat([1, 2, 3, 4]);
  threading = threading.concat(buildThreading(sliceThreadings[i], slices[i].length));
}

threads = threads.concat(repeat(4, [0]));
threading = threading.concat([1, 2, 3, 4]);

var peakValley = buildThreading("peak and valley", 54);
for (var i = 0; i < peakValley.length; i++)
  peakValley[i] = peakValley[i] - 1;

for (var i = 0; i < 8; i ++) {
  for (var j = 0; j < peakValley.length; j++)
       treadling.push(((peakValley[j] + i)%8) + 1);
  treadling.push(i + 1);
}

for (var i = 0; i < treadling.length; i++) {
  weftThreads.push(0);
}

//logWif();

/*
for (var i = 0; i < tieup.length; i++) {
  log(", [" + tieup[i] + "]");
}
*/

log(threads);
function buildThreading (threading, threadingLength) {
  var myThreading = [];
  var patternRepeat = [];
  var leftoverThreads = 0;
  
  switch (threading) {
    case "straight":
      patternRepeat = [1, 2, 3, 4, 5, 6, 7, 8];
      break;
    case "point":
      patternRepeat = [5, 6, 7, 8, 7, 6, 5, 
                       4, 3, 2, 1, 2, 3, 4];
      break;
    case "long point":
      patternRepeat = [1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3, 2, 1,
                       8, 7, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7, 8];
      break;
    case "parallel straight":
      patternRepeat = [4, 8, 3, 7, 2, 6, 1, 5, 8, 4, 7, 3, 6, 2, 5, 1];
      break;
    case "broken point":
      patternRepeat = [8, 7, 6, 5, 
                       1, 2, 3, 4, 5, 6, 7, 8,
                       4, 3, 2, 1];
      break;
    case "peak and valley":
      patternRepeat = [1, 2, 3, 4, 3, 2, 1, 
                       2, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3, 2, 
                       1, 2, 3, 4, 3, 2, 1,
                       
                 8, 7, 6, 5, 6, 7, 8, 
                       7, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7, 
                       8, 7, 6, 5, 6, 7, 8
                       ];
      break;
    case "broken straight":
      patternRepeat = [3, 4, 1, 2, 3, 4, 5, 6,
                       7, 8, 5, 6, 7, 8, 1, 2];
      break;
    default:
      patternRepeat = [1, 2, 3, 4, 5, 6, 7, 8];
      log("no definition for threading name: " + threading);
  }
  
  leftoverThreads = threadingLength % patternRepeat.length;
  leftoverStart = patternRepeat.length - leftoverThreads/2;
  for (var i = leftoverStart; i < patternRepeat.length; i++){
    myThreading.push(patternRepeat[i]);
  }
  
  var remainingThreading = threadingLength - myThreading.length;
  for (var i = 0; i < remainingThreading; i++) {
    myThreading.push(patternRepeat[i % patternRepeat.length]);
  }
  
  return myThreading;
}

