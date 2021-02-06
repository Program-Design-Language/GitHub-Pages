.. _theming-pelican:

关于主题
###############

要生成其HTML输出，Pelican使用具有灵活性和语法简单等特点的 `Jinja <http://jinja.pocoo.org/>`_ 模
板引擎。如果你想创建自己的主题，欢迎随时从 `"simple" theme
<https://github.com/getpelican/pelican/tree/master/pelican/themes/simple/templates>`_ 主题中汲取灵感

要使用你创建的（或手动下载后修改的）主题生成网站，可以通过在pelican命令中加 ``-t`` 参数来指定该主题::

    pelican content -s pelicanconf.py -t /projects/your-site/themes/your-theme

如果你不希望在每个调用上指定主题，则可以在 ``THEME`` 变量中设置指向首选主题的位置。


主题框架
=========

要制作你自己的主题，你必须遵循以下的文件结构::

    ├── static
    │   ├── css
    │   └── images
    └── templates
        ├── archives.html         // 显示存档
        ├── period_archives.html  // 显示时间段存档
        ├── article.html          // 应用于每篇文章
        ├── author.html           // 应用于每个作者
        ├── authors.html          // 应用于所有作者
        ├── categories.html       // 列出所有分类
        ├── category.html         // 应用于每个分类
        ├── index.html            // 索引 (列出所有文章)
        ├── page.html             // 应用于每个page页
        ├── tag.html              // 应用于每个标签
        └── tags.html             // 列出所有标签，可以是标签云

* `static` 包含所有静态资源，这些静态资源将被复制到输出目录的 `theme` 文件夹。
  上述文件系统布局中包括CSS文件夹和图像文件夹，但这些只是示例。把你需要的放在这个目录下。

* `templates` 包含将用于生成内容的所有模板。上面列出的模板文件是强制性的；
  创建主题时如果有需要，你可以添加自己的模板文件。


.. _templates-variables:

模板和变量
=======================

其理念是让你可以使用简单的语法嵌入到 HTML 页面中。
本文档描述的是主题中应存在哪些模板，生成站点时会将哪些变量传递给每个模板。

只要设置文件中定义的变量拼写全大写，所有模板都将接收它们。你可以直接访问它们。


常用变量
----------------

所有这些设置将适用于所有模板。

=============   =============================================================
变量             描述
=============   =============================================================
output_file     当前正在生成的文件的名称。例如，当pelican渲染主页，输
                出文件output_file将为 "index.html" 。
articles        文章列表，按日期降序排序。 所有元素都是 `Article` 文章
                对象，因此你可以访问它们的属性（例如标题、摘要、作者
                等）。有时这些信息被隐去（比如在标签页）。不过你可以在 
                所有文章 `all_articles` 变量中找到有关的信息。
dates           同样是文章列表，不过按日期升序排序。
drafts          文章草稿列表。
authors         一个元组tuples（作者，文章）列表，包含所有作者和相应的文章（值）。
categories      一个元组tuples（分类，文章）列表，包含所有分类和相应的文章（值 ）。
tags            一个元组tuples（标签，文章）列表，包含所有标签和相应的文章（值 ）。
pages           pages页面列表
hidden_pages    隐藏的pages页面列表
draft_pages     pages页面草稿列表
=============   =============================================================


排序
-------

URL包装器（当前为分类、标签和作者），内含比较方法，可以很方便地按名称排序::

    {% for tag, articles in tags|sort %}

如果要根据不同的条件进行排序， `Jinja的排序命令`__ 中有许多选项可用。

__ http://jinja.pocoo.org/docs/templates/#sort


格式化日期
---------------

Pelican根据你的设置和区域设置 (``DATE_FORMATS``/``DEFAULT_DATE_FORMAT``) 以及提供一
个 ``locale_date`` 属性以供你对日期进行格式化设置。
另外，日期 ``date`` 属性是一个 `datetime`_ 对象。
如果你要自定义区别于你的设置中的格式的日期格式，请使用Pelican附带的Jinja过滤器 ``strftime`` 。
用法与Python的 `strftime`_ 格式相同，筛选器会根据配置的区域来正确设置你的日期格式::

    {{ article.date|strftime('%d %B %Y') }}

.. _datetime: https://docs.python.org/2/library/datetime.html#datetime-objects
.. _strftime: https://docs.python.org/2/library/datetime.html#strftime-strptime-behavior


模板页index.html
--------------------

这是生成的你的博客主页或索引页 ``index.html`` 。

如果分页功能处于启用状态，则后续的页面将类似 ``index{number}.html`` 这种形式。

======================  ===================================================
变量                     描述
======================  ===================================================
articles_paginator      文章列表的分页对象
articles_page           文章的当前页码
articles_previous_page  文章的前一页(如果页面不存在，则为"无")
articles_next_page      文章的下一页(如果页面不存在，则为"无")
dates_paginator         文章列表的分页对象，按日期升序排序
dates_page              文章的当前页，按日期升序排序。
dates_previous_page     文章的前一页，按日期升序排序(如果页面不存在，则为"无")
dates_next_page         文章的下一页，按日期升序排序(如果页面不存在，则为"无")
page_name               'index' -- 用于分页链接
======================  ===================================================


模板页author.html
-----------------------

此模板将应用于每个作者，根据 ``AUTHOR_SAVE_AS`` 设置 (`默认值:` ``author/{slug}.html``) 生成输出。
如果分页功能处于启用状态，则后续的页面默认类似为 ``author/{slug}{number}.html`` 这种形式。

======================  ===================================================
变量                     描述
======================  ===================================================
author                  作者姓名
articles                作者的文章
dates                   作者的文章，按日期升序排序
articles_paginator      文章列表的分页对象
articles_page           文章的当前页面
articles_previous_page  文章的前一页(如果页面不存在，则为"无")
articles_next_page      文章的下一页(如果页面不存在，则为"无")
dates_paginator         文章列表的分页对象，按日期升序排序
dates_page              文章的当前页，按日期升序排序。
dates_previous_page     文章的前一页，按日期升序排序(如果页面不存在，则为"无")
dates_next_page         文章的下一页，按日期升序排序(如果页面不存在，则为"无")
page_name               AUTHOR_URL 其中 `{slug}` 之后的所有内容都被删除 - 对于分页链接有用
======================  ===================================================


模板页category.html
-----------------------

此模板将应用于每个现有类别，根据 ``CATEGORY_SAVE_AS`` 设置 (`默认值:` ``category/{slug}.html``) 生成输出。
如果分页功能处于启用状态，则后续的页面默认类似为 ``category/{slug}{number}.html`` 这种形式。

======================  ===================================================
变量                     描述
======================  ===================================================
category                分类名
articles                分类文章
dates                   分类的文章，按日期升序排序
articles_paginator      文章列表的分页对象
articles_page           文章的当前页面
articles_previous_page  文章的前一页(如果页面不存在，则为"无")
articles_next_page      文章的下一页(如果页面不存在，则为"无")
dates_paginator         文章列表的分页对象，按日期升序排序
dates_page              文章的当前页，按日期升序排序。
dates_previous_page     文章的前一页，按日期升序排序(如果页面不存在，则为"无")
dates_next_page         文章的下一页，按日期升序排序(如果页面不存在，则为"无")
page_name               CATEGORY_URL 其中 `{slug}` 之后的所有内容都被删除 - 对于分页链接有用
======================  ===================================================


模板页article.html
-----------------------

此模板将应用于每篇文章, 根据 ``ARTICLE_SAVE_AS`` 设置 (`默认值:` ``{slug}.html``) 生成输出。
可以使用以下变量。

=============   ===================================================
变量                     描述
=============   ===================================================
article         显示的文章
category        当前文章的分类名称
=============   ===================================================

在文章源文件头部区域添加的任何元数据都将被视为 ``article`` 对象的字段。
字段名称将与元数据所用的名称相同，不过是采用小写字母形式。

例如，你可以在文章元数据中添加一个 `FacebookImage` 的字段，如下所示:

.. code-block:: markdown

    Title: I love Python more than music
    Date: 2013-11-06 10:06
    Tags: personal, python
    Category: Tech
    Slug: python-je-l-aime-a-mourir
    Author: Francis Cabrel
    FacebookImage: http://franciscabrel.com/images/pythonlove.png

这个新的元数据将作为 `article.facebookimage` 在 `article.html` 模板中提供调用。
例如,这允许你为Facebook的公开图形标签指定一张图片，该图片随每篇文章而不同:

.. code-block:: html+jinja

    <meta property="og:image" content="{{ article.facebookimage }}"/>


模板页page.html
-------------------

此模板将应用于每个page页面，根据 ``PAGE_SAVE_AS`` 设置 (`默认值:` ``pages/{slug}.html``) 生成输出。
可以使用以下变量。

=============   ===================================================
变量                     描述
=============   ===================================================
page            显示的页面对象。你可以访问其标题、slug和内容。
=============   ===================================================


模板页tag.html
------------------

此模板将应用于每个标签tag，根据 ``TAG_SAVE_AS`` 设置 (`默认值:` ``tag/{slug}.html``) 生成输出。
如果分页功能处于启用状态，则后续的页面默认类似为 ``tag/{slug}{number}.html`` 这种形式。

======================  ===================================================
变量                     描述
======================  ===================================================
tag                     标签名称
articles                与此标签相关的文章
dates                   与此标签相关的文章，按日期升序排序
articles_paginator      文章列表的分页对象
articles_page           文章的当前页面
articles_previous_page  文章的前一页(如果页面不存在，则为"无")
articles_next_page      文章的下一页(如果页面不存在，则为"无")
dates_paginator         文章列表的分页对象，按日期升序排序
dates_page              文章的当前页，按日期升序排序。
dates_previous_page     文章的前一页，按日期升序排序(如果页面不存在，则为"无")
dates_next_page         文章的下一页，按日期升序排序(如果页面不存在，则为"无")
page_name               TAG_URL 其中 `{slug}` 之后的所有内容都被删除
======================  ===================================================


模板页period_archives.html
------------------------------

这个模板页面，如果定义了 ``YEAR_ARCHIVE_SAVE_AS`` 的路径，则按年份处理输出文章，
如果定义了 ``MONTH_ARCHIVE_SAVE_AS`` ，则按月份，定义 ``DAY_ARCHIVE_SAVE_AS`` 按天数。

===================     ===================================================
变量                     描述
===================     ===================================================
period                  一个元组tuple( `年` , `月` , `日` )，表示当前时间段。 
                        `年` 和 `日` 格式是数字，而 `月` 是字符串。
                        当时间段给定只有年份时，此元组也才只包含 `年` 。
                        如果时间段给定有年和月等，元组将包含 `年` 和 `月` 。

===================     ===================================================

你可以在 `"simple" 主题的 period_archives.html 模板
<https://github.com/getpelican/pelican/blob/master/pelican/themes/simple/templates/period_archives.html>`_
查看使用 `period` 的示例。


对象
=======

详细说明模板中可用且有用的对象属性。这里并没有列出所有的属性，这里选择性地列出模板中通常会用到的属性。

.. _object-article:

文章
-------

这里'文章'的表述基于 `source_path` 属性的字符串值。

======================  ===================================================
属性                     描述
======================  ===================================================
author                  文章的 :ref:`作者 <object-author_cat_tag>`
authors                 文章的 :ref:`作者 <object-author_cat_tag>` 列表
category                文章的 :ref:`分类 <object-author_cat_tag>`
content                 文章渲染内容
date                    表示文章日期的日期时间对象
date_format             默认日期格式或区域设置日期格式
default_template        默认模板名称
in_default_lang         表示文章是否采用默认语言编写的布尔值
lang                    文章所用语言
locale_date             按 `date_format` 格式化的日期
metadata                文章头部元数据 `dict` 
save_as                 保存文章页的位置
slug                    页面的slug内容
source_path             文章源文件的完整系统路径
relative_source_path    基于 PATH_ 的文章源文件的相对路径
status                  文章状态，可以是'已发布'或'草稿'
summary                 展示的摘要内容
tags                    :ref:`标签 <object-author_cat_tag>` 对象列表
template                使用的模板名称
title                   文章标题
translations            翻译 :ref:`文章 <object-article>` 对象列表
url                     文章页的URL
======================  ===================================================

.. _PATH: settings.html#PATH


.. _object-author_cat_tag:

作者 / 分类 / 标签
-----------------------

这里三个对象的表述基于 `name` 属性的字符串值。

===================     ===================================================
属性                     描述
===================     ===================================================
name                    对象的名称 [1]_.
page_name               作者页面名称
save_as                 保存作者页面的位置
slug                    页面的slug内容
url                     作者页的URL
===================     ===================================================

.. [1] 对于 Author 对象, 来自 `:authors:` or `AUTHOR`.

.. _object-page:

页面Page
----------

这里'页面page'的表述基于 `source_path` 属性的字符串值。

=====================  ===================================================
属性                     描述
=====================  ===================================================
author                 该页 :ref:`作者 <object-author_cat_tag>`
content                页面渲染内容
date                   表示page页日期的日期时间对象
date_format            默认日期格式或区域设置日期格式
default_template       默认模板名称
in_default_lang        表示文章是否采用默认语言编写的布尔值
lang                   文章所用语言
locale_date            按 `date_format` 格式化的日期
metadata               文章头部元数据 `dict` 
save_as                保存page页的位置
slug                   page页的slug内容
source_path            page页源文件的完整系统路径
relative_source_path   基于 PATH_ 的page页源文件的相对路径
status                 page页状态，可以是'已发布'、'隐藏'或'草稿'
summary                展示的摘要内容
tags                   :ref:`标签 <object-author_cat_tag>` 对象列表
template               使用的模板名称
title                  page页标题
translations           翻译 :ref:`文章 <object-article>` 对象列表
url                    page页的URL
=====================  ===================================================

.. _PATH: settings.html#PATH


Feeds订阅源
============

feed变量在版本3.0中发生更改。每个变量现在都在名称中明确指出是ATOM还是RSS。
ATOM仍然是默认值。旧主题需要对此进行更新。
下面是feed变量的一个完整列表::

    FEED_ATOM
    FEED_RSS
    FEED_ALL_ATOM
    FEED_ALL_RSS
    CATEGORY_FEED_ATOM
    CATEGORY_FEED_RSS
    AUTHOR_FEED_ATOM
    AUTHOR_FEED_RSS
    TAG_FEED_ATOM
    TAG_FEED_RSS
    TRANSLATION_FEED_ATOM
    TRANSLATION_FEED_RSS


继承
===========

3.0版本开始，Pelican支持从 ``simple`` 主题继承，因此你可以在自己的主题中继承使用 ``simple`` 主题模板。

如果丢失了主题的 ``templates/`` 目录下的某个必需文件，pelican会使用 ``simple`` 主题中的匹配模板文件来替换。
所以如果你觉得 ``simple`` 主题的HTML框架模板合适可用，你就不用从头开始编写新模板。

你还可以用 ``{% extends %}`` 指令从 ``simple`` 主题扩展模板来自定义你自己的主题，请看以下示例:

.. code-block:: html+jinja

    {% extends "!simple/index.html" %}   <!-- extends the ``index.html`` template from the ``simple`` theme -->

    {% extends "index.html" %}   <!-- "regular" extending -->


例子
-------

使用此系统，可以仅用两个文件就创建主题。

base.html
"""""""""

第一个文件是 ``templates/base.html`` 模板文件:

.. code-block:: html+jinja

    {% extends "!simple/base.html" %}

    {% block head %}
    {{ super() }}
       <link rel="stylesheet" type="text/css" href="{{ SITEURL }}/theme/css/style.css" />
    {% endblock %}

1. 第一行，我们从 ``simple`` 主题中扩展出 ``base.html`` 模板，就不必重写整个文件。
2. 第三行，我们调用头部 ``head`` 区块，这里已经在 ``simple`` 主题被定义过。
3. 第四行，函数 ``super()`` 保留了先前插入到头部 ``head`` 区块的内容。
4. 第五行，我们在此页面附加一个样式表文件。
5. 最后一行，依照代码规则关闭 ``head`` 块.

所有其他的模板文件都会调用这个文件，所以里面的CSS样式表文件也可以应用到所有其他页面。

style.css
"""""""""

第二个文件是 ``static/css/style.css`` CSS 样式表文件:

.. code-block:: css

    body {
        font-family : monospace ;
        font-size : 100% ;
        background-color : white ;
        color : #111 ;
        width : 80% ;
        min-width : 400px ;
        min-height : 200px ;
        padding : 1em ;
        margin : 5% 10% ;
        border : thin solid gray ;
        border-radius : 5px ;
        display : block ;
    }

    a:link    { color : blue ; text-decoration : none ;      }
    a:hover   { color : blue ; text-decoration : underline ; }
    a:visited { color : blue ;                               }

    h1 a { color : inherit !important }
    h2 a { color : inherit !important }
    h3 a { color : inherit !important }
    h4 a { color : inherit !important }
    h5 a { color : inherit !important }
    h6 a { color : inherit !important }

    pre {
        margin : 2em 1em 2em 4em ;
    }

    #menu li {
        display : inline ;
    }

    #post-list {
        margin-bottom : 1em ;
        margin-top : 1em ;
    }

下载
""""""""

你可以从 :download:`这里 <https://docs.getpelican.com/en/stable/_downloads/theme-basic.zip>` 下载这个范例主题。
