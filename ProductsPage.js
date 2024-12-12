        // Search for a certain product
        function searchProducts(event) {
            event.preventDefault();

            let searchQuery = document.getElementById('searchInput').value.toLowerCase();
            let productCards = document.querySelectorAll('.product-card');
            let noResultsMessage = document.getElementById('noResults');
            let foundProduct = false;

            noResultsMessage.style.display = 'none';

            productCards.forEach((card) => {
                let productName = card.getAttribute('data-name').toLowerCase();
                if (productName.includes(searchQuery)) {
                    card.style.display = 'block';
                    foundProduct = true;
                } else {
                    card.style.display = 'none';
                }
            });
        }
        // Add to Cart function
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                let productName = this.closest('.product-card').querySelector('.product-name').innerText;
                addToCart(productName);
            });
        });

        function addToCart(productName) {
            console.log(`${productName} has been added to your cart!`);
            alert(`${productName} has been added to your cart!`);
        }

        // AJAX function for search 
        function searchProductsWithAJAX(query) {
            $.ajax({
                url: 'searchProducts.php', 
                type: 'GET',
                data: { search: query },
                success: function(response) {
                    // Update the product list dynamically based on search response
                    let productList = JSON.parse(response); 
                    updateProductList(productList);
                },
                error: function(error) {
                    console.error('Error during search:', error);
                }
            });
        }

        // Function to update the product list with AJAX data
        function updateProductList(products) {
            let productList = document.getElementById('productList');
            productList.innerHTML = ''; // Clear current products

            // Add new products to the list
            products.forEach(product => {
                let productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <a href="${product.url}">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="product-name">${product.name}</div>
                        <div class="product-rating">${product.rating}</div>
                        <div class="price">${product.price}</div>
                    </a>
                    <button class="add-to-cart">Add to Cart</button>
                `;
                productList.appendChild(productCard);
            });

            // Reattach event listeners to new 'Add to Cart' buttons
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', function() {
                    let productName = this.closest('.product-card').querySelector('.product-name').innerText;
                    addToCart(productName);
                });
            });
        }
        function redirectToPayment(productName, price) {
            const encodedName = encodeURIComponent(productName);
            const encodedPrice = encodeURIComponent(price);
            window.location.href = `payment.html?product=${encodedName}&price=${encodedPrice}`;
        }

