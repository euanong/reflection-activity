function SymmetryDot(stage,clickable,x,y,radius,colours,index,game){
	this.clickable = clickable;
	this.colour = index;
	this.colours = colours;
	this.radius = radius;
	this.circle = null;

	this.setCircle = function(x,y){
		this.circle.x = x;
		this.circle.y = y;
		stage.addChild(this.circle);
	}

	this.getNewColour = function(){
		this.colour++;
		if (this.colour>(this.colours.length-1)){
			this.colour = 0;
		}
	}

	this.setClickListener = function(){
		var c = this.circle;
		var d = this;
		var g = game;
		this.circle.on("click", function (evt) {
			if (d.clickable==true){
				d.getNewColour();
				console.log(d.colours[d.colour]);
				c.graphics.clear().beginFill(d.colours[d.colour]).drawCircle(0,0,d.radius).endFill();
				g.checkColours();
			}
		});
	}

	this.showSmile = function(){
		var s = new createjs.Shape();
		var g = s.graphics;
		//Head
		var scale = 150;
		g.setStrokeStyle(10/scale*this.radius, 'round', 'round');
		g.beginStroke("#000");
		g.beginFill("#FC0");
		g.drawCircle(0, 0, 100/scale*this.radius); //55,53
		//Mouth
		g.beginFill(); // no fill
		g.arc(0, 0, 60/scale*this.radius, 0, Math.PI);
		//Right eye
		g.beginStroke(); // no stroke
		g.beginFill("#000");
		g.drawCircle(-30/scale*this.radius, -30/scale*this.radius, 15/scale*this.radius);
		//Left eye
		g.drawCircle(30/scale*this.radius, -30/scale*this.radius, 15/scale*this.radius);
		s.x = this.circle.x;
		s.y = this.circle.y;
		stage.addChild(s);
		console.log(s);
	}

	this.init = function(){
		var circle = new createjs.Shape();
		circle.graphics.beginFill(this.colours[this.colour]).drawCircle(0,0,this.radius).endFill();
		this.circle = circle;
		this.setCircle(x,y);
		this.setClickListener();
		//console.log(this.circle);
	}
}