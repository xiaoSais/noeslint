### noESLint

给每个文件加上 | 删除 /* eslint-disable */，避免打包的时候Eslint校检出错。

#### 背景

Jenkins配置文件突然增加了ESLint校检，以前的代码质量比较差，逐行去修改比较麻烦。希望有一个工具可以给目录下的所有文件自动增加一行/* eslint-disable */来跳过该校检。

#### 效果
```
    // example.vue
    <template>
        <div class="app"></div>
    </template>
    <script>
        var a = 1
    </script>

    //转化为
    =====>
    
    <template>
        <!-- eslint-disable -->
        <div class="app"></div>
    </template>
    <script>
        /* eslint-disable */
        var a = 1
    </script>
```
#### 安装

```
    npm install noESLint -g
```

#### 使用
给src目录下所有文件增加 /* eslint-disable */注释

```
    cd project
    noESLint -d src
```
给src和components文件夹增加 /* eslint-disable */注释
```
    cd project
    noESLint -d src components
```
删除src目录下所有文件的 /* eslint-disable */ 注释
```
    cd project
    noESLint -r src
```
#### 选项
  
  -v --version 查看版本
  
  -d --dir 增加/* eslint-disable*/ 可以添加多个目录
  
  -r --remove 删除/* eslint-disable*/注释
