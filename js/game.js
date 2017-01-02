function Game(stage,xocolor,doc){
	this.margin = 0;
	//These must be even
	this.gridwidth = 10;
	this.gridheight = 6;
	this.circleswidth = 0;
	this.circlesheight = 0;
	this.radius = 0;
	console.log(xocolor);
	this.colours = ["#FFFFFF","#000000",xocolor.fill,xocolor.stroke];
	this.verticalline = null;
	this.horizontalline = null;
	this.mode = null;
	this.dotsarr = [];
	//0 = horizontal, 1 = vertical, 2 = bilateral

	this.radiusFromX = function(){
		this.margin = 1/50*stage.canvas.width;
		var diameter = (stage.canvas.width-(this.margin*(this.gridwidth+1)))/this.gridwidth;
		var radius = diameter/2;
		return radius;
	}

	this.radiusFromY = function(){
		this.margin = 1/50*stage.canvas.height;
		var diameter = (stage.canvas.height-(this.margin*(this.gridheight+1)))/this.gridheight;
		var radius = diameter/2;
		return radius;
	}

	this.canDoFromX = function(){
		var rad = this.radiusFromX();
		this.margin = 1/50*stage.canvas.width;
		if ((((rad*2)*this.gridheight)+(this.margin*(this.gridheight+1)))<=stage.canvas.height){
			return rad;
		} else {
			return false;
		}
	}

	this.removeLines = function(){
		if (this.verticalline!=null){
			stage.removeChild(this.verticalline);
			this.verticalline = null;
		}
		if (this.horizontalline!=null){
			stage.removeChild(this.horizontalline);
			this.horizontalline = null;
		}
	}

	this.addVerticalLine = function(){
		this.verticalline = new createjs.Shape();
		this.verticalline.graphics.beginFill("#000000").drawRect(0,0,this.margin/3,this.circlesheight-this.margin);
		this.verticalline.x = stage.canvas.width/2-this.margin/6;
		this.verticalline.y = this.margin/2;
		stage.addChild(this.verticalline);
	}

	this.addHorizontalLine = function(){
		this.horizontalline = new createjs.Shape();
		this.horizontalline.graphics.beginFill("#000000").drawRect(0,0,this.circleswidth-this.margin,this.margin/3);
		this.horizontalline.x = this.margin/2;
		this.horizontalline.y = this.circlesheight/2-this.margin/6;
		stage.addChild(this.horizontalline);
	}


	this.initHorizontalGame = function(){
		this.removeLines();
		this.addVerticalLine();
		this.mode = 0;
		this.initDots();
	}

	this.initDots = function(){
		this.dotsarr = [];
		var temparr = [];
		var incr = (this.radius*2+this.margin);
		for (var x = (stage.canvas.width-this.circleswidth)/2+this.margin; x<(stage.canvas.width+this.circleswidth)/2; x+=incr){
			temparr = [];
			for (var y = this.margin; y<this.circlesheight-this.margin; y+=incr){
				var s = new SymmetryDot(stage,true,x+this.radius,y+this.radius,this.radius,this.colours,Math.floor(Math.random()*this.colours.length),this);
				s.init();
				temparr.push(s);
				//console.log(s);
			}
			this.dotsarr.push(temparr);
		}
		console.log(this.dotsarr);
	}

	this.checkHorizontalGame = function(){
		var correct = true;
		for (var x = 0; x<this.gridwidth/2; x++){
			for (var y = 0; y<this.gridheight; y++){
				if (this.dotsarr[x][y].colour!=this.dotsarr[(this.gridwidth-1)-x][y].colour){
					correct = false;
				}
			}
		}
		if (correct==true){
			for (var x = 0; x<this.gridwidth; x++){
				for (var y = 0; y<this.gridheight; y++){
					this.dotsarr[x][y].clickable = false;
					this.dotsarr[x][y].showSmile();
				}
			}
		}
	}

	this.checkColours = function(){
		switch(this.mode) {
			case 0:
				this.checkHorizontalGame();
				break;
		}
	}

	this.init = function(){
		var r = this.canDoFromX();
		if (r==false){
			console.log("position based on y");
			r = this.radiusFromY();
		}
		this.radius = r;
		console.log(r);
		this.circleswidth = this.radius*2*this.gridwidth+this.margin*(this.gridwidth+1);
		this.circlesheight = this.radius*2*this.gridheight+this.margin*(this.gridheight+1);
		this.initHorizontalGame();
	}
}