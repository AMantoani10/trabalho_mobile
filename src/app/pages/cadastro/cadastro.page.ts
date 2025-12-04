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



  enviarDados() {

    if (!this.nome || !this.sobrenome || !this.telefone || !this.email || !this.cidade || !this.idade) {
      this.mostrarAlerta('Campos Vazios', 'Por favor, preencha TODAS as informações da pessoa.');
      return;
    }


    if (this.idade <= 0) {
      this.mostrarAlerta('Idade Inválida', 'A idade precisa ser maior que zero.');
      return;
    }


    if (!this.emailValido(this.email)) {
      this.mostrarAlerta('Email Inválido', 'Digite um email correto (ex: teste@gmail.com)');
      return;
    }


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
