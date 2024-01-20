import Ball from "./Ball";
import Pipe from "./Pipe";

function Game() {
    window.onload = function() {
        let score = 0;
        var ball: any;
        var height = 400;
        var width = 600;
        var pipe:any = [];
        var gameOver = false;
    
        // Create Canvas Object
        var canvas:any = document.getElementById("canvas");
        var context = canvas.getContext("2d");
    
        // Create Ball and Pipe Objects
        ball = new Ball(context, height);
    
        pipe.push(new Pipe(context,height));
        pipe.push(new Pipe(context,height));
        pipe.push(new Pipe(context,height));
        pipe.push(new Pipe(context,height));
        pipe.push(new Pipe(context,height));
    
        // Add Space Between Pipe Objects
        var xval = 0;
    
        for (let i = 0; i < pipe.length; i++) {
            xval += 200;
            pipe[i].x += xval;
        }
    
        // Draw Initial Board
        ball.draw();
        
        function printscore() {
            context.font = '20px Arial';
            context.fillStyle = 'white';
            context.fillText("Score: " + score, 20, 30);
        }
    
        printscore();
    
        var t = Date.now();
        var ti = Date.now();
        var reset = 5;
    
        // Move Pipes Across Screen
        function movepipe() { 
            var ptimePassed = (Date.now() - t) / 1000;
            t = Date.now();
    
            for (let i = 0; i < pipe.length; i++) {
                pipe[i].clear();
                printscore();
                pipe[i].draw();
            }
    
            // Move Ball on Key Press
            document.onkeydown = function() {
                function moveball() {
                    var timePassed = (Date.now() - ti)/1000;
                    ti = Date.now();           
    
                    ball.clear();
                    for (let i = 0; i < pipe.length; i++) {
                        pipe[i].draw();
                    }
                    ball.draw();
                    printscore();
    
                    ball.gravity(timePassed);
                    ball.onground();
    
                    if (!gameOver)
                    {
                        window.requestAnimationFrame(moveball);
                    }
                }
    
                if (!gameOver) {
                    if (ball.y < 300)
                    {
                        ball.y -= 5;
                        moveball();
                        ball.y -= 10;
                        moveball();
                        ball.y -= 20;
                        moveball();
                    }
                    else
                    {
                        ball.y -= 5;
                        moveball();
                        ball.y -= 5;
                        moveball();
                        ball.y -= 10;
                        moveball();
                        ball.y -= 25;
                        moveball();
                    }
                }
            }
    
            // Move Ball on Screen Press
            document.ontouchstart = function() {
                if (!gameOver) {
                    if (ball.y < 300)
                    {
                        ball.y -= 5;
                        moveball();
                        ball.y -= 10;
                        moveball();
                        ball.y -= 20;
                        moveball();
                    }
                    else
                    {
                        ball.y -= 5;
                        moveball();
                        ball.y -= 5;
                        moveball();
                        ball.y -= 10;
                        moveball();
                        ball.y -= 25;
                        moveball();
                    }
                }
            }  
    
            // Creates New Pipes and Deletes Old Ones
            for (let i = 0; i < pipe.length; i++) {
                pipe[i].x -= (pipe[i].speed * ptimePassed); 
                
                if (pipe[i].x < -40) {
                    pipe.splice(i, 1);
                    pipe.push(new Pipe(context,height));
    
                    reset++;
                    if (reset > 5) {
                        pipe[pipe.length - 1].x +=  360;
                        // reset = 0;
                    }
                    else {
                        pipe[pipe.length - 1].x +=  200;
                    }
                }
            }
    
            if (!gameOver)
            {
            window.requestAnimationFrame(movepipe);
            }
    
            // Check If Ball Touches Ground or Ceiling
            if (ball.y >= height - 20 || ball.y <= 20) {
                gameOver = true;
    
                // Print Game Over Message
                if (gameOver) {
                    context.font = '50px Arial';
                    context.fillStyle = 'red';
                    context.fillText("Game Over", width/3.5, height/2.5);
    
                    context.font = '40px Arial';
                    context.fillStyle = 'red';
                    context.fillText("Score: " + score, width/2.7, height/1.9);
                }
            }
    
            // Check If Ball Hits Pipe
            if (ball.x + 18 >= pipe[0].x && ball.x - 18 <= pipe[0].x) {
                if (ball.y - 18 > pipe[0].top && ball.y + 18 < (height - pipe[0].bottom)) {
                    if (pipe[0].x < ball.x) {
                        if (!pipe[0].checked)
                        {
                            score++;
                            pipe[0].checked = true;
                        }
                    }
                }
                else {
                    gameOver = true;
    
                    // Print Game Over Message
                    if (gameOver) {
                        context.font = '50px Arial';
                        context.fillStyle = 'red';
                        context.fillText("Game Over", width/3.5, height/2.5);
    
                        context.font = '40px Arial';
                        context.fillStyle = 'red';
                        context.fillText("Score: " + score, width/2.7, height/1.9);
                    }
                }
            }
        }
        movepipe();   
    }
    
    function moveball() {
        throw new Error("Function not implemented.");
    }
    
}

export default Game