发布记录
###############

4.1.0 - 2019-07-14
==================

* 实时浏览器重新加载更改的文件（由Invoke任务提供）
* 添加由Poetry管理的 ``pyproject.toml`` 
* 支持调用 ``python -m pelican``
* 将相对源路径属性添加到内容
* 允许 ``EXTRA_PATH_METADATA`` 中的目录
* 将 ``all_articles`` 变量添加到时间段页面（用于最近的帖子功能）
* 改善调试模式输出
* 从Atom Feed中删除空白或重复摘要
* 修复分页，pelican-import命令，pelican-quickstart命令和feed导入程序中的错误

4.0.1 (2018-11-30)
==================

* 重构``pelican.server``日志记录
* 修复将所有静态文件作为“草稿”处理的错误
* 修复了Invoke/Makefile的自动化，导入程序和其他杂项错误

*重构``pelican.server``日志记录
*修复将所有静态文件作为“草稿”处理的错误
*错误修复了Invoke / Makefile自动化，导入程序和其他杂项

如果从3.7.x或更早版本升级，请注意4.0+中与slug相关的设置使用 ``{slug}`` 和/或 ``{lang}`` 而不是 ``%s`` 。
如果遇到 ``%s`` 样式设置，Pelican将发出警告并回退到默认设置。
一些用户提交的主题可能会尝试格式化设置值，但在构建网站时出现 ``TypeError`` 失败情况。 
在这种情况下，需要更新主题。 
例如，使用 ``TAG_FEED_ATOM.format(slug=tag.slug)`` 而不是 ``TAG_FEED_ATOM|format(tag.slug)`` 

4.0.0 (2018-11-13)
==================

* 用 ``pelican --listen`` 替换 ``develop_server.sh`` 脚本 
* 改进了大型静态文件（例如视频）的复制/链接行为
* 新建 ``{static}`` 语法用于链接到静态内容; 即使不在 ``STATIC_PATHS`` 中， 
  ``{static}`` 和 ``{attach}`` 链接的内容也会被自动复制。
* Page页现在可以具有草稿 ``draft`` 
* 通过新的 ``--print-settings`` 标志显示当前设置
* slug的所有设置现在都使用 ``{slug}`` 和/或 ``{lang}`` 而不是 ``%s``
  如果遇到 ``%s``样式设置，Pelican将发出警告并回退到默认设置。
* 新信号: ``feed_generated`` 和 ``page_generated_write_page``
* 用Invoke替换Fabric，使用 ``tasks.py`` 替换 ``fabfile.py`` 模板
* 用 ``PAGINATED_TEMPLATES`` 替换 ``PAGINATED_DIRECT_TEMPLATES`` ，将分页控制扩展到所有模板并使页面大小可变
* 用 ``SLUG_REGEX_SUBSTITUTIONS`` 替换 ``SLUG_SUBSTITUTIONS`` 以获得更精细的控制
* 在 ``PAGINATION_PATTERNS`` 中的 ``'{base_name}'`` 的值不再从 ``'foo/bar.html'`` 删除 ``'bar'`` (除非 ``'bar' == 'index'``)
* ``ARTICLE_ORDER_BY`` 和 ``PAGE_ORDER_BY`` 现在也影响 1) 分类, 标签和作者页面 
  2) feeds 3) 草稿及隐藏的文章或page页
* 新的 ``ARTICLE_TRANSLATION_ID`` 和 ``PAGE_TRANSLATION_ID`` 设置，用于指定用于识别/禁用翻译的元数据属性
* 使HTML阅读器将多次出现的元数据标签解析为列表
* 新的Blogger XML备份导入程序
* 如果使用 ``--wp-attach`` 下载文件，Wordpress导入器现在更新文件链接以指向本地副本。
* 导入器不再插入额外的换行符，以防止破坏HTML属性。
* 当解析 ``foo`` 时，Pelican服务器现在处理 ``foo.html`` 和 ``foo/index.html`` 将比 ``foo/`` 优先。

3.7.1 (2017-01-10)
==================

* 修复Quickstart脚本中的区域设置问题
* 在setup.py中指定README和CHANGELOG的编码

3.7.0 (2016-12-12)
==================

* 除了 ``<summary>`` 之外，Atom源也输出 ``<content>`` 
* Atom源使用 ``<published>`` 作为原始发布日期，使用 ``<updated>`` 作为修改日期
* 简化Atom订阅源ID生成并支持URL片段
* 使用特定分类的标题生成分类源
* RSS源现在默认为摘要而不是完整内容；
  设置 ``RSS_FEED_SUMMARY_ONLY = False`` 恢复到之前的设定
* 用 ``MARKDOWN`` 设置替换 ``MD_EXTENSIONS`` 
* 用更强大的 ``JINJA_ENVIRONMENT`` 设置替换 ``JINJA_EXTENSIONS`` 
* 改进摘要截断逻辑，使用HTML解析器而不是正则表达式来处理跨越多行的特殊字符和标签
* 在搜索站内链接替换时包括搜索摘要
* 通过 ``{author}name`` 和 ``{index}`` 语法链接到作者和索引
* 通过 ``LINKS_WIDGET_NAME`` 和 ``SOCIAL_WIDGET_NAME`` 覆盖小部件名称
* 添加 ``INDEX_SAVE_AS`` 选项以覆盖默认的 ``index.html`` 值
* 删除主题的上下文变量 ``PAGES`` 以支持使用 ``pages`` 
* ``SLUG_SUBSTITUTIONS`` 现在接受3元组元素，允许URL的slugs包含非字母数字字符
* 使用 ``TAG_SUBSTITUTIONS`` 和 ``CATEGORY_SUBSTITUTIONS`` 设置可以更精确地控制标签和分类的slug
* 使用 ``AUTHOR_SUBSTITUTIONS`` 设置可以更精确地控制作者slug
* ``DEFAULT_DATE`` 可以定义为字符串
* 当 ``DEFAULT_DATE = 'fs'`` 时使用 ``mtime`` 而不是 ``ctime`` 
* 添加 ``--fatal=errors|warnings`` 选项以用于持续集成
* 使用生成器级缓存时，确保以前缓存的文件是已处理的文件而不是新文件。
* 添加Python和Pelican版本信息供调试输出
* 提高与Python 3.5的兼容性
* 遵守并执行PEP8指南
* 用 ``data::`` 指令替换设置文档中的表

3.6.3 (2015-08-14)
==================

* 修复版本 tarball 中的权限问题

3.6.2 (2015-08-01)
==================

* 修复测试中与Unicode相关的安装错误
* 如果只有一页则不在 ``notmyidea`` 主题中显示分页
* 在上下文中提供隐藏页面
* 改进URLWrapper比较

3.6.0 (2015-06-15)
==================

* 默认情况下禁用缓存以防止可能的混淆
* 改进缓存行为，用 ``cpickle`` 替换 ``pickle`` 
* 在 ``summary`` 以外的元数据字段中允许Markdown或reST内容
* 支持以分号分隔的作者/标签列表
* 提高文章排序的灵活性
* 添加 ``--relative-urls`` 参数
* 支持devserver监听localhost以外的地址
* 将HTTP服务器处理程序统一为 ``pelican.server`` 
* 处理草稿帖子的站内链接
* 将 ``tag_cloud`` 从核心移到插件
* 通过HTTPS加载默认主题的外部资源
* 从WordPress XML导入草稿
* 改进对Windows用户的支持
* 增强日志记录和测试套件
* 清理和重构代码库
* 新信号: ``all_generators_finalized`` 和 ``page_writer_finalized``

3.5.0 (2014-11-04)
==================

* 引入 ``ARTICLE_ORDER_BY`` 和 ``PAGE_ORDER_BY`` 设置来控制文章和页面的顺序。
* 在模板渲染的日期中包含时区信息
* 在文章和page页的元数据中公开读取器名称
* 添加在路径中使用 ``{attach}`` 将静态文件与内容放在与文章和page页相同的目录中的功能。
* 当Markdown文件中存在重复的元数据时，防止Pelican引发异常。
* 引入 ``TYPOGRIFY_IGNORE_TAGS`` 设置以添加要被Typogrify忽略的HTML标签。
* 添加在日期格式中使用``-``来去除前置零的功能。例如， ``%-d/%-m/%y`` 现在将显示为 ``9/8/12`` 。
* 确保在快速入门配置期间正确禁用源生成。
* 从不正确匹配的子目录中修复 ``PAGE_EXCLUDES`` 和 ``ARTICLE_EXCLUDES`` 
* 引入 ``STATIC_EXCLUDE`` 设置添加排除静态文件功能。
* 修复了在 ``RELATIVE_URLS`` 启用状态下使用 ``PAGINATION_PATTERNS`` 出现的问题
* 修复Feed的生成导致链接在使用其他语言环境时使用错误的月份名称语言
* 修复了simple模板中作者列表格式不正确的问题。
* 修复从设置中解析非字符串URL时的问题
* 提高调试和警告消息的一致性

3.4.0 (2014-07-01)
==================

* 通过新的缓存机制加速内容生成
* 添加选择性生成帖子（而不是总是建立整个网站）
* 改进许多文档，包括切换到更漂亮的RtD主题
* 添加对多个内容和插件路径的支持
* 添加 ``:modified:`` 元数据字段来补充 ``:date:``
  用于指定文章的最新更新日期和时间，与发布日期和时间无关。
* 添加新的 ``:authors:`` 元数据字段添加对多位作者的支持
* 在自动生成网站模式下，监视静态目录的更改
* 根据需要添加过滤器以限制日志输出
* 为草稿添加语言支持
* 添加 ``SLUGIFY_SOURCE`` 设置来控制帖子的slug内容的生成方式
* 修复了许多与语言环境和编码有关的问题
* 为帖子摘要应用Typogrify过滤器
* 将静态文件复制到输出时保留文件元数据（例如时间戳）
* 将AsciiDoc支持从Pelican核心转移到单独的插件中
* 导入内容时生成内联链接而不是引用样式链接
* 改进对 ``IGNORE_FILES`` 设置行为的处理
* 正确转义标签名称中的符号字符（例如，``C ++``）
* Python 3.4兼容性的小调整
* 添加几个新信号

3.3.0 (2013-09-24)
==================

* 放弃 Python 3.2 支持,转而支持 Python 3.3
* 添加 ``Fabfile`` ，这样Fabric可以用于工作流自动化而不是通过Make命令
* ``OUTPUT_RETENTION`` 设置可用于保存元数据（例如，诸如 ``.hg`` 和 ``.git`` 之类的VCS数据）以防止其在output目录中被删除
* Tumblr导入
* 清理output文件夹时改善逻辑和一致性
* 改进文档版本控制和发布自动化
* 提高分页灵活性
* 重命名信号以获得更好的一致性（某些插件可能需要更新）
* 将元数据提取从生成器移动到读取器；元数据提取不再特定于文章
* 弃用 ``FILES_TO_COPY`` 以支持 ``STATIC_PATHS`` 和 ``EXTRA_PATH_METADATA`` 
* Markdown帖子中的摘要不再包含脚注
* 通过 ``lstrip_blocks`` Jinja参数删除输出中不必要的空格
* 将PDF生成从核心移动到插件
* 用 ``READERS`` 替换 ``MARKUP`` 设置
* 如果img标签缺少 ``alt`` 属性则发出警告
* 除了 ``||`` 之外，在相对链接语法中添加对 ``{}`` 的支持
* 添加对 ``{tag}`` 和 ``{category}`` 相对链接的支持
* 添加 ``content_written`` 信号

3.2.1 and 3.2.2
===============

* 推动系统包含在FreeBSD Ports Collection中

3.2 (2013-04-24)
================

* 支持Python 3！
* 从元数据覆盖页面的保存位置（例如，使用静态页面作为站点的主页）
* 周期存档(每年、每月和每天的帖子存档)
* 海报博客导入
* 改进WordPress博客导入
* 将插件迁移到单独的存储库
* 改进HTML解析器
* 添加 ``DISPLAY_CATEGORIES_ON_MENU`` 选项提供使用菜单显示或隐藏分类的功能
* 通过 ``IGNORE_FILES`` 设置告知自动重新生成功能需要忽略哪些文件
* 改善帖子生成反馈给用户
* 对于多语言帖子，使用元数据来指定哪个是原始版本，哪个是翻译版本
* 将``.mdown``添加到支持的Markdown文件扩展名列表中
* 文档相对URL生成（ ``RELATIVE_URLS`` ）现在默认关闭

3.1 (2012-12-04)
================

* 导入器现在默认将slugs存储在文件中。可以使用 ``--disable-slugs`` 选项禁用它。
* 改进对站点内资源链接的处理
* 确保导入WordPress时为帖子内容中的所有类型的行结尾添加段落
* 在导入时解码WordPress帖子标题中的HTML实体
* 改善默认主题中LinkedIn图标的外观
* 在默认主题中添加GitHub和Google+社交图标支持
* 优化社交图标
* 添加 ``FEED_ALL_ATOM`` 和 ``FEED_ALL_RSS`` 以生成包含所有帖子的feed源，不区分语言版本
* 将 ``TRANSLATION_FEED`` 拆分为 ``TRANSLATION_FEED_ATOM`` 和 ``TRANSLATION_FEED_RSS`` 
* 现在可以单独启用/禁用不同的源
* 允许空白作者：如果没有设置 ``AUTHOR`` 设置，作者将不再默认为 ``${USER}`` ，如果帖子作者为空，帖子将不包含任何作者信息
* 将对LESS和Webassets的支持从Pelican核心移出变为插件形式
* ``DEFAULT_DATE`` 设置现在默认为 ``None`` ，这意味着除非指定日期元数据否则不会生成文章
* 添加 ``FILENAME_METADATA`` 设置以支持从文件名中提取元数据
* 添加 ``gzip_cache`` 插件将常见文本文件压缩到与原始文件相同的目录中的 ``.gz`` 文件中，从而阻止服
  务器（例如Nginx）必须在HTTP调用期间压缩文件的行为
* 添加对AsciiDoc格式内容的支持
* 添加 ``USE_FOLDER_AS_CATEGORY`` 设置，以便可以打开/关闭功能
* 支持任意Jinja模板文件
* 恢复基本功能测试
* 新信号: ``generator_init``, ``get_generators``, 和
  ``article_generate_preread``

3.0 (2012-08-08)
================

* 重构URL的处理方式
* 改进了英文文档
* 使用``setuptools``入口点修复package包
* 添加了 ``typogrify`` 支持
* 添加了禁用Feed生成的方法
* 添加了对 ``DIRECT_TEMPLATES`` 的支持
* 允许内容文件的多个扩展名
* 添加了 LESS 支持
* 改进了导入脚本
* 添加了功能测试
* 在生成的Makefile中支持Rsync
* 改进的feed支持 (例如使用Feedburner可轻松插入)
* 在reST中添加了对 ``abbr`` 的支持
* 修正了一堆错误 :-)

2.8 (2012-02-28)
==================

* Dotclear导入
* 允许使用Markdown扩展
* 主题现在很容易进行扩展
* 如果只有一个页面则不输出分页信息
* 为每位作者添加一个页面及其所有文章
* 改进了测试套件
* 使主题更容易扩展
* 删除了Skribit支持
* 添加了一个 ``pelican-quickstart`` 脚本
* 修复了与时区相关的问题
* 添加了一些Windows支持脚本
* 日期可以秒为单位指定
* 生成帖子时永远不会失败（跳过并继续）
* 允许使用未来日期
* 支持每种语言具有不同的时区
* 丰富了文档

2.7 (2011-06-11)
==================

* 使用日志记录 ``logging`` ，而不是回显
* 支持自定义Jinja过滤器
* 与Python 2.5的兼容性
* 添加了主题管理器
* 封装用于 Debian
* 添加了草稿支持

2.6 (2011-03-08)
==================

* 输出目录结构的变化
* 使模板更易于使用/创建
* 增加了RSS支持（仅限Atom）
* 添加了Feed的标签支持
* 丰富文档
* 添加了另一个主题 (brownstone)
* 添加了翻译
* 用重写URL模块(或等效模块)添加了一种使用更简洁URL的方法
* 添加了标签云
* 添加了自动加载功能：每次检测到修改时，博客都会自动重新生成
* 将文档翻译成法语
* 从RSS源导入博客
* 分页支持
* 添加了Skribit支持

2.5 (2010-11-20)
==================

* 支持WordPress导入
* 添加了一些新主题 (martyalchin / wide-notmyidea)
* 第一个错误报告！
* Linkedin支持
* 添加了FAQ
* Google Analytics支持
* Twitter支持
* 使用相对URL，而不是静态URL

2.4 (2010-11-06)
================

* 次要主题更改
* 添加支持Disqus（有评论功能了）
* 第二次代码重构
* 添加了有关页面的配置设置
* 博客条目也可以以PDF格式生成

2.3 (2010-10-31)
================

* 支持Markdown格式

2.2 (2010-10-30)
================

* 优化输出
* 管理静态页面

2.1 (2010-10-30)
================

* 将 notmyidea 设为默认主题

2.0 (2010-10-30)
================

* 重构代码以使其更具可扩展性
* 更改为设置变量

1.2 (2010-09-28)
================

* 添加了调试选项
* 添加了每个分类的Feeds
* 如果未提供元数据，则使用文件系统获取日期
* 添加Pygments支持

1.1 (2010-08-19)
================

* 第一个可用版本
