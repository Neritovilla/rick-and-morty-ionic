import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonAvatar, IonLabel, IonItem, IonIcon, IonGrid, IonCol, IonRow, IonCardContent, IonCard, IonSpinner } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonCard, IonCardContent, IonRow, IonCol, IonGrid, IonIcon, IonItem, IonLabel, IonAvatar, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, SharedModule]
})
export class CharacterDetailPage implements OnInit {

  characterId:string="";
  character = null as any;
  episodes: any[] =[];

  constructor(private actRoute:ActivatedRoute,private rickAndMortySvc:RickAndMortyService) {
    this.characterId = this.actRoute.snapshot.paramMap.get('id') as string;
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getCharacters();
  }

  getCharacters(){
    this.rickAndMortySvc.getCharactersById(this.characterId).subscribe({
      next:(res:any) =>{
        this.character = res;
        this.getEpisodes()
      },
      error: (error:any)=>{
      }
  })
  }

  getEpisodes(){
    for(let url of this.character.episode){
      this.rickAndMortySvc.getByUrl(url).subscribe({
        next:(res:any) =>{
          this.episodes.push(res);
        },
        error: (error:any)=>{
        }
    })
    }
  }





}
