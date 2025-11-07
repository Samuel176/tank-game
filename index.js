import Player from "./content/player.js";
import Enemy from "./content/enemy.js";
import Shell from "./content/shell.js";
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const velocity = 3;
canvas.width = 1000;
canvas.height = 500;



const player = new Player(canvas, velocity)
const enemy = new Enemy(canvas, player)

const enemies = [];

function spawnEnemy() {
    enemies.push(new Enemy(canvas, player));
}
setInterval(spawnEnemy, 2000);

function game(){
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx)
    enemies.forEach(enemy => {
        enemy.update();
        enemy.draw(ctx);
    });
    
}

setInterval(game, 1000/60);
