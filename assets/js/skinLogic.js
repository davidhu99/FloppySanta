$( document ).ready(function() {
    console.log('hello')
    // if there's no current skin, set to default
    if (localStorage.getItem("currSkin") == null) {
        localStorage.setItem("currSkin", '../../images/santa.png')
        localStorage.setItem("inventory", new Object())

        console.log(localStorage.getItem("currSkin"))
    }
    console.log(localStorage.getItem("currSkin"))
    console.log(localStorage.getItem("inventory"))
});