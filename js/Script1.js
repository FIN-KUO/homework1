//計算BMI
var btn = document.querySelector('#bmi_ca_btn');
btn.addEventListener('click', check_input, false);
var list = document.querySelector('#bmi_list');

var type_list = JSON.parse(localStorage.getItem('type')) || [];
var height_list = JSON.parse(localStorage.getItem('height')) || [];
var weight_list = JSON.parse(localStorage.getItem('weight')) || [];
var bmi_list = JSON.parse(localStorage.getItem('bmi')) || [];
var state_list = JSON.parse(localStorage.getItem('state')) || [];
var time_list = JSON.parse(localStorage.getItem('time')) || [];
var Today = new Date();
updateList(type_list, height_list, weight_list, bmi_list, state_list, time_list);

function check_input()
{
    var height = document.querySelector('#people_height').value;
    var weight = document.querySelector('#people_weight').value;
    if (height <= 0 || weight <= 0)
    {
        alert( '請輸入身高及體重!!!');
    }
    else
    {
        bmi_ca(height, weight);
    }
}
function bmi_ca(height, weight)
{
    var bmi = Math.round(weight / Math.pow(height / 100, 2) * 100) / 100;
    var state = '';//狀態
    var css = '';
    var logo_back = '';
    var type = 0;
    if (bmi < 18.5)
    {
        state = '過輕';
        css = 'btn_blue';
        logo_back = 'logo_blue';
        type = 1;
    }
    else if (bmi >= 18.5 && bmi < 25)
    {
        state = '理想';
        css = 'btn_green';
        logo_back = 'logo_green';
        type = 2;
    }
    else if (bmi >= 25 && bmi < 30)
    {
        state = '過重';
        css = 'btn_orange1';
        logo_back = 'logo_orange1';
        type = 3;
    }
    else if (bmi >= 30 && bmi < 35)
    {
        state = '輕度肥胖';
        css = 'btn_orange2';
        logo_back = 'logo_orange2';
        type = 4;
    }
    else if (bmi >= 35 && bmi < 40)
    {
        state = '中度肥胖';
        css = 'btn_orange3';
        logo_back = 'logo_orange3';
        type = 5;
    }
    else if (bmi > 40)
    {
        state = '重度肥胖';
        css = 'btn_red';
        logo_back = 'logo_red';
        type = 6;
    }
    var btn = document.querySelector('#bmi_ca_btn');
    var result = document.querySelector('#bmi_ca_state');
    var result_bmi = document.querySelector('#bmi_ca_bmi');
    var txt = document.querySelector('#txt_bmi');
    var img = document.querySelector('#reset_logo');
    result.innerHTML = state;
    result_bmi.innerHTML = bmi;
    btn.setAttribute('class', 'btn btn_result ' + css);
    result.setAttribute('class', css);
    result_bmi.setAttribute('class', 'bmi_ca_bmi_result')
    txt.setAttribute('class', 'text_btn_bmi')
    img.setAttribute('class', logo_back);

    type_list.push(type);
    height_list.push(height);
    weight_list.push(weight);
    bmi_list.push(bmi);
    state_list.push(state);
    time_list.push(Today.getDate() + '-' + Today.getMonth() + '-' + Today.getYear());
    updateList(type_list,height_list, weight_list, bmi_list, state_list, time_list);
}
function updateList(type_list,height_list, weight_list, bmi_list, state_list, time_list)
{
    var color = ['bs-callout-blue', 'bs-callout-green', 'bs-callout-orange1', 'bs-callout-orange2', 'bs-callout-orange3', 'bs-callout-red'];

    if (type_list.length > 6) {
        type_list.splice(0, 1);
    }
    if (height_list.length > 6)
    {
        height_list.splice(0, 1);
    }
    if (weight_list.length > 6) {
        weight_list.splice(0, 1);
    }
    if (bmi_list.length > 6) {
        bmi_list.splice(0, 1);
    }
    if (state_list.length > 6) {
        state_list.splice(0, 1);
    }
    if (time_list.length > 6) {
        time_list.splice(0, 1);
    }
    localStorage.setItem('type', JSON.stringify(type_list));
    localStorage.setItem('height', JSON.stringify(height_list));
    localStorage.setItem('weight', JSON.stringify(weight_list));
    localStorage.setItem('bmi', JSON.stringify(bmi_list));
    localStorage.setItem('state', JSON.stringify(state_list));
    localStorage.setItem('time', JSON.stringify(time_list));

    str = '<span id="bmi_list_title">BMI紀錄</span>';
    var len = type_list.length;
    for (var i = 0; len > i; i++) {
        str += '<div class="bs-callout bs-callout-left ' + color[type_list[i] - 1] + ' bs-callout-top' + (i + 1)  + '">' +
                    '<span class="list_text_big list_text_state list_text_big_top">' + state_list[i] + '</span><span class="list_text_small list_text_bmi1 list_text_small_top">BMI</span><span class="list_text_big list_text_bmi2 list_text_big_top">' + bmi_list[i] + '</span><span class="list_text_small list_text_weight1 list_text_small_top">weight</span><span class="list_text_big list_text_weight2 list_text_big_top">' + weight_list[i] + 'kg</span><span class="list_text_small list_text_height1 list_text_small_top">height</span><span class="list_text_big list_text_height2 list_text_big_top">' + height_list[i] + 'cm</span><span class="list_text_small list_text_time list_text_small_top">' + time_list[i] + '</span>' +
                    '</div>';
    }
    list.innerHTML = str;

}