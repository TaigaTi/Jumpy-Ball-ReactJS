import { useEffect, useRef } from "react";
import "./Canvas.css"
import Game from "./Game";
import { JSX } from "react/jsx-runtime";

function Canvas(props: JSX.IntrinsicAttributes & { height: number; width: number; }) {
    const canvasRef = useRef(null);
    const height = 400;
    const width = 600;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const draw = (context: CanvasRenderingContext2D) => {
        context.fillStyle = "black";
        context.fillRect(0, 0, width, height);
    }

    useEffect(() => {
        const canvas: HTMLCanvasElement | null = canvasRef.current;
        const context: CanvasRenderingContext2D = canvas.getContext('2d');
        let animationFrameId: number;

        const render = () => {
            draw(context);
            animationFrameId = window.requestAnimationFrame(render);
        }

        render();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        }
    }, [draw]);

    return (
        <>
            <canvas className="canvas" ref={canvasRef} width={width} height={height}>
                Your browser does not support the HTML5 canvas tag.
            </canvas>
            <Game {...props} />
        </>)
}

export default Canvas;