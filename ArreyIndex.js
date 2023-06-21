let ArrObj = [
  {
    name: "Ram",
    age: 25,
  },
  {
    name: "Raj",
    age: 30,
  },
  {
    name: "Rahul",
    age: 50,
  },
];

console.log(ArrObj);

// need to access object with age=50

const idx = ArrObj.findIndex(function (element) {
  return element.age === 50;
});

console.log("Printing the accesed object index : ", idx);
console.log("Fetched the object : ", ArrObj[idx]);

// using map() to get a straight array of age so that we can sum them using reduce()
const straightArr = ArrObj.map(function (element) {
  return element.age;
});
console.log(straightArr);

// applying reduce on straightArr to get sum
let sum = straightArr.reduce((accumulator, current) => {
  return accumulator + current;
}, 0); //0 is initialization value

console.log(sum);

let sum2 = ArrObj.reduce(function (accumulator, current) {
  return accumulator + current.age;
}, 0);

console.log("Sum using only reduce : ", sum2);

// another way using chaining the reduce to map
const sum3 = ArrObj.map(function (element) {
  return element.age;
}).reduce((accumulator, current) => {
  return accumulator + current;
}, 0); //0 is initialization value

console.log("Chained reduce and map : ", sum3);
