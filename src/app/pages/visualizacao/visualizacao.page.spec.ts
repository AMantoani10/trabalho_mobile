import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisualizacaoPage } from './visualizacao.page';

describe('VisualizacaoPage', () => {
  let component: VisualizacaoPage;
  let fixture: ComponentFixture<VisualizacaoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
