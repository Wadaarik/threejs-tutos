import * as THREE from "./lib/three.module.js";
import { OrbitControls } from "./lib/OrbitControls.js";
import Stats from "./lib/stats.module.js";
import Objects from "./objects.js";
import Mesh1 from "./mesh1.js";
import Global from "./global.js";

export default class Main{

    constructor() {

        this.update = this.update.bind(this);//resoult le pb de reference this
        this.onResize = this.onResize.bind(this);
        this.initEvents = this.initEvents.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onDown = this.onDown.bind(this);
        this.onUp = this.onUp.bind(this);
        this.findIntersction = this.findIntersction.bind(this);

        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.INTERSECTED;

        this.scene;//variable scene
        this.camera;//variable camera
        this.renderer;//variable renderer

        this.init();
    }

    init(){//initialise la scene

        this.scene = new THREE.Scene();

        //this.scene.background = new THREE.Color(0x6ee7ff);

        //Brouillard
        this.scene.fog = new THREE.FogExp2(0x424347, 0.1);

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
        this.renderer.shadowMap.enabled = true; //active l'ombre
        this.renderer.setSize(window.innerWidth, window.innerHeight);//initialise la taille de la scene

        this.skyTexture= new THREE.TextureLoader().load("./assets/background.jpg", ()=>{//créer le background
            this.skyEquipMap = new THREE.WebGLCubeRenderTarget(1024).fromEquirectangularTexture(this.renderer, this.skyTexture);
            Global.instance.envMap = this.skyEquipMap;//instancie les futurs materiaux via singleton
            this.scene.background = this.skyEquipMap;

            this.initObjects();
        });

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
        this.orbital = new OrbitControls(this.camera, this.renderer.domElement);//permet de controler la forme via la souris
        this.orbital.maxPolarAngle  = THREE.Math.degToRad(86);//bloque la caméra au niveau du plan


        this.update();
        this.initEvents();
    }

    initEvents(){
        this.renderer.domElement.addEventListener("mousemove", this.onMove, false);
        document.body.addEventListener("pointerdown", this.onDown, false);
        document.body.addEventListener("pointerup", this.onUp, false);
    }
    onMove(event){
        event.preventDefault();
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    onDown(event){
        event.preventDefault();
        this.INTERSECTED && this.INTERSECTED.interaction && (this.tween = TweenLite.to(this.INTERSECTED.scale, 2, {x: .5, y: .5, z: .5}));
    }
    onUp(event){
        event.preventDefault();
        this.tween && this.tween.kill();
        this.INTERSECTED && TweenLite.to(this.INTERSECTED.scale, 1, {x: 1, y: 1, z: 1, ease: "elastic.out(1, 0.3)"});
    }

    findIntersction(){//fonction qui intercepte les objets

        this.camera.updateMatrixWorld();//prend en compte toutes les nouvelles modifs de la caméra

        this.raycaster.setFromCamera(this.mouse, this.camera);

        const intersects = this.raycaster.intersectObjects(this.objects.children);

        if (intersects.length > 0){

            if ( this.INTERSECTED != intersects[0].object){//si il y a interaction avec l'objet alors augmente le scale, sinon null et scale normal

                this.INTERSECTED && TweenLite.to(this.INTERSECTED.scale, .2, {x: 1, y: 1, z: 1});
                this.INTERSECTED = intersects[0].object;
                this.INTERSECTED.interaction && TweenLite.to(this.INTERSECTED.scale, .2, {x: 1.1, y: 1.1, z: 1.1});
            }

        }else {
            this.INTERSECTED && TweenLite.to(this.INTERSECTED.scale, .2, {x: 1, y: 1, z: 1});
            this.INTERSECTED = null;
        }

    }

    initObjects(){

        this.dlight = new THREE.DirectionalLight();//creer une directional light
        this.dlight.position.z = 5;
        this.dlight.position.x = 5;
        this.dlight.position.y = 5;
        this.dlight.castShadow = true;//active l'ombre pour la light
        this.dlight.shadow.mapSize.width = 2048;
        this.dlight.shadow.mapSize.height = 2048;
        this.dlight.shadow.bias = -0.0001;
        this.scene.add(this.dlight);

        this.alight = new THREE.AmbientLight();
        this.alight.intensity = .4;
        this.scene.add(this.alight);

        //this.helper = new THREE.DirectionalLightHelper(this.dlight, 1);//permet de voir où se trouve la directional light
        //this.scene.add(this.helper);

        this.objects = new Objects();
        this.scene.add(this.objects);

        this.mesh1 = new Mesh1();
        this.scene.add(this.mesh1);
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
        // this.mesh1.rotation.y += .05; //va creer une rotation perpetuelle autours de l'axe Y

        // this.dlight && (this.dlight.position.x += -0.01);
        // this.helper && this.helper.update();

        this.objects && this.objects.update();

        this.objects && this.findIntersction();

        this.renderer.render(this.scene, this.camera);//on rend la scene via la camera

        // this.orbitControls.update();
        this.stats.update();
    }

}

new Main();