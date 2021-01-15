import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterList } from 'src/app/model/characters';
import { ListCharactersService } from 'src/app/services/list-characters.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  characters: CharacterList;
  currentPage: number;
  count: number;
  pages: number;
  next: any;
  prev: any;

  favorites: number[];

  constructor(private listCharactersService: ListCharactersService,
              private router: Router) {
                this.getCharacters(1);
               }

  ngOnInit(): void {
    this.getCharacters(1);
  }

  getCharacters(page: number){
    this.listCharactersService.getCharacters(page).subscribe(
      (characters) => {
        console.log(characters);
        if(characters.results.length > 0) {
          this.characters = characters;
          this.currentPage = Math.ceil(characters.results[1].id / 20);
          this.count = characters.info.count;
          this.pages = characters.info.pages;
          this.next = characters.info.next;
          this.prev = characters.info.prev;
        }
      },
      (err) => {
        console.log("Characters were not loaded correctly");
        console.log(err);
      }
    )
  }

  addFavorite(id: number){
    this.favorites.push(id);
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }

  removeFavorite(id: number){
    let remove = this.favorites.find(element => element == id);
    let tempFavorites: number[];

    for(let i = 0; i < this.favorites.length; i++) {
      if(this.favorites[i] !== remove){
        tempFavorites.push(this.favorites[i]);
      }
    }

    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }

  //Pagination
  initialRange(): number{
    if(this.prev === null){
      return 1;
    } else if(this.next === null){
      let records = this.count;
      do{
        records--;
      } while(records % this.characters.results.length != 0);
      return records + 1;
    } else{
      return this.characters.results[this.characters.results.length-1].id - this.characters.results.length + 1;
    }
  }

  finalRange(): number{
    if(this.next === null){
      return this.count;
    } else{
      return this.characters.results[this.characters.results.length-1].id;
    }
  }

  isFirst(): boolean{
    return this.prev === null ? true : false;
  }

  isLast(): boolean{
    return this.next === null ? true : false;
  }
}
