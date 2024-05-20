
function cointoss(){
    let randnum = Math.floor(Math.random()*2);
    console.log(randnum);
    selectOpt = document.getElementById("outcome");
    selectedvalue = selectOpt.options[selectOpt.selectedIndex].value;

    let sides = ["heads","tails"];
    let compvalue = sides[randnum];

    if(selectedvalue==compvalue){
        console.log("win");
        console.log(compvalue);
        console.log(selectedvalue);
        document.getElementById("results").innerHTML = "win"
        document.getElementById("results").style.color = "limegreen"
        document.getElementById("compchoice").innerHTML = compvalue;
       document.getElementById("userchoice").innerHTML = selectedvalue;
        }
    if(selectedvalue!=compvalue){
        console.log("loose");
        document.getElementById("results").style.color = "red"
        document.getElementById("results").innerHTML = "loose";
        document.getElementById("compchoice").innerHTML = compvalue;
       document.getElementById("userchoice").innerHTML = selectedvalue;
    }
}