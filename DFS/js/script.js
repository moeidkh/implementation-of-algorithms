let $ = document;
let vertex = $.querySelector("#vertex");
let edge = $.querySelector("#edge");
let btnSubmit = $.querySelector("#btn");
let paragraph = $.querySelector(".res");
let arrayEdge , Vertex , firstV;
let adj = [];
let visited = [] , dfsString = [];

btnSubmit.addEventListener("click" , function(){
    Vertex = vertex.value.split(" ").map(Number)[0];
    firstV = vertex.value.split(" ").map(Number)[1];
    for(let i = 0; i < Vertex; i++){
        let row = []
        for(let j = 0; j < Vertex; j++){
            row.push(0);
        }
        adj.push(row)
    }
    for(let i = 0; i< Vertex; i++){
        visited.push(false);
    }
    arrayEdge = edge.value.split(" ").map(item => {
            return item.slice(1 ,-1).split(",").map(Number);
    })
    arrayEdge.forEach(element => {
        addEdge(element[0] , element[1] , adj);
    });
    DFS(0 , visited , adj);
    let result = dfsString.join(" ");
    let inner = paragraph.innerHTML
    paragraph.innerHTML = inner + result;
})
function addEdge(v,w ,adj){
        adj[v][w] = 1;
        adj[w][v] = 1;
}

function DFS( start , visited , adj){
    dfsString.push(start);
    visited[start] = true;
    for(let counter = 0; counter < adj[start].length; counter++){
        if(visited[start] == 1 && ( !visited[counter]) && adj[start][counter] == 1){
            DFS(counter , visited, adj);
        }
    }
    visited.forEach(function(item){
        if(!item){
            DFS(visited.indexOf(item) , visited , adj)
        }
    })
}