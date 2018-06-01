$(document).ready(function () {

    //ANIMATIONS
    setInterval(function(){ $("#loginBtn").addClass("animated bounce"); }, 6000);
    $(".tagLine").addClass("hidden");
    setInterval(function(){ $(".tagLine").removeClass("hidden").addClass("animated zoomInLeft"); }, 4000);



    //SCROLLTEXT//
    var i = 0;
    var txt = 'Figment.observer'; /* The text */
    var speed = 200; /* The speed/duration of the effect in milliseconds */

    function typeWriter() {
        if (i < txt.length) {
            document.getElementById("textScroll").innerHTML += txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    function deleteReverse () {
        
    }
    

    //Mobile Navigation
    $('.sidenav').sidenav();

    $(".choiceimg").hover(
        function () {
            $(".mainbody").css({
                'background': 'linear-gradient(#206188 0% , #72c4cc 100%)',
                '-webkit-transition': 'background 0.2s ease-in-out',
                'transition': 'background 0.2s ease-in-out',
            });
        },
        function () {
            $(".mainbody").css({
                'background': 'linear-gradient(#206188 32.65% , #72c4cc 100%)',
                '-webkit-transition': 'background 0.2s ease-in-out',
                'transition': 'background 0.2s ease-in-out',
            });
        });


    function addmenulinks() {
        let path = window.location.pathname;
        if (path === "/signin") {
            $(".menulinks").append(`<li><a href="/logout" id="logoutBtn" class="light-blue darken-3 btn-small">Log Out</a><li/>`)
            $(".mobilelinks").append(`<li><a href="/logout" id="logoutBtn" >Log Out</a><li/>`)
        } else if (path === "/read") {
            $(".menulinks").append(`<li><a href="/write" class="light-blue darken-3 btn-small">Write</a><li/>
            <li><a href="/logout" id="logoutBtn" class="light-blue darken-3 btn-small">Log Out</a><li/>`)
            $(".mobilelinks").append(`<li><a href="/write">write</a><li/>
            <li><a href="/logout" id="logoutBtn">Log Out</a><li/>`)
        } else if (path === "/choice") {
            $(".menulinks").append(`<li><a href="/logout" id="logoutBtn" class="light-blue darken-3 btn-small">Log Out</a><li/>`)
            $(".mobilelinks").append(`<li><a href="/logout" id="logoutBtn" >Log Out</a><li/>`)
        } else if (path === "/write") {
            $(".menulinks").append(`<li><a href="/read" class="light-blue darken-3 btn-small">Read</a><li/>
            <li><a href="/logout" id="logoutBtn" class="light-blue darken-3 btn-small">Log Out</a><li/>`)
            $(".mobilelinks").append(`<li><a href="/read" >Read</a><li/>
            <li><a href="/logout" id="logoutBtn">Log Out</a><li/>`)
        } else if (path === "/") {
            $(".menulinks").append(`<li><a href="/signin" id="loginBtn" class="light-blue darken-3 btn-small">Log In</a><li/>`)
            $(".mobilelinks").append(`<li><a href="/signin" id="loginBtn"" >Log In</a><li/>`)
        }

    }
    addmenulinks();
    typeWriter();

});
