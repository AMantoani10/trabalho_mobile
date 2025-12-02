import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonMenu, IonMenuButton, IonItem, IonButton, IonLabel, IonItemOption, IonItemOptions, IonItemSliding } from '@ionic/angular/standalone';

@Component({
  selector: 'app-visualizacao',
  templateUrl: './visualizacao.page.html',
  styleUrls: ['./visualizacao.page.scss'],
  standalone: true,
  imports: [IonItemSliding, IonItemOptions, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonButton, IonLabel, IonItemOption]
})
export class VisualizacaoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
