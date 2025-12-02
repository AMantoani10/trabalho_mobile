import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExclusaoPage } from './exclusao.page';

describe('ExclusaoPage', () => {
  let component: ExclusaoPage;
  let fixture: ComponentFixture<ExclusaoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExclusaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
