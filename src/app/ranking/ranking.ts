import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { timer } from 'rxjs';

interface Jogador {
  nome: string;
  pontuacao: number | string;
}

@Component({
  selector: 'app-ranking',
  imports: [RouterLink],
  templateUrl: './ranking.html',
  styleUrl: './ranking.css',
})
export class Ranking implements OnInit{

  ranking: Jogador[] = [];
  exibeConfirmacaoZerarRanking = signal(false);
  mensagemParagrafoConfirmacao = "";
  exibeMensagemSucesso = signal(false);

  ngOnInit() {
    this.ranking = JSON.parse(localStorage.getItem("ranking") || '[]');
    this.atualizarRankingNaPagina();
  }

  atualizarRankingNaPagina() {
    const quantidadeColocacoesRanking = 5;
    while (this.ranking.length < 5) {
      this.ranking.push({ nome: "-", pontuacao: "-" });
    }
  }

  zerarRanking() {
    localStorage.removeItem("ranking");
    this.ranking = [];
    this.atualizarRankingNaPagina();
    this.esconderConfirmacaoZerarRanking();
    this.mensagemParagrafoConfirmacao = "Ranking zerado com sucesso!";
    this.exibeMensagemSucesso.set(true);
    timer(5000).subscribe(() => {
      this.exibeMensagemSucesso.set(false);
    });
  }

  mostrarConfirmacaoZerarRanking() {
    this.exibeConfirmacaoZerarRanking.set(true);
  }

  esconderConfirmacaoZerarRanking() {
    this.exibeConfirmacaoZerarRanking.set(false);
  }
}
