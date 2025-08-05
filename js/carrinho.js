document.addEventListener('DOMContentLoaded', function () {
    const carrossel = document.getElementById('product-carousel');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const produtos = Array.from(document.querySelectorAll('.produto'));

    const itemWidth = produtos[0].offsetWidth + 25; // Largura do item + gap
    let maxVisibleItems = 4;
    let autoScrollInterval;

    // Clona itens para criar o loop infinito
    function cloneItems() {
        const clonesStart = produtos.slice(-maxVisibleItems).map(item => item.cloneNode(true));
        const clonesEnd = produtos.slice(0, maxVisibleItems).map(item => item.cloneNode(true));
        
        clonesStart.forEach(clone => carrossel.insertBefore(clone, carrossel.firstChild));
        clonesEnd.forEach(clone => carrossel.appendChild(clone));
    }

    cloneItems();

    const allItems = carrossel.querySelectorAll('.produto');
    const totalItems = allItems.length;
    let currentIndex = maxVisibleItems; // Começa no primeiro item "real"
    let maxPosition;

    function updateItemWidth() {
        maxVisibleItems = Math.max(1, Math.floor(carrossel.parentElement.offsetWidth / itemWidth));
        maxPosition = totalItems - maxVisibleItems;
    }

    updateItemWidth();

    function updatePosition(withTransition = true) {
        if (!withTransition) {
            carrossel.style.transition = 'none';
        } else {
            carrossel.style.transition = 'transform 0.5s ease';
        }
        carrossel.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
    }

    function moveCarousel(direction) {
        currentIndex += (direction === 'next') ? 1 : -1;
        updatePosition(true);

        // Delay para esperar a transição terminar
        setTimeout(() => {
            if (currentIndex >= totalItems - maxVisibleItems) {
                currentIndex = maxVisibleItems;
                updatePosition(false); // Volta sem transição
            } else if (currentIndex < maxVisibleItems) {
                currentIndex = totalItems - (1 * maxVisibleItems);
                updatePosition(false); // Vai para o fim sem transição
            }
        }, 510);
    }

    prevBtn.addEventListener('click', function () {
        clearInterval(autoScrollInterval);
        moveCarousel('prev');
    });

    nextBtn.addEventListener('click', function () {
        clearInterval(autoScrollInterval);
        moveCarousel('next');
    });

    // Swipe para dispositivos móveis
    let touchStartX = 0;
    let touchEndX = 0;

    carrossel.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(autoScrollInterval);
    }, { passive: true });

    carrossel.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            moveCarousel('next');
        } else if (touchEndX > touchStartX + 50) {
            moveCarousel('prev');
        }
    }

    // Auto rotação
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            moveCarousel('next');
        }, 3000);
    }

    carrossel.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
    carrossel.addEventListener('mouseleave', startAutoScroll);

    // Redimensionamento
    window.addEventListener('resize', () => {
        updateItemWidth();
        updatePosition(false);
    });

    // Inicializa
    updatePosition(false);
    startAutoScroll();
});
