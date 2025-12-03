import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonMenu, IonMenuButton, IonItem, IonButton, IonLabel, IonItemOption, IonItemOptions, IonItemSliding, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visualizacao',
  templateUrl: './visualizacao.page.html',
  styleUrls: ['./visualizacao.page.scss'],
  standalone: true,
  imports: [IonItemSliding, IonItemOptions, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonButton, IonLabel, IonItemOption, IonButtons, IonBackButton]
})
export class VisualizacaoPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
   editar(){
    this.router.navigate(["/edicao"]);
  }

}
