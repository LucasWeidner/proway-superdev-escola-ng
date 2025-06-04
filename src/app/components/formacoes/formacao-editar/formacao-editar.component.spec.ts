import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormacaoEditarComponent } from './formacao-editar.component';

describe('FormacaoEditarComponent', () => {
  let component: FormacaoEditarComponent;
  let fixture: ComponentFixture<FormacaoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormacaoEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormacaoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
