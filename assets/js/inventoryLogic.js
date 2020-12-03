
$( document ).ready(function() {

    skins = { 
        "Elf": "../../images/elf.png", 
        "Elf 2": "../../images/elf2.png",
        "Gingerbread Man": "../../images/gingerbreadman.png",
        "Gingerbread Man 2": "../../images/gingerbreadman2.png",
        "Reindeer": "../../images/reindeer.png",
        "Snowman": "../../images/snowman.png"
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
