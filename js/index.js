(() => {
  window.AD_CONFIG.layer = (() => {
    let cbs = [];
    
    return {
      add: (cb) => {
        if(cbs.includes(cb)) {
          return false;
        }
        cbs.push(cb);
        return true;
      },
      remove: (cb) => {
        let index = cbs.indexOf(cb);
        if(index === -1) {
          return false;
        }
        cbs.splice(index, 1);
        return true;
      },
      // trigger before layer to be closed
      trigger: () => {
        cbs.forEach(cb => cb());
        cbs = [];
      }
    }
  })();

  const loadScript = (src) => {
    let exists = false;
  
    return () => new Promise((resolve) => {
      if(exists) return resolve();
      // 防止没有触发下方的onload时候, 又调用此函数重复加载
      exists = true;
      // 开始加载
      let script = document.createElement('script');
      script.src = src;
      script.type = 'text/javascript';
      script.async = 'async';
      script.onerror = (ev) => {
        // 加载失败: 允许外部再次加载
        script.remove();
        exists = false;
        resolve(false);
      };
      script.onload = () => {
        // 加载成功: exists一直为true, 不会多次加载
        resolve(true);
      };
      document.body.appendChild(script);
    });
  };

  const { root } = window.AD_CONFIG;

  // load after DOM built
  const documentSrcs = [
    'js/copy.js',
    'js/layer.js',
    'js/scroll.js',
    'js/backTop.js',
    'js/time.js',
    'js/header.js',
    'js/passage.js',
    'js/share.js',
    'js/reward.js',
  ].map(item => `${root}${item}`);

  // load after all srcs loaded
  const windowSrcs = [
    'js/leancloud.js',
    'js/mathjax.js',
  ].map(item => `${root}${item}`);

  const documentSrcScripts = documentSrcs.map(src => loadScript(src));
  const windowSrcScripts = windowSrcs.map(src => loadScript(src));

  document.addEventListener('DOMContentLoaded', () => {
    documentSrcScripts.forEach(script => script());
  });

  window.addEventListener('load', () => {
    windowSrcScripts.forEach(script => script());
  });
  
  var coreSocialistValues = ["💗"], index = Math.floor(Math.random() * coreSocialistValues.length);
//文字颜色
    var colorArr = [
        'red','yellow','green','blue','orange','black'
    ];
    //随机取出颜色
    var colorIndex = Math.floor((Math.random()*colorArr.length));
	var color = colorArr[colorIndex];
	document.body.addEventListener('click', function(e) {
        if (e.target.tagName == 'A') {
            return;
        }
        var x = e.pageX
          , y = e.pageY
          , span = document.createElement('span');
        span.textContent = coreSocialistValues[index];
        index = (index + 1) % coreSocialistValues.length;//取模循环
        span.style.cssText = ['z-index: 9999999; position: absolute; font-weight: bold; color: ',color,' top: ', y - 20, 'px; left: ', x, 'px;'].join('');
        document.body.appendChild(span);
        animate(span);
    });
    function animate(el) {//动画
        var i = 0
          , top = parseInt(el.style.top)
          , id = setInterval(frame, 16.7);
        function frame() {//帧
            if (i > 180) {
                clearInterval(id);
                el.parentNode.removeChild(el);
            } else {
                i += 2;
                el.style.top = top - i + 'px';
                el.style.opacity = (180 - i) / 180;
            }
        }
    };
})();