var selection = ""

$( document ).ready(function() {
    $(".equipped").css("display", "none")

    currSkin = localStorage.getItem("currSkin")
    $(".currChar").attr("src",currSkin);

   


    skins = {
        "santa": "../../images/santa.png",
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
    

    inventory = JSON.parse(localStorage.getItem("inventory"));
    myInventory = new Set(inventory)

    index = 0
    myInventory.forEach(element => {
        currSkinName = localStorage.currSkin.split('/').pop().split('.')[0].replace(/_/g, ' ');
        if (element == currSkinName){ 
            $("." + index).find("#itemName").text('Santa')
            $("." + index).find(".item").attr("src", skins['santa']);
            $("." + index).click(function() { 
                $(".currChar").attr("src", skins["santa"])
                $(".equipButton").css("display", "inline-block")
                $(".equipped").css("display", "none")
                selection = "santa"
                
            })
            index += 1
        } else { 
            $("." + index).find("#itemName").text(element)
            $("." + index).find(".item").attr("src", skins[element]);  
            $("." + index).click(function() { 
                if (skins[element] == localStorage.currSkin){
                    $(".currChar").attr("src", skins[element])
                    $(".equipped").css("display", "inline-block")
                    $(".equipButton").css("display", "none")
    
                } else { 
                    $(".currChar").attr("src", skins[element])
                    $(".equipButton").css("display", "inline-block")
                    $(".equipped").css("display", "none")
                    selection = element
                }
            })
            index += 1 
        }
       
        
    });
    
    $(".equipButton").click(function(){ 
        console.log('in equip')
        localStorage.currSkin = skins[selection]
        $(".equipButton").css("display", "none")
        $(".equipped").css("display", "inline-block")
        console.log(localStorage.currSkin)
        setTimeout(() => {
            location.reload();
        }, 500);
    })
    
})
