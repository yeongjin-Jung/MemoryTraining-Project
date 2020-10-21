var array1 = ['one', 'two'];
var array2 = ['three', 'four'];
var array3 = ['five', 'six'];

var combined = [array1[0], array1[1], array2[0], array2[1]];
console.log(combined);

var combined = array1.concat(array2, array3);
console.log(combined);

var combined = [].concat(array1, array2, array3);
console.log(combined);

var first = array1[0];
console.log('first : ', first);

var second = array2[1];
console.log('second : ', second);

var three = array1[2] || 'empty'; // 추출할 배열 요소가 없을 때, 기본값을 지정할 수 있다.
console.log('three : ', three);

function func() {
  var args = Array.prototype.slice.call(this, arguments);
  var first = args[0];
  var others = args.slice(1, args.length);
}
func('a', 'b', 'c');
