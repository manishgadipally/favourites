function divHider() {
  let d = new Date();
  let day = d.getDay();
  if (day !== 4) {
    document.getElementById("clarity").style.display = "none";
  }
}
window.onload = divHider;

function processBtnClick(btn) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = bind(function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var responseObj = JSON.parse(xhttp.responseText);
      setApplicationLinks(responseObj, this);
    }
  }, btn);
  xhttp.open("GET", "data.json", true);
  xhttp.send();
}

function setApplicationLinks(res, btn) {
  var sdf = "";
  for (i = 0; i < res.PROCESS.length; i++) {
    if (res.PROCESS[i].QueueName == btn.innerText) {
      for (j = 0; j < res.PROCESS[i].Applications.length; j++) {
        sdf =
          sdf +
          "<button class='button button-1 button-1a' onclick='window.location.href='' target='_blank'" +
          res.PROCESS[i].Applications[j].url +
          "''>" +
          res.PROCESS[i].Applications[j].name +
          "</button>";
      }
      break;
    }
  }
  document.getElementById("app").innerHTML = sdf;
}

var bind = function(fn, context) {
  return function() {
    fn.apply(context, arguments);
  };
};
