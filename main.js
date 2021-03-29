import * as THREE from "./lib/three.module.js";
import { OrbitControls } from "./lib/OrbitControls.js";
import Stats from "./lib/stats.module.js";
import Objects from "./objects.js";
import Mesh1 from "./mesh1.js";

export default class Main{

    constructor() {

        this.update = this.update.bind(this);//resoult le pb de reference this
        this.onResize = this.onResize.bind(this);

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
        this.renderer = new THREE.WebGLRenderer({antialias: true});//alpha -> passe la scene en transparent, antialias permet d'éviter les pixels sur les bords
        this.renderer.setSize(window.innerWidth, window.innerHeight);//initialise la taille de la scene

        //creation d'un cube
        // const geometry = new THREE.BoxGeometry();
        // const material = new THREE.MeshBasicMaterial({ color: 0xff000 });
        // this.cube = new THREE.Mesh(geometry, material);
        // this.scene.add(this.cube);

         this.camera.position.z = 2;//on recule la camera pour voir le cube
         this.camera.position.y = 1;
        // this.cube.rotation.y = Math.PI/4;//permet de voir le cube en 3/4

        window.addEventListener('resize', this.onResize, false);

        document.body.appendChild(this.renderer.domElement);//si on indique pas de balise caméra le renderer créer une camera par défaut et on l'injecte via cette ligne


        this.stats = new Stats();
        document.body.appendChild(this.stats.dom);//permet d'afficher les stats fps
        new OrbitControls(this.camera, this.renderer.domElement);//permet de controler la forme via la souris

        this.update();

        this.initObjects();
    }

    initObjects(){

        this.dlight = new THREE.DirectionalLight();//creer une directional light
        this.dlight.position.z = 5;
        this.dlight.position.x = 5;
        this.dlight.position.y = 5;
        this.scene.add(this.dlight);

        this.helper = new THREE.DirectionalLightHelper(this.dlight, 1);//permet de voir où se trouve la directional light
        this.scene.add(this.helper);

        this.objects = new Objects();
        this.scene.add(this.objects);

        this.corn = new Mesh1();
        this.scene.add(this.corn);
    }

    onResize(){//permet de resizer automatiquement la scene en fonction de la taille de la fenêtre
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    update(){

        requestAnimationFrame(this.update);
        // this.cube.rotation.y += 0.01; //va creer une rotation perpetuelle autours de l'axe Y

        this.dlight && (this.dlight.position.x += -0.01);
        this.helper && this.helper.update();

        this.renderer.render(this.scene, this.camera);//on rend la scene via la camera

        // this.orbitControls.update();
        this.stats.update();
    }

}

new Main();