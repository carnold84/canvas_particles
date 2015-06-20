// define dependent files
define(['jquery', 'utilities/Events', 'utilities/Broadcast'], 
    function($, EVENTS, BROADCAST) {

    'use strict';
    
    function Particle (context, canvas_width, canvas_height) {

        this.context = context;
        this.canvas_width = canvas_width;
        this.canvas_height = canvas_height;
        this.diameter = 50 + Math.random() * 30;
        this.targetX = Math.random() * this.canvas_width;
        this.targetY = Math.random() * this.canvas_height;
        this.x = Math.random() * this.canvas_width;
        this.y = Math.random() * this.canvas_height;
        this.direction;

        if (Math.random() > 0.5) {
            this.direction = 1;
        } else {
            this.direction = -1;
        }

        this.velX = Math.random() * 0.2;
        this.velY = Math.random() * 0.2;
        this.maxOpacity = Math.random() * 0.2;
        this.speed = (Math.random() * 0.2) * this.direction;
        this.opacity = 0;
    }
    
    Particle.prototype.update = function () {

        var tx = this.targetX + this.x,
            ty = this.targetY + this.y,
            dist = Math.sqrt(tx * tx + ty * ty),
            rad = Math.atan2(ty, tx),
            angle = rad/Math.PI * 180;
    
        this.velX = (tx/dist) * this.speed;
        this.velY = (ty/dist) * this.speed;
    
        this.x += this.velX;
        this.y += this.velY;
        
        if (this.x < -this.diameter || this.x > this.canvas_width + this.diameter) {
            this.x = Math.random() * this.canvas_width;
            this.opacity = 0;
        }
        
        if (this.y < - this.diameter || this.y > this.canvas_height + this.diameter) {
            this.y = - this.diameter;
            this.opacity = 0;
        }
        
        if (this.opacity < this.maxOpacity) {
            this.opacity += 0.0005;
        }
        
        this.context.shadowBlur = blur;
        this.context.shadowOffsetX = 0;
        this.context.shadowOffsetY = 0;
    
        this.context.shadowColor = '#ffffff';
        
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.diameter, 0, Math.PI * 2);
        this.context.fillStyle = 'rgba(255,255,255,' + this.opacity + ')';
        this.context.fill();
        this.context.lineWidth = 1;
        this.context.strokeStyle = 'rgba(255,255,255,' + this.opacity + ')';
        this.context.stroke();
    };

    return {
        
        create : function (context, canvas_width, canvas_height) {
            return new Particle(context, canvas_width, canvas_height);
        }
    };

});