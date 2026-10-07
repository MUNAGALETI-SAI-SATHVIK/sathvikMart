 document.addEventListener('DOMContentLoaded', () => {
            // ==========================================================================
// NAVBAR SCROLL EFFECT
// ==========================================================================
            const navbar = document.getElementById('navbar');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('bg-[#0f0f13]/80', 'shadow-lg');
                    navbar.classList.remove('bg-white/5');
                } else {
                    navbar.classList.remove('bg-[#0f0f13]/80', 'shadow-lg');
                    navbar.classList.add('bg-white/5');
                }
            });

            // ==========================================================================
// MOBILE MENU TOGGLE
// ==========================================================================
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('open');
                const icon = mobileMenuBtn.querySelector('i');
                if(mobileMenu.classList.contains('open')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });

            // Close mobile menu when clicking a link
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('open');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                });
            });

            // ==========================================================================
// HERO IMAGE SLIDER
// ==========================================================================
            const slides = document.querySelectorAll('.slide');
            const dots = document.querySelectorAll('.slider-dot');
            let currentSlide = 0;
            const slideInterval = 5000; // 5 seconds per slide
            let sliderTimer;

            function goToSlide(index) {
                if (slides.length === 0) return;
                // Remove active class from current
                slides[currentSlide].classList.remove('active');
                if (dots.length > 0) {
                    dots[currentSlide].classList.remove('bg-brand-orange', 'shadow-[0_0_10px_#ff6b00]');
                    dots[currentSlide].classList.add('bg-white/30');
                }

                // Update index
                currentSlide = index;

                // Add active class to new
                slides[currentSlide].classList.add('active');
                if (dots.length > 0) {
                    dots[currentSlide].classList.remove('bg-white/30');
                    dots[currentSlide].classList.add('bg-brand-orange', 'shadow-[0_0_10px_#ff6b00]');
                }
            }

            function nextSlide() {
                let next = (currentSlide + 1) % slides.length;
                goToSlide(next);
            }

            // Start auto slider
            function startSlider() {
                sliderTimer = setInterval(nextSlide, slideInterval);
            }

            // Handle Dot Clicks (Manual Slide)
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    clearInterval(sliderTimer);
                    goToSlide(index);
                    startSlider(); // Restart interval after manual click
                });
            });

            // Initialize
            if (slides.length > 0) {
                startSlider();
            }
            

            // ==========================================================================
// NEW: FRUIT STAGE SLIDER LOGIC
// ==========================================================================
            const fruitState = { current: 0 };
            
            // Map the products array to the fruit slider structure
            const fruitSliderData = [
                { name: 'Almonds', tag: 'NATURAL PICK', desc: 'Crunchy, premium everyday snacking.', image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=500&q=60' },
                { name: 'Kiwi', tag: 'FRESH PICK', desc: 'Bright, juicy and ready to slice.', image: 'images/kiwi.webp' },
                { name: 'Rajma', tag: 'PANTRY FAVOURITE', desc: 'A dependable staple for hearty meals.', image: 'images/rajma.jpeg' },
                { name: 'Lotus Seeds', tag: 'LIGHT SNACK', desc: 'Light, crunchy and easy to roast.', image: 'images/makanna.png' }
            ];

            const heroStage = document.querySelector('.fruit-stage');
            const fruitMain = document.getElementById('fruit-main');
            const fruitBack = document.getElementById('fruit-back');
            const fruitName = document.getElementById('fruit-name');
            const fruitTag = document.getElementById('fruit-tag');
            const fruitDesc = document.getElementById('fruit-desc');
            const fruitIndex = document.getElementById('fruit-index');
            const fruitDotsContainer = document.getElementById('fruit-dots');

            // Initialize dots for fruit slider
            if (fruitDotsContainer) {
                fruitSliderData.forEach((fruit, i) => {
                  const dot = document.createElement('button');
                  dot.type = 'button';
                  dot.setAttribute('aria-label', `Show ${fruit.name}`);
                  dot.addEventListener('click', () => setFruit(i, true));
                  fruitDotsContainer.appendChild(dot);
                });
            }

            function setFruit(index, animate = false) {
              fruitState.current = index;
              const current = fruitSliderData[index];
              const next = fruitSliderData[(index + 1) % fruitSliderData.length];
              
              if (animate && heroStage) heroStage.classList.add('is-changing');
              
              if(fruitMain) {
                  fruitMain.src = current.image;
                  fruitMain.alt = current.name;
              }
              if(fruitBack) {
                  fruitBack.src = next.image;
                  fruitBack.alt = next.name;
              }
              if(fruitName) fruitName.textContent = current.name;
              if(fruitTag) fruitTag.textContent = current.tag;
              if(fruitDesc) fruitDesc.textContent = current.desc;
              if(fruitIndex) fruitIndex.textContent = `${String(index + 1).padStart(2,'0')} / ${String(fruitSliderData.length).padStart(2,'0')}`;
              
              const allFruitDots = document.querySelectorAll('.fruit-dots button');
              allFruitDots.forEach((dot, dotIndex) => {
                  if (dotIndex === index) {
                      dot.classList.add('is-active');
                  } else {
                      dot.classList.remove('is-active');
                  }
              });
              
              if(animate && heroStage) {
                  setTimeout(() => heroStage.classList.remove('is-changing'), 450);
              }
            }

            // Initialize the fruit slider
            if (document.querySelector('.fruit-stage')) {
                setFruit(0);
                // Auto advance fruit slider every 4.3s
                setInterval(() => setFruit((fruitState.current + 1) % fruitSliderData.length, true), 4300);
            }


            // ==========================================================================
// CART & SEARCH TOGGLE LOGIC
// ==========================================================================
            const searchContainer = document.getElementById('search-container');
            const searchBtnDesktop = document.getElementById('search-btn-desktop');
            const searchBtnMobile = document.getElementById('search-btn-mobile');
            const searchBox = document.getElementById('search-box');
            
            const cartSidebar = document.getElementById('cart-sidebar');
            const cartBackdrop = document.getElementById('cart-backdrop');
            const cartBtnDesktop = document.getElementById('cart-btn-desktop');
            const cartBtnMobile = document.getElementById('cart-btn-mobile');
            const closeCartBtn = document.getElementById('close-cart-btn');

            let isSearchOpen = false;

            // Toggle Search function
            function toggleSearch() {
                isSearchOpen = !isSearchOpen;
                if (isSearchOpen) {
                    searchContainer.classList.remove('-translate-y-[200%]', 'opacity-0', '-z-10');
                    searchContainer.classList.add('translate-y-0', 'opacity-100', 'z-40');
                    setTimeout(() => searchBox.focus(), 300);
                } else {
                    searchContainer.classList.remove('translate-y-0', 'opacity-100', 'z-40');
                    searchContainer.classList.add('-translate-y-[200%]', 'opacity-0', '-z-10');
                }
            }

            if(searchBtnDesktop) searchBtnDesktop.addEventListener('click', toggleSearch);
            if(searchBtnMobile) searchBtnMobile.addEventListener('click', toggleSearch);

            // Toggle Cart function
            function openCart() {
                cartBackdrop.classList.remove('hidden');
                // Small delay to ensure display flex applies before animating opacity
                setTimeout(() => {
                    cartBackdrop.classList.remove('opacity-0');
                    cartBackdrop.classList.add('opacity-100');
                    cartSidebar.classList.remove('translate-x-full');
                    cartSidebar.classList.add('translate-x-0');
                }, 10);
                // Prevent body scroll when cart is open to avoid double-scrolling on mobile devices
                document.body.style.overflow = 'hidden';
            }

            function closeCart() {
                cartSidebar.classList.remove('translate-x-0');
                cartSidebar.classList.add('translate-x-full');
                cartBackdrop.classList.remove('opacity-100');
                cartBackdrop.classList.add('opacity-0');
                setTimeout(() => {
                    cartBackdrop.classList.add('hidden');
                }, 300);
                // Restore body scroll
                document.body.style.overflow = '';
            }

            if(cartBtnDesktop) cartBtnDesktop.addEventListener('click', openCart);
            if(cartBtnMobile) cartBtnMobile.addEventListener('click', openCart);
            if(closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
            if(cartBackdrop) cartBackdrop.addEventListener('click', closeCart);

            // Close search when clicking outside
            document.addEventListener('click', (e) => {
                if (isSearchOpen && !searchContainer.contains(e.target) && !e.target.closest('#search-btn-desktop') && !e.target.closest('#search-btn-mobile')) {
                    toggleSearch();
                }
            });

            // ==========================================================================
// GLOBAL STATE & DATABASE
// ==========================================================================
            const productsDB = [
                { id: 1, name: 'Premium Almonds', price: 290, image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=150&q=60' },
                { id: 2, name: 'Fresh Kiwi', price: 420, image: 'https://images.unsplash.com/photo-1601314002592-b8734bca6604?auto=format&fit=crop&w=150&q=80' },
                { id: 3, name: 'Rajma (Kidney Beans)', price: 100, image: './images/rajma.jpeg' },
                { id: 4, name: 'Lotus Seeds (Makhana)', price: 200, image: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?auto=format&fit=crop&w=150&q=80' },
                { id: 5, name: 'Fresh Tomato 1kg', price: 30, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=150&q=80' },
                { id: 6, name: 'All In One Dry Fruits 900g', price: 300, image: 'https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?auto=format&fit=crop&w=150&q=80' },
                { id: 7, name: 'Aashirvaad Superior MP Atta 5kg', price: 415, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=150&q=80' },
                { id: 8, name: 'Kashmir Apples 1kg', price: 191, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6fac6?auto=format&fit=crop&w=150&q=80' },
                { id: 9, name: 'Tata Soulfull Millet Muesli 700g', price: 298, image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=150&q=80' },
                { id: 10, name: 'Dates 1kg', price: 600, image: './images/dates.jpeg' },
                { id: 11, name: 'Paneer 550g', price: 250, image: './images/paneer.jpeg' },
                { id: 12, name: 'Pistachio 500g', price: 699, image: './images/pistachio.jpeg' },
                { id: 13, name: 'Apricot', price: 399, image: './images/apricot.jpeg' }
            ];

            let cartState = [];

            // ==========================================================================
// TOAST NOTIFICATION SYSTEM
// ==========================================================================
            const toastContainer = document.getElementById('toast-container');
            
            function showToast(message, type = 'success') {
                const toast = document.createElement('div');
                toast.className = `toast-enter flex items-center gap-3 px-6 py-3 rounded-full shadow-2xl border ${type === 'success' ? 'border-brand-orange bg-[#0f0f13]/95' : 'border-red-500 bg-[#0f0f13]/95'} backdrop-blur-md`;
                
                const icon = type === 'success' ? '<i class="fas fa-check-circle text-brand-orange"></i>' : '<i class="fas fa-exclamation-circle text-red-500"></i>';
                
                toast.innerHTML = `
                    ${icon}
                    <span class="text-white font-medium text-sm tracking-wide">${message}</span>
                `;
                
                toastContainer.appendChild(toast);
                
                setTimeout(() => {
                    toast.classList.remove('toast-enter');
                    toast.classList.add('toast-exit');
                    setTimeout(() => toast.remove(), 300);
                }, 3000);
            }

            // ==========================================================================
// CART LOGIC
// ==========================================================================
            const cartItemsContainer = document.getElementById('cart-items-container');
            const cartTotalDisplay = document.getElementById('cart-total-display');
            const cartCountDisplays = [
                document.getElementById('cart-count-display'),
                cartBtnDesktop.querySelector('span'),
                cartBtnMobile.querySelector('span')
            ];

            // Make addToCart available globally so inline onclick works from generated HTML
            window.addToCart = function(productId) {
                const product = productsDB.find(p => p.id === productId);
                if (product) {
                    const existingItem = cartState.find(item => item.id === productId);
                    if (existingItem) {
                        existingItem.quantity += 1;
                    } else {
                        cartState.push({ ...product, quantity: 1 });
                    }
                    renderCart();
                    showToast(`${product.name} added to cart!`);
                }
            };

            window.removeFromCart = function(productId) {
                cartState = cartState.filter(item => item.id !== productId);
                renderCart();
            };

            function renderCart() {
                // Update Badge Counts
                const totalItems = cartState.reduce((sum, item) => sum + item.quantity, 0);
                cartCountDisplays.forEach(el => { if(el) el.textContent = totalItems; });

                if (cartState.length === 0) {
                    cartItemsContainer.innerHTML = `
                        <div class="flex flex-col items-center justify-center h-full text-center opacity-50 pt-10">
                            <i class="fas fa-basket-shopping text-6xl text-gray-500 mb-4"></i>
                            <p class="text-white font-medium text-lg">Your cart is empty</p>
                            <span class="text-gray-400 text-sm">Add something fresh to get started.</span>
                        </div>
                    `;
                    cartTotalDisplay.textContent = '₹0';
                    return;
                }

                let totalAmount = 0;
                cartItemsContainer.innerHTML = cartState.map(item => {
                    totalAmount += item.price * item.quantity;
                    return `
                    <div class="flex items-center gap-4 bg-white/5 border border-white/5 p-3 rounded-2xl relative group hover:border-brand-orange/50 transition-colors">
                        <button onclick="removeFromCart(${item.id})" class="fas fa-times absolute top-3 right-3 text-gray-500 hover:text-red-500 cursor-pointer transition-colors bg-black/50 w-6 h-6 rounded-full flex items-center justify-center text-xs"></button>
                        <img src="${item.image}" alt="${item.name}" class="w-20 h-20 rounded-xl object-cover shadow-md">
                        <div class="flex-1">
                            <h3 class="text-white font-bold text-lg leading-tight line-clamp-1">${item.name}</h3>
                            <span class="text-gray-400 text-sm">Qty: ${item.quantity}</span>
                            <div class="text-brand-orange font-bold text-lg mt-1">₹${item.price * item.quantity}</div>
                        </div>
                    </div>
                    `;
                }).join('');

                cartTotalDisplay.textContent = `₹${totalAmount}`;
            }

            // Hook up "Add to Cart" buttons in the Products section
            const addButtons = document.querySelectorAll('#products button:last-child'); // Target the "Add to Cart" buttons
            addButtons.forEach((btn, index) => {
                // Add event listener only if it hasn't been set inline
                if (!btn.getAttribute('onclick')) {
                    btn.addEventListener('click', () => {
                        window.addToCart(index + 1); // Maps indices 0-3 to product IDs 1-4
                    });
                }
            });

            document.getElementById('checkout-btn').addEventListener('click', () => {
                if (cartState.length === 0) {
                    showToast('Please add items to your cart first.', 'error');
                } else {
                    showToast('Checkout simulated! Ready for backend.');
                }
            });

            // Initialize Cart
            renderCart();

            // ==========================================================================
// SEARCH ENGINE LOGIC
// ==========================================================================
            const searchResults = document.getElementById('search-results');
            
            searchBox.addEventListener('input', (e) => {
                const query = e.target.value.trim().toLowerCase();
                
                if (!query) {
                    searchResults.classList.add('hidden');
                    searchResults.classList.remove('flex');
                    searchResults.innerHTML = '';
                    return;
                }

                const matches = productsDB.filter(p => p.name.toLowerCase().includes(query));
                
                searchResults.classList.remove('hidden');
                searchResults.classList.add('flex');

                if (matches.length === 0) {
                    searchResults.innerHTML = `
                        <div class="p-4 text-center text-gray-400 text-sm">
                            No products found matching "${e.target.value}"
                        </div>
                    `;
                } else {
                    searchResults.innerHTML = matches.map(item => `
                        <div class="flex items-center justify-between p-3 hover:bg-white/10 transition-colors border-b border-white/5 last:border-0 rounded-xl">
                            <div class="flex items-center gap-3">
                                <img src="${item.image}" alt="${item.name}" class="w-12 h-12 rounded-lg object-cover border border-white/10">
                                <span class="text-white font-medium text-sm md:text-base">${item.name}</span>
                            </div>
                            <div class="flex items-center gap-4">
                                <span class="text-brand-orange font-bold text-sm md:text-base">₹${item.price}</span>
                                <button onclick="addToCart(${item.id}); toggleSearch(); document.getElementById('search-box').value='';" class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all shadow-[0_0_10px_rgba(255,107,0,0.2)]">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    `).join('');
                }
            });

            // ==========================================================================
// AI CHAT ASSISTANT LOGIC
// ==========================================================================
            const chatToggle = document.getElementById('ai-chat-toggle');
            const chatWindow = document.getElementById('ai-chat-window');
            const closeChatBtn = document.getElementById('close-chat-btn');
            const chatInput = document.getElementById('chat-input');
            const sendChatBtn = document.getElementById('send-chat-btn');
            const chatMessages = document.getElementById('chat-messages');

            let isChatOpen = false;
            let chatHistory = [];

            // Toggle Chat Window
            function toggleChat() {
                isChatOpen = !isChatOpen;
                if (isChatOpen) {
                    chatWindow.classList.remove('hidden');
                    // Small delay to allow display:block to apply before animating opacity/transform
                    setTimeout(() => {
                        chatWindow.classList.remove('scale-95', 'opacity-0');
                        chatWindow.classList.add('scale-100', 'opacity-100');
                    }, 10);
                    chatToggle.innerHTML = '<i class="fas fa-times"></i>';
                    chatInput.focus();
                } else {
                    chatWindow.classList.remove('scale-100', 'opacity-100');
                    chatWindow.classList.add('scale-95', 'opacity-0');
                    setTimeout(() => {
                        chatWindow.classList.add('hidden');
                    }, 300); // Wait for transition
                    chatToggle.innerHTML = '<i class="fas fa-sparkles"></i>';
                }
            }

            chatToggle.addEventListener('click', toggleChat);
            closeChatBtn.addEventListener('click', toggleChat);

            function appendMessage(text, isUser = false) {
                const msgDiv = document.createElement('div');
                msgDiv.className = `flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[85%] ${isUser ? 'self-end' : 'self-start'}`;
                
                const bubble = document.createElement('div');
                bubble.className = `${isUser ? 'chat-bubble-user' : 'chat-bubble-ai'} p-3 text-sm shadow-md leading-relaxed`;
                
                // Simple markdown-like formatting for bold text
                let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>');
                // Convert newlines to br
                formattedText = formattedText.replace(/\n/g, '<br>');
                
                bubble.innerHTML = formattedText;
                msgDiv.appendChild(bubble);
                chatMessages.appendChild(msgDiv);
                
                // Scroll to bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }

            function showTypingIndicator() {
                const msgDiv = document.createElement('div');
                msgDiv.id = 'typing-indicator';
                msgDiv.className = `flex flex-col items-start max-w-[85%] self-start`;
                msgDiv.innerHTML = `
                    <div class="chat-bubble-ai p-3 shadow-md flex items-center gap-1 h-10">
                        <svg width="24" height="10" viewBox="0 0 24 10" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="5" r="3" class="typing-dot" />
                            <circle cx="12" cy="5" r="3" class="typing-dot" />
                            <circle cx="20" cy="5" r="3" class="typing-dot" />
                        </svg>
                    </div>
                `;
                chatMessages.appendChild(msgDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }

            function removeTypingIndicator() {
                const indicator = document.getElementById('typing-indicator');
                if (indicator) {
                    indicator.remove();
                }
            }

            async function handleSend() {
                const userMessage = chatInput.value.trim();
                if (!userMessage) return;

                // Add to UI
                appendMessage(userMessage, true);
                chatInput.value = '';
                
                // Add to history
                chatHistory.push({ role: "user", parts: [{ text: userMessage }] });

                showTypingIndicator();

                // Simulated AI Response Logic
                setTimeout(() => {
                    let aiResponse = "";
                    const lowerMsg = userMessage.toLowerCase();
                    
                    if (lowerMsg.includes("recipe") || lowerMsg.includes("cook") || lowerMsg.includes("make") || lowerMsg.includes("how to")) {
                        if (lowerMsg.includes("almond") || lowerMsg.includes("badam")) {
                            aiResponse = "**Almond Milkshake Recipe** 🥤\n\n1. Soak 10-12 almonds overnight and peel them.\n2. Blend almonds with 1 cup of milk, 1 tsp sugar (or honey), and a pinch of cardamom.\n3. Serve chilled!\n\nYou can find our Premium Almonds for ₹290 in the Products section!";
                        } else if (lowerMsg.includes("kiwi")) {
                            aiResponse = "**Fresh Kiwi Smoothie** 🥝\n\n1. Peel and chop 2 fresh kiwis.\n2. Blend with 1/2 cup yogurt, 1 tbsp honey, and ice cubes.\n3. Enjoy a refreshing drink!\n\nWe have Fresh Kiwi in stock for ₹420.";
                        } else if (lowerMsg.includes("rajma") || lowerMsg.includes("kidney bean")) {
                            aiResponse = "**Punjabi Style Rajma** 🍛\n\n1. Soak 1 cup Rajma overnight.\n2. Pressure cook until soft.\n3. Sauté onions, tomatoes, ginger-garlic paste, and spices (cumin, coriander, garam masala).\n4. Add cooked Rajma and simmer for 15 mins.\n5. Serve hot with rice!\n\nGet premium Rajma for just ₹100 from our store.";
                        } else if (lowerMsg.includes("paneer")) {
                            aiResponse = "**Quick Paneer Tikka** 🧀\n\n1. Cube paneer and marinate in yogurt, tikka masala, lemon juice, and salt for 30 mins.\n2. Grill or pan-fry until golden brown.\n3. Serve with mint chutney!\n\nFresh Paneer (550g) is available for ₹250.";
                        } else {
                            aiResponse = "I'd love to help with a recipe! 👨‍🍳 Could you tell me which ingredient you'd like to use? We have great fresh Almonds, Kiwi, Rajma, and Paneer today!";
                        }
                    } else if (lowerMsg.includes("offer") || lowerMsg.includes("sale") || lowerMsg.includes("discount")) {
                        aiResponse = "We have amazing offers right now! 🎉\n\n- **Home Appliances:** Up to 50% off!\n- **Fabric & Detergent:** Up to 30% off!\n- **Fresh Dairy:** Up to 10% off!\n- **Premium Beauty:** Up to 20% off!\n\nCheck out our Offers section for more details.";
                    } else if (lowerMsg.includes("price") || lowerMsg.includes("cost") || lowerMsg.includes("how much")) {
                        if (lowerMsg.includes("almond")) aiResponse = "Our Premium Almonds are ₹290.";
                        else if (lowerMsg.includes("kiwi")) aiResponse = "Fresh Kiwi is available for ₹420.";
                        else if (lowerMsg.includes("rajma")) aiResponse = "Rajma (Kidney Beans) is ₹100.";
                        else if (lowerMsg.includes("tomato")) aiResponse = "Fresh Tomatoes (1kg) are just ₹30!";
                        else aiResponse = "Please check our Products section or use the search bar at the top to find the exact prices for all our items! 🛒";
                    } else if (lowerMsg.includes("hi") || lowerMsg.includes("hello") || lowerMsg.includes("hey")) {
                        aiResponse = "Hello there! 👋 I'm Sathvik, your AI Chef & Guide. How can I assist you today? Looking for a specific product or need some recipe inspiration?";
                    } else if (lowerMsg.includes("where") || lowerMsg.includes("find") || lowerMsg.includes("locate")) {
                         aiResponse = "You can find most of our products in the Products section on the homepage! You can also use the search icon 🔍 at the top right to quickly find what you need.";
                    } else if (lowerMsg.includes("contact") || lowerMsg.includes("reach") || lowerMsg.includes("support")) {
                        aiResponse = "You can reach us through the Contact form at the bottom of the page, or simply send us a message via WhatsApp using the button there! 📱";
                    } else {
                        aiResponse = "That sounds interesting! 🤔 I can help you with recipes (try asking for an almond or kiwi recipe!), product prices, or store offers. What would you like to explore?";
                    }
                    
                    removeTypingIndicator();
                    appendMessage(aiResponse, false);
                    chatHistory.push({ role: "model", parts: [{ text: aiResponse }] });

                }, 1200);
            }

            sendChatBtn.addEventListener('click', handleSend);
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    handleSend();
                }
            });


            // =============================================
            // ==========================================================================
// CONTACT FORM: GOOGLE SHEETS + WHATSAPP
// ==========================================================================
            // =============================================

            // ⚠️ THIS MUST BE YOUR APPS SCRIPT WEB APP URL (NOT the spreadsheet link!)
            // It looks like: https://script.google.com/macros/s/AKfycb.../exec
            // Follow the setup guide to get this URL.
            const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzKsderfi2uygm7sUcdiqcKei-ueJqLVywMgvkyeSRwtIJ4cvSDVRsKv9iXv6_jQvUH/exec';

            // WhatsApp number (with country code, no + or spaces)
            const WHATSAPP_NUMBER = '919533355912';

            const contactForm = document.getElementById('contact-form');
            const contactName = document.getElementById('contact-name');
            const contactEmail = document.getElementById('contact-email');
            const contactPhone = document.getElementById('contact-phone');
            const contactMessage = document.getElementById('contact-message');
            const contactSubmitBtn = document.getElementById('contact-submit-btn');
            const contactBtnText = document.getElementById('contact-btn-text');
            const contactSpinner = document.getElementById('contact-spinner');
            const contactSuccess = document.getElementById('contact-success');
            const whatsappBtn = document.getElementById('whatsapp-send-btn');

            // Validation helper
            function validateContactForm() {
                let valid = true;
                const fields = [contactName, contactEmail, contactPhone, contactMessage];

                fields.forEach(field => {
                    field.classList.remove('border-red-500', 'border-white/10');
                    if (!field.value.trim()) {
                        field.classList.add('border-red-500');
                        valid = false;
                    } else {
                        field.classList.add('border-white/10');
                    }
                });

                // Email format check
                if (contactEmail.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail.value.trim())) {
                    contactEmail.classList.add('border-red-500');
                    valid = false;
                }

                return valid;
            }

            // Get form data as object
            function getContactData() {
                return {
                    name: contactName.value.trim(),
                    email: contactEmail.value.trim(),
                    phone: contactPhone.value.trim(),
                    message: contactMessage.value.trim(),
                    timestamp: new Date().toLocaleString()
                };
            }

            // Show loading state
            function setContactLoading(loading) {
                contactSubmitBtn.disabled = loading;
                whatsappBtn.disabled = loading;
                if (loading) {
                    contactBtnText.textContent = 'Sending...';
                    contactSpinner.classList.remove('hidden');
                    contactSubmitBtn.classList.add('opacity-70');
                } else {
                    contactBtnText.textContent = 'Send Message';
                    contactSpinner.classList.add('hidden');
                    contactSubmitBtn.classList.remove('opacity-70');
                }
            }

            // Show success state
            function showContactSuccess() {
                contactForm.classList.add('hidden');
                contactSuccess.classList.remove('hidden');
                contactSuccess.classList.add('flex', 'flex-col', 'items-center');

                // Reset after 5 seconds
                setTimeout(() => {
                    contactSuccess.classList.add('hidden');
                    contactSuccess.classList.remove('flex', 'flex-col', 'items-center');
                    contactForm.classList.remove('hidden');
                    contactForm.reset();
                }, 5000);
            }

            // Submit to Google Sheets via Apps Script
            async function submitToGoogleSheets(data) {
                try {
                    const response = await fetch(GOOGLE_SCRIPT_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    });
                    return true;
                } catch (error) {
                    console.error('Google Sheets submission error:', error);
                    return false;
                }
            }

            // Build WhatsApp URL
            function buildWhatsAppURL(data) {
                const text = `🛒 *New Inquiry from SathvikMart Website*\n\n` +
                    `👤 *Name:* ${data.name}\n` +
                    `📧 *Email:* ${data.email}\n` +
                    `📱 *Phone:* ${data.phone}\n` +
                    `💬 *Message:* ${data.message}\n\n` +
                    `📅 _Sent on: ${data.timestamp}_`;
                return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
            }

            // Form Submit → Google Sheets
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                console.log('📩 Contact form submitted');

                if (!validateContactForm()) {
                    console.log('❌ Validation failed');
                    // Show toast for validation error
                    if (typeof showToast === 'function') {
                        showToast('Please fill in all fields correctly.', 'error');
                    }
                    return;
                }

                const data = getContactData();
                setContactLoading(true);

                const success = await submitToGoogleSheets(data);
                setContactLoading(false);

                if (success) {
                    showContactSuccess();
                    if (typeof showToast === 'function') {
                        showToast('Message sent successfully! ✅', 'success');
                    }
                } else {
                    if (typeof showToast === 'function') {
                        showToast('Failed to send. Please try WhatsApp instead.', 'error');
                    }
                }
            });

            // WhatsApp Button → Opens WhatsApp with pre-filled message
            whatsappBtn.addEventListener('click', () => {
                console.log('📱 WhatsApp button clicked');
                if (!validateContactForm()) {
                    console.log('❌ Validation failed for WhatsApp');
                    if (typeof showToast === 'function') {
                        showToast('Please fill in all fields before sending.', 'error');
                    }
                    return;
                }

                const data = getContactData();

                // Also save to Google Sheets in background
                submitToGoogleSheets(data);

                // Open WhatsApp
                const url = buildWhatsAppURL(data);
                console.log('🔗 WhatsApp URL:', url);
                window.open(url, '_blank');

                if (typeof showToast === 'function') {
                    showToast('Opening WhatsApp... 📱', 'success');
                }
            });

        });