export default class bullet{

    bullet = [];
    reloadTime = 1;
    

    constructor(canvas, x, y, angle, velocity, bulletColor) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.velocity = velocity;
        this.bulletColor = bulletColor;
    
        this.width = 20;
        this.height = 1;
    }


    draw(ctx){
        this.x += Math.cos(this.angle) * this.velocity;
        this.y += Math.sin(this.angle) * this.velocity;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.bulletColor;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    };

    
}