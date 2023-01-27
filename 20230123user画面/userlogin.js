var arr = new Array;
var id;
var pass;
var textid;
var textpass;
var textclass;
var ct;

var classUrl;

var courseUrl;

var counterUrl;
let db;
var cls = [];





 // var className = ["NV1", "NF1", "NT1", "NS1"];
 //
 //
 //
 //
 // var $ClassList = $('#ClassName');
 // for (var i = 0; className.length > i; i++) {
 //  $ClassList.append('<li><a class="dropdown-item" href="#">' + className[i] + '</a></li>');
 // }


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


 // db.collection("student").get().then((querySnapshot) => {
 //  querySnapshot.forEach((doc) => {
 //   // doc.data() is never undefined for query doc snapshots
 //
 //   classs = doc.id;
 //   console.log(classs);
 //  });
 // });


};





$(function () {
 $('#s_mac').change(function () {
  textclass = document.getElementById('s_mac');
  textclass = textclass.value;
  arr.length = 0;
  db.collection("student").doc(textclass).get().then((doc) => {
   // doc.data() is never undefined for query doc snapshots

   arr = Object.entries(doc.data());
   arr.sort();
   console.log("arr == ", arr);
  });


 });
});


$(function () {
 $('#textid').change(function () {
  textid = document.getElementById('textid');
  textid = textid.value;
 });
});


$(function () {
 $('#textpass').change(function () {
  textpass = document.getElementById('textpass');
  textpass = textpass.value;
 });
});


$(function () {
 $('#loginbtn').click(function () {

  if (arr.length == 0) {
   alert("クラスが選択されていません。");
  } else {
   for (var i = 0; arr.length > i; i++) {
    if (arr[i][1][1] == textid && arr[i][1][2] == textpass) {
     id = arr[i][1][1];
     pass = arr[i][1][2];
     no = arr[i][0];
     console.log("no == ", no);
     break
    } else {
     console.log("no");
    }
   }
  }

  if (id == textid && pass == textpass && id != null && pass != null && textid != null && textpass != null) {
   alert("OK");
   
   location.href = './user.html?class=' + btoa(encodeURIComponent(textclass)) + "&id="+ btoa(encodeURIComponent(textid)) +"&no=" + btoa(encodeURIComponent(no));
  } else {
   alert("学籍番号かパスワードが正しくありません");
  }

  //      location.href = './userattend.html?class=' textclass + "&id=" textid ;





 });
});
