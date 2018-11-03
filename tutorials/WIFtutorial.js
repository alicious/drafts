// Welcome to Warp Engine!
// Warp Engine is an application that lets you design warps using javascript.

// This tutorial demonstrates the basics of how to use Warp Engine to design threading, treadling, and tieup,
// and export your draft as a WIF (Weaving Information File) to be viewed in another weaving program.
// If you haven't completed the first Warp Engine tutorial, do that first: SOMETHING SOMETHING

// The function logWif(), which is called at the end of this code box, will take all the data from your 
// project and organize it into a WIF file, which you can copy as text from the log. If you'd prefer, you 
// can even call logWif() without setting up anything other than your warp colors, and then directly edit 
// the rest of your draft in a weaving program like FiberWorks or iWeaveIt, in which case you can skip this
// tutorial and just add "logWif();" to the end of an existing project.


 
// First, let's get some colors in our warp. Here I'm using the final output of the original tutorial.

colors = ["#cc3300", "#e65c00", "#ffdb4d", "#3aac3a", "#0059b3", "#7a00cc", "#000000", "#ffffff", "#999999"];

for (var i = 0; i < 12; i++) {
  threads.push(i%6);
  threads = threads.concat([6, 7]);
}

threads = repeat(2, threads);
threads = shuffle(threads);
threads = stretch(8, threads);


// Now we need to look at some new variables that hold data for the actual weaving structure.
// For this example, we'll set up a basic herringbone twill on 8 shafts, using 8 treadles. The order in which 
// all the following variables are assinged is somewhat arbitrary, as long as they're set to what you want by 
// the time you call logWif().

shafts = 8;
// The variable "shafts" defines how many shafts (i.e. harnesses) you are using. If you do not set this 
// to anything, it will be 4 by default.

treadles = 8;
// Same idea for "treadles," which defaults to 6 if you do not set it explicitly. 

threading = [];
// Here's our "threading" array, which works kind of like the "threads" array, except each array item will
// define which shaft the corresponding warp end is threaded on, rather than what color it is. 
// Take note - this array expects values 1 through x, where x is your number of shafts. Anything outside of 
// this range, including 0, will show up in your draft as a floating thread.

// We'll use a for loop to set up a broken point threading. The array function "concat" splices one array
// onto the end of an existing array, which is great for adding threading blocks to your threading array.

var straightIncrease = [1, 2, 3, 4, 5, 6, 7, 8];
var offsetDecrease = [4, 3, 2, 1, 8, 7, 6, 5];

for (var i = 0; i < threads.length/16; i++) {
  threading = threading.concat(straightIncrease);
  threading = threading.concat(offsetDecrease);
}

treadling = [];
// The treadling array is just like the threading array, except it stores values for which treadle to push
// instead of which shaft to thread. Treadling also expects values 1 through x, where x is how many treadles
// you will be using. Just like with threading, numbers outside of this range will show up as empty lines
// in your draft. We'll set "treadling" up for a straight treadling using a basic "for" loop, and the modulo
// operator "%".

for (var i = 0; i < 200; i++) {
  treadling.push(i%8 + 1); //note that we have to add 1 here to avoid 0's in our treadling
}

tieup = [];
// The tieup is defined as an array of arrays. It should contain as many arrays as you have treadles.
// The first array is a list of which shafts treadle 1 is tied to, the second is a list of which shafts
// treadle 2 is tied to, and so on. Here, we'll set up a 3/3/1/1 twill by defining an initial twill,
// and shifting all the shafts up by one for every subsequent treadle (looping around from 8 to 1)

var tieupInitial = [1, 2, 3, 7];
for (var i = 0; i < treadles; i++) {
  var treadle = [];
  for (var j = 0; j < tieupInitial.length; j++) {
    treadle.push(plus(tieupInitial[j], i));
  }
  tieup.push(treadle);
}
// As an aside, we've used the handy built in "plus" function, which takes care of some "shaft math"
// automatically - i.e. when working with 8 shafts, one higher than 8 is 1, not 9. There is also a
// "minus" function that uses the same logic.

weftThreads = [];
// Finally, we have "weftThreads," which is just like our "threads" array, except it defines the color
// for the weft instead of the warp. We'll just fill this array with one color here, but if you were doing
// a plaid, for example, you could use "weftThreads = threads;" to copy your warp colors into your weft.

for (var i = 0; i < treadling.length; i++) {
  weftThreads.push(8);
}

// All that's left is to call logWif() and we've got a usable draft. Open the log by checking the "show log"
// checkbox up top, select all, and paste into iWeaveIt's import box, or into a basic text file on your
// computer (with something like Notepad or TextEdit) before opening in the weaving program of your choice. 
logWif();
