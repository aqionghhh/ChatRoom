```
绝对定位的选择器居中显示（垂直、水平）：
	  position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      right: 0;
      margin: auto;
     
搞清楚：
box-sizing: border-box;    
box-shadow: 0 0.5px 0 0 rgba(0, 0, 0, 0.1);
float:left不生效的原因
文本超出范围后隐藏的几种方法
内核的东西
display: -webkit-box;
-webkit-
css选择器通常都是父元素控制子元素的位置，css有什么办法实现子元素控制父元素的位置？
.friend-list:active
	要知道冒号后面跟的东西，以及跟什么
设置了scoped类名相同也还是会出现样式覆盖的原因
浮动
行和行高的关系
z-index必须在定位元素（position:relative/absolute/fixed/sticky）上才有效
transition
```

###### 绝对定位和相对定位

```
子元素想要在父元素中绝对定位，需要先在父元素中设置相对定位，否则默认的是子元素在整个界面中进行绝对定位
```

