---
title: 引用
order: 7
toc: menu
---

# 引用

- `&` 建立锚点；
- `*` 引用锚点；
- `<<` 合并到当前数据；

```yaml
merge:
  - &CENTER { x: 1, y: 2 }
  - &LEFT { x: 0, y: 2 }
  - &BIG { r: 10 }
  - &SMALL { r: 1 }

  -
    x: 1
    y: 2
    r: 10
    label: nothing

  -
    << : *CENTER
    r: 10
    label: center

  -
    << : [ *CENTER, *BIG ]
    label: center/big

  -
    << : [ *BIG, *LEFT, *SMALL ]
    x: 1
    label: big/left/small
```

转换为 JavaScript 如下：

```js
{
  merge: [
    { x: 1, y: 2 },
    { x: 0, y: 2 },
    { r: 10 },
    { r: 1 },
    { x: 1, y: 2, r: 10, label: 'nothing' },
    { x: 1, y: 2, r: 10, label: 'center' },
    { x: 1, y: 2, r: 10, label: 'center/big' },
    { r: 10, x: 1, y: 2, label: 'big/left/small' }
  ]
}
```