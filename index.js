import Player from "./content/player.js";
import Enemy from "./content/enemy.js";
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

    enemies.forEach((enemy, enemyIndex)  => {
        if (enemy.collideWith(player)) {
        console.log(enemies)
        enemies.splice(enemyIndex, 1);  
        }
    });

    enemies.forEach((enemy, enemyIndex) => {
    player.shells.forEach((shell, shellIndex) => {
            if (enemy.collideWith(shell)) {
                enemies.splice(enemyIndex, 1);
                player.shells.splice(shellIndex, 1);
            }
        });
    player.machineGuns.forEach((bullet, bulletIndex)=> {
        if(enemy.collideWith(bullet)){
            enemy.hp -=2;
            player.machineGuns.splice(bulletIndex, 1)  
            if(enemy.hp <= 0){
                enemies.splice(enemyIndex, 1);
                
            }
        }
    })
    });
    
}

setInterval(game, 1000/60);
