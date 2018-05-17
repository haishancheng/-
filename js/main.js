var top250Page = {
  init: function () {
    this.$top250 = $('#top250')
    this.isloading = false
    this.index = 0;
    this.clock = null
    this.bind()
    this.start()
  },
  bind: function () {
    var _this = this
    //滚动到底部加载下面20条数据
    _this.$top250.on('scroll', function () {
      //函数节流,防止过多滚动
      if (_this.clock) {
        clearTimeout(_this.clock)
      }
      _this.clock = setTimeout(function () {
        /* 通过top250中的container元素是否滚动到底部来判断 */
        if (_this.$top250.scrollTop() + _this.$top250.height() >= _this.$top250.find('.container').height()) {
          _this.start()
        }
        if (_this.$top250.scrollTop() != 0) {
          _this.$top250.find('.icon-returntop').fadeIn(500);
        } else {
          _this.$top250.find('.icon-returntop').fadeOut(500);
        }
      }, 300)
    })
  },
  start: function () {
    var _this = this
    _this.getData(function (data) {
      _this.render(data)
    })
  },
  getData: function (callback) {
    var _this = this
    //加锁，防止滚动到底部多次触发此函数，多次获取数据
    if (_this.isloading) return
    _this.isloading = true
    _this.$top250.find('.loading').show();
    $.ajax({
      url: 'https://api.douban.com/v2/movie/top250',
      type: 'GET',
      data: {
        start: _this.index || 0,
        count: 20
      },
      dataType: 'jsonp'
    }).done(function (ret) {
      _this.index += 20
      callback && callback(ret)
    }).fail(function () {
      console.log('error....')
    }).always(function () {
      _this.isloading = false
      _this.$top250.find('.loading').hide();
    })
  },
  render: function (data) {
    var _this = this
    data.subjects.forEach(function (movie) {
      //生成一个字符串（此处使用es6的字符模板）
      var tpl = `<div class="item clearfix">
          <a href="#">
            <div class="cover">
              <img src="http://img7.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="图片找不到了">
            </div>
            <div class="detail">
              <h1>肖申克的救赎</h1>
              <div class="extra"><span class="score">9.6</span> / <span class="collection">1000</span>收藏</div>
              <div class="extra"><span class="year">1994</span> / <span class="type">犯罪/剧情</span></div>
              <div class="extra">导演: <span class="directors">弗兰克·德拉邦特</span></div>
              <div class="extra">主演: <span class="casts">蒂姆、摩根</span></div>
            </div>
          </a>
        </div>`
      var $node = $(tpl)
      $node.find('a').attr('href', movie.alt)
      $node.find('.cover img').attr('src', movie.images.small)
      $node.find('.detail h1').text(movie.title)
      $node.find('.detail .score').text(movie.rating.average)
      $node.find('.detail .collection').text(movie.collect_count)
      $node.find('.detail .year').text(movie.year)
      $node.find('.detail .type').text(movie.genres.join(' / '))
      var directorArr = new Array();
      movie.directors.forEach(function (director) {
        directorArr.push(director.name)
      })
      $node.find('.detail .directors').text(directorArr.join('、'))
      var castArr = new Array();
      movie.casts.forEach(function (cast) {
        castArr.push(cast.name)
      })
      $node.find('.detail .casts').text(castArr.join('、'))
      _this.$top250.find('.container').append($node)
    })
  }
}

var usBoxPage = {
  init: function () {
    this.$beimei = $('#beimei')
    this.start()
  },
  start: function () {
    var _this = this
    _this.getData(function (data) {
      _this.render(data)
    })
  },
  getData: function (callback) {
    var _this = this
    _this.$beimei.find('.loading').show();
    $.ajax({
      url: 'https://api.douban.com/v2/movie/us_box',
      type: 'GET',
      dataType: 'jsonp'
    }).done(function (ret) {
      callback && callback(ret)
    }).fail(function () {
      console.log('error....')
    }).always(function () {
      _this.$beimei.find('.loading').hide();
    })
  },
  render: function (data) {
    var _this = this
    data.subjects.forEach(function (movie) {
      movie = movie.subject //数据格式和top250接口略微有不同
      //生成一个字符串（此处使用es6的字符模板）
      var tpl = `<div class="item clearfix">
          <a href="#">
            <div class="cover">
              <img src="http://img7.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="图片找不到了">
            </div>
            <div class="detail">
              <h1>肖申克的救赎</h1>
              <div class="extra"><span class="score">9.6</span> / <span class="collection">1000</span>收藏</div>
              <div class="extra"><span class="year">1994</span> / <span class="type">犯罪/剧情</span></div>
              <div class="extra">导演: <span class="directors">弗兰克·德拉邦特</span></div>
              <div class="extra">主演: <span class="casts">蒂姆、摩根</span></div>
            </div>
          </a>
        </div>`
      var $node = $(tpl)
      $node.find('a').attr('href', movie.alt)
      $node.find('.cover img').attr('src', movie.images.small)
      $node.find('.detail h1').text(movie.title)
      $node.find('.detail .score').text(movie.rating.average)
      $node.find('.detail .collection').text(movie.collect_count)
      $node.find('.detail .year').text(movie.year)
      $node.find('.detail .type').text(movie.genres.join(' / '))
      var directorArr = new Array();
      movie.directors.forEach(function (director) {
        directorArr.push(director.name)
      })
      $node.find('.detail .directors').text(directorArr.join('、'))
      var castArr = new Array();
      movie.casts.forEach(function (cast) {
        castArr.push(cast.name)
      })
      $node.find('.detail .casts').text(castArr.join('、'))
      _this.$beimei.find('.container').append($node)
    })
  }
}

var searchPage = {
  init: function () {
    this.$search = $('#search')
    this.keyword = ''
    this.isloading = false
    this.index = 0;
    this.clock = null
    this.bind()
    // this.start()
  },
  bind: function () {
    var _this = this
    _this.$search.find('.button').on('click', function () {
      _this.$search.find('.search-result').empty()
      _this.index = 0
      _this.keyword = _this.$search.find('input').val()
      _this.start()
    })
    // 滚动到底部加载下面20条数据
    _this.$search.on('scroll', function () {
      //函数节流,防止过多滚动
      if (_this.clock) {
        clearTimeout(_this.clock)
      }
      _this.clock = setTimeout(function () {
        /* 通过top250中的container元素是否滚动到底部来判断 */
        if (_this.$search.scrollTop() + _this.$search.height() >= _this.$search.find('.search-result').height() + _this.$search.find('.search-area').height()) {
          _this.start()
        }
        if (_this.$search.scrollTop() != 0) {
          _this.$search.find('.icon-returntop').fadeIn(500);
        } else {
          _this.$search.find('.icon-returntop').fadeOut(500);
        }
      }, 300)
    })
  },
  start: function () {
    var _this = this
    _this.getData(function (data) {
      _this.render(data)
    })
  },
  getData: function (callback) {
    var _this = this
    //加锁，防止滚动到底部多次触发此函数，多次获取数据
    if (_this.isloading) return
    _this.isloading = true
    _this.$search.find('.loading').show();
    $.ajax({
      url: 'https://api.douban.com/v2/movie/search',
      type: 'GET',
      data: {
        q: _this.keyword,
        start: _this.index || 0,
      },
      dataType: 'jsonp'
    }).done(function (ret) {
      _this.index += 20
      callback && callback(ret)
    }).fail(function () {
      console.log('error....')
    }).always(function () {
      _this.isloading = false
      _this.$search.find('.loading').hide();
    })
  },
  render: function (data) {
    var _this = this
    data.subjects.forEach(function (movie) {
      //生成一个字符串（此处使用es6的字符模板）
      var tpl = `<div class="item clearfix">
          <a href="#">
            <div class="cover">
              <img src="http://img7.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="图片找不到了">
            </div>
            <div class="detail">
              <h1>肖申克的救赎</h1>
              <div class="extra"><span class="score">9.6</span> / <span class="collection">1000</span>收藏</div>
              <div class="extra"><span class="year">1994</span> / <span class="type">犯罪/剧情</span></div>
              <div class="extra">导演: <span class="directors">弗兰克·德拉邦特</span></div>
              <div class="extra">主演: <span class="casts">蒂姆、摩根</span></div>
            </div>
          </a>
        </div>`
      var $node = $(tpl)
      $node.find('a').attr('href', movie.alt)
      $node.find('.cover img').attr('src', movie.images.small)
      $node.find('.detail h1').text(movie.title)
      $node.find('.detail .score').text(movie.rating.average)
      $node.find('.detail .collection').text(movie.collect_count)
      $node.find('.detail .year').text(movie.year)
      $node.find('.detail .type').text(movie.genres.join(' / '))
      var directorArr = new Array();
      movie.directors.forEach(function (director) {
        directorArr.push(director.name)
      })
      $node.find('.detail .directors').text(directorArr.join('、'))
      var castArr = new Array();
      movie.casts.forEach(function (cast) {
        castArr.push(cast.name)
      })
      $node.find('.detail .casts').text(castArr.join('、'))
      _this.$search.find('.search-result').append($node)
    })
  }
}

var App = {
  init: function () {
    this.$tabs = $('footer>div')
    this.returnTop = $('section .icon-returntop')
    this.$sections = $('section')
    this.pageIndex = 0
    top250Page.init()
    usBoxPage.init()
    searchPage.init()
    this.bind()
  },
  bind: function () {
    var _this = this
    _this.$tabs.on('click', function () {
      $(this).addClass('active').siblings().removeClass('active')
      if (_this.pageIndex === $(this).index()) {
        return /* 防止多次点击同一页面多次fadeIn */
      }
      _this.$sections.hide().eq($(this).index()).fadeIn()
      _this.pageIndex = $(this).index()
    })
    _this.returnTop.on('click', function () {
      _this.$sections.eq(_this.pageIndex).scrollTop(0)
    })
  }
}

App.init()