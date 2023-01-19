/*global require, dat*/
import Events from './vendor/Events.js';
import ParticleSystem from './lib/ParticleSystem.js';
import Display from './lib/Display.js';
import Vector from './lib/Vector.js';
import GUI from './gui.js';

 
  function(ParticleSystem, Display, Vector, GUI){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    window.addEventListener('resize', resize); resize();

    var display = new Display(document.getElementById('canvas'));
    display.init();
    var particleSystem = new ParticleSystem().init(display);
    display.start();

    var gui = new GUI(particleSystem, display);

    particleSystem.addEmitter(new Vector(360,230),Vector.fromAngle(0,2));
    particleSystem.addField(new Vector(700,230), -140);

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

  }