import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// IMPORTANTE: Importar IonicModule e os Controllers
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
  // IMPORTANTE: IonicModule precisa estar aqui para o HTML funcionar
  imports: [IonicModule, CommonModule, FormsModule],
})
export class DetalhesPage implements OnInit {
  pessoa: any = null; // Guarda os dados da pessoa
  emEdicao: boolean = false; // Controla se mostra input ou texto
  idPessoa: string = ''; // Guarda o ID da URL

  constructor(
    private route: ActivatedRoute, // Para ler a URL
    private apiService: ApiService, // Para falar com o Python
    private navCtrl: NavController, // Para voltar pra lista
    private alertController: AlertController, // Para perguntar "Tem certeza?"
    private toastController: ToastController // Para avisar "Salvo!"
  ) {}

  ngOnInit() {
    // 1. Pega o ID que veio na URL
    this.idPessoa = this.route.snapshot.paramMap.get('id') ?? '';

    // 2. Se tiver ID, busca os dados
    if (this.idPessoa) {
      this.carregarPessoa();
    }
  }

  // Busca os dados no Python
  carregarPessoa() {
    this.apiService.buscarPorId(this.idPessoa).subscribe({
      next: (dados) => {
        this.pessoa = dados;
      },
      error: (erro) => console.error('Erro ao buscar', erro),
    });
  }

  // --- FUNÇÕES DOS BOTÕES ---

  // Botão "Editar" / "Cancelar"
  alternarEdicao() {
    this.emEdicao = !this.emEdicao;
    // Se cancelou, recarrega os dados originais
    if (!this.emEdicao) {
      this.carregarPessoa();
    }
  }

  emailValido(email: string): boolean {
    // Regex simples para email: algo@algo.algo
    const padrao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return padrao.test(email);
  }

  // Botão "Salvar"
  salvar() {
    // --- VALIDAÇÃO 1: Campos Vazios ---
    if (!this.pessoa.nome || !this.pessoa.email) {
      this.mostrarAlerta('Atenção', 'Nome e Email são obrigatórios!');
      return; // O return PARALISA a função aqui. Não envia nada.
    }

    // --- VALIDAÇÃO 2: Formato do Email ---
    if (!this.emailValido(this.pessoa.email)) {
      this.mostrarAlerta(
        'Email Inválido',
        'Por favor, digite um email correto (ex: nome@teste.com)'
      );
      return; // Para tudo aqui também
    }

    // --- SE PASSOU PELAS VALIDAÇÕES, SEGUE O BAILE ---
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

  // Botão "Excluir" (Abre a confirmação)
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
          }, // Se disser sim, deleta
        },
      ],
    });
    await alert.present();
  }

  // A exclusão real
  deletar() {
    this.apiService.excluir(this.idPessoa).subscribe({
      next: () => {
        this.mostrarToast('Pessoa excluída!');
        this.navCtrl.navigateBack('/visualizacao'); // Volta pra lista
      },
      error: (erro) => console.error(erro),
    });
  }

  // Auxiliar para mostrar mensagem
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
      buttons: ['OK'], // Botão simples só para fechar
    });
    await alert.present();
  }
}
