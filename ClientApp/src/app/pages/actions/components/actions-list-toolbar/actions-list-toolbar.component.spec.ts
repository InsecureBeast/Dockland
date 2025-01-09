import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsListToolbarComponent } from './actions-list-toolbar.component';

describe('ActionsListToolbarComponent', () => {
  let component: ActionsListToolbarComponent;
  let fixture: ComponentFixture<ActionsListToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionsListToolbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActionsListToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
