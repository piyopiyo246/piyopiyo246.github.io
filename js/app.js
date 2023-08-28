
 $(function () {
    
    $('.js-next').on('click', function () {
      
   　//親要素を取得してその子要素のスクロールさせたい要素を取得
      var target = $(this).parent('.js-wrapper').find('.js-scroll-content');
      var width = target.width();
      
      target.animate({
        //右にスクロール
        scrollLeft: target.scrollLeft() + width
      }, 300);
      return false;
    });
  });
  
  $('.js-prev').on('click', function () {
    
    var target = $(this).parent('.js-wrapper').find('.js-scroll-content');
    var width = target.width();
    

    target.animate({
      //左スクロール
      scrollLeft: target.scrollLeft() - width
    }, 300);
    return false;
  });
