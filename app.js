  // Product data with enhanced variety
        const products = [
            { id: 1, name: 'Fresh Tomatoes', price: 30, emoji: '🍅', category: 'fruit', description: 'Juicy red tomatoes' },
            { id: 2, name: 'Organic Carrots', price: 20, emoji: '🥕', category: 'root', description: 'Sweet orange carrots' },
            { id: 3, name: 'Green Broccoli', price: 40, emoji: '🥦', category: 'green', description: 'Fresh green broccoli' },
            { id: 4, name: 'Bell Peppers', price: 5.99, emoji: '🫑', category: 'fruit', description: 'Colorful bell peppers' },
            { id: 5, name: 'Fresh Lettuce', price: 20, emoji: '🥬', category: 'green', description: 'Crispy green lettuce' },
            { id: 6, name: 'Sweet Corn', price: 30, emoji: '🌽', category: 'grain', description: 'Golden sweet corn' },
            { id: 7, name: 'Red Onions', price: 25, emoji: '🧅', category: 'root', description: 'Pungent red onions' },
            { id: 8, name: 'Cucumber', price: 20, emoji: '🥒', category: 'fruit', description: 'Fresh green cucumber' },
            { id: 9, name: 'Spinach', price: 30, emoji: '🥬', category: 'green', description: 'Nutritious spinach leaves' },
            { id: 10, name: 'Potatoes', price: 20, emoji: '🥔', category: 'root', description: 'Farm fresh potatoes' },
            { id: 11, name: 'Eggplant', price: 49, emoji: '🍆', category: 'fruit', description: 'Purple eggplant' },
            { id: 12, name: 'Mushrooms', price: 40, emoji: '🍄', category: 'fungi', description: 'Fresh mushrooms' },
            { id: 13, name: 'Avocado', price: 60, emoji: '🥑', category: 'fruit', description: 'Creamy avocados' },
            { id: 14, name: 'Garlic', price: 10, emoji: '🧄', category: 'root', description: 'Aromatic garlic bulbs' },
            { id: 15, name: 'Chili Peppers', price: 40, emoji: '🌶', category: 'fruit', description: 'Spicy chili peppers' }
        ];

        // Cart functionality with enhanced animations
        let cart = JSON.parse(localStorage.getItem('vegetableCart')) || [];

        // Initialize the app
        function init() {
            loadProducts();
            updateCartCount();
            updateCartDisplay();
            startBackgroundAnimation();
        }

        // Enhanced background animation
        function startBackgroundAnimation() {
            const leaves = document.querySelectorAll('.floating-leaf');
            leaves.forEach((leaf, index) => {
                leaf.style.animationDelay = (index * 2) + 's';
                leaf.style.left = Math.random() * 90 + '%';
            });
        }

        // Page navigation with enhanced transitions
        function showPage(pageId) {
            // Hide all pages with fade out
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => {
                if (page.classList.contains('active')) {
                    page.style.animation = 'fadeOut 0.3s ease-out';
                    setTimeout(() => {
                        page.classList.remove('active');
                        page.style.animation = '';
                    }, 300);
                }
            });
            
            // Show selected page with fade in
            setTimeout(() => {
                document.getElementById(pageId).classList.add('active');
                
                // Update cart display when cart page is shown
                if (pageId === 'cart') {
                    updateCartDisplay();
                }
            }, 300);
        }

        // Load products with staggered animation
        function loadProducts() {
            const productsGrid = document.getElementById('productsGrid');
            productsGrid.innerHTML = '';
            
            products.forEach((product, index) => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.style.animationDelay = (index * 0.1) + 's';
                productCard.innerHTML = `
                    <div class="product-image">${product.emoji}</div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">₹${product.price.toFixed(2)}</div>
                    <button class="add-to-cart" onclick="addToCart(event, ${product.id})">
                        Add to Cart 🛒
                    </button>
                `;
                productsGrid.appendChild(productCard);
            });
        }

        // Enhanced filter products with animation
        function filterProducts() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            );
            
            const productsGrid = document.getElementById('productsGrid');
            productsGrid.innerHTML = '';
            
            if (filteredProducts.length === 0) {
                productsGrid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #666;">
                        <h3>No vegetables found</h3>
                        <p>Try searching for something else!</p>
                    </div>
                `;
                return;
            }
            
            filteredProducts.forEach((product, index) => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.style.animationDelay = (index * 0.1) + 's';
                productCard.innerHTML = `
                    <div class="product-image">${product.emoji}</div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">₹${product.price.toFixed(2)}</div>
                    <button class="add-to-cart" onclick="addToCart(event, ${product.id})">
                        Add to Cart 🛒
                    </button>
                `;
                productsGrid.appendChild(productCard);
            });
        }

        // Enhanced add to cart with animation
        function addToCart(event, productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    emoji: product.emoji,
                    quantity: 1
                });
            }
            
            localStorage.setItem('vegetableCart', JSON.stringify(cart));
            updateCartCount();
            showToast(`${product.emoji} ${product.name} added to cart!`);
            
            // Add visual feedback to the button
            const button = event.target;
            button.style.transform = 'scale(0.95)';
            button.innerHTML = 'Added! ✅';
            setTimeout(() => {
                button.style.transform = '';
                button.innerHTML = 'Add to Cart 🛒';
            }, 1000);
        }

        // Enhanced cart count update
        function updateCartCount() {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            const cartCountElement = document.getElementById('cartCount');
            cartCountElement.textContent = totalItems;
            
            if (totalItems > 0) {
                cartCountElement.style.animation = 'pulse 0.5s ease-out';
                setTimeout(() => {
                    cartCountElement.style.animation = '';
                }, 500);
            }
        }

        // Enhanced cart display
        function updateCartDisplay() {
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');
            const totalAmount = document.getElementById('totalAmount');
            
            if (cart.length === 0) {
                cartItems.innerHTML = `
                    <div class="empty-cart">
                        <h3>🛒 Your cart is empty</h3>
                        <p>Add some fresh vegetables to get started!</p>
                        <button class="btn btn-primary" onclick="showPage('products')">
                            🥬 Shop Fresh Vegetables
                        </button>
                    </div>
                `;
                cartTotal.style.display = 'none';
                return;
            }
            
            cartItems.innerHTML = '';
            let total = 0;
            
            cart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.style.animationDelay = (index * 0.1) + 's';
                cartItem.innerHTML = `
                    <div class="cart-item-image">${item.emoji}</div>
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">₹${item.price.toFixed(2)} each</div>
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                            <input type="number" class="quantity" value="${item.quantity}" readonly>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                        <div style="margin-top: 0.8rem; font-weight: bold; color: #4a7c59;">
                            Subtotal: ₹${itemTotal.toFixed(2)}
                        </div>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">
                        🗑 Remove
                    </button>
                `;
                cartItems.appendChild(cartItem);
            });
            
            totalAmount.innerHTML = `
                <div style="font-size: 1.2rem; margin-bottom: 0.5rem;">Total Amount</div>
                ₹${total.toFixed(2)}
            `;
            cartTotal.style.display = 'block';
        }

        // Enhanced quantity update
        function updateQuantity(productId, change) {
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    removeFromCart(productId);
                } else {
                    localStorage.setItem('vegetableCart', JSON.stringify(cart));
                    updateCartCount();
                    updateCartDisplay();
                    
                    if (change > 0) {
                        showToast(`Increased ${item.name} quantity`);
                    } else {
                        showToast(`Decreased ${item.name} quantity`);
                    }
                }
            }
        }

        // Enhanced remove from cart
        function removeFromCart(productId) {
            const item = cart.find(item => item.id === productId);
            const itemName = item ? item.name : 'Item';
            
            cart = cart.filter(item => item.id !== productId);
            localStorage.setItem('vegetableCart', JSON.stringify(cart));
            updateCartCount();
            updateCartDisplay();
            showToast(`${itemName} removed from cart`);
        }

        // Enhanced toast notification
        function showToast(message) {
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toastMessage');
            
            toastMessage.textContent = message;
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3500);
        }

        // Enhanced contact form submission
        function submitContactForm(event) {
            event.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simulate form submission with loading state
            const submitBtn = event.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = 'Sending... ⏳';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showToast(`Thank you ${name}! We'll get back to you soon. 📧`);
                
                // Reset form
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('message').value = '';
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        }

        // Add CSS for fade out animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; transform: translateY(0) scale(1); }
                to { opacity: 0; transform: translateY(-20px) scale(0.98); }
            }
        `;
        document.head.appendChild(style);

        // Initialize the app when page loads
        document.addEventListener('DOMContentLoaded', init);

        // Add smooth scrolling behavior
        document.documentElement.style.scrollBehavior = 'smooth';



    (function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9963d63fc24da73c',t:'MTc2MTc1MzExNC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();