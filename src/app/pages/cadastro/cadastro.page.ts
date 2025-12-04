import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class CadastroPage implements OnInit {

  nome: string = "";
  sobrenome: string = "";
  idade: number = 0;
  telefone: string = "";
  email: string = "";
  cidade: string = "";

  constructor(
    private apiService: ApiService,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  // --- FUNÇÕES AUXILIARES ---

  emailValido(email: string): boolean {
    const padrao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return padrao.test(email);
  }

  async mostrarAlerta(titulo: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensagem,
      buttons: ['OK']
    });
    await alert.present();
  }

  async mostrarToast(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    toast.present();
  }

  // --- AÇÃO PRINCIPAL ---

  enviarDados() {
    // 1. VALIDAÇÃO RIGOROSA: Verifica TODOS os campos
    // Se faltar qualquer um deles, entra no IF e para tudo.
    if (!this.nome || !this.sobrenome || !this.telefone || !this.email || !this.cidade || !this.idade) {
      this.mostrarAlerta('Campos Vazios', 'Por favor, preencha TODAS as informações da pessoa.');
      return;
    }

    // 2. Valida se a Idade faz sentido (opcional, mas bom)
    if (this.idade <= 0) {
      this.mostrarAlerta('Idade Inválida', 'A idade precisa ser maior que zero.');
      return;
    }

    // 3. Valida Email
    if (!this.emailValido(this.email)) {
      this.mostrarAlerta('Email Inválido', 'Digite um email correto (ex: teste@gmail.com)');
      return;
    }

    // --- SE PASSOU POR TUDO, ENVIA ---
    const dadosParaEnviar = {
      nome: this.nome,
      sobrenome: this.sobrenome,
      idade: this.idade,
      telefone: this.telefone,
      email: this.email,
      cidade: this.cidade
    };

    this.apiService.criar(dadosParaEnviar).subscribe({
      next: () => {
        this.mostrarToast("Pessoa cadastrada com sucesso!");

        // Limpa tudo
        this.nome = "";
        this.sobrenome = "";
        this.idade = 0;
        this.telefone = "";
        this.email = "";
        this.cidade = "";
      },
      error: (erro) => {
        console.error(erro);
        this.mostrarAlerta("Erro", "Falha ao conectar com o servidor.");
      }
    });
  }
}
