import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-parcours',
  imports: [],
  templateUrl: './parcours.html',
  styleUrl: './parcours.css',
})
export class Parcours implements AfterViewInit {

  ngAfterViewInit(): void {
    const items = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.3 });

    items.forEach(item => observer.observe(item));
  }

}