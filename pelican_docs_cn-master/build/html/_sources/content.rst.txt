编写内容
###############

文章和页面
==================

在Pelican中，"文章" 是按时间顺序的内容，好比博客中的文章，因此它与日期相关联。

而"页面"则是不经常更改的内容（比如 “关于”页面，或者“联系”页面）。

你可以在Pelican官方库的 ``samples/content/`` 找到相关的范例。

.. _internal_metadata:

文件元数据
=============

Pelican 会自动尝试从文件系统中获取需要的信息（例如你的文章的分类类目），
然而有一些信息仍需要你在文件中以元数据的形式提供。

如果你用reStructuredText格式写文章，你可以通过以下语法在文件内提供元数据
（文件扩展名为 ``.rst`` ）::

    标题标题标题
    ##############

    :date: 2010-10-03 10:20
    :modified: 2010-10-04 18:40
    :tags: thats, awesome
    :category: yeah
    :slug: my-super-post
    :authors: Alexis Metaireau, Conan Doyle
    :summary: 摘要摘要，供索引及feeds用

其中的作者列表Authors和标签列表tags，可以用分号当分隔符，这样单个作者名中或tag中可以包含逗号::

    :tags: pelican, publishing tool; pelican, bird
    :authors: Metaireau, Alexis; Doyle, Conan

Pelican实现扩展支持reStructuredText文件中使用 ``abbr`` HTML标签. 如果要使用的话，在文件中类似下面这样写::

    这里的内容会被编译 :abbr:`HTML (HyperText Markup Language)`.

你还可以用Markdown编写（扩展名为 ``.md``, ``.markdown``, ``.mkd`` 或者 ``.mdown`` 的文件）。
不过需要确保安装了 ``Markdown`` 模块（通过命令 ``pip install Markdown`` 安装）。

Pelican也支持Markdown的扩展 `Markdown Extensions`_ ，如果这些扩展没有被包含在 ``Markdown`` 模块中的话，
则需要单独安装， 安装后可以在  ``Markdown`` 设置中加载。


Markdown中写元数据的语法如下::

    Title: 标题标题
    Date: 2010-12-03 10:20
    Modified: 2010-12-05 19:30
    Category: Python
    Tags: pelican, publishing
    Slug: my-super-post
    Authors: Alexis Metaireau, Conan Doyle
    Summary: 摘要摘要

    正文内容内容

你还可以在python模板中使用自己的元数据关键字（只要它们不与保留的元数据关键字冲突）。 以下是元数据保留关键字列表:

* `Title`
* `Tags`
* `Date`
* `Modified`
* `Status`
* `Category`
* `Author`
* `Authors`
* `Slug`
* `Summary`
* `Template`
* `Save_as`
* `Url`

其他文件格式（如 AsciiDoc_ ）可通过插件获得。 请参阅Pelican官方库中 `pelican-plugins`_ 部分。

Pelican还可以处理以``.html``和``.htm``结尾的HTML文件。 Pelican以非常简单的方式解释HTML，
从 ``meta`` 标签读取元数据，从 ``title`` 标签读取标题，从 ``body`` 标签读取正文::

    <html>
        <head>
            <title>My super title</title>
            <meta name="tags" content="thats, awesome" />
            <meta name="date" content="2012-07-09 22:28" />
            <meta name="modified" content="2012-07-10 20:14" />
            <meta name="category" content="yeah" />
            <meta name="authors" content="Alexis Métaireau, Conan Doyle" />
            <meta name="summary" content="Short version for index and feeds" />
        </head>
        <body>
            This is the content of my super blog post.
        </body>
    </html>

HTML的标准元数据中有一个要注意的地方：标签tag在Pelican标准中是通过 ``tags`` 元数据指定的；
而在HTML标准中则通过 ``keywords`` 元数据指定。这两者可以互换使用。

请注意，除标题必需外，其他元数据都不是必需的：
如果没有指定日期并且 ``DEFAULT_DATE`` 设置为 ``'fs'`` 的话，Pelican将根据文件的 “mtime” 时间戳生成日期；
而分类则会根据文件所在的目录决定。例如，位于 ``python/foobar/myfoobar.rst`` 的文件将被归类为 ``foobar`` 。
如果你不想Pelican用子目录分类，而想以其他方式组织文件，你可以设置 ``USE_FOLDER_AS_CATEGORY`` 设置为 ``False`` 。
在解析日期元数据时，Pelican遵循W3C标准  `suggested subset ISO 8601`__ 。

所以标题是唯一需要的元数据。如果这个也让你不爽，不用担心。
你可以使用文章的文件名作为标题，而不是每次在文件内的元数据部分手动指定。例如，一篇Markdown文章的文件名为 ``Publishing via Pelican.md`` ，
系统自动提取出 *Publishing via Pelican* 作为文章的标题title。
你可以将下面这条语句添加到设置文件中以启用这个功能::

    FILENAME_METADATA = '(?P<title>.*)'

.. note::

   在尝试不同的设置（尤其是元数据设置）时，有可能会受缓存干扰，作的修改可能不见生效。 
   在这种情况下，可以使用 ``LOAD_CONTENT_CACHE = False`` 禁用缓存或
   使用 ``--ignore-cache`` 命令行开关。

__ `W3C ISO 8601`_

``modified`` 记录的应该是你对文章最后的一次更新，如果没有其它指定默认为 ``date`` 。
此外，你可以在模板中显示 ``modified`` ，当你修改文章后将 ``modified`` 设置为当前日期时，
Feed阅读器中的Feed条目将自动更新。

``authors`` 是以逗号分隔的文章作者列表。如果只有一个作者，你可以使用 ``author`` 字段。

如果不想在文件中写摘要提供summary元数据，则可以使用 ``SUMMARY_MAX_LENGTH`` 来设置从文章起始读取多少个字数作
为文章的摘要。

在设置 ``FILENAME_METADATA`` 属性这里，你可以用正则表达式从文件名中提取出元数据。
匹配的所有命名组都将设置在元数据对象中。 ``FILENAME_METADATA`` 设置的默认值是仅从文件名中提取日期。
例如，如果你想提取日期date和slug，你可以这样写： ``'(?P<date>\d{4}-\d{2}-\d{2})_(?P<slug>.*)'``

请注意，文件中可用的元数据优先于从文件名中提取的元数据。

页面
=====

如果在content目录中创建 `pages` 文件夹，所有pages目录中的文件将被生成静态页面，
例如 **关于** 页面或 **联系人** 页面。 （请参阅下面的示例文件系统的布局。）

你可以设置 ``DISPLAY_PAGES_ON_MENU`` 来控制是否在主导航菜单中显示这些页面。（默认为 ``True`` ）

如果你想要某些页面不要在导航菜单中显示或者不要被指向，可以在页面文件的元数据中添加 ``status: hidden`` 属性。
比如制作一个配合主题风格的404静态页面时，就可以给这个页面作这样的设置。

静态内容
==============

静态文件是除了文章和页面之外的文件，这些文件不需要处理，会直接被复制到output输出文件夹。
你可以在项目配置文件 ``pelicanconf.py`` 中的 ``STATIC_PATHS`` 指定静态文件。 
Pelican默认设置了 ``images`` 为静态文件目录，其他目录则需要你手动添加。
此外，还包括明确链接到的静态文件（见下文）。

同一目录中的混合内容
-----------------------------------

从Pelican 3.5开始，静态文件可以安全地与页面源文件共享同一目录，而不会在生成的站点中公开页面源文件。
这种目录必须同时被添加到 ``STATIC_PATHS`` 和 ``PAGE_PATHS`` 
（或者 ``STATIC_PATHS`` 和 ``ARTICLE_PATHS`` ）中。
Pelican将正常识别和处理页面源文件并复制其余文件，就像将其余文件视为是在单独目录中的静态文件一样。

注意：将静态文件和内容源文件放在同一源目录中并不能保证它们最终会在生成的站点中的同一位置。
最简单的方法是使用 ``{attach}`` 链接语法（如下所述）。又或者，
可以设置 ``STATIC_SAVE_AS`` ， ``PAGE_SAVE_AS`` 和 ``ARTICLE_SAVE_AS`` 这三个属性
（以及相应的 ``* _URL`` 属性）将不同类型的文件放在一起，就像早期版本的Pelican一样。

.. _ref-linking-to-internal-content:

链接到内部内容
===========================

从Pelican 3.1开始，可以在 *源内容* 目录结构中指定文件的站点内链接，而不用在 *生成内容* 后的目录结构中指定。 
这样可以更容易地从当前文章链接到可能与该文章相关的其他内容（而不必去确定每次生成站点时那些"其他内容"被放到了哪个目录）。

要链接到内部内容（ ``content`` 目录下的文件）时， 对链接目标使用这样的语法： ``{filename}path/to/file``
注意：在上面的 ``{filename}`` 指令中正斜杠 ``/`` 是所有操作系统（包括Windows）的必需的路径分隔符。

例如，假设一个Pelican项目的目录框架如下::

    website/
    ├── content
    │   ├── category/
    │   │   └── article1.rst
    │   ├── article2.md
    │   └── pages
    │       └── about.md
    └── pelican.conf.py

其中， ``article1.rst`` 内容如下::

    第一篇文章
    #################

    :date: 2012-12-01 10:02

    下面是以reStructuredText格式写的站内链接例子。

    `这是一个相对于当前文件的链接 <{filename}../article2.md>`_
    `这是一个相对于content根目录的链接 <{filename}/article2.md>`_

文件 ``article2.md`` 内容如下::

    Title: 第二篇文章
    Date: 2012-12-01 10:02

    下面是以Markdown格式写的站内链接例子。

    [一个相对于当前文件的链接]({filename}category/article1.rst)
    [一个相对于content根目录的链接]({filename}/category/article1.rst)

链接到固定文件
-----------------------

你可以用这样的语法 ``{static}path/to/file`` 来链接到固定内容。被此语法链接的文件将自动复制到输出目录，
即使包含这些文件的源目录不在 ``pelicanconf.py`` 文件的 ``STATIC_PATHS`` 列表中。

比如，假设一个Pelican项目的content目录框架如下::

    content
    ├── images
    │   └── han.jpg
    ├── pdfs
    │   └── menu.pdf
    └── pages
        └── test.md

``test.md`` 文件包含::

    ![Alt Text]({static}/images/han.jpg)
    [Our Menu]({static}/pdfs/menu.pdf)

则生成网站时，会将文件 ``han.jpg`` 复制到 ``output/images/han.jpg``， 
将文件 ``menu.pdf`` 复制到 ``output/pdfs/menu.pdf``， 然后在 ``test.md`` 写相应的链接。

如果使用 ``{static}`` 链接到文章或页面，会被转换为指向其源代码的链接。

附加静态文件
----------------------

从Pelican 3.5开始，可以使用语法  ``{attach}path/to/file`` 将静态文件作为链接目标“附加”到页面或文章，
其作用跟 ``{static}`` 一样，不同的是它还将静态文件‘重定位’复制到链接源文档的输出目录中。 
如果静态文件原本是在链接源文档所在目录的子目录中，则保留这种目录结构关系，否则静态文件与链接源文档处在同一目录下。

这仅适用于链接到静态文件。

比如，假设一个Pelican项目的content目录框架如下::

    content
    ├── blog
    │   ├── icons
    │   │   └── icon.png
    │   ├── photo.jpg
    │   └── testpost.md
    └── downloads
        └── archive.zip

``pelicanconf.py`` 文件包含::

    PATH = 'content'
    ARTICLE_PATHS = ['blog']
    ARTICLE_SAVE_AS = '{date:%Y}/{slug}.html'
    ARTICLE_URL = '{date:%Y}/{slug}.html'

``testpost.md`` 文件包含::

    Title: Test Post
    Category: test
    Date: 2014-10-31

    ![Icon]({attach}icons/icon.png)
    ![Photo]({attach}photo.jpg)
    [Downloadable File]({attach}/downloads/archive.zip)

站点生成时，会生成如下这样一个output目录框架::

    output
    └── 2014
        ├── archive.zip
        ├── icons
        │   └── icon.png
        ├── photo.jpg
        └── test-post.html

所有被用 ``{attach}`` 语法链接的文件最终被复制到了文章的目录下。

如果有多个链接指向了同一个静态文件，则 ``{attach}`` 的重定位复制功能只在处理第一个链接时起作用。
在处理第一个链接后，Pelican会将其余的 ``{attach}`` 视为 ``{static}`` 。
这样避免破坏之前的链接结构。

**从多个文件链接到同一个文件时要小心：**
由于处理第一个链接时就确定了这个文件最终的位置，而Pelican是不固定处理文档的顺序的，
所以当有多个文档用 ``{attach}`` 链接到同一文件的情况时，这个文件可能会在每次生成站点后位置都不一样。
（实际在实践中是否会发生这种事将取决于操作系统，文件系统，
Pelican的版本以及从项目中添加，修改或删除文档等综合因素。）
这样会导致外部对这个文件的链接指向在站点更新时产生链接错误。
**因此，要对某个文件使用 {attach} ，只有在所有链接都使用 {attach} 并且这些链接源文件都在同一目录中时才建议使用。**
只有这样，这个文件的输出位置才固定不变。如果无法这样做，则可以考虑使用 ``{static}`` 而不是 ``{attach}`` ，
让项目设置中的 ``STATIC_SAVE_AS`` 和 ``STATIC_URL`` 来确定文件的保存位置。 
（每个文件优先的 ``save_as`` 和 ``url`` 覆盖仍然可以在 ``EXTRA_PATH_METADATA`` 中设定。）

链接到作者，分类，索引和标签
----------------------------------------------

可以使用 ``{author}name``， ``{category}foobar`` ， ``{index}`` 和 ``{tag}tagname`` 语法链接到作者，分类，索引和标签。

不推荐使用的内部链接语法
-------------------------------

为了与早期版本保持兼容，Pelican仍然支持在站内链接使用 (``||``) 以及 (``{}``) 。 
例如： ``|filename|an_article.rst`` , ``|tag|tagname`` , ``|category|foobar`` 。
语法从 ``||`` 改为 ``{}`` 是为了避免与Markdown扩展或reST指令冲突。 
同样的，Pelican仍支持使用 ``{filename}`` 链接到静态内容。
现在改为 ``{static}`` 以允许链接指向到生成的文章和页面及其相关的静态源内容。

可能会最终删除对旧语法的支持。


导入现有站点
==========================

可以使用简单的脚本从WordPress，Tumblr，Dotclear和RSS源导入你的站点。请参阅 :ref:`import`.

翻译
============

可以翻译文章。如要此功能，需要在文章/页面的元数据中添加一个 ``lang`` 属性，
并设置项目中 ``DEFAULT_LANG`` 的值（默认为[en]）。
使用这些设置后，显示将只显示出默认语言的文章，而每篇文章将附有一个其他翻译版本的列表。

.. note::

   这个Pelican的核心功能不会为每种语言创建带有翻译模板的子站点
   （例如 ``example.com/de`` ）。 要使用这种高级功能，可以使用 `i18n_subsites
   plugin`_ 插件。

默认情况下，Pelican使用文章URL的"slug"来确定两篇或多篇文章是否是彼此之间的翻译版本。 
（这可以通过设置 ``ARTICLE_TRANSLATION_ID`` 进行更改。）
可以在文件的元数据中手动输入 slug ；如果没有明确设置，Pelican将自动生成文章标题中的slug。

.. note::

    Elvyn注：此处的slug可以理解成一串字符串，作用是作为识别id，比如"pelican-4-cn-translation"，
    在这里的用处就是用来告诉系统拥有同一个slug的某几个文件是相互之间不同的语言翻译版本，而不是不同的博客文章。

以下是两篇文章的例子，一篇用英文，另一篇用法文。

英文文章::

    Foobar is not dead
    ##################

    :slug: foobar-is-not-dead
    :lang: en

    That's true, foobar is still alive!

文章法语版本::

    Foobar n'est pas mort !
    #######################

    :slug: foobar-is-not-dead
    :lang: fr

    Oui oui, foobar est toujours vivant !

可以看到两篇文章中相同的地方只有slug的值，
它在这里起到标识符的作用。 如果不想以这种方式明确定义slug，
则必须确保不同的翻译版本它们的标题相同，因为slug会从文章标题中自动生成。

如果你不希望通过 ``DEFAULT_LANG`` 值来检测哪个特定文章为原始版本的话，
可以在文章中使用 ``translation`` 元数据来指定哪些是翻译版本::

    Foobar is not dead
    ##################

    :slug: foobar-is-not-dead
    :lang: en
    :translation: true

    That's true, foobar is still alive!


.. _internal_pygments_options:

语法高亮
===================

Pelican 可以为代码块提供语法高亮显示。
要使用语法高亮，你需要在你的内容文件中遵循以下约定。

对于reStructuredText格式，使用 ``code-block`` 指令来指定要高亮显示的代码类型
（在下面的示例中我们将使用 ``python`` ）::

    .. code-block:: python

       print("Pelican is a static site generator.")

对于使用了 `CodeHilite extension`_ 扩展来提供语法高亮的Markdown格式，
在代码块上方用语言标识符来注明代码类型，语言标识符跟代码块一样要保持缩进::

    There are two ways to specify the identifier:

        :::python
        print("The triple-colon syntax will *not* show line numbers.")

    To display line numbers, use a path-less shebang instead of colons:

        #!python
        print("The path-less shebang syntax *will* show line numbers.")

语言标识符的标准拼写 (如 ``python`` ， ``ruby``) 参照 `词法分析器lexers列表 <http://pygments.org/docs/lexers/>`_.

用reStructuredText格式时，code-block指令的内容有以下选项:

=============   ============  =========================================
选项             有效值         描述
=============   ============  =========================================
anchorlinenos   N/A           高亮<a>标签中的换行号
classprefix     string        高亮添加到标记类名称的字符串
hl_lines        numbers       高亮显示行列表，其中要高亮显示的行号由空格分
                              隔。类似Sphinx中的 ``emphasisize-lines`` 
                              但不支持由连字符分隔的一系列行号或逗号分
                              隔的行号。
lineanchors     string        使用字符串值和-linenumber包裹锚点中的每一行
linenos         string        为一个"table"输出行号，如果值为"inline"，
                              则在内部输出。 "none"则不输出行号。
linenospecial   number        如果赋值，则每n行将应用css类'special'。
linenostart     number        高亮第一行行号。
linenostep      number        打印每第n行行号。
lineseparator   string        在代码行之间打印字符串，默认值为'\n' 。
linespans       string        使用span带字符串值和-linenumber包裹每一行
nobackground    N/A           如果赋值，则不显示被包裹元素的背景颜色
nowrap          N/A           不允许包裹
tagsfile        string        用于名称定义的ctags文件
tagurlformat    string        ctag链接的格式
=============   ============  =========================================

注意，根据版本不同，上面的选项Pygments模块不一定全部支持， 
有关每个选项的更多详细信息，请参阅 `Pygments 文档 <http://pygments.org/docs/formatters/>`_ 的 *HtmlFormatter* 部分。

例如，以下代码块从153行开始显示行号，并为Pygments的CSS类添加 *pgcss* 前缀，以避免名称跟其他CSS的类名称冲突::

    .. code-block:: identifier
        :classprefix: pgcss
        :linenos: table
        :linenostart: 153

       <indented code block goes here>

也可以在Pelican设置文件中赋值变量 ``PYGMENTS_RST_OPTIONS`` ，其值表示自动应用于每个代码块的选项。

例如，如果想要每个代码块都显示行号并且CSS都带前缀，可以设置为以下值::

    PYGMENTS_RST_OPTIONS = {'classprefix': 'pgcss', 'linenos': 'table'}

如果某代码块有单独的设置，则将覆盖设置文件中的值。

发布草稿
=================

如果要将文章或页面作为草稿发布（例如，在发布之前给朋友核查），可以在文件中的元数据
添加 ``Status: draft`` 属性。该文章将输出到 ``drafts`` 文件夹，并且不会在任何索引页，
分类页或标签页中显示。

如果你想文章自动发布为草稿（以便在完成编写前不会意外地发布出去），请在``DEFAULT_METADATA`` 中赋值::

    DEFAULT_METADATA = {
        'status': 'draft',
    }

而如果要将默认状态为 ``draft`` 的文章发布出去的话，可以给文章添加一项元数据 ``Status: published`` 。

.. _W3C ISO 8601: https://www.w3.org/TR/NOTE-datetime
.. _AsciiDoc: http://www.methods.co.nz/asciidoc/
.. _pelican-plugins: https://github.com/getpelican/pelican-plugins
.. _Markdown Extensions: https://python-markdown.github.io/extensions/
.. _CodeHilite extension: https://python-markdown.github.io/extensions/code_hilite/#syntax
.. _i18n_subsites plugin: https://github.com/getpelican/pelican-plugins/tree/master/i18n_subsites
