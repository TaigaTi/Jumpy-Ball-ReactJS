class Ball {
    x: number;
    y: number;
    r: number;
    speed: number;
    draw: () => void;
    clear: () => void;
    gravity: (timePassed: number) => void;
    onground: () => void;
    render: () => void;

    constructor(context: CanvasRenderingContext2D, height: number) {
        this.x = height / 4;
        this.y = height / 2;
        this.r = 20;
        this.speed = 45;

        this.render = function() {
            this.clear();
            this.draw();
        }

        // Draw Ball
        this.draw = function () {
            context.beginPath();
            context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
            context.fillStyle = "red";
            context.fill();
        }

        // Clear Ball Path
        this.clear = function () {
            context.save();
            context.globalCompositeOperation = 'copy';
            context.beginPath(); 
            context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
            context.fill();
            context.restore();
        }


        // Increase Drop Speed
        this.gravity = function (timePassed) {
            if (this.y <= 380) {
                this.speed += 5 * timePassed;
                this.y += this.speed * timePassed;
            }
        }

        // Reset Score When Ball Touches Ground
        this.onground = function () {
            if (this.y >= 380) {
                this.y = 380;
            }
        }
    }
}

export default Ball;