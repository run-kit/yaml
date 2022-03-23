---
title: 复合结构
order: 5
toc: menu
---

# 复合结构

对象和数组结合使用。

## 示例一

```yaml
languages:
  - JavaScript
  - React
  - Vue
urls:
  yaml: yaml.org
  javascript: javascript.org
  react: react.org
  vue: vue.org
```

转换为 JavaScript 如下：

```js
{
  languages: ['JavaScript', 'React', 'Vue'],
  urls: {
    yaml: 'yaml.org'
    javascript: 'javascript.org'
    react: 'react.org'
    vue: 'vue.org'
  }
}
```
