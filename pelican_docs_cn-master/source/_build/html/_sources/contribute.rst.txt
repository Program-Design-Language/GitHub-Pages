贡献和反馈指南
####################################

要为Pelican做出贡献有很多方法。 你可以改进文档，添加缺少的功能，修复错误（或只是报告错误也行）等。
你还可以通过查看和评论 `现有issues <https://github.com/getpelican/pelican/issues>`_ 这个页面来提供帮助。

不要犹豫，将Pelican fork到你的GitHub并在GitHub上提交issue或提出pull request吧。
不过提交的时候，请遵守以下准则。

.. include:: ../CONTRIBUTING.rst

设置开发环境
======================================

虽然有很多方法可以设置一个开发环境，但我们建议使用 `Virtualenv <https://virtualenv.pypa.io/en/stable/>`_ 。
此工具允许你为单独Python项目设置单独的环境，项目间彼此隔离，
这样你可以很方便地为每个项目使用不同的python模块（和不同的模块版本）。

如果你还未安装 ``virtualenv`` ，你可以通过以下命令安装::

    $ pip install virtualenv

用 ``virtualenv`` 来创建和激活一个虚拟环境::

    $ virtualenv ~/virtualenvs/pelican
    $ cd ~/virtualenvs/pelican
    $ . bin/activate

将Pelican源克隆到一个名为 ``src/pelican`` 的子目录中::

    $ git clone https://github.com/getpelican/pelican.git src/pelican
    $ cd src/pelican

安装开发所需依赖项::

    $ pip install -r requirements/developer.pip

安装Pelican和Pelican需要的依赖项::

    $ python setup.py develop

或者使用 ``pip`` 命令::

    $ pip install -e .

为了方便地在多个Python版本环境下进行测试，我们还提供了一个 ``.tox`` 文件。


构建文档
=================

如果你修改了文档，则应在提交之前预览一下你的修改::

    $ pip install -r requirements/docs.pip
    $ cd docs
    $ make html

在浏览器中打开 ``_build/html/index.html`` 以预览文档。

运行测试套件
======================

在每次添加一个功能时，有两项关于测试的事情你需要做：检查现有测试是否通过，为新功能或错误修正添加测试。

测试文件在 ``pelican/tests`` 中，你可以使用 ``unittest`` 的 "discover" 功能来运行它们::

    $ python -Wd -m unittest discover

进行修改并运行测试后，你可能会看到一个测试失败的提示：“某些生成的文件与预期的功能测试输出
不同”（"some generated files differ from the expected functional tests
output."）。 这里，如果你进行过某些会影响到Pelican生成的HTML输出的更改，而基于这些更改的性质
你能够料到并且确认其不会出错的话，你应该更新功能测试所使用的输出内容。 
为此，你首先应 **确保你已安装了** ``en_EN.utf8`` **和** ``fr_FR.utf8`` 两个 **语言环境** ，
然后运行以下两个命令::

    $ LC_ALL=en_US.utf8 pelican -o pelican/tests/output/custom/ \
        -s samples/pelican.conf.py samples/content/
    $ LC_ALL=fr_FR.utf8 pelican -o pelican/tests/output/custom_locale/ \
        -s samples/pelican.conf_FR.py samples/content/
    $ LC_ALL=en_US.utf8 pelican -o pelican/tests/output/basic/ \
        samples/content/

你可能还会发现由于未安装某些依赖项（例如，Pandoc），一些测试会被跳过。 这并不意味着这些测试通过了；
你至少应该验证一下这些跳过的测试不会受到你的修改的影响。

你应该在每个支持Pelican的Python版本环境中运行测试套件。
最好的办法是为每个Python版本创建一个单独的环境来完成。
Tox_ 工具在这里非常好用，它可以在 ``virtualenv`` 创建的环境中自动运行测试。

.. _Tox: https://tox.readthedocs.io/en/latest/

Python 2/3兼容性开发技巧
=========================================

以下是一些可能对编写与Python 2.7和Python 3兼容的代码有用的提示:

- 使用新语法。 例如:

  - ``print .. -> print(..)``
  - ``except .., e -> except .. as e``

- 使用新方法。 例如:

  - ``dict.iteritems() -> dict.items()``
  - ``xrange(..) - > list(range(..))``

- 必要时使用 ``six`` 模块。 例如:

  - ``isinstance(.., basestring) -> isinstance(.., six.string_types)``
  - ``isinstance(.., unicode) -> isinstance(.., six.text_type)``

- 假设每个字符串和文字都是Unicode格式:

  - 使用 ``from __future__ import unicode_literals``
  - 不要在字符串前使用前缀 ``u'`` 。
  - 不要在过程中编码/解码字符串。 应循着代码定位到该字符串的源位置/目标位置，并在可能的第一个/最后一个位置对其进行编码/解码。
  - 尤其注意，编写你的函数时应预期会接收Unicode格式的内容，函数返回的内容也是Unicode格式。
  - 如果字符串是由众所周知的处理这种情况很糟糕的Python函数输出的，则对该字符串进行编码/解码。例如，Python 2中的 ``strftime()`` 函数。
  - 不要在新建的类中使用 ``__unicode()__`` 这个方法。只用 ``__str()__`` 这个方法然后用 ``@python_2_unicode_compatible`` 来装饰这个类。

- 当我们将语言环境名称指定为Unicode时，Python 2中的 ``setlocale()`` 将会失效。
  而我们却到处都在用 ``from __future__ import unicode_literals`` 。对这个情况，
  其中一种解决方法是将语言环境名称用 ``str()`` 括起来；
  在Python2中，这样可以将名称转换为字节字符串，而在Python3中，应该不会执行任何操作，因为区域设置名称已经是Unicode格式。
- 整数数字不要以零开头。这在Python3中会是一个语法错误。
- 不幸的是，似乎没有同时在Python2和3中都有效的八进制表示法。请使用十进制表示法。


记录日志技巧
============

尝试使用合适的日志记录级别。

要记录不重复的消息，请使用一般的Python方式::

    # 在文件顶部
    import logging
    logger = logging.getLogger(__name__)

    # 如果需要
    logger.warning("A warning with %s formatting", arg_to_be_formatted)

不要自己格式化日志消息。 在消息中使用 ``%s`` 格式并将参数传递给logger。 
这很重要，因为Pelican logger会为了Py2/Py3之间的兼容性而预处理一些参数（比如Exceptions）。

限制无关的日志消息
--------------------------------

如果日志消息会多次出现，你可能需要作一些限制以防止其泛滥。 为此，可以使
用日志消息的 ``extra`` 这个关键字设置，参照以下格式写::

    logger.warning("这条用 %s 格式化的消息叫AAA消息", arg_to_be_formatted,
        extra={'limit_msg': 'AAA消息太多，显示这条通用消息'})

另外，如果你需要格式化通用消息的显示，你还可以在 ``extra`` 的字典中将 ``'limit_args'`` 设置为一个参数元组tuple。

消息显示限制为 ``5`` 条，即，前四条具有相同 ``'limit_msg'`` 的日志消息正常输出显示，但是第
五条日志将使用  ``'limit_msg'`` 替代显示（如果有 ``'limit_args'`` 的话也带上limit_args）。 
在第五条之后，将忽略相应的日志消息。

例如，如果要记录丢失的资源，可以用以下代码::

    for resource in resources:
        if resource.is_missing:
            logger.warning(
                '找不到名字为 %s 的资源', resource.name,
                extra={'limit_msg': '好多资源都找不到啦找不到啦！'})

日志消息将显示如下::

    WARNING: 找不到名字为 prettiest_cat.jpg 的资源
    WARNING: 找不到名字为 best_cat_ever.jpg 的资源
    WARNING: 找不到名字为 cutest_cat.jpg 的资源
    WARNING: 找不到名字为 lolcat.jpg 的资源
    WARNING: 好多资源都找不到啦找不到啦！


在日志中输出回溯
--------------------------------

如果你在 ``except`` 语句块中加日志记录，你可能也希望让它提供回溯信息。
你可以通过将 ``exc_info`` 关键字参数设置为 ``True`` 来实现。
不过，默认情况下应该不需要这样做，因为回溯消息会很长，而且普通用户可能会对此感到困惑。
可以尝试将它们限制为 ``--debug`` 模式，如下所示::

    try:
        some_action()
    except Exception as e:
        logger.error('Exception occurred: %s', e,
            exc_info=settings.get('DEBUG', False))
