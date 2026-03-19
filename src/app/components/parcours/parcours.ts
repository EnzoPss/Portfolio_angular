import { Component, AfterViewInit, TemplateRef } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-parcours',
  imports: [CommonModule, NgTemplateOutlet],
  templateUrl: './parcours.html',
  styleUrl: './parcours.css',
})
export class Parcours implements AfterViewInit {
  activeTemplate: TemplateRef<any> | null = null;
  previousTemplate: TemplateRef<any> | null = null;

  openModal(template: TemplateRef<any>, event: Event, previous?: TemplateRef<any>): void {
    event.preventDefault();
    this.previousTemplate = previous ?? null;
    this.activeTemplate = template;
    document.body.style.overflow = 'hidden';
  }

  goBack(): void {
    this.activeTemplate = this.previousTemplate;
    this.previousTemplate = null;
  }

  closeModal(): void {
    this.activeTemplate = null;
    this.previousTemplate = null;
    document.body.style.overflow = '';
  }

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