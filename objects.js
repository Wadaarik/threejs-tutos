import * as THREE from "./lib/three.module.js";

console.log('Hello');

export default class Objects extends THREE.Object3D{

    constructor() {

        super();

        this.boxGeometry = new THREE.BoxGeometry(.5,.5,.5);
        const redMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

        this.sphereGeometry = new THREE.SphereGeometry(.3, 12, 12);
        const greenMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

        this.planGeometry = new THREE.PlaneGeometry(3, 3);
        const whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side : THREE.DoubleSide });

        this.boxMesh = new THREE.Mesh(this.boxGeometry, redMaterial);

        // var clone = this.boxMesh.clone();//clone un cube
        // clone.position.x = 1;
        // this.scene.add(clone);

        // this.boxMesh.material.color = new THREE.Color(0x0000ff);//change la couleur du cube
        // this.boxMesh.rotation.y = THREE.Math.degToRad(45);//rotation du cube
        // this.boxMesh.visible = flase //rend le cube invisible


        this.sphereMesh = new THREE.Mesh(this.sphereGeometry, greenMaterial);
        this.sphereMesh.position.x = -1;//position de la sphere
        // this.sphereMesh.scale.set(.1,.1,.1);//scale de la sphere

        this.planMesh = new THREE.Mesh(this.planGeometry, whiteMaterial);
        this.planMesh.rotation.x = THREE.Math.degToRad(-90);
        this.planMesh.position.y = -1;

        this.add(this.boxMesh);
        this.add(this.planMesh);
        this.add(this.sphereMesh);

        // this.groupe = new THREE.Object3D();//affecte une appartenance a un groupe

        // this.groupe.position.x = -1;
        // this.groupe.rotation.x = THREE.Math.degToRad(-30);
        // this.groupe.scale.y = .3;


    }
}