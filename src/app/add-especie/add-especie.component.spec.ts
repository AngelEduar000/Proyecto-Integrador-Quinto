import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEspecieComponent } from './add-especie.component';

describe('AddEspecieComponent', () => {
  let component: AddEspecieComponent;
  let fixture: ComponentFixture<AddEspecieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEspecieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEspecieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
