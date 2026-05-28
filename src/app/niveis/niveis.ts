import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfiguracaoService } from 'src/app/services/configuracao-service';

@Component({
  selector: 'app-niveis',
  imports: [RouterLink],
  templateUrl: './niveis.html',
  styleUrl: './niveis.css',
})
export class Niveis {
  private configuracaoService = inject(ConfiguracaoService);

  escolherTeclado(teclado: string) {
    this.configuracaoService.setItem('tecladoEscolhido', teclado);
  }
}
