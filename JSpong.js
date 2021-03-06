var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

var coresBarra = ["blue","red","yellow","green"];
var corInvader = ["img/invad1.png","img/invader2.png","img/invader3.png","img/invader4.png"];

var Pop1 = document.getElementById("pop1");
var Pop2 = document.getElementById("pop2");
var Music = document.getElementById("music");


var invader = new Image();
var botao = {};

var refreshIntervalId = setInterval(desenha, 5);
var cronometro = setInterval(tempo,1000);

var barra = {x: 10,	y: canvas.height / 2 - 60, AltBar: 90, largura: 15, dirY: 0, pontos: 10, velocidade: 10};
var invad1 = {x: canvas.width / 2 - 15, y: canvas.height / 2 - 15, altura: 25, largura: 25, dirX: -1, dirY: 1, mod: 0, velocidade: 1};
var invad2 = {x: canvas.width / 2 - 15,	y: canvas.height / 2 - 15, altura: 25, largura: 25, dirX: -1, dirY: 1, mod: 0, velocidade: 1};

ContadorSeg = 0;
ContadorMin = 0;

	

function tempo(){
	if (ContadorSeg == 60){
		ContadorSeg = 0;
		ContadorMin++;
	}
	ContadorSeg++;

};






document.addEventListener("keydown", function(e) {
	botao[e.keyCode] = true;
}, false);

document.addEventListener("keyup", function(e) {
	delete botao[e.keyCode];
}, false);



function MoveBarra() {
	if(38 in botao && barra.y > 0)
		barra.y -= barra.velocidade;

	else if(40 in botao && barra.y + barra.AltBar < canvas.height)
		barra.y += barra.velocidade;
};
			
function MoveInvader() {
	if(invad1.y + invad1.altura >= barra.y && invad1.y <= barra.y + barra.AltBar && invad1.x <= barra.x + barra.largura) {
		Pop1.play();
		invad1.dirX = 1;
		invad1.mod += 0.5;
	}

	else if(invad1.x >= canvas.width){
		Pop2.play()
		invad1.dirX = -1;
	}

	if(invad1.y <= 0){
		Pop2.play()
		invad1.dirY = 1;
	}

	else if(invad1.y + invad1.altura >= canvas.height){
		Pop2.play()
		invad1.dirY =-1;
	}

	invad1.x += (invad1.velocidade + invad1.mod) * invad1.dirX;
	invad1.y += (invad1.velocidade + invad1.mod) * invad1.dirY;

	if(invad1.x < barra.x + barra.largura - 15){
		VerificaColisao("colidiu1");
	}

	if(invad2.y + invad2.altura >= barra.y && invad2.y <= barra.y + barra.AltBar && invad2.x <= barra.x + barra.largura) {
		Pop1.play();
		invad2.dirX = 1;
		invad2.mod += 0.5;
	}

	else if(invad2.x >= canvas.width){
		Pop2.play()
		invad2.dirX = -1;
	}

	if(invad2.y <= 0){
		Pop2.play()
		invad2.dirY = 1;
	}

	else if(invad2.y + invad2.altura >= canvas.height){
		Pop2.play()
		invad2.dirY =-1;
	}
	invad2.x += (invad2.velocidade + invad2.mod) * invad2.dirX;
	invad2.y += (invad2.velocidade + invad2.mod) * invad2.dirY;

	if(invad2.x < barra.x + barra.largura - 15){
		VerificaColisao("colidiu2");
	}


};

function VerificaColisao(colidiu) {
	if(colidiu == "colidiu1"){
		barra.pontos --;
		if (barra.pontos <= 0){
			clearInterval(refreshIntervalId);
			clearInterval(cronometro);
			music.pause();
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.font = "40px Times New Roman";
			ctx.fillStyle = "white";
			ctx.fillText("Você Perdeu!", 280,250);
		}
		barra.y = canvas.height / 2 - barra.AltBar / 2;
		invad1.y = canvas.height / 2 - invad1.altura / 2;
		invad1.x = canvas.width / 2 - invad1.largura / 2;
		invad1.mod = 0;
	}
};




function desenha() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	invader.src = corInvader[Math.floor(Math.random()*corInvader.length)+1];
	music.play()
	music.volume = 0.2;
	MoveBarra();
	MoveInvader();

	
	ctx.drawImage(invader,invad1.x, invad1.y,50,50);

	ctx.fillStyle = coresBarra[Math.floor(Math.random()*coresBarra.length)];
	ctx.fillRect(barra.x, barra.y, barra.largura, barra.AltBar);

	if(ContadorSeg > 20){
		ctx.drawImage(invader,invad2.x, invad2.y,50,50);
	}

	ctx.font = "24px Times New Roman";
	ctx.fillStyle = "white";
	ctx.fillText("Vidas: " + barra.pontos, 50, 20);
	ctx.font = "24px Times New Roman";
	ctx.fillStyle = "white";
	ctx.fillText("Tempo:  "+ContadorMin+":"+ContadorSeg ,500,20);		
};
			
			