// Generate the grid

let grid = [];
let copyGrid=[]                 // This copy grid will be used when we need to add the edges of a specific node
let walls=[]
let numberOfSquares=88;
let squaresPerRow=8;


let lastRow=numberOfSquares/squaresPerRow;

function generateGraph(){
    grid=[]
    copyGrid=[]
    let row=1;
    lastRow=numberOfSquares/squaresPerRow;
    for(let i=0;i<numberOfSquares;i++)
        grid[i]= Array(numberOfSquares).fill(0)


    // Sample grid 
    // 0 1 2 
    // 3 4 5
    // Create the grid edges
    for(let i=0;i<numberOfSquares-1;i++){       // numberOfSquares - 1 bcs. on last elem we don't need to add any extra edge
        if(row==lastRow) {                       // For elem in last row - horizontal edge and diagonal to upper row (ex 3-4; 3-1)
            grid[i][i+1]=1;
            grid[i+1][i]=1; 
            grid[i][i+1-squaresPerRow]=1
            grid[i+1-squaresPerRow][i]=1
            
        } else if((i+1)%squaresPerRow==0){       // For last elem in each row - vertical edge  (ex 2-5)
            grid[i][i+squaresPerRow]=1;
            grid[i+squaresPerRow][i]=1;
            row++;
        } else {                                // For the rest of elem - all edges (ex 0-1; 0-4; 0-3)
            // console.log(i)
            grid[i][i+1]=1;
            grid[i+1][i]=1; 
            grid[i][i+squaresPerRow]=1;
            grid[i+squaresPerRow][i]=1;
            grid[i][i+1+squaresPerRow]=1
            grid[i+1+squaresPerRow][i]=1
            if(row != 1){                     // Don' t add a diagonal edge to upper row in first row
                grid[i][i+1-squaresPerRow]=1
                grid[i+1-squaresPerRow][i]=1
            }

        }
    }


    for(let i=0;i<numberOfSquares;i++) 
        copyGrid[i]= [...grid[i]]


    walls = walls.filter(nodeID=> nodeID<numberOfSquares)
    if(startID>numberOfSquares) startID=0;
    if(endID>numberOfSquares) endID=numberOfSquares-1;
    walls.forEach(nodeID => removeEdges(nodeID))
}


function removeEdges(nodeID){
    for(let i=0;i<numberOfSquares;i++){
        grid[nodeID][i]=0
        grid[i][nodeID]=0
    }
}

function addEdges(nodeID){
    grid[nodeID] = [...copyGrid[nodeID]]
    for(let i=0;i<numberOfSquares;i++)
        if(!walls.includes(i)) grid[i][nodeID]=copyGrid[i][nodeID]
        else grid[nodeID][i]=0
    
}
