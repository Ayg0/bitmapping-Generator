var x, y;

function changeme(event) {
    var elementId = event.target.id;
    let elementStyle = document.getElementById(elementId).style;
    if (elementStyle.backgroundColor == "rgb(122, 183, 178)"){
        elementStyle.backgroundColor = "rgb(171, 228, 223)";
        elementStyle.margin = "0px";
    }
    else{
        elementStyle.backgroundColor = "rgb(122, 183, 178)";
        elementStyle.margin = "3px";
    }
}

function editcontainer(x, y, container) {
    let size = 40;
    container.innerHTML = "";
    container.style.gridTemplateColumns = "repeat(" + x + ", 1fr)";
    container.style.gridTemplateRows = "repeat(" + y + ", 1fr)";
    size /= y / 20;
    container.style.width = (size * parseInt(x)) + 'px';
    container.style.height = (size * parseInt(y)) + 'px';
    container.style.borderStyle = "solid";
}

function creategrid(){
    let s = '';

    x = document.getElementById("ix").value;
    y = document.getElementById("iy").value;
    if (x > 64 || x <= 0 || y > 64 || y < 0){
        alert("Max is 64 by 64");
        return ;
    }
    let container = document.getElementById("container");
    editcontainer(x, y, container);
    for (var rows = 0; rows < y; rows++) {
        for (var columns = 0; columns < x; columns++) {
            s += '<div class="item item'+ rows + '-' + columns +'" id="item'+ rows + '-' + columns + '" onclick="changeme(event)"></div>';
        };
    };
    container.innerHTML = s;
}

function exportgrid(){
    let s = '\nbyte custom[] = {\n\t';
    let tmp;
    let start = 'B';
    let tohex = document.getElementById("tohex").checked;
    if (tohex == true)
        start = '0x';
    console.clear();
    for (let i = 0; i < y; i++) {
        s += start;
        tmp = '';
        for (let j = 0; j < x; j++) {
            tmp += Number((document.getElementById('item'+ i + '-' + j).style.backgroundColor == 'rgb(122, 183, 178)'));
        }
        if (tohex == true){
            tmp = parseInt(tmp, 2).toString(16);
        }
        s += tmp;
        if (i == y - 1)
            s += '\n};'
        else
            s += ',\n\t';
    }
    document.getElementById("pre1").style.display = "block";
    document.getElementById("output").innerText = s;
}
