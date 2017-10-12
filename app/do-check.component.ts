import {Component, Input, DoCheck, OnChanges, OnInit} from '@angular/core';

 @Component({
  selector: 'do-check',
  template: `
  <h4>Heroes Array Changes:</h4>
  <div *ngFor="#log of logs">{{log}}</div>
  `
})
export class DoCheckComponent implements DoCheck, OnChanges, OnInit {
  @Input() heroes:string[];
  logs:string[] = [];
  oldHeroes:string[] = this.heroes;
  oldLength = 0;

  constructor() {
    let is = this.heroes ? 'is' : 'is not';
    this.logs.push(`heroes array ${is} known at construction`);
  }

  ngOnInit() {
    let is = this.heroes ? 'is' : 'is not';
    this.logs.push(`heroes array ${is} known in ngOnInit`);
  }

  ngOnChanges() {
    this.logs.push('OnChanges called !');
  }

  // dans cet exemple la seule façon de modifier la liste est de changer
  // d'identité ou de longueur, c'est donc tout ce que nous vérifions
  ngDoCheck() {
    if (this.oldHeroes !== this.heroes) {
      this.logs.push('heroes array changed');
      this.oldHeroes = this.heroes;
      this.oldLength = this.heroes.length;
    } else {
      let newLength = this.heroes.length;
      let old = this.oldLength;
      if (old !== newLength) {
        let direction = old < newLength ? 'grew' : 'shrunk';
        this.logs.push(`heroes ${direction} from ${old} to ${newLength}`);
        this.oldLength = newLength;
      }
    }
  }
}