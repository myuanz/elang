## 2020/11/06
### 确定待办事项
见 readme.md 

### 调研解释器之使用
比较火热的有: antlr4, peg.js, nearley.  

antlr4 提供了大量语言的示例, 看起来不错, 但这是 Java 写的, 并且其 JavaScript 版本看起来有点烂. 
Nearley 也不错, 但是都 2.19 了提交量比 peg.js 的 0.1 还少. 而且其书写比 peg.js 繁复很多, 最终还是 peg.js 吧. 

### 编译 llvm
Windows 上官方不提供完整的预编译包, 只得自己编译了, 选择了最新版本 llvm11.0.0, 大约花了1h, 出来了 3.5G 的文件.

## 2020/11/07
考虑到到 llvmir 的难度, 接下来可能会先编译到 JavaScript.  

### 入门 peg.js
看了
- CSS解析器
- 四则运算解析器
- 简单版JSON解析器

### 完成解析器
完成了
- 程序集头解析
- 变量解析

## 11/08
昨日遇到了一个可能的无限循环, 这里列举一下所有的参考资料: 
- 官方文档 https://pegjs.org/documentation
- CSS解析器 https://zhuanlan.zhihu.com/p/23152218
- SQL Select解析器 https://www.codercto.com/a/38880.html
- 简单json解析器 https://www.codercto.com/a/45502.html
- peg 递归解析数据 https://nathanpointer.com/blog/introToPeg/

### 无限循环之解决
原因是使用了一个零次匹配的换行符, 不过报错并不是在这上面, 而是直接提示了此处可能有无限循环

### 表达式? 语句?
我不打算区分二者, 我觉得可以允许
```
var t = if (a) {
    var b = 2
} // t == 2
```
不过给循环一个值感觉实现有些麻烦, 可以固定为
```
var t = while (a) {
    // ...
} // t == null
```
或者强行
```
var t = while (a) {
    break(42)
} // t == 42

```
TODO: 未来可以加一个语法糖, 对于单参数调用, 可以直接省略括号.
TODO: 参考其他不区分表达式和语句的语言的实现. 

### 初步完成程序集里的大部分解析
完成了流程控制的如果和其他语句分析.

## 新的开发流程
当前已经有些难以debug了, 原生的调试方案无法撑起来了. 
TODO: 
- 分结构, 分用途写语法文件, 之后程序自动合并文件并测试
- 重新规划相关的输出结构

## 11/09

### 完成了import语句
### 完成了基础的测试框架
### 纠结于无限循环问题
这个问题之前用小手段规避过一次, 但是后面每一次新增东西都可能会对这个结构造成影响. 

我应该想想一劳永逸的正确解法
```
Line 21, column 15: Possible infinite loop when parsing (left recursion: 表达式 -> 单行表达式 -> 取数组表达式 -> 单行非取数组表达式 -> 二元表达式 -> 单行表达式).
```

找了一个使用peg.js解析Java的, 感觉有点头绪了. 最初直觉上觉得应该是和这个有关的:
```
& expression
Try to match the expression. If the match succeeds, just return undefined and do not consume any input, otherwise consider the match failed.

! expression
Try to match the expression. If the match does not succeed, just return undefined and do not consume any input, otherwise consider the match failed.
```
但是这个描述太费解了噫.
---
不太对劲.

界定符号可以清除无限循环, 但是不总是有清晰的界定符号的.

## 11/10
那个 JAVA 的解析器, 大概是用一层层向下的方式避开无限循环的, 基本都是
```
A = left:B right:(界定符 B)*
B = left:C right:(界定符 C)*
```
也有
```
D = left:D' 界定符 right:D / D'
```
一个元素除非两侧都有界定符才能循环使用, 界定符可以是行尾, 也可以是两个其他固定符号.



查了更多资料, 这是左递归问题, 传统的LL(1)文法也需要消除左递归. 
