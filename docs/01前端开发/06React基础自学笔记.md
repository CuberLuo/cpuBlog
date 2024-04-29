---
title: 'React基础自学笔记'
---



## React组件

- 函数式组件
- 类式组件

> 二者的使用都是将虚拟DOM转为真实DOM后渲染到页面上

### 函数式组件
函数式组件适合简单组件的定义

组件名必须大写（否则会被当成html自带的标签来解析）

**注意：函数式组件内部的this和普通函数不同（普通函数this指向window）**

底层逻辑：直接调用函数

```js
//1.创建函数式组件
function MyComponent(){
    console.log(this); //此处的this是undefined，因为babel编译后开启了严格模式
    return <h2>我是用函数定义的组件(适用于【简单组件】的定义)</h2>
}
//2.渲染组件到页面
ReactDOM.render(<MyComponent/>,document.getElementById('test'))
```

### 类式组件

类式组件适合复杂组件的定义

类式组件的类需要继承`React.Component`

MyCompont的原型对象上有render函数

底层实现逻辑：new一个类的实例对象，然后调用render方法（**此处的render是原型对象的方法，实例对象可以直接使用**）

```js
//1.创建类式组件
class MyComponent extends React.Component {
  render(){
    //render是放在哪里的？—— MyComponent的原型对象上，供实例使用。
    //render中的this是谁？—— MyComponent的实例对象 <=> MyComponent组件实例对象。
    console.log('render中的this:',this);
    return <h2>我是用类定义的组件(适用于【复杂组件】的定义)</h2>
  } 
}
//2.渲染组件到页面
ReactDOM.render(<MyComponent/>,document.getElementById('test'))
```

## React组件示例对象三大属性

- state
- props
- refs

> context也是组件示例对象的一个属性，也很重要

### state

#### 定义和更改state的普通写法

初始化状态需要在类内部传入一个构造器，这样就可以在render函数中使用this.state.isHot读取状态

```js
constructor(props){
    super(props)
    this.state = {isHot:false}
    //解决类成员函数在直接调用时的this指向为undefined的问题（构造器的this指向类的实例对象）
    //changeWeather是放在Weather的原型对象上的，虽然Weather的实例对象上没有changWeather但是顺着原型链可找到原型对象上的changeWeather
    this.changeWeather = this.changeWeather.bind(this)
}
```

注意：React中将`onclick`改写成了`onClick`，`onblur`改写成了`onBlur`等诸如此类的规则，还有要记得`class`被改写成了`className`

**React中绑定事件除了原生写法被改写，还有不用写双引号和函数的小括号!!!**

```js
render(){
	const {isHot,wind} = this.state
	return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}，{wind}</h1>
}
```

```js
changeWeather(){
  //由于changeWeather是作为onClick的回调，所以不是通过实例调用的，是直接调用
  //类中的方法默认开启了局部的严格模式，所以changeWeather中的this为undefined
  //获取原来的isHot值
  const isHot = this.state.isHot
  //严重注意：状态必须通过setState进行更新
  this.setState({isHot:!isHot})

  //严重注意：状态(state)不可直接更改，下面这行就是直接更改！！！
  //this.state.isHot = !isHot //这是错误的写法
}
```

setState的更新是一种合并（即不会更改其他属性如wind），不是替换

> 每次点击都会调用changeWeather函数，点击n次则调用n次changeWeather函数，render函数调用1+n次（初始化一次，每次点击重新渲染n次），constructor函数只在创建实例对象时调用一次

#### 类方法的this指向

```js
class Person {
  constructor(name,age){
    this.name = name
    this.age = age
  }
  study(){
    //study方法放在类的原型对象上，供实例使用
    //通过Person实例调用study时，study中的this就是Person实例
    //直接调用
    console.log(this);
  }
}

const p1 = new Person('tom',18)
p1.study() //通过实例调用
const x = p1.study
x() //直接调用
```

类的成员函数中的this，谁调用的就指向谁。通过实例调用就指向实例，直接调用指向undefined（因为类方法中默认局部开启严格模式，若只是普通的函数非类成员函数则指向window）

#### 简写（开发时的最常用的写法）

```js
class Weather extends React.Component{
  //初始化状态
  //在类中直接写这样的赋值语句相当于在类的实例对象上添加state属性
  state = {isHot:false,wind:'微风'}

  render(){
    const {isHot,wind} = this.state
    return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}，{wind}</h1>
  }

  //自定义方法————要用赋值语句的形式+箭头函数
  //changeWeather直接放在了实例对象上（可以直接调用啦，不用考虑this指向更改问题了）
  changeWeather = () => {
    //此处由于是箭头函数，this指向箭头函数外层的this，这里的外层this是Weather的实例对象
    const isHot = this.state.isHot
    this.setState({isHot:!isHot})
  }
}
```

### props

#### 传入props的两种方法

```js
//方法1(分开传)
ReactDOM.render(<Person name="jerry" age={19}  sex="男"/>,document.getElementById('test1'))
//方法2(一起传)
const p = {name:'老刘',age:18,sex:'女'}
ReactDOM.render(<Person {...p}/>,document.getElementById('test3'))
```

#### props的接收和类型限制

```js
//创建组件
class Person extends React.Component{
  render(){
    // console.log(this);
    const {name,age,sex} = this.props
    //props是只读的,不能对props的属性值进行修改
    return (
      <ul>
        <li>姓名：{name}</li>
        <li>性别：{sex}</li>
        <li>年龄：{age+1}</li>
      </ul>
    )
  }
}
//对标签属性进行类型、必要性的限制
Person.propTypes = {
  name:PropTypes.string.isRequired, //限制name必传，且为字符串
  sex:PropTypes.string,//限制sex为字符串
  age:PropTypes.number,//限制age为数值
  speak:PropTypes.func,//限制speak为函数
}
//指定默认标签属性值
Person.defaultProps = {
  sex:'男',//sex默认值为男
  age:18 //age默认值为18
}
```

#### 函数式组件接收参数

函数式组件可以有props，但无法使用state和refs（新版本hooks比较特殊，貌似有解决方案）

```js
function Person (props){
  const {name,age,sex} = props
  return (
      <ul>
        <li>姓名：{name}</li>
        <li>性别：{sex}</li>
        <li>年龄：{age}</li>
      </ul>
    )
}
```

#### 展开运算符

> 提示：reduce的语法规则如下（initialValue默认值为0），类似于循环遍历的操作
>
> array.reduce((prev, cur, index, arr)=> {/***/}, initialValue)

```js
//用法1：在函数中使用
const sum = (...numbers) => {
    //此处在函数参数中使用展开运算符，参数传入时是数组
    console.log(numbers)//[1,3,5,7,9]
    //数组求和
	return numbers.reduce((preValue,currentValue)=>preValue+currentValue)
}

console.log(sum(1,3,5,7,9))

//用法2：构造字面量对象时使用展开语法
let person = {name:'tom',age:18}
let person2 = {...person}
person.name = 'jerry'
console.log(person2);//{name:'tom',age:18}
console.log(person);//{name:'jerry',age:18}

//用法3：合并
let person3 = {...person,name:'jack',address:"地球"}
console.log(person3);//{name:'jerry',age:18,address:'地球'}
```

#### 浅拷贝和深拷贝

注意：直接赋值不属于浅拷贝（更不属于深拷贝），因为直接赋值只是将指向堆内存中的指针赋值给了另一个变量，并没有在堆内存中创建新对象

> 浅拷贝（只复制对象的第一层属性）

- Object.assign(targetObj, ...sourceObj)

```js
const clonedObj = Object.assign({}, originalObj);
```

- **展开语法**

```js
const clonedObj = { ...originalObj };
```

> 深拷贝

- 递归复制（编写递归函数，代码略）
- **JSON序列化/反序列化**

```js
const clonedObj = JSON.parse(JSON.stringify(originalObj));
```

- lodash库的_.cloneDeep

```js
const clonedObj = _.cloneDeep(originalObj);
```

#### props的接收和限制的简写

```js
class Person extends React.Component{
  //对标签属性进行类型、必要性的限制
  static propTypes = {
   /***/
  }

  //指定默认标签属性值
  static defaultProps = {
    /***/
  }
  
  render(){
    /***/
  }
}
```



### refs

#### 字符串形式的ref(不推荐,存在效率问题)

```js
class Demo extends React.Component{
    showData = ()=>{
        const {input1} = this.refs
        alert(input1.value)
    }
    render(){
        return(
            <div>
            	<input ref="input1" type="text"/>&nbsp;
            	<button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
			</div>
		)
	}
}
```

#### 回调形式的ref

```js
class Demo extends React.Component{
    showData = ()=>{
        const {input1} = this
        alert(input1.value)
    }
    render(){
        return(
            <div>
            	<input ref={currentNode => this.input1 = currentNode} type="text"/>&nbsp;
            	<button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
			</div>
		)
	}
}
```

#### ref回调执行次数的问题

> 内联方式更推荐，因为被调用两次这个问题不影响实际开发

```jsx
{/*ref回调函数（以内联方式定义，在更新过程中会被调用两次，第一次传参数null，第二次传参数dom元素）*/}
<input ref={currentNode => this.input1 = currentNode} type="text"/>
```

```jsx
{
    /*
    ref回调函数（以class的绑定函数方式定义，在更新过程中只会被调用一次）
    render函数外定义saveInput函数：
    saveInput = (c)=>{
    	this.input1 = c;
    }
    */
}
<input ref={this.saveInput} type="text"/>
```



## 自学日志

20240421 P26结束

20240429 P29结束
