---
title: 'call apply bind改变this指向'
---

## call

作用：1. 调用函数 2. 修改this指向

如函数test()，使用test()和test.call()是一样的

改变this指向示例：

```js
function run(a,b) {
    console.log(this);
    console.log(a+b);
}
var o  = {
    name: 'zhangsan'
}
 
// run.call(o) // 改变this指向为o
run.call(o,1,2) // 3
```

## apply

作用：1. 调用函数 2. 修改this指向

apply主要作用是对数组求最大值，数组本身没有求最大值得方法，但是Math有，我们通过apply改变下指向为apply

> 和call的区别在于传参方面，apply第二个参数传的是数组

```js
var arr = [1,543,47,8,686,3]
var max = Math.max.apply(Math,arr) // 改变this指向为Math ,然后第二个参数需传入数组
```

## bind

> 与call和apply不同，直接调用bind不会调用函数

作用：1. 返回一个新函数 2. 修改this指向

```js
function run (a,b) {
    console.log(this);
    console.log(a + b);
}
let p = {
    name: 'zhangsan'
}
let f = run.bind(p) // 只是改变this指向，不会调用函数
f() //会返回一个新的函数，并以这样的形式调用函数
 
let f2 = run.bind(p,1,2)
f2()
```

