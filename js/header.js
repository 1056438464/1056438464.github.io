(() => {
  function openGoogle(keywords) {
    keywords = `site:${window.location.hostname} ${decodeURIComponent(keywords)}`;
    let href = `https://www.google.com/search?q=${keywords}`;
    window.open(href);
  }

  const searchBtn = document.querySelector('#site-search'),
    nav = document.querySelector('#site-nav'),
    navBtn = document.querySelector('#site-nav-btn'),
    layer = document.querySelector('#site-layer'),
    layerContent = layer.querySelector('.site-layer-content'),
    title = document.querySelector('#site-layer-title'),
    searchDOM = document.querySelector('#site-layer-search');

  const inputDOM = searchDOM.querySelector('input'),
    iconDOM = searchDOM.querySelector('i');

  searchBtn.addEventListener('click', (e) => {
    layer.style.display = 'block';
    searchDOM.style.display = 'flex';
    inputDOM.focus();
    title.innerHTML = '搜索';

    window.AD_CONFIG.layer.add(() => {
      title.innerHTML = '';
      inputDOM.blur();
      searchDOM.style.display = 'none';
    });
  });

  inputDOM.addEventListener('keypress', (e) => {
    let key = e.which || e.keyCode,
      value = inputDOM.value.trim();

    if(key === 13 && value.length > 0) {
      openGoogle(value);
    }
  });

  iconDOM.addEventListener('click', (e) => {
    inputDOM.focus();
    let value = inputDOM.value.trim();
    if(value.length > 0) {
      openGoogle(value);
    }
  });

  navBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    layer.style.display = 'block';
    layerContent.style.display = 'none';
    nav.style.right = '0';

    window.AD_CONFIG.layer.add(() => {
      nav.style.right = '';
      layer.style.display = 'none';
      layerContent.style.display = '';
    });
  });
  
})();

(() => {
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