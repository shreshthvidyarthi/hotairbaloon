var balloon, background;
function preload() {
  backgroundImg = loadImage("cityImage.png")
  balloonImage = loadAnimation("hotairballoon1.png", "hotairballoon2.png", "hotairballoon3.png");
}

function setup(){
   database = firebase.database();
   console.log(database);
    createCanvas(500,500);

balloon = createSprite (100,400, 20, 20)
  balloon.addAnimation("balloon", balloonImage);
  balloon.scale = 0.4;

 

}

function draw(){

    background(backgroundImg);
  
        if(keyDown(LEFT_ARROW)){
            balloon.x = balloon.x - 10;
        }
        else if(keyDown(RIGHT_ARROW)){
            balloon.x = balloon.x + 10;
        }
        else if(keyDown(UP_ARROW)){
            balloon.y = balloon.y - 10;
        }
        else if(keyDown(DOWN_ARROW)){
             balloon.y = balloon.y + 10;
        }
        drawSprites();
    
      }

    function updateHeight(x,y){
       database.ref('balloon/height').set({
      'x': height.x + x,
     'y': height.y + y
       })
      }
     function readHeight(data) { 
       height = data.val();
        balloon.x = height.x;
         balloon.y = height.y;
     }
       function showError() {
      console.log("Error in writing to the database");
       }

       function getstate(){
        var balloonPosition =database.ref('balloon/height');
         balloonposition.on("height", readPosition, showError);
       }
       function updatestate(){
        database.ref("height").update({
            gamestate:state
        })
      }
      function getcount(){
      var heightref = database.ref("height");
      heightref.on("height",(data)=>{
      height=data.val();
      })
  }