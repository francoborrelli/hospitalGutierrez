document.getElementById("user").onclick = function(){
    x = document.getElementById("dropdown");
    x.className = "dropdown nav-item show";
};

var click = false;

document.onclick = function() {
    x = document.getElementById("dropdown");
    if (x.className === "dropdown nav-item show" && click) {
        x.className = "dropdown nav-item";
        click = false;
    }
    else if (x.className === "dropdown nav-item show") {
        click = true;
    }
};

