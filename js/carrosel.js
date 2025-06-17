document.addEventListener('DOMContentLoaded', function() {
    // Seleciona os elementos do carrossel
    const carrossel = document.getElementById('product-carousel');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const produtos = document.querySelectorAll('.produto');
    
    // Configurações do carrossel
    const itemWidth = produtos[0].offsetWidth + 25; // Largura do item + gap
    let currentPosition = 0;
    let maxVisibleItems = 4; // Quantidade padrão de itens visíveis
    let autoScrollInterval;
    
    // Calcula a posição máxima baseada na largura da tela
    function calculateMaxPosition() {
        const containerWidth = carrossel.parentElement.offsetWidth;
        maxVisibleItems = Math.max(1, Math.floor(containerWidth / itemWidth));
        return -((produtos.length - maxVisibleItems) * itemWidth);
    }
    
    let maxPosition = calculateMaxPosition();
    
    // Função para mover o carrossel
    function moveCarousel(direction) {
        if (direction === 'prev') {
            currentPosition = Math.min(currentPosition + itemWidth, 0);
        } else {
            currentPosition = Math.max(currentPosition - itemWidth, maxPosition);
        }
        carrossel.style.transform = `translateX(${currentPosition}px)`;
    }
    
    // Event listeners para os botões
    prevBtn.addEventListener('click', function() {
        clearInterval(autoScrollInterval);
        moveCarousel('prev');
    });
    
    nextBtn.addEventListener('click', function() {
        clearInterval(autoScrollInterval);
        moveCarousel('next');
    });
    
    // Toque para dispositivos móveis
    let touchStartX = 0;
    let touchEndX = 0;
    
    carrossel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(autoScrollInterval);
    }, {passive: true});
    
    carrossel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) { // Limiar de 50px para considerar como swipe
            moveCarousel('next');
        } else if (touchEndX > touchStartX + 50) {
            moveCarousel('prev');
        }
    }
    
    // Inicia rotação automática
    function startAutoScroll() {
        autoScrollInterval = setInterval(function() {
            if (currentPosition <= maxPosition) {
                // Volta para o primeiro item quando chega no final
                currentPosition = 0;
                carrossel.style.transition = 'none';
                carrossel.style.transform = `translateX(${currentPosition}px)`;
                
                // Força um reflow para aplicar a mudança sem transição
                void carrossel.offsetWidth;
                
                // Restaura a transição
                carrossel.style.transition = 'transform 0.5s ease';
            } else {
                moveCarousel('next');
            }
        }, 3000); // Muda a cada 3 segundos
    }
    
    // Pausa a rotação quando o mouse está sobre o carrossel
    carrossel.addEventListener('mouseenter', function() {
        clearInterval(autoScrollInterval);
    });
    
    carrossel.addEventListener('mouseleave', startAutoScroll);
    
    // Redimensionamento da janela
    window.addEventListener('resize', function() {
        maxPosition = calculateMaxPosition();
        // Ajusta a posição atual se necessário
        currentPosition = Math.max(currentPosition, maxPosition);
        carrossel.style.transform = `translateX(${currentPosition}px)`;
    });
    
    // Inicia o carrossel
    startAutoScroll();
});