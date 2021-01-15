import { Component, OnInit } from '@angular/core';
import { CharacterList } from './model/characters';
import { ListCharactersService } from './services/list-characters.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rickmorty';

  characters: CharacterList;

  constructor(private listCharactersService: ListCharactersService){

  }

  ngOnInit(): void {

  }

  getFavCharacters(){
    let favIDs = localStorage.getItem("favorites");
    this.listCharactersService.getMultipleCharacters(favIDs).subscribe(
      (characters) => {
        if(characters.results.length > 0){
          this.characters = characters;
        }
      },
      (err) => {
        console.log("Characters were not loaded correctly");
        console.log(err);
      }
    );
  }

}
