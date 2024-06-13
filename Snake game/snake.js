let dotLst = []
let snakeBody = [{x:60, y:10},{x:30, y:10},{x:0,y:10}]
let snakeLength = 3
let colorLst=['red', 'green', 'blue', 'orange']
let color = colorLst[Math.floor(Math.random() * colorLst.length)]
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
        ctx.arc(dotLst[i].x,dotLst[i].y,10,0,2*Math.PI)
        ctx.fillStyle = 'white'
        ctx.fill()
    }
    for(let j=0;j<snakeLength;j++){
        if(j==0){
            ctx.beginPath()
            ctx.arc(snakeBody[j].x,snakeBody[j].y,15,0,2*Math.PI)
            ctx.fillStyle = color
            ctx.fill()
            ctx.closePath()
            if(direction=='right'){
                ctx.beginPath()
                ctx.arc(snakeBody[j].x+6,snakeBody[j].y-8,6,0,2*Math.PI)
                ctx.fillStyle = 'white'
                ctx.arc(snakeBody[j].x+6,snakeBody[j].y+8,6,0,2*Math.PI)
                ctx.fill()
                ctx.closePath()
                ctx.beginPath()
                ctx.arc(snakeBody[j].x+10,snakeBody[j].y-8,2,0,2*Math.PI)
                ctx.fillStyle = 'black'
                ctx.arc(snakeBody[j].x+10,snakeBody[j].y+8,2,0,2*Math.PI)
                ctx.fill()
                ctx.closePath()
            }
            else if(direction=='left'){
                ctx.beginPath()
                ctx.arc(snakeBody[j].x-6,snakeBody[j].y-8,6,0,2*Math.PI)
                ctx.fillStyle = 'white'
                ctx.arc(snakeBody[j].x-6,snakeBody[j].y+8,6,0,2*Math.PI)
                ctx.fill()
                ctx.closePath()
                ctx.beginPath()
                ctx.arc(snakeBody[j].x-10,snakeBody[j].y-8,2,0,2*Math.PI)
                ctx.fillStyle = 'black'
                ctx.arc(snakeBody[j].x-10,snakeBody[j].y+8,2,0,2*Math.PI)
                ctx.fill()
                ctx.closePath()
            }
            else if(direction=='up'){
                ctx.beginPath()
                ctx.arc(snakeBody[j].x-8,snakeBody[j].y-6,6,0,2*Math.PI)
                ctx.fillStyle = 'white'
                ctx.arc(snakeBody[j].x+8,snakeBody[j].y-6,6,0,2*Math.PI)
                ctx.fill()
                ctx.closePath()
                ctx.beginPath()
                ctx.arc(snakeBody[j].x-8,snakeBody[j].y-10,2,0,2*Math.PI)
                ctx.fillStyle = 'black'
                ctx.arc(snakeBody[j].x+8,snakeBody[j].y-10,2,0,2*Math.PI)
                ctx.fill()
                ctx.closePath()                
            }
            else{
                ctx.beginPath()
                ctx.arc(snakeBody[j].x-8,snakeBody[j].y+6,6,0,2*Math.PI)
                ctx.fillStyle = 'white'
                ctx.arc(snakeBody[j].x+8,snakeBody[j].y+6,6,0,2*Math.PI)
                ctx.fill()
                ctx.closePath()
                ctx.beginPath()
                ctx.arc(snakeBody[j].x-8,snakeBody[j].y+10,2,0,2*Math.PI)
                ctx.fillStyle = 'black'
                ctx.arc(snakeBody[j].x+8,snakeBody[j].y+10,2,0,2*Math.PI)
                ctx.fill()
                ctx.closePath()                
            }


            
        }
        else{
        ctx.beginPath()
        ctx.arc(snakeBody[j].x,snakeBody[j].y,15,0,2*Math.PI)
        ctx.fillStyle = color
        ctx.fill()
        }
    }
    checkCollision()
    if(score!='Game Over'){
    score = snakeLength-3

    if(score>=20){
        document.getElementById('score').style.color="blue"
    }
    else if(score>=15){
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
        snakeBody.unshift({x:snakeBody[0].x,y:snakeBody[0].y-30})
    }
    if(direction=='down'){
        snakeBody.unshift({x:snakeBody[0].x,y:snakeBody[0].y+30})
    }
    if(direction=='left'){
        snakeBody.unshift({x:snakeBody[0].x-30,y:snakeBody[0].y})
    }
    if(direction=='right'){
        snakeBody.unshift({x:snakeBody[0].x+30,y:snakeBody[0].y})
    }
}
function checkCollision(){
    dotLst = dotLst.filter(function(dot){
        console.log(dotLst)
        if((Math.sqrt((dot.x-snakeBody[0].x)**2+(dot.y-snakeBody[0].y)**2))<=25){
            snakeLength+=1
            
            return false
        }
        else{
            return true
        }
    })
    if(snakeBody[0].x<0 || snakeBody[0].y<0 || snakeBody[0].x>(gameCanvas.width)|| snakeBody[0].y>(gameCanvas.height)){
        clearInterval(drawInterval)
        clearInterval(moveInterval)
        if(score>=25){
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
    if(!checkOpposite(directions)){
    direction = directions}
}
function checkOpposite(way){
    if(direction=='up'&&way=='down'){
        return true
    }
    else if(direction=='left'&&way=='right'){
        return true
    }
    else if(direction=='down'&&way=='up'){
        return true
    }
    else if(direction=='right'&&way=='left'){
        return true
    }
    else{
        return false
    }
}
drawInterval = setInterval(drawScreen,10)
moveInterval = setInterval(movement,100)
document.addEventListener('keydown',function(event){
    if(event.keyCode==87){
        if(!checkOpposite('up')){
        direction = 'up'
        console.log('w')}
    }
    if(event.keyCode==65){
        if(!checkOpposite('left')){
        direction = 'left'
        console.log('a')}
    }
    if(event.keyCode==68){
        if(!checkOpposite('right')){
        direction = 'right'
        console.log('d')}
    }
    if(event.keyCode==83){
        if(!checkOpposite('down')){
        direction = 'down'
        console.log('s')}
    }
})
placeDot()
