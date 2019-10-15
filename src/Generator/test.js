

//1.0 生成器generator

{
  // 定义生成器函数
  function* g() {
    yield 'a';
    yield 'b';
    yield 'c';
    return 'ending';
  }
  // 返回Generator对象
  console.log(g()); // g {<suspended>}
  console.log(g().toString()); // [object Generator]
}


//2.0 断言

{

  function* g() {
    yield 'a';//next
    yield 'b';//next
    yield 'c';//next
    return 'ending';//next
  }

  var gen = g()
  console.log(gen.next()) // {value: "a", done: false}
  console.log(gen.next()) // {value: "b", done: false}
  console.log(gen.next()) // {value: "c", done: false}
  console.log(gen.next()) // {value: "ending", done: true}

  //递归执行所有步骤
  function next() {
    let { value, done } = gen.next()
    console.log(value) // 依次打印输出 a b c end
    if (!done) next() // 直到全部完成
  }
  next()

}

//3.0 next() 传值

{
  function* say() {
    let a = yield '1'
    console.log(a)
    let b = yield '2'
    console.log(b)
  }

  let it = say() // 返回迭代器

  // 输出 { value: '1', done: false }
  // a的值并非该返回值，而是下次next参数
  console.log(it.next())
  // 输出'我是被传进来的1'
  // 输出{ value: '2', done: false }
  console.log(it.next('我是被传进来的1'))

  // 输出'我是被传进来的2'
  // 输出{ value: undefined, done: true }
  console.log(it.next('我是被传进来的2'))
}

//4.0 结合promise

{
  // 使用Generator顺序执行两次异步操作
  function* r(num) {
    const r1 = yield compute(num);
    yield compute(r1);
  }

  // compute为异步操作，结合Promise使用可以轻松实现异步操作队列
  function compute(num) {
    return new Promise(resolve => {
      setTimeout(() => {
        const ret = num * num;
        console.log(ret); // 输出处理结果
        resolve(ret); // 操作成功
      }, 1000);
    });
  }

  // 不使用递归函数调用
  let it = r(2);
  it.next().value.then(num => it.next(num));

  // 修改为可处理Promise的next
  function next(data) {
    let { value, done } = it.next(data); // 启动
    if (!done) {
      value.then(num => {
        next(num);
      });
    }
  }

  next();
}