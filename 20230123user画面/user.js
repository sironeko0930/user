let urlclass;
let urlid;
let urlno;
 let url = new URL(window.location.href); // URLを取得
 let params = url.searchParams; // URLSearchParamsオブジェクトを取得
window.onload = function () {


 urlclass = decodeURIComponent(atob(params.get('class')));
 urlid = decodeURIComponent(atob(params.get('id')));
 urlno = decodeURIComponent(atob(params.get('no')));
 
}

function qrhtml() {
 //    alert('ボタンが押されました');
 location.href = './qrhtml.html?class=' + btoa(encodeURIComponent(urlclass)) + "&id=" + btoa(encodeURIComponent(urlid)) + "&no=" + btoa(encodeURIComponent(urlno));
}

function userattend() {
 //    alert('ボタンが押されました');
 location.href = './js/userattend.html?class=' + btoa(encodeURIComponent(urlclass)) + "&id=" + btoa(encodeURIComponent(urlid)) + "&no=" + btoa(encodeURIComponent(urlno));
}
