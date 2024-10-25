class Player {
    constructor(x,y,w,h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw() {
        image(img, (this.x-(this.w/2)), (this.y-(this.h/2)));
    }

    move() {
        if(keyIsDown(87)) {
            this.y -= 5;
        }

        if(keyIsDown(65)) {
            this.x -= 5;
        }

        if(keyIsDown(83)) {
            this.y += 5;
        }

        if(keyIsDown(68)) {
            this.x += 5;
        }
    }
}