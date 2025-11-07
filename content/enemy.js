
export default class enemy{

    constructor(canvas, player){
        this.canvas = canvas;
        this.player = player
        
        this.width = 30;
        this.height = 30;

        this.speed = 1;
        
        this.image = new Image();
        this.image.src = "img/test.png";

        const edgeSpawn = Math.floor(Math.random() * 4);
        switch (edgeSpawn){
            case 0:
                this.x = Math.random() * canvas.width;
                this.y = -this.height;
                break;

            case 1:
                this.x = canvas.width + this.width;
                this.y = Math.random() * canvas.height;
                break;

            case 2:
                this.x = Math.random() * canvas.width;
                this.y = canvas.height + this.height;
                break;

            case 3: 
                this.x = -this.width;
                this.y = Math.random() * canvas.height;
                break;
        }
    }

     update() {
        const targetX = this.player.x;
        const targetY = this.player.y;
        const dx = targetX - (this.x + this.width / 2);
        const dy = targetY - (this.y + this.height / 2);
        const distance = Math.hypot(dx, dy);

        if (distance > 0) {
            const moveX = (dx / distance) * this.speed;
            const moveY = (dy / distance) * this.speed;

            this.x += moveX;
            this.y += moveY;
        }
        this.speed += 0.001;
    }

    draw(ctx) {
        if (!this.image.complete) {
            ctx.fillStyle = "red";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        } else {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }

    move(xVelocity, yVelocity){
        this.x += xVelocity;
        this.y += yVelocity;
    }

      
    
    collideWith(sprite){
        if(this.x + this.width > sprite.x 
            && this.x < sprite.x + sprite.width 
            && this.y + this.height > sprite.y 
            && this.y < sprite.y + sprite.height){
            return true;
        }else{
            return false
        }
    }
}