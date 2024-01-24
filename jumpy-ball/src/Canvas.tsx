import { useEffect, useRef, useState } from "react";
import "./Canvas.css";
import Game from "./Game";

function Canvas(props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const [contextReady, setContextReady] = useState(false);

    const height = 400;
    const width = 600;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const draw = (context: CanvasRenderingContext2D | null) => {
        if (context) {
            context.fillStyle = "black";
            context.fillRect(0, 0, width, height);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        contextRef.current = canvas?.getContext("2d");

        let animationFrameId: number;

        const render = () => {
            draw(contextRef.current);
            animationFrameId = window.requestAnimationFrame(render);
        };

        render();
        setContextReady(true);

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <>
            <canvas className="canvas" ref={canvasRef} width={width} height={height}>
                Your browser does not support the HTML5 canvas tag.
            </canvas>
            {contextReady && <Game context={contextRef.current} width={width} height={height} {...props} />}
        </>
    );
}

export default Canvas;
