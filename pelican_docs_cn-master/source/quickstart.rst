快速入门
##########

建议耐心读完整个手册。如果心急，以下简单步骤可以帮你快速入门。

安装
------------

在安装了Python（2.7.x以上或3.3以上版本）的环境下，打开你常用的命令行工具，
输入下面这行命令即可安装Pelican，如果你用Mardown来写文章的话，记得一并安装
一下Python的Markdown模块，如果遇到提示权限错误，则在命令行前加上 ``sudo`` ::

    pip install pelican markdown

创建一个项目
----------------

首先给自己的网站项目起个名字并新建一个站点目录，然后定位到此目录，命令如下::

    mkdir -p ~/projects/yoursite
    cd ~/projects/yoursite

运行命令 ``pelican-quickstart`` 以初始化项目框架, 运行命令后会提示一些关于这个项目的问题::

    pelican-quickstart

一些问题在后面的括号中带有默认选项，选择默认值 [#tzlocal_fn]_ 的话直接回车就行。提示写入你的
站点URL前缀时，记得根据提示填写（比如 ``http://example.com``）。

创建一篇文章
-----------------

在生成一些内容之前，你还不能运行Pelican查看效果。现在打开一个文本编辑器，新建一篇文章，写入以下内容::

    Title: My First Review
    Date: 2010-12-03 10:20
    Category: Review

    Following is a review of my favorite mechanical keyboard.
    啊，机械键盘，啊……

这里这篇文章是用Markdown格式撰写的，将它保存到
``~/projects/yoursite/content/keyboard-review.md``

生成站点
------------------

在你的站点目录下, 运行 ``pelican`` 命令来生成你的站点::

    pelican content

现在你的站点内容已经被生成在 ``output`` 目录下. (可能会见到一个关于feeds的错误提示，因为现在是
在本地操作，所以是正常的，可以无视它.)

预览站点
-----------------

另外新开一个命令行窗口，定位到站点目录的 output 目录下，然后运行以下命令，启动Pelican的web服务器::

    pelican --listen

然后就可以在浏览器打开 http://localhost:8000/ 来预览你的网站啦。

继续阅读其他文档部分以获取更多详细信息，在Pelican wiki的 Tutorials_ 页面中可以找到社区发布的
教程链接。

.. _Tutorials: https://github.com/getpelican/pelican/wiki/Tutorials

脚注
---------

.. [#tzlocal_fn] 你可以通过安装可选模块 `tzlocal <https://pypi.python.org/pypi/tzlocal>`_
                 来帮助本地化默认字段。
