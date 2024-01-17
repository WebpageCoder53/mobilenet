function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet', modelLoaded);
}

function modelLoaded() {console.log("Model loaded!");}

function draw() {
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotResult);
}

var previous_result = "";

function gotResult(error, results) {
  if(error) {
    console.error("ERROR FROM CODE: " + error);
  } else {
    if((results[0].confidence > 0.5) && (previous_result != results[0].label)) {
      console.log(results);
      
      percent = ((results[0].confidence * 100).toFixed(1)) + "%";

      previous_result = results[0].label;
      var synth = window.speechSynthesis;
      var utterThis = new SpeechSynthesisUtterance(results[0].label);
      synth.speak(utterThis);

      

      document.getElementById("result_object_name").innerHTML = results[0].label;
      document.getElementById("result_object_accuracy").innerHTML = percent;
    }
  }
}