import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/model/characters';
import { ListCharactersService } from 'src/app/services/list-characters.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  character: Character;

  constructor(private listCharactersService: ListCharactersService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.getCharacter(parseInt(id));
    } else{
      console.log("There's no id to load a character for");
    }
  }

  getCharacter(id: number){
    this.listCharactersService.getCharacter(id).subscribe(
      (character) => {
        if(character){
          this.character = character;
        }
      },
      (err) => {
        console.log("Character was not properly loaded");
        console.log(err);
      }
    )
  }

}
