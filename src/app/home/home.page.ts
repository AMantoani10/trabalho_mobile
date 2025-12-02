import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonList, IonInput } from '@ionic/angular/standalone';
import { routes } from '../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class HomePage {
  constructor(private router: Router) {}

  cadastro(){
    this.router.navigate(["/cadastro"]);
  }
  editar(){
    this.router.navigate(["/edicao"]);
  }
  excluir(){
    this.router.navigate(["/exclusao"]);
  }
  visualizar(){
    this.router.navigate(["/visualizacao"]);
  }

}
