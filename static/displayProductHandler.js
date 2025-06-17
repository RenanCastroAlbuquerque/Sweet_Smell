
/**
 * Manipulador de exibição de produtos - Armazena dados do produto no localStorage
 * quando um produto é clicado, para uso em páginas de detalhes ou carrinho.
 */
function displayProductHandler() {
    const allProducts = document.querySelectorAll('.product');
    if (!allProducts.length) return;

    // Objeto com descrições personalizadas
    const productDescriptions = {
        'Aqua Leads': 'A vela Coral Risk traz uma combinação intensa de âmbar e especiarias, ideal para ambientes sofisticados.',
        'Ocean Bliss': 'Sofá com design minimalista, feito à mão com tecido ecológico. Um toque de serenidade para sua casa.',
        'Blue Rays': 'Tons de azul profundo e conforto incomparável. Um clássico moderno para qualquer sala.',
        'Love Charm': 'Vela artesanal com fragrância romântica e duradoura. Ideal para momentos a dois.',
        'Green Armour': 'Aromas naturais e refrescantes que remetem à floresta. Um toque de proteção e calma.',
        // Padrão será usado para produtos não listados
        '_default': 'Produto exclusivo da Sweet Smell, feito com materiais de alta qualidade para transformar seu ambiente.'
    };

    allProducts.forEach(product => {
        product.addEventListener('click', () => {
            // Coleta de dados do produto
            const productData = {
                name: product.querySelector('.product-title').textContent,
                image: product.querySelector('img').src,
                price: product.querySelector('.box-p').textContent.replace('Price: ', ''),
                description: productDescriptions[product.querySelector('.product-title').textContent] 
                             || productDescriptions._default
            };

            // Armazenamento no localStorage
            Object.entries(productData).forEach(([key, value]) => {
                localStorage.setItem(`item${key.charAt(0).toUpperCase() + key.slice(1)}`, value);
            });

            // Opcional: Redirecionar para página de detalhes
            // window.location.href = 'detalhes.html';
        });
    });

    function adicionarAoCarrinho(produto) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
      
        const index = carrinho.findIndex(item => item.id === produto.id);
      
        if (index !== -1) {
          carrinho[index].quantidade += 1;
        } else {
          produto.quantidade = 1;
          carrinho.push(produto);
        }
      
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
      
        // Redireciona para o carrinho
        window.location.href = 'carrinho.html';
      }
      
}