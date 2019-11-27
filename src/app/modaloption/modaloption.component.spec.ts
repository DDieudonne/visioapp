import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaloptionComponent } from './modaloption.component';

describe('ModaloptionComponent', () => {
  let component: ModaloptionComponent;
  let fixture: ComponentFixture<ModaloptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaloptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaloptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
