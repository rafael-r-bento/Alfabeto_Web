import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Contextos } from './contextos/contextos';
import { Niveis } from './niveis/niveis';
import { Jogo } from './jogo/jogo';
import { Pontuacao } from './pontuacao/pontuacao';
import { Ranking } from './ranking/ranking';
import { Configuracao } from './configuracao/configuracao';

export const routes: Routes = [
  { path: '', component: Home, title: 'Alfabeto' },
  { path: 'contextos', component: Contextos, title: 'Contextos' },
  { path: 'niveis', component: Niveis, title: 'Níveis' },
  { path: 'jogo', component: Jogo, title: 'Jogo' },
  { path: 'pontuacao', component: Pontuacao, title: 'Pontuação' },
  { path: 'ranking', component: Ranking, title: 'Ranking' },
  { path: 'configuracao', component: Configuracao, title: 'Configuração' }
];
