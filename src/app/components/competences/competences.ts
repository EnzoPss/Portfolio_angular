import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SkillImage {
  file: string;
  name: string;
  folder: string;
  isSeparator?: boolean;
}

interface Category {
  name: string;
  folder: string;
  images: SkillImage[];
}

@Component({
  selector: 'app-competences',
  imports: [CommonModule],
  templateUrl: './competences.html',
  styleUrl: './competences.css',
})
export class Competences implements AfterViewInit {
  @ViewChild('cvCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  categories: Category[] = [
    {
      name: 'Front-end',
      folder: 'Front-end',
      images: [
        { file: 'html5.png', name: 'HTML',       folder: 'Front-end' },
        { file: 'css3.png',  name: 'CSS',         folder: 'Front-end' },
        { file: 'ts.png',    name: 'TypeScript',  folder: 'Front-end' },
        { file: 'js.png',    name: 'JavaScript',  folder: 'Front-end' },
      ],
    },
    {
      name: 'Back-end & BDD',
      folder: 'Back-end',
      images: [
        { file: 'python.png', name: 'Python',  folder: 'Back-end' },
        { file: 'php.png',    name: 'PHP',     folder: 'Back-end' },
        { file: 'kotlin.png', name: 'Kotlin',  folder: 'Back-end' },
        { file: 'sql.png',    name: 'SQL',     folder: 'Back-end' },
        { file: '', name: '', folder: '', isSeparator: true },
        { file: 'xampp.png', name: 'XAMPP', folder: 'Bdd' },
        { file: 'mysql.png',   name: 'MySQL',   folder: 'Bdd' },
        { file: 'mariadb.png', name: 'MariaDB', folder: 'Bdd' },
        { file: '', name: '', folder: '', isSeparator: true },
      ],
    },
    {
      name: 'Frameworks',
      folder: 'Frameworks',
      images: [
        { file: 'angular.png',    name: 'Angular',    folder: 'Frameworks' },
        { file: 'springboot.png', name: 'Springboot', folder: 'Frameworks' },
      ],
    },
    {
      name: 'Game-engine',
      folder: 'Game-engine',
      images: [
        { file: 'pygame.png',       name: 'Pygame',        folder: 'Game-engine' },
        { file: 'unrealEngine.png', name: 'Unreal Engine',  folder: 'Game-engine' },
      ],
    },
  ];

  getAnimDuration(images: SkillImage[]): number {
    return Math.max(8, images.length * 3);
  }

  getTrackWidth(images: SkillImage[]): string {
  const itemWidth = 90 + 12;
  const separatorWidth = 30 + 12;
  const total = images.reduce((acc, img) => {
    return acc + (img.isSeparator ? separatorWidth : itemWidth);
  }, 0);
  return `${total}px`;
}

  repeat(images: SkillImage[]): SkillImage[] {
    return [...images, ...images, ...images, ...images];
  }

  ngAfterViewInit(): void {
    this.loadPdfJs().then(() => this.renderPdf());
  }

  private loadPdfJs(): Promise<void> {
    return new Promise((resolve) => {
      if ((window as any).pdfjsLib) { resolve(); return; }
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      script.onload = () => {
        (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        resolve();
      };
      document.head.appendChild(script);
    });
  }

  private async renderPdf(): Promise<void> {
    const pdfjsLib = (window as any).pdfjsLib;
    const pdf = await pdfjsLib.getDocument('img/CV_Enzo_Pousse.pdf').promise;
    const page = await pdf.getPage(1);
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d')!;
    const viewport = page.getViewport({ scale: 0.8 });
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: context, viewport }).promise;
  }
}