var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');
var score = 0;
var targets = [];
var gameInterval;
let interval = 850  
let changes = 0  
canvas.width = 800;
canvas.height = 550;
var refreshInterval
var alive = true;
let way
function addTarget()
{
	var x = Math.random() * (canvas.width - 40) + 20; // Ensure there's space for the largest radius - CHANGE
	var y = Math.random() * (canvas.height - 40) + 20;//CHANGE
	targets.push({ x: x, y: y, radius: 40 ,speed:20, way:'up'}); // Increased radius to fit multiple rings - CHANGE
}

function drawTargets()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if(targets.length<5){
		if(score>=75){
			clearInterval(gameInterval);
			clearInterval(refreshInterval);
			alert('You Won')
		}
	targets.forEach(function(target)
	{
		if (target.y<0){
            target.way='down';
			target.speed=30

        }
		else if (target.x<0){
            target.way='right';
			target.speed=30

        }
		else if (target.y>550){
            target.way='up';
			target.speed=30

        }
		else if (target.x>800){
            target.way='left';
			console.log('touch right')
			target.speed=30

        }
		if(target.speed==0){
			directionLst=['left', 'right', 'up', 'down']
			target.way=directionLst[Math.floor(directionLst.length*Math.random())]
			target.speed=20
		}
		else{
		if(target.way=='left'){
			target.x-=4
		}
		else if(target.way=='right'){
            target.x+=4
        }
		else if(target.way=='up'){
            target.y-=4
        }
		else if(target.way=='down'){
            target.y+=4
        }
		target.speed-=1}

		// Draw multiple circles for each target - CHANGE; for loop is NEW
		if(score>=50){
		for (let i = 0; i < 8; i++)
		{
			
			ctx.beginPath();
			ctx.arc(target.x, target.y, target.radius - (i * 5), 0, Math.PI * 2, true); //Decrease the radius incrementally with each iteration. - CHANGE
			ctx.fillStyle = i % 2 == 0 ? '#F00' : '#FFF';//create alternating rings - CHANGE
			ctx.fill();

		}
		if(changes==2){
			changes++;
			clearInterval(gameInterval)	
			gameInterval = setInterval(function()
			{
				addTarget();
			
			}, 550 )
		}
}
		else if(score>=40){
			for (let i = 0; i < 8; i++)
			{
				ctx.beginPath();
				ctx.arc(target.x, target.y, target.radius - (i * 5), 0, Math.PI * 2, true); //Decrease the radius incrementally with each iteration. - CHANGE
				ctx.fillStyle = i % 2 == 0 ? '#FB0' : '#FFF';//create alternating rings - CHANGE
				ctx.fill();
			}
			if(changes==3){
				changes++;
				clearInterval(gameInterval)	
				gameInterval = setInterval(function()
				{
					addTarget();
				
				}, 550 )
			}}
		else if(score>=30){
				for (let i = 0; i < 8; i++)
				{
					ctx.beginPath();
					ctx.arc(target.x, target.y, target.radius - (i * 5), 0, Math.PI * 2, true); //Decrease the radius incrementally with each iteration. - CHANGE
					ctx.fillStyle = i % 2 == 0 ? '#FF0' : '#FFF';//create alternating rings - CHANGE
					ctx.fill();
				}
				if(changes==2){
					changes++;
					clearInterval(gameInterval)	
					gameInterval = setInterval(function()
					{
						addTarget();
					
					}, 550 )
				}
				changes++;}
		else if(score>=20){
			for (let i = 0; i < 8; i++)
			{
				ctx.beginPath();
				ctx.arc(target.x, target.y, target.radius - (i * 5), 0, Math.PI * 2, true); //Decrease the radius incrementally with each iteration. - CHANGE
				ctx.fillStyle = i % 2 == 0 ? '#0F0' : '#FFF';//create alternating rings - CHANGE
				ctx.fill();
			}
			if(changes==1){
				changes++;	
				clearInterval(gameInterval)
				gameInterval = setInterval(function()
				{
					addTarget();
				
				}, 650 )
			}}
		else if(score>=10){
			for (let i = 0; i < 8; i++)
			{
				ctx.beginPath();
				ctx.arc(target.x, target.y, target.radius - (i * 5), 0, Math.PI * 2, true); //Decrease the radius incrementally with each iteration. - CHANGE
				ctx.fillStyle = i % 2 == 0 ? '#00F' : '#FFF';//create alternating rings - CHANGE
				ctx.fill();
			}
			if(changes==0){
				changes++;
				console.log(0)
				clearInterval(gameInterval)
				gameInterval = setInterval(function()
				{
					console.log('target')

					addTarget();
				
				}, 750 )
			}

		}
		else{
			for (let i = 0; i < 8; i++)
			{
					ctx.beginPath();
					ctx.arc(target.x, target.y, target.radius - (i * 5), 0, Math.PI * 2, true); //Decrease the radius incrementally with each iteration. - CHANGE
					ctx.fillStyle = i % 2 == 0 ? '#000' : '#FFF';//create alternating rings - CHANGE
					ctx.fill();
			}}
		
	});}
	else{
		alert("You Lost")
		alive = false;
	    clearInterval(gameInterval);
		clearInterval(refreshInterval);
	}
}

function checkCollision(x, y)
{
	// Increase the effective radius for easier clicking
	const hitRadius = 50; //increase the size
	targets = targets.filter(function(target)
	{
		var distance = Math.sqrt((x - target.x) ** 2 + (y - target.y) ** 2);
		if (distance < hitRadius)
		{
			score++;//create accumulator
			return false; // Target is hit
		}
		return true; // Target stays
	});
}

canvas.addEventListener('click', function(event)
{
	var rect = canvas.getBoundingClientRect();
	var x = event.clientX - rect.left;
	var y = event.clientY - rect.top;
	checkCollision(x, y);
	document.title = 'Score: ' + score; // Update score in the title - NEW
	document.getElementById('return-area').innerHTML = `Score: ${score}`;//show counter at bottom of page - NEW
});

if(alive){
gameInterval = setInterval(function()
{
	addTarget();

}, interval ); 
refreshInterval = setInterval(function()
{

	drawTargets();
}, 20); }
