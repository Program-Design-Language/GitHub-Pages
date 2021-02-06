设置选项
########

可以通过命令行给Pelican指定一份设置文件，用以配置Pelican::

    pelican content -s path/to/your/pelicanconf.py

如果你初始化用的是 ``pelican-quickstart`` 命令, 你的主配置文件默认名将为 ``pelicanconf.py``

.. note::

   在尝试不同的设置（尤其是设置元数据）时，有可能会受缓存干扰，作的修改可能不见生效。 
   这种情况下，可以使用 ``LOAD_CONTENT_CACHE = False`` 禁用缓存或
   使用 ``--ignore-cache`` 命令行开关。 

设置文件是以Python模块（一个文件）的方式进行配置，这里有一份 
`示例设置文件
<https://github.com/getpelican/pelican/raw/master/samples/pelican.conf.py>`_ 
供参考

要查看环境中的当前设置列表（包括默认值和任何自定义值），
请运行以下命令（将一个或多个特定的设置关键字名称附加为参数以查看这些设置的值）::

    pelican --print-settings

所有设置的标识符必须全部大写，否则不会被处理。
设置数字（5,20等），布尔值（True，False，None等），
字典或元组的值 *不* 应该用引号括起来。所有其他值（即字符串） *必须* 用引号括起来。

除非另有说明，否则引用路径的设置可以是绝对路径，也可以是相对于配置文件的相对路径。
在配置文件中定义的设置将传递给模板，进而应用于设置站点范围的内容。

以下为Pelican设置项列表:


基本设置
==============

.. data:: USE_FOLDER_AS_CATEGORY = True

   如果不想在文章中的元数据中指定分类，请将此设置设为 ``True``，并用子目录来放置组织
   你的文章，如此这些子目录将成为你的网站文章的分类。如果设置值 为 ``False``，则会根
   据 ``DEFAULT_CATEGORY`` 中的值来设置。

.. data:: DEFAULT_CATEGORY = 'misc'

   默认的分类属性（备用用）

.. data:: DISPLAY_PAGES_ON_MENU = True

   是否在模板菜单上显示页面。 模板可能会也可能不会遵循此设置。

.. data:: DISPLAY_CATEGORIES_ON_MENU = True

   是否在模板菜单上显示分类。 模板可能会也可能不会遵循此设置。

.. data:: DOCUTILS_SETTINGS = {}

   设置docutils发布者的额外配置（仅适用于reStructuredText）。 有关详细信息，请参
   阅 `Docutils Configuration`_ 。 

.. data:: DELETE_OUTPUT_DIRECTORY = False

   在生成新站点之前，删除文件输出output目录以及其中 **所有** 内容, 这可以用于防止
   旧的，不必要的文件长期保留在output目录中。但是， **这是一种破坏性的设置，应该特
   别小心对待。**

.. data:: OUTPUT_RETENTION = []

   值为一个文件名列表，表示在output目录中的这些/这类文件将被保留不会删除。
   其中一个用法是保存版本控制数据。

   示例::

      OUTPUT_RETENTION = [".hg", ".git", ".bzr"]

.. data:: JINJA_ENVIRONMENT = {'trim_blocks': True, 'lstrip_blocks': True}

   给使用的Jinja2自定义环境变量，还可以包含使用的扩展列表，
   详情参照 `Jinja Environment documentation`_

.. data:: JINJA_FILTERS = {}

   给使用的Jinja2自定义过滤器，字典类型。
   数据为过滤器名称对应过滤器函数。

   示例::

    JINJA_FILTERS = {'urlencode': urlencode_filter}

   参考 `Jinja custom filters documentation`_

.. data:: LOG_FILTER = []

   包含日志记录级别（最高为"warning"）和要忽略的消息的元组列表。

   示例::

      LOG_FILTER = [(logging.WARN, 'TAG_SAVE_AS is set to False')]

.. data:: READERS = {}

   Pelican要处理或忽略的文件扩展名或Reader类。

   例如, 为了避免处理.html文件，设置::

      READERS = {'html': None}

   为 ``foo`` 扩展添加自定义阅读器，设置::

      READERS = {'foo': FooReader}

.. data:: IGNORE_FILES = ['.#*']

   一个全局模式列表。 处理器将忽略这里匹配出的文件和目录。
   例如，默认值 ``['.#*']`` 表示将忽略emacs锁定文件，
   而 ``['__pycache__']`` 表示忽略Python 3的缓存文件。

.. data:: MARKDOWN = {...}

   Markdown处理器的额外配置。 有关支持的选项的完整列表，请参阅Python Markdown文档
   的 `选项部分 <https://python-markdown.github.io/reference/#markdown>`_ 。
   ``extensions`` 选项将从 ``extension_configs`` 选项中自动计算出来

   默认为::

        MARKDOWN = {
            'extension_configs': {
                'markdown.extensions.codehilite': {'css_class': 'highlight'},
                'markdown.extensions.extra': {},
                'markdown.extensions.meta': {},
            },
            'output_format': 'html5',
        }

   .. Note::
      在设置文件中赋值会覆盖这里的默认值。

.. data:: OUTPUT_PATH = 'output/'

   定义生成的文件的保存路径

.. data:: PATH

   Pelican要处理的内容目录的路径。
   如果未定义，并且没有通过 ``pelican`` 命令的参数指定路径，
   Pelican将使用当前的工作目录。

.. data:: PAGE_PATHS = ['pages']

   '页面'的目录和文件列表，为相对于 ``PATH`` 的相对路径。

.. data:: PAGE_EXCLUDES = []

   除了 ``ARTICLE_PATHS`` 之外，在查找'页面'时要排除的目录列表。

.. data:: ARTICLE_PATHS = ['']

   '文章'的目录和文件列表, 为相对于 ``PATH`` 的相对路径。

.. data:: ARTICLE_EXCLUDES = []

   除了 ``PAGE_PATHS`` 之外，在查找'文章'时要排除的目录列表。

.. data:: OUTPUT_SOURCES = False

   如果要将文章和页面以其原始格式（例如Markdown或reStructuredText）复制到指
   定的  ``OUTPUT_PATH`` ，则设置为True。

.. data:: OUTPUT_SOURCES_EXTENSION = '.text'

   控制SourcesGenerator将使用的扩展名。 默认为 ``.text`` 。 
   如果不是有效字符串，则将使用默认值。

.. data:: PLUGINS = []

   加载的插件列表。参考 :ref:`plugins`.

.. data:: PLUGIN_PATHS = []

   查找插件的目录列表. 参考 :ref:`plugins`.

.. data:: SITENAME = 'A Pelican Blog'

   你的站点名称

.. data:: SITEURL

   你的网站的基本网址。默认情况下为未定义，因此最好指定你的网站URL；如果不指定，
   则不能使用格式正确的URL生成订阅源。如果你的网站可以通过HTTPS访问，这里的值
   应该以 ``https://`` 开头，否则以 ``http://`` 开头。 然后加上你的域名，最后没有斜杠。
   示例: ``SITEURL = 'https://example.com'``

.. data:: STATIC_PATHS = ['images']

   一个用于存放静态文件的目录列表 (相对于 ``PATH`` ) 。这些文件会直接被复制到output
   目录而不作修改，通常会跳过文章，页面和其他内容源文件，所以同一个目录出现在这里和
   ``PAGE_PATHS`` 或 ``ARTICLE_PATHS`` 是没问题的。默认值为"images" 目录

.. data:: STATIC_EXCLUDES = []

   在查找静态文件时要排除的目录列表。

.. data:: STATIC_EXCLUDE_SOURCES = True

   如果设置为False，则在复制 ``STATIC_PATHS`` 中找到的文件时不会跳过内容源文件。
   此设置用于向后兼容3.5版之前的Pelican版本。
   除非 ``STATIC_PATHS`` 包含一个同样位于 ``ARTICLE_PATHS`` 或 ``PAGE_PATHS`` 的
   目录，不然此设置不会生效。如果你尝试发布站点的源文件，
   请考虑使用 ``OUTPUT_SOURCES`` 设置。

.. data:: STATIC_CREATE_LINKS = False

   为静态文件创建链接而不是复制文件。如果content目录和output目录位于同一设备上，
   则创建硬链接。 如果这两个目录在不同的文件系统上，用符号链接。如果创建了符号链接，
   记得在上传站点时向rsync添加 ``-L`` 或 ``--copy-links`` 选项。

.. data:: STATIC_CHECK_IF_MODIFIED = False

   如果设置为 ``True`` ，并且 ``STATIC_CREATE_LINKS`` 为 ``False`` ，
   则比较内容和输出文件的mtimes时间戳，只复制比现有输出文件更新的内容文件。

.. data:: TYPOGRIFY = False

   如果设置为True, 则通过 `Typogrify <https://pypi.python.org/pypi/typogrify>`_ 库
   将几个排版改进合并到生成的HTML中，
   Typogrify库可以用这句命令安装: ``pip install typogrify`` 。

.. data:: TYPOGRIFY_IGNORE_TAGS = []

   要忽略的Typogrify标记列表。默认情况下，Typogrify将忽略 ``pre`` 和 ``code`` 标签。 
   这需要安装Typogrify版本2.0.4或更高版本

.. data:: SUMMARY_MAX_LENGTH = 50

   创建文章摘要时的字数，默认50（以单词测量）。这仅适用于你的内容未另外指定摘要的情况。
   设置为 ``None`` 的话将使摘要成为原始内容的副本。

.. data:: WITH_FUTURE_DATES = True

   如果禁用，则在文件中指定日期为未来的日期时会使文件默认状态为草稿 ``draft`` 。
   参考 :ref:`reading_only_modified_content` 

.. data:: INTRASITE_LINK_REGEX = '[{|](?P<what>.*?)[|}]'

   用于解析内部链接的正则表达式。链接到内部文件，标签等时的默认语法是
   在 ``{}`` 或 ``||`` 中包含标识符，比如 ``filename`` 。 ``{`` 和 ``}`` 之
   间的标识符进入 ``what`` 捕获组。详情见 :ref:`ref-linking-to-internal-content`.

.. data:: PYGMENTS_RST_OPTIONS = []

   reStructuredText代码块的默认Pygments（语法高亮）设置列表。
   请参阅 :ref:`internal_pygments_options` 以获取支持的选项列表。

.. data:: SLUGIFY_SOURCE = 'title'

   指定从中里自动生成slug内容。 可以设置为 ``title`` 以使用'Title：'元数据标签
   或者使用 ``basename`` 以使用文章的文件名来创建slug。

.. data:: CACHE_CONTENT = False

   如果设置 ``True``, 则将内容保存在缓存中。有关缓存的详细信息，
   参考 :ref:`reading_only_modified_content` 。

.. data:: CONTENT_CACHING_LAYER = 'reader'

   如果设为 ``'reader'`` , 则仅保存阅读器返回的原始内容和元数据。
   如果设为 ``'generator'``, 则保存已处理的内容对象。

.. data:: CACHE_PATH = 'cache'

   用于存储缓存文件的目录。

.. data:: GZIP_CACHE = True

   如果设为 ``True``, 使用gzip来压缩/解压缩缓存文件。

.. data:: CHECK_MODIFIED_METHOD = 'mtime'

   控制如何检查对文件的修改。

.. data:: LOAD_CONTENT_CACHE = False

   如果设为 ``True``, 从缓存中加载未修改的内容。

.. data:: WRITE_SELECTED = []

   如果列表不为空, 则 **只** 写入此列表中列出的路径的输出文件。
   路径应该是当前Pelican工作目录的绝对路径或相对路径。
   有关可能的用法示例，请参阅 :ref:`writing_only_selected_content`.

.. data:: FORMATTED_FIELDS = ['summary']

   包含要解析并转换为HTML的reST / Markdown内容的元数据字段列表。

.. data:: PORT = 8000

   当运行pelican命令带参数 --listen时，启动的web服务的端口

.. data:: BIND = ''

   要绑定HTTP服务器的IP。


URL设置
============

首先要了解的是，目前有两种URL的形成方法： *相对地址* 和 *绝对地址* 。 
在本地测试时，相对URL非常方便，而绝对URL在发布时则最可靠且最有用。 
支持两者的一种方法是将一个Pelican配置文件用于本地开发，另一个用于发布。 
要查看此类设置的示例，请使用 :doc:`安装Pelican <install>` 部分中描述
的 ``pelican-quickstart`` 脚本，该脚本将分别为本地开发和发布生成两个单独的配置文件。

你可以自定义保存文件的URL和位置。 ``*_URL`` 和 ``*_SAVE_AS`` 变量使用Python的格式字符串。 
这些变量允许你将文章放在诸如 ``{slug}/index.html`` 之类的位置，
并将它们链接为 ``{slug}`` 以获得干净的URL（参见下面的示例）。 
通过这些设置，你可以灵活地将文章和页面放置在任何位置。

.. note::
    如果指定一个 ``datetime`` 指令， 则将使用输入文件元数据中的日期的值来替换它。
    如果没有为特定文件指定日期， Pelican将依赖文件的 ``mtime`` 时间戳
    有关更多信息，请查看 `Python datetime documentation`_ 。

.. _Python datetime documentation:
    https://docs.python.org/2/library/datetime.html#strftime-and-strptime-behavior

另外，你也可以使用其他的文件元数据的属性:

* slug
* date
* lang
* author
* category

用法示例::

   ARTICLE_URL = 'posts/{date:%Y}/{date:%b}/{date:%d}/{slug}/'
   ARTICLE_SAVE_AS = 'posts/{date:%Y}/{date:%b}/{date:%d}/{slug}/index.html'
   PAGE_URL = 'pages/{slug}/'
   PAGE_SAVE_AS = 'pages/{slug}/index.html'

这会将你的文章保存成类似这样的形式 ``/posts/2011/Aug/07/sample-post/index.html`` ,
将页面保存为 ``/pages/about/index.html`` , 并且在 
``/posts/2011/Aug/07/sample-post/`` 和 ``/pages/about/`` 这两个URL中渲染展示。

.. data:: RELATIVE_URLS = False

   定义 Pelican 是否使用相对文档URL。
   只有在开发/测试时,并且只有在你完全了解它对链接/feed源的影响时,才将其设置为 ``True`` 。

.. data:: ARTICLE_URL = '{slug}.html'

   要引用的文章的URL。

.. data:: ARTICLE_SAVE_AS = '{slug}.html'

   保存文章的位置。

.. data:: ARTICLE_LANG_URL = '{slug}-{lang}.html'

   用于引用非默认语言文章的URL。

.. data:: ARTICLE_LANG_SAVE_AS = '{slug}-{lang}.html'

   保存非默认语言文章的位置。

.. data:: DRAFT_URL = 'drafts/{slug}.html'

   要引用的文章草稿的URL。

.. data:: DRAFT_SAVE_AS = 'drafts/{slug}.html'

   保存文章草稿的位置。

.. data:: DRAFT_LANG_URL = 'drafts/{slug}-{lang}.html'

   用于引用非默认语言文章草稿的URL。

.. data:: DRAFT_LANG_SAVE_AS = 'drafts/{slug}-{lang}.html'

   保存非默认语言文章草稿的位置。

.. data:: PAGE_URL = 'pages/{slug}.html'

   来链接到pages页面的URL。

.. data:: PAGE_SAVE_AS = 'pages/{slug}.html'

   保存pages页面的位置。这里的值必须与 PAGE_URL 的值相同，否则你将需要在服务器配置中重写。

.. data:: PAGE_LANG_URL = 'pages/{slug}-{lang}.html'

   用来链接到非默认语言的pages页面的 URL。

.. data:: PAGE_LANG_SAVE_AS = 'pages/{slug}-{lang}.html'

   保存非默认语言pages页面的位置。

.. data:: DRAFT_PAGE_URL = 'drafts/pages/{slug}.html'

   链接到pages页面草稿的URL。

.. data:: DRAFT_PAGE_SAVE_AS = 'drafts/pages/{slug}.html'

   保存pages页面草稿的位置。

.. data:: DRAFT_PAGE_LANG_URL = 'drafts/pages/{slug}-{lang}.html'

   链接到非默认语言pages页面草稿的URL。

.. data:: DRAFT_PAGE_LANG_SAVE_AS = 'drafts/pages/{slug}-{lang}.html'

   保存非默认语言pages页面草稿的位置。

.. data:: AUTHOR_URL = 'author/{slug}.html'

   链接到作者页的URL。

.. data:: AUTHOR_SAVE_AS = 'author/{slug}.html'

   保存作者页的位置。

.. data:: CATEGORY_URL = 'category/{slug}.html'

   链接到分类页的URL。

.. data:: CATEGORY_SAVE_AS = 'category/{slug}.html'

   保存分类页的位置。

.. data:: TAG_URL = 'tag/{slug}.html'

   链接到标签页的URL。

.. data:: TAG_SAVE_AS = 'tag/{slug}.html'

   保存标签页的位置。

.. note::

    如果你不希望创建一个或多个默认页面(例如,你是网站上的唯一作者,因此不需要作者页面),
    请相应地将 ``*_SAVE_AS`` 设置设置为 ``''`` ,以防止生成相关页面。

Pelican 可以根据选择将文章以年份、月份或哪天来创建存档。
默认情况下,这些辅助存档处于禁用状态, 但如果为它们各自的 ``_SAVE_AS`` 提供格式字符串,
则会自动启用。这些周期存档的层级会直观地与网页URL的层级一样,使读者能够更轻松地浏览你积累写下的文章。

示例::

   YEAR_ARCHIVE_SAVE_AS = 'posts/{date:%Y}/index.html'
   MONTH_ARCHIVE_SAVE_AS = 'posts/{date:%Y}/{date:%b}/index.html'

通过上面两行设置，Pelican 将在（假设年份是2018年） ``posts/2018/index.html`` 创建
你当年所有帖子的存档，并在 ``posts/2018/Aug/index.html`` 创建你八月所有帖子的存档。

.. note::
    周期存档网址最好以 ``index.html`` 结尾。这样访问者可以删除修改网址部分信息就能
    适当地转到某个存档，而不用指定页面名称。

.. data:: YEAR_ARCHIVE_URL = ''

   按年份归类的帖子存档的访问 URL。仅当在 ``PAGINATION_PATTERNS`` 中设置
   有 ``{url}`` 占位符时才使用。

.. data:: YEAR_ARCHIVE_SAVE_AS = ''

   按年份保存的帖子存档的位置。

.. data:: MONTH_ARCHIVE_URL = ''

   按月份归类的帖子存档的访问 URL。仅当在 ``PAGINATION_PATTERNS`` 中设置
   有 ``{url}`` 占位符时才使用。

.. data:: MONTH_ARCHIVE_SAVE_AS = ''

   按月份保存的帖子存档的位置。

.. data:: DAY_ARCHIVE_URL = ''

   按天数归类的帖子存档的访问 URL。仅当在 ``PAGINATION_PATTERNS`` 中设置
   有 ``{url}`` 占位符时才使用。

.. data:: DAY_ARCHIVE_SAVE_AS = ''

   按天数保存的帖子存档的位置。

``DIRECT_TEMPLATES`` 的工作方式与上面提到的有点不同。只有 ``_SAVE_AS`` 设置可用,
但可用于任何直接模板。

.. data:: ARCHIVES_SAVE_AS = 'archives.html'

   保存文章存档页的位置。

.. data:: AUTHORS_SAVE_AS = 'authors.html'

   保存作者列表的位置。

.. data:: CATEGORIES_SAVE_AS = 'categories.html'

   保存分类列表的位置。

.. data:: TAGS_SAVE_AS = 'tags.html'

   保存标签列表的位置。

.. data:: INDEX_SAVE_AS = 'index.html'

   保存所有文章列表的位置。

直接模板页的 URL 与主题相关。某些主题用字符串设置相应的 ``*_URL``，而
其他主题则将这些页面硬编码为： ``'archives.html'``, ``'authors.html'``, 
``'categories.html'``, ``'tags.html'`` 。

.. data:: SLUG_REGEX_SUBSTITUTIONS = [
        (r'[^\\w\\s-]', ''),  # 删除非字母字符/空白符/'-'符号
        (r'(?u)\\A\\s*', ''),  # 删除前面的空白符
        (r'(?u)\\s*\\Z', ''),  # 删除末尾的空白符
        (r'[-\\s]+', '-'),  # 将多个空格或"-"减少为一个"-"
    ]

   在生成文章页和pages页的 slug 时进行的正则替换。
   指定为按顺序应用的 ``(from, to)`` 格式的列表,忽略大小写。
   默认替换设置为删除非字母数字字符并将内部空白转换为破折号。
   除了这些替换之外,slug内容将始终转换为小写 ascii 字符,
   删除前面和末尾空格。用于向后兼容 URL格式。

.. data:: AUTHOR_REGEX_SUBSTITUTIONS = SLUG_REGEX_SUBSTITUTIONS

   替换作者slugs内容的正则。默认值为 ``SLUG_REGEX_SUBSTITUTIONS`` 。

.. data:: CATEGORY_REGEX_SUBSTITUTIONS = SLUG_REGEX_SUBSTITUTIONS

   替换分类slugs内容的正则。默认值为 ``SLUG_REGEX_SUBSTITUTIONS``.

.. data:: TAG_REGEX_SUBSTITUTIONS = SLUG_REGEX_SUBSTITUTIONS

   替换标签slugs内容的正则。默认值为 ``SLUG_REGEX_SUBSTITUTIONS``.

时间和日期
=============

.. data:: TIMEZONE

   日期信息中使用的时区,用于生成 Atom 和 RSS 源。

   如果不定义时区，则默认假定为 UTC。这意味着,如果你的区域设置不是 UTC, 则生成
   的 Atom 和 RSS 源将包含不正确的日期信息。

   如果此设置未定义，Pelican会发出警告， 因为在之前版本中此项设置是非强制性的。

   查看 `the wikipedia page`_ 以获取有效时区值的列表。

.. _the wikipedia page: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

.. data:: DEFAULT_DATE = None

   要使用的默认日期。  如果设为 ``'fs'``, Pelican在无法从元数据获取到日期信息时会
   使用文件系统的时间戳信息 (mtime) 。如果给定任何其他字符串，Pelican则使用解析文章
   元数据的方法来解析此字符串。如果设置为tuple对象,则通过将tuple传递
   给 ``datetime.datetime`` 构造函数来生成默认的日期对象。

.. data:: DEFAULT_DATE_FORMAT = '%a %d %B %Y'

   设置默认日期格式

.. data:: DATE_FORMATS = {}

   如果你管理多种语言,则可以在此处设置日期格式。

   如果 ``DATE_FORMATS`` 未设置，Pelican将回退使用 ``DEFAULT_DATE_FORMAT`` 的设置。
   如果需要维护多种语言对应的不同日期格式，可以在这里用语言名称（即文章中
   的元数据 ``lang`` 的值）作为字典的key。

   除了 `Python strftime documentation`_ 中列出的标准C89 strftime格式代码外，还
   可以在 ``%`` 和格式化字符之间加 ``-`` 字符来删除前导的数字0。例如, 
   ``%d/%m/%Y`` 将输出 ``01/01/2014`` ，而  ``%-d/%-m/%Y`` 则将输出为 ``1/1/2014`` 。

   .. parsed-literal::

       DATE_FORMATS = {
           'en': '%a, %d %b %Y',
           'jp': '%Y-%m-%d(%a)',
       }

   还可以用 ``(locale, format)`` 格式的tuple元组作为字典的值来设置每种语言的
   不同区域设置，这样的话会覆盖 ``LOCALE`` 设置:

   .. parsed-literal::

      # On Unix/Linux
      DATE_FORMATS = {
          'en': ('en_US','%a, %d %b %Y'),
          'jp': ('ja_JP','%Y-%m-%d(%a)'),
      }

      # On Windows
      DATE_FORMATS = {
          'en': ('usa','%a, %d %b %Y'),
          'jp': ('jpn','%Y-%m-%d(%a)'),
      }

.. data:: LOCALE

   更改区域设置 [#]_ 。可以在此处提供一个区域列表,也可以提供表示区域的单个字符串。
   如果提供的是列表，将一个一个尝试直到某个区域设置正常工作。

   你可以将区域设置设置为进一步控制日期格式:

   .. parsed-literal::

       LOCALE = ('usa', 'jpn',      # On Windows
                 'en_US', 'ja_JP'   # On Unix/Linux
      )

   有关可用区域设置的列表,windows系统请参阅 `locales on Windows`_  ,
   Unix/Linux系统可以使用 ``locale -a`` 命令查看， 有关详细信息,请参
   阅 `locale(1)`_ 。


.. [#] 默认为系统区域.

.. _Python strftime documentation: https://docs.python.org/library/datetime.html#strftime-strptime-behavior

.. _locales on Windows: http://msdn.microsoft.com/en-us/library/cdax410z%28VS.71%29.aspx

.. _locale(1): https://linux.die.net/man/1/locale


.. _template_pages:

模板页
==============

.. data:: TEMPLATE_PAGES = None

   一个包含了 和博客条目一起渲染展示的模板页面 的映射。请参阅 :ref:`template_pages` 。

   如果要生成博客条目以外的自定义页面，可以使用任何 Jinja2 模板文件，只要给其指定
   指向该文件的路径和生成该文件的目标路径。

   例如,如果你想给博客建三个静态页面 (一个读书列表页、一个个人简历页和联系人页面)，
   你可以像这样::

       TEMPLATE_PAGES = {'src/books.html': 'dest/books.html',
                         'src/resume.html': 'dest/resume.html',
                         'src/contact.html': 'dest/contact.html'}

.. data:: TEMPLATE_EXTENSIONS = ['.html']

   从模板名称查找模板文件时使用的扩展名。

.. data:: DIRECT_TEMPLATES = ['index', 'authors', 'categories', 'tags', 'archives']

   直接用于呈现内容的模板列表。
   通常，直接模板用于生成内容集合的索引页(例如类别和标记索引页)。
   如果不需要作者、类别和标记等集合页，可以设置 ``DIRECT_TEMPLATES = ['index', 'archives']``

   系统会从 ``THEME_TEMPLATES_OVERRIDES`` 维护的路径值中搜索 ``DIRECT_TEMPLATES`` 。


元数据
========

.. data:: AUTHOR

   默认作者名 (通常为你的名字).

.. data:: DEFAULT_METADATA = {}

   应用到所有文章和页面的默认元数据项。

.. data:: FILENAME_METADATA = r'(?P<date>\d{4}-\d{2}-\d{2}).*'

   从文件名中提取元数据的正则表达式。系统将在元数据对象中设置这些被匹配到的命名组。
   默认值设为仅从文件名中提取日期。

   例如,如果要提取日期和slug内容::

      FILENAME_METADATA = r'(?P<date>\d{4}-\d{2}-\d{2})_(?P<slug>.*)'

   另外可以参阅 ``SLUGIFY_SOURCE``.

.. data:: PATH_METADATA = ''

   类似于 ``FILENAME_METADATA`` ，不过这里是从 相对于内容源目录的页面的完整路径 中解析。

.. data:: EXTRA_PATH_METADATA = {}

   由相对路径作为key，额外元数据作为值的字典值。
   相对路径要求使用基于操作系统的正确的目录分隔符(即UNIX中的 / 和Windows中的 \\ ),
   与Pelican其他某些文件的设置不同。目录路径应用于目录下的所有文件。
   指定最明确的路径最优先。

并非所有元数据都要求要 :ref:`嵌入到源文件中 <internal_metadata>` ，例如，一般
博客文章通常以 ``YYYY-MM-DD-SLUG.rst`` 这样的方式命名，或者嵌套在 ``YYYY/MM/DD-SLUG`` 目录
中，如要从文件名或路径中提取元数据，可以用Python的组命名表示法  `group name notation`_ 中
的 ``(?P<name>…)`` 在 ``FILENAME_METADATA`` 或者 ``PATH_METADATA`` 中设置正则表达式。
如果要附加其他元数据但又不想在路径中对其进行编码，可以设置 ``EXTRA_PATH_METADATA`` :

.. parsed-literal::

    EXTRA_PATH_METADATA = {
        'relative/path/to/file-1': {
            'key-1a': 'value-1a',
            'key-1b': 'value-1b',
            },
        'relative/path/to/file-2': {
            'key-2': 'value-2',
            },
        }

这是用于移动某个特定文件的安装位置的便捷方法:

.. parsed-literal::

    # 利用以下默认值
    # STATIC_SAVE_AS = '{path}'
    # STATIC_URL = '{path}'
    STATIC_PATHS = [
        'static/robots.txt',
        ]
    EXTRA_PATH_METADATA = {
        'static/robots.txt': {'path': 'robots.txt'},
        }

.. _group name notation:
   https://docs.python.org/3/library/re.html#regular-expression-syntax


Feed订阅设置
=============

默认情况下,Pelican使用 Atom 源。如果你喜欢, 也可以使用 RSS 源。

Pelican会为你的所有文章生成分类订阅源和所有文章订阅源。默认不生成标签订阅源，不过可以
用 ``TAG_FEED_ATOM`` 和 ``TAG_FEED_RSS`` 来设置生成:

.. data:: FEED_DOMAIN = None, i.e. base URL is "/"

   域名用于添加到订阅源地址前面。
   由于源URL应该始终是一个绝对地址，所以强烈建议设置此变量 (例如,"https://feeds.example.com")。
   如果你已经显式定义了SITEURL(见上文)并且希望对feeds订阅使用相同的域名，
   则可以设置为: ``FEED_DOMAIN = SITEURL`` 。

.. data:: FEED_ATOM = None, i.e. no Atom feed

   用于保存Atom源的位置。

.. data:: FEED_ATOM_URL = None

   Atom源的相对URL地址，如果不设置，则用 ``FEED_ATOM`` 的值来表示Atom源的位置和URL地址。

.. data:: FEED_RSS = None, i.e. no RSS

   用于保存RSS源的位置。

.. data:: FEED_RSS_URL = None

   RSS源的相对URL地址，如果不设置，则用 ``FEED_RSS`` 的值来表示RSS源的位置和URL地址。

.. data:: FEED_ALL_ATOM = 'feeds/all.atom.xml'

   用于保存'所有文章'的Atom源的位置: 这个订阅源将包括所有的文章帖子，且不区分语言版本。

.. data:: FEED_ALL_ATOM_URL = None

   '所有文章'的Atom源的相对URL地址，如果不设置，则用 ``FEED_ALL_ATOM`` 的值来表
   示这个Atom源的位置和URL地址。

.. data:: FEED_ALL_RSS = None, i.e. no all-posts RSS

   用于保存'所有文章'的RSS源的位置: 这个订阅源将包括所有的文章帖子，且不区分语言版本。

.. data:: FEED_ALL_RSS_URL = None

   '所有文章'的RSS源的相对URL地址，如果不设置，则用 ``FEED_ALL_RSS`` 的值来表
   示这个RSS源的位置和URL地址。

.. data:: CATEGORY_FEED_ATOM = 'feeds/{slug}.atom.xml'

   用于保存 分类Atom源 的位置。 [2]_

.. data:: CATEGORY_FEED_ATOM_URL = None

   分类Atom源的相对URL地址, 包含 ``{slug}`` 占位符。 [2]_ 如果不设置,
   则用 ``CATEGORY_FEED_ATOM`` 的值来表示其位置和URL地址。

.. data:: CATEGORY_FEED_RSS = None, i.e. no RSS

   用于保存 分类RSS源 的位置。包含 ``{slug}`` 占位符 [2]_

.. data:: CATEGORY_FEED_RSS_URL = None

   分类RSS源的相对URL地址, 包含 ``{slug}`` 占位符。 [2]_ 如果不设置,
   则用 ``CATEGORY_FEED_RSS`` 的值来表示其位置和URL地址。

.. data:: AUTHOR_FEED_ATOM = 'feeds/{slug}.atom.xml'

   用于保存 作者Atom源 的位置。 [2]_

.. data:: AUTHOR_FEED_ATOM_URL = None

   作者Atom源的相对URL地址, 包含 ``{slug}`` 占位符。 [2]_ 如果不设置,
   则用 ``AUTHOR_FEED_ATOM`` 的值来表示其位置和URL地址。

.. data:: AUTHOR_FEED_RSS = 'feeds/{slug}.rss.xml'

   用于保存 作者RSS源 的位置。 [2]_

.. data:: AUTHOR_FEED_RSS_URL = None

   作者RSS源的相对URL地址, 包含 ``{slug}`` 占位符。 [2]_ 如果不设置,
   则用 ``AUTHOR_FEED_RSS`` 的值来表示其位置和URL地址。

.. data:: TAG_FEED_ATOM = None, i.e. no tag feed

   用于保存 标签Atom源 的位置， 包含 ``{slug}`` 占位符 [2]_

.. data:: TAG_FEED_ATOM_URL = None

   标签Atom源的相对URL地址, 包含 ``{slug}`` 占位符。
   [2]_

.. data:: TAG_FEED_RSS = None, i.e. no RSS tag feed

   标签RSS源的相对URL地址, 包含 ``{slug}`` 占位符。如果不设置,
   则用 ``TAG_FEED_RSS`` 的值来表示其位置和URL地址。

.. data:: FEED_MAX_ITEMS

   订阅源的条目的最大数，默认不设限制。

.. data:: RSS_FEED_SUMMARY_ONLY = True

   仅在RSS源的 ``description`` 标记中包含摘要。
   如果设置为 ``False`` ，则将改为包含全部内容。
   此设置不会影响 Atom 源,仅影响 RSS 源。

如果不想生成订阅源，以上变量值设为 ``None`` 即可。

.. [2] ``{slug}`` 替换为 分类/作者/标签 的名称。


分页
==========

Pelican的默认行为是列出所有文章标题以及索引页上的简短说明。
这适用于中小型网站，具有大量文章的网站则对其进行分页可能会更好些。

你可以使用以下设置来配置分页。

.. data:: DEFAULT_ORPHANS = 0

   最后一页列出的文章数量的最小值。如果你不希望最后一页仅列出寥寥几篇文章时，可以设置此选项。

.. data:: DEFAULT_PAGINATION = False

   每页所列出的文章数量的最大值，不包括上面的ORPHANS单独页。
   设置 False 为禁用分页。

.. data:: PAGINATED_TEMPLATES = {'index': None, 'tag': None, 'category': None, 'author': None}

   设置各个模板块是否单独使用分布以及每页显示的文章数。
   如果这一项的值为 ``None`` ，则默认为 ``DEFAULT_PAGINATION`` 的值。

.. data:: PAGINATION_PATTERNS = (
      (1, '{name}{extension}', '{name}{extension}'),
      (2, '{name}{number}{extension}', '{name}{number}{extension}'),)

   用于确定高级分页输出的一组模式。


使用分页模式
-------------------------

默认情况下，  ``.../foo.html``  之后的页面将创建为 ``.../foo2.html`` 等。
可以使用 ``PAGINATION_PATTERNS`` 设置来更改此设置。
设置需要一个包含三个参数的序列， 这三个参数是::

  (minimum_page, page_url, page_save_as,)

对于 ``page_url`` 和 ``page_save_as`` ，你可以使用许多变量。
``{url}`` 和 ``{save_as}`` 分别对应相应的页面类型（例如 ``ARTICLE_SAVE_AS`` ）
的 ``*_URL`` 和 ``*_SAVE_AS`` 值。
如果 ``{save_as} == foo/bar.html`` ，则表示 ``{name} == foo/bar`` 并且 ``{extension}
== .html`` 。 ``{base_name}`` 相当于  ``{name}`` 只不过如果末尾有 ``/index`` 的话它会
自动将其删掉。 ``{number}`` 相当于页码。

例如, 如果要保持第一页不变, 但将后续页面放在 ``.../page/2/`` 等位置, 你可以如下所
示设置 ``PAGINATION_PATTERNS`` ::

  PAGINATION_PATTERNS = (
      (1, '{url}', '{save_as}`,
      (2, '{base_name}/page/{number}/', '{base_name}/page/{number}/index.html'),
  )


翻译
============

Pelican 提供了一种翻译文章的方法。请参阅 :doc:`编写内容 <content>` 部分了解更多信息。

.. data:: DEFAULT_LANG = 'en'

   使用的默认语言。

.. data:: ARTICLE_TRANSLATION_ID = 'slug'

   标识哪些文章是彼此的翻译版本的元数据属性。
   可以是字符串或字符串集合。设置为 ``None`` 或 ``False`` 以禁用翻译标识。

.. data:: PAGE_TRANSLATION_ID = 'slug'

   标识哪些pages页是彼此的翻译版本的元数据属性。
   可以是字符串或字符串集合。设置为 ``None`` 或 ``False`` 以禁用翻译标识。

.. data:: TRANSLATION_FEED_ATOM = 'feeds/all-{lang}.atom.xml'

   用于翻译的Atom订阅源的保存位置。 [3]_

.. data:: TRANSLATION_FEED_ATOM_URL = None

   用于翻译的Atom源的相对URL，包含 ``{lang}`` 占位符。 [3]_ 
   如果不设置，则用 ``TRANSLATION_FEED_ATOM`` 的值作为保存位置和URL地址。

.. data:: TRANSLATION_FEED_RSS = None, i.e. no RSS

   用于翻译的RSS订阅源的保存位置。

.. data:: TRANSLATION_FEED_RSS_URL = None

   用于翻译的RSS源的相对URL，包含 ``{lang}`` 占位符。 [3]_ 
   如果不设置，则用 ``TRANSLATION_FEED_RSS`` 的值作为保存位置和URL地址。

.. [3] {lang} 是指语言代码


整理内容
================

.. data:: NEWEST_FIRST_ARCHIVES = True

   按日期排序存档，最新的排最前。（False: 按旧文章排前的顺序。）

.. data:: REVERSE_CATEGORY_ORDER = False

   反转分类的排序。（True: 列表按字母倒序排序；默认列表按字母顺序排序。）

.. data:: ARTICLE_ORDER_BY = 'reversed-date'

   定义文章（模板中的 ``articles_page.object_list`` ）的排序方式。 
   有效选项有：元数据作为字符串（使用 ``reversed-`` 前缀，则反向排序），
   特殊选项 ``'basename'`` 将使用文件基本的名称（没有路径）或自定义函数从文章中提取排序的key。 
   默认值 ``'reversed-date'`` 将基于日期按相反的顺序对文章进行排序（即最新的文章排前头）。

.. data:: PAGE_ORDER_BY = 'basename'

   定义pages页(模板中的 ``pages`` 变量)的排序方式。
   可选项与上面的 ``ARTICLE_ORDER_BY`` 相同。 
   默认值 ``'basename'`` 将按页面基本的名称来排序。



主题
======

我们有一章专门的章节讨论Pelican主题。(查看 :ref:`theming-pelican` ）
不过，以下这些是与主题相关的设置。

.. data:: THEME

   生成输出的主题。
   可以是主题文件夹的相对路径或绝对路径，也可以是默认主题的名称
   或是通过 ``pelican-themes`` 安装的主题(见下文)。

.. data:: THEME_STATIC_DIR = 'theme'

   在输出路径中的一个目录，此目录供Pelican放置从 `THEME_STATIC_PATHS` 中收集的文件。
   默认值为 `theme` 。

.. data:: THEME_STATIC_PATHS = ['static']

   要复制的静态主题路径。
   默认值为 `static` ，但如果你的主题有其他静态路径，你可以将它们标明在这里。
   如果在这里定义的路径中包含有相同名称的文件或目录，这些文件或目录会被一步一步覆盖掉。

.. data:: THEME_TEMPLATES_OVERRIDES = []

   搜索模板，你希望Jinja2在搜索主题的 ``templates/`` 目录之前所要搜索其他路径的一个列表。 
   这样允许你重写单个主题的模板文件，而无需将主题fork过来。 Jinja2的搜索顺序如下: 
   先搜索 ``THEME_TEMPLATES_OVERRIDES`` 中的文件，再搜索主题的 ``templates/`` 。

   你还可以使用 ``{% extends %}`` 指令，以 ``!theme`` 为前缀来扩展主题中的模板，
   如以下示例所示:

   .. parsed-literal::

      {% extends '!theme/article.html' %}

.. data:: CSS_FILE = 'main.css'

   指定要加载的 CSS 文件。

默认情况下，有两个主题可用。你可以设置 ``THEME`` 指定它们或者
在 ``pelican`` 命令中用 ``-t`` 参数来设定:

* notmyidea
* simple (a synonym for "plain text" :)

在这个地址有许多其他主题 https://github.com/getpelican/pelican-themes. 
Pelican附带 :doc:`pelican-themes` ，一个用于管理主题的小脚本。

你可以定义自己的主题，不管是从头开始创建，还是复制别人的主题来修改。
这里有 :doc:`主题相关指南 <themes>` 。

以下是指定首选主题的示例方法::

    # 指定内置主题的名称
    THEME = "notmyidea"
    # 指定通过pelican-themes工具安装的主题的名称
    THEME = "chunk"
    # 通过相对于设置文件的路径指定一个自定义主题
    THEME = "themes/mycustomtheme"
    # 通过绝对路径指定自定义主题
    THEME = "/home/myuser/projects/mysite/themes/mycustomtheme"

内置的 ``notmyidea`` 主题可以作以下设置。
你也可以在你的主题设置中用它们。

.. data:: SITESUBTITLE

   在头部header显示一个副标题

.. data:: DISQUS_SITENAME

   Pelican可以处理Disqus的评论。在此处指定Disqus站点名称的标识符。

.. data:: GITHUB_URL

   你的GitHub地址(如果有的话)。然后它将使用此信息创建一个GitHub功能区。
   Your GitHub URL (if you have one). It will then use this information to
   create a GitHub ribbon.

.. data:: GOOGLE_ANALYTICS

   设置为 ``UA-XXXXX-Y`` 属性的跟踪ID以激活 Google 分析。

.. data:: GA_COOKIE_DOMAIN

   设置谷歌分析跟踪代码的 Cookie 域字段。默认为 ``auto`` 。

.. data:: GOSQUARED_SITENAME

   设置为 'XXX-YYYYYY-X' 以激活 GoSquared。

.. data:: MENUITEMS

   一个其他菜单项的列表，列表中的值为元组tuple（Title，URL)，用于显示在主菜单的开头。

.. data:: PIWIK_URL

   指向Piwik服务器的URL - 开头没有 'http://' 。

.. data:: PIWIK_SSL_URL

   如果SSL-URL与普通Piwik-URL不同，则也必须包含此设置。(可选)

.. data:: PIWIK_SITE_ID

   被监视网站的 ID。你可以在 Piwik 管理界面 > 设置 > 网站中找到该ID。

.. data:: LINKS

   
   一个列表，列表中的值为元组tuple（Title，URL)，用于在头部header显示链接。

.. data:: SOCIAL

   一个显示在"社交"部分的元组tuples(Title, URL)列表。

.. data:: TWITTER_USERNAME

   允许向文章添加按钮以鼓励其他人分享此文章发推。
   如果你希望显示此按钮，请设置添加你的Twitter用户名。

.. data:: LINKS_WIDGET_NAME

   允许重命名链接小部件。 如果未指定，则默认值为 "links" 。

.. data:: SOCIAL_WIDGET_NAME

   允许重命名"社交"小部件。 如果未指定，则默认值为 "social" 。

另外， 你可以在设置中添加下面一行语句以使用 ``notmyidea`` 主题的"宽屏"版本::

    CSS_FILE = "wide.css"


日志
=======

有时,在生成网站时可能会出现许多警告信息。
在大量恼人的日志中找到**有意义的**错误消息可能相当棘手。
为了过滤掉冗余日志消息，Pelican 附带了 ``LOG_FILTER`` 设置。

``LOG_FILTER`` 应为一个列表，其中的值为元组tuples ``(level, msg)`` ,
每个元组由日志级别（最高为 ``warning`` ）和要忽略的消息组成。
只需要将想隐藏掉的消息填进这个列表，它们就会被过滤掉。

例如::
    
   import logging
   LOG_FILTER = [(logging.WARN, 'TAG_SAVE_AS is set to False')]

可以通过模板来筛选消息。可以去查看源代码获取其中的模板。

例如::

   import logging
   LOG_FILTER = [(logging.WARN, 'Empty alt attribute for image %s in %s')]

.. Warning::

   按模板来过滤信息是项危险的操作。
   有可能会无意中筛选掉具有相同模板的多个消息类型（包括未来的pelican版本的信息）
   所以要小心对待。

.. note::

    如果传递了 ``--debug`` 参数，则此选项不执行任何操作。

.. _reading_only_modified_content:


仅读取已修改的内容
=============================

为了加快构建过程，Pelican可以选择只读取修改过的文章和页面。

当Pelican即将读取某些内容源文件时:

1. 如果 ``LOAD_CONTENT_CACHE`` 值为 ``True`` ，则从缓存文件中加载来自先前构建版
   本的文件的哈希信息或修改时间信息。这些文件存储在 ``CACHE_PATH`` 目录中。 
   如果文件在缓存文件中没有记录，则照常读取该文件。
2. 根据 ``CHECK_MODIFIED_METHOD`` 的设置来检查文件:

    - 如果设为 ``'mtime'``, 则检查文件的修改时间。
    - 如果设置为由 ``hashlib`` 模块提供的某个函数的名称，比如  ``'md5'`` ，
      则检查文件哈希值。
    - 如果设置为任何其他内容或在缓存文件中找不到有关该文件的必要信息，则内容将照常读取。

3. 如果系统认为文件未经修改过，则从缓存加载以前生成时保存的内容数据，并且不会读取该文件。
4. 如果系统认为文件被修改过，则读取该文件，如果 ``CACHE_CONTENT`` 的值为 ``True`` ，则
   会将新的修改信息和内容数据保存到缓存中。

如果将 ``CONTENT_CACHING_LAYER`` 的值是设为 ``'reader'`` (默认值)，则将reader阅读
器返回的原始内容和元数据添加至缓存。如果此设置改为 ``'generator'`` ，则将已处理的内容
对象添加至缓存。缓存已处理的内容对象可能会与插件和 ``WITH_FUTURE_DATES`` 功能都有冲突
(与插件起冲突是因为可能会跳过某些读取相关信号)，(与 ``WITH_FUTURE_DATES`` 功能冲突是
因为缓存内容对象的 ``draft`` 草稿状态不会随时间自动更改)。

检查修改时间相比对比文件哈希值更快， 但检查修改时间有时并不可靠，因为 ``mtime`` 时间戳
信息有可能会丢失，例如，当使用 ``cp`` 或 ``rsync`` 命令复制内容源文件却没有
用 ``mtime`` 保留模式时（ ``rsync`` 可以通过传递 ``--archive`` 标志来调用)。

缓存文件的格式是Python的pickles格式，不同版本的Python可能无法读取这些文件，因为
pickle的格式经常改变。如果遇到此类错误，系统会捕获该错误，并且以新格式自动重新生
成缓存文件。更改 ``GZIP_CACHE`` 的设置也会重新生成缓存文件。

对于 ``--ignore-cache`` 命令行参数的使用，在需要重新生成整个缓存时（例如,在修改将影响缓存内容的设置文件时,
或仅用于调试目的时），非常有用。
当Pelican在自动重新加载模式下运行时，如果 ``AUTORELOAD_IGNORE_CACHE`` 的值为 ``True`` ，
则修改设置文件将自动忽略缓存。

请注意，即使使用缓存的内容，所有输也都会每次重写一遍，因此生成的 ``*.html`` 文件的修改次数将一直改变。
因此，用 ``rsync`` 上传时带上 ``--checksum`` 参数很有用。

.. _writing_only_selected_content:


仅写入选定内容
=============================

当只处理一篇文章或单个页面，或调整你的主题时，
经常需要尽快生成和查看出来的效果。
这种情况下，生成和写入整个站点输出通常没有必要。
通过在 ``WRITE_SELECTED`` 列表中指定所需的文件作为输出路径，可以实现**只**写入这些文件。
这个列表也可以用 ``--write-selected`` 参数在命令行上指定，该参数接受一个用逗号分隔的
输出文件路径列表。默认情况下此列表为空，所以正常是所有输出文件都写入的。
可以查看 :ref:`site_generation` 了解更多详情。


设置示例
================

以下配置文件示例为块引用，这里是原文件链接_ 。

.. code-block:: python
    :linenos:
    
    # -*- coding: utf-8 -*-
    from __future__ import unicode_literals

    AUTHOR = 'Alexis Métaireau'
    SITENAME = "Alexis' log"
    SITESUBTITLE = 'A personal blog.'
    SITEURL = 'http://blog.notmyidea.org'
    TIMEZONE = "Europe/Paris"

    # can be useful in development, but set to False when you're ready to publish
    RELATIVE_URLS = True

    GITHUB_URL = 'http://github.com/ametaireau/'
    DISQUS_SITENAME = "blog-notmyidea"
    REVERSE_CATEGORY_ORDER = True
    LOCALE = "C"
    DEFAULT_PAGINATION = 4
    DEFAULT_DATE = (2012, 3, 2, 14, 1, 1)

    FEED_ALL_RSS = 'feeds/all.rss.xml'
    CATEGORY_FEED_RSS = 'feeds/{slug}.rss.xml'

    LINKS = (('Biologeek', 'http://biologeek.org'),
            ('Filyb', "http://filyb.info/"),
            ('Libert-fr', "http://www.libert-fr.com"),
            ('N1k0', "http://prendreuncafe.com/blog/"),
            ('Tarek Ziadé', "http://ziade.org/blog"),
            ('Zubin Mithra', "http://zubin71.wordpress.com/"),)

    SOCIAL = (('twitter', 'http://twitter.com/ametaireau'),
            ('lastfm', 'http://lastfm.com/user/akounet'),
            ('github', 'http://github.com/ametaireau'),)

    # global metadata to all the contents
    DEFAULT_METADATA = {'yeah': 'it is'}

    # path-specific metadata
    EXTRA_PATH_METADATA = {
        'extra/robots.txt': {'path': 'robots.txt'},
        }

    # static paths will be copied without parsing their contents
    STATIC_PATHS = [
        'pictures',
        'extra/robots.txt',
        ]

    # custom page generated with a jinja2 template
    TEMPLATE_PAGES = {'pages/jinja2_template.html': 'jinja2_template.html'}

    # code blocks with line numbers
    PYGMENTS_RST_OPTIONS = {'linenos': 'table'}

    # foobar will not be used, because it's not in caps. All configuration keys
    # have to be in caps
    foobar = "barbaz"

.. _这里是原文件链接: https://github.com/getpelican/pelican/blob/f61bd2ceba5be68833d6a7b9d1a6670046dc0581/samples/pelican.conf.py
.. _Jinja custom filters documentation: http://jinja.pocoo.org/docs/api/#custom-filters
.. _Jinja Environment documentation: http://jinja.pocoo.org/docs/dev/api/#jinja2.Environment
.. _Docutils Configuration: http://docutils.sourceforge.net/docs/user/config.html
