let bird={x:100, y:300,speed:3}
let fly=0
let pipes=[]
let alive=true
let randomColor=Math.floor(Math.random()*3)
let wing=['rgb(205,205,0)','rgb(100,180,255)','rgb(185,0,25)']
let body=['rgb(255,255,0)','rgb(50,80,139)','rgb(255,55,55)']
let score=0
var flySound = document.createElement('audio');
flySound.src = "../sound/jump.flac";
let gameCanvas=document.getElementById('gameCanvas')
console.log(gameCanvas)
let pipeGeneration = setInterval(generatePipes, 1000)
let flyDetect = gameCanvas.addEventListener('mousedown', function(){
    fly=10
    flySound.play()

    
})
function generatePipes(){
    let randomHeight=Math.floor(Math.random()*200)
    pipes.push({x:1200, y:0, width:80, height:randomHeight})
    pipes.push({x:1200, y:randomHeight+150, width:80, height:gameCanvas.height-randomHeight-150})
}
function checkFly(){
    if(fly>=0){
        bird.y-=10
        fly-=1
        console.log(fly)
    }
}
function animateBird(){
    context = gameCanvas.getContext('2d');
    context.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    drawPipes()
    context.beginPath();
    context.rect(0, 480, gameCanvas.width, 20)
    context.fillStyle = 'lime';
    context.fill();
    context.closePath();
    drawBird()
    if(alive==true){
    score+=1}

    document.getElementById('score').innerHTML=score
    if(alive==true){
        if(score>=1500){
            alert('You Won')
            alive=false
            clearInterval(pipeGeneration)
        }
        checkFly()
    checkCollision()
}
    if(bird.y>480){
        bird.y=480
    }
    
}

function drawBird(){
    context.beginPath();
    context.ellipse(bird.x,bird.y,24,20,0,0,360);
    context.fillStyle = body[randomColor];
    context.fill();
    context.closePath();
    context.beginPath();
    context.ellipse(bird.x+20,bird.y,10,7,0,0,360);
    context.fillStyle = 'orange';
    context.fill();
    context.closePath();
    context.beginPath();
    if(fly>0){
    context.ellipse(bird.x-10,bird.y+5,16,12,-45,0,360);
    context.fillStyle = wing[randomColor];
    context.fill();
    context.closePath();}
    else{
        context.ellipse(bird.x-10,bird.y+5,12,10,0,0,360);
        context.fillStyle = wing[randomColor];
        context.fill();
        context.closePath();        
    }
    context.beginPath();
    context.arc(bird.x+10, bird.y-6, 10, 0, 2 * Math.PI);
    context.fillStyle = 'white';
    context.fill();
    context.closePath();
    context.beginPath();
    context.arc(bird.x+10, bird.y-6, 3, 0, 2 * Math.PI);
    context.fillStyle = 'black';
    context.fill();
    context.closePath();
    bird.y+=bird.speed
}
function drawPipes(){
    for(let i=0; i<pipes.length; i++){
        context.beginPath();
        context.rect(pipes[i].x, pipes[i].y, pipes[i].width, pipes[i].height);
        context.fillStyle ='green';
        context.fill();
        context.closePath();
        pipes[i].x-=5
    }
}
function checkCollision(){
    for(let i=0; i<pipes.length; i++){
        if(pipes[i].x<bird.x && pipes[i].x+pipes[i].width>bird.x){
            if(pipes[i].y<(bird.y+15) && pipes[i].y+pipes[i].height>(bird.y-15)){
                alert('You died')
                alive=false
                clearInterval(pipeGeneration)
            }
        }
    }
    if(bird.y>=gameCanvas.height-20||bird.y<=0){
        alert('You died')
        alive=false
        clearInterval(pipeGeneration)
    }
}
animateBird()
setInterval(animateBird, 10)
