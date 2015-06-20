$(document).ready(function(e) {

    var interval,
        numParticles = new Array(8),
        particles = new Array(),
        context,
        content,
        canvas,
        canvas_width,
        canvas_height,
        is_playing = false;

    content = $('#content');
    
    canvas = $('<canvas />');
    
    canvas_width = content.width;
    canvas_height = content.height;

    canvas.width(canvas_width);
    canvas.height(canvas_height);

    content.append(canvas);
    
    if (canvas[0].getContext) {

        context = canvas[0].getContext('2d');
        
        $.each(numParticles, function (index, value) {
            var p = new Particle();
            particles.push(p);
        });
        
        startAnim();
        
        $(window).blur(function(){
            console.log("BLUR");
            stopAnim();
        });
        
        $(window).focus(function(){
            console.log("FOCUS");
            startAnim();
        });
    }

    function startAnim () {

        var inc = 0;

        // shim layer with setTimeout fallback
        window.requestAnimFrame = (function () {

            return  window.requestAnimationFrame       ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame    ||
                    window.oRequestAnimationFrame      ||
                    window.msRequestAnimationFrame
        })();
        
        is_playing = true;

        inc = 0;
        
        (function animloop () {

            if (is_playing == true) {
                update();
                requestAnimFrame(animloop);
            }
        })();
    }

    function stopAnim () {

        window.requestAnimFrame = null;
        is_playing = false;
    }

    function update() {
            
        context.clearRect(0, 0, canvas_width, canvas_height);
            
        context.beginPath();
        context.fillStyle = 'rgba(34,34,34,1)'; // set canvas background color
        context.fillRect(0, 0, canvas_width, canvas_height);  // now fill the canvas 
        context.closePath();
            
        $.each(particles, function (index, value) {
            particles[index].update();
        });
    }
});

function Particle () {
    
    this.setParams = function () {

        this.diameter = 50 + Math.random() * 30;
        this.targetX = Math.random() * canvas_width;
        this.targetY = Math.random() * canvas_height;
        this.x = Math.random() * canvas_width;
        this.y = Math.random() * canvas_height;
        this.direction;

        if (Math.random() > 0.5) {
            this.direction = 1;
        } else {
            this.direction = -1;
        }

        this.velX = Math.random() * 0.2;
        this.velY = Math.random() * 0.2;
        this.speed = (Math.random() * 0.1) * this.direction;
        this.opacity = 0;
    };
    
    this.update = function () {

        var tx = this.targetX + this.x,
            ty = this.targetY + this.y,
            dist = Math.sqrt(tx * tx + ty * ty),
            rad = Math.atan2(ty, tx),
            angle = rad/Math.PI * 180;
    
        this.velX = (tx/dist) * this.speed,
        this.velY = (ty/dist) * this.speed;
    
        this.x += this.velX;
        this.y += this.velY;
        
        if (this.x < -this.diameter || this.x > canvas_width + this.diameter) {
            this.x = Math.random() * canvas_width;
            this.opacity = 0;
        }
        
        if (this.y < - this.diameter || this.y > canvas_height + this.diameter) {
            this.y = - this.diameter;
            this.opacity = 0;
        }
        
        if (this.opacity < 0.2) {
            this.opacity += 0.0005;
        }
        
        context.shadowBlur = blur;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
    
        context.shadowColor="#ffffff";
        
        context.beginPath();
        context.arc(this.x, this.y, this.diameter, 0, Math.PI * 2);
        context.fillStyle = 'rgba(255,255,255,' + this.opacity + ')';
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = 'rgba(255,255,255,' + this.opacity + ')';
        context.stroke();
    };
    
    this.setParams();
}