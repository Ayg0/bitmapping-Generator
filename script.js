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
    container.innerHTML = "";
    container.style.gridTemplateColumns = "repeat(" + x + ", 1fr)";
    container.style.gridTemplateRows = "repeat(" + y + ", 1fr)";
    container.style.width = (40 * parseInt(x)) + 'px';
    container.style.height = (40 * parseInt(y)) + 'px';
    container.style.borderStyle = "solid";
}

function creategrid(){
    x = document.getElementById("ix").value;
    y = document.getElementById("iy").value;
    if (x > 16 || x <= 0 || y > 16 || y < 0){
        alert("Max is 16 by 16");
        return ;
    }
    let container = document.getElementById("container");
    editcontainer(x, y, container);
    for (var rows = 0; rows < y; rows++) {
        for (var columns = 0; columns < x; columns++) {
            container.innerHTML += '<div class="item item'+ rows + '-' + columns +'" id="item'+ rows + '-' + columns + '" onclick="changeme(event)"></div>';
        };
    };
}

function exportgrid(){
    let s = '\nbyte custom[] = {\n\tB';
    let a = ['0', '1'];
    console.clear();
    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            s += a[Number((document.getElementById('item'+ i + '-' + j).style.backgroundColor == 'rgb(122, 183, 178)'))];
        }
        if (i == y - 1)
            s += '\n};'
        else
            s += ',\n\tB';
    }
    document.getElementById("output").innerText = s;
    //console.log(s);
}
