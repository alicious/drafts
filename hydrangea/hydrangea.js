var colors = [];
var purples = ["#DADFEB"];

log("########");

for (var i = 0; i < 10; i++) {
  purples.push(dilute(purples[i], 2));
}

for (var i = 0; i < purples.length; i++)
  colors.push(purples[i]);

for (var i = 0; i < colors.length; i++)
  threads = i;

function dilute (hex, strength) {
  result = "#";
  
  for (var i = 1; i < 6; i+=2) {
    var color = parseInt(hex.split(i,2), 16);
    var diff = (255 - color)/2;
    result = result.concat(toString(color + diff));
  }
 
  return result;
}


