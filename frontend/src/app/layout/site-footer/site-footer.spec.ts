import { TestBed } from '@angular/core/testing';
import { SiteFooter } from './site-footer';

describe('SiteFooter', () => {
  it('enlaza los perfiles en una pestaña nueva', async () => {
    await TestBed.configureTestingModule({ imports: [SiteFooter] }).compileComponents();
    const fixture = TestBed.createComponent(SiteFooter);
    await fixture.whenStable();
    const links = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLAnchorElement>('ul a'),
    );
    expect(links.map((a) => a.textContent?.trim())).toEqual(['LinkedIn', 'GitHub']);
    for (const a of links) expect(a.rel).toContain('noopener');
  });
});
