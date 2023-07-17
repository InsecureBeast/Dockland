import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackNewComponent } from './stack-new.component';

describe('StackNewComponent', () => {
  let component: StackNewComponent;
  let fixture: ComponentFixture<StackNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StackNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StackNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
