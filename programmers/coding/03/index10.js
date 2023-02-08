function solution(arr1, arr2) {
    var answer = [[],[]];

    if(arr1[0].length === 1) { 
        for(let i = 0; i<arr1.length; i++)

            answer[i][0] = arr1[i][0] + arr2[i][0]                  
        }
    else{
    for(let i = 0; i<arr1[0].length; i++) {
            for(let j = 0; j<arr1[i].length; j++) {
            answer[i][j] = arr1[i][j] + arr2[i][j]
        }
        
    }
    }
    return answer;
}


function solution(arr1, arr2) {
    var answer = [[],[]];
    for(let i = 0; i<arr1.length; i++) {
            for(let j = 0; j<arr1[0].length; j++) {
            answer[i][j] = arr1[i][j] + arr2[i][j]
        }
    }
    
    return answer;
}