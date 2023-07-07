document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.querySelector('.product-list');
    const cartItemsContainer = document.querySelector('#cart-items');
    const cartTotalElement = document.querySelector('#cart-total');
    const clearCartButton = document.querySelector('#clear-cart');
  
    // Cart data
    let cartItems = [];
    let cartTotal = 0;
  
    // Fetch product data from the API
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(products => {
        // Display the product data
        products.forEach(product => {
          const productItem = document.createElement('div');
          productItem.classList.add('product-item');
          productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <span>${product.price}</span>
            <button class="add-to-cart">Add to Cart</button>
          `;
          productContainer.appendChild(productItem);
  
          // Event listener for adding to cart
          const addToCartButton = productItem.querySelector('.add-to-cart');
          addToCartButton.addEventListener('click', () => {
            addToCart(product);
          });
        });
      })
      .catch(error => console.log(error));
  
    // Function to add product to the cart
    function addToCart(product) {
      cartItems.push(product);
      cartTotal += parseFloat(product.price);
  
      // Update the cart UI
      renderCartItems();
      updateCartTotal();
    }
  
    // Function to render the cart items
    function renderCartItems() {
      cartItemsContainer.innerHTML = '';
  
      cartItems.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.textContent = item.name;
        cartItemsContainer.appendChild(cartItem);
      });
    }
  
    // Function to update the cart total
    function updateCartTotal() {
      cartTotalElement.textContent = `$${cartTotal.toFixed(2)}`;
    }
  
    // Event listener for clearing the cart
    clearCartButton.addEventListener('click', () => {
      cartItems = [];
      cartTotal = 0;
  
      // Update the cart UI
      renderCartItems();
      updateCartTotal();
    });
  });
  