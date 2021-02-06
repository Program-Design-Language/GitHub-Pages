.. _import:

导入站点
##########################

说明
===========

``pelican-import`` 是一个命令行工具，用于将文章从其他软件格式转换为reStructuredText或Markdown格式。
支持的导入格式有:

- Blogger XML export
- Dotclear export
- Posterous API
- Tumblr API
- WordPress XML export
- RSS/Atom feed

将HTML转换为reStructuredText或Markdown依赖于 `Pandoc`_ 。
对于Dotclear，如果源帖子是使用Markdown语法编写的，则不对它们作转换（因为Pelican也支持Markdown）。

.. note::

   与Pelican不同，Wordpress每篇文章支持多个分类。这些分类会以逗号分隔的字符串形式导入。
   你必须手动解决这个问题，或者使用一个支持每篇文章归到多个分类的插件（如 `more_categories`_ ）。

依赖项
============

``pelican-import`` 有一些依赖项，这些依赖项本身Pelican的其余部分不需要用到:

- *BeautifulSoup4* 和 *lxml*, 用于导入WordPress和Dotclear。可用Python安装 (``pip install BeautifulSoup4 lxml``)。
- *Feedparser*, 用于导入feed订阅 (``pip install feedparser``)。
- *Pandoc*, 查看 `Pandoc site`_ 获取在不同操作系统上的安装说明。

.. _Pandoc: http://johnmacfarlane.net/pandoc/
.. _Pandoc site: http://johnmacfarlane.net/pandoc/installing.html


使用
=====

::

    pelican-import [-h] [--blogger] [--dotclear] [--posterous] [--tumblr] [--wpfile] [--feed]
                   [-o OUTPUT] [-m MARKUP] [--dir-cat] [--dir-page] [--strip-raw] [--wp-custpost]
                   [--wp-attach] [--disable-slugs] [-e EMAIL] [-p PASSWORD] [-b BLOGNAME]
                   input|api_token|api_key

位置参数
--------------------
  =============         ============================================================================
  ``input``             要读取的输入文件
  ``api_token``         (仅对Posterous) api_token 可以从 http://posterous.com/api/ 获得
  ``api_key``           (仅对Tumblr) api_key 可以从 http://www.tumblr.com/oauth/apps 获得
  =============         ============================================================================

可选参数
------------------

  -h, --help            显示帮助信息然后退出
  --blogger             导出Blogger XML（默认值：False）
  --dotclear            导出Dotclear (默认值: False)
  --posterous           Posterous API (默认值: False)
  --tumblr              Tumblr API (默认值: False)
  --wpfile              WordPress XML export (默认值: False)
  --feed                要解析的Feed (默认值: False)
  -o OUTPUT, --output OUTPUT
                        输出路径 (默认值: content)
  -m MARKUP, --markup MARKUP
                        输出格式 (支持 rst 和 markdown)
                        (默认值: rst)
  --dir-cat             将文件放在具有分类名称的目录中
                        (默认值: False)
  --dir-page            将识别为page页的文件放在 "pages/" 子目录中（仅限从blogger和wordpress导入的内容）
                        (默认值: False)
  --filter-author       仅导入指定作者的帖子
  --strip-raw           删除无法转换为标记语言的原始HTML代码，例如flash嵌入代码或iframes框架
                        （仅限从wordpress导入的内容）（默认值：False）
  --wp-custpost         将wordpress自定义不同帖子类型放在不同目录中。 如果与 --dir-cat 一起使用，
                        则创建类似 "/post_type/category/" 的目录（仅限从wordpress导入的内容）
  --wp-attach           将作为附件上传到wordpress的文件下载下来。
                        文件会作为列表被添加到帖子头部header中，另外会在帖子中更新对文件的链接
                        所有文件都会被下载下来，即使它们与帖子无关。
                        文件会以其在wordpress输出目录中的原始路径被下载下来，
                        例如 "output/wp-uploads/date/postname/file.jpg" 。
                        （仅限从wordpress导入的内容） （需要互联网连接）
  --disable-slugs       禁用在输出目录中存储来自导入帖子的slug内容。
                        禁用此选项后，文章在Pelican的URL地址可能与原始帖子的URL地址不一致
                        (默认值: False)
  -e EMAIL, --email=EMAIL
                        用于验证Posterous API的电子邮箱
  -p PASSWORD, --password=PASSWORD
                        用于验证Posterous API的密码
  -b BLOGNAME, --blogname=BLOGNAME
                        Tumblr API中使用的博客名称


例子
========

对于 Blogger::

    $ pelican-import --blogger -o ~/output ~/posts.xml

对于 Dotclear::

    $ pelican-import --dotclear -o ~/output ~/backup.txt

对于 Posterous::

    $ pelican-import --posterous -o ~/output --email=<email_address> --password=<password> <api_token>

对于 Tumblr::

    $ pelican-import --tumblr -o ~/output --blogname=<blogname> <api_token>

对于 WordPress::

    $ pelican-import --wpfile -o ~/output ~/posts.xml

测试
=====

要测试模块，可以使用示例文件:

- 对于 WordPress: http://www.wpbeginner.com/wp-themes/how-to-add-dummy-content-for-theme-development-in-wordpress/
- 对于 Dotclear: http://media.dotaddict.org/tda/downloads/lorem-backup.txt

.. _more_categories: http://github.com/getpelican/pelican-plugins/tree/master/more_categories