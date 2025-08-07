import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
// set canvas width and height
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const orbitControls = new OrbitControls(camera, renderer.domElement);

orbitControls.update();
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(-10, 30, 30);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(geometry, material);
scene.add(box);



const playGeometry = new THREE.PlaneGeometry(30, 30);
const playMaterial = new THREE.MeshStandardMaterial({
    // color: 0xFFFFFF,
    color: new THREE.Color().setHex( 0xFFFFFF ),
    side: THREE.DoubleSide,
});
const play = new THREE.Mesh(playGeometry, playMaterial);
play.rotation.x = -0.5 * Math.PI;
play.receiveShadow = true;
scene.add(play);

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

const sphereGeometry = new THREE.SphereGeometry(5, 50, 50);
const sphereMaterial = new THREE.MeshStandardMaterial({
    // color: 0x0000FF,
    color: new THREE.Color().setHex( 0x0000FF ),
    wireframe: false,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(-10, 10, 0);
sphere.castShadow = true;


const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
// scene.add(directionalLight);
// directionalLight.castShadow = true;
// directionalLight.shadow.camera.bottom = -12;
// directionalLight.position.set(-30, 50, 0);

// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(dLightHelper);
// const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(dLightShadowHelper);

const spotLight = new THREE.SpotLight(0xFFFFFF);
scene.add(spotLight);
spotLight.position.set(-100, 100, 0);
spotLight.castShadow = true;
spotLight.angle = 0.2;

const sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);

const gui = new dat.GUI();
const options = {
    sphereColor: "#ffea00",
    speed: 0.01,
};
gui.addColor(options, "sphereColor").onChange(function (e) {
    sphere.material.color.set(e);
});

gui.add(options, "speed", 0, 0.1);

box.rotation.x = 5;
box.rotation.y = 5;

renderer.render(scene, camera);
let step = 0;
function animate(time) {
    box.rotation.x = time / 1000;
    box.rotation.y = time / 1000;

    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step));

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
