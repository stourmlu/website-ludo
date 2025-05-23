//https://stackoverflow.com/questions/21012580/is-it-possible-to-write-data-to-file-using-only-javascript
// apparently works until 2MB
/*function download(strData, strFileName, strMimeType) {
    a.href = "data:" + strMimeType + "charset=utf-8," + escape(strData);
    a.setAttribute("download", strFileName);
    a.innerHTML = "downloading...";
    document.body.appendChild(a);   
    setTimeout(function() {
        var e = document.createEvent("MouseEvents");
        e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
        document.body.removeChild(a);
    }, 66);
    return true;
}*/

// https://stackoverflow.com/questions/19327749/javascript-blob-filename-without-link
// apparently works until 8MB
var saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (mytext, fileName) {
        var blob = new Blob([mytext], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());


var svgElement = document.getElementsByTagName('svg');
mytext = svgElement[0].outerHTML
mytext = mytext.replace("<svg", "<svg xmlns='http://www.w3.org/2000/svg'");
saveData(mytext, 'my_map.svg');
