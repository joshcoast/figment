
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
    

    function addmenulinks(){
        let path = window.location.pathname;
        if (path === "/signin"){
            $(".menulinks").append(`<li><a href="/logout" id="logoutBtn" class="transparent btn-small">Log Out</a><li/>`)
            $(".mobilelinks").append(`<li><a href="/logout" id="logoutBtn" >Log Out</a><li/>`)
        } else if (path === "/read"){
            $(".menulinks").append(`<li><a href="/write" class="transparent btn-small">Write</a><li/>
            <li><a href="/logout" id="logoutBtn" class="transparent btn-small">Log Out</a><li/>`)
        } else if (path === "/choice"){
            $(".menulinks").append(`<li><a href="/logout" id="logoutBtn" class="transparent btn-small">Log Out</a><li/>`)
        } else if (path === "/write"){
            $(".menulinks").append(`<li><a href="/read" class="transparent btn-small">Read</a><li/>
            <li><a href="/logout" id="logoutBtn" class="transparent btn-small">Log Out</a><li/>`)
        }  else if (path === "/"){
            $(".menulinks").append(`<li><a href="/signin" id="loginBtn" class="transparent btn-small">Log In</a><li/>`)
        }

    }
    addmenulinks()
  });
