常见问题（FAQ）
################################

以下是一些关于Pelican的常见问题

沟通问题，疑问或建议的最佳方式是什么？
======================================================================

请查阅 :doc:`反馈指南 <contribute>`.

我如何提供帮助
===============

有几种方法可以提供帮助。 首先，你可以通过IRC（首选）
或 `问题跟踪 <https://github.com/getpelican/pelican/issues>`_ 报告你的Pelican建议或问题。
提交问题报告之前，请首先检查现有问题列表（包括正讨论的和已关闭的），以避免提交重复问题。

如果你想贡献代码，请fork一下这个 `the git repository <https://github.com/getpelican/pelican/>`_ ，
创建一个新的分支，对其进行修改，然后发出一个pull请求。会有人尽快审核你的代码。
有关更多详细信息，请参阅 :doc:`如何贡献 <contribute>` 部分。

你还可以通过创建主题和改进文档来做出贡献。

Pelican设置文件是强制性必需的吗？
=======================================

配置文件是可选的，其只是配置Pelican的一个简单方法。
对于基本操作，可以在通过命令行调用Pelican时指定选项。 更多信息，请参阅 ``pelican --help`` 。

对设置文件的修改不起作用
===========================================

在尝试不同的设置（尤其是元数据设置）时，有可能会受缓存干扰，作的修改可能不见生效。 
在这种情况下，可以使用 ``LOAD_CONTENT_CACHE = False`` 禁用缓存或
使用 ``--ignore-cache`` 命令行开关。


我在创建自己的主题。 如何使用Pygments进行语法高亮显示？
=========================================================================

Pygments为生成的内容添加了一些类。 主题使用这些类通过CSS来设置代码语法高亮显示的样式。
具体来说，你可以通过主题CSS文件中的 ``.highlight pre`` 类来自定义语法高亮显示的外观。
例如，要查看各种样式如何用于呈现Django代码，
请使用 `Pygments项目演示站点 <http://pygments.org/demo/>`_ 右上角的样式选择器下拉菜单选择

你可以使用以下命令从Pygments内置样式（在本例中为 "monokai" ）生成初始CSS文件，
然后将生成的CSS文件复制到你的新主题::

    pygmentize -S monokai -f html -a .highlight > pygment.css
    cp pygment.css path/to/theme/static/css/

记得要在CSS主文件中导入你的 ``pygment.css`` 文件。

我如何创建自己的主题？
=============================

请参阅 :ref:`theming-pelican`.

我想使用Markdown，但是我收到了一个错误。
===========================================

如果你没有先安装Markdown库就尝试生成Markdown内容的话，
可能会看到 ``No valid files found in content`` 的错误提示。
Markdown不是Pelican的硬依赖项，所以如果你有Markdown格式的内容，你需要确定你安装了Markdown库。 
你可以通过键入以下命令来执行安装，如果提示权限需要，则在前面加上 ``sudo``::

    pip install markdown

我可以在模板中使用任意元数据吗？
=============================================

可以的。例如，要在Markdown帖子中包含修改日期，可以在文章顶部包含以下内容::

    Modified: 2012-08-08

对于reStructuredText，此元数据则应以冒号为前缀::

    :Modified: 2012-08-08

然后你就可以通过如下示例的语句在诸如 ``article.html`` 之类的模板文件中访问此元数据啦::

    {% if article.modified %}
    Last modified: {{ article.modified }}
    {% endif %}

如果你想在文章上下文之外的模板中包含元数据（例如，``base.html`` ），则 ``if`` 语句应该这样写::

    {% if article and article.modified %}

我该如何基于每个页面分配自定义模板？
=====================================================

想要每页有其自己的模板就跟在页面或文章中额外添加一行元数据一样简单。 例如，以下是reST格式的内容处理方式::

    :template: template_name

对于Markdown格式的内容::

    Template: template_name

然后只需要确保你的主题包含相关的模板文件就行了（例如 ``template_name.html`` ）。

如何覆盖特定页面或文章的生成URL？
===================================================================

在要覆盖生成的URL的页面或文章中包含 ``url`` 和 ``save_as`` 元数据。 以下是一个reST格式的示例页面::

    Override url/save_as page
    #########################

    :url: override/url/
    :save_as: override/url/index.html

使用此元数据，页面将写入 ``override/url/index.html`` ，Pelican将使用 ``override/url/`` 链接到此页面。

如何使用静态页面作为我的主页？
============================================

上面提到的覆盖功能可用于将静态页面指定为主页。 
以下的Markdown示例可以存储在 ``content/pages/home.md``::

    Title: Welcome to My Site
    URL:
    save_as: index.html

    Thank you for visiting. Welcome!

如果仍然需要原本的博客索引，则可以通过为 ``'index'`` 直接模
板设置 ``INDEX_SAVE_AS = 'blog_index.html'`` 将其保存在不同的位置。

如果我想禁用Feed生成怎么弄？
==========================================

要禁用Feed生成，应将所有Feed设置设置为 ``None`` 。 
除了三个Feed设置之外的所有设置都默认为 ``None`` ，因此如果要禁用所有Feed生成，只需设置以下变量::

    FEED_ALL_ATOM = None
    CATEGORY_FEED_ATOM = None
    TRANSLATION_FEED_ATOM = None
    AUTHOR_FEED_ATOM = None
    AUTHOR_FEED_RSS = None

``None`` 这个值不需要用引号括起来。 请注意 ``None`` 和 ``''`` 不是一回事。

我收到关于在没有正确设置SITEURL的情况下生成Feed的警告
==============================================================================

`RSS和Atom订阅要求所有URL链接都是绝对地址 <http://validator.w3.org/feed/docs/rss2.html#comments>`_ 
为了在Pelican中正确生成链接，你需要将 ``SITEURL`` 设置为站点的完整路径。

显示此警告时仍会生成Feeds源，但内部链接可能格式不正确，因此也可能无法验证这个feed。

自从我升级到Pelican 3.x后，我的Feed被乱套了
===================================================

从3.0开始，一些FEED设置名称更改了，要更明确地引用它们固有的Atom源（非常类似于FEED_RSS设置名称）。
以下是重命名设置的确切列表::

    FEED -> FEED_ATOM
    TAG_FEED -> TAG_FEED_ATOM
    CATEGORY_FEED -> CATEGORY_FEED_ATOM

从3.1 开始，Pelican引入了新的源 ``FEED_ALL_ATOM`` : 这个源变量将不分语言聚合所有帖子。
默认情况下，此设置将生成 ``'feeds/all.atom.xml'`` ，而 ``FEED_ATOM`` 现在也默认为 ``None`` 。
下面的feed设置也已重命名::

    TRANSLATION_FEED -> TRANSLATION_FEED_ATOM

引用旧的设置名称的旧主题可能无法正确链接。
为了纠正这种情况,请通过更改模板文件中的相关值来更新你的主题的兼容性。
有关完整的feed头部信息和使用的示例，请查看 ``simple`` 主题。

Pelican只适合博客吗？
===================================

不呀。你可以轻松配置Pelican来创建和维护任何类型的静态站点。
这可能需要对主题和Pelican配置进行一些自定义。
例如，如果你要为产品构建一个启动网站并且不需要有标签，你可以从主题中删除相关的HTML代码。
你还可以通过以下设置来禁用生成与标签相关的页面::

    TAGS_SAVE_AS = ''
    TAG_SAVE_AS = ''

为什么即使启用了内容缓存，Pelican也总是写入所有HTML文件？
===============================================================================

为了在写入之前可靠地确定HTML输出是否不同，必须保存和比较包括模板上下文，导入的插件等在
内的大部分生成环境，至少以哈希的形式进行比较（其中又要对不可以用哈希比较的类型进行特殊处理）
因为涉及的插件，分页等组合可能会以许多不同的方式改变。所以这将需要更多的处理时间、内存和存储空间。
简单地每次重写文件反而要快得多，而且更可靠。

但是，这意味着文件的修改时间每次都变，
所以如果用 ``rsync`` 的话，即使内容没变，也会上传它们。 
有个简单的解决方案是使用 ``rsync`` 的 ``--checksum`` 选项，
这将使它以比Pelican更快的方式比较文件校验。

当只有几个特定的输出文件时（例如，当处理某些特定页面或主题模板时），也可以使用 `WRITE_SELECTED` 选
项，请参阅 :ref:`writing_only_selected_content` 。

如何只处理所有文章的子集？
=============================================

出于调试目的，仅处理例如10篇文章通常很有用。
这可以通过在 ``ARTICLE_PATHS`` 中仅明确指定文章的文件名来实现。
可以使用类似于 ``cd content; find -name '*.md' | head -n 10`` 的命令找到这样的文件名列表。

升级Pelican后，我的标签云就丢失/损坏了
=======================================================

在改进Pelican的过程中，我们将 `tag_cloud` 功能从Pelican的核心功能中移除了，它现在变成
一个单独的 `插件 <https://github.com/getpelican/pelican-plugins/tree/master/tag_cloud>`_ 
有关Pelican插件系统的更多信息，请参阅 :ref:`plugins` 文档。

升级Pelican后，我的页面渲染不出来了
========================================================

页面可以用小写的 ``pages`` 和大写的 ``PAGES`` 。
为了使这个符合 :ref:`templates-variables` 部分， Pelican删除了 ``PAGES`` 。 
通过更新主题来迭代将 ``pages`` 替换掉 ``PAGES`` 可以很快解决这个问题。 只需要将::

    {% for pg in PAGES %}

替换成::

    {% for pg in pages %}

如何阻止Pelican尝试将我的静态文件解析为内容？
=======================================================================

Pelican的文章和page页生成器是先于静态生成器运行的。 
这意味着如果你使用类似于默认配置的设置，其中在 ``*_PATHS`` 设置中定义了静态源目录，
则所有具有有效的内容文件扩展名的文件（ ``.html`` ， ``.rst`` ， ``.md`` ，...）都将先
被视为文章或page页处理而不是当成静态文件。

要规避这个问题，要么使用合适的 ``*_EXCLUDES`` 设置，要么通过 ``READERS`` 禁用有
问题的阅读器（如果你不需要用到它）。
+