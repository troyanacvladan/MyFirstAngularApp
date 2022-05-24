import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {CanvasWhiteboardComponent, CanvasWhiteboardOptions, CanvasWhiteboardUpdate} from "ng2-canvas-whiteboard";

@Component({
  selector: 'app-canvas-whiteboard',
  viewProviders: [CanvasWhiteboardComponent],
  templateUrl: './ng2-canvas-whiteboard.component.html',
  styleUrls: ['./ng2-canvas-whiteboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Ng2CanvasWhiteboardComponent implements OnInit {

  @ViewChild('canvasWhiteboard') canvasWhiteboard: CanvasWhiteboardComponent;

  canvasOptions: CanvasWhiteboardOptions = {
    drawButtonEnabled: true,
    drawButtonClass: "drawButtonClass",
    drawButtonText: "Draw",
    clearButtonEnabled: true,
    clearButtonClass: "clearButtonClass",
    clearButtonText: "Clear",
    undoButtonText: "Undo",
    undoButtonEnabled: true,
    redoButtonText: "Redo",
    redoButtonEnabled: true,
    colorPickerEnabled: true,
    fillColorPickerText: "Fill",
    strokeColorPickerText: "Stroke",
    saveDataButtonEnabled: true,
    saveDataButtonText: "Save",
    lineWidth: 5,
    strokeColor: "rgb(0,0,0)",
    shouldDownloadDrawing: true
  };

  constructor() { }

  ngOnInit(): void {
  }

  sendBatchUpdate($event: CanvasWhiteboardUpdate[]) {

  }

  onCanvasClear() {

  }

  onCanvasUndo($event: any) {

  }

  onCanvasRedo($event: any) {

  }
}
