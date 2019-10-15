window.MathJax = {

  // extensions: ["AMSmath.js", "AMSsymbols.js"],
  extensions: ["tex2jax.js"],

  // 默认配置开始
  CommonHTML: {
    linebreaks: {
      automatic: true
    }
  },
  // tex2jax.js预处理程序需要的配置, 主要是设置行内和行间公式的标签, 标签跳过, 避免解析等
  tex2jax: {
    inlineMath: [['$', '$'], ['\\(', '\\)']], // 行内公式显示
    displayMath: [['$$', '$$'], ['\\[', '\\]']], // 行间公式显示
    // 附加:避开某些标签 
    skipTags: ["script", "noscript", "style", "textarea", "pre", "code","a"],
    // 设置是否允许使用\$来避免解析$
    processEscapes: true
  },

  // 处理HTML/CSS输出的配置, 主要设置字体(preferredFond, availableFonts), 换行(linebreaking)和渲染延迟(EqnChunk)
  "HEML-CSS": {
    // 符加: 可选字体
    availableFonts: ["STIX", "TEX"],
    // 关闭右击菜单显示
    showMathMenu: false 
  },

  // 处理Tex及相关插件的输入, 可以用来加上公式编号和宏功能
  TeX: {
    noUndefined: {
      attributes: {
        mathcolor: 'red',
        mathbackground: '#FFEEEE',
        mathsize: '110%'
      }
    },

    equationNumbers: {
      autoNumber: ["AMS"],
      useLabelIds: true
    },
    // 会失效? // 额外: 针对某些Tex公式中含有\hfill而不能正确解析
    Macros: {
      hfill: "{}"
    }

  },

  // 通用配置
  messageStyle: 'none' // 不显示信息
  // 默认配置结束


};
