import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./pages/cadastro/cadastro.page').then( m => m.CadastroPage)
  },
  {
    path: 'detalhes/:id',
    loadComponent: () => import('./pages/detalhes/detalhes.page').then( m => m.DetalhesPage)
  },
  {
    path: 'visualizacao',
    loadComponent: () => import('./pages/visualizacao/visualizacao.page').then( m => m.VisualizacaoPage)
  },
];
