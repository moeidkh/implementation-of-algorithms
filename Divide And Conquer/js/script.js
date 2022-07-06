let $ = document;
let rowA1 = $.querySelector("#rowA1");
let rowA2 = $.querySelector("#rowA2");
let rowA3 = $.querySelector("#rowA3");
let rowA4 = $.querySelector("#rowA4");
let rowB1 = $.querySelector("#rowB1");
let rowB2 = $.querySelector("#rowB2");
let rowB3 = $.querySelector("#rowB3");
let rowB4 = $.querySelector("#rowB4");
let btnSubmit = $.querySelector("#btn");
let paragraph = $.querySelector(".res");
let matrixA = [] , matrixB =[];
let arrayRowA1,  arrayRowA2, arrayRowA3, arrayRowA4, arrayRowB1,  arrayRowB2, arrayRowB3, arrayRowB4;
function toArrayItem(input){
    let array = [];
    array = input.value.split(" ").map((a)=>{
        return parseInt(a);
    });
    return array
}
btnSubmit.addEventListener("click" , function(){
    arrayRowA1 = toArrayItem(rowA1);
    arrayRowA2 = toArrayItem(rowA2);
    arrayRowA3 = toArrayItem(rowA3);
    arrayRowA4 = toArrayItem(rowA4);
    arrayRowB1 = toArrayItem(rowB1);
    arrayRowB2 = toArrayItem(rowB2);
    arrayRowB3 = toArrayItem(rowB3);
    arrayRowB4 = toArrayItem(rowB4);
    matrixA.push(arrayRowA1, arrayRowA2 , arrayRowA3 ,arrayRowA4);
    matrixB.push(arrayRowB1 ,arrayRowB2 ,arrayRowB3 ,arrayRowB4);
    let mat = strassen(matrixA , matrixB);
    let result = printMatrix(mat[0], mat[1],mat[2],mat[3]);
    result.forEach(function(item){
        let temp = item.join(" ");
        let inner = paragraph.innerHTML;
        paragraph.innerHTML = inner + "<br/>" + temp;
    })
})

function subMatrix(matrix){
    if(matrix.length == 1){
        return matrix;
    }
    let matrixLength = matrix.length;
    let returnedArray = [];
    let rowAndCol = Math.floor(matrixLength/2);
    let section1 = matrix.slice().slice(0 , rowAndCol).map(i => i.slice(0 , rowAndCol));
    let section2 = matrix.slice().slice(0 , rowAndCol).map(i => i.slice(rowAndCol , matrixLength));
    let section3 = matrix.slice().slice(rowAndCol , matrixLength).map(i => i.slice(0 , rowAndCol));
    let section4 = matrix.slice().slice(rowAndCol , matrixLength).map(i => i.slice(rowAndCol , matrixLength));
    returnedArray.push(section1 , section2 , section3 , section4);
    return returnedArray;
}
function sumMatrix(matrixA , matrixB){
    if(matrixA.length == 1){
        let temp = []
        temp.push(parseFloat(matrixA[0])+parseFloat(matrixB[0]));
        return temp;
    }
    let sumMatrixes = [];
    let lengthOfMatrix = matrixA.length;
    let lengthOfRowMatrix = matrixA[0].length;
    for(let rowCounter = 0; rowCounter < lengthOfMatrix; rowCounter++){
        let row = [];
        for(let columnCounter = 0; columnCounter < lengthOfRowMatrix; columnCounter++){
            row.push(matrixA[rowCounter][columnCounter] + matrixB[rowCounter][columnCounter]);
        }
        sumMatrixes.push(row);
    }
    return sumMatrixes;
}
function minusMatrix(matrixA , matrixB){
    if(matrixA.length == 1){
        let temp = []
        temp.push(parseFloat(matrixA[0])-parseFloat(matrixB[0]));
        return temp;
    }
    let minusMatrixes = [];
    let lengthOfMatrix = matrixA.length;
    let lengthOfRowMatrix = matrixA[0].length;
    for(let rowCounter = 0; rowCounter < lengthOfMatrix; rowCounter++){
        let row = [];
        for(let columnCounter = 0; columnCounter < lengthOfRowMatrix; columnCounter++){
            row.push(matrixA[rowCounter][columnCounter] - matrixB[rowCounter][columnCounter]);
        }
        minusMatrixes.push(row);
    }
    return minusMatrixes;
}
function strassen(matrixA , matrixB){
    if(matrixA.length == 1){
        let temp = [];
        temp.push(matrixA[0]*matrixB[0]);
        return temp;
    }
    let subMatrixA = subMatrix(matrixA.slice()); 
    let subMatrixB = subMatrix(matrixB.slice()); 
    let A11 = subMatrixA[0];
    let A12 = subMatrixA[1];
    let A21 = subMatrixA[2];
    let A22 = subMatrixA[3];
    let B11 = subMatrixB[0];
    let B12 = subMatrixB[1];
    let B21 = subMatrixB[2];
    let B22 = subMatrixB[3];
    let P1  = strassen(sumMatrix(A11, A22) , sumMatrix(B11 , B22));
    let P2  = strassen(sumMatrix(A21,A22) , B11);
    let P3 = strassen(A11, minusMatrix(B12 , B22));
    let P4  = strassen(A22 , minusMatrix(B21, B11));
    let P5 = strassen(sumMatrix(A11,A12) , B22);                                                                                     
    let P6  = strassen(minusMatrix(A21 , A11) , sumMatrix(B11, B12));
    let P7  = strassen(minusMatrix(A12 , A22) , sumMatrix(B21 , B22));
    let C11 = sumMatrix(minusMatrix(sumMatrix(P1, P4), P5),P7)
    let C12 = sumMatrix(P3 , P5);
    let C21 = sumMatrix(P2 , P4);
    let C22 = sumMatrix(minusMatrix(sumMatrix(P1,P3),P2),P6);
    let resultMatrix = []
    resultMatrix.push(C11, C12, C21, C22)
    return resultMatrix;
}
function printMatrix(c11 , c12, c21 , c22){
    let matrix = [];
    for(let rowCounter = 0; rowCounter < 3; rowCounter+=2){
        let row = []
        row.push(c11[rowCounter][0],c11[rowCounter+1][0], c12[rowCounter][0], c12[rowCounter+1][0]);
        matrix.push(row);
    }
    for(let rowCounter = 0; rowCounter < 3; rowCounter+=2){
        let row = []
        row.push(c21[rowCounter][0],c21[rowCounter+1][0], c22[rowCounter][0], c22[rowCounter+1][0]);
        matrix.push(row);
    }
    return matrix;
}