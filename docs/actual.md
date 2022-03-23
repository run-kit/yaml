---
title: 实战
order: 8
toc: menu
---

# 实战

以 Github Actions 为例。

GitHub Actions 的配置文件叫做 workflow 文件，存放在代码仓库的 `.github/workflows` 目录。

workflow 文件采用 [YAML 格式](./index.md)，文件名可以任意取，但是后缀名统一为 `.yml`，比如 `ci.yml`。

一个库可以有**多个 workflow 文件**。GitHub 只要发现 `.github/workflows` 目录里面有 `.yml` 文件，就会自动运行该文件。

workflow 文件的配置字段非常多，详见[官方文档](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)。本文只罗列一些常用的基本字段。

## name

workflow 的名称。如果省略该字段，默认为当前 workflow 的文件名。

```yaml
name: GitHub Actions Playground
```

## on

指定触发 workflow 的条件，通常是某些事件。

```yaml
on: push
```

### 支持多事件

```yaml
on: [push, pull_request]
```

### 支持多类型

完整的事件列表，请查看[官方文档-触发工作流的事件](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#check_run)。除了代码库事件，GitHub Actions 也支持外部事件触发，或者定时运行。

### 支持限定分支或标签

```yaml
on:
  push:
    branches:
      - master
```

## jobs

workflow 文件的**主体**是 `jobs` 字段，表示要执行的**一项**或**多项**任务。

### job_id

`jobs` 字段里面，需要写出每一项任务的 `job_id`，具体名称自定义。

- `job_id` 里面的 `name` 字段是任务的说明。
- `job_id` 里面的 `needs` 字段指定当前任务的依赖关系，即运行顺序。
- `job_id` 里面的 `runs-on` 字段指定运行所需要的虚拟机环境。它是**必填**字段，目前可用的虚拟机：
  - `ubuntu-latest`，`ubuntu-18.04` 或 `ubuntu-16.04`。
  - `windows-latest`，`windows-2019` 或 `windows-2016`。
  - `macOS-latest` 或 `macOS-10.14`。
- `job_id` 里面的 `steps` 字段指定每个 Job 的运行步骤，可以包含一个或多个步骤，每个步骤都可以指定以下三个字段。
  - `name`，步骤名称。
  - `env`，该步骤所需的环境变量。
  - `run`，该步骤运行的命令或者 action。

```yaml
jobs:
  job1:
    name: First job
    runs-on: ubuntu-18.04
    steps:
    - name: Print a greeting
      env:
        MY_VAR: Hi there! My name is
        FIRST_NAME: Mona
        MIDDLE_NAME: The
        LAST_NAME: Octocat
      run: |
        echo $MY_VAR $FIRST_NAME $MIDDLE_NAME $LAST_NAME.
  job2:
    name: Second job
    needs: job1
  job3:
    name: Second job
    needs: [job1, job2]
```

- `jobs` 字段包含 3 项任务，`job_id` 分别是 `job1`、`job2` 和 `job3`。
- `job1` 必须先于 `job2` 完成，而 `job3` 等待 `job1` 和 `job2` 的完成才能运行。因此，这个 workflow 的运行顺序依次为：`job1`、`job2`、`job3`。

转换为 JavaScript 如下：

```js
{
  jobs: {
    job1: {
      name: 'First job',
      'runs-on': 'ubuntu-18.04',
      steps: [
        {
          name: 'Print a greeting',
          env: {
            MY_VAR: 'Hi there! My name is',
            FIRST_NAME: 'Mona',
            MIDDLE_NAME: 'The',
            LAST_NAME: 'Octocat'
          },
          run: 'echo $MY_VAR $FIRST_NAME $MIDDLE_NAME $LAST_NAME.\n'
        }
      ]
    },
    job2: {
      name: 'Second job',
      needs: 'job1'
    },
    job3: {
      name: 'Second job',
      needs: ['job1', 'job2']
    }
  }
}
```

## 示例

### 需求

- 整个流程在master分支发生push事件时触发。
- 只有一个job，运行在虚拟机环境ubuntu-latest。
- 第一步是获取源码，使用的 action 是actions/checkout。
- 第二步是构建和部署，使用的 action 是JamesIves/github-pages-deploy-action。
- 第二步需要四个环境变量，分别为 GitHub 密钥、发布分支、构建成果所在目录、构建脚本。其中，只有 GitHub 密钥是秘密变量，需要写在双括号里面，其他三个都可以直接写在文件里。

### yaml

```yaml
name: GitHub Actions Build and Deploy Demo
on:
  push:
    branches:
      - master
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@master

    - name: Build and Deploy
      uses: JamesIves/github-pages-deploy-action@master
      env:
        ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
        BRANCH: gh-pages
        FOLDER: build
        BUILD_SCRIPT: npm install && npm run build
```

- 示例需要将构建成果发到 GitHub 仓库，因此需要 GitHub 密钥。按照[官方文档-创建一个个人访问令牌](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)，生成一个密钥。然后，将这个密钥储存到当前仓库的Settings/Secrets里面。
- `repo/secrets/Actions` 储存秘密的环境变量的地方。环境变量的名字可以随便起，这里用的是 `ACCESS_TOKEN`。如果你不用这个名字，后面脚本里的变量名也要跟着改。

转换为 JavaScript 如下：

```js
{
  name: 'GitHub Actions Build and Deploy Demo',
  on: {
    push: {
      branches: [ 'master' ]
    }
  },
  jobs: {
    'build-and-deploy': {
      'runs-on': 'ubuntu-latest',
      steps: [
        {
          name: 'Checkout',
          uses: 'actions/checkout@master'
        },
        {
          name: 'Build and Deploy',
          uses: 'JamesIves/github-pages-deploy-action@master',
          env: {
            ACCESS_TOKEN: '${{ secrets.ACCESS_TOKEN }}',
            BRANCH: 'gh-pages',
            FOLDER: 'build',
            BUILD_SCRIPT: 'npm install && npm run build'
          }
        }
      ]
    }
  }
}
```
