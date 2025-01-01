import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentToolbarComponent } from './environment-toolbar.component';

describe('EnvironmentToolbarComponent', () => {
  let component: EnvironmentToolbarComponent;
  let fixture: ComponentFixture<EnvironmentToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnvironmentToolbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnvironmentToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
