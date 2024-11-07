window.addEventListener('load', function () {
    const loadingScreen = document.getElementById('loading-screen');

    const conteudoPagina = document.getElementById('conteudoPagina');

    const filhos = conteudoPagina.querySelectorAll('*');

    const minLoadingTime = 2000; // Tempo mínimo de 2 segundos

    // Tempo de início do carregamento
    const startTime = Date.now();

    // Calcula o tempo restante e define um temporizador para ocultar a tela
    const hideLoadingScreen = () => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = minLoadingTime - elapsedTime;

        // Se o tempo mínimo já passou, oculta imediatamente
        if (remainingTime <= 0) {
            loadingScreen.style.opacity = '0';
            filhos.forEach((filho) => {
                filho.style.opacity = '1';
            });
            setTimeout(() => loadingScreen.style.display = 'none', 500);
        } else {
            // Caso contrário, aguarda o tempo restante
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                filhos.forEach((filho) => {
                    filho.style.opacity = '1';
                });
                setTimeout(() => loadingScreen.style.display = 'none', 500);
            }, remainingTime);
        }
    };

    hideLoadingScreen();
});



document.addEventListener('DOMContentLoaded', function () {
    const carrosselConteudo = document.querySelector('.carrossel-conteudo');
    const itens = document.querySelectorAll('.item');
    let index = 0;

    const loadingText = document.getElementById('loading-text');
    let isVisible = true;

    // Função para alternar a visibilidade do texto
    const blinkText = setInterval(() => {
        loadingText.style.opacity = isVisible ? '1' : '0';
        isVisible = !isVisible; // Alterna o estado
    }, 300); // Tempo de piscar em milissegundos

    // Simulando um carregamento
    setTimeout(() => {
        const conteudoPagina = document.getElementById('conteudoPagina');

        // Tornar o conteúdo visível
        conteudoPagina.style.opacity = '1';

        // Parar a animação de piscar
        clearInterval(blinkText);
        loadingText.style.display = 'none'; // Remover o texto de carregamento
    }, 3000); // Altere o tempo conforme necessário

    function atualizarCarrossel() {
        const larguraItem = itens[0].clientWidth;
        const larguraCarrossel = document.querySelector('.carrossel').clientWidth;
        const offset = (larguraCarrossel - larguraItem) / 2;

        carrosselConteudo.style.transform = `translateX(${-index * larguraItem + offset}px)`;

        // Atualiza as classes de estilo dos itens
        itens.forEach((item, i) => {
            if (i === index) {
                item.classList.add('ativo');
                item.classList.remove('inativo');
            } else {
                item.classList.add('inativo');
                item.classList.remove('ativo');
            }
        });
    }

    document.getElementById('nextBtn').addEventListener('click', () => {
        index = (index + 1) % itens.length; // Mover para o próximo item
        atualizarCarrossel();
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
        index = (index - 1 + itens.length) % itens.length; // Mover para o item anterior
        atualizarCarrossel();
    });

    // Inicializa o carrossel
    atualizarCarrossel();
});
