import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInstructionComponent } from './app-instruction.component';

describe('AppInstructionComponent', () => {
  let component: AppInstructionComponent;
  let fixture: ComponentFixture<AppInstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppInstructionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
