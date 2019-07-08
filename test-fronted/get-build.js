

function getBuild()
{
    var xmlHttp = new XMLHttpRequest();
    let url = "localhost:3000/build"
    xmlHttp.open("GET", url, false)
    xmlHttp.send();
    return xmlHttp.responseText
}

var build = JSON.parse(getBuild())
console.log(build)
