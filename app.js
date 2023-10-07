var numeroMax = 100;
var texto = ['Jogo do número secreto', `Escolha um número entre 1 a ${numeroMax}`];
const gerarNumeroSecreto = () => parseInt(Math.random() * numeroMax) + 1;
var numeroSecreto;
var tentativas;
var chute2;

reiniciarJogo()

function reiniciarJogo() {
    limparCampo();
    exibirTextoNaTela('h1', texto[0]);
    exibirTextoNaTela('p', texto[1]);
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('chute').removeAttribute('disabled');
    numeroSecreto = gerarNumeroSecreto();
    tentativas = 0;
    chute2 = null;
}

function exibirTextoNaTela(tag, texto) {
    // "Entrar" na tag do elemento campo
    var campo = document.querySelector(tag);
    // Mudar o conteúdo da tag do elemento campo
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function verificarChute() {
    var chute = document.querySelector('input').value;
    if (chute == chute2) {
        return;
    } else if (chute == '') {
        return;
    } else if (chute > numeroMax || chute < 1) {
        limparCampo();
        return;
    }

    tentativas++;
    var pluralTentativa = tentativas == 1 ? '' : 's';
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Você acertou!');
        exibirTextoNaTela('p', `Você descobriu o número secreto em \n${tentativas} tentativa${pluralTentativa}!`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chute').setAttribute('disabled', true);
    } else if (chute > numeroSecreto) {
        exibirTextoNaTela('p', `O número secreto é menor que ${chute}!`);
        limparCampo();
    } else {
        exibirTextoNaTela('p', `O número secreto é maior que ${chute}!`);
        limparCampo();
    }
    chute2 = chute;
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}
