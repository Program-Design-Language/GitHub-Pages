使用技巧
########

以下是一些可能对你有用的pelican使用技巧

自定义404页面
================

当浏览器发出一个资源请求但Web服务器找不到该资源时，服务器通常会显示一个通用
的 "未找到文件"（404）的错误页面，这个页面内容很明确，不过有时可能很直接而显得不太美观。 
要提供一个跟你的网站主题相匹配的404错误页面，其中一种方法是创建自定义404页面（注意 *不是* 一篇文章），
例如下面这个保存在 ``content/pages/404.md`` 中的Markdown格式例文::

    Title: Not Found
    Status: hidden
    Save_as: 404.html

    找不到相关项目，也许你可以查看 [存档页](/archives.html)?

下一步是配置Web服务器在出404错误时显示这个自定义页面而不是默认的404页面。 
对于Nginx，在配置文件的 ``location`` 区域添加以下内容::

    error_page 404 /404.html;

对于 Apache::

    ErrorDocument 404 /404.html

对于Amazon S3，先在AWS cosole上导航到存储桶设置中的 ``静态站点托管`` 菜单，再从那里设置::

    Error Document: 404.html

发布到GitHub
====================

`GitHub Pages <https://help.github.com/categories/20/articles>`_ 提供了一种简单方便
的方式来发布Pelican网站。 其中有 `两种类型的页面 
<https://help.github.com/articles/user-organization-and-project-pages>`_ 可选：
项目页面 *Project Pages* 和用户页面 *User Pages* 。 Pelican站点即可以作为项目页面也可以作为用户页面发布。

项目页面
-------------

要将一个Pelican站点发布为项目页面，你需要将Pelican生成的 ``output`` 目录的内容推送 *push* 到
GitHub上某个repo库的 ``gh-pages`` 分支中。

`ghp-import <https://github.com/davisp/ghp-import>`_ 工具是个优秀的导入内容到gh-pages的工具，要以
用 ``pip`` 命令安装，有了这个工具上面提到的推送内容过程会变得非常简单。

例如，如果你的Pelican站点的源内容包含在一个GitHub库repo中，并且你希望以这个库的项目页面的形式发布该网站，
则可以使用以下命令::

    $ pelican content -o output -s pelicanconf.py
    $ ghp-import output -b gh-pages
    $ git push origin gh-pages

``ghp-import output`` 命令用于更新本地的库中 ``gh-pages`` 分支的 ``output`` 目录的内容更（如果
这个分支不存在则会先创建它）。 ``git push origin gh-pages`` 命令的作用则是将内容推送到远程的 ``gh-pages`` 分
支进行更新以发布Pelican站点。

.. note::

    用 ``pelican-quickstart`` 命令初始化时自动生成的两个文件，其中Makefile中的 ``github`` 目
    标（以及 ``tasks.py`` 中的  ``gh_pages`` 任务） 都默认是指将站点发布为项目页面的，如上面例子所述。

用户页面
----------

要以用户页面的形式发布Pelican站点，你需要先在你的GitHub上建立 ``<username>.github.io`` 这个库，
然后将Pelican生成的站点的 ``output`` 目录中的内容推送 *push* 到这个库的 ``master`` 主分支中。

同样的，我们还是可以用 ``ghp-import`` 命令来操作推送::

    $ pelican content -o output -s pelicanconf.py
    $ ghp-import output -b gh-pages
    $ git push git@github.com:elemoine/elemoine.github.io.git gh-pages:master

先用 ``ghp-import`` 命令更新本地的分支，再用 ``git push`` 命令将本地分支推送
到GitHub上 ``elemoine.github.io`` 库的 ``master`` 分支。

.. note::

    要将Pelican站点发布为用户页面，请设置调整Makefile文件中的 ``github`` 值。
    
发布到用户页面的另一个选项是在项目的根目录中生成输出文件。

例如，你的主项目文件夹是 ``<username>.github.io`` ，你可以在其中新建一个名为 ``Pelican`` 的
子目录用于创建Pelican项目。 然后在 ``Pelican`` 文件夹下运行::
    
    $ pelican content -o .. -s pelicanconf.py

现在，你可以将整个项目 ``<username>.github.io`` 推送到GitHub库的主分支中::
    
    $ git push origin master
    
（假设你已经将origin设置为远程的库了）。

自定义404页面
----------------

GitHub页面将显示上面内容中我们自定义的404页面，
如相关的 `GitHub文档 <https://help.github.com/articles/custom-404-pages/>`_ 中所述。

每次提交都更新你的网站
-------------------------------

要在每次提交时自动更新Pelican站点，你可以创建一个提交后-勾子。 
例如，你可以在 ``.git/hooks/post-commit`` 中添加以下内容::

    pelican content -o output -s pelicanconf.py && ghp-import output && git push origin gh-pages

将静态文件复制到站点的根目录
------------------------------------------

想将GitHub Pages绑定到 `个人域名 <https://help.github.com/articles/setting-up-a-custom-domain-with-pages>`_ 
的话，你需要你的网站根目录下的 ``CNAME`` 文件中填写好你的网站域名（例如 ``blog.example.com`` ）。
即，创建 ``content/extra/`` 目录并在目录下添加一个 ``CNAME`` 文件（注意，文件全名就是CANME，无扩展名）。
然后设置 ``STATIC_PATHS`` 告诉Pelican将此文件复制到输出目录output目录中。 例如::

    STATIC_PATHS = ['images', 'extra/CNAME']
    EXTRA_PATH_METADATA = {'extra/CNAME': {'path': 'CNAME'},}

注意：使用正斜杠， ``/`` ，即使在Windows系统也是。

你还可以在任意站点的根目录下放置 ``favicon.ico`` 网站图标文件或 ``robots.txt`` 网站针对蜘蛛的设置文件
然后在 ``EXTRA_PATH_METADATA`` 设置中添加这些文件。

如何添加YouTube视频或Vimeo视频
==================================

最简单的方法是复制这些网站的视频的嵌入代码直接粘贴到你的源文件内容中。

或者，你也可以使用像 ``liquid_tags`` 、 ``pelican_youtube`` 或 ``pelican_vimeo`` 这样
的Pelican插件将视频嵌入到你的内容中。

甚至，你还可以用标记语言的插件，reST和Markdown等标记语言都有插件可以让你在内容中添加视频。
你可以在reST格式文件中使用 `reST视频命令 <https://gist.github.com/dbrgn/2922648>`_ 或者
在Markdown格式文件中使用 `mdx_video插件 <https://github.com/italomaia/mdx-video>`_ 。


使用SSL在本地开发
==================================

以下是如何设置本地pelican服务器以支持SSL。

首先，使用 ``openssl`` 创建一份自签名证书和一份密钥（即创建 ``cert.pem`` 和 ``key.pem`` 两个文件）::

    $ openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

用以下命令启动服务器（服务器在 ``output`` 目录中启动）::

    python -m pelican.server 8443 --key=../key.pem --cert=../cert.pem

如果你用 ``develop-server.sh`` ，则将下面两行内容添加到该文件顶部::

    CERT="$BASEDIR/cert.pem"
    KEY="$BASEDIR/key.pem"

并照如下修改 ``pelican.server`` ::

    $PY -m pelican.server $port --ssl --cert="$CERT" --key="$KEY" &