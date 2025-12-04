import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonicModule,
  NavController,
  AlertController,
  ToastController,
} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
  standalone: true,

  imports: [IonicModule, CommonModule, FormsModule],
})
export class DetalhesPage implements OnInit {
  pessoa: any = null;
  emEdicao: boolean = false;
  idPessoa: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {

    this.idPessoa = this.route.snapshot.paramMap.get('id') ?? '';


    if (this.idPessoa) {
      this.carregarPessoa();
    }
  }


  carregarPessoa() {
    this.apiService.buscarPorId(this.idPessoa).subscribe({
      next: (dados) => {
        this.pessoa = dados;
      },
      error: (erro) => console.error('Erro ao buscar', erro),
    });
  }


  alternarEdicao() {
    this.emEdicao = !this.emEdicao;

    if (!this.emEdicao) {
      this.carregarPessoa();
    }
  }

  emailValido(email: string): boolean {

    const padrao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return padrao.test(email);
  }


  salvar() {

    if (!this.pessoa.nome || !this.pessoa.email) {
      this.mostrarAlerta('Atenção', 'Nome e Email são obrigatórios!');
      return;
    }


    if (!this.emailValido(this.pessoa.email)) {
      this.mostrarAlerta(
        'Email Inválido',
        'Por favor, digite um email correto (ex: nome@teste.com)'
      );
      return;
    }


    this.apiService.atualizar(this.idPessoa, this.pessoa).subscribe({
      next: () => {
        this.mostrarToast('Dados atualizados com sucesso!');
        this.emEdicao = false;
      },
      error: (erro) => {
        console.error(erro);
        this.mostrarToast('Erro ao atualizar.');
      },
    });
  }


  async confirmarExclusao() {
    const alert = await this.alertController.create({
      header: 'Cuidado!',
      message: 'Tem certeza que deseja apagar esta pessoa?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Sim, Apagar',
          handler: () => {
            this.deletar();
          },
        },
      ],
    });
    await alert.present();
  }


  deletar() {
    this.apiService.excluir(this.idPessoa).subscribe({
      next: () => {
        this.mostrarToast('Pessoa excluída!');
        this.navCtrl.navigateBack('/visualizacao');
      },
      error: (erro) => console.error(erro),
    });
  }


  async mostrarToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  async mostrarAlerta(titulo: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensagem,
      buttons: ['OK'], 
    });
    await alert.present();
  }
}
