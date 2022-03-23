---
title: 存量
order: 6
toc: menu
---

# 存量

最基本的、不可再分的值。

## 字符串

- `|` 保留换行符；
- `+` 保留文字块末尾的换行；
- `-` 删除字符串末尾的换行；
- `>` 折叠换行；

```yaml
string:
  username: 老腰
  username1: 老 腰
  username2: '昵称：老 腰'
  username3: "昵称：老 腰"
  username4: '老\n腰'
  username5: "老\n腰"
  username6: "老''腰"
  username7: 老腰
   的爱好
   是什么
  username8: |
   老腰
   的爱好
   是什么
  username9: |+
   老腰
   的爱好
   是什么


  username10: |-
   老腰
   的爱好
   是什么


  username11: |
   <p style="color: red">
    老腰的爱好是什么
   </p>
  username12: >
   老腰
   的爱好
   是什么
```

转换为 JavaScript 如下：

```js
{
  string: {
    username: '老腰',
    username1: '老 腰',
    username2: '昵称：老 腰',
    username3: '昵称：老 腰',
    username4: '老\\n腰',
    username5: '老\n腰',
    username6: '老\'\'腰',
    username7: '老腰 的爱好 是什么',
    username8: '老腰\n的爱好\n是什么\n',
    username9: '老腰\n的爱好\n是什么\n\n\n',
    username10: '老腰\n的爱好\n是什么',
    username11: '<p style="color: red">\n 老腰的爱好是什么\n</p>\n',
    username12: '老腰 的爱好 是什么\n'
  }
}
```

## 整数

```yaml
int:
  canonical: 685230
  decimal: +685_230
  octal: 0o2472256
  hexadecimal: 0x_0A_74_AE
  binary: 0b1010_0111_0100_1010_1110
```

转换为 JavaScript 如下：

```js
{
  int:{
    canonical: 685230,
    decimal: 685230,
    octal: 685230,
    hexadecimal: 685230,
    binary: 685230,
  }
}
```

## 浮点型

```yaml
float:
  canonical: 6.8523015e+5
  exponentioal: 685.230_15e+03
  fixed: 685_230.15
  negative infinity: -.inf
  not a number: .NaN
```

转换为 JavaScript 如下：

```js
{
  float: {
    canonical: 685230.15,
    exponentioal: 685230.15,
    fixed: 685230.15,
    'negative infinity': -Infinity,
    'not a number': NaN,
  }
}
```

## 布尔值

```yaml
bool:
  - true
  - True
  - TRUE
  - false
  - False
  - FALSE
```

转换为 JavaScript 如下：

```js
{
  bool: [ true, true, true, false, false, false ]
}
```

## Null

```yaml
null:
  empty:
  canonical: ~
  english: null
```

转换为 JavaScript 如下：

```js
{
  null: {
    empty: null,
    canonical: null,
    english: null,
  }
}
```

## 时间

```yaml
timestamp:
  canonical:        2022-03-23T02:59:43.1Z
  valid iso8601:    2022-03-23t21:59:43.10-05:00
  space separated:  2022-03-23 21:59:43.10 -5
  no time zone (Z): 2022-03-23 2:59:43.10
  date (00:00:00Z): 2022-03-23
```

转换为 JavaScript 如下：

```js
{
  timestamp: {
    canonical: Wed Mar 23 2022 10:59:43 GMT+0800 (中国标准时间),
    'valid iso8601': Thu Mar 24 2022 10:59:43 GMT+0800 (中国标准时间),
    'space separated': Thu Mar 24 2022 10:59:43 GMT+0800 (中国标准时间),
    'no time zone (Z)': Wed Mar 23 2022 10:59:43 GMT+0800 (中国标准时间),
    'date (00:00:00Z)': Wed Mar 23 2022 08:00:00 GMT+0800 (中国标准时间),
  }
}
```

## 类型转换

使用 `!!` 两个感叹号强制转化类型。

```yaml
transfer:
  age: !!str 32
  isMan: !!str true
```

转换为 JavaScript 如下：

```js
{
  transfer: {
    age: '32',
    isMan: 'true',
  }
}
```

函数和正则表达式转为字符串，这是 JS-YAML 库特有的功能。

```yaml
fn: function () { return 1 }
reg: /test/
```

转换为 JavaScript 如下：

```js
{
  fn: 'function () { return 1 }',
  reg: '/test/'
}
```
