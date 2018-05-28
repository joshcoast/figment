$(document).ready(function(){
    $('.sidenav').sidenav();
    $(".choiceimg").hover(    
    function(){
        $(".mainbody").css({
            'background' : 'linear-gradient(#206188 0% , #72c4cc 100%)',
            '-webkit-transition': 'background 0.2s ease-in-out',
            'transition': 'background 0.2s ease-in-out',
         });
    },
    function(){
        $(".mainbody").css({
            'background' : 'linear-gradient(#206188 32.65% , #72c4cc 100%)',
            '-webkit-transition': 'background 0.2s ease-in-out',
            'transition': 'background 0.2s ease-in-out',
         });
    });
  });
