// Global Handles


$( document ).ready(function() {
    $( ".purchaseButton" ).click(function() {
        $(".purchaseConfirmBox").css("display", "inline-block");
    });

    $( ".no" ).click(function() {
        console.log('hello')
        $(".purchaseConfirmBox").css("display", "none");
    });
});