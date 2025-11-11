import shell from './shell.js'
import bullet from './bullet.js'
export default class player{

    rightPressed = false;
    leftPresseed = false;
    upPressed = false;
    downPressed = false;

    shootPressed = false;
    machineGunPressed = false;
    turretRight = false;
    turretLeft = false;

    

    constructor(canvas, velocity){
        this.canvas = canvas;
        this.velocity = velocity
        this.x = this.canvas.width/2;
        this.y = this.canvas.height/2;
        this.turn = 0.05;
        this.angle = 0;
        this.width = 80;
        this.height = 50;
        this.image = new Image();
        this.image.src = "img/tank-frame.png";


        this.turret = new Image()
        this.turret.src = "img/turret.png";
        this.turretAngle = 0;
        this.turretWidth = 50;
        this.turretHeight = 10;

        this.shells = [];
        this.lastShotTime = 0;
        this.shootCooldown = 900; // milliseconds

        this.machineGuns = [];
        this.reload = 0;
        this.mGLastShotTime = 0;
        this.mGShootCooldown = 100; // milliseconds


        document.addEventListener('keydown',this.keydown);
        document.addEventListener('keyup',this.keyup);
    }

    draw(ctx){
        // base
        ctx.save(); 
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        // Draw the tank image centered
        ctx.drawImage(
            this.image,
            -this.width / 2,  
            -this.height / 2, 
            this.width,
            this.height
        );
        ctx.restore();
        
    // turret
        ctx.save(); 
        ctx.translate(this.x, this.y);
        ctx.rotate(this.turretAngle);
        ctx.drawImage(
            this.turret, 0,
            -this.turretHeight / 2,
            this.turretWidth,
            this.turretHeight
        )

        ctx.restore();
     
        this.move();
        this.turretMove();
        this.collidWithWalls()
        this.shells.forEach((shell, index) => {
            shell.draw(ctx);
            if (
                shell.x < 0 || shell.x > this.canvas.width ||
                shell.y < 0 || shell.y > this.canvas.height
            ) {
                this.shells.splice(index, 1);
            }
        });
        this.machineGuns.forEach((bullet, index) => {
            bullet.draw(ctx);
            
            
            if (
                bullet.x < 1 || bullet.x > this.canvas.width ||
                bullet.y < 1 || bullet.y > this.canvas.height
            ) {
                this.machineGuns.splice(index, 1);
            }
        });
        
        // Firing logic
        const now = Date.now();
        if (this.shootPressed && now - this.lastShotTime > this.shootCooldown) {
            const barrelLength = this.turretWidth;
            const bulletX = this.x + Math.cos(this.turretAngle) * barrelLength;
            const bulletY = this.y + Math.sin(this.turretAngle) * barrelLength;
        
            this.shells.push(new shell(this.canvas, bulletX, bulletY, this.turretAngle, 10, "black"));
        
            this.lastShotTime = now;
        }
        if (this.machineGunPressed && now - this.mGLastShotTime > this.mGShootCooldown) {
            const barrelLength = this.turretWidth - 10;
            const bulletX = this.x + Math.cos(this.angle) * barrelLength;
            const bulletY = this.y + Math.sin(this.angle) * barrelLength;
            
            
            this.machineGuns.push(new bullet(this.canvas, bulletX, bulletY , this.angle + acc(), 10, "black"));
        
            this.mGLastShotTime = now;
            this.reload += 1;
            
            if(this.reload == 75){
                let timer = 0;
                console.log("100")
                this.mGShootCooldown = 100000;
                this.reload = 0;

                let interval = setInterval(() => {
                        timer += 1;
                        if (timer === 5) {
                            this.mGShootCooldown = 100;
                            console.log("timer done");
                            clearInterval(interval); 
                        }
                    }, 1000);
                
            }
        }
        function acc(){ 
            let x = Math.floor(Math.random()*8)
            if(x == 1){
               
                return -0.05;
                
            }
            if(x == 2){
                
                return - 0.01;
                
            }
            if(x == 3){
              
                return +0.05;
                
            }
            if(x == 4){
           
                return -0.07;
                
            }
            if(x == 5){
         
                return + 0.01;
                
            }
            if(x == 6){
          
                return -0.01;
                
            }
            if(x == 7){
            
                return +0.07;
                
            }
        }

    }


    move(){
        if (this.rightPressed){
            this.angle += this.turn;
            this.turretAngle += this.turn;
        }if(this.leftPressed){
            this.angle += -this.turn;
            this.turretAngle += -this.turn;
        }
        if(this.upPressed){
            this.x += Math.cos(this.angle) * this.velocity;
            this.y += Math.sin(this.angle) * this.velocity;
        }
        if(this.downPressed){
            this.x -= Math.cos(this.angle) * this.velocity;
            this.y -= Math.sin(this.angle) * this.velocity;
        }

    }

    collidWithWalls(){
        if(this.x <= 0){
            this.x = 0;
        }
        if (this.x > this.canvas.width - this.width + 50){
            this.x = this.canvas.width - this.width + 50;
        }
        if(this.y <= 0){
            this.y = 0;
        }
        if(this.y > this.canvas.height - this.height + 50){
            this.y = this.canvas.height - this.height + 50;
        }
        
    }

    turretMove(){
        if (this.turretRight){
            this.turretAngle += this.turn;
            
        }if(this.turretLeft){
            this.turretAngle += -this.turn;
        }

    }

    keydown = event => {
        if(event.code == "ArrowRight"){
            this.rightPressed = true;  
        }
        if(event.code == "ArrowLeft"){
            this.leftPressed = true;
        }
        if(event.code == "ArrowUp"){
            this.upPressed = true;
        }
        if(event.code == "ArrowDown"){
            this.downPressed = true;
        }
        if(event.code == "KeyD"){
            this.turretRight = true;
            
        }
        if(event.code == "KeyA"){
            this.turretLeft = true;
        }
        if(event.code == "Space"){
            this.shootPressed = true;
            console.log("fire!")
        }
        if(event.code == "KeyR"){
            this.machineGunPressed = true;
            this.mGShootCooldown -= 0.4;
            
        }
        
    }
    keyup = event => {
        if(event.code == "ArrowRight"){
            this.rightPressed = false;
        }
        if(event.code == "ArrowLeft"){
            this.leftPressed = false;
        }
        if(event.code == "ArrowUp"){
            this.upPressed = false;
        }
        if(event.code == "ArrowDown"){
            this.downPressed = false;
        }
        if(event.code == "KeyD"){
            this.turretRight = false;
        }
        if(event.code == "KeyA"){
            this.turretLeft = false;
        }
        if(event.code == "Space"){
            this.shootPressed = false;
        }
        if(event.code == "KeyR"){
            this.machineGunPressed = false;
            this.mGShootCooldown = 100;
            
        }
        
    }
}