var x, y;
let active_color = "rgb(122, 183, 178)";
let unactive_color = "rgb(171, 228, 223)";

function changeme(event) {
    var elementId = event.target.id;
    let elementStyle = document.getElementById(elementId).style;
    if (elementStyle.backgroundColor == active_color){
        elementStyle.backgroundColor = unactive_color;
        elementStyle.margin = "0px";
    }
    else{
        elementStyle.backgroundColor = active_color;
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

function linestart(flag) {
    if (flag)
        return "0x";
    return "B";    
}

function get_item_background(item){
    return document.getElementById(item).style.backgroundColor;
}

function get_output(output, hex, reverse_h, reverse_v, nl){
    let tmp;
    let v   = [0, y, 1];
    let h   = [0, x, 1];
    let start = 'B';
    let separator = '\n\t';

    if (reverse_v)
        v[0] = y - 1, v[1] = -1, v[2] = -1;
    if (reverse_h)
        h[0] = x - 1, h[1] = -1, h[2] = -1;
    if (hex)
        start = '0x';
    if (nl)
        separator = ' ';
    for (let i = v[0]; i != v[1]; i += v[2]) {
        output += start;
        tmp = '';
        for (let j = h[0]; j != h[1]; j += h[2]){
            tmp += Number(get_item_background('item'+ i + '-' + j) == active_color);
        }
        if (hex)
            tmp = parseInt(tmp, 2).toString(16).toUpperCase();
        if (i == (v[1] - v[2]))
            tmp += '};';
        else
            tmp += ',' + separator;
        output += tmp;
    }
    return (output);
}


function exportgrid(){
    let output = '\nbyte custom[] = {\n\t';
    let hex = document.getElementById("tohex").checked;
    let nl = document.getElementById("nl").checked;
    let reverse_h = document.getElementById("reverse-h").checked;
    let reverse_v = document.getElementById("reverse-v").checked; 

    console.clear();
    output = get_output(output, hex, reverse_h, reverse_v, nl);
    document.getElementById("pre1").style.display = "block";
    document.getElementById("output").innerText = output;
}
