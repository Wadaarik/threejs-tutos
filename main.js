import * as THREE from "./lib/three.module.js";


export default class Main{

    constructor() {

        this.update = this.update.bind(this)//resoult le pb de reference this

        this.scene;//variable scene
        this.camera;//variable camera
        this.renderer;//variable renderer

        this.init();
    }

    init(){//initialise la scene

        this.scene = new THREE.Scene();
        /*
            La perspective camera donne une vue 3D où les entités lointaines semblent plus petites que les entités proches.
            La PerspectiveCamerapossède 4 param
                le fov = valeur de rendu camera
                l'aspect = ratio de l'écran
                le near = limite proche (en dessous de la valeur ne sera pas visible)
                le far = limite loitaine (au dessus de la valeur ne sera pas visible)
         */
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);//initialise la taille de la scene

        //creation d'un cube
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0xff000 });
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);

         this.camera.position.z = 2;//on recule la camera pour voir le cube
        // this.cube.rotation.y = Math.PI/4;//permet la rotation du cube

        document.body.appendChild(this.renderer.domElement);//si on indique pas de balise caméra le renderer créer une camera par défaut et on l'injecte via cette ligne

        this.update();
    }

    update(){

        requestAnimationFrame(this.update);
        this.cube.rotation.y += 0.01; //va creer une rotation perpetuelle autours de l'axe Y

        this.renderer.render(this.scene, this.camera);//on rend la scene via la camera
    }

}

new Main();