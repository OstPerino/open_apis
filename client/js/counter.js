
function getCookie(byname){
    byname=byname+"=";
    nlen = byname.length;
    fromN = document.cookie.indexOf(byname)+0;
    if((fromN) != -1) {
        fromN += nlen
        toN = document.cookie.indexOf(";",fromN)+0;
        if(toN == -1) { toN = document.cookie.length; }
        return unescape(document.cookie.substring(fromN,toN));
    }
    return null;
}

function parseCookie() {
    var cookieList = document.cookie.split("; ");

    var cookieArray = new Array();
    
    for (var i = 0; i < cookieList.length; i++) {
        var name = cookieList[i].split("=");
        cookieArray[unescape(name[0])] = unescape(name[1]);
    }

    return cookieArray;
}

function setCookie(visits) {
    var expireDate = new Date();
    var today = new Date();

    expireDate.setDate(365 + expireDate.getDate());

    document.cookie = "visits=" + visits +
                    "; expires=" + expireDate.toGMTString() + ";";

    document.cookie = "LastVisit=" + escape(today.toGMTString()) +
                        "; expires=" + expireDate.toGMTString() + ";";
 }