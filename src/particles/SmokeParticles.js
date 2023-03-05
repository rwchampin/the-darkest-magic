const canvas = document.createElement("canvas");
const c = canvas.getContext("2d");
const canvas2 = document.createElement("canvas2");
const c2 = canvas.getContext("2d");
const w = (canvas.width = canvas2.width = window.innerWidth);
const h = (canvas.height = canvas2.height = window.innerHeight);

document.body.appendChild(canvas);
document.body.appendChild(canvas2);

var t = 0,
  res = 10,
  p = [],
  FF = [],
  ct = 0;

function draw1() {
  if (p.length < 6000) {
    for (var k = 0; k < 100; k++) {
      p.push(new particle(res, mouse.x, mouse.y));
    }
  }

  FF = genFF(
    Math.floor(w / res) + 1,
    Math.floor(h / res) + 1,
    res,
    0.5,
    ct,
    0,
    0
  );
  //showFF(FF,res,c2,5);
  t += 0.01;
  ct = noise(t) * 5;
  for (var l = 0; l < p.length; l++) {
    p[l].move(FF, mouse.x, mouse.y);
    p[l].show(l);
  }
}

var mouse = {
  x: w / 2,
  y: h / 2,
};
var last_mouse = {
  x: 0,
  y: 0,
};

canvas.addEventListener(
  "mousemove",
  function (e) {
    last_mouse.x = mouse.x;
    last_mouse.y = mouse.y;

    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
  },
  false
);

canvas.addEventListener("mouseleave", function (e) {
  mouse.x = w / 2;
  mouse.y = h / 2;
});

window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

function loop1() {
  setTimeout(function () {
    window.requestAnimFrame(loop1);
    for (var k = 0; k < 1; k++) {
      c.clearRect(0, 0, w, h);
      draw1();
    }
  }, 1000 / 60);
}

window.addEventListener("resize", function () {
  (w = canvas.width = window.innerWidth),
    (h = canvas.height = window.innerHeight);
  c.clearRect(0, 0, w, h);
  draw1();
});

loop1();

class smokeParticle {
  constructor(res, mx, my) {
    this.opacity = 1;
    this.area = 100;
    this.ang = Math.random() * 2 * Math.PI;
    if (
      mx < w - this.area / 2 ||
      mx < this.area / 2 ||
      my < h - this.area / 2 ||
      my < this.area / 2
    ) {
      this.pos = {
        x: mx + ((Math.random() * this.area) / 2) * Math.cos(this.ang),
        y: my + ((Math.random() * this.area) / 2) * Math.sin(this.ang),
      };
    } else {
      this.pos = {
        x: Math.random() * w,
        y: Math.random() * h,
      };
    }
    this.vx = 0;
    this.vy = 0;
    this.cache = [];
    this.i = Math.round(this.pos.x / res);
    this.j = Math.round(this.pos.y / res);
    this.l = Math.random() * 100;
    this.f = this.l / 10;
    this.os = Math.random() * 0.02 + 0.01;
  }
  move(ff, mx, my) {
    this.opacity -= this.os;

    this.i = Math.abs(Math.round(this.pos.x / res) - 1);
    this.j = Math.abs(Math.round(this.pos.y / res) - 1);

    this.ang = ff[this.i][this.j];

    this.vx = this.f * Math.cos(this.ang);
    this.vy = this.f * Math.sin(this.ang);

    this.pos.x += this.vx;
    this.pos.y += this.vy;

    if (this.cache.length > this.l) {
      this.cache.splice(0, 1);
    }

    if (
      this.pos.x <= 0 ||
      this.pos.x >= w ||
      this.pos.y <= 0 ||
      this.pos.y >= h ||
      this.opacity <= 0 ||
      isNaN(this.pos.x) ||
      isNaN(this.pos.y) ||
      this.pos.x == undefined ||
      this.pos.y == undefined
    ) {
      this.opacity = Math.random();
      this.ang = Math.random() * 2 * Math.PI;
      if (
        mx < w - this.area / 2 ||
        mx < this.area / 2 ||
        my < h - this.area / 2 ||
        my < this.area / 2
      ) {
        this.pos = {
          x: mx + ((Math.random() * this.area) / 2) * Math.cos(this.ang),
          y: my + ((Math.random() * this.area) / 2) * Math.sin(this.ang),
        };
      } else {
        this.pos = {
          x: Math.random() * w,
          y: Math.random() * h,
        };
      }
      this.vx = 0;
      this.vy = 0;
      this.cache = [];
      this.i = Math.round(this.pos.x / res);
      this.j = Math.round(this.pos.y / res);
    }
    this.cache.push({ x: this.pos.x, y: this.pos.y });
  }
  lerpColor(color1, color2, amount) {
    if (!amount) amount = 0.5;
    const c1 = new THREE.Color(color1);
    const c2 = new THREE.Color(color2);
    return c1.lerp(c2, amount);
  }
  show(i) {
    // c.beginPath();
    // for(var i = 0; i < this.cache.length; i++){
    // c.lineTo(this.cache[i].x,this.cache[i].y);
    // }
    // c.strokeStyle="rgba(255,255,255," + this.opacity + ")";
    // c.lineWidth="0.1";
    // c.stroke();
    console.log("r", i);
    c.fillStyle = "rgba(0,0,0," + Math.random() + ")";
    c.fillRect(this.pos.x, this.pos.y, 2, 2);
  }
}
