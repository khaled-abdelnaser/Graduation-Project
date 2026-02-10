import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMainLayoutComponentComponent } from './main-main-layout-component.component';

describe('MainMainLayoutComponentComponent', () => {
  let component: MainMainLayoutComponentComponent;
  let fixture: ComponentFixture<MainMainLayoutComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainMainLayoutComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainMainLayoutComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
