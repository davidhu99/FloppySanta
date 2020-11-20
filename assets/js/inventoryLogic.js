
$( document ).ready(function() {

    skins = { 
        "Rudolph": "../../images/temp/reindeer.png", 
        "Cookie": "../../images/temp/cookie.png",
        "Elf": "../../images/temp/elf.png"
    }
    console.log('hello world')
    inventory = JSON.parse(localStorage.getItem("inventory"));
    myInventory = new Set(inventory)

    index = 0
    myInventory.forEach(element => {
        $("." + index).find("#itemName").text(element)
        $("." + index).find(".item").attr("src", skins[element]);

        index += 1
    });

    
})
