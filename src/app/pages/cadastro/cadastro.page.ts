import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonInput, IonList, IonTitle, IonToolbar, IonButton, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule, IonList, IonInput,
    IonButton, IonButtons, IonBackButton
  ]
})
export class CadastroPage implements OnInit {

  nome: string = "";
  sobrenome: string = "";
  idade: number | null = null;
  telefone: string = "";
  email: string = "";
  cidade: string = "";
  
  constructor(private pessoaService: PessoaService) { } // <- CERTO

  cadastrar() {  // <- CERTO
    const dados = {
      nome: this.nome,
      sobrenome: this.sobrenome,
      idade: this.idade,
      telefone: this.telefone,
      email: this.email,
      cidade: this.cidade
    };

    this.pessoaService.addPessoa(dados).subscribe({
      next: (res) => {
        console.log("Cadastrado com sucesso", res);
      },
      error: (err) => {
        console.log("Erro ao cadastrar", err);
      }
    });
  }
}
