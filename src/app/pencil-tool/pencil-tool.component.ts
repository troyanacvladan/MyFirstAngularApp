import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { Subscription, fromEvent } from "rxjs";
import { getStroke } from 'perfect-freehand';

@Component({
  selector: 'app-pencil-tool',
  templateUrl: './pencil-tool.component.html',
  styleUrls: ['./pencil-tool.component.scss']
})
export class PencilToolComponent implements OnInit {

  dragging;
  mouseActive: boolean = false;
  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent): void {
    this.dragging = true;
  }

  constructor(element:ElementRef) {
    fromEvent(element.nativeElement, "pointermove").subscribe((x: PointerEvent) => {
      console.log(`${x.clientY} - ${x.clientX}`);
    });
  }

  ngOnInit(): void {

    //To use this library, import the getStroke function and pass it an array of input points,
    // such as those recorded from a user's mouse movement.

    const inputPoints = [
      [0, 0],
      [10, 5],
      [20, 8],
      [120, 80],
      [80, 160],
      [0,0]
      // ...
    ];

    // The getStroke function will return a new array of outline points.
    // These outline points will form a polygon (called a "stroke") that surrounds the input points.
    const outlinePoints = getStroke(inputPoints);

    //You then can render your stroke points using your technology of choice.
    // See the Rendering section for examples in SVG and HTML Canvas.

    const pathData = this.getSvgPathFromStroke(outlinePoints);

    //if you are rendering with HTML Canvas, you can pass the string to a Path2D constructor).
    const canvas = <HTMLCanvasElement>document.getElementById('test-canvas');
    const ctx = canvas.getContext('2d');
    const myPath = new Path2D(pathData);
    ctx.fill(myPath);
  }

  getSvgPathFromStroke(stroke): any {
    if (!stroke.length) return ''

    const d = stroke.reduce(
      (acc, [x0, y0], i, arr) => {
        const [x1, y1] = arr[(i + 1) % arr.length]
        acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2)
        return acc
      },
      ['M', ...stroke[0], 'Q']
    )

    d.push('Z')
    return d.join(' ')
  }

  mouseChange() {
    this.mouseActive=!this.mouseActive;
  }
}
