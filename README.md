
11.2日早开始学习课程<[JS实现京东无延迟菜单效果](https://www.imooc.com/learn/829)>,至今项目一共写了3遍.

- 第一遍是完全照着老师的视频敲一遍.


- 第二遍是照着自己的敲一遍外加理清思路,中间遇到了一些莫名其妙的问题,花的时间是最长的.


- 第三遍则是加入了一些自己的想法在里面,用时最少.

现在趁热打铁,写一篇思路分析,帮助自己巩固一下.

***

### 正文

#### 一.项目目标
模仿京东首页制作一个侧边菜单,满足以下要求:
- 将鼠标放在主菜单上会弹出子菜单.
- 用户正常从主菜单进入子菜单鼠标斜向移动时子菜单不会切换.

**如图:**
![](../../../../img/in-post/2019-11-3/a.png)

***
#### 二.代码思路
①项目结构
- index.html
- mian.js
- mian.css

*其中在index.html中外联引用了百度的JQuery文件.*
```html
 <script src="http://libs.baidu.com/jquery/2.1.4/jquery.min.js"></script>
 ```

 ②实现顺序

1. 先完成html文件,把主菜单和子菜单内容写好.
2. 完成CSS样式
3. 最后写JS代码

③具体步骤

**HTML文件:**

**1.先定义一个大div包括所有元素,`id="all"`**
```html
<div class="wrap" id="all">

</div>
```
**2.创建主菜单div,选用`ul`无序序列放置主菜单选项**
```html
<div id="dul">
    <ul>
        <!--注意这个data-id,这个是用来在js文件中找到对应子菜单用的-->
        <li data-id="a">   
            <span>服装</span>
        </li>
        <li data-id="b">
            <span>手机</span>
        </li>
    </ul>
</div>
```
**3.创建子菜单div,选用`dl`存放子菜单选项**
```html
<!-- 注意这里的子菜单div和具体的abcd菜单的div,他们都具有none属性,这样方便后面js中控制他们是否显示 -->
<div class="none" id="subMenu">
            <div id="a" class="sub_content none">
                <dl>
                    <dt>
                        <a href="#">运动<i>&gt;</i></a>
                    </dt>
                    <dd>
                        <a href="#">阿迪达斯</a>
                        <a href="#">耐克</a>
                    </dd>
                </dl>
                .....
</div>
```

**CSS文件:**

**1.写整体样式**

```css
.wrap{
    position: relative;
    width: 200px;
    left: 50px;
    top: 50px;
    background-color: darkgray;
}
```

**2.写主菜单样式**
```css
ul{
    list-style: none;
    margin: 9px;
    padding:  0;
    color: #ffffff;
    background: #6c6669;
}
li{
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    padding-left: 12px;
    cursor: pointer;
    position: relative;
}
li:hover{
    color: red;
    /* 把li背景颜色变化放到这里不会影响到后面子菜单的显示 */
    background: #d8ced1;
}
```
**3.写子菜单的样式**
```css
.none{
    display: none;
}
#subMenu{
    /* 前面主菜单使用相对定位,这里使用绝对定位,可以正好让子菜单在主菜单右侧,可是不能根据选项位置上下移动 */
    position: absolute;
    left: 200px;
    top: 0;
    width: 600px;
    
    border: 1px solid #f7f7f7;
    background: #f7f7f7;
    
    padding-left: 15px;
}

dt a:hover{
    color: red;
}
.sub_content a{
    font-size: 14px;
    color: #666;
}
.sub_content dt{
    position: relative;
    float: left;
    clear: left;
    width: 70px;

    font-weight: bold;
}
.sub_content dd{
    position: relative;
    float: left;
    margin-left: 5px;
    margin-bottom: 5px;
    border-top: 1px solid #eee;
}
.sub_content dt i{
    width: 4px ;
    height: 14px;
    /* 不知道这个的用法,下文补充出来 */
    font: 400 9px/14px consolas;
    right: 5px;
    top:5px;
}
```

**JS文件(重点):**

**1.为鼠标进入离开主菜单增加事件**
```js
// 为什么操作$('#all')而不是$('#dul')?
// 因为mouseenter和mouseleave在all的子元素下也会被触发,
// 即鼠标移出all下的subMenu也可以触发mouseleave事件.用$('#all')更方便,不需要再为子菜单写事件.
$('#all').on('mouseenter',function (e) {
        sub.removeClass('none');
      }).on('mouseenter','li',function (e) {
          if (!activeRow) {
            //   判断主菜单是否有选中行,如果没有则显示现在对应的子菜单.
              activeRow = $(e.target);
              activeMenu = $('#'+activeRow.data('id'));
              activeMenu.removeClass('none');
              return;  
          }
            //如果已经有选中行了,则释放选中行,重新选中现在的行,显示它的子菜单   
                activeMenu.addClass('none');
                activeRow = $(e.target);
                activeMenu = $('#'+activeRow.data('id'));
                activeMenu.removeClass('none');
        }).on('mouseleave',function (e) {
            // 鼠标离开菜单,让子菜单隐藏
            sub.addClass('none');

            // 如果有选中行,则释放选中行
            if (activeRow) {
                activeMenu.addClass('none');
                activeMenu = null;
                activeRow = null;
            }
          })
```

**2.改进代码,上文代码的缺点:**
- **用户鼠标选中主菜单要挪到子菜单必须水平移动不能碰到其他选项,十分不人性**

改进方法:增加`setTimeout`函数.将原先切换选中行代码放到延迟函数中.

增加变量`mouseInSub`,判断鼠标是否进入子菜单.

```js
var mouseInSub = false;


    sub.on('mouseenter',function (e) {
        mouseInSub=true;
    }).on('mouseleave',function (e) {
        mouseInSub = false;
      })

...

// 计时器
            var timer = setTimeout(() => {
                if (mouseInSub) {
                    // 如果鼠标直接从主菜单进入子菜单,则结束延迟函数不再切换其他子菜单
                    return;
                }

                activeMenu.addClass('none');
                activeRow = $(e.target);
                activeMenu = $('#'+activeRow.data('id'));
                activeMenu.removeClass('none');
                
            }, 200);
```

**代码部分完成.**

***

### 一些问题及收获

#### 1.JQuery引用一定要放在JS文件引用之前!
第二次写项目时,写完一部分JS代码想运行一下试试,发现一点反应没有,前后把第一份代码又对了一遍发现并没有错误.

到网上找,一句话点醒了我"JS文件中不需要再特地写引用JQuery的代码,因为在html文件中已经引用过了".

我当时心里想,引用JQuery代码?那我假如把JS的引用写在JQuery的引用前面,是不是就没办法引用到JQuery的代码了?

我改了下两个的顺序,发现问题一下就解决了.为此前前后后花了不下半小时.

#### 2.为什么subMenu和他下面的abcd子菜单都要添加none属性,为什么不只在对应子菜单中加?
打开Chrome调试模式可以看到,如果把鼠标移入菜单第一项就会发现,subMenu的属性中none消失,对应的a的属性中none也消失了.

如果我们不把鼠标移出主菜单,只是在各个选项中移动,subMenu的属性一直是空着的,也就是一直都是能显示的.而对应的子菜单属性就在一直变化.

这其实相当于一把双保险,如果鼠标直接移出菜单,则直接从子菜单源头就把他隐藏了.如果一直在主菜单中切换选项,那么不同的子菜单来回显示即可.

#### 3.`font: 400 9px/14px consolas;`的用法?

用法: **font:字体粗细 字体大小/行高 字体样式**
