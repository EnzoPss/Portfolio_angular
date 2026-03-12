import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, TemplateRef } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-projets',
  imports: [CommonModule, NgTemplateOutlet],
  templateUrl: './projets.html',
  styleUrl: './projets.css',
})
export class Projets implements OnInit, AfterViewInit {

  @ViewChildren('card0, card1, card2, card3, card4, card5')
  cardTemplateList!: QueryList<TemplateRef<any>>;

  cardTemplates: TemplateRef<any>[] = [];

  currentIndex = 0;
  visibleCards: { id: number; index: number; position: number }[] = [];

  get total(): number {
    return this.cardTemplates.length;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.cardTemplates = this.cardTemplateList.toArray();
    this.updateVisible();
  }

  updateVisible(): void {
    this.visibleCards = [-2, -1, 0, 1, 2].map(pos => {
      const index = ((this.currentIndex + pos) % this.total + this.total) % this.total;
      return { id: index, index, position: pos };
    });
  }

  goTo(position: number): void {
    if (position === 0) return;
    this.currentIndex = ((this.currentIndex + position) % this.total + this.total) % this.total;
    this.updateVisible();
  }
}