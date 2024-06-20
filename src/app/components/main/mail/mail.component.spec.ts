import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailListItemComponent } from './mail.component';

describe('MailListItemComponent', () => {
  let component: MailListItemComponent;
  let fixture: ComponentFixture<MailListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MailListItemComponent]
    });
    fixture = TestBed.createComponent(MailListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
