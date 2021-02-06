[![Build Status](https://travis-ci.com/dejavuzhou/dejavuzhou.github.io.svg?branch=master)](https://travis-ci.com/dejavuzhou/dejavuzhou.github.io)

## 博客系统

地址：[www.bioinit.com](https://www.bioinit.com)

## Feature

- 使用 markdown 语法写博客,写代码 git push 来提交博客
- 本博客与语雀知识库同步更新，所有原文知识库地址：[https://yuque.com/shenweiyan](http://tech.bioinit.com)

## 安装说明

1. fork 库到自己的 github
2. 修改名字为：`username.github.io` 或者 `organizationName.github.io`
3. clone 库到本地，参考 `_posts` 中的目录结构自己创建适合自己的文章目录结构
4. 修改 CNAME，或者删掉这个文件，使用默认域名
5. 修改`_config.yml`配置项
6. It's done!
7. 定义自己 google 统计 adsense  `_includes/header.html`  第 29~48 行
8. 自定义自己的评论系统  `_layouts/post.html` 第 15 行
9. 站长管理平添校验代码  `_includes/header.html` 第 14~20 行
 
## 分支说明

- 三栏布局（master分支，基于[3-Jekyll](https://github.com/P233/3-Jekyll)）
- 三栏布局 (bootstrap-based分支，基于Bootstrap)
- 单栏布局（first-ui分支，基于Bootstrap）
