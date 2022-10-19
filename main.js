video="";
statuses="";
objects=[];
object_name="";
function preload(){
}
function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
}
function draw(){
    image(video,0,0,480,380);
    if (statuses!=""){
        objectDetector.detect(video,gotResult);
        for(i=0; i<objects.length; i++){
            if(object_name==objects[i].label){
            document.getElementById("status").innerHTML=object_name+" is found";
            fill('red');
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("red");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            }
            else{
                document.getElementById("status").innerHTML=object_name+" is not found";
            }
        }
    }
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Detecting Object";
    object_name=document.getElementById("input").value;
    console.log(object_name);
}
function modelLoaded(){
    console.log("ModelLoaded");
    statuses=true;
}
function gotResult(error,results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}