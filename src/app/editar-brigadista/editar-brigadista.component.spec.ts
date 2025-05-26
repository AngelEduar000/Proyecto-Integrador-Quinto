import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarBrigadistaComponent } from './editar-brigadista.component';

describe('EditarBrigadistaComponent', () => {
  let component: EditarBrigadistaComponent;
  let fixture: ComponentFixture<EditarBrigadistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarBrigadistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarBrigadistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
