var block_width; //水平分割线的长度+图片的宽度/3
var block_height;//垂直分割线的长度+图片的高度/3
var span_width;  //水平分割线的长度
var span_height; //垂直分割线的长度
var pic_width;	 //图片的宽度/3
var pic_height;	 //图片的高度/3
var pic_name = "r_test01"; //图片的名字
var pic_array = new Array();
var ans_array = new Array();
var change_array = new Array();
var ctx_array = new Array();
var beauty;
var myctx;
var steps_sum = 0;
function drawBeauty(beauty){
	myctx = mycv.getContext("2d");	
	pic_width = beauty.width * 0.3;
	pic_height = beauty.height * 0.3;
	span_width  = beauty.width * 0.01;
	//span_height = beauty.height * 0.01;
	span_height = span_width;
	block_width = pic_width + span_width;
	block_height = pic_height + span_height;
	//设置画布的高和宽
	canvas.height = 3*block_height + span_height;
    canvas.width = 3*block_width + span_width;
	
	ans_array[0] = put(0,0);
	ans_array[1] = put(block_width,0);
	ans_array[2] = put(block_width*2,0);
	ans_array[3] = put(0,block_height);
	ans_array[4] = put(block_width,block_height);
	ans_array[5] = put(block_width*2,block_height);
	ans_array[6] = put(0,block_height*2);
	ans_array[7] = put(block_width,block_height*2);
	ans_array[8] = put(block_width*2,block_height*2);
	
	pic_array[0] = put(0,0);
	pic_array[2] = put(block_width,0);
	pic_array[1] = put(block_width*2,0);
	pic_array[3] = put(0,block_height);
	pic_array[8] = put(block_width,block_height);
	pic_array[6] = put(block_width*2,block_height);
	pic_array[5] = put(0,block_height*2);
	pic_array[7] = put(block_width,block_height*2);
	pic_array[4] = put(block_width*2,block_height*2);
	var x1 = span_width;
	var x2 = x1+block_width;
	var x3 = x2+block_width;
	var y = span_height;
	ctx_array[0] = put(x1,y);
	ctx_array[1] = put(x2,y);
	ctx_array[2] = put(x3,y);
	y += block_height;
	ctx_array[3] = put(x1,y);
	ctx_array[4] = put(x2,y);
	ctx_array[5] = put(x3,y);
	y += block_height;
	ctx_array[6] = put(x1,y);
	ctx_array[7] = put(x2,y);
	ctx_array[8] = put(x3,y);
	drawPic();	
}
function drawLine(k){
	myctx.lineWidth = 5; 
	myctx.strokeStyle = 'rgba(96,203,63,1)'; 
	var start_x = ctx_array[k].x;
	var start_y = ctx_array[k].y;
	var length_x = pic_width;
	var length_y = pic_height;
	myctx.beginPath();
	myctx.moveTo(start_x,start_y);   
	myctx.lineTo(start_x,start_y+length_y);
	myctx.moveTo(start_x,start_y);   
	myctx.lineTo(start_x+length_x,start_y);
	start_x = start_x+length_x;
	start_y = start_y+length_y;
	myctx.moveTo(start_x,start_y);   
	myctx.lineTo(start_x-length_x,start_y);
	myctx.moveTo(start_x,start_y);   
	myctx.lineTo(start_x,start_y-length_y);
	myctx.stroke();   
}

function change(x,y){	
	var tmp_x = pic_array[x].x;
	var tmp_y = pic_array[x].y;
	pic_array[x].x = pic_array[y].x;
	pic_array[x].y = pic_array[y].y;
	pic_array[y].x = tmp_x;
	pic_array[y].y = tmp_y;
	drawPic();
}
function drawPic(){
	//图像的x,y,宽,高，目标地址的x,y,宽,高	
	//把9张切图画出来
	//上面三个	
	myctx.drawImage(beauty,pic_array[0].x,pic_array[0].y,pic_width,pic_height, ctx_array[0].x,ctx_array[0].y,pic_width,pic_height);
	myctx.drawImage(beauty,pic_array[1].x,pic_array[1].y,pic_width,pic_height, ctx_array[1].x,ctx_array[1].y,pic_width,pic_height);
	myctx.drawImage(beauty,pic_array[2].x,pic_array[2].y,pic_width,pic_height, ctx_array[2].x,ctx_array[2].y,pic_width,pic_height);
	//中间三个
	myctx.drawImage(beauty,pic_array[3].x,pic_array[3].y,pic_width,pic_height, ctx_array[3].x,ctx_array[3].y,pic_width,pic_height);
	myctx.drawImage(beauty,pic_array[4].x,pic_array[4].y,pic_width,pic_height, ctx_array[4].x,ctx_array[4].y,pic_width,pic_height);
	myctx.drawImage(beauty,pic_array[5].x,pic_array[5].y,pic_width,pic_height, ctx_array[5].x,ctx_array[5].y,pic_width,pic_height);
	//下面三个
	myctx.drawImage(beauty,pic_array[6].x,pic_array[6].y,pic_width,pic_height, ctx_array[6].x,ctx_array[6].y,pic_width,pic_height);
	myctx.drawImage(beauty,pic_array[7].x,pic_array[7].y,pic_width,pic_height, ctx_array[7].x,ctx_array[7].y,pic_width,pic_height);
	myctx.drawImage(beauty,pic_array[8].x,pic_array[8].y,pic_width,pic_height, ctx_array[8].x,ctx_array[8].y,pic_width,pic_height);	
}
function load(){
	mycv = document.getElementById("canvas");
	beauty = new Image();  
	beauty.src = "pic/"+pic_name+".jpg";
	change_array[0] = 0; //表示个数
	if(beauty.complete){
		drawBeauty(beauty);
	}else{
		beauty.onload = function(){
			drawBeauty(beauty);
		};
		beauty.onerror = function(){
			window.alert('图片加载失败，请重试');
		};
	};	
    //event binding	
    mycv.addEventListener('click', function(e){		
		p = getEventPosition(e);		
		var number = whichPic(p.x,p.y);				
		if (number >= 0)
			//如果点击有效
			if (change_array[0] == 1){
				//如果 点击的图片是相邻的
				if (near(number,change_array[1])){
					change_array[0] = 0;
					change_array[2] = number;
					steps_sum += 1;
					myctx.clearRect(0, 0,canvas.width,canvas.height);//全部擦除
					change(change_array[1],change_array[2]);	
					if (finish()){
						//游戏结束
						alert("游戏结束用了"+steps_sum+"步");
					}
				}
				//再次点击相同的块，取消选中
				if (change_array[1] == number){
					change_array[0] = 0;
					myctx.clearRect(0, 0,canvas.width,canvas.height);//全部擦除
					drawPic();	
				}
			}else{
				change_array[0] = 1;
				change_array[1] = number;
				drawLine(number);
			}			
	}, false);
}
function finish(){
	//完成拼图，返回true	
	for (var i = 0; i < 9; i++)
		if (pic_array[i].x != ans_array[i].x || pic_array[i].y != ans_array[i].y) return false;
	return true;
}

function near(x,y){
	//判断是否相邻，true为相邻
	var tmp;
	if (x < y) {tmp = x; x = y; y = tmp;}
	if (x - y == 3) return true;
	if (x - y == 1 && x % 3 != 0) return true;	
	return false;
}
function put(tmp_x, tmp_y){
	return {x: tmp_x, y: tmp_y};
}
// 鼠标点击事件处理
function getEventPosition(ev){
	var tmp_x, tmp_y;
	if (ev.layerX || ev.layerX == 0) {
		tmp_x = ev.layerX;
		tmp_y = ev.layerY;
	}else if (ev.offsetX || ev.offsetX == 0) { // Opera
		tmp_x = ev.offsetX;
		tmp_y = ev.offsetY;
	}	
	return {x: tmp_x, y: tmp_y};
}
function whichPic(x,y){	
	if (0 <= x && x <= pic_width && 0 <=y && y <= pic_height) return 0;
	if (block_width <= x && x <= block_width+pic_width && 0 <=y && y <= pic_height) return 1;
	if (block_width*2 <= x && x <= block_width*2+pic_width && 0 <=y && y <= pic_height) return 2;
	
	if (0 <= x && x <= pic_width && block_height <=y && y <= block_height+pic_height) return 3;
	if (block_width <= x && x <= block_width+pic_width && block_height <=y && y <= block_height+pic_height) return 4;
	if (block_width*2 <= x && x <= block_width*2+pic_width && block_height <=y && y <= block_height+pic_height) return 5;
	
	if (0 <= x && x <= pic_width && block_height*2 <=y && y <= block_height*2+pic_height) return 6;
	if (block_width <= x && x <= block_width+pic_width && block_height*2 <=y && y <= block_height*2+pic_height) return 7;
	if (block_width*2 <= x && x <= block_width*2+pic_width && block_height*2 <=y && y <= block_height*2+pic_height) return 8;
	return -1;
}
if (document.all) {
	window.attachEvent('onload', load);  
}else {  
	window.addEventListener('load', load, false);
}