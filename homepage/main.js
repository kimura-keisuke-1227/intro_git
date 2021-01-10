/**
 * selectorに該当するタブを表示する関数
 */
const showTab = (selector) => {
    // 引数selectorの中身をコンソールで確認する
    console.log(selector);
  
    /* 1. タブの選択状態のリセット */
  
    // いったん、すべての.tabs-menu > liからactiveクラスを削除する
    $('.tabs-menu > li').removeClass('active');
  
    // いったん、すべての.tabs-content > sectionを非表示にする
    $('.tabs-content > section').hide();
  
    /* 2. 選択されたタブの表示 */
  
    // .tabs-menu liのうち、selectorに該当するものにだけactiveクラスを付ける
    $(`.tabs-menu a[href="${selector}"]`)
      .parent('li')
      .addClass('active');
  
    // .tabs-content > sectionのうち、selectorに該当するものだけを表示する
    $(selector).show();
  };
  
  // タブがクリックされたらコンテンツを表示
  $('.navbar-nav a').on('click', (e) => {
    // hrefへのページ遷移を止める
    e.preventDefault();
  
    // hrefの値を受け取った後、showTab()関数に渡す。e.targetはクリックされたタブ（.tabs-menu a）を表す
    const selector = $(e.target).attr('href');
    showTab(selector);
  });
  
  // 初期状態として1番目のタブを表示
  showTab('#tabs-1');