const perguntaElemento = document.getElementById('pergunta');
const respostaInput = document.getElementById('resposta');
const enviarRespostaBotao = document.getElementById('enviarResposta');
const feedbackElemento = document.getElementById('feedback');
const pontuacaoElemento = document.getElementById('pontuacao');
const rodadaElemento = document.getElementById('rodada');

let rodadaAtual = 1;
let pontuacao = 0;
let perguntaAtual;
let tipoCalculoAtual;
const totalRodadas = 10;

function gerarPergunta() {
    const tipo = Math.floor(Math.random() * 4); // 0: Operações Básicas, 1: Cálculo Mental, 2: Equações, 3: Lógica
    tipoCalculoAtual = tipo;

    switch (tipo) {
        case 0:
            gerarPerguntaOperacoesBasicas();
            break;
        case 1:
            gerarPerguntaCalculoMental();
            break;
        case 2:
            gerarPerguntaEquacoes();
            break;
        case 3:
            gerarPerguntaLogica();
            break;
    }
}

function gerarPerguntaOperacoesBasicas() {
    const operacoes = ['+', '-', '*', '/'];
    const operacao = operacoes[Math.floor(Math.random() * operacoes.length)];
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    let perguntaTexto;
    let respostaCorreta;

    switch (operacao) {
        case '+':
            perguntaTexto = `Quanto é ${num1} + ${num2}?`;
            respostaCorreta = num1 + num2;
            break;
        case '-':
            perguntaTexto = `Quanto é ${Math.max(num1, num2)} - ${Math.min(num1, num2)}?`;
            respostaCorreta = Math.max(num1, num2) - Math.min(num1, num2);
            break;
        case '*':
            perguntaTexto = `Quanto é ${num1} × ${num2}?`;
            respostaCorreta = num1 * num2;
            break;
        case '/':
            respostaCorreta = Math.floor(num1 * num2);
            perguntaTexto = `Quanto é ${respostaCorreta} ÷ ${num2}?`;
            break;
    }
    perguntaAtual = respostaCorreta;
    perguntaElemento.textContent = perguntaTexto;
}

function gerarPerguntaCalculoMental() {
    const num1 = Math.floor(Math.random() * 15) + 5;
    const num2 = Math.floor(Math.random() * 15) + 5;
    const perguntaTexto = `Quanto é ${num1} + ${num2}?`;
    perguntaAtual = num1 + num2;
    perguntaElemento.textContent = perguntaTexto;
    // Aqui podemos adicionar um temporizador para o cálculo mental
}

function gerarPerguntaEquacoes() {
    const a = Math.floor(Math.random() * 5) + 1;
    const b = Math.floor(Math.random() * 20) + 5;
    const operacao = Math.random() < 0.5 ? '+' : '-';
    let x;
    let perguntaTexto;

    if (operacao === '+') {
        x = b - a;
        perguntaTexto = `Encontre o valor de x na equação: x + ${a} = ${b}`;
    } else {
        x = b + a;
        perguntaTexto = `Encontre o valor de x na equação: x - ${a} = ${b}`;
    }
    perguntaAtual = x;
    perguntaElemento.textContent = perguntaTexto;
}

function gerarPerguntaLogica() {
    const num1 = Math.floor(Math.random() * 10) + 2;
    const num2 = Math.floor(Math.random() * 5) + 1;
    const perguntaTexto = `Se ${num1} amigos dividem ${num2 * num1} balas igualmente, quantas balas cada um recebe?`;
    perguntaAtual = num2;
    perguntaElemento.textContent = perguntaTexto;
}

function verificarResposta() {
    const respostaJogador = respostaInput.value.trim();

    if (respostaJogador == perguntaAtual) {
        feedbackElemento.textContent = "Resposta Correta! 🎉";
        feedbackElemento.className = 'correto';
        pontuacao++;
        pontuacaoElemento.textContent = `Pontuação: ${pontuacao}`;
    } else {
        feedbackElemento.textContent = `Resposta Incorreta. A resposta era ${perguntaAtual}. 😔`;
        feedbackElemento.className = 'incorreto';
    }

    respostaInput.value = '';
    rodadaAtual++;

    if (rodadaAtual <= totalRodadas) {
        rodadaElemento.textContent = `Rodada: ${rodadaAtual}`;
        gerarPergunta();
    } else {
        finalizarJogo();
    }
}

function finalizarJogo() {
    perguntaElemento.textContent = `Fim do Jogo! Sua pontuação final foi: ${pontuacao} de ${totalRodadas}.`;
    respostaInput.style.display = 'none';
    enviarRespostaBotao.style.display = 'none';
    feedbackElemento.textContent = '';
}

enviarRespostaBotao.addEventListener('click', verificarResposta);

// Carrega a primeira pergunta ao iniciar o jogo
gerarPergunta();