
// Global variables
var colorset;
var color2, color4, color5;
var nodescolor, nodeslogocolor;

var blocks_shown = true;
var old_main_post_class = '';
var old_main_pre_class = '';

function close_agora_alerts() {
    var element = document.getElementById("agora-alerts");
    element.parentNode.removeChild(element);
    return false;
}

function init_nodes_colors(color, logocolor) {
    nodescolor = color;
    nodeslogocolor = logocolor;
}


function changeColors() {
    colorProfile = colorset.value;

    if(colorProfile == 'grana') {
        color2.value = '#AC2013';
        color4.value = '#303030';
        color5.value = '#AC2013';
    }
    else if(colorProfile == 'coral') {
        color2.value = '#FF4444';
        color4.value = '#00BBBB';
        color5.value = '#008888';
    }
    else if(colorProfile == 'kellygreen') {
        color2.value = '#349C5F';
        color4.value = '#B27409';
        color5.value = '#B27409';
    }
    else if(colorProfile == 'colourful') {
        color2.value = '#0996B2';
        color4.value = '#BF1D61';
        color5.value = '#BF1D61';
    } else if(colorProfile == 'nodes') {
        color2.value = nodescolor;
        color4.value = nodescolor;
        color5.value = nodescolor;
        logocolor.value = nodeslogocolor;
        var logocolorpick = logocolor.parentNode.getElementsByClassName("currentcolour")[0];
        logocolorpick.style.backgroundColor = logocolor.value;
    }

    var color2pick = color2.parentNode.getElementsByClassName("currentcolour")[0];
    var color4pick = color4.parentNode.getElementsByClassName("currentcolour")[0];
    var color5pick = color5.parentNode.getElementsByClassName("currentcolour")[0];

    color2pick.style.backgroundColor = color2.value;
    color4pick.style.backgroundColor = color4.value;
    color5pick.style.backgroundColor = color5.value;
}


function changeToPersonalized() {
    colorset.value = 'personalitzat';
    color2pick.style.backgroundColor = color2.value;
    color4pick.style.backgroundColor = color4.value;
    color5pick.style.backgroundColor = color5.value;
}


function xtec2_theme_onload() {

    colorset = document.getElementById('id_s_theme_xtec2_colorset');

    // This condition ensures that this code is only loaded while configuring
    //  xtec2 theme. This is mandatory because if id's don't exist in HTML code,
    //  this code generates a javascript conflict in admin menu.
    if (colorset != null) {
        color2 = document.getElementById('id_s_theme_xtec2_color2');
        color4 = document.getElementById('id_s_theme_xtec2_color4');
        color5 = document.getElementById('id_s_theme_xtec2_color5');
        logocolor = document.getElementById('id_s_theme_xtec2_logo_color');

        color2.addEventListener('input', changeToPersonalized, false);
        color4.addEventListener('input', changeToPersonalized, false);
        color5.addEventListener('input', changeToPersonalized, false);
        logocolor.addEventListener('input', changeToPersonalized, false);

        colorset.addEventListener('change', changeColors, false);
    }
}

function showhideblocks(){
    YUI().use('moodle-theme_bootstrapbase-bootstrap', function(Y) {
        var main_pre = Y.one('#region-bs-main-and-pre');
        if(main_pre == null) main_pre = Y.one('#region-bs-main-and-post');
        var main_post = Y.one('#region-main');

        if(blocks_shown){
            //Hide
            Y.one('#block-region-side-post').hide();
            Y.one('#block-region-side-pre').hide();

            old_main_post_class = main_pre.getAttribute('class');
            main_pre.removeClass(old_main_post_class);
            main_pre.addClass('span12');

            old_main_pre_class = main_post.getAttribute('class');
            main_post.removeClass(old_main_pre_class);
            main_post.addClass('span12');

            Y.one('#showhideblocks').removeClass('collapsed');
            Y.one('#showhideblocks').addClass('expanded');
            Y.one('body').addClass('blocks_collapsed');
        } else {
            //Show
            Y.one('#block-region-side-post').show();
            Y.one('#block-region-side-pre').show();

            main_pre.removeClass('span12');
            main_pre.addClass(old_main_post_class);

            main_post.removeClass('span12');
            main_post.addClass(old_main_pre_class);

            Y.one('#showhideblocks').removeClass('expanded');
            Y.one('#showhideblocks').addClass('collapsed');
            Y.one('body').removeClass('blocks_collapsed');
        }
    });
    blocks_shown = !blocks_shown;
}


M.theme_xtec2 = {};

M.theme_xtec2.init = function(Y) {

    var usermenu = Y.one('#usermenu');

    if (usermenu != null) {

        Y.one('#usermenu_toogle').on('clickoutside', function () {
            usermenu.removeClass('open');
        });

        Y.one('#usermenu_toogle').on('click', function (e){
            usermenu.toggleClass('open');
            e.stopPropagation();
            return false;
        });
    }

    Y.on('click', function (e) {
        this.ancestor(".block").toggleClass('hidden');
        e.stopPropagation();
        return false;
    }
    , '.block .header h2');
};