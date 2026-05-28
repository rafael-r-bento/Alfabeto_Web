import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfiguracaoService } from 'src/app/services/configuracao-service';

@Component({
  selector: 'app-contextos',
  imports: [RouterLink],
  templateUrl: './contextos.html',
  styleUrl: './contextos.css',
})
export class Contextos {
  private configuracaoService = inject(ConfiguracaoService);

  escolherContexto(contexto: string){
    this.configuracaoService.setItem('contextoSelecionado', contexto);
  }
}
