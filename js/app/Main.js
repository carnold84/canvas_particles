// define dependent files
define(['jquery', 'utilities/Events', 'utilities/Broadcast', 'elements/Particle'], 
    function($, EVENTS, BROADCAST, Particle) {

    'use strict';

    var NUM_PARTICLES = 18,

        headsUp,
        interval,
        particles = [],
        context,
        content,
        canvas,
        canvasWidth,
        canvasHeight,
        isPlaying = false;

    function init () {

        var particle,
            i = 0;

        content = $('#content');
        
        canvasWidth = content.width();
        canvasHeight = content.height();
        
        canvas = $('<canvas width="' + canvasWidth + '" height="' + canvasHeight + '" />');

        content.empty();

        content.append(canvas);

        headsUp = $('<div class="heads-up" />');

        headsUp.addClass('remove');

        headsUp[0].textContent = 'Paused';

        content.append(headsUp);
        
        if (canvas[0].getContext) {

            context = canvas[0].getContext('2d');

            for (i; i < NUM_PARTICLES; i++) {

                particle = Particle.create(context, canvasWidth, canvasHeight);

                particles.push(particle);
            }
            
            startAnim();
            
            $(window).blur(function(){
                console.log("BLUR");
                headsUp.removeClass('remove');
                stopAnim();
            });
            
            $(window).focus(function(){
                console.log("FOCUS");
                headsUp.addClass('remove');
                startAnim();
            });
        }
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
        
        isPlaying = true;

        inc = 0;
        
        (function animloop () {

            if (isPlaying == true) {
                update();
                requestAnimFrame(animloop);
            }
        })();
    }

    function stopAnim () {

        window.requestAnimFrame = null;
        isPlaying = false;
    }

    function update() {

        var i = 0;
            
        context.clearRect(0, 0, canvasWidth, canvasHeight);
            
        context.beginPath();
        context.fillStyle = 'rgba(22,22,22,1)'; // set canvas background color
        context.fillRect(0, 0, canvasWidth, canvasHeight);  // now fill the canvas 
        context.closePath();

        for (i; i < NUM_PARTICLES; i++) {

            particles[i].update();
        }
    }

    return {
        
        init : init
    };

});