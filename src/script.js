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
mesh.scale.set(1, 1, 1); //x,y,z

/**
 * Rotation
 */

//Note : It's not a Vector it's a Euler
mesh.rotation.x += 0; //within the y axis

// https://threejs.org/docs/#api/en/math/Euler
// Great way to understand this
// https://en.wikipedia.org/wiki/Euler_angles

mesh.rotation.y += 0; //within the x axis

// z axis like a key unlocking a lock
// In order to complete rotation = pi = 3.14
mesh.rotation.z += Math.PI; // both x and y and y axis
mesh.rotation.z += 0.5; // both x and y and y axis

// Gimbal Lock
// Usually happens in 3D graphics when you rotate the object in the same axis
// When we are rotating the object in the x axis then it's y axis must be pointing
// not at the point before
// To Prevent it Three JS offers
mesh.rotation.reorder("YXZ");
//so initially Y is rotation then X will rotate where as before X was rotating before and then Y
mesh.rotation.x += 0.5;
mesh.rotation.y += 0.5;

// This Euler sucks due to this order issues
// that's why 3D softwares uses Quaternion
// https://eater.net/quaternions
// It's hard
//Just remember : when you update the quaternion you update rotation and vice versa

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 4;
camera.position.x = 1;
scene.add(camera);
/**
 * lookAt
 * it works with every object
 * it will orientate the object so that it's -z axis is facing the object
 */
camera.lookAt(mesh.position); //camera is looking straight at my cube

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
 * Scene Graph
 * We created a house door, bushes, garden At a point we realized
 * Oh No ! It's too small or it's not at the right place
 * To Avoid this, We can put everything inside a group
 * Group inherits from Object3D
 * Now we move the group , scale the group , rotate the group
 * Note : Put a Habit to put things inside a group as will be used so much
 *
 */

const group = new THREE.Group();
// https://threejs.org/docs/#api/en/objects/Group
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x39ff14 })
);
cube1.position.set(1, 1, 0);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
cube2.position.set(-1, -1, 0);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xffff00 })
);
group.add(cube1);
group.add(cube2);
group.add(cube3);

scene.add(group);
group.position.z = 1;
group.rotation.x += 1;
group.scale.x = 1.2;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
