import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PencilToolComponent } from './pencil-tool.component';

describe('PencilToolComponent', () => {
  let component: PencilToolComponent;
  let fixture: ComponentFixture<PencilToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PencilToolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PencilToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
