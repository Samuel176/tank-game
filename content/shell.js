
export default class shell{

    shells = [];
    reloadTime = 1;
    

    constructor(canvas, x, y, angle, velocity, shellColor) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.velocity = velocity;
        this.shellColor = shellColor;
    
        this.width = 10;
        this.height = 5;
    }


    draw(ctx){
        this.x += Math.cos(this.angle) * this.velocity;
        this.y += Math.sin(this.angle) * this.velocity;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.shellColor;

    
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    
        ctx.restore();
    };

    
}