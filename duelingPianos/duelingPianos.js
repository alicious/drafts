colors = ["#FFFFFF", "#000000"];
shafts = 4;
treadles = 4;
tieup = [
  [1,4,6],
  [4,3,5],
  [3,2,6],
  [2,1,5],
  [1,4,6],
  [4,3,5]
];

/*
*/
shafts = 8;
treadles = 8;
tieup = [
  [1, 2, 4, 6],
  [2, 3, 5, 7],
  [3, 4, 6, 8],
  [1, 4, 5, 7],
  [2, 5, 6, 8],
  [1, 3, 6, 7],
  [2, 4, 7, 8],
  [1, 3, 5, 8]];

var twinkleVerse = [1, 1, 5, 5, 6, 6, 5, 4, 4, 3, 3, 2, 2, 1];
var twinkleChorus = [5, 5, 4, 4, 3, 3, 2, 5, 5, 4, 4, 3, 3, 2];
var twinkle = twinkleVerse.concat(twinkleChorus);
var twinkleAbridged = [1,5,6,5,4,3,2,1];
var twinkleMicro = [1, 1, 2, 3, 4, 5, 5, 6, 6, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1];
                   // 2, 3, 4, 5, 5, 4, 4, 3, 3, 2, 2, 3, 4, 5, 5, 4, 4, 3, 3, 2, 2];

var hozier = [1, 6, 1, 1, 5,
              1, 3, 6, 1, 1, 5, 1,
              1, 3, 6, 4, 6, 5,
              1, 3, 6, 4, 5, 1];
/*
var sunshine = [1, 4, 5, 6, 6, 6, 5, 6, 4, 4,
                4, 5, 6, 7, 9, 9, 8, 7, 6,
                4, 5, 6, 7, 9, 9, 8, 7, 6, 4,
                4, 5, 6, 7, 5, 5, 6, 4];
*/
var sunshine = [1, 4, 5, 6, 6, 5, 6, 4,
                4, 5, 6, 7, 9, 8, 7, 6,
                4, 5, 6, 7, 9, 8, 7, 6, 4,
                4, 5, 6, 7, 5, 6, 4];
/*
for (var i = 0; i < twinkle.length; i++)
  twinkle[i] = (twinkle[i]+1);
*/

threading = buildCrackle(zigZag(invert(sunshine)));

//treadling = buildCrackle(twinkleMicro);
//treadling = buildCrackle(zigZag(twinkleAbridged));
treadling = buildCrackle(zigZag(invert(twinkle)));
//log(treadling.length);

//SELVEDGES
threading = threading.slice(1,-4);
threading = [6,5,6,5,6,5].concat(threading).concat([5,6,5,6,5,6]);

for (var i = 0; i < threading.length; i++) {
  threads[i] = 0;
}

for (var i = 0; i < treadling.length; i++) {
  weftThreads[i] = 1;
}

//shafts = 6;
logWif();


// FUNCTIONS

function pointReflect (array) {
  return array.concat(array.slice(0, -1).reverse());
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

function buildCrackle (designLine) {
  return collapse(shafts, peakify(3, designLine));
}

function peakify (pointHeight, designLine) {
  var height = pointHeight - 1;
  var result = [];
  var point = [];
  for (var i = 0; i < height; i++)
    point.push(i);
  for (var i = height; i >= 0; i--)
    point.push(i);
  
  var gap = 0;
  
  for (var i = 0; i < designLine.length; i++) {
    gap = (designLine[i] - designLine[i+1]);
    
    for (var j = 0; j < point.length; j++) {
      result.push(designLine[i] + point[j]);
    }
  
    if (gap == 0)
      result.pop();
    else if (gap != 1) {
      if (gap < 0) {
        for (j = 1; j < Math.abs(gap); j++)
          result.push(designLine[i] + j)
      } else if (gap > 0) {
        for (j = 1; j < gap; j++)
          result.push(designLine[i] - j)
      }
    }
  }
  
  return result;
}

function invert (array) {
  var result = [];
  var max = 0;
  for (var i = 0; i < array.length; i++) {
    if (array[i] > max)
      max = array[i];
  }
 
  max = max + 2;
  
  for (var i = 0; i < array.length; i++) 
    result.push(max - array[i]);
  
  return result;
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

function fillGaps (array) {
  var result = [];
  var gap = 0;
  
  for (var i = 0; i < array.length; i++) {
   	gap = array[i+1] - array[i]; 
    result.push(array[i]);
    
    if (gap > 0) {
      for (var j = 1; j < gap; j++)
        result.push(array[i] + j)
    } else if (gap < 0) {
      for (var j = 1; j < Math.abs(gap); j++)
        result.push(array[i] - j)
    }
  }
  return result;
}

function continuousFromDiscreet (array) {
  var result = [];
  var gap = 0;
  
  for (var i = 0; i < array.length; i++) {
   	gap = array[i+1] - array[i]; 
    result.push(array[i]);
    
    if (gap > 1) {
      for (var j = 0; j < gap; j++)
        result.push(array[i] + j)
    } else if (gap < 0) {
      for (var j = 0; j < Math.abs(gap); j++)
        result.push(array[i] - j)
    }
  }
  return result;
}

function stepLength (array) {
  var result = [];
  for (var i = 0; i < array.length; i++) {
    for (var j = 0; j < array[i]; j++)
      result.push(i);
  }
  return result;
}

function peakBuilder (array) {
  var result = [];
  var tempArray = [];
  
  for (var i = 0; i < array.length; i++)
    tempArray.push(array[i] + 1);
  
  for (var i = 0; i < tempArray.length; i++) {
    for (var j = 0; j < tempArray[i]; j++) 
      result.push(j);
    for (var j = tempArray[i]; j > 0; j--) 
      result.push(j);
  }
  
  return result;
}

function buildStraight (length) {
  var result = [];
  for (var i = 0; i < length; i++)
    result.push(i);
  return result;
}
