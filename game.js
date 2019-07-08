const cvs=document.getElementById("mygame");
const ctx=cvs.getContext("2d");

const box=30;

let snake=[];
// init snake
snake[0]={x:10*box,y:10*box};
snake[1]={x:11*box,y:10*box};
// current direction
let curDir="LEFT";

let food={x:Math.floor(Math.random()*15+1)*box,y:Math.floor(Math.random()*15+1)*box};
console.log(food.x);
console.log(food.y);
let score=0;
let newGame=true;

// sound files 
let eat=new Audio("sounds/s2.wav");
let lose=new Audio("sounds/s1.wav");
let mvm=new Audio("sounds/s3.wav");
//let bg=new Audio("sounds/bg.wav");

function  draw() {
    //ctx.clearRect(0,0,cvs.width,cvs.height);
	// check if game finished
	if(isGameOver() || isCollHappen())
	{

		eat.pause();
		eat.currentTime = 0;
		lose.play();
		clearInterval(game);
	}
	//fill background
	ctx.fillStyle = "#444";
	ctx.fillRect(0, 0, cvs.width, cvs.height);
	// draw snake
    for(let i=0;i<snake.length;i++)
	{
		ctx.fillStyle="black";
		ctx.fillRect(snake[i].x,snake[i].y,box,box);
		ctx.strokeStyle="white";
		ctx.strokeRect(snake[i].x,snake[i].y,box,box);
	}

	// draw food 
	ctx.fillStyle="red";
	ctx.fillRect(food.x,food.y,box,box);
	if(!newGame) return ;
	// draw score 
	ctx.fillStyle="Green";
	ctx.font="30px Tahoma";
	ctx.fillText(score,box,box);
	
	// old head 
	let snakeX=snake[0].x;
	let snakeY=snake[0].y;
	snake.pop();
	switch(curDir)
	{
		case "LEFT": snakeX-=box;break;
		case "RIGHT": snakeX+=box;break;
		case "UP": snakeY-=box;break;
		case "DOWN": snakeY+=box;break;
	}
	let newHead={x:snakeX,y:snakeY};
	snake.unshift(newHead);
	if(isHeadOnFood())
	{
		eatFood();
	}
	
	// check if game is over 

	
}


let game=setInterval(draw,155);

function isHeadOnFood()
{	
	return (snake[0].x==food.x&&snake[0].y==food.y);
}

function isCollHappen() {
	for(let i=1;i<snake.length;i++)
		if(snake[0].x==snake[i].x&&snake[0].y==snake[i].y)
			return true;
	return false;
}
function eatFood()
{
	eat.pause();
	eat.currentTime = 0;
	eat.play();
	score++;

	food={x:Math.floor(Math.random()*10+1)*box,y:Math.floor(Math.random()*10+1)*box};
	snake.push({x:snake[snake.length-1].x,y:snake[snake.length-1].y});
}
function isGameOver()
{
	let sx=snake[0].x;
	let sy=snake[0].y;
	return sx<=0 || sx>450 || sy<=0 || sy>500;
}
document.addEventListener("keydown",function(event)
{
		
		if(event.keyCode==37 && curDir!="RIGHT")
		{
			mvm.pause();
			mvm.currentTime = 0;
			mvm.play();
			curDir="LEFT";
			console.log("Current Direction now is left");
		}
		else if(event.keyCode==38 && curDir!="DOWN")
		{
			mvm.pause();
			mvm.currentTime = 0;
			mvm.play();
			curDir="UP";
			console.log("Current Direction now is UP");
		}
		else if(event.keyCode==39 && curDir!="LEFT")
		{
			mvm.pause();
			mvm.currentTime = 0;
			mvm.play();
			curDir="RIGHT";
			console.log("Current Direction now is RIGHT");
		}
		else if(event.keyCode==40 && curDir!="UP")
		{
			mvm.pause();
			mvm.currentTime = 0;
			mvm.play();
			curDir="DOWN";
			console.log("Current Direction now is DOWN");
		}
		else if((event.keyCode==13|| event.keyCode==32)&&!newGame)
		{
			newGame=true;
			snake=[];
			snake[0]={x:10*box,y:10*box};
			game=setInterval(draw,100);
			snake[1]={x:11*box,y:10*box};
		}
}
);




