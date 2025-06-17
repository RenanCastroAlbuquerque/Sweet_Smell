document.addEventListener('DOMContentLoaded', () => {
        const slide = document.querySelector('.socios-slide');
        const cards = document.querySelectorAll('.socios-card');
        const prevBtn = document.querySelector('.socios-btn.prev');
        const nextBtn = document.querySelector('.socios-btn.next');

        let currentIndex = 0;

        function updateCarousel() {
            const width = cards[0].clientWidth;
            slide.style.transform = `translateX(${-currentIndex * width}px)`;
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % cards.length;
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateCarousel();
        });

        window.addEventListener('resize', updateCarousel);
        updateCarousel();

});