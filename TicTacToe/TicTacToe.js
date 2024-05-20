let gridLst = [['','',''],['','',''],['','','']]
let times = 0
document.getElementById(`preview`).innerHTML = "🔵"
function placeSymbol(x,y){
    if(gridLst[x][y]==''){
    if (times%2==0){
    document.getElementById(`r${x}b${y}`).innerHTML = "🔵"
    gridLst[x][y]='🔵'
    document.getElementById(`preview`).innerHTML = "❌"
}
    else{
        document.getElementById(`r${x}b${y}`).innerHTML = "❌"
        gridLst[x][y]='❌'
        document.getElementById(`preview`).innerHTML = "🔵"        
    }
    console.log(gridLst)
    times+=1
    checkWin(times)

}
    else{
        alert('Cant place here')
    }
}
function checkWin(times){
    results = document.getElementById('results')
    for(let i=0; i<3;i++){
        if(gridLst[i][0]==gridLst[i][1] && gridLst[i][1]==gridLst[i][2] && gridLst[i][0]!=''){
            results.innerHTML = (`Winner:${gridLst[i][0]}`)
            alert("There is a winner")
            return
        }
        if(gridLst[0][i]==gridLst[1][i] && gridLst[1][i]==gridLst[2][i] && gridLst[0][i]!=''){
            results.innerHTML = (`Winner:${gridLst[0][i]}`)
            alert("There is a winner")
            return
        }
    }
    if(gridLst[0][0]==gridLst[1][1] && gridLst[1][1]==gridLst[2][2] && gridLst[0][0]!=''){
        results.innerHTML = (`Winner:${gridLst[1][1]}`)
        alert("There is a winner")
        return
    }
    else if(gridLst[0][2]==gridLst[1][1] && gridLst[1][1]==gridLst[2][0] && gridLst[0][2]!=''){
        results.innerHTML = (`Winner:${gridLst[1][1]}`)
        alert("There is a winner")
        return
    }
    else if(times==9){
        alert('Draw')
        gridBlock = document.getElementById(`r${x}b${y}`);
        gridBlock.removeEventListener('click', function(){placeSymbol(x,y);console.log('placed')})
    }

}
for(let x=0;x<3;x++){
    for(let y=0;y<3;y++){
        gridBlock = document.getElementById(`r${x}b${y}`);
        gridBlock.addEventListener('click', function(){placeSymbol(x,y);console.log('placed')})
        
    }
}