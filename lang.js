(function () {
  var KEY = 'pharos-lang';
  var btn = document.getElementById('langBtn');

  function isZhValue(v) {
    return v === 'zh' || v === 'zh-Hant' || v === 'zh-hant';
  }

  function apply(lang) {
    var zh = isZhValue(lang);
    document.body.classList.toggle('lang-zh', zh);
    document.documentElement.lang = zh ? 'zh-Hant' : 'en';
    if (btn) {
      btn.textContent = zh ? 'EN' : '繁中';
      btn.setAttribute('aria-label', zh ? 'Switch to English' : '切換至繁體中文');
    }
  }

  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}

  var fromUrl = null;
  try { fromUrl = new URLSearchParams(location.search).get('lang'); } catch (e) {}

  var initial = fromUrl ? fromUrl : (saved || 'en');
  apply(initial);

  if (btn) {
    btn.addEventListener('click', function () {
      var next = document.body.classList.contains('lang-zh') ? 'en' : 'zh';
      try { localStorage.setItem(KEY, next); } catch (e) {}
      apply(next);
    });
  }
})();
