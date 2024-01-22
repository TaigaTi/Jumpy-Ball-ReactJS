import { useEffect, useRef, useState } from "react";
import Ball from "./Ball";
import Pipe from "./Pipe";
import "./Game.css";

function Game() {
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const animationFrameRef = useRef(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const height = 400;
    const width = 600;

    let ball: Ball;
        let pipe: Pipe[] = [];
        let reset: number = 5;
        let pipeSpace: number = 0;


    useEffect(() => {
        // Create Canvas Object
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        // Get The Current Time
        let t = Date.now();
        let ti = Date.now();

        // Initial Setup
        function initialSetup() {
            // Create Ball Object
            ball = new Ball(context, height);

            // Create Pipe Objects
            for (let i = 0; i < 5; i++) {
                pipe.push(new Pipe(context, height));
            }

            // Add Space Between Pipe Objects
            for (let i = 0; i < pipe.length; i++) {
                pipeSpace += 200;
                pipe[i].x += pipeSpace;
            }

            // Draw Initial Board
            ball.draw();
            printscore();
        }

        // Print Score
        function printscore() {
            context.font = '20px Arial';
            context.fillStyle = 'white';
            context.fillText("Score: " + score, 20, 30);
        }

        // Print Game Over Message
        function renderGameOver() {
            context.font = '50px Arial';
            context.fillStyle = 'red';
            context.fillText("Game Over", width / 3.5, height / 2.5);

            context.font = '40px Arial';
            context.fillStyle = 'red';
            context.fillText("Score: " + score, width / 2.7, height / 1.9);
        }

        // Move Ball
        function moveBall() {
            let timePassed = (Date.now() - ti) / 1000;
            ti = Date.now();

            ball.clear();
            for (let i = 0; i < pipe.length; i++) {
                pipe[i].draw();
            }
            ball.draw();
            printscore();

            ball.gravity(timePassed);
            ball.onground();

            if (!gameOver) {
                animationFrameRef.current = requestAnimationFrame(moveBall);
            }
        }

        // Move Ball on Key Press
        function handleKeyPress() {
            if (!gameOver) {
                ball.y -= 35;
            }
        }

        // Move Ball on Screen Press
        function handleTouchStart() {
            if (!gameOver) {
                ball.y -= 35;
            }
        }

        // Handle Ball Collision
        function handleCollision() {
            // Check If Ball Touches Ground or Ceiling
            if (ball.y >= height - 20 || ball.y <= 20) {
                setGameOver((prevGameOver) => {
                    // Print Game Over Message
                    if (!prevGameOver) {
                        renderGameOver();
                    }
                    return true;
                });
            }

            // Check If Ball Hits Pipe
            if (ball.x + 18 >= pipe[0].x && ball.x - 18 <= pipe[0].x) {
                if (ball.y - 18 > pipe[0].top && ball.y + 18 < (height - pipe[0].bottom)) {
                    if (pipe[0].x < ball.x) {
                        if (!pipe[0].checked) {
                            setScore((prevScore) => prevScore + 1);
                            pipe[0].checked = true;
                        }
                    }
                }
                else {
                    setGameOver((prevGameOver) => {
                        // Print Game Over Message
                        if (!prevGameOver) {
                            renderGameOver();
                        }
                        return true;
                    });
                }
            }
        }

        // Move Pipes Across Screen
        function movePipe() {
            var ptimePassed = (Date.now() - t) / 1000;
            t = Date.now();

            for (let i = 0; i < pipe.length; i++) {
                pipe[i].clear();
                printscore();
                pipe[i].draw();
            }

            // Creates New Pipes and Deletes Old Ones
            for (let i = 0; i < pipe.length; i++) {
                pipe[i].x -= (pipe[i].speed * ptimePassed);

                if (pipe[i].x < -40) {
                    pipe.splice(i, 1);
                    pipe.push(new Pipe(context, height));
                    reset++;

                    if (reset > 5) {
                        pipe[pipe.length - 1].x += 360;
                    }
                    else {
                        pipe[pipe.length - 1].x += 200;
                    }
                }
            }

            handleCollision();

            if (!gameOver) {
                animationFrameRef.current = requestAnimationFrame(movePipe);
            }
        }

        initialSetup();


        document.addEventListener('keypress', handleKeyPress);
        document.addEventListener('touchstart', handleTouchStart);
        if (!gameOver) {
            movePipe();
            moveBall();
        }

        // Cleanup Function
        return () => {
            cancelAnimationFrame(animationFrameRef.current);
            document.removeEventListener('keypress', handleKeyPress);
            document.removeEventListener('touchstart', handleTouchStart);
        }

    }, [score, gameOver]);

    return (
        <>
            <div className="container">
                <canvas className="canvas" ref={canvasRef} width={width} height={height}>
                    Your browser does not support the HTML5 canvas tag.
                </canvas>
            </div>
        </>
    );
}

export default Game;