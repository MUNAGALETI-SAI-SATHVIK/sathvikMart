# Sathvik Supermart - E-Commerce Template User Guide

Welcome to the **Sathvik Supermart** modern HTML/CSS/JS template! Thank you for purchasing this premium, glassmorphism-inspired e-commerce UI. This template is designed to be easily customizable, even for those with beginner-level coding experience.

This guide will walk you through exactly how to modify colors, update images, change your logo, manage products, and connect the contact form to your own systems.

---

## 📑 Table of Contents

1. [Folder Structure](#1-folder-structure)
2. [Global Settings & Branding (Colors & Fonts)](#2-global-settings--branding)
3. [How to Change the Logo](#3-how-to-change-the-logo)
4. [Updating the Hero/Home Slider](#4-updating-the-herohome-slider)
5. [Updating the Fruit Slider (Featured Drop)](#5-updating-the-fruit-slider)
6. [Configuring Products (Shopping Cart & Search)](#6-configuring-products)
7. [Setting Up the Contact Form & WhatsApp](#7-setting-up-the-contact-form--whatsapp)
8. [Adding/Removing Sections](#8-addingremoving-sections)

---

## 1. Folder Structure

Before you start editing, familiarize yourself with how the files are organized:

- `index.html` - The main homepage (Hero, Offers, Fruit Slider, Contact).
- `product1.html` - A dedicated page displaying all products.
- `login.html` & `register.html` - User authentication pages.
- `css/styles.css` - Contains custom animations, global variables, and glassmorphism properties.
- `js/script.js` - Contains logic for the Cart, Search, AI Chat, Fruit Slider, and Contact Form.
- `images/` - Directory to store all your local images (logo, products, banners).

---

## 2. Global Settings & Branding

### Changing Primary Colors
The template's colors are controlled in two places to ensure maximum compatibility between Tailwind CSS and custom animations. 

**Step A: Update Tailwind Config (In HTML files)**
Open `index.html`, `product1.html`, `login.html`, and `register.html`. At the top (inside the `<head>`), look for the Tailwind configuration block. Change the hex color codes here:
```javascript
colors: {
    brand: {
        orange: '#ff6b00', // Primary Brand Color
        yellow: '#ffc107', // Secondary Highlight
        dark: '#0f0f13',   // Background Color
    }
}
```

**Step B: Update `styles.css`**
Open `css/styles.css`. Right at the top, you will find the `THEME VARIABLES` block. Ensure these colors match the ones you set in the HTML files:
```css
:root {
    --brand-orange: #ff6b00;
    --brand-yellow: #ffc107;
    --brand-dark: #0f0f13;
    --font-primary: 'Poppins', sans-serif;
}
```

### Changing Fonts
By default, the template uses Google's **Poppins** font. To change it:
1. Get a new font embed link from Google Fonts.
2. Replace the `<link>` tag in the `<head>` of all HTML files.
3. Update the `fontFamily` setting in the Tailwind `<script>` block.
4. Update `--font-primary` in `css/styles.css`.

---

## 3. How to Change the Logo

1. Prepare your logo in a square aspect ratio (e.g., 500x500 pixels) with a transparent background (PNG format).
2. Save it as `logo.png` inside the `images/` folder.
3. If you want to change the text next to the logo, open your HTML files, locate the header section (you'll see `<!-- ================= HEADER SECTION START ================= -->`), and update the text:
   ```html
   <span class="text-2xl font-bold tracking-wider text-white">SATHVIK<span class="text-brand-orange">MART</span></span>
   ```

---

## 4. Updating the Hero/Home Slider

The large background slider on the homepage is configured directly in `index.html`. 

Look for `<!-- ================= HERO SECTION START ================= -->`. Inside this section, you will see a container with `id="slider-container"`.
Change the image URLs inside the `style="background-image: url('...');"` attribute:
```html
<div class="slide active absolute inset-0 bg-cover bg-center" style="background-image: url('YOUR_IMAGE_URL_HERE');"></div>
```
You can use external links (like Unsplash) or local paths (e.g., `./images/banner1.jpg`).

---

## 5. Updating the Fruit Slider

The 3D interactive fruit slider on the homepage pulls data dynamically using JavaScript.

1. Open `js/script.js`.
2. Locate the **`fruitSliderData`** array (near the top).
3. Modify the names, descriptions, tags, and images to suit your products:
```javascript
const fruitSliderData = [
    { 
        name: 'Almonds', 
        tag: 'NATURAL PICK', 
        desc: 'Crunchy, premium everyday snacking.', 
        image: 'images/almonds.jpg' 
    },
    // Add or remove items here...
];
```

---

## 6. Configuring Products (Shopping Cart & Search)

The template features a functioning frontend shopping cart and live search. These rely on a database array inside the JavaScript file.

1. Open `js/script.js`.
2. Find the **`productsDB`** array.
3. Edit, add, or remove products. Ensure every product has a unique `id`.

```javascript
const productsDB = [
    { id: 1, name: 'Premium Almonds', price: 290, image: './images/almond.jpg' },
    { id: 2, name: 'Fresh Kiwi', price: 420, image: './images/kiwi.webp' },
    // Add your own products here...
];
```
*Note: The "Add to Cart" buttons in your HTML use `onclick="addToCart(PRODUCT_ID)"`. Make sure the ID in the HTML matches the ID in this database!*

---

## 7. Setting Up the Contact Form & WhatsApp

The contact form is configured to send messages directly to your WhatsApp and/or a Google Sheet.

1. Open `js/script.js`.
2. Scroll down to the **CONTACT FORM** section.
3. **Change the WhatsApp Number**: 
   Find `const WHATSAPP_NUMBER = '919533355913';` and change it to your number. *Include your country code, but DO NOT use the `+` sign or spaces.*
4. **Link Google Sheets (Optional but recommended)**:
   - Create a new Google Sheet.
   - Go to Extensions > Apps Script.
   - Add a simple `doPost(e)` script to log data. (Look up "Google Sheets Apps Script POST form data" for quick tutorials).
   - Deploy as a Web App (set access to "Anyone").
   - Paste the provided Web App URL into `const GOOGLE_SCRIPT_URL = 'YOUR_URL_HERE';`.

---

## 8. Adding/Removing Sections

All HTML files are marked with clear start and end comments. 
Example:
```html
<!-- ================= ABOUT SECTION START ================= -->
<section id="about"> ... </section>
<!-- ================= ABOUT SECTION END ================= -->
```
If you wish to remove a section (e.g., the Reviews section), simply highlight everything between the `START` and `END` comments and delete it. 

To create a new section, you can copy an existing one, change the `id="..."`, and edit the content.

---

### Need Further Assistance?
If you have questions about custom integrations (like connecting the cart to Stripe, Shopify, or a Node.js backend), we highly recommend consulting with a backend developer. The UI is fully prepared to send data to any modern API!

Enjoy building with **Sathvik Supermart**!
