let dotLst = []
let snakeBody = [{x:40, y:10},{x:20, y:10},{x:0,y:10}]
let snakeLength = 3
var direction = ''
let score= 0
gameCanvas = document.getElementById('gameCanvas')
gameCanvas.width = 1000
gameCanvas.height = 500
function placeDot(){
    dotX = Math.floor(Math.random()*(gameCanvas.width-30))+30
    dotY = Math.floor(Math.random()*(gameCanvas.height-30))+30
    dotLst.push({x:dotX,y:dotY})
    console.log('dots Placed')
}
function drawScreen(){
    ctx = gameCanvas.getContext('2d')
    ctx.clearRect(0,0,gameCanvas.width,gameCanvas.height)
    for(let i=0;i<dotLst.length;i++){
        ctx.beginPath()
        ctx.arc(dotLst[i].x,dotLst[i].y,5,0,2*Math.PI)
        ctx.fillStyle = 'white'
        ctx.fill()
    }
    for(let j=0;j<snakeLength;j++){
        if(j==0){
            ctx.beginPath()
            ctx.arc(snakeBody[j].x,snakeBody[j].y,11,0,2*Math.PI)
            ctx.fillStyle = 'red'
            ctx.fill()
            
        }
        else{
        ctx.beginPath()
        ctx.arc(snakeBody[j].x,snakeBody[j].y,10,0,2*Math.PI)
        ctx.fillStyle = 'green'
        ctx.fill()
        }
    }
    checkCollision()
    if(score!='Game Over'){
    score = snakeLength-3

    if(score>=30){
        document.getElementById('score').style.color="blue"
    }
    else if(score>=20){
        document.getElementById('score').style.color="green"
    }
    else if(score>=10){
        document.getElementById('score').style.color="orange"
    }
    else if(score>=5){
        document.getElementById('score').style.color="red"
    }
    else{
        document.getElementById('score').style.color="white"
    }}
    document.getElementById('score').innerHTML = score

}

function movement(){
    if(direction=='up'){
        snakeBody.unshift({x:snakeBody[0].x,y:snakeBody[0].y-20})
    }
    if(direction=='down'){
        snakeBody.unshift({x:snakeBody[0].x,y:snakeBody[0].y+20})
    }
    if(direction=='left'){
        snakeBody.unshift({x:snakeBody[0].x-20,y:snakeBody[0].y})
    }
    if(direction=='right'){
        snakeBody.unshift({x:snakeBody[0].x+20,y:snakeBody[0].y})
    }
}
function checkCollision(){
    dotLst = dotLst.filter(function(dot){
        console.log(dotLst)
        if((Math.sqrt((dot.x-snakeBody[0].x)**2+(dot.y-snakeBody[0].y)**2))<=15){
            snakeLength+=1
            
            return false
        }
        else{
            return true
        }
    })
    if(snakeBody[0].x<-20 || snakeBody[0].y<-20 || snakeBody[0].x>(gameCanvas.width+20)|| snakeBody[0].y>(gameCanvas.height+20)){
        clearInterval(drawInterval)
        clearInterval(moveInterval)
        if(score>30){
            alert('Congratulations! You more than 30 points!')
            document.getElementById('score').style.color="lightgreen"
        }
        else{
            score = 'Game Over'
            document.getElementById('score').style.color="red"
        }



    }
    for(let k = 1; k < snakeLength; k++){
        if(snakeBody[0].x==snakeBody[k].x && snakeBody[0].y==snakeBody[k].y){
            clearInterval(drawInterval)
            clearInterval(moveInterval)
            score = 'Game Over'
            document.getElementById('score').style.color="red"
        }
    }
    if(dotLst.length==0){
        placeDot()
    }


}
function directions(directions){
    direction = directions
}
drawInterval = setInterval(drawScreen,5)
moveInterval = setInterval(movement,100)
document.addEventListener('keydown',function(event){
    if(event.keyCode==87){
        direction = 'up'
        console.log('w')
    }
    if(event.keyCode==65){
        direction = 'left'
        console.log('a')
    }
    if(event.keyCode==68){
        direction = 'right'
        console.log('d')
    }
    if(event.keyCode==83){
        direction = 'down'
        console.log('s')
    }
})
placeDot()
