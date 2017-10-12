import { Component, Input, DoCheck, OnInit } from '@angular/core';
import { DoCheckComponent } from './do-check.component';

@Component({
  selector: 'do-check-parent',
  template: `
  <div class="parent">
    <h2>DoCheck</h2>
    <i>Enter a new hero</i><br>
    <input [(ngModel)]="newHero"
           (keyup.enter)="addHero()"
           placeholder="Hero name">
    <button (click)="resetHeroes()">Reset</button>

    <p><i>Click a hero to remove</i></p>
    <div *ngFor="#h of heroes, #i=index"
         (click)="removeHero(i)">{{h}}</div>

    <do-check [heroes]="heroes"></do-check>
  </div>
  `,
  styles: ['.parent {background: beige}'],
  directives: [DoCheckComponent],
})
export class DoCheckParentComponent {
  heroes:string[];
  newHero:string;

  constructor() {
    this.resetHeroes();
  }

  addHero(){
    let name = this.newHero.trim();
    name && this.heroes.push(name);
  }

  removeHero(heroIx:number){
    this.heroes.splice(heroIx, 1);
  }

  resetHeroes() {
    this.heroes = DoCheckParentComponent.originalHeroes.slice();
    this.newHero = '';
  }

  static originalHeroes = ['Magneta', 'Mr. IQ', 'Voltana'];
}