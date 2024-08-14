document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const clearCartButton = document.getElementById('clear-cart');

    let cart = [];
    let totalPrice = 0;

    // Função para atualizar o total no DOM
    function updateTotal() {
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    // Função para adicionar item ao carrinho
    function addToCart(name, price) {
        // Verificar se o item já está no carrinho
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        // Atualizar o total
        totalPrice += parseFloat(price);
        updateTotal();

        // Renderizar o carrinho novamente
        renderCart();
    }

    // Função para renderizar o carrinho
    function renderCart() {
        cartItems.innerHTML = ''; // Limpar a lista de itens

        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
            cartItems.appendChild(li);
        });
    }

    // Adicionar evento ao botão "Adicionar ao Carrinho"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = button.getAttribute('data-price');
            addToCart(name, price);
        });
    });

    // Adicionar evento ao botão "Limpar Carrinho"
    clearCartButton.addEventListener('click', () => {
        cart = [];
        totalPrice = 0;
        updateTotal();
        renderCart();
    });
});
