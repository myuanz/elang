## 2020/11/06
### 确定待办事项
见 readme.md 

### 调研解释器之使用
可选的有: antlr4, peg.js, nearley.  

这里面 peg.js 尚在 0.1, 官方不保证后续兼容, 不能选.   
nearley 和 antlr4 看起来都不错, 但是 antlr4 提供了大量语言的示例, 所以就 antlr4 了.

### 编译 llvm
Windows 上官方不提供完整的预编译包, 只得自己编译了, 选择了最新版本 llvm11.0.0, 大约花了1h, 出来了 3.5G 的文件.

## 2020/11/07
考虑到到 llvmir 的难度, 接下来可能会先编译到 JavaScript. 
### 入门 antlr4

