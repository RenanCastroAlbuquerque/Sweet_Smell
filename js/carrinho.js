/**
 * Função para adicionar itens ao carrinho
 * @param {Object} produto - O produto a ser adicionado
 * @param {string} produto.nome - Nome do produto
 * @param {number} produto.preco - Preço do produto (em float)
 * @param {number} produto.quantidade - Quantidade do produto
 * @param {string} produto.imagem - URL da imagem do produto
 * @param {string} [produto.sku] - Código SKU do produto (opcional)
 */
function adicionarAoCarrinho(produto) {
    try {
        // Recupera o carrinho do localStorage ou inicializa vazio
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        
        // Verifica se o produto já está no carrinho (por SKU ou nome)
        const produtoExistenteIndex = carrinho.findIndex(item => 
            (produto.sku && item.sku === produto.sku) || item.nome === produto.nome
        );

        if (produtoExistenteIndex !== -1) {
            // Atualiza a quantidade se o produto já existir
            carrinho[produtoExistenteIndex].quantidade += produto.quantidade;
            
            // Limita a quantidade máxima por produto
            if (carrinho[produtoExistenteIndex].quantidade > 10) {
                carrinho[produtoExistenteIndex].quantidade = 10;
                throw new Error('Quantidade máxima por produto é 10');
            }
        } else {
            // Adiciona novo produto ao carrinho
            carrinho.push({
                nome: produto.nome,
                preco: parseFloat(produto.preco),
                quantidade: produto.quantidade,
                imagem: produto.imagem,
                sku: produto.sku || 'SEM-SKU'
            });
        }

        // Salva o carrinho atualizado no localStorage
        localStorage.setItem('carrinho', JSON.stringify(carrho));
        
        // Atualiza o contador do carrinho em todas as páginas
        atualizarContadorCarrinho();
        
        return true;
    } catch (error) {
        console.error('Erro ao adicionar ao carrinho:', error);
        return false;
    }
}

/**
 * Atualiza o contador de itens no carrinho
 */
function atualizarContadorCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    
    // Atualiza todos os elementos com a classe .cart-count
    document.querySelectorAll('.cart-count').forEach(element => {
        element.textContent = totalItens;
    });
}

/**
 * Remove um item do carrinho
 * @param {number} index - Índice do item a ser removido
 */
function removerItemCarrinho(index) {
    try {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        carrinho.splice(index, 1);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarContadorCarrinho();
        return true;
    } catch (error) {
        console.error('Erro ao remover item:', error);
        return false;
    }
}

/**
 * Atualiza a quantidade de um item no carrinho
 * @param {number} index - Índice do item
 * @param {number} novaQuantidade - Nova quantidade
 */
function atualizarQuantidadeItem(index, novaQuantidade) {
    try {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        
        // Valida a nova quantidade
        novaQuantidade = parseInt(novaQuantidade);
        if (isNaN(novaQuantidade)) return false;
        
        if (novaQuantidade <= 0) {
            // Remove o item se a quantidade for zero ou negativa
            return removerItemCarrinho(index);
        }
        
        // Limita a quantidade máxima por produto
        if (novaQuantidade > 10) {
            novaQuantidade = 10;
        }
        
        carrinho[index].quantidade = novaQuantidade;
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarContadorCarrinho();
        return true;
    } catch (error) {
        console.error('Erro ao atualizar quantidade:', error);
        return false;
    }
}

/**
 * Calcula o subtotal do carrinho
 * @returns {number} Subtotal do carrinho
 */
function calcularSubtotal() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
}

/**
 * Limpa todo o carrinho
 */
function limparCarrinho() {
    localStorage.removeItem('carrinho');
    atualizarContadorCarrinho();
}

// Atualiza o contador do carrinho quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    atualizarContadorCarrinho();
});

// Exporta as funções para uso em outros arquivos (se usando módulos)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        adicionarAoCarrinho,
        removerItemCarrinho,
        atualizarQuantidadeItem,
        calcularSubtotal,
        limparCarrinho,
        atualizarContadorCarrinho
    };
}