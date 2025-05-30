import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormacaoCadastroComponent } from './formacao-cadastro.component';

describe('FormacaoCadastroComponent', () => {
  let component: FormacaoCadastroComponent;
  let fixture: ComponentFixture<FormacaoCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormacaoCadastroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormacaoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
