Pelican内部原理
#################

本节介绍Pelican内部如何工作。正如你将会看到的，它非常简单，不过给它写个小文档也无伤大雅。 :)

你还可以在 :doc:`report` 部分找到原作者撰写的报告的摘录，其中有一些软件设计的信息。

.. _report: :doc:`report`

整体结构
=================

Pelican所做的是获取文件列表并将其处理成某种输出。 
通常情况下，输入文件为reStructuredText和Markdown格式的文件，而输出则是一个博客站，
但其实输入和输出根据你的意愿可以任何内容。

其中实现的逻辑为将之分为不同的类和概念:

* **Writers** 负责编写文件: .html文件, RSS源等。由于这些操作很常用，因此对象创建一次后将传递给生成器Generators。

* **Readers** 用于读取各种格式 (目前是HTML, Markdown 和 reStructuredText三种格式，不过系统是可扩展的）。
  给定一个文件，它们返回元数据（作者，标签，分类等）和内容（以HTML格式）。

* **Generators** 生成不同的输出。例如，Pelican附带 ``ArticlesGenerator`` 和 ``PageGenerator`` 。
  给定配置，它们可以做任何它们想做的事情。大多数情况下，它们是根据输入的内容生成文件。

* Pelican也使用模板，因此你可以轻易地编写自己的主题，语法是 `Jinja2 <http://jinja.pocoo.org/>`_ 
  而且非常容易学会，所以不要犹豫，学习上手构建自己的主题吧。

如何实现一个新的文件格式读取器?
====================================

你是不是想给Pelican添加支持一种非常棒的标记语言？那么，你唯一要做的就是创建一个带有 ``read`` 方法的类，
返回HTML内容和一些元数据。

这里来看看Markdown阅读器的内容::

    class MarkdownReader(BaseReader):
        enabled = bool(Markdown)

        def read(self, source_path):
            """Parse content and metadata of markdown files"""
            text = pelican_open(source_path)
            md_extensions = {'markdown.extensions.meta': {},
                             'markdown.extensions.codehilite': {}}
            md = Markdown(extensions=md_extensions.keys(),
                          extension_configs=md_extensions)
            content = md.convert(text)

            metadata = {}
            for name, value in md.Meta.items():
                name = name.lower()
                meta = self.process_metadata(name, value[0])
                metadata[name] = meta
            return content, metadata

很简单吧?

如果你新创建的这个读取器需要额外的Python依赖项，那么你应该用一个 ``try...except`` 语句
块将 ``import`` 语句包裹起来。 然后在读取器的类中，设置 ``enabled`` 类的属性以标记导入是成功还是失败。
这样用户可以继续使用他们喜欢的标记语言，而无需为他们不使用的语言格式安装模块。


如何实现一个新的生成器generator?
=================================

生成器的代码中有两个重要的方法。你不用非得两种方法的代码都写好，系统根据现有的来进行调用。

* 对于所有生成器，首先调用 ``generate_context``。
  做你需要做的任何事，并在有需要时更新全局上下文。
  这个上下文会在所有生成器之间共享，并将传递给模板。例如对于 ``PageGenerator`` ， ``generate_context`` 方法
  查找所有page页，将它们转换为对象，并用它们填充上下文。
  小心 *不要* 在此阶段使用此上下文输出任何内容，因为它可能会因其他生成器的效果而改变。

* 然后调用 ``generate_output`` 。它用来干嘛？对啦，用来生成输出。
  在这里你可能想要查看上下文，想要调用作为此函数的第一个参数传递的 ``writer`` 对象方法。
  在 ``PageGenerator`` 示例中， 这个方法将查看全局上下文中记录的所有page页，
  并将遇到的每个page页都在磁盘上输出一件文件（使用writer方法的 ``write_file`` ）。
