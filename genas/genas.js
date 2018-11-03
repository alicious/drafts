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

/*
for (j = 0; j < colors.length; j++) {
  for (i = 0; i < 75; i++) {
    threads.push(j);
  }
}
*/
for (var i = 0; i < colors.length; i++) {
  threads = threads.concat(repeat(2, shuffle(rainbowSlice(i))));
}

threads = chunkShuffle(31, 12, threads);
threads = chunkShuffle(16, 10, threads);

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
  
  return slice;
}
