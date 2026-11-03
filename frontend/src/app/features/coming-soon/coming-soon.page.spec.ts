import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComingSoonPage } from './coming-soon.page';

describe('ComingSoonPage', () => {
  let fixture: ComponentFixture<ComingSoonPage>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComingSoonPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ComingSoonPage);
    await fixture.whenStable();
    element = fixture.nativeElement as HTMLElement;
  });

  it('muestra el nombre como título principal', () => {
    expect(element.querySelector('h1')?.textContent).toContain('Arkaitz Galisteo');
  });

  it('enlaza a LinkedIn y GitHub en una pestaña nueva', () => {
    const links = Array.from(element.querySelectorAll<HTMLAnchorElement>('.links a'));
    expect(links.map((a) => a.textContent?.trim())).toEqual(['LinkedIn', 'GitHub']);
    for (const a of links) {
      expect(a.target).toBe('_blank');
      expect(a.rel).toContain('noopener');
    }
  });
});
