let l = console.log.bind();

function max(variable1 , variable2){
    return (variable1 > variable2) ? variable1 : variable2;
}
class Queue {
    constructor() {
      this.elements = {};
      this.head = 0;
      this.tail = 0;
    }
    enqueue(element) {
      this.elements[this.tail] = element;
      this.tail++;
    }
    dequeue() {
      const item = this.elements[this.head];
      delete this.elements[this.head];
      this.head++;
      return item;
    }
    peek() {
      return this.elements[this.head];
    }
    get length() {
      return this.tail - this.head;
    }
    get isEmpty() {
      return this.length === 0;
    }
}
class Item {
    constructor() {
        this.weigth = null;
        this.value = null;
    }
}
class Node {
    constructor() {
        this.level = null;
        this.profit = null;
        this.bound = null;
    }
}
function bound(node , number , weight , items){
    if(node.weight >= weight){
        return 0;
    }
    let profitBound = node.profit;
    let counter = node.level +1;
    let totalWeigth = node.weight;
    while( (counter < number) && (totalWeigth + items[counter][0] <= weight)){
        totalWeigth += items[counter][0];
        profitBound += items[counter][1];
        counter++;
    }
    if(counter < number){
        profitBound += (weight - totalWeigth)*items[counter][1]/items[counter][0];
    }
    return profitBound;
}
function knapSack(weigth , array , number){
    let queue = new Queue;
    let u = new Node;
    let v = new Node;
    u.level = -1;
    u.profit = u.weight = 0;
    queue.enqueue(u);

    let maxProfit = 0;
    while(!queue.isEmpty){
        u = queue.peek();
        queue.dequeue();
        

        if(u.level == -1){
            v.level = 0;
        }
        if(u.level == number-1){
            continue;
        }

        v.level = u.level + 1;
        v.weight = u.weight + array[v.level][0];
        v.profit = u.profit + array[v.level][1];

        if (v.weight <= weigth && v.profit > maxProfit){
            maxProfit = v.profit;
        }

        v.bound = bound(v, number, weigth, array);
        if (v.bound > maxProfit){
            queue.enqueue(v);
        }
        v.weight = u.weight;
        v.profit = u.profit;
        v.bound = bound(v, number, weigth, array);
        if (v.bound > maxProfit){
            queue.enqueue(v);
        }
    }
    
    return maxProfit;
}

let val=[60, 120, 100];
let wt=[10, 30, 20];
let arr = [];
for(let counter = 0; counter < val.length; counter++){
    arr.push([wt[counter] , val[counter]]);
};
arr.sort((a,b)=>{
    if((a[1] / a[0]) > (b[1] / b[0])){
        return 1;
    }
    else if((a[1] / a[0]) < (b[1] / b[0])){
        return -1;
    }
    return 0;
})
console.log(arr)
let W = 110;
let n = val.length;

console.log(knapSack(W , arr , n))
