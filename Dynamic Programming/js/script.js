// // Longest Common Subsequence => lcs
let $ = document;
let input1 = $.querySelector("#str1");
let input2 = $.querySelector("#str2");
let btnSubmit = $.querySelector("#btn");
let res = $.querySelector(".res");
let string1 , string2;
btnSubmit.addEventListener("click" , function(){
    string1 = input1.value;
    string2 = input2.value;
    let length1 = string1.length;
    let length2 = string2.length;
    let result = lcs(string1 , string2, length1 , length2);
    let inner = res.innerHTML;
    res.innerHTML = inner + "&nbsp;&nbsp;&nbsp;" + result
})

function max(variable1 , variable2){
    return (variable1 > variable2) ? variable1 : variable2;
}
function lcs(string1 , string2 , lengthOfString1 , lengthOfString2){
    let lcsTable = [];
    for(let counter = 0; counter < lengthOfString1+1; counter++){
                let row = []
                for(let counter2 = 0; counter2 < lengthOfString2+1; counter2++){
                    row.push(0);
                }
                lcsTable.push(row);
            }
    for(let string1Counter = 0; string1Counter <= lengthOfString1; string1Counter++){
        for(let string2Counter = 0; string2Counter <= lengthOfString2; string2Counter++){
            if(string1Counter == 0 || string2Counter == 0){
                lcsTable[string1Counter][string2Counter] = 0;
            }
            else if(string1[string1Counter-1] == string2[string2Counter-1]){
                lcsTable[string1Counter][string2Counter] = lcsTable[string1Counter-1][string2Counter-1] + 1;
            }
            else{
                lcsTable[string1Counter][string2Counter] = max(lcsTable[string1Counter-1][string2Counter] , lcsTable[string1Counter][string2Counter-1])
            }
        }
    }
    let index = lcsTable[lengthOfString1][lengthOfString2];
    let lcs_algorithm = new Array(index+1)
    lcs_algorithm[index] = "";
    let counter1 = lengthOfString1;
    let counter2 = lengthOfString2;
    while(counter1 > 0 && counter2 > 0){
        if(string1[counter1-1] == string2[counter2-1]){
            lcs_algorithm[index-1] = string1[counter1 - 1];
            counter1--;
            counter2--;
            index--;
        }
        else if(lcsTable[counter1-1][counter2] > lcsTable[counter1][counter2-1]){
            counter1--;
        }
        else{
            counter2--;
        }
    }
    return lcs_algorithm.join("");
}
lcs("ACADB" , "CBDA" , 5, 4)
let st1 = " hi moeid who";
let st2 = "hello moeid what";
let l1 = st1.length;
let l2 = st2.length;
lcs(st1 , st2 , l1 , l2)