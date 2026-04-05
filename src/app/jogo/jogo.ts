import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { Configuracao } from 'src/app/services/configuracao';
import { environment } from 'src/environments/environment';

interface IPalavraImagem {
  palavraGerada: string;
  imagemUrl: string;
}

interface IGeradorResposta {
  categoria: string;
  itens: IPalavraImagem[];
}

interface Contexto {
  nome: string;
}

@Component({
  selector: 'app-jogo',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './jogo.html',
  styleUrl: './jogo.css',
})
export class Jogo implements OnInit {
  private router = inject(Router);
  private http = inject(HttpClient);
  private configuracaoService = inject(Configuracao);

  tecladoEscolhido = localStorage.getItem('tecladoEscolhido');
  contextoSelecionado = localStorage.getItem('contextoSelecionado');

  quantidadeDesafios = 5;
  quantidadeDesafiosJogados = 0;

  palavraSecreta: string = "";
  palavraAtual: string[] = [];
  palavrasSorteadas: string[] = [];

  contadorDeErros = 0;
  quantidadeDeTentativas = 0;

  imagemAtual = signal("");
  temaAtual: string = "";

  letrasClicadas: {
    [key: string]: 'acerto' | 'erro'
  } = {};

  textoMostrarConfirmacaoSairTela: string = "";
  exibeConfirmacaoSairTela = false;
  urlDestino = "";

  botoesDesabilitados = false;

  feedbackMensagem = "";
  exibeFeedback = signal(false);

  pontuacao = 0;
  exibeCaixaNome = signal(false);

  exibeHamburguerBotoesMobile = false;

  pontuacaoForm = new FormGroup({
    nomeJogador: new FormControl('', [Validators.required])
  });

  geradorResposta: IGeradorResposta = {
    categoria: '',
    itens: []
  };

  contextos: Contexto[] = [
    { nome: "cores" },
    { nome: "frutas" },
    { nome: "brinquedos" },
    { nome: "animais" },
    { nome: "países" },
    { nome: "objetos" },
    { nome: "corpo humano" }
  ]

  ngOnInit(): void {
    if (!this.contextoSelecionado) {
      alert('Nenhum contexto foi selecionado');
      this.router.navigate(['/contextos']);
      return;
    }

    const contextoAtual = this.contextos.find(
      c => c.nome.toLowerCase() === this.contextoSelecionado!.toLowerCase()
    );

    if (!contextoAtual) return;

    this.temaAtual = contextoAtual.nome;

    this.http.get<IGeradorResposta>(
      `${environment.apiUrl}/gerador?categoria=${this.temaAtual}`
    ).subscribe(data => {
      this.geradorResposta = data;
      console.log(this.geradorResposta);
      this.iniciarDesafio();
    });
  }

  iniciarDesafio() {
    this.palavraSecreta = this.geradorResposta.itens[this.quantidadeDesafiosJogados].palavraGerada;
    this.imagemAtual.set(this.geradorResposta.itens[this.quantidadeDesafiosJogados].imagemUrl);
    console.log(this.imagemAtual);

    this.palavrasSorteadas.push(this.palavraSecreta);

    this.palavraAtual = Array(this.palavraSecreta.length).fill('_');

    console.log("Palavra secreta sorteada:", this.palavraSecreta);

    this.exibirPalavra();
  }

  exibirPalavra() {
    if (this.tecladoEscolhido === 'vogais') {
      for (let i = 0; i < this.palavraSecreta.length; i++) {
        if (this.isConsoante(this.palavraSecreta[i].toUpperCase())) {
          this.palavraAtual[i] = this.palavraSecreta[i];
        }
      }
    } else if (this.tecladoEscolhido === 'consoantes') {
      for (let i = 0; i < this.palavraSecreta.length; i++) {
        if (this.isVogal(this.palavraSecreta[i].toUpperCase())) {
          this.palavraAtual[i] = this.palavraSecreta[i];
        }
      }
    }
  }

  isVogal(letra: string) {
    const letraNormalizada = letra.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    return ['A','E','I','O','U'].includes(letraNormalizada);
  }

  isConsoante(letra: string) {
    return !this.isVogal(letra);
  }

  letraClicada(letra: string) {
    let acertou = false;
    
    for (let i = 0; i < this.palavraSecreta.length; i++) {
        const letraNormalizadaPalavra = this.palavraSecreta[i].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const letraNormalizadaClicada = letra.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        if (letraNormalizadaPalavra === letraNormalizadaClicada) {
            this.palavraAtual[i] = this.palavraSecreta[i];
            acertou = true;
        }
    } 

    this.quantidadeDeTentativas++;

    if (!acertou) {
      this.contadorDeErros++;
      this.letrasClicadas[letra] = 'erro';
    } else {
      this.letrasClicadas[letra] = 'acerto';
    }
    
    this.exibirPalavra();

    if (!this.palavraAtual.includes("_")) {
        this.proximaRodada();
    }
  }

  desabilitarBotoes() {
    this.botoesDesabilitados = true;
  }

  proximaRodada() {
    this.desabilitarBotoes();
    this.quantidadeDesafiosJogados++;

    this.mostrarFeedback("Parabéns!");

    if (this.quantidadeDesafiosJogados < this.quantidadeDesafios) {
      timer(1000).subscribe(() => {
        this.resetarBotoes();
        this.iniciarDesafio();
      });
    } else {
      timer(1000).subscribe(() => {
        this.palavrasSorteadas = [];
        this.finalizarPartida();
      });
    }
  }

  resetarBotoes() {
    this.letrasClicadas = {};
    this.botoesDesabilitados = false;
  }

  finalizarPartida() {
    this.desabilitarBotoes();
    this.exibirPontuacao();
    this.pontuacao = parseInt(localStorage.getItem('pontuacao') || '0', 10);
    this.exibeCaixaNome.set(true);
  }

  mostrarFeedback(mensagem: string) {
    this.feedbackMensagem = mensagem;
    this.exibeFeedback.set(true);

    timer(3000).subscribe(() => {
      this.exibeFeedback.set(false);
    });
  }

  exibirPontuacao() {
    const quantidadeAcertos = this.quantidadeDeTentativas - this.contadorDeErros;
    let pontuacao = (quantidadeAcertos / this.quantidadeDeTentativas) * 100;
    localStorage.setItem('pontuacao', pontuacao.toFixed(2));
  }

  exibirOcultarBotoes() {
    this.exibeHamburguerBotoesMobile = !this.exibeHamburguerBotoesMobile;
  }

  mostrarConfirmacaoSairTela(event: any, texto: string, url: string) {
    event.preventDefault();
    this.textoMostrarConfirmacaoSairTela = texto;
    this.exibeConfirmacaoSairTela = true;
    this.urlDestino = url;
  }

  esconderConfirmacaoSairTela() {
    this.exibeConfirmacaoSairTela = false;
  }

  redirecionar() {
    if (!this.urlDestino) return;
    
    if (this.isExternalUrl(this.urlDestino)) {
      window.location.href = this.urlDestino;
    } else {
      this.router.navigate([this.urlDestino]);
    }
  }

  get mostrarVogais() {
    return this.tecladoEscolhido === 'vogais';
  }

  get mostrarConsoantes() {
    return this.tecladoEscolhido === 'consoantes';
  }

  get mostrarAlfabeto() {
    return !this.tecladoEscolhido || this.tecladoEscolhido === 'alfabeto';
  }

  imagemErro(event: any) {
    event.target.src = '/error.png';
  }

  onSubmit() {
    const nomeJogador = this.pontuacaoForm.get('nomeJogador')?.value || '';
    localStorage.setItem('nome-jogador', nomeJogador);

    if (nomeJogador) {
      let ranking = JSON.parse(localStorage.getItem("ranking") || '[]');
      ranking.push({ nome: nomeJogador, pontuacao: this.pontuacao });
      ranking.sort((a: any, b: any) => b.pontuacao - a.pontuacao);
      ranking = ranking.slice(0, 5);
      localStorage.setItem("ranking", JSON.stringify(ranking));
      this.exibeCaixaNome.set(false);
      timer(1000).subscribe(() => {
        this.router.navigate(['/pontuacao']);
      });
    }
  }

  private isExternalUrl(url: string): boolean {
    return /^(https?:\/\/|www\.)/i.test(url);
  }
}
