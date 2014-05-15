var start;
var end;
var active = false;


function down(event) {
    start = event.target.attributes["data-value"].value;
    end = event.target.attributes["data-value"].value;
    active = true;
    draw(start, end);
}

function up(event) {
    active = false;
    draw(start, end);
}

function leave(event) {
    active = false;
}

function join(event) {
    if (!active){return;}
    end = event.target.attributes["data-value"].value;
    draw(start, end);
}

function onload() {
    var trg = document.getElementById("day_0")
    trg.addEventListener("pointerdown", down, false);
    trg.addEventListener("pointerup", up, false);
    trg.addEventListener("pointerleave", leave, false);
    trg.addEventListener("pointermove", join, false);
}

window.addEventListener("load", onload, false);

function draw(s,f){
    var begin = Math.min(s, f);
    var end = Math.max(s, f);
    var e = document.getElementById("range");
    var e_b = document.getElementById("day_0_"+begin);
    var e_e = document.getElementById("day_0_"+end);
    e.style.top = e_b.getBoundingClientRect().top;
    //e.style.right = e_b.getBoundingClientRect().right;
    e.style.height =  (end-begin +1) * e_e.offsetHeight;
    e.style.width = e_e.offsetWidth;
    e.style.display = "block";
    }