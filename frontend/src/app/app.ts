import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/** Raíz de la app: solo pinta la ruta activa. */
@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {}
