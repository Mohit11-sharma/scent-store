const money = (n) => {
    return '₹' + Number(n).toLocaleString('en-IN');
};

// Read data from localStorage
const readStore = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch (e) {
        return [];
    }
};

// Save data into localStorage
const saveStore = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};



//  CART AND WISHLIST BADGES

function updateBadges() {

    const cart = readStore('shopease-cart');
    const wish = readStore('shopease-wishlist');

    // Update cart count
    document.querySelectorAll('[data-cart-count]').forEach(el => {
        el.textContent = cart.reduce((sum, product) => sum + product.qty, 0);
    });

    // Update wishlist count
    document.querySelectorAll('[data-wish-count]').forEach(el => {
        el.textContent = wish.length;
    });
}

// ADD PRODUCT TO CART

function addToCart(product) {

    const cart = readStore('shopease-cart');

    const found = cart.find(p => p.id === product.id);

    if (found) {
        found.qty += 1;
    } else {
        cart.push({
            ...product,
            qty: 1
        });
    }

    saveStore('shopease-cart', cart);

    updateBadges();

    alert(product.name + ' added to your bag.');
}



// ADD / REMOVE PRODUCT FROM WISHLIST

function toggleWishlist(product) {

    let list = readStore('shopease-wishlist');

    const exists = list.some(p => p.id === product.id);

    if (exists) {
        list = list.filter(p => p.id !== product.id);
    } else {
        list = [...list, product];
    }

    saveStore('shopease-wishlist', list);

    updateBadges();

    alert(exists ? 'Removed from wishlist' : 'Added to wishlist');
}

//  RENDER CART ITEMS

function renderCart() {

    const body = document.querySelector('[data-cart-items]');

    if (!body) return;

    const cart = readStore('shopease-cart');

    // Empty cart condition
    if (!cart.length) {

        body.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-bag"></i>

                <h2 class="serif mt-3">
                    Your bag is waiting
                </h2>

                <p class="section-copy">
                    Discover a fragrance that feels like you.
                </p>

                <a class="btn btn-choco mt-2" href="shop.html">
                    Continue shopping
                </a>
            </div>
        `;

        const sum = document.querySelector('[data-cart-summary]');

        if (sum) {
            sum.innerHTML = '';
        }

        return;
    }


    // Display cart products
    body.innerHTML = cart.map(p => `

        <div class="row align-items-center py-3 border-bottom">

            <div class="col-3 col-md-2">
                <img
                    src="${p.image}"
                    alt="${p.name}"
                    class="w-100"
                    style="background:var(--cream)"
                >
            </div>

            <div class="col-5 col-md-5">

                <h3 class="h6 mb-1">
                    ${p.name}
                </h3>

                <small class="text-muted">
                    ${p.size || '100 ml'}
                </small>

                <div class="small mt-2">
                    ${money(p.price)}
                </div>

            </div>

            <div class="col-2">

                <div class="quantity-control">

                    <button onclick="changeQty('${p.id}', -1)">
                        −
                    </button>

                    <span>${p.qty}</span>

                    <button onclick="changeQty('${p.id}', 1)">
                        +
                    </button>

                </div>

            </div>

            <div class="col-2 text-end">

                <strong>
                    ${money(p.price * p.qty)}
                </strong>

                <button
                    class="btn btn-sm text-danger d-block ms-auto"
                    onclick="removeCart('${p.id}')"
                >
                    <i class="bi bi-trash"></i>
                </button>

            </div>

        </div>

    `).join('');


    // Calculate subtotal and shipping
    const subtotal = cart.reduce(
        (sum, p) => sum + p.price * p.qty,
        0
    );

    const shipping = subtotal >= 1999 ? 0 : 99;


    // Display cart summary
    const sum = document.querySelector('[data-cart-summary]');

    if (sum) {

        sum.innerHTML = `

            <div class="summary-row">
                <span>Subtotal</span>
                <strong>${money(subtotal)}</strong>
            </div>

            <div class="summary-row">
                <span>Shipping</span>
                <strong>
                    ${shipping ? money(shipping) : 'Free'}
                </strong>
            </div>

            <div class="summary-row total">
                <span>Total</span>
                <strong>${money(subtotal + shipping)}</strong>
            </div>

            <a href="checkout.html" class="btn btn-choco w-100 mt-3">
                Proceed to checkout
            </a>

            <p class="small text-muted mt-3">
                Shipping is complimentary on orders above ₹1,999.
            </p>

        `;
    }
}


//  CHANGE PRODUCT QUANTITY

function changeQty(id, delta) {

    let cart = readStore('shopease-cart');

    let product = cart.find(p => p.id === id);

    if (product) {
        product.qty = Math.max(1, product.qty + delta);
    }

    saveStore('shopease-cart', cart);

    renderCart();
    updateBadges();
}


// 8. REMOVE PRODUCT FROM CART

function removeCart(id) {

    const cart = readStore('shopease-cart');

    const updatedCart = cart.filter(p => p.id !== id);

    saveStore('shopease-cart', updatedCart);

    renderCart();
    updateBadges();
}


// RENDER WISHLIST


function renderWishlist() {

    const el = document.querySelector('[data-wishlist-items]');

    if (!el) return;

    const list = readStore('shopease-wishlist');


    // Empty wishlist condition
    if (!list.length) {

        el.innerHTML = `

            <div class="empty-state">

                <i class="bi bi-heart"></i>

                <h2 class="serif mt-3">
                    Your wishlist is empty
                </h2>

                <p class="section-copy">
                    Save the scents you love and find them here.
                </p>

                <a class="btn btn-choco mt-2" href="shop.html">
                    Explore fragrances
                </a>

            </div>

        `;

        return;
    }


    // Display wishlist products
    el.innerHTML = `

        <div class="row g-4">

            ${list.map(p => `

                <div class="col-6 col-lg-3">

                    <div class="product-card">

                        <div class="product-image-wrap">
                            <img src="${p.image}" alt="${p.name}">
                        </div>

                        <div class="product-info">

                            <h3>${p.name}</h3>

                            <div class="price">
                                ${money(p.price)}
                            </div>

                            <button
                                class="btn btn-choco btn-sm mt-3"
                                onclick="addToCart(${JSON.stringify(p).replace(/"/g, '&quot;')})"
                            >
                                Add to bag
                            </button>

                            <button
                                class="btn btn-link btn-sm text-danger"
                                onclick="toggleWishlist(${JSON.stringify(p).replace(/"/g, '&quot;')}); renderWishlist()"
                            >
                                Remove
                            </button>

                        </div>

                    </div>

                </div>

            `).join('')}

        </div>

    `;
}

// 10. SEARCH TOGGLE

function initializeSearch() {

    const searchToggle = document.querySelector('[data-search-toggle]');

    const searchPanel = document.querySelector('[data-search-panel]');

    if (searchToggle && searchPanel) {

        searchToggle.addEventListener('click', () => {
            searchPanel.classList.toggle('show');
        });

    }
}

//  CHECKOUT FORM

function initializeCheckout() {

    const checkout = document.querySelector('[data-checkout-form]');

    if (checkout) {

        checkout.addEventListener('submit', (e) => {

            e.preventDefault();

            if (!readStore('shopease-cart').length) {

                alert('Your bag is empty.');

                return;
            }

            saveStore('shopease-cart', []);

            location.href = 'order-success.html';

        });

    }
}


// CONTACT FORM

function initializeContact() {

    const contact = document.querySelector('[data-contact-form]');

    if (contact) {

        contact.addEventListener('submit', (e) => {

            e.preventDefault();

            alert('Thank you! Your demo message has been submitted.');

            contact.reset();

        });

    }
}

//  LOGIN FORM


function initializeLogin() {

    const login = document.querySelector('[data-login-form]');

    if (login) {

        login.addEventListener('submit', (e) => {

            e.preventDefault();

            alert('Login is a UI demo. Connect a backend to enable accounts.');

        });

    }
}


// REGISTER FORM

function initializeRegister() {

    const register = document.querySelector('[data-register-form]');

    if (register) {

        register.addEventListener('submit', (e) => {

            e.preventDefault();

            alert('Registration is a UI demo. Connect a backend to enable accounts.');

        });

    }
}


//  DOM CONTENT LOADED

document.addEventListener('DOMContentLoaded', () => {

    // Update cart and wishlist badges
    updateBadges();

    // Render cart and wishlist
    renderCart();
    renderWishlist();


    // Add to cart buttons
    document.querySelectorAll('[data-add-cart]').forEach(btn => {

        btn.addEventListener('click', () => {

            addToCart(JSON.parse(btn.dataset.addCart));

        });

    });


    // Wishlist buttons
    document.querySelectorAll('[data-wishlist]').forEach(btn => {

        btn.addEventListener('click', () => {

            toggleWishlist(JSON.parse(btn.dataset.wishlist));

        });

    });


    // Initialize all forms and features
    initializeSearch();
    initializeNewsletter();
    initializeCheckout();
    initializeContact();
    initializeLogin();
    initializeRegister();

});