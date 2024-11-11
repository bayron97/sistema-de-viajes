import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarSucursalesComponent } from './asignar-sucursales.component';

describe('AsignarSucursalesComponent', () => {
  let component: AsignarSucursalesComponent;
  let fixture: ComponentFixture<AsignarSucursalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsignarSucursalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarSucursalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
