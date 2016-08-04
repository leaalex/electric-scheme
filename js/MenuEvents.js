var TOOLLINECLICK = false;
var TOOLFOCUSCLICK = false;
var TOOLSETTINGCLICK = false;


function eventMenu() {
    document.getElementById('menu1').addEventListener("mouseover", function () {
        document.getElementById('menu1').setAttribute("stroke", "#dbdbdb");
        document.getElementById('menu1').setAttribute("stroke-width", "4");
        document.getElementById('menu1').setAttribute("stroke-opacity", ".4");
    });
    document.getElementById('menu1').addEventListener("mouseout", function () {
        document.getElementById('menu1').setAttribute("stroke", null);
        document.getElementById('menu1').setAttribute("strokeWidth", null);
        document.getElementById('menu1').setAttribute("strokeOpacity", null);
    });

    document.getElementById('menu2').addEventListener("mouseover", function () {
        document.getElementById('menu2').setAttribute("stroke", "#dbdbdb");
        document.getElementById('menu2').setAttribute("stroke-width", "4");
        document.getElementById('menu2').setAttribute("stroke-opacity", ".4");
    });
    document.getElementById('menu2').addEventListener("mouseout", function () {
        document.getElementById('menu2').setAttribute("stroke", null);
        document.getElementById('menu2').setAttribute("strokeWidth", null);
        document.getElementById('menu2').setAttribute("strokeOpacity", null);
    });

    document.getElementById('menuTextButton').addEventListener("mouseover", function () {
        document.getElementById('menuButton').setAttribute("fill", "#555555");
        document.getElementById('menuTextButton').setAttribute("fill", "#ffffff");
    });
    document.getElementById('menuTextButton').addEventListener("mouseout", function () {

        document.getElementById('menuButton').setAttribute("fill", "#ffffff");
        document.getElementById('menuTextButton').setAttribute("fill", "#000000");
    });

    // document.getElementById('toolFocus').addEventListener("mouseover", function () {
    //     document.getElementById('toolFocus').setAttribute("stroke", "#dbdbdb");
    //     document.getElementById('toolFocus').setAttribute("stroke-width", "4");
    //     document.getElementById('toolFocus').setAttribute("stroke-opacity", ".5");
    // });
    // document.getElementById('toolFocus').addEventListener("mouseout", function () {
    //     document.getElementById('toolFocus').setAttribute("stroke", null);
    //     document.getElementById('toolFocus').setAttribute("strokeWidth", null);
    //     document.getElementById('toolFocus').setAttribute("strokeOpacity", null);
    // });
    //
    // document.getElementById('toolsMove').addEventListener("mouseover", function () {
    //     document.getElementById('toolsMove').setAttribute("stroke", "#dbdbdb");
    //     document.getElementById('toolsMove').setAttribute("stroke-width", "4");
    //     document.getElementById('toolsMove').setAttribute("stroke-opacity", ".5");
    // });
    // document.getElementById('toolsMove').addEventListener("mouseout", function () {
    //     document.getElementById('toolsMove').setAttribute("stroke", null);
    //     document.getElementById('toolsMove').setAttribute("strokeWidth", null);
    //     document.getElementById('toolsMove').setAttribute("strokeOpacity", null);
    // });
    //
    // document.getElementById('toolsSettings').addEventListener("mouseover", function () {
    //     document.getElementById('toolsSettings').setAttribute("stroke", "#dbdbdb");
    //     document.getElementById('toolsSettings').setAttribute("stroke-width", "4");
    //     document.getElementById('toolsSettings').setAttribute("stroke-opacity", ".5");
    // });
    // document.getElementById('toolsSettings').addEventListener("mouseout", function () {
    //     document.getElementById('toolsSettings').setAttribute("stroke", null);
    //     document.getElementById('toolsSettings').setAttribute("strokeWidth", null);
    //     document.getElementById('toolsSettings').setAttribute("strokeOpacity", null);
    // });
}

function eventTools() {

    document.getElementById('toolLine').addEventListener("click", toolLineClick);
    document.getElementById('toolFocus').addEventListener("click", toolFocusClick);
    document.getElementById('toolSettings').addEventListener("click", toolSettingClick);
    document.getElementById('modalOk').addEventListener("click", function () {
        $('#modal_form')
            .animate({opacity: 0, top: '45%'}, 200,  // плaвнo меняем прoзрaчнoсть нa 0 и oднoвременнo двигaем oкнo вверх
                function () { // пoсле aнимaции
                    $(this).css('display', 'none'); // делaем ему display: none;
                    $('#overlay').fadeOut(400); // скрывaем пoдлoжку
                    CUR = null;
                    // alert(document.getElementById('modalText').value);
                }
            );
    });

}

function toolLineClick() { // нажатие на инструмент линия
    if (TOOLLINECLICK) {
        document.getElementById('toolLine').setAttribute("click", "false");
        // document.getElementById('toolLine').setAttribute("xlink:href", "#SFocus");
        document.getElementsByClassName('SLinest0')[0].style.fill = "#cccccc";
        document.getElementById('line1').setAttribute("fill", "#cccccc");
        TOOLLINECLICK = false;
        TOOLFOCUSCLICK = false;
        CLC = null;
        CUR = null;
    }
    else {
        document.getElementById('toolLine').setAttribute("click", "true");
        TOOLLINECLICK = true;
        document.getElementsByClassName('SLinest0')[0].style.fill = "#ffffff";
        document.getElementsByClassName('SFocusst0')[0].style.fill = "#cccccc";
        document.getElementsByClassName('SSettingsst0')[0].style.fill = "#cccccc";
        document.getElementById('focus1').setAttribute("fill", "#cccccc");
        document.getElementById('line1').setAttribute("fill", "#ffffff");
        document.getElementById('settings1').setAttribute("fill", "#cccccc");
        TOOLFOCUSCLICK = false;
        TOOLSETTINGCLICK = false;
        CLC = null;
        CUR = null;
    }

}


function toolFocusClick() {// нажатие на инструмент фокус
    if (TOOLFOCUSCLICK) {
        document.getElementById('toolFocus').setAttribute("click", "false");
        // document.getElementById('toolLine').setAttribute("xlink:href", "#SFocus");
        document.getElementsByClassName('SFocusst0')[0].style.fill = "#cccccc";
        document.getElementById('focus1').setAttribute("fill", "#cccccc");
        TOOLFOCUSCLICK = false;
        TOOLLINECLICK = false;

        CLC = null;
        CUR = null;
    }
    else {
        document.getElementById('toolFocus').setAttribute("click", "true");
        TOOLFOCUSCLICK = true;
        document.getElementsByClassName('SFocusst0')[0].style.fill = "#ffffff";
        document.getElementsByClassName('SLinest0')[0].style.fill = "#cccccc";
        document.getElementsByClassName('SSettingsst0')[0].style.fill = "#cccccc";
        document.getElementById('focus1').setAttribute("fill", "#ffffff");
        document.getElementById('line1').setAttribute("fill", "#cccccc");
        document.getElementById('settings1').setAttribute("fill", "#cccccc");
        TOOLSETTINGCLICK = false;
        TOOLLINECLICK = false;
        CLC = null;
        CUR = null;
    }

}

function toolSettingClick() {// нажатие на инструмент настройки прибора
    if (TOOLSETTINGCLICK) {
        document.getElementById('toolFocus').setAttribute("click", "false");
        document.getElementsByClassName('SSettingsst0')[0].style.fill = "#cccccc";
        document.getElementById('settings1').setAttribute("fill", "#cccccc");
        TOOLFOCUSCLICK = false;
        TOOLLINECLICK = false;
        TOOLSETTINGCLICK = false;
        CLC = null;
        CUR = null;
    }
    else {
        document.getElementById('toolFocus').setAttribute("click", "true");
        document.getElementsByClassName('SFocusst0')[0].style.fill = "#cccccc";
        document.getElementsByClassName('SLinest0')[0].style.fill = "#cccccc";
        document.getElementsByClassName('SSettingsst0')[0].style.fill = "#ffffff";
        document.getElementById('focus1').setAttribute("fill", "#cccccc");
        document.getElementById('line1').setAttribute("fill", "#cccccc");
        document.getElementById('settings1').setAttribute("fill", "#ffffff");
        TOOLLINECLICK = false;
        TOOLSETTINGCLICK = true;
        TOOLFOCUSCLICK = false;
        CLC = null;
        CUR = null;
    }

}




