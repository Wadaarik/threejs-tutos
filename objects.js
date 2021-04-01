import * as THREE from "./lib/three.module.js";
import Global from "./global.js";


export default class Objects extends THREE.Object3D{

    constructor() {

        super();

        this.update = this.update.bind(this);

        this.boxGeometry = new THREE.BoxGeometry(.5,.5,.5);
        const redMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
        // redMaterial.map = new THREE.TextureLoader().load("./assets/watermelon.png");
        // redMaterial.transparent = true;
        redMaterial.metalness = 1;
        redMaterial.roughness = 1;
        redMaterial.envMap = Global.instance.envMap;
        redMaterial.envMapIntensity = .3;
        redMaterial.map = new THREE.TextureLoader().load("./assets/marble_jpg/marble_01_AO_1k.jpg");
        redMaterial.map.anisotropy = 12;
        redMaterial.normalMap = new THREE.TextureLoader().load("./assets/marble_png/marble_01_nor_1k.png");
        redMaterial.normalScale.set(.2, .2);
        redMaterial.roughnessMap = new THREE.TextureLoader().load("./assets/marble_jpg/marble_01_rough_1k.jpg");
        redMaterial.metalnessMap = new THREE.TextureLoader().load("./assets/marble_jpg/marble_01_spec_1k.jpg");


        this.sphereGeometry = new THREE.SphereGeometry(.3, 24, 24);
        const greenMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
        greenMaterial.metalness = .1;
        greenMaterial.roughness = .4;
        greenMaterial.map = new THREE.TextureLoader().load("./assets/snow_jpg/snow_field_aerial_AO_1k.jpg");
        greenMaterial.map.anisotropy = 12;
        greenMaterial.map.wrapS = greenMaterial.map.wrapT = THREE.RepeatWrapping;//repete la texture
        greenMaterial.map.repeat.set(3, 1);
        greenMaterial.normalMap = new THREE.TextureLoader().load("./assets/snow_png/snow_field_aerial_nor_1k.png");
        greenMaterial.normalMap.wrapS = greenMaterial.map.wrapT = THREE.RepeatWrapping;//repete la texture
        greenMaterial.normalMap.repeat.set(3, 1);
        greenMaterial.envMap = Global.instance.envMap;
        greenMaterial.envMapIntensity = .4;


        this.planeMap = new THREE.TextureLoader().load("./assets/sol.jpg");//import la texture
        this.planeMap.anisotropy = 12;
        this.planeMap.wrapS = this.planeMap.wrapT = THREE.RepeatWrapping;//appelle la fonction repeat
        this.planeMap.repeat.set(20,20);//repete la texture
        // this.planeMap.offset.set(.5,.5);//deplace la texture
        // this.planeMap.rotation = THREE.Math.degToRad(30);//rotation de la texture

        this.planGeometry = new THREE.PlaneGeometry(50, 50);
        const whiteMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, side : THREE.DoubleSide });

        whiteMaterial.map = this.planeMap;

        this.boxMesh = new THREE.Mesh(this.boxGeometry, redMaterial);
        this.boxMesh.castShadow = true;
        this.boxMesh.receiveShadow = true;
        this.boxMesh.position.x = 1;
        this.boxMesh.position.y = .5;
        this.boxMesh.name = "box";

        // var clone = this.boxMesh.clone();//clone un cube
        // clone.position.x = 1;
        // this.scene.add(clone);
        // this.boxMesh.material.color = new THREE.Color(0x0000ff);//change la couleur du cube
        // this.boxMesh.rotation.y = THREE.Math.degToRad(45);//rotation du cube
        // this.boxMesh.visible = flase //rend le cube invisible


        this.sphereMesh = new THREE.Mesh(this.sphereGeometry, greenMaterial);
        this.sphereMesh.castShadow = true; //la sphere cast les ombres
        this.sphereMesh.receiveShadow = true; //la sphere accepte de recevoir les ombres
        this.sphereMesh.position.x = -1;//position de la sphere
        this.sphereMesh.position.y = .4;
        this.sphereMesh.name = "sphere";
        // this.sphereMesh.scale.set(.1,.1,.1);//scale de la sphere

        this.planMesh = new THREE.Mesh(this.planGeometry, whiteMaterial);
        this.planMesh.receiveShadow = true; //le plan accepte de recevoir les ombres
        this.planMesh.rotation.x = THREE.Math.degToRad(-90);
        this.planMesh.name = "plan";

        this.add(this.boxMesh);
        this.add(this.planMesh);
        this.add(this.sphereMesh);

        // this.groupe = new THREE.Object3D();//affecte une appartenance a un groupe

        // this.groupe.position.x = -1;
        // this.groupe.rotation.x = THREE.Math.degToRad(-30);
        // this.groupe.scale.y = .3;
    }

    update(){
        // this.boxMesh.rotation.x += THREE.Math.degToRad(1);
        // this.boxMesh.rotation.y += THREE.Math.degToRad(1);

        // this.planeMap.offset.x += -0.01;//anime la texture
    }
}