import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/services/api';

@Component({
  selector: 'app-visualizacao',
  templateUrl: './visualizacao.page.html',
  styleUrls: ['./visualizacao.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ]
})
export class VisualizacaoPage {

  listarPessoas: any[] = [];

  constructor(private router: Router, private apiService: ApiService) { }

  ionViewWillEnter() {
    this.carregarDados();
  }



  carregarDados(){
    this.apiService.listar().subscribe({
      next:(dados) =>{
        console.log("Requerimento da API", dados);
        this.listarPessoas = dados;
      },
      error: (erro) => {
        console.error("Erro ao Buscar", erro);
      }
    });
  }

}
