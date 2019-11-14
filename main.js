$(function () {
    var activeRow =null;
    var activeMenu;

    var mouseInSub=false;

    $('#subMenu').on('mouseenter',function (e) {
        mouseInSub = true;
      }).on('mouseleave',function (e) {
          mouseInSub = false;
        })
    
    $('#all').on('mouseenter',function (e) {
        $('#subMenu').removeClass('none');
      }).on('mouseenter','li',function (e) {
            if(!activeRow){
                activeRow=$(e.target);
                activeMenu = $('#'+activeRow.data('id'));
                activeMenu.removeClass('none');
                return;
            }

            setTimeout(() => {
                if(mouseInSub){
                    return;
                }

                activeMenu.addClass('none');
                activeRow = $(e.target);
                activeMenu = $('#'+activeRow.data('id'));
                activeMenu.removeClass('none');
            }, 200);
        }).on('mouseleave',function (e) {
            $('#subMenu').addClass('none');

            if(activeRow){
                activeMenu.addClass('none');
                activeMenu = null;
                activeRow = null;
            }
          })



});