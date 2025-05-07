import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarConglomeradoComponent } from './add-edit-conglomerados.component';

describe('AddEditConglomeradosComponent', () => {
  let component: AgregarConglomeradoComponent;
  let fixture: ComponentFixture<AgregarConglomeradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarConglomeradoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarConglomeradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
