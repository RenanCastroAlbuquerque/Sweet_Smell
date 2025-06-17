document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('product-carousel');
    const btnPrev = document.getElementById('prev-btn');
    const btnNext = document.getElementById('next-btn');
  
    btnPrev.addEventListener('click', () => {
      carousel.scrollBy({ left: -300, behavior: 'smooth' });
    });
  
    btnNext.addEventListener('click', () => {
      carousel.scrollBy({ left: 300, behavior: 'smooth' });
    });
  
    // Abrir modal com descrição
    document.querySelectorAll('.produto').forEach(produto => {
      produto.addEventListener('click', () => {
        const nome = produto.dataset.nome;
        const descricao = produto.dataset.descricao;
        document.getElementById('modal-nome').textContent = nome;
        document.getElementById('modal-descricao').textContent = descricao;
        document.getElementById('modal').style.display = 'block';
      });
    });
  
    // Fechar modal
    document.getElementById('fechar-modal').addEventListener('click', () => {
      document.getElementById('modal').style.display = 'none';
    });
  
    window.addEventListener('click', (e) => {
      if (e.target === document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
      }
    });
  });
  