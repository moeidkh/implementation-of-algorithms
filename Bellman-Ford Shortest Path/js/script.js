let $ = document;
let vertex = $.querySelector("#vertex");
let edge = $.querySelector("#edge");
let btnSubmit = $.querySelector("#btn");
let paragraph = $.querySelector("#res");
btnSubmit.addEventListener("click" , function(){
    arrayEdge = edge.value.split(" ").map(item => {
        return item.slice(1 ,-1).split(",").map(Number);
    })
    BellmanFord(arrayEdge , parseInt(vertex.value) , arrayEdge.length , 0);
})

function BellmanFord(graph , V , E , src){
    let dis = Array(V).fill(10**9);
    dis[src] = 0;
    for(let counter = 0; counter < V-1; counter++){
        for(let counter2 = 0; counter2< E; counter2++){
            if(dis[graph[counter2][0]] + graph[counter2][2] < dis[graph[counter2][1]]){
                dis[graph[counter2][1]] = dis[graph[counter2][0]]+ graph[counter2][2];
            }
        }
    }
    for(let counter = 0; counter < V; counter++){
        let x = graph[counter][0];
        let y = graph[counter][1];
        let weight = graph[counter][2];
        if((dis[x] != (10**9)) && (dis[x] + weight < dis[y])){    
            paragraph.innerHTML = "<br>" + "Graph contain negetive weight cycle";
        }
    }
    let inner = paragraph.innerHTML;
    paragraph.innerHTML = inner + "<br/>" + "Vertex Distance from Source: ";
    for(let counter = 0; counter < V ; counter++){
        inner = paragraph.innerHTML;
        paragraph.innerHTML = inner + "<p>" + counter + "   " +dis[counter] + "</p>";
    }
}