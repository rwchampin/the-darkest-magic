import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'dat.gui'
import Stats from 'stats.js'

export default function useTheSpirit({ scene, camera, renderer }) {
 (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

 
},{"7":7}],6:[function(require,module,exports){
var elem = null

//https://gist.github.com/paulirish/523692
module.exports = function prefix(prop) {
    var prefixes = ['Moz', 'Khtml', 'Webkit', 'O', 'ms'],
        upper = prop.charAt(0).toUpperCase() + prop.slice(1)
    
    if (!elem)
        elem = document.createElement('div')

    if (prop in elem.style)
        return prop

    for (var len = prefixes.length; len--;) {
        if ((prefixes[len] + upper) in elem.style)
            return (prefixes[len] + upper)
    }
    return false
}
},{}],7:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],8:[function(require,module,exports){
var now = require(5)
  , global = typeof window === 'undefined' ? {} : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = global['request' + suffix]
  , caf = global['cancel' + suffix] || global['cancelRequest' + suffix]

for(var i = 0; i < vendors.length && !raf; i++) {
  raf = global[vendors[i] + 'Request' + suffix]
  caf = global[vendors[i] + 'Cancel' + suffix]
      || global[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        var cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            } catch(e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

module.exports = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(global, fn)
}
module.exports.cancel = function() {
  caf.apply(global, arguments)
}

},{"5":5}],9:[function(require,module,exports){
/**
 * @author mrdoob / http://mrdoob.com/
 */

var Stats = function () {

	var now = ( self.performance && self.performance.now ) ? self.performance.now.bind( performance ) : Date.now;

	var startTime = now(), prevTime = startTime;
	var frames = 0, mode = 0;

	function createElement( tag, id, css ) {

		var element = document.createElement( tag );
		element.id = id;
		element.style.cssText = css;
		return element;

	}

	function createPanel( id, fg, bg ) {

		var div = createElement( 'div', id, 'padding:0 0 3px 3px;text-align:left;background:' + bg );

		var text = createElement( 'div', id + 'Text', 'font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px;color:' + fg );
		text.innerHTML = id.toUpperCase();
		div.appendChild( text );

		var graph = createElement( 'div', id + 'Graph', 'width:74px;height:30px;background:' + fg );
		div.appendChild( graph );

		for ( var i = 0; i < 74; i ++ ) {

			graph.appendChild( createElement( 'span', '', 'width:1px;height:30px;float:left;opacity:0.9;background:' + bg ) );

		}

		return div;

	}

	function setMode( value ) {

		var children = container.children;

		for ( var i = 0; i < children.length; i ++ ) {

			children[ i ].style.display = i === value ? 'block' : 'none';

		}

		mode = value;

	}

	function updateGraph( dom, value ) {

		var child = dom.appendChild( dom.firstChild );
		child.style.height = Math.min( 30, 30 - value * 30 ) + 'px';

	}

	//

	var container = createElement( 'div', 'stats', 'width:80px;opacity:0.9;cursor:pointer' );
	container.addEventListener( 'mousedown', function ( event ) {

		event.preventDefault();
		setMode( ++ mode % container.children.length );

	}, false );

	// FPS

	var fps = 0, fpsMin = Infinity, fpsMax = 0;

	var fpsDiv = createPanel( 'fps', '#0ff', '#002' );
	var fpsText = fpsDiv.children[ 0 ];
	var fpsGraph = fpsDiv.children[ 1 ];

	container.appendChild( fpsDiv );

	// MS

	var ms = 0, msMin = Infinity, msMax = 0;

	var msDiv = createPanel( 'ms', '#0f0', '#020' );
	var msText = msDiv.children[ 0 ];
	var msGraph = msDiv.children[ 1 ];

	container.appendChild( msDiv );

	// MEM

	if ( self.performance && self.performance.memory ) {

		var mem = 0, memMin = Infinity, memMax = 0;

		var memDiv = createPanel( 'mb', '#f08', '#201' );
		var memText = memDiv.children[ 0 ];
		var memGraph = memDiv.children[ 1 ];

		container.appendChild( memDiv );

	}

	//

	setMode( mode );

	return {

		REVISION: 14,

		domElement: container,

		setMode: setMode,

		begin: function () {

			startTime = now();

		},

		end: function () {

			var time = now();

			ms = time - startTime;
			msMin = Math.min( msMin, ms );
			msMax = Math.max( msMax, ms );

			msText.textContent = ( ms | 0 ) + ' MS (' + ( msMin | 0 ) + '-' + ( msMax | 0 ) + ')';
			updateGraph( msGraph, ms / 200 );

			frames ++;

			if ( time > prevTime + 1000 ) {

				fps = Math.round( ( frames * 1000 ) / ( time - prevTime ) );
				fpsMin = Math.min( fpsMin, fps );
				fpsMax = Math.max( fpsMax, fps );

				fpsText.textContent = fps + ' FPS (' + fpsMin + '-' + fpsMax + ')';
				updateGraph( fpsGraph, fps / 100 );

				prevTime = time;
				frames = 0;

				if ( mem !== undefined ) {

					var heapSize = performance.memory.usedJSHeapSize;
					var heapSizeLimit = performance.memory.jsHeapSizeLimit;

					mem = Math.round( heapSize * 0.000000954 );
					memMin = Math.min( memMin, mem );
					memMax = Math.max( memMax, mem );

					memText.textContent = mem + ' MB (' + memMin + '-' + memMax + ')';
					updateGraph( memGraph, heapSize / heapSizeLimit );

				}

			}

			return time;

		},

		update: function () {

			startTime = this.end();

		}

	};

};

if ( typeof module === 'object' ) {

	module.exports = Stats;

}

},{}],10:[function(require,module,exports){
module.exports = window.THREE;

},{}],11:[function(require,module,exports){

var toSpace = require(13);


/**
 * Expose `toCamelCase`.
 */

module.exports = toCamelCase;


/**
 * Convert a `string` to camel case.
 *
 * @param {String} string
 * @return {String}
 */


function toCamelCase (string) {
  return toSpace(string).replace(/\s(\w)/g, function (matches, letter) {
    return letter.toUpperCase();
  });
}
},{"13":13}],12:[function(require,module,exports){

/**
 * Expose `toNoCase`.
 */

module.exports = toNoCase;


/**
 * Test whether a string is camel-case.
 */

var hasSpace = /\s/;
var hasCamel = /[a-z][A-Z]/;
var hasSeparator = /[\W_]/;


/**
 * Remove any starting case from a `string`, like camel or snake, but keep
 * spaces and punctuation that may be important otherwise.
 *
 * @param {String} string
 * @return {String}
 */

function toNoCase (string) {
  if (hasSpace.test(string)) return string.toLowerCase();

  if (hasSeparator.test(string)) string = unseparate(string);
  if (hasCamel.test(string)) string = uncamelize(string);
  return string.toLowerCase();
}


/**
 * Separator splitter.
 */

var separatorSplitter = /[\W_]+(.|$)/g;


/**
 * Un-separate a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function unseparate (string) {
  return string.replace(separatorSplitter, function (m, next) {
    return next ? ' ' + next : '';
  });
}


/**
 * Camelcase splitter.
 */

var camelSplitter = /(.)([A-Z]+)/g;


/**
 * Un-camelcase a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function uncamelize (string) {
  return string.replace(camelSplitter, function (m, previous, uppers) {
    return previous + ' ' + uppers.toLowerCase().split('').join(' ');
  });
}
},{}],13:[function(require,module,exports){

var clean = require(12);


/**
 * Expose `toSpaceCase`.
 */

module.exports = toSpaceCase;


/**
 * Convert a `string` to space case.
 *
 * @param {String} string
 * @return {String}
 */


function toSpaceCase (string) {
  return clean(string).replace(/[\W_]+(.|$)/g, function (matches, match) {
    return match ? ' ' + match : '';
  });
}
},{"12":12}],14:[function(require,module,exports){
var settings = require(19);
var THREE = require(10);

var undef;

exports.mesh = undef;
exports.init = init;

function init() {
    var geometry = new THREE.PlaneBufferGeometry( 4500, 4500, 10, 10 );
    var planeMaterial = new THREE.MeshStandardMaterial( {
        color: settings.bgColor,
        roughness: 0.4,
        metalness: 0.4,
    } );
    var mesh = exports.mesh = new THREE.Mesh( geometry, planeMaterial );

    mesh.rotation.x = -1.57;
    mesh.castShadow = false;
    mesh.receiveShadow = true;

}

},{"10":10,"19":19}],15:[function(require,module,exports){
var settings = require(19);
var THREE = require(10);

var undef;

var mesh = exports.mesh = undef;
var pointLight = exports.pointLight = undef;
exports.init = init;
exports.update = update;

var _shadowDarkness = 0.45;

function init() {

    mesh = exports.mesh = new THREE.Object3D();
    mesh.position.set(0, 500, 0);

    var ambient = new THREE.AmbientLight( 0x333333 );
    mesh.add( ambient );

    pointLight = exports.pointLight = new THREE.PointLight( 0xffffff, 1, 700 );
    pointLight.castShadow = true;
    pointLight.shadowCameraNear = 10;
    pointLight.shadowCameraFar = 700;
    // pointLight.shadowCameraFov = 90;
    pointLight.shadowBias = 0.1;
    // pointLight.shadowDarkness = 0.45;
    pointLight.shadowMapWidth = 4096;
    pointLight.shadowMapHeight = 2048;
    mesh.add( pointLight );

}

function update(dt) {
    pointLight.shadowDarkness = _shadowDarkness += (settings.shadowDarkness - _shadowDarkness) * 0.1;
}

},{"10":10,"19":19}],16:[function(require,module,exports){
var settings = require(19);
var THREE = require(10);
var shaderParse = require(21);

var simulator = require(17);

var undef;

var container = exports.container = undef;
exports.init = init;
exports.update = update;

var _renderer;
var _particleMesh;
var _triangleMesh;
var _meshes;

var _color1;
var _color2;
var _tmpColor;

var TEXTURE_WIDTH = settings.simulatorTextureWidth;
var TEXTURE_HEIGHT = settings.simulatorTextureHeight;
var AMOUNT = TEXTURE_WIDTH * TEXTURE_HEIGHT;

function init(renderer) {

    container = exports.container = new THREE.Object3D();

    _tmpColor = new THREE.Color();
    _color1 = new THREE.Color(settings.color1);
    _color2 = new THREE.Color(settings.color2);

    _meshes = [
        _triangleMesh = _createTriangleMesh(),
        _particleMesh = _createParticleMesh()
    ];
    _triangleMesh.visible = false;
    _particleMesh.visible = false;

    _renderer = renderer;

}

function _createParticleMesh() {

    var position = new Float32Array(AMOUNT * 3);
    var i3;
    for(var i = 0; i < AMOUNT; i++ ) {
        i3 = i * 3;
        position[i3 + 0] = (i % TEXTURE_WIDTH) / TEXTURE_WIDTH;
        position[i3 + 1] = ~~(i / TEXTURE_WIDTH) / TEXTURE_HEIGHT;
    }
    var geometry = new THREE.BufferGeometry();
    geometry.addAttribute( 'position', new THREE.BufferAttribute( position, 3 ));

    var material = new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.merge([
            THREE.UniformsLib.shadowmap,
            {
                texturePosition: { type: 't', value: undef },
                color1: { type: 'c', value: undef },
                color2: { type: 'c', value: undef }
            }
        ]),
        vertexShader: shaderParse("#define GLSLIFY 1\nuniform sampler2D texturePosition;\n\nvarying float vLife;\n// chunk(shadowmap_pars_vertex);\n\nvoid main() {\n\n    vec4 positionInfo = texture2D( texturePosition, position.xy );\n\n    vec4 worldPosition = modelMatrix * vec4( positionInfo.xyz, 1.0 );\n    vec4 mvPosition = viewMatrix * worldPosition;\n\n    // chunk(shadowmap_vertex);\n\n    vLife = positionInfo.w;\n    gl_PointSize = 1300.0 / length( mvPosition.xyz ) * smoothstep(0.0, 0.2, positionInfo.w);\n\n    gl_Position = projectionMatrix * mvPosition;\n\n}\n"),
        fragmentShader: shaderParse("#define GLSLIFY 1// chunk(common);\r\n// chunk(fog_pars_fragment);\r\n// chunk(shadowmap_pars_fragment);\r\n\nvarying float vLife;\n\nuniform vec3 color1;\n\nuniform vec3 color2;\n\nvoid main() {\n\n    vec3 outgoingLight = mix(color2, color1, smoothstep(0.0, 0.7, vLife));\n\n    // chunk(shadowmap_fragment);\r\n\n    outgoingLight *= shadowMask;//pow(shadowMask, vec3(0.75));\r\n\n    // chunk(fog_fragment);\r\n    // chunk(linear_to_gamma_fragment);\r\n\n    gl_FragColor = vec4( outgoingLight, 1.0 );\n\n}\n\n"),
        blending: THREE.NoBlending
    });

    material.uniforms.color1.value = _color1;
    material.uniforms.color2.value = _color2;

    var mesh = new THREE.Points( geometry, material );

    mesh.customDistanceMaterial = new THREE.ShaderMaterial( {
        uniforms: {
            lightPos: { type: 'v3', value: new THREE.Vector3( 0, 0, 0 ) },
            texturePosition: { type: 't', value: undef }
        },
        vertexShader: shaderParse("#define GLSLIFY 1\nuniform sampler2D texturePosition;\n\nvarying vec4 vWorldPosition;\n\nvoid main() {\n\n    vec4 positionInfo = texture2D( texturePosition, position.xy );\n\n    vec4 worldPosition = modelMatrix * vec4( positionInfo.xyz, 1.0 );\n    vec4 mvPosition = viewMatrix * worldPosition;\n\n    gl_PointSize = 50.0 / length( mvPosition.xyz );\n\n    vWorldPosition = worldPosition;\n\n    gl_Position = projectionMatrix * mvPosition;\n\n}\n"),
        fragmentShader: shaderParse("#define GLSLIFY 1\nuniform vec3 lightPos;\nvarying vec4 vWorldPosition;\n\n//chunk(common);\n\nvec4 pack1K ( float depth ) {\n\n   depth /= 1000.0;\n   const vec4 bitSh = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\n   const vec4 bitMsk = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\n   vec4 res = fract( depth * bitSh );\n   res -= res.xxyz * bitMsk;\n   return res;\n\n}\n\nfloat unpack1K ( vec4 color ) {\n\n   const vec4 bitSh = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\n   return dot( color, bitSh ) * 1000.0;\n\n}\n\nvoid main () {\n\n   gl_FragColor = pack1K( length( vWorldPosition.xyz - lightPos.xyz ) );\n\n}\n"),
        depthTest: true,
        depthWrite: true,
        side: THREE.BackSide,
        blending: THREE.NoBlending
    });
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    container.add(mesh);

    return mesh;
}

function _createTriangleMesh() {

    var position = new Float32Array(AMOUNT * 3 * 3);
    var positionFlip = new Float32Array(AMOUNT * 3 * 3);
    var fboUV = new Float32Array(AMOUNT * 2 * 3);

    var PI = Math.PI;
    var angle = PI * 2 / 3;
    var i6, i9;
    for(var i = 0; i < AMOUNT; i++ ) {
        i6 = i * 6;
        i9 = i * 9;
        position[ i9 + 0] = Math.sin(angle * 2 + PI);
        position[ i9 + 1] = Math.cos(angle * 2 + PI);
        position[ i9 + 3] = Math.sin(angle + PI);
        position[ i9 + 4] = Math.cos(angle + PI);
        position[ i9 + 6] = Math.sin(angle * 3 + PI);
        position[ i9 + 7] = Math.cos(angle * 3 + PI);

        positionFlip[ i9 + 0] = Math.sin(angle * 2);
        positionFlip[ i9 + 1] = Math.cos(angle * 2);
        positionFlip[ i9 + 3] = Math.sin(angle);
        positionFlip[ i9 + 4] = Math.cos(angle);
        positionFlip[ i9 + 6] = Math.sin(angle * 3);
        positionFlip[ i9 + 7] = Math.cos(angle * 3);

        fboUV[ i6 + 0] = fboUV[ i6 + 2] = fboUV[ i6 + 4] = (i % TEXTURE_WIDTH) / TEXTURE_WIDTH;
        fboUV[ i6 + 1 ] = fboUV[ i6 + 3 ] = fboUV[ i6 + 5 ] = ~~(i / TEXTURE_WIDTH) / TEXTURE_HEIGHT;
    }
    var geometry = new THREE.BufferGeometry();
    geometry.addAttribute( 'position', new THREE.BufferAttribute( position, 3 ));
    geometry.addAttribute( 'positionFlip', new THREE.BufferAttribute( positionFlip, 3 ));
    geometry.addAttribute( 'fboUV', new THREE.BufferAttribute( fboUV, 2 ));

    var material = new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.merge([
            THREE.UniformsLib.shadowmap,
            {
                texturePosition: { type: 't', value: undef },
                flipRatio: { type: 'f', value: 0 },
                color1: { type: 'c', value: undef },
                color2: { type: 'c', value: undef }
            }
        ]),
        vertexShader: shaderParse("#define GLSLIFY 1\nuniform sampler2D texturePosition;\n\n// chunk(shadowmap_pars_vertex);\n\nvarying float vLife;\nattribute vec3 positionFlip;\nattribute vec2 fboUV;\n\nuniform float flipRatio;\n\nvoid main() {\n\n    vec4 positionInfo = texture2D( texturePosition, fboUV );\n    vec3 pos = positionInfo.xyz;\n\n    vec4 worldPosition = modelMatrix * vec4( pos, 1.0 );\n    vec4 mvPosition = viewMatrix * worldPosition;\n\n    // chunk(shadowmap_vertex);\n    vLife = positionInfo.w;\n\n    gl_Position = projectionMatrix * (mvPosition + vec4((position + (positionFlip - position) * flipRatio) * smoothstep(0.0, 0.2, positionInfo.w), 0.0));\n\n}\n"),
        fragmentShader: shaderParse("#define GLSLIFY 1// chunk(common);\r\n// chunk(fog_pars_fragment);\r\n// chunk(shadowmap_pars_fragment);\r\n\nvarying float vLife;\n\nuniform vec3 color1;\n\nuniform vec3 color2;\n\nvoid main() {\n\n    vec3 outgoingLight = mix(color2, color1, smoothstep(0.0, 0.7, vLife));\n\n    // chunk(shadowmap_fragment);\r\n\n    outgoingLight *= shadowMask;//pow(shadowMask, vec3(0.75));\r\n\n    // chunk(fog_fragment);\r\n    // chunk(linear_to_gamma_fragment);\r\n\n    gl_FragColor = vec4( outgoingLight, 1.0 );\n\n}\n\n"),
        blending: THREE.NoBlending
    });

    material.uniforms.color1.value = _color1;
    material.uniforms.color2.value = _color2;

    var mesh = new THREE.Mesh( geometry, material );

    mesh.customDistanceMaterial = new THREE.ShaderMaterial( {
        uniforms: {
            lightPos: { type: 'v3', value: new THREE.Vector3( 0, 0, 0 ) },
            texturePosition: { type: 't', value: undef },
            flipRatio: { type: 'f', value: 0 },

            fogDensity: { type: 'f', value: 0.00025 },
            fogNear: { type: 'f', value: 1 },
            fogFar: { type: 'f', value: 2000 },
            fogColor: { type: 'c', value: new THREE.Color( 0xffffff ) }
        },
        vertexShader: shaderParse("#define GLSLIFY 1\nuniform sampler2D texturePosition;\n\nvarying vec4 vWorldPosition;\n\nattribute vec3 positionFlip;\nattribute vec2 fboUV;\n\nuniform float flipRatio;\n\nvoid main() {\n\n    vec4 positionInfo = texture2D( texturePosition, fboUV );\n    vec3 pos = positionInfo.xyz;\n\n    vec4 worldPosition = modelMatrix * vec4( pos, 1.0 );\n    vec4 mvPosition = viewMatrix * worldPosition;\n\n    vWorldPosition = worldPosition;\n\n    gl_Position = projectionMatrix * (mvPosition + vec4((position + (positionFlip - position) * flipRatio), 0.0));\n\n}\n"),
        fragmentShader: shaderParse("#define GLSLIFY 1\nuniform vec3 lightPos;\nvarying vec4 vWorldPosition;\n\n//chunk(common);\n\nvec4 pack1K ( float depth ) {\n\n   depth /= 1000.0;\n   const vec4 bitSh = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\n   const vec4 bitMsk = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\n   vec4 res = fract( depth * bitSh );\n   res -= res.xxyz * bitMsk;\n   return res;\n\n}\n\nfloat unpack1K ( vec4 color ) {\n\n   const vec4 bitSh = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\n   return dot( color, bitSh ) * 1000.0;\n\n}\n\nvoid main () {\n\n   gl_FragColor = pack1K( length( vWorldPosition.xyz - lightPos.xyz ) );\n\n}\n"),
        depthTest: true,
        depthWrite: true,
        side: THREE.BackSide,
        blending: THREE.NoBlending
    });
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    container.add(mesh);

    return mesh;
}

function update(dt) {
    var mesh;

    _triangleMesh.visible = settings.useTriangleParticles;
    _particleMesh.visible = !settings.useTriangleParticles;

    _tmpColor.setStyle(settings.color1);
    _color1.lerp(_tmpColor, 0.05);

    _tmpColor.setStyle(settings.color2);
    _color2.lerp(_tmpColor, 0.05);

    for(var i = 0; i < 2; i++) {
        mesh = _meshes[i];
        var lightPos = mesh.customDistanceMaterial.uniforms.lightPos.value;
        mesh.material.uniforms.texturePosition.value = simulator.positionRenderTarget;
        mesh.customDistanceMaterial.uniforms.texturePosition.value = simulator.positionRenderTarget;
        if(mesh.material.uniforms.flipRatio) {
            mesh.material.uniforms.flipRatio.value ^= 1;
            mesh.customDistanceMaterial.uniforms.flipRatio.value ^= 1;
        }
    }
}

},{"10":10,"17":17,"19":19,"
   ":21}],17:[function(require,module,exports){
var settings = require(19);
var THREE = require(10);

var undef;


var shaderParse = require(21);

var _copyShader;
var _positionShader;
var _textureDefaultPosition;
var _positionRenderTarget;
var _positionRenderTarget2;

var _renderer;
var _mesh;
var _scene;
var _camera;
var _followPoint;
var _followPointTime = 0;

var TEXTURE_WIDTH = exports.TEXTURE_WIDTH = settings.simulatorTextureWidth;
var TEXTURE_HEIGHT = exports.TEXTURE_HEIGHT = settings.simulatorTextureHeight;
var AMOUNT = exports.AMOUNT = TEXTURE_WIDTH * TEXTURE_HEIGHT;

exports.init = init;
exports.update = update;
exports.initAnimation = 0;

exports.positionRenderTarget = undef;

function init(renderer) {

    _renderer = renderer;
    _followPoint = new THREE.Vector3();

    var rawShaderPrefix = 'precision ' + renderer.capabilities.precision + ' float;\n';

    var gl = _renderer.getContext();
    if ( !gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS) ) {
        alert( 'No support for vertex shader textures!' );
        return;
    }
    if ( !gl.getExtension( 'OES_texture_float' )) {
        alert( 'No OES_texture_float support for float textures!' );
        return;
    }

    _scene = new THREE.Scene();
    _camera = new THREE.Camera();
    _camera.position.z = 1;

    _copyShader = new THREE.RawShaderMaterial({
        uniforms: {
            resolution: { type: 'v2', value: new THREE.Vector2( TEXTURE_WIDTH, TEXTURE_HEIGHT ) },
            texture: { type: 't', value: undef }
        },
        vertexShader: rawShaderPrefix + shaderParse("#define GLSLIFY 1\nattribute vec3 position;\n\nvoid main() {\n    gl_Position = vec4( position, 1.0 );\n}\n"),
        fragmentShader: rawShaderPrefix + shaderParse("#define GLSLIFY 1\nuniform vec2 resolution;\nuniform sampler2D texture;\n\nvoid main() {\n    vec2 uv = gl_FragCoord.xy / resolution.xy;\n    gl_FragColor = texture2D( texture, uv );\n}\n")
    });

    _positionShader = new THREE.RawShaderMaterial({
        uniforms: {
            resolution: { type: 'v2', value: new THREE.Vector2( TEXTURE_WIDTH, TEXTURE_HEIGHT ) },
            texturePosition: { type: 't', value: undef },
            textureDefaultPosition: { type: 't', value: undef },
            mouse3d: { type: 'v3', value: new THREE.Vector3 },
            dieSpeed: { type: 'f', value: 0 },
            radius: { type: 'f', value: 0 },
            attraction: { type: 'f', value: 0 },
            time: { type: 'f', value: 0 },
            initAnimation: { type: 'f', value: 0 }
        },
        vertexShader: rawShaderPrefix + shaderParse("#define GLSLIFY 1\nattribute vec3 position;\n\nvoid main() {\n    gl_Position = vec4( position, 1.0 );\n}\n"),
        fragmentShader: rawShaderPrefix + shaderParse("#define GLSLIFY 1\nuniform vec2 resolution;\nuniform sampler2D texturePosition;\nuniform sampler2D textureDefaultPosition;\nuniform float time;\nuniform float dieSpeed;\nuniform float radius;\nuniform float attraction;\nuniform float initAnimation;\nuniform vec3 mouse3d;\n\nvec4 mod289(vec4 x) {\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nfloat mod289(float x) {\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x) {\n    return mod289(((x*34.0)+1.0)*x);\n}\n\nfloat permute(float x) {\n    return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r) {\n    return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat taylorInvSqrt(float r) {\n    return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec4 grad4(float j, vec4 ip) {\n    const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);\n    vec4 p,s;\n\n    p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;\n    p.w = 1.5 - dot(abs(p.xyz), ones.xyz);\n    s = vec4(lessThan(p, vec4(0.0)));\n    p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;\n\n    return p;\n}\n\n#define F4 0.309016994374947451\n\nvec4 simplexNoiseDerivatives (vec4 v) {\n    const vec4  C = vec4( 0.138196601125011,0.276393202250021,0.414589803375032,-0.447213595499958);\n\n    vec4 i  = floor(v + dot(v, vec4(F4)) );\n    vec4 x0 = v -   i + dot(i, C.xxxx);\n\n    vec4 i0;\n    vec3 isX = step( x0.yzw, x0.xxx );\n    vec3 isYZ = step( x0.zww, x0.yyz );\n    i0.x = isX.x + isX.y + isX.z;\n    i0.yzw = 1.0 - isX;\n    i0.y += isYZ.x + isYZ.y;\n    i0.zw += 1.0 - isYZ.xy;\n    i0.z += isYZ.z;\n    i0.w += 1.0 - isYZ.z;\n\n    vec4 i3 = clamp( i0, 0.0, 1.0 );\n    vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );\n    vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );\n\n    vec4 x1 = x0 - i1 + C.xxxx;\n    vec4 x2 = x0 - i2 + C.yyyy;\n    vec4 x3 = x0 - i3 + C.zzzz;\n    vec4 x4 = x0 + C.wwww;\n\n    i = mod289(i);\n    float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);\n    vec4 j1 = permute( permute( permute( permute (\n             i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))\n           + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))\n           + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))\n           + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));\n\n    vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;\n\n    vec4 p0 = grad4(j0,   ip);\n    vec4 p1 = grad4(j1.x, ip);\n    vec4 p2 = grad4(j1.y, ip);\n    vec4 p3 = grad4(j1.z, ip);\n    vec4 p4 = grad4(j1.w, ip);\n\n    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n    p0 *= norm.x;\n    p1 *= norm.y;\n    p2 *= norm.z;\n    p3 *= norm.w;\n    p4 *= taylorInvSqrt(dot(p4,p4));\n\n    vec3 values0 = vec3(dot(p0, x0), dot(p1, x1), dot(p2, x2)); //value of contributions from each corner at point\n    vec2 values1 = vec2(dot(p3, x3), dot(p4, x4));\n\n    vec3 m0 = max(0.5 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0); //(0.5 - x^2) where x is the distance\n    vec2 m1 = max(0.5 - vec2(dot(x3,x3), dot(x4,x4)), 0.0);\n\n    vec3 temp0 = -6.0 * m0 * m0 * values0;\n    vec2 temp1 = -6.0 * m1 * m1 * values1;\n\n    vec3 mmm0 = m0 * m0 * m0;\n    vec2 mmm1 = m1 * m1 * m1;\n\n    float dx = temp0[0] * x0.x + temp0[1] * x1.x + temp0[2] * x2.x + temp1[0] * x3.x + temp1[1] * x4.x + mmm0[0] * p0.x + mmm0[1] * p1.x + mmm0[2] * p2.x + mmm1[0] * p3.x + mmm1[1] * p4.x;\n    float dy = temp0[0] * x0.y + temp0[1] * x1.y + temp0[2] * x2.y + temp1[0] * x3.y + temp1[1] * x4.y + mmm0[0] * p0.y + mmm0[1] * p1.y + mmm0[2] * p2.y + mmm1[0] * p3.y + mmm1[1] * p4.y;\n    float dz = temp0[0] * x0.z + temp0[1] * x1.z + temp0[2] * x2.z + temp1[0] * x3.z + temp1[1] * x4.z + mmm0[0] * p0.z + mmm0[1] * p1.z + mmm0[2] * p2.z + mmm1[0] * p3.z + mmm1[1] * p4.z;\n    float dw = temp0[0] * x0.w + temp0[1] * x1.w + temp0[2] * x2.w + temp1[0] * x3.w + temp1[1] * x4.w + mmm0[0] * p0.w + mmm0[1] * p1.w + mmm0[2] * p2.w + mmm1[0] * p3.w + mmm1[1] * p4.w;\n\n    return vec4(dx, dy, dz, dw) * 49.0;\n}\n\nvec3 curl( in vec3 p, in float noiseTime, in float persistence ) {\n\n    vec4 xNoisePotentialDerivatives = vec4(0.0);\n    vec4 yNoisePotentialDerivatives = vec4(0.0);\n    vec4 zNoisePotentialDerivatives = vec4(0.0);\n\n    for (int i = 0; i < 3; ++i) {\n\n        float twoPowI = pow(2.0, float(i));\n        float scale = 0.5 * twoPowI * pow(persistence, float(i));\n\n        xNoisePotentialDerivatives += simplexNoiseDerivatives(vec4(p * twoPowI, noiseTime)) * scale;\n        yNoisePotentialDerivatives += simplexNoiseDerivatives(vec4((p + vec3(123.4, 129845.6, -1239.1)) * twoPowI, noiseTime)) * scale;\n        zNoisePotentialDerivatives += simplexNoiseDerivatives(vec4((p + vec3(-9519.0, 9051.0, -123.0)) * twoPowI, noiseTime)) * scale;\n    }\n\n    return vec3(\n        zNoisePotentialDerivatives[1] - yNoisePotentialDerivatives[2],\n        xNoisePotentialDerivatives[2] - zNoisePotentialDerivatives[0],\n        yNoisePotentialDerivatives[0] - xNoisePotentialDerivatives[1]\n    );\n\n}\n\nvoid main() {\n\n    vec2 uv = gl_FragCoord.xy / resolution.xy;\n\n    vec4 positionInfo = texture2D( texturePosition, uv );\n    vec3 position = mix(vec3(0.0, -200.0, 0.0), positionInfo.xyz, smoothstep(0.0, 0.3, initAnimation));\n    float life = positionInfo.a - dieSpeed;\n\n    vec3 followPosition = mix(vec3(0.0, -(1.0 - initAnimation) * 200.0, 0.0), mouse3d, smoothstep(0.2, 0.7, initAnimation));\n\n    if(life < 0.0) {\n        positionInfo = texture2D( textureDefaultPosition, uv );\n        position = positionInfo.xyz * (1.0 + sin(time * 15.0) * 0.2 + (1.0 - initAnimation)) * 0.4 * radius;\n        position += followPosition;\n        life = 0.5 + fract(positionInfo.w * 21.4131 + time);\n    } else {\n        vec3 delta = followPosition - position;\n        position += delta * (0.005 + life * 0.01) * attraction * (1.0 - smoothstep(50.0, 350.0, length(delta)));\n        position += curl(position * 0.02 + 3.0, time, 0.1 + (1.0 - life) * 0.1);\n    }\n\n    gl_FragColor = vec4(position, life);\n\n}\n"),
        blending: THREE.NoBlending,
        transparent: false,
        depthWrite: false,
        depthTest: false
    });

    _mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ), _copyShader );
    _scene.add( _mesh );

    _positionRenderTarget = new THREE.WebGLRenderTarget(TEXTURE_WIDTH, TEXTURE_HEIGHT, {
        wrapS: THREE.ClampToEdgeWrapping,
        wrapT: THREE.ClampToEdgeWrapping,
        minFilter: THREE.NearestFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
        type: THREE.FloatType,
        depthWrite: false,
        depthBuffer: false,
        stencilBuffer: false
    });
    _positionRenderTarget2 = _positionRenderTarget.clone();
    _copyTexture(_createPositionTexture(), _positionRenderTarget);
    _copyTexture(_positionRenderTarget, _positionRenderTarget2);

}

function _copyTexture(input, output) {
    _mesh.material = _copyShader;
    _copyShader.uniforms.texture.value = input;
    _renderer.render( _scene, _camera, output );
}

function _updatePosition(dt) {

    // swap
    var tmp = _positionRenderTarget;
    _positionRenderTarget = _positionRenderTarget2;
    _positionRenderTarget2 = tmp;

    _mesh.material = _positionShader;
    _positionShader.uniforms.textureDefaultPosition.value = _textureDefaultPosition;
    _positionShader.uniforms.texturePosition.value = _positionRenderTarget2;
    _positionShader.uniforms.time.value += dt * 0.001;
    _renderer.render( _scene, _camera, _positionRenderTarget );
}

function _createPositionTexture() {
    var positions = new Float32Array( AMOUNT * 4 );
    var i4;
    var r, phi, theta;
    for(var i = 0; i < AMOUNT; i++) {
        i4 = i * 4;
        // r = (0.5 + Math.pow(Math.random(), 0.4) * 0.5) * 50;
        r = (0.5 + Math.random() * 0.5) * 50;
        phi = (Math.random() - 0.5) * Math.PI;
        theta = Math.random() * Math.PI * 2;
        positions[i4 + 0] = r * Math.cos(theta) * Math.cos(phi);
        positions[i4 + 1] = r * Math.sin(phi);
        positions[i4 + 2] = r * Math.sin(theta) * Math.cos(phi);
        positions[i4 + 3] = Math.random();
    }
    var texture = new THREE.DataTexture( positions, TEXTURE_WIDTH, TEXTURE_HEIGHT, THREE.RGBAFormat, THREE.FloatType );
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    texture.needsUpdate = true;
    texture.generateMipmaps = false;
    texture.flipY = false;
    _textureDefaultPosition = texture;
    return texture;
}

function update(dt) {

    var autoClearColor = _renderer.autoClearColor;
    var clearColor = _renderer.getClearColor().getHex();
    var clearAlpha = _renderer.getClearAlpha();

    _renderer.autoClearColor = false;

    _positionShader.uniforms.dieSpeed.value = settings.dieSpeed;
    _positionShader.uniforms.radius.value = settings.radius;
    _positionShader.uniforms.attraction.value = settings.attraction;
    _positionShader.uniforms.initAnimation.value = exports.initAnimation;

    if(settings.followMouse) {
        _positionShader.uniforms.mouse3d.value.copy(settings.mouse3d);
    } else {
        _followPointTime += dt * 0.001;
        _followPoint.set(
            Math.cos(_followPointTime) * 160.0,
            Math.cos(_followPointTime * 4.0) * 40.0,
            Math.sin(_followPointTime * 2.0) * 160.0
        );
        _positionShader.uniforms.mouse3d.value.lerp(_followPoint, 0.2);
    }

    // _renderer.setClearColor(0, 0);
    _updatePosition(dt);

    _renderer.setClearColor(clearColor, clearAlpha);
    _renderer.autoClearColor = autoClearColor;
    exports.positionRenderTarget = _positionRenderTarget;

}



},{"10":10,"19":19,"21":21}],18:[function(require,module,exports){
//var THREE = require('three');

/**
 * @author qiao / https://github.com/qiao
 * @author mrdoob / http://mrdoob.com
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / https://github.com/WestLangley
 * @author erich666 / http://erichaines.com
 */
/*global THREE, console */

// This set of controls performs orbiting, dollying (zooming), and panning. It maintains
// the "up" direction as +Y, unlike the TrackballControls. Touch on tablet and phones is
// supported.
//
//    Orbit - left mouse / touch: one finger move
//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
//    Pan - right mouse, or arrow keys / touch: three finter swipe

},{}],19:[function(require,module,exports){
exports.useStats = false;
exports.simulatorTextureWidth = 256;
exports.simulatorTextureHeight = 256;
exports.useTriangleParticles = true;
exports.followMouse = true;

exports.dieSpeed = 0.015;
exports.radius = 0.6;
exports.attraction = 1;
exports.shadowDarkness = 0.45;

exports.bgColor = '#dfdfdf';
exports.color1 = '#ffffff';
exports.color2 = '#ffffff';


},{}],20:[function(require,module,exports){
var isMobile = /(iPad|iPhone|Android)/i.test(navigator.userAgentData);

exports.pass = pass;

var _callback;

function pass(func) {
    if(isMobile) {
        _callback = func;
        init();
    } else {
        func();
    }
}

var _container;
var _bypass;

function init() {
    _container = document.querySelector('.mobile');
    _container.style.display = 'block';

    _bypass = document.querySelector('.mobile-bypass');
    if(_bypass) _bypass.addEventListener('click', _onByPassClick);
}

function _onByPassClick() {
    _container.parentNode.removeChild(_container);
    _callback();
}

},{}],21:[function(require,module,exports){
var THREE = require(10);

var threeChunkReplaceRegExp = /\/\/\s?chunk_replace\s(.+)([\d\D]+)\/\/\s?end_chunk_replace/gm;
var threeChunkRegExp = /\/\/\s?chunk\(\s?(\w+)\s?\);/g;
// var glslifyBugFixRegExp = /(_\d+_\d+)(_\d+_\d+)+/g;
// var glslifyGlobalRegExp = /GLOBAL_VAR_([^_\.\)\;\,\s]+)(_\d+_\d+)?/g;
var glslifyGlobalRegExp = /GLOBAL_VAR_([^_\.\)\;\,\s]+)(_\d+)?/g;

var _chunkReplaceObj;

function _storeChunkReplaceParse(shader) {
    _chunkReplaceObj = {};
    return shader.replace(threeChunkReplaceRegExp, _storeChunkReplaceFunc);
}

function _threeChunkParse(shader) {
    return shader.replace(threeChunkRegExp, _replaceThreeChunkFunc);
}

// function _glslifyBugFixParse(shader) {
//     return shader.replace(glslifyBugFixRegExp, _returnFirst);
// }

function _glslifyGlobalParse(shader) {
    return shader.replace(glslifyGlobalRegExp, _returnFirst);
}

function _storeChunkReplaceFunc(a, b, c) {
    _chunkReplaceObj[b.trim()] = c;
    return '';
}

function _replaceThreeChunkFunc(a, b) {
    var str = THREE.ShaderChunk[b] + '\n';
    for(var id in _chunkReplaceObj) {
        str = str.replace(id, _chunkReplaceObj[id]);
    }
    return str;
}

function _returnFirst(a, b) {
    return b;
}

function parse(shader) {
    shader = _storeChunkReplaceParse(shader);
    shader = _threeChunkParse(shader);
    // shader = _glslifyBugFixParse(shader);
    return _glslifyGlobalParse(shader);
}

module.exports = parse;

},{"10":10}],22:[function(require,module,exports){


},{"1":1,"10":10,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"23":23,"24":24,"4":4,"8":8,"9":9}],23:[function(require,module,exports){
// from https://github.com/kaelzhang/easing-functions/
var basic = {
    Linear: {
        None: function(e) {
            return e;
        }
    },
    Quad: {
        In: function(e) {
            return e * e;
        },
        Out: function(e) {
            return e * (2 - e);
        },
        InOut: function(e) {
            if ((e *= 2) < 1) return 0.5 * e * e;
            return - 0.5 * (--e * (e - 2) - 1);
        }
    },
    Cubic: {
        In: function(e) {
            return e * e * e;
        },
        Out: function(e) {
            return --e * e * e + 1;
        },
        InOut: function(e) {
            if ((e *= 2) < 1) return 0.5 * e * e * e;
            return 0.5 * ((e -= 2) * e * e + 2);
        }
    },
    Quart: {
        In: function(e) {
            return e * e * e * e;
        },
        Out: function(e) {
            return 1 - --e * e * e * e;
        },
        InOut: function(e) {
            if ((e *= 2) < 1) return 0.5 * e * e * e * e;
            return - 0.5 * ((e -= 2) * e * e * e - 2);
        }
    },
    Quint: {
        In: function(e) {
            return e * e * e * e * e;
        },
        Out: function(e) {
            return --e * e * e * e * e + 1;
        },
        InOut: function(e) {
            if ((e *= 2) < 1) return 0.5 * e * e * e * e * e;
            return 0.5 * ((e -= 2) * e * e * e * e + 2);
        }
    },
    Sine: {
        In: function(e) {
            return 1 - Math.cos(e * Math.PI / 2);
        },
        Out: function(e) {
            return Math.sin(e * Math.PI / 2);
        },
        InOut: function(e) {
            return 0.5 * (1 - Math.cos(Math.PI * e));
        }
    },
    Expo: {
        In: function(e) {
            return e === 0 ? 0 : Math.pow(1024, e - 1);
        },
        Out: function(e) {
            return e === 1 ? 1 : 1 - Math.pow(2, -10 * e);
        },
        InOut: function(e) {
            if (e === 0) return 0;
            if (e === 1) return 1;
            if ((e *= 2) < 1) return 0.5 * Math.pow(1024, e - 1);
            return 0.5 * (-Math.pow(2, -10 * (e - 1)) + 2);
        }
    },
    Circ: {
        In: function(e) {
            return 1 - Math.sqrt(1 - e * e);
        },
        Out: function(e) {
            return Math.sqrt(1 - --e * e);
        },
        InOut: function(e) {
            if ((e *= 2) < 1) return - 0.5 * (Math.sqrt(1 - e * e) - 1);
            return 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
        }
    },
    Elastic: {
        In: function(e) {
            var t, n =0.1,
                r =0.4;
            if (e === 0) return 0;
            if (e === 1) return 1;
            if (!n || n < 1) {
                n = 1;
                t = r / 4;
            } else t = r * Math.asin(1 / n) / (2 * Math.PI);
            return -(n * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * 2 * Math.PI / r));
        },
        Out: function(e) {
            var t, n =0.1,
                r =0.4;
            if (e === 0) return 0;
            if (e === 1) return 1;
            if (!n || n < 1) {
                n = 1;
                t = r / 4;
            } else t = r * Math.asin(1 / n) / (2 * Math.PI);
            return n * Math.pow(2, -10 * e) * Math.sin((e - t) * 2 * Math.PI / r) + 1;
        },
        InOut: function(e) {
            var t, n =0.1,
                r =0.4;
            if (e === 0) return 0;
            if (e === 1) return 1;
            if (!n || n < 1) {
                n = 1;
                t = r / 4;
            } else {
                t = r * Math.asin(1 / n) / (2 * Math.PI);
            }
            if ((e *= 2) < 1) return - 0.5 * n * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * 2 * Math.PI / r);
            return n * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - t) * 2 * Math.PI / r) *0.5 + 1;
        }
    },
    Back: {
        In: function(e) {
            var t = 1.70158;
            return e * e * ((t + 1) * e - t);
        },
        Out: function(e) {
            var t = 1.70158;
            return --e * e * ((t + 1) * e + t) + 1;
        },
        InOut: function(e) {
            var t = 1.70158 * 1.525;
            if ((e *= 2) < 1) return 0.5 * e * e * ((t + 1) * e - t);
            return 0.5 * ((e -= 2) * e * ((t + 1) * e + t) + 2);
        }
    },
    Bounce: {
        In: function(e) {
            return 1 - basic.Bounce.Out(1 - e);
        },
        Out: function(e) {
            if (e < 1 / 2.75) {
                return 7.5625 * e * e;
            } else if (e < 2 / 2.75) {
                return 7.5625 * (e -= 1.5 / 2.75) * e +0.75;
            } else if (e < 2.5 / 2.75) {
                return 7.5625 * (e -= 2.25 / 2.75) * e +0.9375;
            } else {
                return 7.5625 * (e -= 2.625 / 2.75) * e +0.984375;
            }
        },
        InOut: function(e) {
            if (e <0.5) return basic.Bounce.In(e * 2) *0.5;
            return basic.Bounce.Out(e * 2 - 1) *0.5 +0.5;
        }
    }
};

exports.basic = basic;
exports.linear = basic.Linear;

var id, list;
for(id in basic) {
    if(id !== 'Linear') {
        list = basic[id];
        exports['easeIn' + id] = list.In;
        exports['easeOut' + id] = list.Out;
        exports['easeInOut' + id] = list.InOut;
    }
}

},{}],24:[function(require,module,exports){
for(var id in Math) {
    exports[id] = Math[id];
}

exports.step = step;
exports.smoothstep = smoothstep;
exports.clamp = clamp;
exports.mix = exports.lerp = mix;
exports.unMix = exports.unLerp = unMix;
exports.unClampedMix = exports.unClampedLerp = unClampedMix;
exports.upClampedUnMix = exports.unClampedUnLerp = upClampedUnMix;
exports.fract = fract;
exports.hash = hash;
exports.hash2 = hash2;
exports.sign = sign;

var PI = Math.PI;
var TAU = exports.TAU = PI * 2;

function step ( edge, val ) {
    return val < edge ? 0 : 1;
}

function smoothstep ( edge0, edge1, val ) {
    val = unMix( edge0, edge1, val );
    return val * val ( 3 - val * 2 );
}

function clamp ( val, min, max ) {
    return val < min ? min : val > max ? max : val;
}

function mix ( min, max, val ) {
    return val <= 0 ? min : val >= 1 ? max : min + ( max - min ) * val;
}

function unMix ( min, max, val ) {
    return val <= min ? 0 : val >= max ? 1 : ( val - min ) / ( max - min );
}

function unClampedMix ( min, max, val ) {
    return min + ( max - min ) * val;
}

function upClampedUnMix ( min, max, val ) {
    return ( val - min ) / ( max - min );
}

function fract ( val ) {
    return val - Math.floor( val );
}

function hash (val) {
    return fract( Math.sin( val ) * 43758.5453123 );
}

function hash2 (val1, val2) {
    return fract( Math.sin( val1 * 12.9898 + val2 * 4.1414 ) * 43758.5453 );
}

function sign (val) {
    return val ? val < 0 ? - 1 : 1 : 0;
}

},{}]},{},[22]);

}
