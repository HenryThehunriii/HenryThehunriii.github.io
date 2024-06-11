let pongLocation = {x: 490, y: 240, angle: 75, speed: 5};
let player = {x: 475,y: 450,speed:6}
let direction
let cooldown=0
let win=false
let lost = false
gameCanvas = document.getElementById('gameCanvas');
gameCanvas.width = 1000;
gameCanvas.height = 500;
let score=0
function movement(){
  if(direction=='left'){
      player.x-=player.speed
  }
  if(direction=='right'){
      player.x+=player.speed
  }
}
function ballCollision(){
    if(Math.sqrt(((player.x+50-pongLocation.x)**2+(player.y-pongLocation.y)**2))<=50&&(player.y-pongLocation.y)<=10&&(player.y-pongLocation.y)<=10){
        difference=pongLocation.x-player.x
        pongLocation.angle=difference*0.9-90

        if(cooldown==0){
        score+=1
        pongLocation.speed+=0.1
        cooldown=100}
        console.log('collide')
    }
}
function detectBorders(){
    if(player.x<10){
        player.x=10
    }
    if(player.x>890){
        player.x=890
    }
    if(pongLocation.x<=10){
        if(pongLocation.y<=250){
            pongLocation.angle=-pongLocation.angle+180}
        else{
            pongLocation.angle=-pongLocation.angle-180}        
    }
    if(pongLocation.x>980){
        if(pongLocation.y<=250){
        pongLocation.angle=-pongLocation.angle+180}
        if(pongLocation.y>250){
        pongLocation.angle=-pongLocation.angle-180}

    }
    if(pongLocation.y<=0){
        pongLocation.angle=-pongLocation.angle
    }
    if(pongLocation.y>500&&lost==false){
        alert('You lost')
        lost=true

    }
    if(lost==true){
        pongLocation.x=-100
        pongLocation.y=-100
    }
}
function animate() {
    context = gameCanvas.getContext('2d');
    context.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    pongLocation.x += Math.cos(pongLocation.angle * Math.PI / 180) * pongLocation.speed;
    pongLocation.y += Math.sin(pongLocation.angle * Math.PI / 180) * pongLocation.speed;

    if(win==false){
        draw();
    movement()
    detectBorders()
    ballCollision()
        if(cooldown > 0){
            cooldown-=1
        }

    document.getElementById('score').innerHTML = score
    if(score>=10){
        alert('You win!')
        win=true
    }}
}

function draw() {
    console.log('hi');
    context.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    
    // Draw the pong ball
    context.beginPath();
    context.arc(pongLocation.x, pongLocation.y, 10, 0, 2 * Math.PI);
    context.fillStyle = "#ffffff";
    context.fill();
    context.closePath();
    
    // Draw the player rectangle
    context.fillStyle = "yellow"; // Set the fill color to black
    context.fillRect(player.x, player.y, 100, 10); // Draw a rectangle at player's position with width 50 and height 20
}
function directionChange(direc){
    direction=direc
}
animate()
document.addEventListener('keydown',function(event){
  if(event.keyCode==65){
      direction = 'left'
      console.log('a')
  }
  else if(event.keyCode==68){
      direction = 'right'
      console.log('d')
  }
  
  
})
let animateInterval = setInterval(animate,20)
