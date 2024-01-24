class Pipe {
    x: number;
    y: number;
    w: number;
    speed: number;
    spacing: number;
    top: number;
    bottom: number;
    checked: boolean;
    draw: () => void;
    clear: () => void;

    constructor(context: CanvasRenderingContext2D, height:number) 
    {
        this.x = 600;
        this.y = 0;
        this.w = 40;
        this.speed = 100;
        this.spacing = Math.floor(Math.random() * (25) + (100));
        this.top = Math.floor(Math.random() * (((3 / 4) * height) - (height / 6) + 1) + (height / 6));
        this.bottom = height - (this.top + this.spacing);
        this.checked = false;
        

        // Draw Pipes
        this.draw = function() {
            // Draw Top Pipe
            context.beginPath();
            context.rect(this.x, 0, this.w, this.top);
            context.fillStyle = "white";
            context.fill();

            // Draw Bottom Pipe
            context.beginPath();
            context.rect(this.x, height - this.bottom, this.w, this.bottom);
            context.fillStyle = "white";
            context.fill();

            console.log("Yes");
        }

        // Clear Pipe Path
        this.clear = function() {
            context.clearRect(this.x, 0, this.w + 5, this.top);
            context.clearRect(this.x, height - this.bottom, this.w + 5, this.bottom);
        }
    }
}

export default Pipe