(function() {
    var show = false;
    document.getElementById("toggler").addEventListener("click", function(){
        if (!show){
            document.getElementById("collapse").style.display = 'block';
            show = true;
        }else{
            show = false;
            document.getElementById("collapse").style.display = 'none';
        }
    });
 })();