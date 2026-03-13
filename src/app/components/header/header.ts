import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private isClicking = false;

  onMouseEnter(): void {
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.remove('collapsed');
  }

  onMouseLeave(): void {
    if (this.isClicking) return; // Ne pas réduire pendant un clic
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.add('collapsed');
  }

  onMouseDown(): void {
    this.isClicking = true;
  }

  onMouseUp(): void {
    // Petit délai pour laisser la navigation se faire
    setTimeout(() => {
      this.isClicking = false;
    }, 300);
  }
}