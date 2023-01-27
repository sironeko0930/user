var courseName;

let daydata = new Array;
let name = [];
var html = "";
let htmlday = "";
let htmlname = "";
var kamokuname = "";
var kamokurename = "";
var courseid = "";
var kamokulist = new Array;
var kamokudata = new Array;
var no;
var html2name = "<th></th>";
var html2data = "<td>遅刻</td>";
var html3data = "<td>欠席</td>";
var c1 = 0;
var c2 = 0;
var c3 = 0;
var c4 = 0;
let urlclass;
let urlno;
//var WeekChars = [ "日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日" ];




var WeekChars = ["木", "金", "土", "日", "月", "火", "水"];
//var table1;

window.onload = function () {
 let url = new URL(window.location.href); // URLを取得
 let params = url.searchParams; // URLSearchParamsオブジェクトを取得
 var i = 0;
 urlclass = decodeURIComponent(atob(params.get('class')));
 urlno = decodeURIComponent(atob(params.get('no')));



 document.getElementById('className').textContent = urlclass;
 // document.getElementById('studentName').textContent = params.get('studentname');
 document.getElementById('classNo').textContent = urlno;

 // var table = document.getElementById("table_id");
 //firebase接続-----------------------------------------------------------------//
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
 const db = firebase.firestore();

 //firebase接続-----------------------------------------------------------------//
 function Timeout(passVal, ms) {
  return new Promise(resolve =>
   setTimeout(() => {
    resolve(passVal);
   }, ms)
  )
 }


 async function runAll() {
  await studentData(parseInt(urlno) - 1);

  await kamokudata();


  await tikokuday(urlno);
  await navtablecreate();
 }

 runAll();

 async function studentData(passVal) {
  console.log("===================1.studentData===================");
  db.collection("student").doc(urlclass).get().then((doc) => {
   if (doc.exists) {
    console.log(doc.data());
    arr = Object.entries(doc.data());
    arr.sort(function (a, b) {
     return a[0] - b[0];
    });
    document.getElementById('studentName').textContent = arr[passVal][1][0];
    //    for (let i = 0; arr.length > i; i++) {
    //     console.log('生徒の名前=', arr); //student生徒の名前
    //     console.log('番号=', arr[i]); //student生徒の名前
    ////     name.push(arr[i][1][0]);
    //    }
   }

  });
  return Timeout("f2 ==> f3", 500);

 }

 async function kamokudata(passVal) {
  console.log("===================2.kamokudata===================");
  var docRef = db.collection("kamoku").doc(urlclass);

  docRef.get().then((doc) => {
   if (doc.exists) {

    kamokulist = Object.entries(doc.data());

    for (var i = 0; kamokulist.length > i; i++) {
     if (kamokulist[i][1][0] == params.get('course')) {

      courseid = kamokulist[i][0];
     }

    }

   }
  });
  return Timeout("f2 ==> f3", 500);
 }

 async function tikokuday(passVal) {
  console.log("===================3.tikokuday===================", passVal);

  //  htmlname = "<caption>" + arr[Number(passVal) - 1][1][0] + "</caption>";

  db.collection("data").doc(urlclass).collection(passVal).get().then((querySnapshot) => {
   querySnapshot.forEach((doc) => {
    console.log("===================3.1.kamokudata===================", passVal);
    console.log("3.-----------------------------------------");
    console.log(doc.id, " => ", doc.data());
    console.log("-------------------------------------------");
    kamokudata = Object.entries(doc.data());

    
    
    for (let a = 0; kamokulist.length > a; a++) {
     if (kamokulist[a][0] == doc.id) {
      kamokuname = kamokulist[a][1][0];
      html2name = html2name + "<th>" + kamokuname + "</th>";
     }
    }
    tablecreate();
   });


  })
  await new Promise((resolve, reject) => setTimeout(resolve, 500));
  return Timeout("f2 ==> f3", 1000);
 }


 async function tablecreate() {
  console.log("===================4.tablecreate===================");
  console.log("name == ", name);
  console.log("kamokudata == ", kamokudata);
  console.log("kamokulist == ", kamokulist);
  var count1 = 0;
  var count2 = 0;
  const getDocs = async () => {
   var table1 = $("<table  class='table'>");
   //  $(htmlname).appendTo(table1);

   //   html = html + htmlname + "<thead>";
   html = html + htmlname;
   console.log("html1", html)
   html = html + "<tr>";
   console.log("html2", html)
   html = html + "<th></th>";

   if (15 > kamokudata.length) {
    count1 = kamokudata.length;
   } else {
    count1 = 15;
    count2 = kamokudata.length;
   }

   for (let a = 0; count1 > a; a++) {

    var wDay = new Date(kamokudata[a][0].substr(0, 4), kamokudata[a][0].substr(4, 2), kamokudata[a][0].substr(6, 2));

    var wD = WeekChars[(wDay.getDay())];

//    console.log("wDay", wDay, " == ", typeof (wDay));
//    console.log("wDay.getDay()", wDay.getDay());
    html = html + "<th>" + kamokudata[a][0].substr(4, 2) + "/" +
     kamokudata[a][0].substr(6, 2) + "(" + wD + ")" + ":" + kamokudata[a][0].substr(8, 9) + "限目</th>";

   }

   //  html = html + "</tr></thead><tr>";
   html = html + "</tr><tr>";

   html = html + "<td class='kamokutd'>" + kamokuname + "</td>";

   for (let num = 0; kamokudata.length > num; num++) {
    console.log("kamokudata[num][1] ======= ", kamokudata[num][1]);
    if (kamokudata[num][1] == "出席") {

    } else if (kamokudata[num][1] == "遅刻") {
     c2 = c2 + 1;
    } else if (kamokudata[num][1] == "欠席") {
     c3 = c3 + 1;
    } else if (kamokudata[num][1] == "公欠") {
     //     c4 = c4 + 1;
    }
   }
   html2data = html2data + "<td id = " + kamokuname + " class='table2'>" + c2 + "</td>";
   html3data = html3data + "<td id = " + kamokuname + " class='table2'>" + c3 + "</td>";
   //   html2data = html2data + "<td id = " + kamokuname + ">遅:" + c2 + "欠:" + c3 + "</td>";
//   html2data = html2data + "<td id = " + kamokuname + " class='table2'>" + c2 + "</td>";
//   html3data = html3data + "<td id = " + kamokuname + " class='table2'>" + c3 + "</td>";
   c1 = 0;
   c2 = 0;
   c3 = 0;
   c4 = 0;

   for (let b = 0; count1 > b; b++) {


    if (kamokudata[b][1] == "出席") {
     html = html + "<td id = 'shusseki'>〇</td>";
    } else if (kamokudata[b][1] == "遅刻") {
     html = html + "<td id = 'tikoku'>△</td>";
    } else if (kamokudata[b][1] == "欠席") {
     html = html + "<td id = 'kesseki'>×</td>";
    } else if (kamokudata[b][1] == "公欠") {
     html = html + "<td id = 'kouketu'>□</td>";
    }



   }






   html = html + "</tr><tr>";

   for (; count2 > 15;) {
    html = html + "<th></th>";
    for (let a = 15; kamokudata.length > a; a++) {

     var wDay = new Date(kamokudata[a][0].substr(0, 4), kamokudata[a][0].substr(4, 2), kamokudata[a][0].substr(6, 2));

     var wD = WeekChars[(wDay.getDay())];

     console.log("wDay", wDay, " == ", typeof (wDay));
     console.log("wDay.getDay()", wDay.getDay());
     html = html + "<th>" + kamokudata[a][0].substr(4, 2) + "/" +
      kamokudata[a][0].substr(6, 2) + "(" + wD + ")" + ":" + kamokudata[a][0].substr(8, 9) + "限目</th>";

    }
    html = html + "</tr><tr>";
    html = html + "<td></td>";
    for (let b = 15; kamokudata.length > b; b++) {


     if (kamokudata[b][1] == "出席") {
      html = html + "<td id = 'shusseki'>〇</td>";
     } else if (kamokudata[b][1] == "遅刻") {
      html = html + "<td id = 'tikoku'>△</td>";
     } else if (kamokudata[b][1] == "欠席") {
      html = html + "<td id = 'kesseki'>×</td>";
     } else if (kamokudata[b][1] == "公欠") {
      html = html + "<td id = 'kouketu'>□</td>";
     }



    }


    html = html + "</tr>";
    count2 = count2 - 15;
   }






   html = html + "</tr>";


   $(html).appendTo(table1);
   $("</tbody></table>").appendTo(table1);
   $("#div1").append(table1);

   jQuery(function ($) {
    console.log('============----jQuery----========');
    $.extend($.fn.dataTable.defaults, {
     language: {
      url: "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Japanese.json"
     }
    });
    $("#foo-table").DataTable();

   });


   console.log(div1.innerHTML);
   html = "";
   htmlname = "";
   console.log("html5 == ", html);
  }

  getDocs();
  return Timeout("f2 ==> f3", 1000);
 }

 function navtablecreate(passVal) {
  console.log("navtablecreate == ");
  console.log("kamokudata", kamokudata);
  //  for(var num = 0; kamokudata.length > num; num++){
  //    kamokudata[num][1];
  //   }

  var navtable = $("<table class='table2'>");

  console.log("html2name === ", html2name);
  html2name = "<tr class='table2'>" + html2name + "</tr><tr class='table2'>" + html2data + "</tr><tr class='table2'>" + html3data + "</tr>";
  console.log("html2name === ", html2name);
  $(html2name).appendTo(navtable);
  $("</tbody></table>").appendTo(navtable);
  $("#navdiv").append(navtable);

 }

}
