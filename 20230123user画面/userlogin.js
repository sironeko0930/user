var arr = new Array;
var id;
var pass;
var textid;
var textpass;
var textclass;
var ct;
var no;
var classUrl;

var courseUrl;

var counterUrl;
let db;
var cls = [];








var courseName = [];
var $CourseList = $('#CourseName');


//-----------firestore----------------------------------------------------------------------
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
window.onload = function () {

 const firebaseConfig = {
  apiKey: "AIzaSyAXX9HtVGKSkOKqGRcagWacWyf-Bp-fh5k",
  authDomain: "nv1teame-74e4a.firebaseapp.com",
  projectId: "nv1teame-74e4a",
  storageBucket: "nv1teame-74e4a.appspot.com",
  messagingSenderId: "141682043367",
  appId: "1:141682043367:web:283980f5d8490d93c03542",
  measurementId: "G-MH32764T48"
 };

 firebase.initializeApp(firebaseConfig);
 db = firebase.firestore();
 
 textclass = document.getElementById('s_mac');
 textclass = textclass.value;
 textid = document.getElementById('textid');
 textid = textid.value;
 textpass = document.getElementById('textpass');
 textpass = textpass.value;
 console.log("load == textclass == ", textclass, "textid", textid, "textpass", textpass);



};

function Timeout(passVal, ms) {
 return new Promise(resolve =>
  setTimeout(() => {
   resolve(passVal);
  }, ms)
 )
}


async function runall() {
 
 await studentdata(textclass);
 await array();
 await login();
}




$(function () {
 $('#s_mac').change(function () {
  
  textclass = document.getElementById('s_mac');
  textclass = textclass.value;
  console.log("textclass == ",textclass);
  arr.length = 0;
  studentdata(textclass);
 });
});


$(function () {
 $('#textid').change(function () {
  textid = document.getElementById('textid');
  textid = textid.value;
   console.log("textid == ",textid);
 });
});


$(function () {
 $('#textpass').change(function () {
  textpass = document.getElementById('textpass');
  textpass = textpass.value;
  console.log("textpass == ",textpass);
 });
});

async function studentdata(classid) {
 arr.length = 0;
 db.collection("student").doc(classid).get().then((doc) => {

  arr = Object.entries(doc.data());
  arr.sort();
  console.log("studentdata",arr);
  array();
 });
 
 return Timeout("f2 ==> f3", 500);
}

async function array(passVal) {
 console.log("No.2");
 if (arr.length == 0 && textclass != null) {



  for (var i = 0; arr.length > i; i++) {
   console.log(" ======== ");
   if (arr[i][1][1] == textid && arr[i][1][2] == textpass) {
    id = arr[i][1][1];
    pass = arr[i][1][2];
    no = arr[i][0];

    console.log("ok");
    return Timeout("f2 ==> f3", 100);
    break

   } else {
    console.log("no");
   }
  }

 } else if (arr.length == 0 && textclass == null) {
  alert("クラスが選択されていません。");
 } else {
  for (var i = 0; arr.length > i; i++) {
   console.log(" ======== ");
   if (arr[i][1][1] == textid && arr[i][1][2] == textpass) {
    id = arr[i][1][1];
    pass = arr[i][1][2];
    no = arr[i][0];
    console.log("ok");
    return Timeout("f2 ==> f3", 100);
    break

   } else {
    console.log("no");
   }
  }
 }

}
async function login(passVal) {
 
 console.log("textclass == ", textclass, "textid", textid, "textpass", textpass);
 console.log("id == ", id, "pass == ", pass);
 if (id == textid && pass == textpass && id != null && pass != null && textid != null && textpass != null) {
  

     location.href = './user.html?class=' + btoa(encodeURIComponent(textclass)) + "&id=" + btoa(encodeURIComponent(textid)) + "&no=" + btoa(encodeURIComponent(no));
 } else {


  alert("学籍番号かパスワードが正しくありません");
 }
 return Timeout("f2 ==> f3", 100);
};


$(function () {
 $('#loginbtn').click(function () {
  console.log("No.1");
  textclass = document.getElementById('s_mac');
  textclass = textclass.value;
  textid = document.getElementById('textid');
  textid = textid.value;
  textpass = document.getElementById('textpass');
  textpass = textpass.value;
  console.log("textclass == ", textclass, "textid", textid, "textpass", textpass);
  


  runall();



 });
});
