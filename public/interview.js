//reverse String
const reverStr = (str) => {
    const strToArray = [...str]
    return strToArray.reduce((acc, i) => i + acc, '')
}

console.log(reverStr('Hello'))

//is perfectSquare number
const isPerfectSquare = (num) => {
    for (let i = 1; i * i <= num; i++) {
        if (i * i === num) {
            return true
            break;
        }
    }
    return false
}
console.log(isPerfectSquare(4))

// merge Interval
const mergeInterval = (...args) => (interval) => {
    let newIntervalList = [...args]
    let result = []
    for (let i = 0; i < args.length; i++) {
        if (args[i][0] > interval[0]) {
            newIntervalList.splice(i, 0, interval);
        }
    }
    for (let i = 0; i < newIntervalList.length; i++) {
        if (result.length === 0 || result[result.length - 1][1] < newIntervalList[i][0]) {
            result.push(newIntervalList[i])
        } else {
            let newEndOfInterval = Math.max(result[result.length - 1][1], newIntervalList[i][1])
            result[result.length - 1] = [result[result.length - 1][0], newEndOfInterval]
        }
    }
    return result
}

console.log(mergeInterval([1, 2], [3, 5], [6, 7], [8, 10], [12, 16])([4, 9]))

//is in grid 
const isInGrid = (grid) => (str = '') => {
    const strToArray = [...str]
    const flatGrid = grid.reduce((acc,row)=> [...acc,...row],[]);
    const table = {}
    flatGrid.forEach((word) => {
        if(table[word] === undefined){
          table[word] = 1
        }else {
           table[word] = table[word] + 1
        }
    })
    strToArray.forEach((word) => {
        table[word] = table[word] - 1
    })
    return strToArray.every((word) => table[word] >= 0)
}

console.log(isInGrid( [
        ['A', 'B', 'C', 'E'],
        ['S', 'F', 'C', 'S'],
        ['A', 'D', 'E', 'E']
])('ABCB'))

console.log(isInGrid('ABCB'))

// add two number
const addTwoNumber = (x, y) => {
    while (y != 0) {

        let carry = x & y;
        x = x ^ y;
        y = carry << 1;
    }
    return x;
}

console.log(addTwoNumber(2, 3))