import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Positions
 */
// mesh.position.z += 1;
// mesh.position.y -= 0.6;
// mesh.position.x += 0.6;
mesh.position.set(0.6, -0.6, 1); //x,y,z

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Scale
 */
// mesh.scale.x = 0.5;
// mesh.scale.y = 0.5;
// mesh.scale.z = 1.5;
mesh.scale.set(0.5, 0.5, 1.5); //x,y,z

/**
 * Rotation
 */



/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.x = 1;
scene.add(camera);

//Get the length of the Vector to detect the distance of the screen and our object's position
console.log(mesh.position.length());

//Distance between the camera and the object
console.log(mesh.position.distanceTo(camera.position));

//Normal will reduce the mesh's Vector to 1

// mesh.position.normalize();
console.log(mesh.position.length()); // 1

//----xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx----//

// Axes Helper
/* https://threejs.org/docs/#api/en/helpers/AxesHelper */
// Class inside ThreeJS
// AxesHelper in Three.js shows three colored lines that help you see
// the X, Y, and Z directions in your 3D scene.

const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
