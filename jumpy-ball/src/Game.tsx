import { useEffect, useRef, useState } from "react";
import Ball from "./Ball";
import Pipe from "./Pipe";

function Game(props) {
    const [gameOver, setGameOver] = useState(false);
    const animationFrameRef = useRef(0);
    let isGameOver = false;
    let score = 0;

    const context = props.context;
    const height = props.height;
    const width = props.width;

    const ball: Ball = new Ball(context, height);
    const pipes: Pipe[] = [];

    let reset: number = 5;
    let t = Date.now();
    let ti = Date.now();

    // Create Pipe Objects
    for (let i = 0; i < 5; i++) {
        pipes.push(new Pipe(context, height));
    }

    //  Add Space Between Pipe Objects
    for (let i = 0; i < pipes.length; i++) {
        pipes[i].x += i * 200;
    }

    // Print Score
    function printscore(context: CanvasRenderingContext2D) {
        context.font = '20px Arial';
        context.fillStyle = 'white';
        context.fillText("Score: " + score, 20, 30);
    }

    // Print Game Over Message
    function renderGameOver(context: CanvasRenderingContext2D) {
        context.font = '50px Arial';
        context.fillStyle = 'red';
        context.fillText("Game Over", width / 3.5, height / 2.5);

        context.font = '40px Arial';
        context.fillStyle = 'red';
        context.fillText("Score: " + score, width / 2.7, height / 1.9);
    }

    // Move Ball
    function moveBall() {
        const timePassed = (Date.now() - ti) / 1000;
        ti = Date.now();

        ball.clear();
        for (let i = 0; i < pipes.length; i++) {
            pipes[i].draw();
        }
        ball.draw();
        printscore(context);

        ball.gravity(timePassed);
        ball.onground();

        if (!gameOver) {
            window.requestAnimationFrame(moveBall);
        }
    }

    // Move Ball on Key Press
    function handleKeyPress() {
        if (!gameOver && !isGameOver) {
            ball.y -= 35;
        }
    }

    // Move Ball on Screen Press
    function handleTouchStart() {
        if (!gameOver && !isGameOver) {
            ball.y -= 35;
            ball.speed = 1000
        }
    }

    // Handle Ball Collision
    function handleCollision() {
        // Check If Ball Touches Ground or Ceiling
        if (ball.y >= height - 20 || ball.y <= 20) {
            renderGameOver(context);
            isGameOver = true;
        }

        // Check If Ball Hits Pipe
        if (ball.x + 18 >= pipes[0].x && ball.x - 18 <= pipes[0].x) {
            if (ball.y - 18 > pipes[0].top && ball.y + 18 < (height - pipes[0].bottom)) {
                if (pipes[0].x < ball.x) {
                    if (!pipes[0].checked) {
                        // setScore((prevScore) => prevScore + 1);
                        score += 1;
                        pipes[0].checked = true;
                    }
                }
            }
            else {
                renderGameOver(context);
                isGameOver = true;
            }
        }
    }

    // Move Pipes Across Screen
    function movePipe() {
        const ptimePassed = (Date.now() - t) / 1000;
        t = Date.now();

        for (let i = 0; i < pipes.length; i++) {
            pipes[i].clear();
            pipes[i].draw();
        }

        // Creates New Pipes and Deletes Old Ones
        for (let i = 0; i < pipes.length; i++) {
            pipes[i].x -= (pipes[i].speed * ptimePassed);

            if (pipes[i].x < -40) {
                pipes.splice(i, 1);
                pipes.push(new Pipe(context, height));
                reset++;

                if (reset > 5) {
                    pipes[pipes.length - 1].x += 360;
                }
                else {
                    pipes[pipes.length - 1].x += 200;
                }
            }
        }

        handleCollision();

        if (!gameOver) {
            animationFrameRef.current = requestAnimationFrame(movePipe);
        }

    }

    useEffect(() => {
        if (context) {
            document.addEventListener('keypress', handleKeyPress);
            document.addEventListener('touchstart', handleTouchStart);
            if (!gameOver && !isGameOver) {
                moveBall();
                movePipe();
            } 
            if (isGameOver) {
                renderGameOver(context);
            }
        }

        // Cleanup Function
        return () => {
            cancelAnimationFrame(animationFrameRef.current);
            document.removeEventListener('keypress', handleKeyPress);
            document.removeEventListener('touchstart', handleTouchStart);
           
            if (isGameOver) {
                renderGameOver(context);
            }
        }

    }, [ gameOver ]);

    return <></>;
}

export default Game;