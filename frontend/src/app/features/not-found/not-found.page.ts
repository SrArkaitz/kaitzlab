import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Página 404. Se prerenderiza en /404 y nginx la sirve con estado 404. */
@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  templateUrl: './not-found.page.html',
})
export class NotFoundPage {}
