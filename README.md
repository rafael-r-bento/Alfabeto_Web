# Alfabeto Web

O **Alfabeto Web** é uma aplicação desenvolvida no âmbito do projeto **Apps4Society**, projetada para promover a alfabetização de forma interativa e lúdica. Esta é uma versão Web do aplicativo [Alfabeto](https://github.com/a4s-ufpb/Alfabeto), criado originalmente por Francivaldo Napoleão. O projeto atual é orientado pela professora [Ayla Rebouças](https://github.com/ayladebora) e desenvolvido por [Anna Gabriela](https://github.com/AnnaGabrielaMS), estudante de Sistemas de Informação da UFPB - Campus IV - Rio Tinto.

Observação: este _fork_ utiliza o framework **Angular** para compor a interface web
e **Spring Boot** com **Spring AI** para gerar as palavras e imagens associadas
dinamicamente através de uma API da **OpenAI**, que deve ser configurada pelo usuário
localmente, normalmente através de variável de ambiente ou em arquivo `.env`.

Fluxo:

```
Frontend
   ↓
Spring Boot
   ↓
OpenAI
```

## 🎯 Objetivo

O objetivo da aplicação é auxiliar no processo de alfabetização das pessoas, em especial crianças, oferecendo atividades que estimulam o aprendizado de letras e palavras de maneira envolvente e acessível.

## 🚀 Funcionalidades

- 🎮 **Jogos Educativos**: Atividades interativas para a alfabetização.
- ⚙️ **Configurações Personalizáveis**: Ajuste de parâmetros de jogo e responsividade para melhor adequação ao público-alvo.
- 🏆 **Ranking**: Sistema de pontuação que incentiva a repetição e o progresso.

## 🛠️ Tecnologias Utilizadas

- **HTML5, CSS3, e JavaScript**: Para construção e estilização da interface web.
- **GitHub Pages**: Hospedagem da aplicação.
- **Node.js**
- **Java** + **Spring Boot** + **Spring AI**

## Rodando o projeto em ambiente de desenvolvimento

Pré-requisitos:
- Java (versão 21) instalado
- npm instalado

Clone o repositório:

```bash
git clone https://github.com/rafael-r-bento/Alfabeto_Web.git
cd Alfabeto_Web
```

Observação: será necessário criar uma conta na OpenAI e colocar crédito nesta.
Além disso, deve criar chave de API. Mais informações em https://platform.openai.com.

Crie a seguinte variável de ambiente utilizada pelo projeto:

**~/.bash_profile**
```env
export OPENAI_API_KEY="chave-aqui"
```

Em uma instância de terminal, baixe as dependência e rode o backend:

```bash
cd backend
mvn clean install
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

Em outra instância de terminal, instale as dependências e rode o frontend:

```bash
cd frontend
npm install
npm start
```

O projeto estará disponível em http://localhost:4200.

## Rodando o projeto com Docker

```bash
docker-compose build
docker-compose up
```

O projeto estará disponível em http://localhost:1000.

## 🌐 Como Acessar

A aplicação está disponível online e pode ser acessada pelo link:  
[**Alfabeto Web**](https://a4s-ufpb.github.io/Alfabeto_Web/)

Observação: este _fork_ teve alterações e não corresponde exatamente ao que
está publicado no link acima. Para visualizar as alterações presentes neste
_fork_, é necessário executar o projeto localmente.

## 📚 Sobre o Projeto Apps4Society

O [Apps4Society](https://apps4society.dcx.ufpb.br) é uma iniciativa que incentiva o desenvolvimento de soluções tecnológicas para atender demandas sociais e educacionais.

---
