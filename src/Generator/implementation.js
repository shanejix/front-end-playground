// function* test() {
//   let a = 1 + 2;
//   yield 2;
//   yield 3;
// }
// let b = test();
// console.log(b.next()); // >  { value: 2, done: false }
// console.log(b.next()); // >  { value: 3, done: false }
// console.log(b.next()); // >  { value: undefined, done: true }



//generator 表示 * ;cb 表示 test()

//test（）执行后拥有next()函数,说明generator内部返回一个对象

function generator(cb) {

  //返回一个立即执行函数
  return (() => {
    let object = {
      next: 0,
      stop: () => { }
    }

    //返回一个带有next()函数的对象
    return {
      next: () => {
        var ret = cb(object);

        if (ret === undefined) {
          return { value: undefined, done: true };
        }

        return {
          value: ret,
          done: false
        };
      }
    }
  })()
}
