import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-competences',
  imports: [],
  templateUrl: './competences.html',
  styleUrl: './competences.css',
})
export class Competences implements AfterViewInit {

  @ViewChild('cvCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    this.loadPdfJs().then(() => this.renderPdf());
  }

  private loadPdfJs(): Promise<void> {
    return new Promise((resolve) => {
      if ((window as any).pdfjsLib) {
        resolve();
        return;
      }
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