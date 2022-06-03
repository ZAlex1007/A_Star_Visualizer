// 1. Create an open list and a closed list that are both empty. Put the start node in the open list.
// 2. Loop this until the goal is found or the open list is empty:
//       a. Find the node with the lowest F cost in the open list and place it in the closed list.
//       b. Expand this node and for the adjacent nodes to this node:
//             i. If they are on the closed list, ignore.
//             ii. If not on the open list, add to open list, store the current node as the parent for this adjacent node, and calculate the
                        //  F,G, H costs of the adjacent node.
//             iii. If on the open list, compare the G costs of this path to the node and the old path to the node. If the G cost of using the
                // current node to get to the node is the lower cost, change the parent node of the adjacent node to the current node.
                // Recalculate F,G,H costs of the node.
// 3. If open list is empty, fail.

// https://cs.stanford.edu/people/eroberts/courses/soco/projects/2003-04/intelligent-search/astar.html


// Note: The cost for every edge is 1 => we can ignore the G in calculation of F

/// Y down
/// X right
function calculateHeuristic(nodeID, endID){
    return Math.abs(Math.floor(endID/squaresPerRow)-Math.floor(nodeID/squaresPerRow)) + Math.abs(endID%squaresPerRow-nodeID%squaresPerRow)
}




let paths=[]  


function Astar(){
    let id = window.setTimeout(function() {}, 0);

    while (id--) {
        window.clearTimeout(id); // will do nothing if no timeout with id is present
    }


    let openList=[]
    let closed=[]
    paths=[]       
    // startID and endID are in drawCanvas
    openList.push(startID)


    let goal=false;
    let delayMultiplier=0;
    let delayTime = 50
    while(goal == false && openList.length!=0){
        let minCostNodeID=openList[0];
        openList.forEach(nodeID => {
            if(calculateHeuristic(nodeID)<calculateHeuristic(minCostNodeID)) minCostNodeID=nodeID;
        });

        openList=openList.filter(e=> e!=minCostNodeID)      // Remove from open list
        closed.push(minCostNodeID)

        const path=paths.filter(e=>e[e.length-1]==minCostNodeID)

        grid[minCostNodeID].forEach((value, nodeID) => {

            if(value==0 || goal || closed.includes(nodeID)) return;

            let localPath
            if(path[0]==undefined) {
                localPath=[minCostNodeID]            
            } else localPath =[...path[0]]      // Duplicate an array

            if(!openList.includes(nodeID)){
                openList.push(nodeID);
                localPath.push(nodeID)
                paths.push(localPath);
                
                // Render the square and seen
                setTimeout(()=>{renderCheckedNode(nodeID)}, delayMultiplier*delayTime)
                delayMultiplier++;
                if(nodeID==endID) goal=true
            } else {
                let oldPath=paths.filter(e=>e[e.length-1]==nodeID)[0]
                if(oldPath.length>path[0].length+1){
                    paths = paths.filter(e=>e[e.length-1]!=nodeID)  // remove old path
                    let pathCopy = [...path[0]]
                    pathCopy.push(nodeID)
                    paths.push(pathCopy)    // insert new path
                    // Render the path
                }
            }
        })
    }
    let finalPath = paths.filter(e=>e[e.length-1]==endID)[0]
    // console.log("Final path: ", finalPath)
    setTimeout(()=>{renderFinalPath(finalPath)}, delayMultiplier*delayTime)
    
}


