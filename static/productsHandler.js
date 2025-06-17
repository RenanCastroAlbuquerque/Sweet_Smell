function displayProductHandler() {
    let allProducts = document.querySelectorAll('.product');
    if (allProducts.length === 0) return;

    allProducts.forEach((product) => {
        product.addEventListener('click', function () {
            let productName = product.querySelector('.product-title').textContent;
            let productImage = product.querySelector('img').getAttribute('src');
            let productPrice = product.querySelector('.box-p').innerText.replace('Price: ', '');

            localStorage.setItem('itemName', productName);
            localStorage.setItem('itemImage', productImage);
            localStorage.setItem('itemPrice', productPrice);

            // Descrição personalizada com base no nome
            let description = '';
            switch (productName) {
                case 'Aqua Leads':
                    description = 'A vela Coral Risk traz uma combinação intensa de âmbar e especiarias, ideal para ambientes sofisticados.';
                    break;
                case 'Ocean Bliss':
                    description = 'Sofá com design minimalista, feito à mão com tecido ecológico. Um toque de serenidade para sua casa.';
                    break;
                case 'Blue Rays':
                    description = 'Tons de azul profundo e conforto incomparável. Um clássico moderno para qualquer sala.';
                    break;
                case 'Love Charm':
                    description = 'Vela artesanal com fragrância romântica e duradoura. Ideal para momentos a dois.';
                    break;
                case 'Green Armour':
                    description = 'Aromas naturais e refrescantes que remetem à floresta. Um toque de proteção e calma.';
                    break;
                default:
                    description = 'Produto exclusivo da Sweet Smell, feito com materiais de alta qualidade para transformar seu ambiente.';
            }

            localStorage.setItem('itemDescription', description);
        });
    });
}