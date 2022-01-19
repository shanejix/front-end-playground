let Promise = require('./promise');

let promise1 = new Promise((resolve, reject) => {

  // write your code here

  setTimeout(() => {
    resolve('foo');
  }, 300);

}/* executor */);

promise1.then((value) => {
  console.log(value); // expected output: "foo"
});

console.log(promise1); // expected output: [object Promise]