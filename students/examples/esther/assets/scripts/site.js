document.getElementById("demo") . innerHTML = "Hello RhinoCoders!";


var symbols = "fun";
var letters = "sun";
var numbers = "run";
var characters = "African lions have";

var myFullString = characters+" "+symbols+" in the "+letters+" and they "+numbers+" faster than the speed of sound!";

var myLionColorArray = [
['Lion' , 'Claws' , 'Teeth' , 'Fur' , 'Tails' , 'Speed'], //0
['Gold' , 'Silver' , 'Platinum' , 'Black'] // 1
];

var myLionColor = "I like "+myLionColorArray[1]+" of "+myLionColorArray[0][1];

document.getElementById("my-string") . innerHTML = myFullString;