var CUR = null; //нажатый элемент

var COUNT = 0; // ID элементов
var CLC = null;  // для соединения точками
var SVG;
var COORDS;
var NEWELEM = false;

window.onload = function () {

    SVG = document.getElementById('svg');
    // eventMenu();
    // eventTools();
    document.getElementById('m1').addEventListener("click", handler1);
    // document.getElementById('menu2').addEventListener("click", handler2);
    // document.getElementById('menuTextButton').addEventListener("click", handlerTextButton);

    COORDS = document.getElementById("svg").getBoundingClientRect();

    createGrid();

    // ЗАКРЫТИЕ ВСПЛЫВАЮЩЕГО ОКНА
    $('#modal_close, #overlay').click(function () { // лoвим клик пo крестику или пoдлoжке
        $('#modal_form')
            .animate({opacity: 0, top: '45%'}, 200,  // плaвнo меняем прoзрaчнoсть нa 0 и oднoвременнo двигaем oкнo вверх
                function () { // пoсле aнимaции
                    $(this).css('display', 'none'); // делaем ему display: none;
                    $('#overlay').fadeOut(400); // скрывaем пoдлoжку
                    CUR = null;

                }
            );
    });

};


function handler1() {

    NEWELEM = true;
}

function handler2() {

    var rec = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rec.setAttribute("id", COUNT);
    rec.setAttribute("height", 40);
    rec.setAttribute("width", 40);
    rec.setAttribute("y", 90);
    rec.setAttribute("x", 100);
    rec.setAttribute("fill", 'coral');
    rec.addEventListener("mouseout", function () {
        rec.setAttribute("stroke", null);
        rec.setAttribute("strokeWidth", null);
        rec.setAttribute("strokeOpacity", null);
    });
    rec.addEventListener("mouseover", function () {
        rec.setAttribute("stroke", "#dbdbdb");
        rec.setAttribute("stroke-width", "4");
        rec.setAttribute("stroke-opacity", ".5");
    });
    rec.addEventListener("mousedown", function (e) {
        CUR = e;
        e.ondragstart = function () {
            return false;
        };
    });
    rec.addEventListener("click", function (e) {
        if (TOOLLINECLICK) {

            if (CLC == null) {
                CLC = e;
            }
            else {
                if (CLC != e) {
                    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                    line.setAttribute("id", COUNT);
                    line.setAttribute("y1", e.target.getBoundingClientRect().top - COORDS.top + 30);
                    line.setAttribute("x1", e.target.getBoundingClientRect().left - COORDS.left + 30);
                    line.setAttribute("y2", CLC.target.getBoundingClientRect().top - COORDS.top + 30);
                    line.setAttribute("x2", CLC.target.getBoundingClientRect().left - COORDS.left + 30);
                    line.setAttribute("stroke-width", 3);
                    line.setAttribute("stroke", "black");
                    line.setAttribute("begin", e.target.id);
                    line.setAttribute("end", CLC.target.id);
                    CLC = null;
                    COUNT = COUNT + 1;
                    SVG.appendChild(line);
                }
            }
        }
        else {
            if (TOOLSETTINGCLICK && CUR == null) {
                e.preventDefault();
                $('#modal_form')
                    .css('display', 'block') // убирaем у мoдaльнoгo oкнa display: none;
                    .animate({opacity: 1, top: '50%'}, 200);
                CLC = null;
                CUR = e;
                document.getElementById('modalText').value = null;
            }
            else {
                CLC = null;
            }

        }
    });
    SVG.appendChild(rec);
    COUNT = COUNT + 1;
    CLC = null;
}

document.onmousemove = function (e) {
    if (NEWELEM) {
        var cir = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        var coords = document.getElementById("svg").getBoundingClientRect();

        cir.setAttribute("id", COUNT);
        cir.setAttribute("r", 25);
        cir.setAttribute("cy", e.clientY - coords.top);
        cir.setAttribute("cx", e.clientX - coords.left);
        cir.setAttribute("fill", 'lightblue');
        cir.addEventListener("mouseout", function () {
            cir.setAttribute("stroke", null);
            cir.setAttribute("strokeWidth", null);
            cir.setAttribute("strokeOpacity", null);
        });
        cir.addEventListener("mouseover", function () {
            cir.setAttribute("stroke", "#dbdbdb");
            cir.setAttribute("stroke-width", "4");
            cir.setAttribute("stroke-opacity", ".5");
        });
        cir.addEventListener("mousedown", function (e) {
            CUR = e;
            e.ondragstart = function () {
                return false;
            };
        });
        cir.addEventListener("click", function (e) {
            if (CLC == null) {
                CLC = e;
            }
            else {
                if (CLC.target.id != e.target.id) {
                    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                    line.setAttribute("id", COUNT);
                    line.setAttribute("y1", e.target.getBoundingClientRect().top - COORDS.top + 30);
                    line.setAttribute("x1", e.target.getBoundingClientRect().left - COORDS.left + 30);
                    line.setAttribute("y2", CLC.target.getBoundingClientRect().top - COORDS.top + 30);
                    line.setAttribute("x2", CLC.target.getBoundingClientRect().left - COORDS.left + 30);
                    line.setAttribute("stroke-width", 3);
                    line.setAttribute("stroke", "black");
                    line.setAttribute("begin", e.target.id);
                    line.setAttribute("end", CLC.target.id);
                    CLC = null;
                    COUNT = COUNT + 1;
                    SVG.appendChild(line);
                }
            }

            // }
            // else {
            //     if (TOOLSETTINGCLICK && CUR == null) {
            //         e.preventDefault();
            //         $('#modal_form')
            //             .css('display', 'block') // убирaем у мoдaльнoгo oкнa display: none;
            //             .animate({opacity: 1, top: '50%'}, 200);
            //         CLC = null;
            //         CUR = e;
            //         document.getElementById('modalText').value = null;
            //     }
            //     else {
            //         CLC = null;
            //     }
            //
            // }
        });
        SVG.appendChild(cir);
        COUNT = COUNT + 1;
        NEWELEM = false;
        CUR = cir;


    }
    if (CUR != null) {
        // if (e.clientX < 730 && e.clientY < 600 && e.clientY > 15 && e.clientX > 15) {
        // if (CUR.target.tagName == "circle") {

        var coords = document.getElementById("svg").getBoundingClientRect();
        if (e.target == undefined) {
            var x = Number(e.target.clientX - coords.left);
            var y = Number(e.target.clientY - coords.top);

            CUR.target.setAttribute("cx", x);
            CUR.target.setAttribute("cy", y);

        }
        else {
            var x = Number(e.clientX - coords.left);
            var y = Number(e.clientY - coords.top);

            if (CUR.target == undefined) {

                CUR.setAttribute("cx", x);
                CUR.setAttribute("cy", y);

            }
            else {
                CUR.target.setAttribute("cx", x);
                CUR.target.setAttribute("cy", y);
            }
            

        }
        lineCorrect(CUR);
        CLC = null;
    }

};

document.onmouseup = function () {
    CUR = null;
};

function lineCorrect(link) {
    if (link.target == undefined) {
        for (var i = 0; i < SVG.children.length; i++) {
            if (SVG.children[i].getAttribute("begin")) {
                if (SVG.children[i].getAttribute("begin") == link.id.toString()) {
                    SVG.children[i].setAttribute("begin", link.id);
                    SVG.children[i].setAttribute("x1", link.getBoundingClientRect().left - COORDS.left + 35);
                    SVG.children[i].setAttribute("y1", link.getBoundingClientRect().top - COORDS.top + 35);

                }
            }
            if (SVG.children[i].getAttribute("end")) {
                if (SVG.children[i].getAttribute("end") == link.id.toString()) {
                    SVG.children[i].setAttribute("end", link.id);
                    SVG.children[i].setAttribute("x2", link.getBoundingClientRect().left - COORDS.left + 35);
                    SVG.children[i].setAttribute("y2", link.getBoundingClientRect().top - COORDS.top + 35);

                }
            }
        }
    }
    else {
        for (var i = 0; i < SVG.children.length; i++) {
            if (SVG.children[i].getAttribute("begin")) {
                if (SVG.children[i].getAttribute("begin") == link.target.id.toString()) {
                    SVG.children[i].setAttribute("begin", link.target.id);
                    SVG.children[i].setAttribute("x1", link.target.getBoundingClientRect().left - COORDS.left + 35);
                    SVG.children[i].setAttribute("y1", link.target.getBoundingClientRect().top - COORDS.top + 35);

                }
            }
            if (SVG.children[i].getAttribute("end")) {
                if (SVG.children[i].getAttribute("end") == link.target.id.toString()) {
                    SVG.children[i].setAttribute("end", link.target.id);
                    SVG.children[i].setAttribute("x2", link.target.getBoundingClientRect().left - COORDS.left + 35);
                    SVG.children[i].setAttribute("y2", link.target.getBoundingClientRect().top - COORDS.top + 35);

                }
            }
        }
    }
}