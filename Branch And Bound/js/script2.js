let optX = []
let optP = [0];
function knapSack(array , profits , weights , bound , optX , curW = 0 , counter = 0){
    if(counter == array.length){
        let curP = 0;
        for(let index = 0; index< array.length; index++){
            curP += array[index] * profits[index];
        }
        if(curP >= optP[0]){
            optP[0] = curP;
            optX.slice() = array;
        }
    }
    else{
        let c;
        if(curW + weights[counter] <= bound){
            c = [0, 1];
        }
        else{
            c = [0];
        }
        c.forEach(function(item){
            array[counter] = item;
            knapSack(array , profits , weights , bound , [] , curW + weights[counter]*item , counter+1);
        })
    }
    return optX;
}
let W = 50;

let val=[60, 120, 100];
let wt=[10, 30, 20];
let temp = [];
for(let counter2 = 0 ; counter2 < val.length; counter2++){
    temp.push([0]);
}
console.log(knapSack(temp , val, wt , W , optX))