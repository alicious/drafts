colors  = [ "#fff8f5", "#ffe5e5", "#ffd380", "#f7a7a3", "#ac96a9", "#7274a2", "#4b5b78", "#31395d" ];

threads = [ ];

shafts = 8;
treadles = 8;
threading = [];
weftThreads = [];
treadling = [];
tieup = [];

for (var i = 0; i < 128; i++)
  threads.push(0)

var colorschema = [ 0, 0, 0, 0, 1, 0, 1, 2, 3, 4, 3, 4, 5, 4, 5, 4, 6, 6, 7, 7];
var bout = [];
var nextbout = [];

while (colorschema.length >= 4) {

  bout = colorschema.slice(0, 4);

  if (colorschema.length == 4)
    nextbout = bout;
  else
    nextbout = colorschema.slice(1, 5);

  for (var j = 0 ; j < 4 ; j++) {
    threads = threads.concat(shuffle(bout));
  }

  for (var j = 0 ; j < 2 ; j++) {
    threads = threads.concat(shuffle(nextbout));
  }

  for (var j = 0 ; j < 2 ; j++) {
    threads = threads.concat(shuffle(bout));
  }
  
  colorschema.shift();
}

//straight threading
for (i=0; i < threads.length; i++) 
    threading.push(i%8 + 1);

//undulatingTwill();
scrollWork();

for (i = 0; i < treadling.length; i++) {
    weftThreads.push(0);
}

//windingGuide();
logWif();

function scrollWork () {
    var treadlingRepeat = [1,2,3,4,5,6,7,8];
    for ( i = 0; i < 8; i++);
        treadling = treadling.concat(treadlingRepeat);

    tieup = [
                [1,2,3,6],
                [2,5,6,7],
                [4,5,7,8],
                [1,3,4,8],
                [1,4,5,6],
                [1,2,5,8],
                [2,3,7,8],
                [3,4,6,7]
            ];
}

function undulatingTwill () {
    var treadlingRepeat = [1,2,3,4,6,7,2,5,8,5,2,7,6,4,3,2,1,7,5,3,1,3,5,7];
    for ( i = 0; i < 8; i++);
        treadling = treadling.concat(treadlingRepeat);
    for (i = 0; i < 8; i++) {
        var treadle = [];
        for (j = 0; j < 4; j++) {
            treadle.push((i+j+1)%8 + 1);
        }
        tieup.push(treadle);
    }
}

function windingGuide () {

  var chainWidth = 96;
  var chainCount = Math.ceil(threads.length / chainWidth);
  var chainThreads = [];
  var groupSize = 4;

  for (i = 0; i < chainCount; i++) {
    log("---- CHAIN " + (i+1) + " ----");

    chainThreads = threads.slice(chainWidth*i, chainWidth*(i+1));

    var group = "group";
    var nextGroup = "next group";
    var groupCount = 1;
    var lineCount = 0;

    for (j = 0; j < chainThreads.length; j += groupSize) {
      group = chainThreads.slice(j, j + groupSize);
      nextGroup = chainThreads.slice(j + groupSize, j + groupSize*2);

  //  for (k = 0; k < groupSize; k++) {
  //    var startColor = (chainThreads.slice(0, j).indexOf(group[k]) === -1);
  //    if (startColor && j!==0)
  //      log("\n \t start " + group[k]);
  //  }

      if (group.sort().join() === nextGroup.sort().join()) {
        groupCount++;
      } else {
        log("  " + groupCount + " times: " + group);
        lineCount++;

        if (lineCount > 2) {
          log("\b");
          lineCount = 0;
        } else if (groupCount > 6) {
          log("\b");
          lineCount = 0;
        }

        groupCount = 1;
      }

  //  for (k = 0; k < groupSize; k++) {
  //    var endColor = (chainThreads.slice(j + groupSize).indexOf(group[k]) === -1);
  //    if (endColor && (j < (chainWidth - groupSize)))
  //      log("\t end " + group[k] + "\n");
  //  }
    }
    log("\b");
  }
}
