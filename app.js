$(document).ready( function () 
{
	var rawText;
	var tokens;
  $( "#stupifyButton" ).on( "click",   function() { //freely interact with displays
  	rawText = $("#source").val().trim();
  	tokens = rawText.split(" ");
    
    console.log(rawText);
    console.log(tokens);
    
    //renderHighVelocity();
    increaseVelocity();
    addColors();
    setTimeout(function() {
      slowVelocity();
      resetColors();
      highlightResultText();
      postResultTokens();
     }, 3500);
  });

  function highlightResultText(){
  	//$("#result").css("filter", "blur(0px)");
  	//$("#result").css("filter", "blur(0px)");
  	// $("#result").css({
   //                          'filter': 'blur(0px)',
   //                          '-webkit-filter': 'blur(0px)',
   //                          '-moz-filter': 'blur(0px)',
   //                          '-o-filter': 'blur(0px)',
   //                          '-ms-filter': 'blur(0px)'
   //                      });
  	//$("#result").css("-web-filter", "blur(0px)");
  	$("#result").css("background-color", "#ecf0f1");
  }

  function postResultTokens(){
  	var content = "";
  	for (var i = 0; i < tokens.length; i++){
  		content += tokens[i] + " ";
  	}
  	$("#result").val(content);
  }
});



var canvas;
var ctx;
var circles;
var tick = 0;
var numCircles = 150;
var velo = 0;
var colors = ['#bdc3c7','#1abc9c','#f1c40f', '#2ecc71', '#8e44ad', '#e74c3c'];
//white, turquoise, sunflower
/*'#f1c40f'*/ //#2c3e50 #f1c40f #2980b9 #1abc9c #1abc9c #9b59b6 #95a5a6 #bdc3c7 #ecf0f1
var colorIndex = 0;

var chars = [
  '0', '1', '2', '3',
  '4', '5', '6', '7',
  '8', '9', 'a', 'b',
  'c', 'd', 'e', 'f'
];

// var randomColor = function() {
//   var c = [ ];
//   for (var i=0; i<6; i++) {
//     c.push(chars[Math.floor(Math.random()*chars.length)]);
//   }
//   return '#'+c.join('');
// };

var resize = window.resize = function() {
  canvas.height = document.body.offsetHeight;
  canvas.width = document.body.offsetWidth;
};

window.onload = function() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  resize();

  circles = [ ];

  for (var i=0; i<numCircles; i++) {
    var x = Math.random()*canvas.width;
    var y = Math.random()*canvas.height;
    var c = new Circle(x, y, canvas.width, canvas.height);
    c.draw();
    circles.push(c);
  }

  var loop = function() {
    window.requestAnimFrame(loop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i=0; i<circles.length; i++) {
      circles[i].frame();
    }
  };

  window.requestAnimFrame = function(){
    return window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(a) { window.setTimeout(a,1E3/60); };
  }();

  loop();
};

var Circle = function(x, y) {
  this.pos = [ x, y ];
  this.r = (1.9*Math.random())+1.3;
  this.c = colors[colorIndex];
  this.v = [
    (Math.random()-0.5)*(.04 + velo),
    (Math.random()-0.5)*(.04 + velo)
  ];
};

Circle.prototype.getBound = function(i) {
  return i ? canvas.height : canvas.width;
};

var i;
Circle.prototype.frame = function() {
  for (i=0; i<2; i++) {
    if (this.pos[i] > this.getBound(i)-10) { this.v[i] *= -1; }
    else if (this.pos[i] < 10) { this.v[i] *= -1; }
    this.pos[i] += this.v[i]*10;
  }

  this.draw();
};

Circle.prototype.draw = function() {
  ctx.fillStyle = this.c; 
  ctx.beginPath();
  ctx.arc(this.pos[0], this.pos[1], this.r, 0, 2 * Math.PI, false);
  ctx.fill();
};

function renderHighVelocity(){
	velo = 1;
	numCircles += 25;
	canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  resize();

  circles = [ ];

  for (var i=0; i<numCircles; i++) {
    var x = Math.random()*canvas.width;
    var y = Math.random()*canvas.height;
    console.log(colorIndex);
    var c = new Circle(x, y, canvas.width, canvas.height);
    c.draw();
    circles.push(c);
  }

  var loop = function() {
    window.requestAnimFrame(loop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i=0; i<circles.length; i++) {
      circles[i].frame();
    }
  };

  window.requestAnimFrame = function(){
    return window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(a) { window.setTimeout(a,1E3/60); };
  }();
  loop();
};

function increaseVelocity(){
	console.log(circles);
	for (var i = 0; i < circles.length; i++){
		circles[i].v = [
    		(Math.random()-0.5)*(2.1),
    		(Math.random()-0.5)*(2.1)
  		];
	}
}

function addColors(){
	for (var i = 0; i < circles.length; i++){
		colorIndex = Math.random()*colors.length | 0;
		circles[i].c = colors[colorIndex];
	}
}

function slowVelocity(){
	for (var i = 0; i < circles.length; i++){
		circles[i].v = [
    		(Math.random()-0.5)*(.04),
    		(Math.random()-0.5)*(.04)
  		];
	}
}

function resetColors(){
	resetColorIndex();
	for (var i = 0; i < circles.length; i++){
		circles[i].c = colors[colorIndex];
	}
}

function resetColorIndex(){
	colorIndex = 0;
}

