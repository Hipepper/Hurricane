function draw_earth() {
    // var count=0;
    var nameSelect=document.getElementById('nameSelect');
    var index = nameSelect.selectedIndex;
    var name=nameSelect.options[index].innerHTML;
    console.log(name);
    var picPath='images/hurricanes/'+name+'-';
    var dataPath = nameSelect.options[index].value;
    var data;
    load_json(dataPath,get_recordCount);
    // console.log(recordCount);
    for(var i=0;i<10;i++){
        draw(i);
        setTimeout(1000);
    }

    function get_recordCount(data){
        recordCount=data['recordCount'];
        console.log(recordCount);
        // alert(recordCount);
    }
    function draw(i)
    {
        var WIDTH = window.innerWidth - 30,
            HEIGHT = window.innerHeight - 30;

        var angle = 45,
            aspect = WIDTH / HEIGHT,
            near = 0.1,
            far = 10000;

        var container = document.getElementById('container');
        container.innerHTML="";
        var camera = new THREE.PerspectiveCamera(angle, aspect, near, far);
        camera.position.set(100, 50, 100);
        var scene = new THREE.Scene();

// var light = new THREE.SpotLight(0xFFFFFF, 1, 0, Math.PI / 2, 1);
// light.position.set(4000, 4000, 1500);
// light.target.position.set (1000, 3800, 1000);
//
// scene.add(light);
        var light = new THREE.AmbientLight(0xFFFFFF); // soft white light
        scene.add(light);

        var earthGeo = new THREE.SphereGeometry(30, 40, 400),
            earthMat = new THREE.MeshPhongMaterial();
// diffuse map
        earthMat.map = new THREE.TextureLoader().load(picPath+i+'.jpg');
        //new THREE.TextureLoader().load(img);

// bump map
        earthMat.bumpMap = new THREE.TextureLoader().load('images/elev_bump_16ka.jpg');
        earthMat.bumpScale = 8;

        var earthMesh = new THREE.Mesh(earthGeo, earthMat);
        earthMesh.position.set(-100, 0, 0);
        earthMesh.rotation.y = 120;

        scene.add(earthMesh);

        camera.lookAt(scene.position);

//renderer
        var renderer = new THREE.WebGLRenderer({antialiasing: true});
        renderer.setSize(WIDTH, HEIGHT);
        renderer.domElement.style.position = 'relative';

        container.appendChild(renderer.domElement);
        renderer.autoClear = false;
        renderer.shadowMap.enabled = true;

// //Atmosphere
// AtmosMat = new THREE.ShaderMaterial({
//     uniforms:{
//         "c": { type: "f", value: 0.3 },
//         "p": { type: "f", value: 5.2},
//         glowColor: { type: "c", value: new THREE.Color(0x00dbdb)},
//         viewVector: { type: "v3", value: camera.position}
//     },
//     vertexShader: document.getElementById('vertexShader').textContent,
//     fragmentShader: document.getElementById('fragmentShader').textContent,
//     side: THREE.BackSide,
//     blending: THREE.AdditiveBlending,
//     transparent: true
// });
//
// Atmos = new THREE.Mesh(earthGeo, AtmosMat);
// Atmos.position = earthMesh.position;
// Atmos.scale.multiplyScalar(1.2);
// scene.add(Atmos);

        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.addEventListener('change', render);


        function animate() {
            controls.update();
            render();
            requestAnimationFrame(animate);
        }

        function render() {
            renderer.clear();
            renderer.render(scene, camera);
        }
        animate();
        // setTimeout(1000);
    }
}
// animate();
