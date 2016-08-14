'use strict';

class CircleDrawer {
   constructor() {
      this.circles = [];
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.largeHeader = $('#head');
      this.largeHeader.height(this.height);
      $(document).ready(function () {
         this.canvas = document.getElementById('main-canvas');
         this.canvas.width = this.width;
         this.canvas.height = this.height;
         this.ctx = this.canvas.getContext('2d');

         for (var i = 0; i < this.width * 0.5; i++) {
            this.circles.push(new Circle(this.ctx));
         }
         this.animate();
         this.addListeners();
      }.bind(this));
   }

   addListeners() {
      window.addEventListener('resize', this.resize);
   }

   scrollCheck() {
      return document.body.scrollTop <= this.height;
   }

   resize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.largeHeader.height(this.height);
      this.canvas.width = this.width;
      this.canvas.height = this.height;
   }

   animate() {
      if (this.scrollCheck()) {
         this.ctx.clearRect(0, 0, this.width, this.height);
         for (var i = 0; i < this.circles.length; i++) {
            this.circles[i].draw();
         }
      }
      requestAnimationFrame(this.animate.bind(this));
   }
}

class Circle {
   constructor(ctx){
      this._ctx = ctx;
      this._setDefaultData()
   }

   _setDefaultData(){
      this.pos = {};
      this.pos.x = Math.random() * window.innerWidth;
      this.pos.y = Math.random() * 100 + innerHeight;
      this.alpha = 0.1 + Math.random() * 0.3;
      this.scale = 0.1 + Math.random() * 0.3;
      this.velocity = Math.random();
   }

   draw() {
      if (this.alpha <= 0){
         this._setDefaultData();
      }
      this.pos.y -= this.velocity;
      this.alpha -= 0.0005;
      this._ctx.beginPath();
      this._ctx.arc(this.pos.x, this.pos.y, this.scale * 10, 0, 2 * Math.PI, false);
      this._ctx.fillStyle = 'rgba(255,255,255,' + this.alpha + ')';
      this._ctx.fill();
   };
}

new CircleDrawer();