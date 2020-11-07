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

