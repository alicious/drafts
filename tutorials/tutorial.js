// NOTE: TEXT EDITOR DEFAULTS TO VI MODE. IF YOU AREN'T VI-PROFICIENT, 
// FIRST MAKE SURE TEXT EDITOR IS SET TO "DEFAULT" IN THE SIDE MENU OVER THERE <--
// WORKING ON FIXING THIS SOON

// Welcome to Warp Engine!
// Warp Engine is an application that lets you design weaving warps using javascript.

// The following is some example code to show you how to use this tool. If you are totally unfamiliar with
// javascript and/or coding, you might want to learn some at https://www.codecademy.com/learn/javascript
// Or, just plow ahead and ask questions later! You don't need prior coding experience to finish the tutorial.

// Below, on line 18, we have the array called "colors." This stores all the colors available to use,
// and each color is stored as a hex value. You can find hex values for colors using a color picker,
// like the one found here: http://www.w3schools.com/tags/ref_colorpicker.asp 
// Add as many colors as you want, just make sure all your hex values are in quotes, with a "#" in front, 
// and separated by commas. You can also just skip this for now and leave it as the basic rainbow.

colors = [ "#cc3300", "#e65c00", "#ffdb4d", "#3aac3a", "#0059b3", "#7a00cc", "#000000", "#ffffff" ];


threads = [ ];

// THREADS ARRAY: Above, we have the array called "threads", which starts out empty. 
// The threads array will store a number for every thread in your warp, which indicates what color the thread 
// should be. The palette up top, just below the warp, shows what numbers correspond to which colors.

// So, for example, if the first entry in the threads array is '4', that tells Warp Engine that the very 
// leftmost thread should be blue.

// For now, our threads array is empty, but the rest of your code is all about changing that.
// Next, let's put something in our threads array, while learning about how comments work.


// COMMENTS: Any line that starts with "//" is what is called a "comment". Comments are ignored when running
// your code; they are purely there for humans to read. If you don't need a comment any more, you can delete
// the whole line and it won't affect what your code does.

// Try making line 41, below, no longer a comment. Delete the "//" in front of it.
// Then click on "make it so." (That's the button that runs your code and redraws the warp.)

//threads = [ 6, 5, 2, 6, 0, 4 ]; 	//from now on, feel free to 're-comment' any lines by adding back the "//"

// Below is an example of a javascript "for loop". This loop will run 12 times, while keeping track of how
// many times it's run in the 'i' variable. Take a second to play with un-commenting and re-commenting
// lines 49 and 50, below - what happens when only 49 is 'on'? What about only 50? How about both?
// Don't forget to hit "make it so" whenever you've want to see a change you've made.

for (var i = 0; i < 12; i++) { 			// what if you change the '12' in this line to a different number?
//  threads.push(i%6); 					// this '%' is the modulo function. what if the '6' is a '4' instead?
//  threads = threads.concat([6, 7]);		// 'concat' is short for concatenate. it adds something to the end
}										// of an array, and returns the result as a new array.

// BUILT IN FUNCTIONS:

// We've already written some built in functions for you. Try out the "repeat" function, by deleting 
// the "//" at the beginning of the following line:
//threads = repeat(2, threads);

// Here's another built in function to play with - "shuffle" - which takes an array, and returns a random
// shuffle of that array. We still need to assign the result to threads, since shuffle doesn't actually
// change the array that we give it - it returns a new array.  Try it out by un-commenting the line below.
//threads = shuffle(threads);   // note: each time you click "make it so," you'll get a different shuffle

// And one more function, stretch, "multiplies" your array, repeating each color a given number of times.
//threads = stretch(4, threads);

// For more the slightly more experienced: You can also write your own functions and call them from inside 
// this editor. A basic javascript function declaration looks like this:
function myAwesomeFunction (args, stuff) {
  //code goes in here, and can perform operations using "args" and "stuff." 
  //you also want a return statement, which tells the function what to spit out at the end:
  return 0;
}

// If you'd like to log info, try the "log" function. Display the log by checking the "show log"
// box up top.

log("sweet threads:");
log(threads);

// If you want to share your project, all you need is the URL for this page. Careful though, for the time
// being this also shares the ability to edit your project. You can always start a new project from scratch
// by visiting engine-room.appspot.com with no extra business at the end. You can see all the previous
// projects you've started or edited in the menu (well, just the ones you've opened on this machine/browser).

// That's all for now. If you'd like to explore further, go check out Code Academy, or maybe try reading up 
// on javascript array methods to get some ideas of what sorts of things you can do to your threads array: 
// http://www.w3schools.com/js/js_array_methods.asp

// <3 Cat's Cradle Textiles
