# elang 

## 简述
本项目用于制作一个对[易语言 5.9](http://eyuyan.com/)兼容的语言 elang, 并允许扩展更多语法. 中文名易浪, 全名易浪语言. 

出于制作者的个人趣味, 各项工具链将会以 JavaScript 为主/Rust 为辅 来完成. 如果有语法扩展, 制作者会倾向于强类型函数式编程, 以及元编程能力. 


## 道路规划
 
1. 标准易语言程序(仅使用标准库/不使用DLL/无窗口)的解析和编译  
    1.1 编译到LLVM IR  
    1.2 [可选] 编译到 JavaScript
2. 允许 DLL 之调用  
    2.1 [可选] 允许编译到 JavaScript 的程序低成本调用 DLL  
    2.2 [待讨论] 带窗口的程序的编译  
        2.2.1 将窗口编译到 HTML  
        2.2.2 将窗口编译到 MFC  
        2.2.3 不管窗口了  
3. 允许易语言在源代码级别调用 elang 程序
4. VS Code 的补全工具

