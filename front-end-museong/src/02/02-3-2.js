var objectOne = { one: 1, two: 2, other: 0 };
var objectTwo = { three: 3, four: 4, other: -1 };

// var combined = {
//   one: objectOne.one,
//   two: objectOne.two,
//   three: objectTwo.three,
//   four: objectTwo.four,
// };
var combined = {
  ...objectOne,
  ...objectTwo,
};
console.log('combined : ', combined);

// var combined = Object.assign({}, objectOne, objectTwo);
var combined = {
  ...objectOne,
  ...objectTwo,
};
console.log('combined : ', combined);

// var combined = Object.assign({ key: 'value' }, objectTwo, objectOne);
var combined = {
  ...objectTwo,
  ...objectOne,
};
console.log('combined : ', combined);

var others = Object.assign({}, combined);
delete others.other;
console.log('others :', others);
