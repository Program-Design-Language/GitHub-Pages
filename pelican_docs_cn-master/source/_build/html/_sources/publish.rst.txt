发布网站
#################

.. _site_generation:

生成网站
===============

当你安装了Pelican并且编写了一些内容（例如，以Markdown或reST格式）后，
你可以通过 ``pelican`` 命令指定内容文件的路径和 :doc:`设置文件<settings>` 的路径（可选），
将你的内容转换为HTML文件::

    pelican /path/to/your/content/ [-s path/to/your/settings.py]

上面的命令将使用默认主题生成一个简单的站点并将其保存在 ``output/`` 文件夹中，
默认主题包含非常简单的没有样式的HTML，大家可以以它为基础创建自己的主题。

处理单个文章或页面时，可以仅生成与该内容对应的文件。
要做到这一点，使用 ``--write-selected`` 参数，比如::

    pelican --write-selected output/posts/my-post-title.html

请注意，你必须为生成的 *output* 文件指定一个路径 - 不是指定源内容路径。
要确定输出文件名和位置，请使用 ``--debug`` 参数。
如果需要， ``--write-selected`` 可以接收以逗号分隔的路径列表，也可以当一项设置来配置。 
（参考: :ref:`writing_only_selected_content` ）

你还可以让Pelican监视你的修改，而不用每次想要查看更改时手动运行命令。
要启用此功能，请使用 ``-r`` 或 ``--autoreload`` 参数运行 ``pelican`` 命令。
在非Windows环境中，还可以结合 ``-l`` 或 ``--listen`` 使用，
这样可以同时自动重新生成*并且*输出到本地服务器 http://localhost:8000::

    pelican --autoreload --listen

Pelican还提供其他命令行开关。 输入下面语句可以查看可以使用的所有选项的帮助::

    pelican --help

查看生成的文件
---------------------------

Pelican生成的文件是静态文件，所以很容易可以查看。
你可以直接用你的浏览器打开生成的文件来查看效果::

    firefox output/index.html

由于这种直接查看的方法可能无法找到页面相关的CSS和其他链接资源，
因此使用Python运行简单的Web服务器可以提供更可靠的预览体验。

对于 Python 2, 运行::

    cd output
    python -m SimpleHTTPServer

对于 Python 3, 运行::

    cd output
    python -m http.server

服务启动后，可以访问本地地址 http://localhost:8000/ 来查看你的网站

部署网站
==========

站点生成后，可以在本地开发环境中预览它，以准备将其部署到生产环境中，
你可能会先使用一些你配置好的特定于生产环境的设置（例如，feeds源分析等）来重新生成你的站点::

    pelican content -s publishconf.py

要使发布配置基于设置文件 ``pelicanconf.py`` ，你可以在 ``publishconf.py`` 文件中添加下面这一行语句
来导入你的 ``pelicanconf`` 设置::

    from pelicanconf import *

如果你一开始是用 ``pelican-quickstart`` 命令自动生成的 ``publishconf.py`` 文件的话，
上面那一行语句是默认写入的。

部署站点的步骤取决于你托管服务器。如果服务器运行的是Nginx或Apache而你有SSH访问权限，
你可以使用 ``rsync`` 工具来传输你的站点文件::

    rsync -avc --delete output/ host.example.com:/var/www/your-site/

还有许多其他部署方式，其中一些可以在初始化运行 ``pelican-quickstart`` 命令设置站点时进行配置。
有关通过GitHub Pages发布的详细信息，请参阅 :doc:`使用技巧<tips>` 页面。

自动化
==========

虽然生成网站的规范方式是使用 ``pelican`` 命令，但自动化工具可于简化网站生成和发布流程操作。
在 ``pelican-quickstart`` 过程中问到的一个问题是问是否要自动生成站点和发布。 
如果你回答 "yes" 的话，会在项目的根目录中生成 ``tasks.py`` 和 ``Makefile`` 两个文件。 
这两个文件根据 ``pelican-quickstart`` 安装过程中的配置问答信息预先整理而成，
是为我们简化操作而用的，并且随时可以根据特定需求和使用模式进行更改定制。 
如果发现这些自动化工具的实用性有限，你可以随时删除它们，
这不会影响 ``pelican`` 命令的规范使用。

以下是“包裹” ``pelican`` 命令的自动化工具介绍，可以简化生成，预览和上传站点的过程。

Invoke 工具
------------

Invoke_ 的优点是它是用Python编写的，因此可以在各种环境中使用。缺点是它必须单独安装。
用以下命令安装Invoke，如果需要权限，在命令前加上 ``sudo`` ::

    pip install invoke

花点时间查看一下项目根目录中生成的 ``tasks.py`` 文件。
你可以看到许多命令，你可以根据你的喜好给这些命令重命名，删除或自定义。
或者开箱即食，直接使用这些命令，下面这行语句用于生成网站::

    invoke build

如果你希望Pelican每次检测到更改时自动重新生成你的站点（在本地测试时尤其方便），可以用以下命令::

    invoke regenerate

为生成的站点启动服务以便在 http://localhost:8000/ 中查看，可以用以下命令::

    invoke serve

要在每次检测到更改时使浏览器自动重新加载生成的站点的话，
先 ``pip install livereload`` ，然后使用以下命令::

    invoke livereload

在 ``pelican-quickstart`` 初始化过程中，被问及是否要通过SSH上传站点时如果你选了"yes"的话，
你可以用以下命令使用SSH连接方式通过rsync发布你的站点::

    invoke publish

这些只是默认情况下可用的一些命令，你可以自行查看 ``tasks.py`` 中其他可用的命令。
更重要的是，不要犹豫，开始定制 ``tasks.py`` 以满足你自己特定的需求和偏好吧。

Make 工具
----------

当你在是否生成自动化工具的问题中回答"yes"时，系统也会自动创建一份 ``Makefile`` 文件。
这种方法的优点是 ``make`` 命令内置于大多数POSIX系统中，因此不需要安装任何其他东西便可以使用它。
缺点是非POSIX系统（例如Windows）不包含 ``make`` ，并且在这些系统上安装它可能有些复杂。

如果想根据 ``pelicanconf.py``文件中的配置使用 ``make`` 来生成你的站点，可以运行::

    make html

想要根据 ``publishconf.py`` 中的设置生成生产站点，请运行::

    make publish

如果你希望Pelican每次检测到更改时自动重新生成你的站点（在本地测试时尤其方便），可以用以下命令::

    make regenerate

为生成的站点启动服务以便在 http://localhost:8000/ 中查看，可以用以下命令::

    make serve

通常你需要在两个独立的命令行终端窗口中分别运行 ``make regenerate`` 和 ``make serve`` ，
不过这里你可以运行下面命令::

    make devserver

上述命令将以自动重构站点模式运行的同时提供本地http://localhost:8000地址浏览的web服务支持

当你准备好发布你的网站时，你可以通过在 ``pelican-quickstart`` 初始化中的问题选项中选择的方法上传它。
下面这个例子是我们将利用ssh方式使用rsync::

    make rsync_upload

好了，你的网站现在应该已经上线啦。

（默认的 ``Makefile`` 和 ``devserver.sh`` 脚本使用 ``python`` 和 ``pelican`` 可执行文件来完成它的任务。
如果你想使用不同的可执行文件，比如 ``python3`` ，你可以分别设置 ``PY`` 和 ``PELICAN`` 环境变量来
覆盖默认的可执行文件名。）

.. _Invoke: http://www.pyinvoke.org
