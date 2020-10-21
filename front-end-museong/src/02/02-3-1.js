var array1 = ['one', 'two'];
var array2 = ['three', 'four'];
var array3 = ['five', 'six'];

var combined = [...array1, ...array2];
// var combined = [array1[0], array1[1], array2[0], array2[1]];
console.log(combined);

const [first, second, third = 'empty', ...others] = array1;
console.log('first: ', first);
console.log('second: ', second);
console.log('third: ', third);
console.log('others: ', others);
