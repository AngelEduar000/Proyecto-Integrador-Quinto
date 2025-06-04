import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisisLaboratorioComponent } from './analisis-laboratorio.component';

describe('AnalisisLaboratorioComponent', () => {
  let component: AnalisisLaboratorioComponent;
  let fixture: ComponentFixture<AnalisisLaboratorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalisisLaboratorioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalisisLaboratorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
