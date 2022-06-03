const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const size=80;

canvas.width = size*squaresPerRow
canvas.height = size*lastRow

let startID=20;
let endID=23;                  

let addOnClick = 'wall'             // What to add on click on canvas (wall / end point / goal point)



function renderCheckedNode(nodeID){
    if(nodeID==endID || nodeID==startID) return
    ctx.beginPath();
    ctx.fillStyle = "#FFFFFF"; 
    ctx.rect((nodeID%squaresPerRow)*size, (Math.floor(nodeID/squaresPerRow))*size, size, size)
    ctx.fill();
    ctx.stroke();
}
function renderFinalPath(path){
    if(path==undefined) return
    for(let i=1; i<path.length-1;i++){
        ctx.beginPath();
        ctx.fillStyle = "#ff2e2e"; 
        ctx.rect((path[i]%squaresPerRow)*size, (Math.floor(path[i]/squaresPerRow))*size, size, size)
        ctx.fill();
        ctx.stroke();
    }
    
}

function drawGrid(){
    canvas.width = size*squaresPerRow
    canvas.height = size*lastRow
    for(let i=0;i<numberOfSquares;i++){
        ctx.beginPath();
        if(i==startID) ctx.fillStyle = "#36c3ff"; 
        else if(i==endID) ctx.fillStyle = "#9d00ff"
        else if(walls.includes(i)) ctx.fillStyle="#000000"
        else ctx.fillStyle = "#b0b0b0"; 
        
        ctx.strokeStyle = '#4a4a4a';
        ctx.lineWidth = 0.2;
        ctx.rect((i%squaresPerRow)*size, (Math.floor(i/squaresPerRow))*size, size, size)
        ctx.fill();
        ctx.stroke();
    }
}

canvas.addEventListener("click",(e)=>{
    // if(!paused) return;
    let column=Math.ceil(e.pageX/size)-1;
    let row=Math.ceil(e.pageY/size)-1
    // Remove all edges from node
    let nodeID = row*squaresPerRow+column
    if(nodeID==endID || nodeID==startID) {
        if((nodeID == endID && addOnClick=='start') ||(nodeID == startID && addOnClick=='end')) {let aux=startID; startID=endID; endID=aux; drawGrid(); Astar() }
        document.getElementById('tooltip').style.display='none'
        addOnClick='wall'
        return
    }

    // For start and end => set the new node id and add the edges for that node( in case it is a wall )
    if(addOnClick=='start') {
        startID=nodeID 
        addEdges(nodeID)
        walls=walls.filter(e => e!=nodeID)
    }
    else if(addOnClick=='end') {
        endID=nodeID; 
        addEdges(nodeID)
        walls=walls.filter(e => e!=nodeID)
    } else{
        removeEdges(nodeID)
        if(!walls.includes(nodeID)) walls.push(nodeID)
    }
    // Reset the addOnClick and hide tooltip
    document.getElementById('tooltip').style.display='none'
    addOnClick='wall'
    drawGrid()          // Redraw the grid
    Astar()             // Find the new path
});


canvas.addEventListener("contextmenu",(e)=>{
    e.preventDefault()
    // Reset the addOnClick and hide tooltip
    document.getElementById('tooltip').style.display='none'
    addOnClick='wall'
    // // if(!paused) return;
    let column=Math.ceil(e.pageX/size)-1;
    let row=Math.ceil(e.pageY/size)-1
    // Remove all edges from node
    let nodeID = row*squaresPerRow+column
    if(!walls.includes(nodeID)) return 
    addEdges(nodeID)
    walls=walls.filter(e => e!=nodeID)
    drawGrid()          // Redraw the grid
    Astar()             // Find the new path
});

