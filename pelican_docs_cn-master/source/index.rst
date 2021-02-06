Pelican |release|
=================


Pelican是一种静态网站生成器，使用Python_语言编写。 有以下特点:

* 用你喜欢的文本编辑器，以 reStructuredText_ 格式或者 Markdown_ 格式，直接编写你的内容
* 包含有一个简单的命令行工具以（重新）生成你的网站内容
* 能与版本控制系统和网络接口轻易结合
* 静态输出，方便部署

准备好的话，可以直接转到 :doc:`快速入门<quickstart>` 部分哦。

特点
--------

Pelican 4 目前支持:

* 文章页面（例如博客文章）和单独页面（例如“关于”，“项目”，“联系”等页面）。
* 评论功能（通过第三方服务Disqus）。如果你不想评论数据放在这些第三方服务上，可以
  选择自托管评论系统。点击这个 `Pelican Plugins`_ 库可以了解更多。
* 自定义主题 （主题模板可以使用 Jinja2_ 创建）
* 多种语言发布文章
* Atom/RSS feeds
* 代码语法高亮
* 从 WordPress, Dotclear, 或者 RSS feeds 中导入数据
* 集成第三方工具: Twitter, Google Analytics 等（可选）
* 快速重构博客（得益于内容缓存机制和可选输出写入机制）

为什么叫 "Pelican"?
-----------------------

"Pelican" 由 *calepin* 这个单词调乱字母顺序变成, 而calepin在法语里表示notebook（记事本）啊。

源代码
-----------

你可以在这个地址获取到项目源码: https://github.com/getpelican/pelican

寻求帮助，贡献代码或者反馈意见
------------------------------------------------

可以查看这里 :doc:`反馈意见和贡献提交指南 <contribute>`.

文档目录
-------------

.. toctree::
   :maxdepth: 2

   quickstart
   install
   content
   publish
   settings
   themes
   plugins
   pelican-themes
   importer
   faq
   tips
   contribute
   internals
   report
   changelog
   links

.. Links

.. _Python: https://www.python.org/
.. _reStructuredText: http://docutils.sourceforge.net/rst.html
.. _Markdown: https://daringfireball.net/projects/markdown/
.. _Jinja2: http://jinja.pocoo.org/
.. _`Pelican documentation`: https://docs.getpelican.com/latest/
.. _`Pelican's internals`: https://docs.getpelican.com/en/latest/internals.html
.. _`Pelican plugins`: https://github.com/getpelican/pelican-plugins
