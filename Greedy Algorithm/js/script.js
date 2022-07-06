let $ = document;
let input = $.querySelector("#Time");
let btnSubmit = $.querySelector("#btn");
let paragraph = $.querySelector(".res");
let jobs = $.querySelector(".jobs");
let array;
btnSubmit.addEventListener("click" , function(){
    array = input.value.split(" ").map((a)=>{
        return parseInt(a);
    });
    let array2 = array.slice();
    let result = job(array2);
    let perviousText = paragraph.innerHTML;
    paragraph.innerHTML = perviousText + result;
    array2.forEach(function(item){
        let index = array.indexOf(item);
        array[index]=''
        let inner = jobs.innerHTML;
        jobs.innerHTML = inner + "<br/>" + "jobs: "+ (index+1);
    })
})
function sum(array){
    let sum = 0;
    array.forEach(function(item){
        sum += parseFloat(item);
    })
    return sum;
}
function job(array){
    array.sort((a,b)=>{
        if(a>b){
            return 1;
        }
        else if(a<b){
            return -1;
        }
        else{
            return 0;
        }
    });
    let total = 0;
    for(let counter = 0; counter < array.length; counter++){
        total += sum(array.slice(0, counter+1));
    }
    return total;
}