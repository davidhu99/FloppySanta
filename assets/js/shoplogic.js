function checkPurchase(numCoins, cost){ 
    if (numCoins < cost){ 
        return false
    }
    return true
}

function addToInventory(item){ 
    inventory = JSON.parse(localStorage.getItem("inventory"));
    if (inventory === null){ 
        inventory = new Array
    }
    itemName = $(item).find('#itemName').text().trim()
    console.log(itemName)
    // itemSrc = $(item).find('.item').attr('src');

    inventory.push(itemName)
    localStorage.setItem("inventory", JSON.stringify(inventory));
}

function buyItem(item){ 
    cost = parseInt($(item).find(".itemCost").text())
    $(".purchaseButton").css("display", "inline-block");
    $(".errorPurchase").css("display", "none");
    $( ".yes" ).click(function() {
        addToInventory(item)
        item.remove()
    });
}

$( document ).ready(function() {
    if (localStorage.coins === undefined){ 
        $(".numCoins").text(0)
    } else {
        $(".numCoins").text(localStorage.coins)
    }
    $(".numCoins").text(localStorage.coins)
    $( ".purchaseButton" ).click(function() {
        // get current coins
        numCoins = parseInt($('.numCoins').text())
        if (checkPurchase(numCoins, cost)){
            $(".purchaseConfirmBox").css("display", "inline-block");
        } else { 
            $(".errorPurchase").css("display", "block");
        }
    });

    $( ".no" ).click(function() {

        $(".purchaseConfirmBox").css("display", "none");
        $(".purchaseButton").css("display", "none");
    });

    $( ".yes" ).click(function() {
        numCoins = numCoins - cost
        localStorage.coins = numCoins
        $('.numCoins').text(numCoins)
        $(".purchaseConfirmBox").css("display", "none");
        $(".purchaseButton").css("display", "none");
    });

    // get and set currentSkin
    currSkin = localStorage.getItem("currSkin")
    $(".currChar").attr("src",currSkin);


    $( ".col-sm" ).each(function() {
        $(this).click(function() {
            $(".purchaseConfirmBox").css("display", "none");
            selectedSkin = $(this).find('img').attr('src')
            $(".currChar").attr("src",selectedSkin)

            buyItem(this)
        })
    });

});