class Effects {
    constructor(x,y,w,h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      
      this.opacity = 1;
    }
    
    draw() {
      noStroke();
      let c = color("indigo");
      c.setAlpha((this.opacity*255));
  
    // Draw the right rectangle.
      fill(c);
      rect(this.x, this.y, this.w, this.h);
    }
  }