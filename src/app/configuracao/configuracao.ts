import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-configuracao',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './configuracao.html',
  styleUrl: './configuracao.css',
  preserveWhitespaces: true
})
export class Configuracao implements OnInit {
  private router = inject(Router);

  letras = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z";

  tamanhoLetra: string = "maiuscula";
  tipoLetra: string = "bastao";

  ngOnInit() {
    this.aplicarConfiguracoes();
  }

  salvarConfiguracoes() {
    localStorage.setItem('letra', this.tamanhoLetra);
    localStorage.setItem('tipo', this.tipoLetra);

    this.aplicarConfiguracoes();

    this.router.navigate(['/']);
  }

  aplicarConfiguracoes() {
    const tamanhoLetra = localStorage.getItem('letra');
    const tipoLetra = localStorage.getItem('tipo');

    if (tamanhoLetra === 'maiuscula') {
      this.letras = this.letras.toUpperCase();
    } else if (tamanhoLetra === 'minuscula') {
      this.letras = this.letras.toLowerCase();
    }

    if (tamanhoLetra) {
      this.tamanhoLetra = tamanhoLetra;
    }

    if (tipoLetra) {
      this.tipoLetra = tipoLetra;
    }
  }

  letraCursiva() {
    this.tipoLetra = 'cursiva';
  }

  letraBastao() {
    this.tipoLetra = 'bastao';
  }

  letraMaiuscula() {
    this.letras = this.letras.toUpperCase();
  }

  letraMinuscula() {
    this.letras = this.letras.toLowerCase();
  }
}
