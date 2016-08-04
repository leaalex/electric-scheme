var CUR = null; //нажатый элемент
var COUNT = 0; // ID элементов
var CLC = null;  // для соединения точками
var SVG;

window.onload = function () {

    SVG = document.getElementById('svg');
    eventMenu();
    eventTools();
    document.getElementById('menu1').addEventListener("click", handler1);
    document.getElementById('menu2').addEventListener("click", handler2);
    document.getElementById('menuTextButton').addEventListener("click", handlerTextButton);

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
    var cir = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    cir.setAttribute("id", COUNT);
    cir.setAttribute("r", 25);
    cir.setAttribute("cy", 150);
    cir.setAttribute("cx", 400);
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
        if (TOOLLINECLICK) {
            if (CLC == null) {
                CLC = e;
            }
            else {
                if (CLC.target.id != e.target.id) {
                    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                    line.setAttribute("id", COUNT);
                    line.setAttribute("y1", e.target.getBoundingClientRect().top + 15);
                    line.setAttribute("x1", e.target.getBoundingClientRect().left + 15);
                    line.setAttribute("y2", CLC.target.getBoundingClientRect().top + 15);
                    line.setAttribute("x2", CLC.target.getBoundingClientRect().left + 15);
                    line.setAttribute("stroke-widt", 10);
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
            if (TOOLSETTINGCLICK && CUR == null){
                e.preventDefault();
                $('#modal_form')
                    .css('display', 'block') // убирaем у мoдaльнoгo oкнa display: none;
                    .animate({opacity: 1, top: '50%'}, 200);
                CLC = null;
                CUR = e;
                document.getElementById('modalText').value = null;
            }
            else
            {
                CLC = null;
            }

        }
    });
    SVG.appendChild(cir);
    COUNT = COUNT + 1;

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
                    line.setAttribute("y1", e.target.getBoundingClientRect().top + 15);
                    line.setAttribute("x1", e.target.getBoundingClientRect().left + 15);
                    line.setAttribute("y2", CLC.target.getBoundingClientRect().top + 15);
                    line.setAttribute("x2", CLC.target.getBoundingClientRect().left + 15);
                    line.setAttribute("stroke-widt", 10);
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
            if (TOOLSETTINGCLICK && CUR == null){
                e.preventDefault();
                $('#modal_form')
                    .css('display', 'block') // убирaем у мoдaльнoгo oкнa display: none;
                    .animate({opacity: 1, top: '50%'}, 200);
                CLC = null;
                CUR = e;
                document.getElementById('modalText').value = null;
            }
            else
            {
                CLC = null;
            }

        }
    });
    SVG.appendChild(rec);
    COUNT = COUNT + 1;
}

function handlerTextButton() {

    alert("Проверка");
}

document.onmousemove = function (e) {
    if (TOOLFOCUSCLICK) {
        if (CUR != null) {
            if (e.clientX < 730 && e.clientY < 600 && e.clientY > 15 && e.clientX > 15) {
                if (CUR.target.tagName == "circle") {
                    CUR.target.setAttribute("cx", e.clientX);
                    CUR.target.setAttribute("cy", e.clientY);
                    lineCorrect(CUR);
                }
                if (CUR.target.tagName == "rect") {
                    CUR.target.setAttribute("x", e.clientX - 20);
                    CUR.target.setAttribute("y", e.clientY - 20);
                    lineCorrect(CUR);
                }
            }
        }
    }
};

document.onmouseup = function () {
    CUR = null;
};

document.onclick = function () {
    // CLC = null;
    // console.log("stop")
};


function lineCorrect(link) {
    for (var i = 0; i < SVG.children.length; i++) {
        if (SVG.children[i].getAttribute("begin")) {
            if (SVG.children[i].getAttribute("begin") == link.target.id.toString()) {
                SVG.children[i].setAttribute("begin", link.target.id);
                SVG.children[i].setAttribute("x1", link.target.getBoundingClientRect().left + 15);
                SVG.children[i].setAttribute("y1", link.target.getBoundingClientRect().top + 15);

            }
        }
        if (SVG.children[i].getAttribute("end")) {
            if (SVG.children[i].getAttribute("end") == link.target.id.toString()) {
                SVG.children[i].setAttribute("end", link.target.id);
                SVG.children[i].setAttribute("x2", link.target.getBoundingClientRect().left + 15);
                SVG.children[i].setAttribute("y2", link.target.getBoundingClientRect().top + 15);

            }
        }
    }


}