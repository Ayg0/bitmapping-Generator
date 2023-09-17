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
function creategrid(){
    x = document.getElementById("ix").value;
    y = document.getElementById("iy").value;
    let n = 0;
    let container = document.getElementById("container");
    container.innerHTML = "";
    container.style.gridTemplateColumns = "repeat(" + x + ", 1fr)";
    container.style.gridTemplateRows = "repeat(" + y + ", 1fr)";
    for (var rows = 0; rows < y; rows++) {
        for (var columns = 0; columns < x; columns++) {
            container.innerHTML += '<div class="item item'+ rows + '' + columns +'" id="item'+ rows + '' + columns + '" onclick="changeme(event)"></div>';
            n++;
        };
        n++;
    };
}

function exportgrid(){
    let s = '';
    console.clear();
    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            s += Number((document.getElementById('item'+ i + '' + j).style.backgroundColor == 'rgb(122, 183, 178)'));
            if (j < x - 1)
                s += (', ');
        }
        s += '\n';
    }
    console.log(s);
}
