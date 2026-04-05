import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Configuracao } from 'src/app/services/configuracao';

@Component({
  selector: 'app-contextos',
  imports: [RouterLink],
  templateUrl: './contextos.html',
  styleUrl: './contextos.css',
})
export class Contextos {
  private configuracaoService = inject(Configuracao);

  escolherContexto(contexto: string){
    localStorage.setItem('contextoSelecionado', contexto);
  }
}
