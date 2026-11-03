import { Component } from '@angular/core';

interface ProfileLink {
  label: string;
  url: string;
}

/** Portada provisional mientras se construye la web (fase 0). */
@Component({
  selector: 'app-coming-soon',
  styleUrl: './coming-soon.page.scss',
  templateUrl: './coming-soon.page.html',
})
export class ComingSoonPage {
  protected readonly links: ProfileLink[] = [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/arkaitz-galisteo-145383160/' },
    { label: 'GitHub', url: 'https://github.com/SrArkaitz' },
  ];
}
