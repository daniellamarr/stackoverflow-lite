$(function(){
    $(".has-dropdown .ti-menu").click(function(e){
        $(".has-dropdown + .dropdown").removeClass("hide")
        $(".has-dropdown .ti-menu").addClass("hide")
        $(".has-dropdown .ti-close").removeClass("hide")
        $(".search-d + .dropdown").addClass("hide")
    })
    $(".has-dropdown .ti-close").click(function(e){
        $(".has-dropdown + .dropdown").addClass("hide")
        $(".has-dropdown .ti-close").addClass("hide")
        $(".has-dropdown .ti-menu").removeClass("hide")
        $(".search-d + .dropdown").addClass("hide")
    })
    $(".search-d").click(function(){
        $(".search-d + .dropdown").removeClass("hide")
        $(".has-dropdown + .dropdown").addClass("hide")
        $(".has-dropdown .ti-close").addClass("hide")
        $(".has-dropdown .ti-menu").removeClass("hide")
        $(".search").focus()
    })
    $(".search").on("focusout",function(){
        $(".search-d + .dropdown").addClass("hide")
    })
})