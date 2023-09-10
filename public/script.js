function setcategoryvalue(){
    var sel = document.getElementById("categories");
    document.getElementById("selectedcategory").value = sel.options[sel.selectedIndex].text;
}
function shwmodal(){
    // Get the modal
    var modal = document.getElementById("myModal");
    // Get the <span> element that closes the modal
    modal.style.display = "block";
}
function close2(){
    var frm1 =  document.getElementById("frm");
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    if(submitfrm=true){
        frm1.submit();
    }
}
    
function msg(m){
    document.getElementById("msg").innerHTML="<center><p>" + m + "</p></center>";
}


setcategoryvalue();
