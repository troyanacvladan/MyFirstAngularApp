import { Component, OnInit } from '@angular/core';
import { fabric } from "fabric";

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
  toolActive: boolean = false;
  reader = new FileReader();

  penOptions: any = {
    lineStyle: 'red',
    lineWidth: 5,
    lineCap: 'round', //'butt' | 'round' | 'square'
  }

  highlightOptions: any = {
    fillStyle: '#ff0',
    fillWidth: 20,
    fillHeight: 20
  }

  textBubbleOptions: any = {
    boxPadding: 16,
    arrowWidth: 10,
    strokeWidth: 2,
    handleSize: 24,
    msg: 'Text over me.'
  }

  // fabric library properties
  private fabricCanvas: fabric.Canvas;
  private textBox: fabric.Textbox;
  private handle: fabric.Rect;
  private setCoords: any;
  private rect: fabric.Rect;
  private poly: fabric.Polygon;
  private poly2: fabric.Polygon;

  constructor() { }

  ngOnInit(): void {
    this.canvas = <HTMLCanvasElement>document.getElementById('test-canvas');
    this.canvas.width  = 1000;
    this.canvas.height  = 500;
    this.context = this.canvas?.getContext('2d');

    this.context.font = "40px sans-serif";
    this.context.fillText("HIGHLIGHT MEEEEEEEEEEE", 100, 100);


  /*  this.fabricCanvas = new fabric.Canvas('test-canvas');

    this.textBox = new fabric.Textbox(this.textBubbleOptions.msg, {
      left: 200,
      top: 80,
      width: 180,
      fontSize: 16,
      originY: 'center',
      originX: 'center'
    });

    //call setCoords whenever the textbox moved
    this.setCoords = this.textBox.setCoords.bind(this.textBox);
    this.textBox.on({
      moving: this.setCoords,
      scaling: this.setCoords,
      rotating: this.setCoords
    });

    //to detect changes in the textbox position and update the handle when the textbox was moved, let's store the last known coords
    this.textBox.lastLeft = this.textBox.left;
    this.textBox.lastTop = this.textBox.top;

    //speech bubble tail handle
    this.handle = new fabric.Rect({
      fill: 'transparent',
      left: 128,
      top: 160,
      width: this.textBubbleOptions.handleSize,
      height: this.textBubbleOptions.handleSize,
      hasRotatingPoint: false,
      hasControls: false,
      originY: 'center',
      originX: 'center'
    });

    //speech bubble background box
    this.rect = new fabric.Rect({
      fill: 'white',
      stroke: 'black',
      strokeWidth: this.textBubbleOptions.strokeWidth,
      rx: 8,
      ry: 8,
      objectCaching: false
    });

    //speech bubble tail polygon
    this.poly = new fabric.Polygon(
      [{x:0,y:0},{x:1,y:1},{x:1,y:0}],
      {
        fill: 'white',
        stroke: 'black',
        strokeWidth: this.textBubbleOptions.strokeWidth,
        objectCaching: false
      }
    );

    //2nd tail poly to overlay the bubble stroke
    this.poly2 = new fabric.Polygon(
      [{x:0,y:0},{x:1,y:1},{x:1,y:0}],
      {
        fill: 'white',
        objectCaching: false
      }
    );

    this.fabricCanvas.add(this.poly, this.rect, this.poly2, this.textBox);
    this.fabricCanvas.add(this.handle).setActiveObject(this.handle);
    this.fabricCanvas.on('after:render', this.updateBubble);
    this.updateBubble();

   */
  }

  private updateBubble() {

    //lets spare us some typing
    const x = this.textBox.left;
    const y = this.textBox.top;

    //update rect
    const bound = this.textBox.getBoundingRect();
    this.rect.left = bound.left - this.textBubbleOptions.boxPadding;
    this.rect.top = bound.top - this.textBubbleOptions.boxPadding;
    this.rect.width = bound.width + (this.textBubbleOptions.boxPadding * 2);
    this.rect.height = bound.height + (this.textBubbleOptions.boxPadding * 2);

    //if the textbox was moved, update the handle position too
    if(x !== this.textBox.lastLeft ||
      y !== this.textBox.lastTop) {
      this.handle.left += (x - this.textBox.lastLeft);
      this.handle.top += (y - this.textBox.lastTop);
      this.handle.setCoords();
    }

    //to support 360° thick tails we have to do some triangulation
    var halfPi = Math.PI/2;
    var angleRadians = Math.atan2(this.handle.top - y, this.handle.left - x);
    var offsetX = Math.cos(angleRadians + halfPi);
    var offsetY = Math.sin(angleRadians + halfPi);

    //update tail poly
    this.poly.points[0].x = this.handle.left;
    this.poly.points[0].y = this.handle.top;
    this.poly.points[1].x = x - (offsetX * this.textBubbleOptions.arrowWidth);
    this.poly.points[1].y = y - (offsetY * this.textBubbleOptions.arrowWidth);
    this.poly.points[2].x = x + (offsetX * this.textBubbleOptions.arrowWidth);
    this.poly.points[2].y = y + (offsetY * this.textBubbleOptions.arrowWidth);

    //white overlay poly (prevent dividing line)
    const halfStroke = this.textBubbleOptions.strokeWidth / 2;
    this.poly2.points[0].x = this.handle.left;
    this.poly2.points[0].y = this.handle.top;
    this.poly2.points[1].x = x - offsetX * (this.textBubbleOptions.arrowWidth - halfStroke);
    this.poly2.points[1].y = y - offsetY * (this.textBubbleOptions.arrowWidth - halfStroke);
    this.poly2.points[2].x = x + offsetX * (this.textBubbleOptions.arrowWidth - halfStroke);
    this.poly2.points[2].y = y + offsetY * (this.textBubbleOptions.arrowWidth - halfStroke);

    //remember current position to detect further changes
    this.textBox.lastLeft = x;
    this.textBox.lastTop = y;
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

  private penTool(event) {
    if(!this.toolActive)return;
    this.context.globalCompositeOperation = 'source-over';
    this.context.strokeStyle = this.penOptions.lineStyle;
    this.context.lineWidth = this.penOptions.lineWidth;
    this.context.lineCap = this.penOptions.lineCap;

    let x = event.pageX - this.canvas.offsetLeft;
    let y = event.pageY - this.canvas.offsetTop;

    this.context.lineTo(x,y);
    this.context.stroke();
  //  this.context.beginPath();
    this.context.moveTo(x, y)
  }


  private highlighterTool(event: MouseEvent) {
    if(!this.toolActive)return;
    this.context.globalCompositeOperation = 'multiply';
    this.context.fillStyle = this.highlightOptions.fillStyle;
    let x = event.pageX - this.canvas.offsetLeft;
    let y = event.pageY - this.canvas.offsetTop;
    this.context.fillRect(x, y, this.highlightOptions.fillWidth, this.highlightOptions.fillHeight);
    this.context.stroke();
  }

  saveCanvasAsImage() {
    const link = document.getElementById('save-as-image');
    link.setAttribute('download', 'canvas-example.png');
    link.setAttribute('href', this.canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream"));
    link.click();
  }

  saveCanvasAsJson() {

    // retrieve the canvas data
    const canvasContents = this.canvas.toDataURL(); // a data URL of the current canvas image
    const data = { image: canvasContents, date: Date.now() };
    const string = JSON.stringify(data);

    // create a blob object representing the data as a JSON string
    const file = new Blob([string], {
      type: 'application/json'
    });

    const link = document.getElementById('save-as-json');
    link.setAttribute('download', 'canvas-example.json');
    link.setAttribute('href', URL.createObjectURL(file));
    link.click();
  }

  loadCanvasFromJson() {

  }

}
