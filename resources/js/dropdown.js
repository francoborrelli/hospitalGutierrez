document.getElementById("user").onclick = function(){
    x = document.getElementById("dropdown");
    x.className = "dropdown show"
};

var click = false;

document.onclick = function() {
    x = document.getElementById("dropdown");
    if (x.className === "dropdown show" && click) {
        x.className = "dropdown";
        click = false;
    }
    else{
        click = true;
    }
  }

