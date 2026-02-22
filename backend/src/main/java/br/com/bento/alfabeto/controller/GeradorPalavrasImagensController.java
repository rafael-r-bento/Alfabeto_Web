package br.com.bento.alfabeto.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.ChatOptions;
import org.springframework.ai.image.ImageModel;
import org.springframework.ai.image.ImageOptionsBuilder;
import org.springframework.ai.image.ImagePrompt;
import org.springframework.ai.chat.client.advisor.SimpleLoggerAdvisor;

import br.com.bento.alfabeto.domain.DadosPalavraImagem;
import br.com.bento.alfabeto.domain.PalavraImagem;

import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("gerador")
public class GeradorPalavrasImagensController {

    private final ChatClient chatClient;
    private final ImageModel imageModel;

    public GeradorPalavrasImagensController(ChatClient.Builder chatClientBuilder, ImageModel imageModel) {
        this.chatClient = chatClientBuilder.build();
        this.imageModel = imageModel;
    }

    @GetMapping
    public DadosPalavraImagem gerarPalavraEImagem(String categoria) {
        var promptPalavra = """
            Você é um gerador de palavras e deve responder apenas 5 nomes de
            palavras da categoria informada, separados por vírgula
            
            Exemplos de uso:
        
            Pergunta: cores
            Resposta: amarelo, branco, cinza, rosa, verde 

            Pergunta: frutas
            Resposta: ameixa, laranja, maçã, manga, uva
            """;

        String palavrasEnumeradas = this.chatClient.prompt()
            .system(promptPalavra)
            .user(categoria)
            .options(ChatOptions.builder()
                     .temperature(2.0)
                     .build())
            .advisors(new SimpleLoggerAdvisor())
            .call()
            .content();

        String[] palavras = palavrasEnumeradas.split(",");

        var opcoes = ImageOptionsBuilder.builder()
            .responseFormat("url")
            .height(1024)
            .width(1024)
            .build();

        List<PalavraImagem> itens = new ArrayList<>();

        for (int i = 0; i < 5; i++) {
            String promptImagem = """
                Gere imagem de %s. Estilo fiel ao item informado.
                Levemente cartunesco.
                """.formatted(palavras[i]);

            String imagemUrl = this.imageModel
                .call(new ImagePrompt(promptImagem, opcoes))
                .getResult()
                .getOutput()
                .getUrl();

            itens.add(new PalavraImagem(palavras[i], imagemUrl));
        }

        return new DadosPalavraImagem(
            categoria,
            itens
        );
    }
}
