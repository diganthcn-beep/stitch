/**
 * MAISON - QUIET LUXURY E-COMMERCE APPLICATION
 * High-performance state management, drawer & modal interactions,
 * product filtering, and cart/wishlist engines.
 */

// ==========================================================================
// STATE
// ==========================================================================
const AppState = {
  products: [...MAISON_PRODUCTS],
  cart: JSON.parse(localStorage.getItem('maison_cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('maison_wishlist') || '[]'),
  activeFilter: 'all',
  sortBy: 'featured',
  searchQuery: '',
  giftWrapped: false,
  selectedQuickViewProduct: null,
  selectedQuickViewSize: null
};

const SHIPPING_THRESHOLD = 1500; // Complimentary atelier courier above $1,500

// ==========================================================================
// INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();
  updateWishlistUI();
  setupEventListeners();
  setupLookbookTriggers();
});

// ==========================================================================
// CATALOG RENDERING & FILTERING
// ==========================================================================
function renderProducts() {
  const container = document.getElementById('productsGrid');
  const countEl = document.getElementById('productsCount');
  if (!container) return;

  // Filter
  let filtered = AppState.products.filter(item => {
    const matchesCategory = AppState.activeFilter === 'all' || item.category === AppState.activeFilter;
    const matchesSearch = !AppState.searchQuery || 
      item.name.toLowerCase().includes(AppState.searchQuery.toLowerCase()) ||
      item.material.toLowerCase().includes(AppState.searchQuery.toLowerCase()) ||
      item.categoryLabel.toLowerCase().includes(AppState.searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort
  if (AppState.sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (AppState.sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (AppState.sortBy === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (countEl) {
    countEl.innerText = `${filtered.length} ${filtered.length === 1 ? 'Garment' : 'Silhouettes'}`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-space-xl text-center">
        <span class="material-symbols-outlined text-[48px] text-outline-variant mb-space-xs block">search_off</span>
        <h3 class="font-headline-md text-on-surface mb-space-xs">No Silhouettes Found</h3>
        <p class="font-body-md text-on-surface-variant max-w-md mx-auto mb-space-md">No pieces match your current criteria. Explore our full seasonal repertoire.</p>
        <button onclick="resetFilters()" class="px-space-md py-space-xs bg-primary text-on-primary font-label-md tracking-widest uppercase transition-all hover:bg-surface-tint">
          Reset Filter
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(product => {
    const isWishlisted = AppState.wishlist.includes(product.id);
    return `
      <article class="product-card group relative flex flex-col bg-surface-container-lowest overflow-hidden transition-all duration-500" data-id="${product.id}">
        <!-- Image Box -->
        <div class="relative w-full aspect-[3/4] bg-surface-container overflow-hidden cursor-pointer" onclick="openQuickView(${product.id})">
          <img 
            src="${product.primaryImage}" 
            alt="${product.name}" 
            loading="lazy"
            class="image-primary absolute inset-0 w-full h-full object-cover object-center"
          />
          <img 
            src="${product.hoverImage}" 
            alt="${product.name} - Atelier perspective" 
            loading="lazy"
            class="image-hover absolute inset-0 w-full h-full object-cover object-center"
          />

          <!-- Badge -->
          ${product.badge ? `
            <div class="absolute top-4 left-4 z-10">
              <span class="px-3 py-1 bg-surface/90 backdrop-blur-md text-on-surface font-label-md tracking-widest uppercase text-[10px] shadow-sm">
                ${product.badge}
              </span>
            </div>
          ` : ''}

          <!-- Wishlist Button -->
          <button 
            type="button"
            onclick="event.stopPropagation(); toggleWishlist(${product.id})"
            class="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-surface/80 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-error hover:bg-surface transition-all duration-300 shadow-sm"
            aria-label="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}"
          >
            <span class="material-symbols-outlined text-[18px] transition-transform active:scale-125 ${isWishlisted ? 'text-error font-variation-fill' : ''}" style="${isWishlisted ? "font-variation-settings: 'FILL' 1;" : ''}">
              favorite
            </span>
          </button>

          <!-- Quick Action Overlay on Hover -->
          <div class="action-overlay absolute bottom-0 inset-x-0 p-space-sm bg-gradient-to-t from-primary/80 via-primary/40 to-transparent flex gap-space-xs z-10">
            <button 
              type="button" 
              onclick="event.stopPropagation(); quickAddToCart(${product.id})"
              class="flex-1 py-2.5 bg-surface text-on-surface font-label-md tracking-wider uppercase text-[10px] text-center hover:bg-primary hover:text-on-primary transition-colors duration-300 shadow-sm"
            >
              Add to Bag
            </button>
            <button 
              type="button" 
              onclick="event.stopPropagation(); openQuickView(${product.id})"
              class="px-3 py-2.5 bg-surface/80 backdrop-blur-sm text-on-surface hover:bg-surface font-label-md tracking-wider uppercase text-[10px] text-center transition-colors duration-300 shadow-sm"
              title="Quick Atelier View"
            >
              <span class="material-symbols-outlined text-[16px] block">visibility</span>
            </button>
          </div>
        </div>

        <!-- Product Details -->
        <div class="p-space-sm flex flex-col flex-1 justify-between bg-surface-container-lowest">
          <div>
            <div class="flex items-center justify-between mb-1">
              <span class="font-label-md text-on-surface-variant uppercase tracking-widest text-[10px]">
                ${product.categoryLabel}
              </span>
              <div class="flex items-center gap-1.5" title="${product.color}">
                <span class="w-2.5 h-2.5 rounded-full border border-outline-variant/60" style="background-color: ${product.colorHex};"></span>
              </div>
            </div>
            <h3 class="font-headline-sm text-on-surface text-[16px] leading-snug mb-1 font-normal group-hover:text-primary transition-colors cursor-pointer" onclick="openQuickView(${product.id})">
              ${product.name}
            </h3>
            <p class="font-body-sm text-on-surface-variant text-[11px] line-clamp-1 mb-2 font-light">
              ${product.material}
            </p>
          </div>

          <div class="pt-2 border-t border-outline-variant/30 flex items-center justify-between">
            <span class="font-label-md tracking-widest text-on-surface font-medium text-[13px]">
              $${product.price.toLocaleString()} USD
            </span>
            <span class="font-label-md uppercase tracking-widest text-on-surface-variant text-[10px] opacity-70">
              Made in Europe
            </span>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Filter handling
function filterCategory(category, buttonEl) {
  AppState.activeFilter = category;
  
  // Update UI tabs
  document.querySelectorAll('.filter-tab-btn').forEach(btn => {
    btn.classList.remove('bg-primary', 'text-on-primary');
    btn.classList.add('bg-surface-container', 'text-on-surface-variant');
  });

  if (buttonEl) {
    buttonEl.classList.remove('bg-surface-container', 'text-on-surface-variant');
    buttonEl.classList.add('bg-primary', 'text-on-primary');
  }

  renderProducts();

  // Scroll smoothly to shop catalog
  const shopEl = document.getElementById('shop');
  if (shopEl) {
    shopEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function handleSortChange(sortVal) {
  AppState.sortBy = sortVal;
  renderProducts();
}

function resetFilters() {
  AppState.activeFilter = 'all';
  AppState.searchQuery = '';
  AppState.sortBy = 'featured';
  const searchInput = document.getElementById('mainSearchInput');
  if (searchInput) searchInput.value = '';
  
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) sortSelect.value = 'featured';

  const defaultBtn = document.querySelector('.filter-tab-btn[data-category="all"]');
  filterCategory('all', defaultBtn);
}

// ==========================================================================
// SHOPPING BAG (CART) ENGINE
// ==========================================================================
function openCart() {
  closeWishlist();
  closeSearch();
  const drawer = document.getElementById('cartDrawer');
  if (drawer) {
    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCart() {
  const drawer = document.getElementById('cartDrawer');
  if (drawer) {
    drawer.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function quickAddToCart(productId) {
  const product = MAISON_PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const defaultSize = product.sizes[0] || 'Standard';
  addToCart(productId, defaultSize, 1);
}

function addToCart(productId, size, quantity = 1) {
  const product = MAISON_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existingIndex = AppState.cart.findIndex(
    item => item.productId === productId && item.size === size
  );

  if (existingIndex > -1) {
    AppState.cart[existingIndex].quantity += quantity;
  } else {
    AppState.cart.push({
      id: `${productId}-${size}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      size: size,
      color: product.color,
      colorHex: product.colorHex,
      image: product.primaryImage,
      category: product.categoryLabel,
      quantity: quantity
    });
  }

  saveCart();
  updateCartUI();
  showToast('Added to Atelier Bag', `${product.name} (${size}) placed in your shopping bag.`, 'shopping_bag');
  openCart();
}

function updateCartQuantity(cartItemId, delta) {
  const index = AppState.cart.findIndex(item => item.id === cartItemId);
  if (index === -1) return;

  AppState.cart[index].quantity += delta;
  if (AppState.cart[index].quantity <= 0) {
    AppState.cart.splice(index, 1);
  }

  saveCart();
  updateCartUI();
}

function removeCartItem(cartItemId) {
  AppState.cart = AppState.cart.filter(item => item.id !== cartItemId);
  saveCart();
  updateCartUI();
}

function toggleGiftWrap() {
  AppState.giftWrapped = !AppState.giftWrapped;
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('maison_cart', JSON.stringify(AppState.cart));
}

function updateCartUI() {
  const container = document.getElementById('cartItemsList');
  const countBadge = document.getElementById('cartBadge');
  const subtotalEl = document.getElementById('cartSubtotal');
  const totalEl = document.getElementById('cartTotal');
  const shippingBarEl = document.getElementById('shippingProgressBar');
  const shippingTextEl = document.getElementById('shippingProgressText');
  const checkoutBtn = document.getElementById('proceedCheckoutBtn');

  const totalItems = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Update header badge
  if (countBadge) {
    countBadge.innerText = totalItems;
    countBadge.classList.toggle('hidden', totalItems === 0);
    if (totalItems > 0) {
      countBadge.classList.add('badge-pop');
      setTimeout(() => countBadge.classList.remove('badge-pop'), 300);
    }
  }

  // Shipping progress
  const diff = SHIPPING_THRESHOLD - subtotal;
  if (shippingBarEl && shippingTextEl) {
    if (subtotal >= SHIPPING_THRESHOLD) {
      shippingBarEl.style.width = '100%';
      shippingBarEl.classList.remove('bg-primary');
      shippingBarEl.classList.add('bg-secondary');
      shippingTextEl.innerHTML = `<span class="text-secondary font-medium">Unlocked:</span> Complimentary White-Glove Courier Delivery`;
    } else {
      const percentage = Math.min(100, Math.round((subtotal / SHIPPING_THRESHOLD) * 100));
      shippingBarEl.style.width = `${percentage}%`;
      shippingBarEl.classList.remove('bg-secondary');
      shippingBarEl.classList.add('bg-primary');
      shippingTextEl.innerHTML = `Add <strong class="text-on-surface">$${diff.toLocaleString()} USD</strong> more for complimentary courier delivery`;
    }
  }

  if (!container) return;

  if (AppState.cart.length === 0) {
    container.innerHTML = `
      <div class="h-full flex flex-col items-center justify-center text-center p-space-md my-auto">
        <span class="material-symbols-outlined text-[48px] text-outline-variant mb-space-xs block font-light">shopping_bag</span>
        <h4 class="font-headline-sm text-on-surface mb-1">Your Atelier Bag is Empty</h4>
        <p class="font-body-md text-on-surface-variant max-w-xs mb-space-md font-light text-[13px]">
          Discover our curated collection of quiet luxury garments and handcrafted accessories.
        </p>
        <button onclick="closeCart(); filterCategory('all')" class="px-space-md py-space-xs bg-primary text-on-primary font-label-md tracking-widest uppercase transition-all hover:bg-surface-tint shadow-sm">
          Explore Silhouettes
        </button>
      </div>
    `;
    if (subtotalEl) subtotalEl.innerText = '$0 USD';
    if (totalEl) totalEl.innerText = '$0 USD';
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  if (checkoutBtn) checkoutBtn.disabled = false;

  container.innerHTML = AppState.cart.map(item => `
    <div class="flex gap-space-sm p-space-sm border-b border-outline-variant/30 last:border-b-0 hover:bg-surface-container-low transition-colors">
      <img src="${item.image}" alt="${item.name}" class="w-20 h-24 object-cover object-center bg-surface-container flex-shrink-0" />
      <div class="flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-start justify-between">
            <h5 class="font-headline-sm text-[15px] text-on-surface leading-tight font-normal">${item.name}</h5>
            <button onclick="removeCartItem('${item.id}')" class="text-on-surface-variant hover:text-error transition-colors p-1" title="Remove item">
              <span class="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
          <p class="font-body-sm text-on-surface-variant text-[11px] uppercase tracking-wider mt-0.5">
            Size: <span class="text-on-surface font-medium">${item.size}</span> &bull; ${item.color}
          </p>
        </div>

        <div class="flex items-center justify-between mt-2">
          <!-- Quantity Stepper -->
          <div class="flex items-center border border-outline-variant/60 bg-surface">
            <button onclick="updateCartQuantity('${item.id}', -1)" class="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" aria-label="Decrease quantity">
              <span class="material-symbols-outlined text-[14px]">remove</span>
            </button>
            <span class="w-8 text-center font-label-md text-[12px] text-on-surface font-medium">${item.quantity}</span>
            <button onclick="updateCartQuantity('${item.id}', 1)" class="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" aria-label="Increase quantity">
              <span class="material-symbols-outlined text-[14px]">add</span>
            </button>
          </div>
          
          <span class="font-label-md text-on-surface tracking-wider text-[13px] font-medium">
            $${(item.price * item.quantity).toLocaleString()} USD
          </span>
        </div>
      </div>
    </div>
  `).join('');

  const shippingCost = subtotal >= SHIPPING_THRESHOLD ? 0 : 45;
  const grandTotal = subtotal + shippingCost;

  if (subtotalEl) subtotalEl.innerText = `$${subtotal.toLocaleString()} USD`;
  if (totalEl) totalEl.innerText = `$${grandTotal.toLocaleString()} USD`;
}

// ==========================================================================
// WISHLIST ENGINE
// ==========================================================================
function openWishlist() {
  closeCart();
  closeSearch();
  const drawer = document.getElementById('wishlistDrawer');
  if (drawer) {
    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeWishlist() {
  const drawer = document.getElementById('wishlistDrawer');
  if (drawer) {
    drawer.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function toggleWishlist(productId) {
  const product = MAISON_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const index = AppState.wishlist.indexOf(productId);
  if (index > -1) {
    AppState.wishlist.splice(index, 1);
    showToast('Removed from Wishlist', `${product.name} has been removed from your saved repertoire.`, 'favorite');
  } else {
    AppState.wishlist.push(productId);
    showToast('Saved to Wishlist', `${product.name} has been added to your private wishlist.`, 'favorite');
  }

  localStorage.setItem('maison_wishlist', JSON.stringify(AppState.wishlist));
  updateWishlistUI();
  renderProducts();
}

function moveWishlistToBag(productId) {
  quickAddToCart(productId);
  toggleWishlist(productId);
}

function updateWishlistUI() {
  const container = document.getElementById('wishlistItemsList');
  const countBadge = document.getElementById('wishlistBadge');

  if (countBadge) {
    countBadge.innerText = AppState.wishlist.length;
    countBadge.classList.toggle('hidden', AppState.wishlist.length === 0);
    if (AppState.wishlist.length > 0) {
      countBadge.classList.add('badge-pop');
      setTimeout(() => countBadge.classList.remove('badge-pop'), 300);
    }
  }

  if (!container) return;

  const wishlistedProducts = MAISON_PRODUCTS.filter(p => AppState.wishlist.includes(p.id));

  if (wishlistedProducts.length === 0) {
    container.innerHTML = `
      <div class="h-full flex flex-col items-center justify-center text-center p-space-md my-auto">
        <span class="material-symbols-outlined text-[48px] text-outline-variant mb-space-xs block font-light">favorite</span>
        <h4 class="font-headline-sm text-on-surface mb-1">Your Repertoire is Empty</h4>
        <p class="font-body-md text-on-surface-variant max-w-xs mb-space-md font-light text-[13px]">
          Curate your personal collection of timeless garments to review or acquire later.
        </p>
        <button onclick="closeWishlist(); filterCategory('all')" class="px-space-md py-space-xs bg-primary text-on-primary font-label-md tracking-widest uppercase transition-all hover:bg-surface-tint shadow-sm">
          Browse Creations
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = wishlistedProducts.map(product => `
    <div class="flex gap-space-sm p-space-sm border-b border-outline-variant/30 last:border-b-0 hover:bg-surface-container-low transition-colors">
      <img src="${product.primaryImage}" alt="${product.name}" class="w-20 h-24 object-cover object-center bg-surface-container flex-shrink-0" />
      <div class="flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-start justify-between">
            <h5 class="font-headline-sm text-[15px] text-on-surface leading-tight font-normal">${product.name}</h5>
            <button onclick="toggleWishlist(${product.id})" class="text-on-surface-variant hover:text-error transition-colors p-1" title="Remove from wishlist">
              <span class="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
          <p class="font-body-sm text-on-surface-variant text-[11px] uppercase tracking-wider mt-0.5">
            ${product.categoryLabel} &bull; $${product.price.toLocaleString()} USD
          </p>
        </div>

        <div class="mt-2 flex gap-2">
          <button onclick="moveWishlistToBag(${product.id})" class="flex-1 py-1.5 bg-primary text-on-primary font-label-md tracking-widest uppercase text-[10px] hover:bg-surface-tint transition-colors">
            Move to Bag
          </button>
          <button onclick="openQuickView(${product.id})" class="px-2.5 py-1.5 border border-outline-variant/80 text-on-surface font-label-md text-[10px] hover:bg-surface transition-colors" title="View details">
            <span class="material-symbols-outlined text-[14px] block">visibility</span>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// ==========================================================================
// QUICK VIEW MODAL
// ==========================================================================
function openQuickView(productId) {
  const product = MAISON_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  AppState.selectedQuickViewProduct = product;
  AppState.selectedQuickViewSize = product.sizes[0] || 'Standard';

  const modal = document.getElementById('quickViewModal');
  const galleryEl = document.getElementById('qvGallery');
  const detailsEl = document.getElementById('qvDetails');
  if (!modal || !galleryEl || !detailsEl) return;

  // Gallery
  const images = product.gallery && product.gallery.length ? product.gallery : [product.primaryImage, product.hoverImage];
  galleryEl.innerHTML = `
    <div class="relative w-full aspect-[4/5] bg-surface-container overflow-hidden mb-3">
      <img id="qvMainImage" src="${images[0]}" alt="${product.name}" class="w-full h-full object-cover object-center transition-opacity duration-300" />
    </div>
    <div class="grid grid-cols-4 gap-2">
      ${images.map((img, idx) => `
        <button 
          onclick="setQvMainImage('${img}', this)" 
          class="aspect-[3/4] border-2 ${idx === 0 ? 'border-primary' : 'border-transparent'} overflow-hidden hover:opacity-100 transition-all opacity-75"
        >
          <img src="${img}" alt="${product.name} thumbnail" class="w-full h-full object-cover object-center" />
        </button>
      `).join('')}
    </div>
  `;

  // Details
  const isWishlisted = AppState.wishlist.includes(product.id);
  detailsEl.innerHTML = `
    <div class="flex flex-col h-full justify-between">
      <div>
        <div class="flex items-center justify-between mb-2">
          <span class="font-label-md text-on-surface-variant uppercase tracking-[0.2em] text-[11px]">${product.categoryLabel}</span>
          ${product.badge ? `<span class="px-2.5 py-0.5 bg-surface-container-high text-on-surface font-label-md tracking-widest uppercase text-[10px]">${product.badge}</span>` : ''}
        </div>
        
        <h2 class="font-headline-lg text-on-surface mb-2 leading-tight">${product.name}</h2>
        <div class="font-headline-sm text-on-surface mb-space-sm font-normal">$${product.price.toLocaleString()} USD</div>
        
        <div class="w-12 h-[1px] bg-outline-variant mb-space-sm"></div>

        <p class="font-body-md text-on-surface-variant font-light mb-space-md leading-relaxed">
          ${product.description}
        </p>

        <!-- Fabric & Provenance -->
        <div class="mb-space-md bg-surface-container-low p-space-sm rounded-sm">
          <div class="font-label-md uppercase tracking-wider text-on-surface text-[11px] mb-1">Craftsmanship & Composition</div>
          <div class="font-body-sm text-on-surface-variant font-light mb-2">${product.material} &bull; ${product.color}</div>
          <ul class="space-y-1">
            ${product.details.map(d => `
              <li class="font-body-sm text-on-surface-variant flex items-center gap-2 text-[12px]">
                <span class="w-1 h-1 rounded-full bg-outline"></span>
                ${d}
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Size Selector -->
        <div class="mb-space-md">
          <div class="flex justify-between items-center mb-2">
            <span class="font-label-md uppercase tracking-wider text-on-surface text-[11px]">Select Size</span>
            <button onclick="openSizeGuide()" class="font-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface text-[10px] underline underline-offset-4 transition-colors">
              Size & Fit Guide
            </button>
          </div>
          <div class="flex flex-wrap gap-2" id="qvSizesContainer">
            ${product.sizes.map((s, idx) => `
              <button 
                onclick="setQvSize('${s}', this)"
                class="qv-size-btn px-4 py-2 border font-label-md text-[11px] tracking-wider transition-all duration-200 ${idx === 0 ? 'border-primary bg-primary text-on-primary' : 'border-outline-variant/80 text-on-surface hover:border-on-surface'}"
              >
                ${s}
              </button>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="pt-space-sm border-t border-outline-variant/40 flex gap-space-sm">
        <button 
          onclick="submitQvAddToCart()"
          class="flex-1 py-space-sm bg-primary text-on-primary font-label-md tracking-[0.2em] uppercase transition-all duration-300 hover:bg-surface-tint shadow-sm flex items-center justify-center gap-2"
        >
          <span class="material-symbols-outlined text-[18px]">shopping_bag</span>
          Acquire Silhouette
        </button>
        <button 
          onclick="toggleWishlist(${product.id}); updateQvWishlistState(this, ${product.id})"
          class="w-12 h-12 border border-outline-variant flex items-center justify-center text-on-surface hover:text-error hover:border-error transition-all duration-300"
          title="Save to Repertoire"
        >
          <span class="material-symbols-outlined text-[20px] ${isWishlisted ? 'text-error font-variation-fill' : ''}" style="${isWishlisted ? "font-variation-settings: 'FILL' 1;" : ''}">
            favorite
          </span>
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  const modal = document.getElementById('quickViewModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function setQvMainImage(imgUrl, buttonEl) {
  const mainImg = document.getElementById('qvMainImage');
  if (mainImg) {
    mainImg.src = imgUrl;
  }
  const buttons = buttonEl.parentElement.querySelectorAll('button');
  buttons.forEach(b => {
    b.classList.remove('border-primary');
    b.classList.add('border-transparent');
  });
  buttonEl.classList.remove('border-transparent');
  buttonEl.classList.add('border-primary');
}

function setQvSize(size, buttonEl) {
  AppState.selectedQuickViewSize = size;
  const container = document.getElementById('qvSizesContainer');
  if (container) {
    container.querySelectorAll('.qv-size-btn').forEach(b => {
      b.classList.remove('border-primary', 'bg-primary', 'text-on-primary');
      b.classList.add('border-outline-variant/80', 'text-on-surface');
    });
  }
  buttonEl.classList.remove('border-outline-variant/80', 'text-on-surface');
  buttonEl.classList.add('border-primary', 'bg-primary', 'text-on-primary');
}

function submitQvAddToCart() {
  if (!AppState.selectedQuickViewProduct) return;
  addToCart(
    AppState.selectedQuickViewProduct.id,
    AppState.selectedQuickViewSize || 'Standard',
    1
  );
  closeQuickView();
}

function updateQvWishlistState(btnEl, productId) {
  const isWishlisted = AppState.wishlist.includes(productId);
  const icon = btnEl.querySelector('.material-symbols-outlined');
  if (icon) {
    if (isWishlisted) {
      icon.classList.add('text-error');
      icon.style.fontVariationSettings = "'FILL' 1";
    } else {
      icon.classList.remove('text-error');
      icon.style.fontVariationSettings = "'FILL' 0";
    }
  }
}

// ==========================================================================
// SEARCH OVERLAY
// ==========================================================================
function openSearch() {
  closeCart();
  closeWishlist();
  const overlay = document.getElementById('searchOverlay');
  if (overlay) {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      const input = document.getElementById('searchOverlayInput');
      if (input) input.focus();
    }, 150);
  }
}

function closeSearch() {
  const overlay = document.getElementById('searchOverlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function handleLiveSearch(query) {
  AppState.searchQuery = query.trim();
  const resultsContainer = document.getElementById('searchOverlayResults');
  
  if (!query.trim()) {
    if (resultsContainer) {
      resultsContainer.innerHTML = `
        <div class="text-center py-8 text-on-surface-variant font-light font-body-md">
          Begin typing to explore garments, textiles, and archival silhouettes...
        </div>
      `;
    }
    return;
  }

  const matches = MAISON_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.material.toLowerCase().includes(query.toLowerCase()) ||
    p.categoryLabel.toLowerCase().includes(query.toLowerCase())
  );

  if (matches.length === 0) {
    if (resultsContainer) {
      resultsContainer.innerHTML = `
        <div class="text-center py-8">
          <p class="font-headline-sm text-on-surface mb-1">No Pieces Found</p>
          <p class="font-body-sm text-on-surface-variant font-light">No creations match "${query}". Try searching for 'Cashmere', 'Coat', or 'Silk'.</p>
        </div>
      `;
    }
    return;
  }

  if (resultsContainer) {
    resultsContainer.innerHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-space-sm pt-4">
        ${matches.map(p => `
          <div onclick="closeSearch(); openQuickView(${p.id})" class="flex gap-space-xs p-2 bg-surface hover:bg-surface-container transition-colors cursor-pointer border border-outline-variant/30">
            <img src="${p.primaryImage}" alt="${p.name}" class="w-16 h-20 object-cover object-center flex-shrink-0" />
            <div class="flex flex-col justify-between overflow-hidden">
              <div>
                <span class="font-label-md text-on-surface-variant text-[9px] uppercase tracking-widest block">${p.categoryLabel}</span>
                <h6 class="font-headline-sm text-[13px] text-on-surface truncate">${p.name}</h6>
                <p class="font-body-sm text-[10px] text-on-surface-variant truncate font-light">${p.material}</p>
              </div>
              <span class="font-label-md text-[11px] text-on-surface tracking-wider">$${p.price.toLocaleString()} USD</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
}

function quickSearchTag(term) {
  const input = document.getElementById('searchOverlayInput');
  if (input) {
    input.value = term;
    handleLiveSearch(term);
  }
}

// ==========================================================================
// CHECKOUT MODAL
// ==========================================================================
function openCheckout() {
  if (AppState.cart.length === 0) return;
  closeCart();
  const modal = document.getElementById('checkoutModal');
  const summaryEl = document.getElementById('checkoutOrderSummary');
  if (!modal) return;

  const subtotal = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = subtotal >= SHIPPING_THRESHOLD ? 0 : 45;
  const total = subtotal + shippingCost;

  if (summaryEl) {
    summaryEl.innerHTML = `
      <div class="space-y-space-xs mb-space-md max-h-56 overflow-y-auto pr-1">
        ${AppState.cart.map(item => `
          <div class="flex items-center justify-between py-1 text-[13px]">
            <div class="flex items-center gap-2 truncate">
              <span class="font-medium text-on-surface">${item.quantity}x</span>
              <span class="text-on-surface-variant truncate">${item.name} (${item.size})</span>
            </div>
            <span class="font-label-md text-on-surface">$${(item.price * item.quantity).toLocaleString()}</span>
          </div>
        `).join('')}
      </div>
      <div class="pt-space-xs border-t border-outline-variant/40 space-y-1 font-body-sm text-[13px]">
        <div class="flex justify-between text-on-surface-variant">
          <span>Subtotal</span>
          <span>$${subtotal.toLocaleString()} USD</span>
        </div>
        <div class="flex justify-between text-on-surface-variant">
          <span>Courier Delivery</span>
          <span>${shippingCost === 0 ? 'Complimentary' : '$45 USD'}</span>
        </div>
        <div class="flex justify-between text-on-surface font-headline-sm text-[16px] pt-2 border-t border-outline-variant/30 font-normal">
          <span>Total</span>
          <span>$${total.toLocaleString()} USD</span>
        </div>
      </div>
    `;
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCheckout() {
  const modal = document.getElementById('checkoutModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function submitCheckout(e) {
  e.preventDefault();
  const checkoutContent = document.getElementById('checkoutContentArea');
  const confirmationContent = document.getElementById('checkoutConfirmationArea');
  
  if (checkoutContent && confirmationContent) {
    checkoutContent.classList.add('hidden');
    confirmationContent.classList.remove('hidden');

    // Clear cart
    AppState.cart = [];
    saveCart();
    updateCartUI();
  }
}

function resetCheckoutModal() {
  closeCheckout();
  setTimeout(() => {
    const checkoutContent = document.getElementById('checkoutContentArea');
    const confirmationContent = document.getElementById('checkoutConfirmationArea');
    if (checkoutContent && confirmationContent) {
      checkoutContent.classList.remove('hidden');
      confirmationContent.classList.add('hidden');
    }
  }, 400);
}

// ==========================================================================
// CLIENT ACCOUNT DRAWER
// ==========================================================================
function openAccount() {
  closeCart();
  closeWishlist();
  closeSearch();
  const drawer = document.getElementById('accountDrawer');
  if (drawer) {
    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeAccount() {
  const drawer = document.getElementById('accountDrawer');
  if (drawer) {
    drawer.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ==========================================================================
// SIZE GUIDE MODAL
// ==========================================================================
function openSizeGuide() {
  const modal = document.getElementById('sizeGuideModal');
  if (modal) {
    modal.classList.add('active');
  }
}

function closeSizeGuide() {
  const modal = document.getElementById('sizeGuideModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// ==========================================================================
// TOAST NOTIFICATIONS
// ==========================================================================
function showToast(title, message, iconName = 'notifications') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-item bg-primary text-on-primary px-space-md py-space-xs shadow-xl flex items-center gap-space-sm max-w-md w-full border border-outline-variant/30';
  toast.innerHTML = `
    <span class="material-symbols-outlined text-[20px] text-secondary-container">${iconName}</span>
    <div class="flex-1">
      <div class="font-headline-sm text-[14px] font-medium leading-tight">${title}</div>
      <div class="font-body-sm text-[11px] text-on-primary/80 font-light">${message}</div>
    </div>
    <button onclick="this.parentElement.remove()" class="text-on-primary/60 hover:text-on-primary transition-colors">
      <span class="material-symbols-outlined text-[16px]">close</span>
    </button>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto remove after 4.5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4500);
}

// ==========================================================================
// EVENT LISTENERS & LOOKBOOK HOOKS
// ==========================================================================
function setupEventListeners() {
  // ESC key closes any open drawer or modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeWishlist();
      closeQuickView();
      closeSearch();
      closeCheckout();
      closeAccount();
      closeSizeGuide();
    }
  });

  // Newsletter submission
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        showToast('Atelier Invitation Sent', `You are now subscribed to seasonal previews at ${emailInput.value}.`, 'mail');
        emailInput.value = '';
      }
    });
  }

  // Active navigation highlight on scroll
  const sections = document.querySelectorAll('section[id], main[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = sec.getAttribute('id');
      }
    });

    document.querySelectorAll('header nav a').forEach(a => {
      const path = a.getAttribute('data-path');
      if (path === current || (current === '' && path === 'home')) {
        a.className = 'transition-colors font-bold text-on-surface';
      } else {
        a.className = 'text-body-md text-on-surface-variant hover:text-on-surface transition-colors';
      }
    });
  });
}

function setupLookbookTriggers() {
  // Look 01 trigger connects to Product 1
  const look1Btn = document.getElementById('look01Btn');
  if (look1Btn) {
    look1Btn.addEventListener('click', (e) => {
      e.preventDefault();
      openQuickView(1);
    });
  }

  // Look 02 trigger connects to Product 2
  const look2Btn = document.getElementById('look02Btn');
  if (look2Btn) {
    look2Btn.addEventListener('click', (e) => {
      e.preventDefault();
      openQuickView(2);
    });
  }
}
