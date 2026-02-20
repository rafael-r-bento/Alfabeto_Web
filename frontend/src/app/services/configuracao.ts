import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Configuracao {

  salvarConfiguracoes(letra: string | null, tipo: string | null) {
    if (letra) {
      localStorage.setItem('letra', letra);
    }

    if (tipo) {
      localStorage.setItem('tipo', tipo);
    }
  }

  
}
