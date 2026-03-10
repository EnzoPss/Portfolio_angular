import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  onMouseEnter(): void {
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.remove('collapsed');
  }

  onMouseLeave(): void {
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.add('collapsed');
  }

}