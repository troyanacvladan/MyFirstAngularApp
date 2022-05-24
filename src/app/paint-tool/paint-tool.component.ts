import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paint-tool',
  templateUrl: './paint-tool.component.html',
  styleUrls: ['./paint-tool.component.scss']
})
export class PaintToolComponent implements OnInit {

  paintTools: string[] = [null, 'pen', 'highlighter'];
  currentTool: string = 'highlighter';

  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  canvasStaringPointX: number = 0;
  canvasStaringPointY: number = 0;
  strokeOptions = {};
  inputPoints: any;
  toolActive: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.canvas = <HTMLCanvasElement>document.getElementById('test-canvas');
    this.canvas.width  = 1000;
    this.canvas.height  = 500;
    const rect = this.canvas.getBoundingClientRect();
    this.canvasStaringPointX = rect.left;
    this.canvasStaringPointY = rect.top;
    this.context = this.canvas?.getContext('2d');

    this.context.font = "40px sans-serif";
    this.context.fillText("HIGHLIGHT MEEEEEEEEEEE", 100, 100);
  }

  onMouseDown($event: MouseEvent) {
    if(this.currentTool === 'pen' || this.currentTool === 'highlighter'){
      this.toolActive = true;
      this.onMouseMove($event);
    }
  }

  onMouseUp($event: MouseEvent) {
    if(this.currentTool === 'pen' || this.currentTool === 'highlighter'){
      this.toolActive = false;
      this.context.beginPath();
    }
  }

  onMouseMove(event: MouseEvent) {
    switch (this.currentTool) {
      case 'pen':
        this.penTool(event);
        break;
      case 'highlighter':
        this.highlighterTool(event)
        break;
    }
  }

  penTool(event) {
    if(!this.toolActive)return;
    this.context.strokeStyle = "red";
    this.context.lineWidth = 5;
    this.context.lineCap = 'round';

    let x = event.pageX - this.canvas.offsetLeft;
    let y = event.pageY - this.canvas.offsetTop;

    this.context.lineTo(x,y);
    this.context.stroke();
   // this.context.beginPath();
    this.context.moveTo(x, y)
  }


  private highlighterTool(event: MouseEvent) {
    if(!this.toolActive)return;
    this.context.globalCompositeOperation = "multiply";
    this.context.fillStyle = "#ff0";
    let x = event.pageX - this.canvas.offsetLeft;
    let y = event.pageY - this.canvas.offsetTop;
    this.context.fillRect(x, y, 20, 20);
    this.context.stroke();
  }
}
