let urlclass;
let urlcourse;
let urlcount;
let urltime;
let urlno;
const firebaseConfig = {
 apiKey: "AIzaSyAXX9HtVGKSkOKqGRcagWacWyf-Bp-fh5k",
 authDomain: "nv1teame-74e4a.firebaseapp.com",
 projectId: "nv1teame-74e4a",
 storageBucket: "nv1teame-74e4a.appspot.com",
 messagingSenderId: "141682043367",
 appId: "1:141682043367:web:283980f5d8490d93c03542",
 measurementId: "G-MH32764T48"
};
let courseArry;
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
let selectcourse;

window.onload = function () {

 function Timeout(passVal, ms) {
  return new Promise(resolve =>
   setTimeout(() => {
    resolve(passVal);
   }, ms)
  )
 }


 async function runAll() {
  await courseget();
  await courseName();

 }
 runAll();




 function courseget(passVal) {
  let url = new URL(window.location.href); // URLを取得
  let params = url.searchParams; // URLSearchParamsオブジェクトを取得
  urlclass =decodeURIComponent(atob(params.get('class')));
  urlcourse =decodeURIComponent(atob(params.get('course')));
  urlcount =decodeURIComponent(atob(params.get('count')));
  urltime = decodeURIComponent(atob(params.get('time')));
  urlno = decodeURIComponent(atob(params.get('no')));
  document.getElementById('class').innerHTML = "<div>" + urlclass + "</div>";
  document.getElementById('course').innerHTML = "<div>" + urlcourse + ":" + urlcount + "限目</div>";
  document.getElementById('time').innerHTML = "<div>" + urltime + "</div>";

  var docRef = db.collection("kamoku").doc(urlclass);
  docRef.get().then((doc) => {
   if (doc.exists) {
    //   console.log("Document data:", doc.data());
    courseArry = Object.entries(doc.data());
    console.log(" courseArry :", courseArry);

   } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
   }
  }).catch((error) => {
   console.log("Error getting document:", error);
  });

  return Timeout("f2 ==> f3", 1000);
 }

 function courseName(passVal) {
  console.log("courseName");
  let url = new URL(window.location.href); // URLを取得
  let params = url.searchParams; // URLSearchParamsオブジェクトを取得

  for (var i = 0; courseArry.length > i; i++) {
   console.log("courseArry[i][1][0] == urlcourse", courseArry[i][1][0] == urlcourse, courseArry[i][1][0]);
   if (courseArry[i][1][0] == urlcourse) {
    selectcourse = courseArry[i][0];
    console.log("selectcourse", selectcourse);
    break
   }
  }
 }


}
$('#sousin').on('click', function () {



 let url = new URL(window.location.href); // URLを取得
 let params = url.searchParams; // URLSearchParamsオブジェクトを取得

 let ta = document.getElementById("textarea").value;

 let firestoreRef = db.collection("report").doc(urlclass).collection(urlno).doc(selectcourse);
 console.log(urltime);
 let day = urltime.split("/");

 let firestoreFieldName = day[0] + day[1] + day[2] + urlcount;

 console.log(firestoreFieldName);
 let updateObject = {}
 updateObject[firestoreFieldName] = [ta, urltime]
 console.log(firestoreRef)
 // return firestoreRef.update(updateObject)
 firestoreRef.set(updateObject)


 let firestoreRef2 = db.collection("report read").doc(urlclass).collection(selectcourse).doc(firestoreFieldName);
 console.log(urltime);


 console.log(firestoreFieldName);
 let updateObject2 = {}
 updateObject2[urlno] = [ta, urltime]
 console.log(firestoreRef)
 // return firestoreRef.update(updateObject)
 firestoreRef2.set(updateObject2)

alert("送信されました");




});
