generateGraph()
drawGrid()
Astar()

function updateDimension(dimension){
    // this.event.target.value
    if(dimension=='h') numberOfSquares=squaresPerRow*parseInt(this.event.target.value)
    else  {
        // console.log(this.event.target.value)
        numberOfSquares= Math.ceil(numberOfSquares/squaresPerRow)
        squaresPerRow=parseInt(this.event.target.value)
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
    drawGrid()
    Astar()
  
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


