// item cost chart!!! 
var costDict = { 
    'McJingles':  5, 
    'Trinket': 5, 
    'Gingy': 10, 
    'Freddy the Gingerbready': 25, 
    'Rudolph': 30, 
    'Frosty': 35,
    'Po': 50, 
    'Skipper': 60, 
    'Lebron': 100
}

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
        "McJingles": "../../images/McJingles.png", 
        "Trinket": "../../images/Trinket.png",
        "Gingy": "../../images/Gingy.png",
        "Freddy the Gingerbready": "../../images/Freddy_the_Gingerbready.png",
        "Rudolph": "../../images/Rudolph.png",
        "Frosty": "../../images/Frosty.png",
        "Po": "../../images/Po.png",
        "Skipper": "../../images/Skipper.png",
        "Lebron": "../../images/Lebron.png",
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
        console.log(skin)
        $("." + index).find("#itemName").text(skin);
        $("." + index).find(".item").attr("src", skins[skin]);
        $("." + index).find(".itemCost").text(costDict[skin]);
        $("." + index).find(".itemCost").append("<img class='cost' src='../../images/coin.svg'>");
        $("." + index + " .cost img").attr("src", "../../images/coin.png");

        index += 1
    }
        

    $(".close").css("visibility", "hidden")

    $(".numCoins").text(localStorage.coins)

    $( ".purchaseButton" ).click(function() {
        // get current coins
        numCoins = parseInt($('.numCoins').text())
        if (checkPurchase(numCoins, cost)){
            $(".purchaseButton").css("display", "none");
            $(".purchaseConfirmBox").css("display", "inline-block");
        } else { 
            $(".errorPurchase").css("display", "block");
        }
    });

    $( ".no" ).click(function() {
        $(".purchaseConfirmBox").css("display", "none");
        $(".purchaseButton").css("display", "inline-block");
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
        $(".purchaseConfirmBox").css("display", "none");
        $(".errorPurchase").css("display", "none");
        $(".close").css("visibility", "hidden")
    })

    // get and set currentSkin
    currSkin = localStorage.getItem("currSkin")
    $(".currChar").attr("src",currSkin);

    $( ".col-sm" ).each(function() {
        $(this).click(function() {
            $(".purchaseConfirmBox").css("display", "none");
            selectedSkin = $(this).find('img').attr('src')
            if (selectedSkin != ""){
                $(".currChar").attr("src",selectedSkin)
                selection = this
                buyItem(this)
                $(".close").css("visibility", "visible")
            }
        })
    });

});