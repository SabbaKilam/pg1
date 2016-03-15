/*
    Author: Abbas Abdulmalik
    Creation Date: February 15, 2016
    Title: First Phone gap app
    Revised: February 22, 2016
    Purpose: get used to phone gap
    Notes:
*/
var $$ = lib;

//===============================================
//--------Driver's Seat-------------------------
window.onload = resize;
window.onresize = resize;
$$("#menu").hover(overMenu, offMenu);
$$("#menu").toggle(openMenu, closeMenu);


//===============================================
//---------under the hood------------------------
function openMenu(){
    $$("#frontPanel")
        .css("right","-40%")
        .css("left", "60%")
    ;    
}
function closeMenu(){
    $$("#frontPanel")
        .css("right","0")
        .css("left","0")
    ;
}
function overMenu(){
    $$("#menu").css("color","white");
}
function offMenu(){
    $$("#menu").css("color","lightblue");    
}
function resize(){
    var size = window.innerWidth;
    var screen = window.screen.width;
    var root = document.documentElement;
    root.style.fontSize = (10 + size/200) + "px";
}






