$(document).ready(function () {
   'use strict';
   var width = window.innerWidth,
      height = window.innerHeight,
      circles = [],
      largeHeader,
      canvas,
      ctx;

   init();

   function init() {
      largeHeader = document.getElementById('head');
      largeHeader.style.height = height + 'px';

      canvas = document.getElementById('main-canvas');
      canvas.width = width;
      canvas.height = height;
      ctx = canvas.getContext('2d');

      for (var i = 0; i < width * 0.5; i++) {
         circles.push(new Circle(width, height, ctx, init));
      }
      animate();
      addListeners();
   }

   function addListeners() {
      window.addEventListener('resize', resize);
   }

   function scrollCheck() {
      return document.body.scrollTop <= height;
   }

   function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      largeHeader.style.height = height + 'px';
      canvas.width = width;
      canvas.height = height;
   }

   function animate() {
      if (scrollCheck()) {
         ctx.clearRect(0, 0, width, height);
         for (var i = 0; i < circles.length; i++) {
            circles[i].draw();
         }
      }
      requestAnimationFrame(animate);
   }
});

class Circle {
   constructor(width, height, ctx){
      this._width = width;
      this._height = height;
      this._ctx = ctx;
      this._setDefaultData()
   }

   _setDefaultData(){
      this.pos = {};
      this.pos.x = Math.random() * this._width;
      this.pos.y = this._height + Math.random() * 100;
      this.alpha = 0.1 + Math.random() * 0.3;
      this.scale = 0.1 + Math.random() * 0.3;
      this.velocity = Math.random();
   }

   resize(width, height){
      this._width = width;
      this._height = height;
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