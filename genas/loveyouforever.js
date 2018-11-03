
var rainbowFactor = 3; // determines how dominant the background rainbow is.
					   // 0 is no rainbow, 8 is the most possible


var blendFactor   = 5; // determines how blended the segments are 
					   // ranges from 0 (no blending) to 9



colors = [
	"#9C3930", //brick
	"#bc5256", //brique
	"#f29d48", //orange pale
	"#ffd57a", //chamois
	"#d0dcb2", //lime
	"#92b7b7", //teal
	"#56818f", //vieuxi bleu
	"#31395d", //marine
	"#472446", //mauve
];
 
shafts = 8;
treadles = 8;
threading = [];
weftThreads = [];
treadling = [];
tieup = [];

for (var i = 0; i < colors.length; i++) {
  threads = threads.concat(shuffle(rainbowMix(i)));
}

for (var i = 0; i < blendFactor; i++) {
  threads = chunkShuffle(0, (colors.length-i), threads);
}

for (i=0; i < threads.length; i++) 
    threading.push(i%8 + 1);
undulatingTwill();

logWif();

function chunkShuffle (offset, chunks, array) {

  var result = [];
  var arrayCopy = array.slice();
  var chunkSize = Math.floor(array.length/chunks);
  
  result = arrayCopy.slice(0, offset);

  for (var i = offset; i < arrayCopy.length; i+=chunkSize) {
    result = result.concat(shuffle(arrayCopy.slice(i, i+chunkSize)));
  }
  
  return result;
}

function undulatingTwill () {
    var treadlingRepeat = [1,2,3,4,6,7,2,5,8,5,2,7,6,4,3,2,1,7,5,3,1,3,5,7];
    for ( var i = 0; i < 8; i++);
        treadling = treadling.concat(treadlingRepeat);
    for (var i = 0; i < 8; i++) {
        var treadle = [];
        for (j = 0; j < 4; j++) {
            treadle.push((i+j+1)%8 + 1);
        }
        tieup.push(treadle);
    }
}

function rainbowSlice (colorIndex) {
  var slice = [];
  
  	for (var i = 1; i < (colors.length); i++) {
      slice.push(colorIndex);
      slice.push((colorIndex + i) % colors.length);
    }
  	for (var i = (colors.length - 2); i > 0; i--) {
      slice.push(colorIndex);
      slice.push((colorIndex + i) % colors.length);
    }
  
  	slice.push(colorIndex);
  
  return shuffle(slice);
}

function rainbowMix (colorIndex) {
  var result = [];
  var size = 75;
  var mixins = Math.floor(size / colors.length);
  if ( rainbowFactor <= mixins )
    mixins = mixins - rainbowFactor;
  else
    mixins = 0;
  
  var main = size - (colors.length - 1) * mixins;
  
  for (var i = 0; i < colors.length; i++) {
    if (i == colorIndex)
      result = result.concat(repeat(main, i));
    else
      result = result.concat(repeat(mixins, i));
  }
  return shuffle(result);
}

