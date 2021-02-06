pelican-themes命令
#######################



描述
===========

``pelican-themes`` 是一个用于管理Pelican主题的命令行工具。


用法
"""""

| pelican-themes [-h] [-l] [-i theme path [theme path ...]]
|                      [-r theme name [theme name ...]]
|                      [-s theme path [theme path ...]] [-v] [--version]

可选参数:
"""""""""""""""""""


-h, --help                              显示帮助信息

-l, --list                              显示已安装的主题

-i theme_path, --install theme_path     安装一个或多个主题

-r theme_name, --remove theme_name      删除一个或多个主题

-s theme_path, --symlink theme_path     跟 "--install" 命令一样，不过这里是创建一个主题链接而不是复制主题。
                                        对主题开发很有用

-v, --verbose                           详细输出

--version                               打印版本



例子
========


列出已安装的主题
""""""""""""""""""""""""""""

通过 ``pelican-themes`` 命令, 你可以使用 ``-l`` 或 ``--list`` 参数查看可用的主题:

.. code-block:: console

    $ pelican-themes -l
    notmyidea
    two-column@
    simple
    $ pelican-themes --list
    notmyidea
    two-column@
    simple

上面的例子中，我们可以看到有三个主题可用: ``notmyidea`` ， ``simple`` 和 ``two-column`` 。

``two-column`` 末尾带了个 ``@`` 符号，因为这个主题没有被复制到Pelican的主题目录下，而只是对它作了
个链接指向（查看 `创建链接主题`_ 以获取有关创建链接主题的详细信息）。

注意你可以将 ``--list`` 参数跟 ``-v`` 或者 ``--verbose`` 参数结合使用以获得更详细的信息，比如:

.. code-block:: console

    $ pelican-themes -v -l
    /usr/local/lib/python2.6/dist-packages/pelican-2.6.0-py2.6.egg/pelican/themes/notmyidea
    /usr/local/lib/python2.6/dist-packages/pelican-2.6.0-py2.6.egg/pelican/themes/two-column (symbolic link to `/home/skami/Dev/Python/pelican-themes/two-column`)
    /usr/local/lib/python2.6/dist-packages/pelican-2.6.0-py2.6.egg/pelican/themes/simple


安装主题
"""""""""""""""""

你可以使用 ``-i`` 或 ``--install`` 选项安装一个或多个主题。
此选项将要安装的主题的路径作为参数，并且可以与verbose选项结合使用:

.. code-block:: console

    # pelican-themes --install ~/Dev/Python/pelican-themes/notmyidea-cms --verbose

.. code-block:: console

    # pelican-themes --install ~/Dev/Python/pelican-themes/notmyidea-cms\
                               ~/Dev/Python/pelican-themes/martyalchin \
                               --verbose

.. code-block:: console

    # pelican-themes -vi ~/Dev/Python/pelican-themes/two-column


删除主题
"""""""""""""""

``pelican-themes``命令也可以从Pelican主题路径中删除主题。选项 ``-r`` 或 ``--remove`` 将
你想要删除的主题的名称作为参数，并且可以与 ``--verbose`` 选项结合使用。

.. code-block:: console

    # pelican-themes --remove two-column

.. code-block:: console

    # pelican-themes -r martyachin notmyidea-cmd -v





创建链接主题
"""""""""""""""""""""""

除了将整个主题复制到Pelican主题路径外， ``pelican-themes`` 也可以通过创建链接主题来安装主题。

要链接主题，你可以使用 ``-s`` 或 ``--symlink`` 选项，它的用法跟 ``--install`` 一样:

.. code-block:: console

    # pelican-themes --symlink ~/Dev/Python/pelican-themes/two-column

在上面例子中， ``two-column`` 主题被象征性地链接到了Pelican主题路径，
我们可以使用它，还可以修改它，并且不用在每次修改之后都得重新安装它。

这对于主题开发很有用:

.. code-block:: console

    $ sudo pelican-themes -s ~/Dev/Python/pelican-themes/two-column
    $ pelican ~/Blog/content -o /tmp/out -t two-column
    $ firefox /tmp/out/index.html
    $ vim ~/Dev/Pelican/pelican-themes/two-column/static/css/main.css
    $ pelican ~/Blog/content -o /tmp/out -t two-column
    $ cp /tmp/bg.png ~/Dev/Pelican/pelican-themes/two-column/static/img/bg.png
    $ pelican ~/Blog/content -o /tmp/out -t two-column
    $ vim ~/Dev/Pelican/pelican-themes/two-column/templates/index.html
    $ pelican ~/Blog/content -o /tmp/out -t two-column



一次执行几个操作
""""""""""""""""""""""""""""

``--install``, ``--remove`` 和 ``--symlink`` 三个选项相互不冲突，所以你可以在同一命令行中
将它们组合在一起执行多个操作，像这样:


.. code-block:: console

    # pelican-themes --remove notmyidea-cms two-column \
                     --install ~/Dev/Python/pelican-themes/notmyidea-cms-fr \
                     --symlink ~/Dev/Python/pelican-themes/two-column \
                     --verbose

在上面例子中，  ``notmyidea-cms`` 主题被替换为 ``notmyidea-cms-fr``
