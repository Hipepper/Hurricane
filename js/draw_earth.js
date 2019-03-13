var myCanvas = document.getElementById('myCanvas');

function draw_base_map() {
    var count=0;
    var nameSelect = document.getElementById('nameSelect');
    var selectarea = document.getElementById('selectarea');
    var index = nameSelect.selectedIndex;
    var name = nameSelect.options[index].innerHTML;
    var path = 'images/hurricanes/' + name;
    load_pic(path + '.jpg');
    var button = document.getElementById('next');
    if (button == null) {
        button = document.createElement('button');
        button.id = 'next';
        button.innerHTML = "下一帧";
        button.onclick = draw_earth;
        selectarea.appendChild(button);
    }
    var dataPath = nameSelect.options[index].value;

    function get_recordCount(data) {
        recordCount = data['recordCount'];
        var nameSelect = document.getElementById('nameSelect');
        var selectarea = document.getElementById('selectarea');
        var index = nameSelect.selectedIndex;
        var name = nameSelect.options[index].innerHTML;
        var path = 'images/hurricanes/' + name;
        if (count < recordCount) {
            myCanvas.style.display = 'none';
            var WIDTH = window.innerWidth - 30,
                HEIGHT = window.innerHeight - 30;
            var angle = 45,
                aspect = WIDTH / HEIGHT,
                near = 0.1,
                far = 10000;

            var container = document.getElementById('container');
            container.innerHTML = "";
            var camera = new THREE.PerspectiveCamera(angle, aspect, near, far);
            camera.position.set(100, 50, 100);
            var scene = new THREE.Scene();

            var light = new THREE.AmbientLight(0xFFFFFF); // soft white light
            scene.add(light);

            var earthGeo = new THREE.SphereGeometry(30, 40, 400),
                earthMat = new THREE.MeshPhongMaterial();

            earthMat.map = new THREE.TextureLoader().load(path+'-'+count+'.jpg');

            earthMat.bumpMap = new THREE.TextureLoader().load('images/elev_bump_16ka.jpg');
            earthMat.bumpScale = 8;

            var earthMesh = new THREE.Mesh(earthGeo, earthMat);
            earthMesh.position.set(-100, 0, 0);
            earthMesh.rotation.y = 120;

            scene.add(earthMesh);

            camera.lookAt(scene.position);

            var renderer = new THREE.WebGLRenderer({antialiasing: true});
            renderer.setSize(WIDTH, HEIGHT);
            renderer.domElement.style.position = 'relative';

            container.appendChild(renderer.domElement);
            renderer.autoClear = false;
            renderer.shadowMap.enabled = true;

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
            count += 1;
        }
        else {
            alert('已看完全部帧');
            count=0;
            container.innerHTML="";
            myCanvas.style.display = 'inline';
        }
    }


    function draw_earth() {
        var nameSelect = document.getElementById('nameSelect');
        var selectarea = document.getElementById('selectarea');
        var index = nameSelect.selectedIndex;
        var name = nameSelect.options[index].innerHTML;
        var path = 'images/hurricanes/' + name + '-' + count + '.jpg';
        var dataPath = nameSelect.options[index].value;
        var recordCount = 0;
        load_json(dataPath, get_recordCount);

    }
}

//
// function draw_earth() {
//     var container, stats;
//     var camera, scene, renderer, clock;
//     var group, matrial, geometry, mesh, imgtexture;
//     var mouseX = 0, mouseY = 0, count = 0, recordCount;
//     var windowHalfX = window.innerWidth / 2;
//     var windowHalfY = window.innerHeight / 2;
//     var nameSelect = document.getElementById('nameSelect');
//     var index = nameSelect.selectedIndex;
//     var name = nameSelect.options[index].innerHTML;
//     var picPath = 'images/hurricanes/' + name + '-';
//     var dataPath = nameSelect.options[index].value;
//     load_json(dataPath, get_recordCount);
//     init();
//     animate();
//
//     function load_mesh(path) {
//         var loader = new THREE.TextureLoader();
//         loader.load(path, function (texture) {
//             var geometry = new THREE.SphereBufferGeometry(200, 20, 20);
//             var material = new THREE.MeshLambertMaterial({map: texture});
//             var mesh = new THREE.Mesh(geometry, material);
//             group.add(mesh);
//         });
//     }

//     function get_recordCount(data) {
//         recordCount = data['recordCount'];
//     }
//
//     function init() {
//
//         clock = new THREE.Clock();
//         container = document.getElementById('container');
//         container.innerHTML = "";
//         camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
//         camera.position.z = 500;
//         scene = new THREE.Scene();
//         group = new THREE.Group();
//         scene.add(group);
//         geometry = new THREE.SphereBufferGeometry(200, 20, 20);
//         imgtexture = new THREE.TextureLoader(picPath + '0.jpg');
//         material = new THREE.MeshLambertMaterial({map: imgtexture});
//         mesh = new THREE.Mesh(geometry, material);
//         group.add(mesh);
//         load_mesh(picPath + '0.jpg');
//         renderer = new THREE.SoftwareRenderer();
//         renderer.setSize(window.innerWidth, window.innerHeight);
//         container.appendChild(renderer.domElement);
//         // document.addEventListener( 'mousemove', onDocumentMouseMove, false );
//         window.addEventListener('resize', onWindowResize, false);
//     }
//
//     function onWindowResize() {
//         windowHalfX = window.innerWidth / 2;
//         windowHalfY = window.innerHeight / 2;
//         camera.aspect = window.innerWidth / window.innerHeight;
//         camera.updateProjectionMatrix();
//         renderer.setSize(window.innerWidth, window.innerHeight);
//     }
//
//     function onDocumentMouseMove(event) {
//         mouseX = (event.clientX - windowHalfX);
//         mouseY = (event.clientY - windowHalfY);
//     }
//
//     function animate() {
//         render();
//         requestAnimationFrame(animate);
//     }
//
//     function render() {
//         // camera.position.x += ( mouseX - camera.position.x ) * 0.05;
//         // camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
//         // camera.lookAt( scene.position );
//         var delta = clock.getDelta();
//         var time = clock.getElapsedTime() * 10;
//         console.log(delta);
//         console.log(time);
//         if (count < recordCount) {
//             imgtexture = new THREE.TextureLoader(picPath + count + '.jpg');
//             console.log(picPath + count + '.jpg');
//         }
//         count += 1;
//         imgtexture.needsUpdate = true;
//         renderer.render(scene, camera);
//     }
// }
