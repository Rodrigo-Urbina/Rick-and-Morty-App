import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterList } from 'src/app/model/characters';
import { ListCharactersService } from 'src/app/services/list-characters.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  characters: CharacterList;

  constructor(private listCharactersService: ListCharactersService,
              private route: ActivatedRoute) {
                const ids = this.route.snapshot.paramMap.get('ids');
                if(ids){
                  this.getfavCharacters(ids);
                } else {
                  console.log("There are no ids to load or format is invalid");
                }
   }

  ngOnInit(): void {
    const ids = this.route.snapshot.paramMap.get('ids');
    if(ids){
      this.getfavCharacters(ids);
    } else {
      console.log("There are no ids to load or format is invalid");
    }

  }

  getfavCharacters(ids: string){
    this.listCharactersService.getMultipleCharacters(ids).subscribe(
      (characters) => {
        if(characters.results.length > 0){
          this.characters = characters;
        }
      },
      (err) => {
        console.log("Favorite Characters were not loaded");
        console.log(err);
      }
    )
  }

}
