function draw_year_pic() {
    var yearSelect = document.getElementById('yearSelect');
    var index = yearSelect.selectedIndex;
    var data = yearSelect.options[index].value;
    // console.log(data);
    var myCanvas=document.getElementById('myCanvas');
    var path="images/pics_of_year/" + (index+1851) + ".jpg"
    load_pic(path);
    show_infos(data,index);
}

function show_infos(data,index) {
    var container=document.getElementById('drag');
    var del=document.getElementById('infoShow');
    if(del){
        del.parentNode.removeChild(del);
    }
    var infoShow=document.createElement('table');
    infoShow.id='infoShow';
    infoShow.margin='auto';
    infoShow.style.width='400px';
    infoShow.style.backgroundColor='white';
    container.appendChild(infoShow);
    var tr=infoShow.insertRow(0);
    var td0=tr.insertCell(-1),
        td1=tr.insertCell(-1),
        td2=tr.insertCell(-1),
        td3=tr.insertCell(-1),
        td4=tr.insertCell(-1),
        td5=tr.insertCell(-1);
    td0.innerHTML='编号';
    td1.innerHTML='名称';
    td2.innerHTML='历时';
    td3.innerHTML='开始位置';
    td4.innerHTML='结束位置';
    td5.innerHTML='最大风速(kt)';
    var data=data.split(',');
    var num=data.length;
    for(var i=0;i<num;i++){
        load_json(data[i],add_row);
    }
}

function add_row(data) {
    var infoShow=document.getElementById('infoShow');

    var name=data['name'],
        count=data['recordCount']-1,
        timeStart=data['Date'][0].substr(4),
        timeEnd=data['Date'][count].substr(4),
        posStart=data['Latitude'][0]+'N,'+ (-data['Longitude'][0])+'W',
        posEnd=data['Latitude'][count]+'N,'+ (-data['Longitude'][count])+'W',
        maxSpeed=Math.max.apply(null, data['Maximum_sustained_wind']);
    if(name=='UNNAMED'){
        name='未命名';
    }
    var num=infoShow.rows.length;
    var tr=infoShow.insertRow(num);
    // while(tr==)
    var td0=tr.insertCell(-1),
        td1=tr.insertCell(-1),
        td2=tr.insertCell(-1),
        td3=tr.insertCell(-1),
        td4=tr.insertCell(-1),
        td5=tr.insertCell(-1);
    td0.innerHTML=num;
    td1.innerHTML=name;
    td2.innerHTML=timeStart+'-'+timeEnd;
    td3.innerHTML=posStart;
    td4.innerHTML=posEnd;
    td5.innerHTML=maxSpeed;
}

function load_json(data,callback){
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", data, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(JSON.parse(rawFile.responseText));
        }
    }
    rawFile.send(null);
}

function load_pic(path) {
    var pic = new Image();
    pic.src = path;
    if (pic.complete) {
        drawPic(pic);
    } else {
        pic.onload = function () {
            drawPic(pic);
        };
        pic.onerror = function () {
            window.alert('图片加载失败，请重试');
        }
    }
}

function drawPic(pic) {
    // window.innerHeight
    var width,height;
    var myCanvas = document.getElementById("myCanvas");
    myCanvas.width=window.innerWidth;
    myCanvas.height=window.innerHeight-10;
    var picRatio = pic.width / pic.height;
    var canRatio=myCanvas.width/myCanvas.height;
    if (picRatio > canRatio) {
         width = myCanvas.width;
         height = myCanvas.width/ picRatio;
     } else if (picRatio < canRatio) {
         height = myCanvas.height;
         width = myCanvas.height * picRatio;
     } else {
         width=myCanvas.width;
         height=myCanvas.height;
     }
     var xpos=(myCanvas.width-width)/2;
     var ypos=(myCanvas.height-height)/2;
    var myctx = myCanvas.getContext("2d");
    myctx.drawImage(pic,x=xpos,y=ypos,width=width,height=height);
}

