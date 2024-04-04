import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonButton, IonCol, IonCard, IonAvatar, IonInfiniteScroll, IonInfiniteScrollContent, IonSearchbar } from '@ionic/angular/standalone';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonInfiniteScrollContent, IonInfiniteScroll, IonAvatar, IonCard, IonCol, IonButton, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,SharedModule]
})
export class HomePage implements OnInit {

  characters:any[]=[];
  params ={} as any;


  constructor(private rickAndMortySvc:RickAndMortyService) { }

  ngOnInit() {
    this.params.page = 0;
    this.getCharacters();
  }

  getCharacters(event?:any){
    this.params.page +=1;
    this.rickAndMortySvc.getCharacters(this.params).subscribe({
      next:(res:any) =>{
        this.characters.push(...res.results);
        if(event) event.target.complete();
      },
      error: (error:any)=>{
        if(event) event.target.complete();
      }
  })
  }

  searchCharacters(){
    this.params.page =1;
    this.rickAndMortySvc.getCharacters(this.params).subscribe({
      next:(res:any) =>{
        this.characters = res.results;
      },
      error: (error:any)=>{
      }
  })
  }


}
