var pixels;
var player;
var test;

var redraw = false;

var use = 0;

var usePerlin = false;

var img

function preload() {
    img = loadImage('player.png');
}

function setup() {
    let screen = createCanvas(800,450);

    background("indigo");

    createField(screen.width, screen.height);

    player = new Player(200,200,64,64);

    //test = new Player(Math.floor(random(0,this.width)), Math.floor(random(0, this.height)), 74, 100);
}

function draw() {
    clear();
    background("indigo");

    player.move();
    player.draw();

    //test.draw();

    limit_field(player);
    //limit_field(test);
}
  
function createField(width, height) {
    pixels = [];
    for(let x = 0; x < width; x++) {
        if(x === 0) {
            pixels[x] = [];
            console.log(pixels);
        }else {
            let row = [];
            pixels.push(row);
        }
      for(let y = 0; y < height; y++) {
        if(y === 0) {
            pixels[x][y] = new Effects(x,y,1,1);
        }else {
            pixels[x].push(new Effects(x,y,1,1));
        }
      }
    }
    
    for(let i = 0; i < pixels.length; i++) {
        for(let j = 0; j < pixels[i].length; j++) {           
            pixels[i][j].opacity = shade_engine(pixels[i][j].x, pixels[i][j].y, width/2, height/2, 200);
        }
    }
}
    
function shade_engine(itemX, itemY, centerX, centerY, centerRange) {
    if(itemX<centerX){
        e = centerX - itemX;
        f = (e/centerRange)*100;
    }else if(itemX > centerX) {
        e = itemX - centerX;
        f = (e/centerRange)*100;
    }else {
        e = 0;
        f = 0;
    }
  
    if(itemY < centerY){
        g = centerY - itemY;
        h = (g/centerRange)*100;
    }else if(itemY > centerY) {
        g = itemY - centerY;
        h = (g/centerRange)*100;
    }else {
        g = 0;
        h = 0;
    }
  
    if(f > 0){
        vx = 100-f;
    }else if(f < 0) {
        vx = f+100;
    }else{
        vx = 100;
    }
  
    if(h > 0){
        vy = 100-h;
    }else if(h<0) {
        vy = h+100;
    }else {
        vy = 100;
    }
    v = (vx+vy)/2
    cv = v/100;

    if(cv < 0){
         cv = 0;
     }else if(cv > 1) {
         cv = 1;
     }
  
    let value = 1-cv;

    if(usePerlin === false) {
        return value;
    }else {

        let noise_Level = 1;
        let noise_Scale = 0.08;

        let nX = noise_Scale * itemX;
        let nY = noise_Scale * itemY;
        let nV = noise_Scale * value;

        let noise_Value = noise_Level * noise(nX, nY, nV);
    
        return noise_Value;
    }
}

function limit_field(sprite) {
    let x_min = Math.floor(sprite.x-(sprite.w/2));
    let x_max = Math.floor(sprite.x+(sprite.w/2));
    let y_min = Math.floor(sprite.y-(sprite.h/2));
    let y_max = Math.floor(sprite.y+(sprite.h/2));

    for(let x = x_min; x < x_max; x++) {
        for(let y = y_min; y < y_max; y++) {
            try{
                pixels[x][y].draw();
            }catch(err) {
                //console.log(x, y);
            }
        }
    }
}