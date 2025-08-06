import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
// set canvas width and height
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// sets the position of the camera along the z-axis, moving it 5 units away from the origin (0, 0, 0).
// camera.position.z = 10;
//  camera.position.x = 10
//  camera.position.y = 10
camera.position.set(1, 1, 5);

function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render( scene, camera );
  }
  renderer.render( scene, camera );
  // renderer.setAnimationLoop( animate );