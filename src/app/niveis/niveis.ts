import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Configuracao } from 'src/app/services/configuracao';

@Component({
  selector: 'app-niveis',
  imports: [RouterLink],
  templateUrl: './niveis.html',
  styleUrl: './niveis.css',
})
export class Niveis {
  private configuracaoService = inject(Configuracao);

  escolherTeclado(teclado: string) {
    localStorage.setItem('tecladoEscolhido', teclado);
  }
}
