import * as THREE from "./lib/three.module.js";
import {GLTFLoader} from "./lib/GLTFLoader.js";

export default class Mesh1 extends THREE.Object3D{

    constructor() {
        super();

        this.update = this.update.bind(this);

        const blueMaterial = new THREE.MeshStandardMaterial({color: 0x0000ff, side: THREE.DoubleSide});//MeshStandardMaterial prend en charge l'impact d'une light
        // const redMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});

        const loader = new GLTFLoader();
        loader.load('./assets/car_2.gltf', (object) => {//charge le model corn
        // loader.load('./assets/cars.gltf', (object) => {//charge le fichier merged des 2 models

            object.scene.children.map((child) => {//pointe sur le tableau, point vers l'element corn.glb
                this.add(child);
                // var clone;
                 if (child.isMesh){//si l'objet est de type mesh
                     console.log("name:", child.name);
                     child.scale.set(0.3, 0.3, 0.3);
                     child.position.set(0, 0, 0);
                     child.rotation.x = Math.PI / 180;
                     child.material = blueMaterial;
                     child.castShadow = true;
                     child.receiveShadow = true;
                     this.add(child);

                     // switch (child.name){//si on merge 2 éléments dans un meme projet
                     //
                     //     case "car2":
                     //         clone = child.clone();
                     //         clone.scale.set(0.3, 0.3, 0.3);
                     //         clone.position.set(0, .3, 0);
                     //         clone.rotation.x = Math.PI / 180;
                     //         clone.material = blueMaterial;
                     //         console.log("name:", child.name);
                     //         this.add(clone);
                     //
                     //         break;
                     //
                     //     case "car9":
                     //         clone = child.clone();
                     //         clone.scale.set(0.3, 0.3, 0.3);
                     //         clone.position.set(-1, 0, -1);
                     //         clone.rotation.x = Math.PI / 180;
                     //         clone.material = redMaterial;
                     //         console.log("name:", child.name);
                     //         this.add(clone);
                     //
                     //         break;
                     //
                     //
                     //
                     // }

                 }
            })

        })


    }

    update(){


    }


}