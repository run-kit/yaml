---
title: 数组
order: 4
toc: menu
---

# 数组

又称序列 sequence、列表 list，按次序排列的值。

## 格式

一组连词线开头的行，构成一个数组。

## 示例一

```yaml
- JavaScript
- React
- Vue
```

转换为 JavaScript 如下：

```js
['JavaScript', 'React', 'Vue']
```

## 示例二

二维数组可使用缩进一个空格表示，还是刚才的例子：

```yaml
-
  - JavaScript
  - React
  - Vue
```

转换为 JavaScript 如下：

```js
[['JavaScript', 'React', 'Vue']]
```

## 示例三

行内表示。

```yaml
languages: [JavaScript, React, Vue]
```

转换为 JavaScript 如下：

```js
{languages: ['JavaScript', 'React', 'Vue']}
```