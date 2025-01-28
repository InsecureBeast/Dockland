import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerInspectComponent } from './container-inspect.component';

describe('ContainerInspectComponent', () => {
  let component: ContainerInspectComponent;
  let fixture: ComponentFixture<ContainerInspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerInspectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContainerInspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
