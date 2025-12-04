  import { Component, OnInit } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { FormsModule } from '@angular/forms';
  import { IonicModule } from '@ionic/angular';
  import { ApiService } from 'src/app/services/api';

  @Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.page.html',
    styleUrls: ['./cadastro.page.scss'],
    standalone: true,
    imports: [
      CommonModule,
      FormsModule,
      IonicModule // <- fornece todos os componentes Ionic
    ]
  })
  export class CadastroPage implements OnInit {

      nome: string ="";
      sobrenome: string ="";
      idade: number = 0;
      telefone: string = "";
      email: string = "";
      cidade: string= "";

    constructor(private apiService: ApiService) { }

    ngOnInit() {
      // Código de inicialização
    }

    enviarDados(){
      const dadosParaEnviar = {nome: this.nome, sobrenome: this.sobrenome, idade: this.idade, telefone: this.telefone, email: this.email, cidade: this.cidade };

      this.apiService.criar(dadosParaEnviar).subscribe({
        next: () =>{
          alert("Pessoa Criada!");
          this.nome ="";
          this.sobrenome ="";
          this.idade = 0 ;
          this.telefone = "";
          this.email = "";
          this.cidade = "";

        },
        error:(erro) => console.error(erro)
      })

    }

  }
