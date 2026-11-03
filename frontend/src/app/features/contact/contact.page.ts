import { Component } from '@angular/core';
import { PROFILE } from '../../core/data/profile';

/** Contacto: correo y perfiles (sin formulario todavía). */
@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
})
export class ContactPage {
  protected readonly email = PROFILE.email;
  protected readonly links = PROFILE.links;
}
