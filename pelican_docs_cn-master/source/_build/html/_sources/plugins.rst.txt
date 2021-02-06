.. _plugins:

插件介绍
#########

Pelican从3.0版本开始支持插件。 插件是一种无需直接修改Pelican核心而向Pelican添加功能的方法。

如何使用插件
==================

要加载插件，你必须在设置文件中指定它们。 有两种方法，第一种方法使用字符串指明可调用路径::

    PLUGINS = ['package.myplugin',]

另一种方法是先导入它们，再将其添加到列表中::

    from package import myplugin
    PLUGINS = [myplugin,]

.. note::

   在尝试使用不同的插件（尤其是处理元数据和内容的插件）时，有可能会受缓存干扰，作的修改可能不见生效。 
   在这种情况下，可以使用 ``LOAD_CONTENT_CACHE = False`` 禁用缓存或
   使用 ``--ignore-cache`` 命令行开关。

如果你的插件不在可导入路径中，你可以在 ``PLUGIN_PATHS`` 设置路径列表。 
如下例所示，``PLUGIN_PATHS`` 列表中的路径可以是绝对路径或相对于设置文件的相对路径::

    PLUGIN_PATHS = ["plugins", "/srv/pelican/plugins"]
    PLUGINS = ["assets", "liquid_tags", "sitemap"]

哪里可以找到插件
=====================

我们有维护一个单独的插件库供大家共享和使用。
请访问 `pelican-插件`_ 库以获取可用插件列表。

.. _pelican-插件: https://github.com/getpelican/pelican-plugins

请注意，虽然我们会尽力审查和维护这些插件，但由于这些插件是由Pelican社区的大家提交的，
所以对它们的支持和它们的互操作性质量可能良莠不齐。

如何创建插件
=====================

这里的插件是基于信号的概念开发的。Pelican发出信号，插件订阅接收这些信号。
定义的信号列表在下面列出。

插件遵循的唯一一条规则是定义一个可调用的注册器 ``register`` ，在其中将接收的信号映射到插件设定的逻辑里，
让我们来举个简单的例子::

    from pelican import signals

    def test(sender):
        print("{} initialized !!".format(sender))

    def register():
        signals.initialized.connect(test)

.. note::

    信号接收器是弱引用的，所以不能在 ``register`` 中定义，否则信号在发出之前就将被当成垃圾信息收集去。

信号列表
===============

下面是当前可用的信号列表:

=================================   ============================   ===========================================================================
信号                                 参数                            描述
=================================   ============================   ===========================================================================
initialized                         pelican object
finalized                           pelican object                 在所有生成器执行完pelican退出之前调用
                                                                   可用于自定义 后处理操作， 例如:
                                                                   - 精简js/css资源
                                                                   - 使用更新的站点地图sitemap通知/ping搜索引擎。
generator_init                      generator                      在 Generator.__init__ 中调用
all_generators_finalized            generators                     在所有生成器执行完后但未写入输出内容之前调用
readers_init                        readers                        在 Readers.__init__ 中调用
article_generator_context           article_generator, metadata
article_generator_preread           article_generator              在 ArticlesGenerator.generate_context 读取文章之前调用；
                                                                   用处是让代码在对每篇文章进行解析之前执行一些操作
article_generator_init              article_generator              在 ArticlesGenerator.__init__ 中调用
article_generator_pretaxonomy       article_generator              在分类列表和标签列表创建之前调用，
                                                                   用处，比如修改要生成的文章列表以防止删除的文章泄露显示在分类和标签中
article_generator_finalized         article_generator              在 ArticlesGenerator.generate_context 结尾处调用
article_generator_write_article     article_generator, content     在编写每篇文章之前调用，文章作为内容传递
article_writer_finalized            article_generator, writer      在所有文章和相关页面编写完但文章生成器未关闭之前调用
get_generators                      pelican object                 在 Pelican.get_generator_classes 中调用可以返
                                                                   回一个或多个生成器Generator，返回多个生成器时以元组tuple或列表list的方式返回。
get_writer                          pelican object                 在 Pelican.get_writer 中调用，可以返回一个自定义编写器Writer。
page_generator_context              page_generator, metadata
page_generator_preread              page_generator                 在 PageGenerator.generate_context 读取一个page页之前调用；
                                                                   可以用在需要让代码在对每个page页进行解析之前执行一些操作的情形下
page_generator_init                 page_generator                 在 PagesGenerator.__init__ 中调用
page_generator_finalized            page_generator                 在 PagesGenerator.generate_context 结尾处调用
page_generator_write_page           page_generator, content        在编写每个page页之前调用，page页作为内容传递
page_writer_finalized               page_generator, writer         在所有page页编写完但page生成器未关闭之前调用
static_generator_context            static_generator, metadata
static_generator_preread            static_generator               在 StaticGenerator.generate_context 读取一个静态文件时调用；
                                                                   在每个静态文件被添加到静态文件列表之前可以编写代码执行一些操作
static_generator_init               static_generator               在 StaticGenerator.__init__ 中调用
static_generator_finalized          static_generator               在 StaticGenerator.generate_context 结尾处调用
content_object_init                 content_object                 在 Content.__init__ 结尾处调用
content_written                     path, context                  每次写入内容文件时调用。
feed_generated                      context, feed                  每次生成一条feed时都会调用。 可用于在写入feed对象之前对其进行修改。
feed_written                        path, context, feed            每次写入feed文件时调用。
=================================   ============================   ===========================================================================

.. warning::

   如果你打算读取内容对象的 ``summary`` 或 ``content`` 属性，请避免使用 ``content_object_init`` 信号。 
   当要 :ref:`ref-linking-to-internal-content` 时，该组合可能会导致产生未解析的链接（请参阅 `pelican-plugins bug #314`_ ）。 
   可以改为使用 ``_summary`` 和 ``_content`` 属性，或者将你的插件安排在稍后阶段运行（例如 ``all_generators_finalized`` ）。

.. note::

   从Pelican3.2开始，信号名称标准化使用。旧版插件可能需要更新才能使用新名称:

   ==========================  ===========================
   旧名称                       新名称
   ==========================  ===========================
   article_generate_context    article_generator_context
   article_generate_finalized  article_generator_finalized
   article_generate_preread    article_generator_preread
   pages_generate_context      page_generator_context
   pages_generate_preread      page_generator_preread
   pages_generator_finalized   page_generator_finalized
   pages_generator_init        page_generator_init
   static_generate_context     static_generator_context
   static_generate_preread     static_generator_preread
   ==========================  ===========================

插件示例
==========

我们最终意识到一些创建插件的方法最好在文档中共享，所以有以下内容！

如何创建新的阅读器
--------------------------

首先你可能需要添加对你自己设定的输入格式的支持。
虽然在Pelican核心中添加此功能也行，但不明智。
我们还是通过插件来定义一个新的阅读器好些。

主要是因为插件编写很容易，而且插件未激活时不会影响pelican的运行速度

我们直接来看例子吧::

    from pelican import signals
    from pelican.readers import BaseReader

    # Create a new reader class, inheriting from the pelican.reader.BaseReader
    class NewReader(BaseReader):
        enabled = True  # Yeah, you probably want that :-)

        # The list of file extensions you want this reader to match with.
        # If multiple readers were to use the same extension, the latest will
        # win (so the one you're defining here, most probably).
        file_extensions = ['yeah']

        # You need to have a read method, which takes a filename and returns
        # some content and the associated metadata.
        def read(self, filename):
            metadata = {'title': 'Oh yeah',
                        'category': 'Foo',
                        'date': '2012-12-01'}

            parsed = {}
            for key, value in metadata.items():
                parsed[key] = self.process_metadata(key, value)

            return "Some content", parsed

    def add_reader(readers):
        readers.reader_classes['yeah'] = NewReader

    # This is how pelican works.
    def register():
        signals.readers_init.connect(add_reader)


添加新生成器
----------------------

添加一个新的生成器也很简单。 你可能需要查看 :doc:`internals` 以获取有关如何创建自己的生成器的更多信息。

::

    def get_generators(pelican_object):
        # define a new generator here if you need to
        return MyGenerator

    def register():
        signals.get_generators.connect(get_generators)

.. _pelican-plugins bug #314: https://github.com/getpelican/pelican-plugins/issues/314
