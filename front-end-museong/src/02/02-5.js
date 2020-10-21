var addAndMultiple = (first, second) => ({
  add: first + second,
  multiply: first * second,
});

console.log('addAndMultiple : ', addAndMultiple);

console.log(addAndMultiple(1, 9));

// function addNumber(num) {
//   return function (value) {
//     return num + value;
//   };
// }

var addNumber = (num) => (value) => num + value;

console.log('addNumber(5) : ', addNumber(5)(10));

class MyClass {
  value = 10;
  constructor() {
    var addThis2 = function (first, second) {
      return this.value + first + second;
    }.bind(this);

    var addThis3 = (first, second) => this.value + first + second;
  }
}
