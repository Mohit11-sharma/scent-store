# ShopEase — Perfume Store Frontend

A responsive multi-page perfume-store frontend built with HTML5, CSS3, Bootstrap 5 and a small amount of vanilla JavaScript for demo interactions.

## Pages included
- Home (`index.html`)
- Shop / product listing (`pages/shop.html`)
- Product details (`pages/product.html`)
- Shopping cart (`pages/cart.html`)
- Checkout (`pages/checkout.html`)
- Wishlist (`pages/wishlist.html`)
- Sign in (`pages/login.html`)
- Register (`pages/register.html`)
- About (`pages/about.html`)
- Contact (`pages/contact.html`)
- FAQs (`pages/faq.html`)
- Shipping & returns (`pages/shipping.html`)
- Order success (`pages/order-success.html`)

## Run locally
1. Extract the ZIP file.
2. Open the `shopease-full-project` folder in VS Code.
3. Install the **Live Server** extension.
4. Right-click `index.html` and choose **Open with Live Server**.

You can also open `index.html` directly in a browser, but Live Server is recommended.

## Frontend demo behaviour
- Add to bag / quantity changes / remove from cart
- Wishlist add and remove
- Cart and wishlist counts
- Demo checkout flow
- Search panel and mobile Bootstrap offcanvas menu
- Demo contact, newsletter, sign-in and registration forms

Cart and wishlist data are stored in the browser's `localStorage`.

## Important limitations
This is a frontend-only sample. It does **not** include:
- Backend, database, admin panel or product management
- Real login, registration, password reset or user accounts
- Real order creation, inventory or shipping integration
- Payment gateway or actual payment collection
- Email delivery for contact/newsletter forms

Before launching a real store, connect a backend/API, database, authentication, payment provider, shipping service and real business policies.

## External assets
Bootstrap, Bootstrap Icons, Google Fonts and sample product photography load from CDNs / Unsplash and therefore require an internet connection.

## Customization
- Main styling: `assets/css/style.css`
- Frontend interactions: `assets/js/main.js`
- Home page: `index.html`
- Other pages: `pages/`
