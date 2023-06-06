import { ElementRef } from '@angular/core';

export class CanvasDrawer {

    canvasContext: CanvasRenderingContext2D;
    lineWidth = 6;
    halfLineWidth = this.lineWidth / 2;
    fillStyle = '#333';
    strokeStyle = '#333';
    shadowColor = '#333';
    shadowBlur = this.lineWidth / 4;
    state = {
        mousedown: false
    };

    constructor(private canvas: ElementRef<HTMLCanvasElement>) {
    }

    setContext() {
        this.canvas.nativeElement.setAttribute('width', this.canvas.nativeElement.style.width);
        this.canvas.nativeElement.setAttribute('height', this.canvas.nativeElement.style.height);
        this.canvasContext = this.canvas.nativeElement.getContext('2d');
        this.canvas.nativeElement.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousedown', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.canvas.nativeElement.dispatchEvent(mouseEvent);
        },
            false);

        this.canvas.nativeElement.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.canvas.nativeElement.dispatchEvent(mouseEvent);
        },
            false);

        this.canvas.nativeElement.addEventListener('touchend', (e) => {
            const mouseEvent = new MouseEvent('mouseup', {});
            this.canvas.nativeElement.dispatchEvent(mouseEvent);
        },
            false);
    }

    writingStart(event) {
        // console.log(event);
        event.preventDefault();

        const mousePos = this.getMousePositionOnCanvas(event);

        this.canvasContext.beginPath();

        this.canvasContext.moveTo(mousePos.x, mousePos.y);

        this.canvasContext.lineWidth = this.lineWidth;
        this.canvasContext.strokeStyle = this.strokeStyle;
        this.canvasContext.shadowColor = null;
        this.canvasContext.shadowBlur = null;

        this.canvasContext.fill();

        this.state.mousedown = true;
    }

    writingInProgress(event) {
        event.preventDefault();

        // if (this.state.mousedown) {
        const mousePos = this.getMousePositionOnCanvas(event);

        this.canvasContext.lineTo(mousePos.x, mousePos.y);
        this.canvasContext.stroke();
        // }
    }

    drawingEnd(event) {
        event.preventDefault();

        if (this.state.mousedown) {
            this.canvasContext.shadowColor = this.shadowColor;
            this.canvasContext.shadowBlur = this.shadowBlur;

            this.canvasContext.stroke();
        }

        this.state.mousedown = false;
    }

    clearButtonClick(event) {
        event.preventDefault();

        this.clearCanvas();
    }

    getMousePositionOnCanvas(event) {
        const clientX = event.clientX;
        const clientY = event.clientY;
        const rect = this.canvas.nativeElement.getBoundingClientRect();
        // console.log(rect);
        const canvasX = clientX - rect.left;
        const canvasY = clientY - rect.top;

        const ret = { x: canvasX, y: canvasY };
        return ret;
    }


    getMousePositionOnCanvas0(e) {
        /* tslint:disable:no-bitwise */

        const mouseX = e.pageX * this.canvas.nativeElement.width / this.canvas.nativeElement.clientWidth | 0;
        const mouseY = e.pageY * this.canvas.nativeElement.height / this.canvas.nativeElement.clientHeight | 0;
        /* tslint:disable:no-bitwise */

        return { x: mouseX, y: mouseY };
    }
    clearCanvas() {
        this.canvasContext.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    }
}
