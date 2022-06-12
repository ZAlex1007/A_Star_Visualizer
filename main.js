generateGraph()
drawGrid()
Astar()

function updateDimension(dimension){
    let inputValue = this.event.target.value
    inputValue = (inputValue >= 2) ? inputValue : 2
    this.event.target.value = inputValue    // the input value should be >=2
    if(dimension=='h') numberOfSquares=squaresPerRow*parseInt(inputValue)
    else  {
        numberOfSquares= Math.ceil(numberOfSquares/squaresPerRow)
        squaresPerRow=parseInt(inputValue)
        numberOfSquares*=squaresPerRow 
        
    }
    generateGraph()
    drawGrid()
    Astar()
}

function setTooltip(message, value){
    let tooltip = document.getElementById('tooltip')
    tooltip.innerText=message
    tooltip.style.display = "block"
    addOnClick=value
}

function clearWalls(){
    for(let i=0;i<numberOfSquares;i++) 
        grid[i]= [...copyGrid[i]]
    walls=[]
    rerun=true;
    drawGrid()
    Astar()
}


function changeAnimationTime(){
    delayTime=document.getElementById('time_inp').value
}

function setGameState(){    
    let btn = document.getElementById("gameStateBtn")
    let span = document.getElementById("gameStateText")


    paused = !paused
 

    if(rerun) {
        drawGrid();
        Astar();
        rerun=0;
    }

    animationQueue.forEach(anim => {if(paused) anim.pause(); else anim.resume()})
    
    if(!(span.innerText=="No path" || span.innerText=="Finished")){ 
        btn.innerText= paused ? 'Start' : 'Pause'
        span.innerText= paused ? 'Paused' : 'Running'
    }


    
}


document.addEventListener("mousemove", (e)=>{       // Tooltip follow cursor
    let tooltip=document.querySelector('#tooltip')

    tooltip.style.left =
    (e.pageX + tooltip.clientWidth + 10 < document.body.clientWidth)
        ? (e.pageX + 10 + "px")
        : (document.body.clientWidth + 5 - tooltip.clientWidth + "px");
    tooltip.style.top =
    (e.pageY + tooltip.clientHeight + 10 < document.body.clientHeight)
        ? (e.pageY + 10 + "px")
        : (document.body.clientHeight + 5 - tooltip.clientHeight + "px")
    
    
    
})

document.querySelector("#h_inp").value=numberOfSquares/squaresPerRow; 
document.querySelector("#w_inp").value=squaresPerRow;   
document.querySelector("#time_inp").value=delayTime;   


function save(){
    localStorage.setItem('startID', startID)
    localStorage.setItem('endID', endID)  
    localStorage.setItem('squaresPerRow', squaresPerRow)  
    localStorage.setItem('numberOfSquares', numberOfSquares)  
    localStorage.setItem('walls', JSON.stringify(walls)) 
    localStorage.setItem('grid', JSON.stringify(grid)) 
    localStorage.setItem('copyGrid', JSON.stringify(copyGrid)) 
}

function load(){
    if(localStorage.getItem('startID')==null) return
    walls = JSON.parse(localStorage.getItem('walls'))
    grid = JSON.parse(localStorage.getItem('grid'))
    copyGrid = JSON.parse(localStorage.getItem('copyGrid'))
    startID=localStorage.getItem('startID')
    endID=localStorage.getItem('endID')
    squaresPerRow=localStorage.getItem('squaresPerRow')
    numberOfSquares=localStorage.getItem('numberOfSquares')
  
    document.querySelector("#h_inp").value=numberOfSquares/squaresPerRow; 
    document.querySelector("#w_inp").value=squaresPerRow;   
    document.querySelector("#time_inp").value=delayTime;   

    
    paused = 0; setGameState(); rerun=1
    
    drawGrid()
}