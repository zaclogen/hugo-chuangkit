---
linktitle: 
data: "2019-09-27T00:00:00Z"
draft: false
toc: true
type: docs

menu:
    pandas:
        name: 用户指南
        weight: 4
---

# Pandas 用户指南目录


“用户指南” 按主题划分区域涵盖了几乎所有Pandas的功能。每个小节都介绍了一个主题（例如“处理缺失的数据”），并讨论了Pandas如何解决问题，其中包含许多示例。

刚开始接触Pandas的同学应该从[十分钟入门Pandas](/official-docs/pandas/docs/getting_started/10min/)开始看起。

有关任何特定方法的更多信息，请[参阅API参考](/official-docs/pandas/docs/reference/)。

- [IO工具（文本，CSV，HDF5，…）](io/)
  - [CSV &amp; text files](io/#csv-text-files)
  - [JSON](io/#json)
  - [HTML](io/#html)
  - [Excel files](io/#excel-files)
  - [OpenDocument Spreadsheets](io/#opendocument-spreadsheets)
  - [Clipboard](io/#clipboard)
  - [Pickling](io/#pickling)
  - [msgpack](io/#msgpack)
  - [HDF5 (PyTables)](io/#hdf5-pytables)
  - [Feather](io/#feather)
  - [Parquet](io/#parquet)
  - [SQL queries](io/#sql-queries)
  - [Google BigQuery](io/#google-bigquery)
  - [Stata format](io/#stata-format)
  - [SAS formats](io/#sas-formats)
  - [Other file formats](io/#other-file-formats)
  - [Performance considerations](io/#performance-considerations)
- [索引和数据选择器](indexing/)
  - [Different choices for indexing](indexing/#different-choices-for-indexing)
  - [Basics](indexing/#basics)
  - [Attribute access](indexing/#attribute-access)
  - [Slicing ranges](indexing/#slicing-ranges)
  - [Selection by label](indexing/#selection-by-label)
  - [Selection by position](indexing/#selection-by-position)
  - [Selection by callable](indexing/#selection-by-callable)
  - [IX indexer is deprecated](indexing/#ix-indexer-is-deprecated)
  - [Indexing with list with missing labels is deprecated](indexing/#indexing-with-list-with-missing-labels-is-deprecated)
  - [Selecting random samples](indexing/#selecting-random-samples)
  - [Setting with enlargement](indexing/#setting-with-enlargement)
  - [Fast scalar value getting and setting](indexing/#fast-scalar-value-getting-and-setting)
  - [Boolean indexing](indexing/#boolean-indexing)
  - [Indexing with isin](indexing/#indexing-with-isin)
  - [The ``where()`` Method and Masking](indexing/#the-where-method-and-masking)
  - [The ``query()`` Method](indexing/#the-query-method)
  - [Duplicate data](indexing/#duplicate-data)
  - [Dictionary-like ``get()`` method](indexing/#dictionary-like-get-method)
  - [The ``lookup()`` method](indexing/#the-lookup-method)
  - [Index objects](indexing/#index-objects)
  - [Set / reset index](indexing/#set-reset-index)
  - [Returning a view versus a copy](indexing/#returning-a-view-versus-a-copy)
- [多索引/高级索引](advanced/)
  - [Hierarchical indexing (MultiIndex)](advanced/#hierarchical-indexing-multiindex)
  - [Advanced indexing with hierarchical index](advanced/#advanced-indexing-with-hierarchical-index)
  - [Sorting a ``MultiIndex``](advanced/#sorting-a-multiindex)
  - [Take methods](advanced/#take-methods)
  - [Index types](advanced/#index-types)
  - [Miscellaneous indexing FAQ](advanced/#miscellaneous-indexing-faq)
- [合并、联接和连接](merging/)
  - [Concatenating objects](merging/#concatenating-objects)
  - [Database-style DataFrame or named Series joining/merging](merging/#database-style-dataframe-or-named-series-joining-merging)
  - [Timeseries friendly merging](merging/#timeseries-friendly-merging)
- [重塑和数据透视表](reshaping/)
  - [Reshaping by pivoting DataFrame objects](reshaping/#reshaping-by-pivoting-dataframe-objects)
  - [Reshaping by stacking and unstacking](reshaping/#reshaping-by-stacking-and-unstacking)
  - [Reshaping by Melt](reshaping/#reshaping-by-melt)
  - [Combining with stats and GroupBy](reshaping/#combining-with-stats-and-groupby)
  - [Pivot tables](reshaping/#pivot-tables)
  - [Cross tabulations](reshaping/#cross-tabulations)
  - [Tiling](reshaping/#tiling)
  - [Computing indicator / dummy variables](reshaping/#computing-indicator-dummy-variables)
  - [Factorizing values](reshaping/#factorizing-values)
  - [Examples](reshaping/#examples)
  - [Exploding a list-like column](reshaping/#exploding-a-list-like-column)
- [处理文本字符串](text/)
  - [Splitting and replacing strings](text/#splitting-and-replacing-strings)
  - [Concatenation](text/#concatenation)
  - [Indexing with ``.str``](text/#indexing-with-str)
  - [Extracting substrings](text/#extracting-substrings)
  - [Testing for Strings that match or contain a pattern](text/#testing-for-strings-that-match-or-contain-a-pattern)
  - [Creating indicator variables](text/#creating-indicator-variables)
  - [Method summary](text/#method-summary)
- [处理丢失的数据](missing_data/)
  - [Values considered “missing”](missing_data/#values-considered-missing)
  - [Sum/prod of empties/nans](missing_data/#sum-prod-of-empties-nans)
  - [NA values in GroupBy](missing_data/#na-values-in-groupby)
  - [Filling missing values: fillna](missing_data/#filling-missing-values-fillna)
  - [Filling with a PandasObject](missing_data/#filling-with-a-pandasobject)
  - [Dropping axis labels with missing data: dropna](missing_data/#dropping-axis-labels-with-missing-data-dropna)
  - [Interpolation](missing_data/#interpolation)
  - [Replacing generic values](missing_data/#replacing-generic-values)
  - [String/regular expression replacement](missing_data/#string-regular-expression-replacement)
  - [Numeric replacement](missing_data/#numeric-replacement)
- [分类数据](categorical/)
  - [Object creation](categorical/#object-creation)
  - [CategoricalDtype](categorical/#categoricaldtype)
  - [Description](categorical/#description)
  - [Working with categories](categorical/#working-with-categories)
  - [Sorting and order](categorical/#sorting-and-order)
  - [Comparisons](categorical/#comparisons)
  - [Operations](categorical/#operations)
  - [Data munging](categorical/#data-munging)
  - [Getting data in/out](categorical/#getting-data-in-out)
  - [Missing data](categorical/#missing-data)
  - [Differences to R’s <cite>factor</cite>](categorical/#differences-to-r-s-factor)
  - [Gotchas](categorical/#gotchas)
- [Nullable整型数据类型](integer_na/)
- [可视化](visualization/)
  - [Basic plotting: ``plot``](visualization/#basic-plotting-plot)
  - [Other plots](visualization/#other-plots)
  - [Plotting with missing data](visualization/#plotting-with-missing-data)
  - [Plotting Tools](visualization/#plotting-tools)
  - [Plot Formatting](visualization/#plot-formatting)
  - [Plotting directly with matplotlib](visualization/#plotting-directly-with-matplotlib)
  - [Trellis plotting interface](visualization/#trellis-plotting-interface)
- [计算工具](computation/)
  - [Statistical functions](computation/#statistical-functions)
  - [Window Functions](computation/#window-functions)
  - [Aggregation](computation/#aggregation)
  - [Expanding windows](computation/#expanding-windows)
  - [Exponentially weighted windows](computation/#exponentially-weighted-windows)
- [组操作: 拆分-应用-组合](groupby/)
  - [Splitting an object into groups](groupby/#splitting-an-object-into-groups)
  - [Iterating through groups](groupby/#iterating-through-groups)
  - [Selecting a group](groupby/#selecting-a-group)
  - [Aggregation](groupby/#aggregation)
  - [Transformation](groupby/#transformation)
  - [Filtration](groupby/#filtration)
  - [Dispatching to instance methods](groupby/#dispatching-to-instance-methods)
  - [Flexible ``apply``](groupby/#flexible-apply)
  - [Other useful features](groupby/#other-useful-features)
  - [Examples](groupby/#examples)
- [时间序列/日期方法](timeseries/)
  - [Overview](timeseries/#overview)
  - [Timestamps vs. Time Spans](timeseries/#timestamps-vs-time-spans)
  - [Converting to timestamps](timeseries/#converting-to-timestamps)
  - [Generating ranges of timestamps](timeseries/#generating-ranges-of-timestamps)
  - [Timestamp limitations](timeseries/#timestamp-limitations)
  - [Indexing](timeseries/#indexing)
  - [Time/date components](timeseries/#time-date-components)
  - [DateOffset objects](timeseries/#dateoffset-objects)
  - [Time Series-Related Instance Methods](timeseries/#time-series-related-instance-methods)
  - [Resampling](timeseries/#resampling)
  - [Time span representation](timeseries/#time-span-representation)
  - [Converting between representations](timeseries/#converting-between-representations)
  - [Representing out-of-bounds spans](timeseries/#representing-out-of-bounds-spans)
  - [Time zone handling](timeseries/#time-zone-handling)
- [时间增量](timedeltas/)
  - [Parsing](timedeltas/#parsing)
  - [Operations](timedeltas/#operations)
  - [Reductions](timedeltas/#reductions)
  - [Frequency conversion](timedeltas/#frequency-conversion)
  - [Attributes](timedeltas/#attributes)
  - [TimedeltaIndex](timedeltas/#timedeltaindex)
  - [Resampling](timedeltas/#resampling)
- [样式](style/)
  - [Building styles](style/#Building-styles)
  - [Finer control: slicing](style/#Finer-control:-slicing)
  - [Finer Control: Display Values](style/#Finer-Control:-Display-Values)
  - [Builtin styles](style/#Builtin-styles)
  - [Sharing styles](style/#Sharing-styles)
  - [Other Options](style/#Other-Options)
  - [Fun stuff](style/#Fun-stuff)
  - [Export to Excel](style/#Export-to-Excel)
  - [Extensibility](style/#Extensibility)
- [选项和设置](options/)
  - [Overview](options/#overview)
  - [Getting and setting options](options/#getting-and-setting-options)
  - [Setting startup options in Python/IPython environment](options/#setting-startup-options-in-python-ipython-environment)
  - [Frequently Used Options](options/#frequently-used-options)
  - [Available options](options/#available-options)
  - [Number formatting](options/#number-formatting)
  - [Unicode formatting](options/#unicode-formatting)
  - [Table schema display](options/#table-schema-display)
- [提高性能](enhancingperf/)
  - [Cython (writing C extensions for pandas)](enhancingperf/#cython-writing-c-extensions-for-pandas)
  - [Using Numba](enhancingperf/#using-numba)
  - [Expression evaluation via ``>eval()``](enhancingperf/#expression-evaluation-via-eval)
- [稀疏数据结构](sparse/)
  - [SparseArray](sparse/#sparsearray)
  - [SparseDtype](sparse/#sparsedtype)
  - [Sparse accessor](sparse/#sparse-accessor)
  - [Sparse calculation](sparse/#sparse-calculation)
  - [Migrating](sparse/#migrating)
  - [Interaction with scipy.sparse](sparse/#interaction-with-scipy-sparse)
  - [Sparse subclasses](sparse/#sparse-subclasses)
- [常见问题(FAQ)](gotchas/)
  - [DataFrame memory usage](gotchas/#dataframe-memory-usage)
  - [Using if/truth statements with pandas](gotchas/#using-if-truth-statements-with-pandas)
  - [``NaN``, Integer ``NA`` values and ``NA`` type promotions](gotchas/#nan-integer-na-values-and-na-type-promotions)
  - [Differences with NumPy](gotchas/#differences-with-numpy)
  - [Thread-safety](gotchas/#thread-safety)
  - [Byte-Ordering issues](gotchas/#byte-ordering-issues)
- [烹饪指南](cookbook/)
  - [Idioms](cookbook/#idioms)
  - [Selection](cookbook/#selection)
  - [MultiIndexing](cookbook/#multiindexing)
  - [Missing data](cookbook/#missing-data)
  - [Grouping](cookbook/#grouping)
  - [Timeseries](cookbook/#timeseries)
  - [Merge](cookbook/#merge)
  - [Plotting](cookbook/#plotting)
  - [Data In/Out](cookbook/#data-in-out)
  - [Computation](cookbook/#computation)
  - [Timedeltas](cookbook/#timedeltas)
  - [Aliasing axis names](cookbook/#aliasing-axis-names)
  - [Creating example data](cookbook/#creating-example-data)