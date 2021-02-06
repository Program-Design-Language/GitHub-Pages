安装Pelican
##################

Pelican目前在Python 2.7.x和3.5+上运行最佳；Python早期版本不支持Pelican。

你可以通过几种不同的方法安装Pelican。最简单的是通过
`pip <http://www.pip-installer.org/>`_::

    pip install pelican

（注意操作系统通常会要求在命令前添加前缀 ``sudo`` 以便pelican的安装能针对系统所有用户。）

上面是最简单的方法，而推荐的方式是安装Pelican前先用 virtualenv_ 为Pelican创建一个虚拟环境。
假设你安装了 virtualenv_，则可以新开一个命令行窗口，输入以下命令为为Pelican创建一个新的虚拟环境::

    virtualenv ~/virtualenvs/pelican
    cd ~/virtualenvs/pelican
    source bin/activate

创建并激活虚拟环境后，再用上面的简单方法 ``pip install pelican`` 安装Pelican。如果你是下载了
Pelican的项目源代码，则可以使用distutils方法安装Pelican::

    cd path-to-Pelican-source
    python setup.py install

如果你安装了Git，而且比起稳定版，你更想用到前沿开发版的话，可以用以下命令::

    pip install -e "git+https://github.com/getpelican/pelican.git#egg=pelican"

安装了Pelican后，可以运行 ``pelican --help`` 来查看基本参数和用法。
更多详细信息，请参阅 :doc:`发布网站<publish>` 部分。

可选模块
-----------------

如果你打算用 `Markdown <http://pypi.python.org/pypi/Markdown>`_ 来写文，你需要安装
Python的Markdown模块::

    pip install Markdown

在设置文件中可以开启排版增强功能，但必须先安装上 `Typogrify <http://pypi.python.org/pypi/typogrify>`_ 模块::

    pip install typogrify

依赖项
------------

在安装Pelican时，以下的python模块将作为依赖项自动安装，无需你执行任何操作:

* `feedgenerator <http://pypi.python.org/pypi/feedgenerator>`_, 用于生成Atom feeds
* `jinja2 <http://pypi.python.org/pypi/Jinja2>`_, 制作主题模板用
* `pygments <http://pypi.python.org/pypi/Pygments>`_, 用于语法高亮
* `docutils <http://pypi.python.org/pypi/docutils>`_, 用于支持reStructuredText格式
* `pytz <http://pypi.python.org/pypi/pytz>`_, 用于定义时区
* `blinker <http://pypi.python.org/pypi/blinker>`_, 一个基于Python的强大的信号库，
  支持一对一、一对多的订阅发布模式。
* `unidecode <http://pypi.python.org/pypi/Unidecode>`_, 一个能够转换处理多国文字、字符的模块
* `six <http://pypi.python.org/pypi/six>`_,  解决python2和python3代码兼容的一个强大模块
* `MarkupSafe <http://pypi.python.org/pypi/MarkupSafe>`_, 实现标记安全字符串的模块
* `python-dateutil <https://pypi.python.org/pypi/python-dateutil>`_, 用于读取日期元数据

升级
---------

如果你是通过 ``pip`` 安装的Pelican，希望升级到最新的稳定版，你可以使用参数 ``--upgrade``::

    pip install --upgrade pelican

如果是用distutils安装的Python或者安装的是最新前沿开发版，只需要重复安装操作就可以升级。

开始建站
-------------------

安装Pelican后，你可以通过运行 ``pelican-quickstart`` 命令来搭建项目的骨架，命令运行后会问你一些站点相关的问题::

    pelican-quickstart

回答完所有问题后，生成的站点项目内容为以下结构（content下面括号中的 *pages* 除外，
如果你计划创建非时间顺序的内容，可以选择自行添加这些页面pages）::

    yourproject/
    ├── content
    │   └── (pages)
    ├── output
    ├── tasks.py
    ├── Makefile
    ├── pelicanconf.py       # 主要设置 文件
    └── publishconf.py       # 发布相关设置 文件

下一步，我们往 *content* 目录中添加内容。

.. _virtualenv: http://www.virtualenv.org/
