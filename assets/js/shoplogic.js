var selection = ''

function checkPurchase(numCoins, cost){ 
    if (numCoins < cost){ 
        return false
    }
    return true
}

function addToInventory(item){

    console.log(item)
    item.remove()
    inventory = JSON.parse(localStorage.getItem("inventory"));
    if (inventory === null){ 
        inventory = new Array
    }
    itemName = $(item).find('#itemName').text().trim()

    inventory.push(itemName)
    localStorage.setItem("inventory", JSON.stringify(inventory));
}

function buyItem(item){

    cost = parseInt($(item).find(".itemCost").text())
    $(".purchaseButton").css("display", "inline-block");
    $(".errorPurchase").css("display", "none");
}

$( document ).ready(function() {


    if (localStorage.coins === undefined){ 
        $(".numCoins").text(0)
    } else {
        $(".numCoins").text(localStorage.coins)
    }

    skins = { 
        "Elf": "../../images/elf.png", 
        "Elf 2": "../../images/elf2.png",
        "Gingerbread Man": "../../images/gingerbreadman.png",
        "Gingerbread Man 2": "../../images/gingerbreadman2.png",
        "Reindeer": "../../images/reindeer.png",
        "Snowman": "../../images/snowman.png"
    }
    // console.log('hello world')
    inventory = JSON.parse(localStorage.getItem("inventory"));
    myInventory = new Set(inventory)
    let itemsRemaining = [];
    for (var skin in skins){
        if (!myInventory.has(skin)){
            itemsRemaining[skin] = skins[skin];
            console.log(itemsRemaining[skin]);
        }
    }
    // console.log(itemsRemaining);
    index = 0
    for (var skin in itemsRemaining){
        $("." + index).find("#itemName").text(skin);
        $("." + index).find(".item").attr("src", skins[skin]);
        $("." + index).find(".itemCost").text(10);
        $("." + index + " .cost img").attr("src", "../../images/coin.png");

        index += 1
    }
        

    $(".close").css("visibility", "hidden")

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
        addToInventory(selection)
    });

    $(".close").click(function(){ 
        currSkin = localStorage.getItem("currSkin")
        $(".currChar").attr("src",currSkin);
        $(".purchaseButton").css("display", "none");
        $(".close").css("visibility", "hidden")
    })

    // get and set currentSkin
    currSkin = localStorage.getItem("currSkin")
    $(".currChar").attr("src",currSkin);

    $( ".col-sm" ).each(function() {
        $(this).click(function() {
            $(".purchaseConfirmBox").css("display", "none");
            selectedSkin = $(this).find('img').attr('src')
            $(".currChar").attr("src",selectedSkin)
            selection = this
            buyItem(this)
            $(".close").css("visibility", "visible")
        })
    });

});