import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-veille',
  imports: [CommonModule],
  templateUrl: './veille.html',
  styleUrl: './veille.css',
})
export class Veille {
  isExpanded = false;

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;

    if (!this.isExpanded) {
      const veille = document.getElementById('veille');
      veille?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}