prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width : 350,
    height : 300,
    image_format : "png",
    png_quality : 90
});

camera = document.getElementById("camera");
Webcam.attach(camera);

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_img" src='+data_uri+'>'
    });

}
console.log("ml5 version : ",ml5.version)


classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/eNc07huhH/model.json",modelloaded);
function modelloaded(){
    console.log("Model is loaded");
} 

function  Speak(){
    var synth = window.speechSynthesis;
    Speak_data1="The first prediction is "+prediction_1;
    Speak_data2 = "And the second prediction is "+prediction_2;
    var utterThis = new SpeechSynthesisUtterance(Speak_data1+Speak_data2);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById('captured_img');
    classifier.classify(img, gotresult);
}
function gotresult(error,results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
    prediction_1 = results[0].label;
    prediction_2 = results[1].label;
    document.getElementById("name_1").innerHTML = prediction_1;
    document.getElementById("name_2").innerHTML = prediction_2; 
    Speak()
    if(prediction_1 =="Happy"){
        document.getElementById("emoji_1").innerHTML = "&#128512;";
    }
    if(prediction_1 == "Sad"){
        document.getElementById("emoji_1").innerHTML = "&#128546;";
    }
    if(prediction_1 == "Angry"){
        document.getElementById("emoji_1").innerHTML = "&#128545;";
    }

    if(prediction_2 =="Happy"){
        document.getElementById("emoji_2").innerHTML = "&#128512;";
    }
    if(prediction_2 == "Sad"){
        document.getElementById("emoji_2").innerHTML = "&#128546;";
    }
    if(prediction_2 == "Angry"){
        document.getElementById("emoji_2").innerHTML = "&#128545;";
    }
    }

}