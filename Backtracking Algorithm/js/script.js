let $ = document;
let Weigth = $.querySelector("#Weight");
let weightOfItems = $.querySelector("#wt");
let profit = $.querySelector("#profit")
let btnSubmit = $.querySelector("#btn");
let paragraph = $.querySelector(".res");
let arrayWeightOfItems , arrayProfit ,inner;
let test = []

btnSubmit.addEventListener("click" , function(){
    arrayWeightOfItems = toArrayItem(weightOfItems);
    arrayProfit = toArrayItem(profit);
    let arr = [];
    for(let counter = 0; counter < arrayProfit.length; counter++){
        arr.push([arrayWeightOfItems[counter] , arrayProfit[counter]]);
    };
    arr.sort((a,b)=>{
        if(a[0] > b[0]){
            return 1;
        }
        else if(a[0] < b[0]){
            return -1;
        }
        return 0;
    })
    let n = arrayProfit.length;
    let totalCost = knapSack(Weigth.value, arr, n);
    let sumCost = 0;
    test.forEach(function (item){
    	sumCost += item
    	if(sumCost <= totalCost){
    		let  index = arrayProfit.indexOf(item);
            inner = paragraph.innerHTML;
            paragraph.innerHTML = inner + " <br/>" + "Object Number " + (index+1) + " :" + arrayWeightOfItems[index];
    	}
    })
    inner = paragraph.innerHTML;
    paragraph.innerHTML = inner + "<br/>" + "The Sum Of  const of items is : "+ totalCost;
})

function toArrayItem(input){
    let array = [];
    array = input.value.split(" ").map((a)=>{
        return parseInt(a);
    });
    return array
}

function max(variable1,variable2)
	{
		return (variable1 > variable2) ? variable1 : variable2;
}

function knapSack(weigth , array , number){
    if(number == 0 || weigth == 0){
        return 0;
    }
    if(array[number - 1][0] > weigth){
        return knapSack(weigth , array , number - 1);
    }
    else{
        let temp = max(array[number-1][1]+knapSack(weigth-array[number-1][0], array , number-1) , knapSack(weigth , array , number - 1));
        test.push(temp)
        return temp;
    }
}