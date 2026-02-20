import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import confetti from 'canvas-confetti';

interface Jogador {
  nome: string;
  pontuacao: number;
}

@Component({
  selector: 'app-pontuacao',
  imports: [RouterLink],
  templateUrl: './pontuacao.html',
  styleUrl: './pontuacao.css',
})
export class Pontuacao implements OnInit {
  private router = inject(Router);

  pontuacao = 0;
  imagemPontuacao = "";
  mensagemPontuacao = "";
  mensagemJogadorRanking = "";
  
  ngOnInit() {
    this.pontuacao = parseInt(localStorage.getItem('pontuacao') || '0', 10);

    if (this.pontuacao === 100) {
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
      });
      this.imagemPontuacao = '/pontuacao/0erros.png';
      this.mensagemPontuacao = "PARABÉNS! VOCÊ FOI SENSACIONAL!";
    } else if (this.pontuacao >= 90) {
      this.imagemPontuacao = '/pontuacao/2erros.png';
      this.mensagemPontuacao = "EXCELENTE, QUASE PERFEITO!";
    } else if (this.pontuacao >= 80) {
      this.imagemPontuacao = '/pontuacao/4erros.png';
      this.mensagemPontuacao = "MANDOU MUITO BEM!";
    } else if (this.pontuacao >= 70) {
        this.imagemPontuacao = '/this.pontuacao/6erros.png';
        this.mensagemPontuacao = "ÓTIMO TRABALHO!";
    } else if (this.pontuacao >= 60) {
        this.imagemPontuacao = '/this.pontuacao/8erros.png';
        this.mensagemPontuacao = "BOA TENTATIVA, CONTINUE ASSIM!";
    } else if (this.pontuacao >= 50) {
        this.imagemPontuacao = '/this.pontuacao/10erros.png';
        this.mensagemPontuacao = "VOCÊ ESTÁ INDO BEM!";
    } else if (this.pontuacao >= 40) {
        this.imagemPontuacao = '/this.pontuacao/12erros.png';
        this.mensagemPontuacao = "CONTINUE TENTANDO!";
    } else if (this.pontuacao >= 30) {
        this.imagemPontuacao = '/this.pontuacao/14erros.png';
        this.mensagemPontuacao = "NÃO DESISTA, VOCÊ CONSEGUE!";
    } else if (this.pontuacao >= 20) {
        this.imagemPontuacao = '/this.pontuacao/16erros.png';
        this.mensagemPontuacao = "PERSISTÊNCIA É A CHAVE!";
    } else if (this.pontuacao >= 10) {
        this.imagemPontuacao = '/this.pontuacao/18erros.png';
        this.mensagemPontuacao = "CADA ERRO É UM PASSO PARA O ACERTO!";
    } else {
        this.imagemPontuacao = '/this.pontuacao/20erros.png';
        this.mensagemPontuacao = "NÃO FOI DESSA VEZ, TENTE NOVAMENTE!";
    }

    const ranking = JSON.parse(localStorage.getItem("ranking") || '[]');
    const nomeJogador = localStorage.getItem('nome-jogador');
    console.log("nome do jogador: " + nomeJogador);

    if (ranking.some((jogador: Jogador) => jogador.nome === nomeJogador)) {
      console.log("Jogador encontrado no ranking");
      this.mensagemJogadorRanking = "VOCÊ ESTÁ NO RANKING!";
    }
  }

  repetirDesafio() {
    const contextoSelecionado = localStorage.getItem('contextoSelecionado');

    if (contextoSelecionado) {
      this.router.navigate(['/jogo']);
    } else {
      this.router.navigate(['/contextos']);
    }
  }
}
