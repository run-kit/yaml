---
title: 对象
order: 3
toc: menu
---

# 对象

又称映射 mapping、哈希 hashes、字典 dictionary，是键值对的集合。

## 格式

使用冒号结构表示。

## 示例一

```yaml
username: 老腰
```

转换为 JavaScript 如下：

```js
{
  username: '老腰'
}
```

## 示例二

行内表示，也可以将所有键值对写成一个行内对象。

```yaml
hash: { username: 老腰, age: 32 }
```

转换为 JavaScript 如下：

```js
{
  hash: {
    username: '老腰',
    age: 32
  }
}
```
