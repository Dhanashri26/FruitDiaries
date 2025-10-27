import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiblogComponent } from './indiblog.component';

describe('IndiblogComponent', () => {
  let component: IndiblogComponent;
  let fixture: ComponentFixture<IndiblogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndiblogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndiblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
