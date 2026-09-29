/* =========================================================
   SOLEVA — MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       BASIC HELPERS
    ===================================================== */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];


    /* =====================================================
       PAGE LOADER
    ===================================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {

            $("#page-loader")?.classList.add("hide");

        }, 700);

    });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const year = $("#current-year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       SOLEVA SHOE THEMES
    ===================================================== */

    const shoeThemes = [

        {
            image: "Assets/images/shoe.png",
            accent: "#9CFF00",
            color: "LIME"
        },

        {
            image: "Assets/images/shoe2.png",
            accent: "#4B6FFF",
            color: "BLUE"
        },

        {
            image: "Assets/images/shoe3.png",
            accent: "#D84A4A",
            color: "RED"
        },

        {
            image: "Assets/images/shoe4.png",
            accent: "#E88928",
            color: "ORANGE"
        }

    ];


    const root = document.documentElement;

    const shoeImage = $("#shoe-image");

    const shoeButtons =
        $$(".shoe-select");

    const heroNumber =
        $("#hero-style-number");

    const heroColor =
        $("#hero-color-name");

    const heroCurrent =
        $("#hero-current");

    const progressLine =
        $("#hero-progress-line");


    let currentShoe = 0;

    let sliderTimer = null;

    let progressTimer = null;


    /* =====================================================
       COLOR HELPER
    ===================================================== */

    function hexToRgba(hex, alpha) {

        const clean =
            hex.replace("#", "");

        const r =
            parseInt(clean.substring(0, 2), 16);

        const g =
            parseInt(clean.substring(2, 4), 16);

        const b =
            parseInt(clean.substring(4, 6), 16);

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;

    }


    /* =====================================================
       APPLY THEME
    ===================================================== */

    function applyTheme(theme) {

        root.style.setProperty(
            "--theme-accent",
            theme.accent
        );

        root.style.setProperty(
            "--theme-glow",
            hexToRgba(theme.accent, .35)
        );

        root.style.setProperty(
            "--theme-glow-soft",
            hexToRgba(theme.accent, .12)
        );

        if (heroColor) {
            heroColor.textContent =
                theme.color;
        }

    }


    /* =====================================================
       HERO SHOE
    ===================================================== */

    function updateHeroButtons() {

        shoeButtons.forEach((button, index) => {

            const active =
                index === currentShoe;

            button.classList.toggle(
                "active",
                active
            );

            button.setAttribute(
                "aria-pressed",
                String(active)
            );

        });

    }


    function resetProgress() {

        if (!progressLine) return;

        progressLine.style.transition = "none";

        progressLine.style.width = "0%";

        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                progressLine.style.transition =
                    "width 7s linear";

                progressLine.style.width =
                    "100%";

            });

        });

    }


    function showShoe(index, animate = true) {

        if (!shoeImage) return;

        currentShoe =
            (index + shoeThemes.length)
            % shoeThemes.length;

        const theme =
            shoeThemes[currentShoe];

        applyTheme(theme);

        updateHeroButtons();

        if (heroNumber) {
            heroNumber.textContent =
                String(currentShoe + 1)
                .padStart(2, "0");
        }

        if (heroCurrent) {
            heroCurrent.textContent =
                String(currentShoe + 1)
                .padStart(2, "0");
        }


        if (animate) {

            shoeImage.classList.add(
                "shoe-changing"
            );

            setTimeout(() => {

                shoeImage.src =
                    theme.image;

                shoeImage.classList.remove(
                    "shoe-changing"
                );

            }, 480);

        } else {

            shoeImage.src =
                theme.image;

        }

        resetProgress();

    }


    function startSlider() {

        clearInterval(sliderTimer);

        clearInterval(progressTimer);

        resetProgress();

        sliderTimer =
            setInterval(() => {

                showShoe(
                    currentShoe + 1,
                    true
                );

            }, 7000);

    }


    shoeButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                showShoe(
                    Number(button.dataset.index),
                    true
                );

                startSlider();

            }
        );

    });


    showShoe(0, false);

    startSlider();


    /* =====================================================
       HERO IMAGE CLICK
    ===================================================== */

    shoeImage?.addEventListener(
        "click",
        () => {

            $("#products")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    $$("[data-scroll]").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const target =
                    document.getElementById(
                        button.dataset.scroll
                    );

                target?.scrollIntoView({
                    behavior: "smooth"
                });

                closeMobileMenu();

            }
        );

    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle =
        $("#menu-toggle");

    const mobileNav =
        $("#mobile-nav");


    function closeMobileMenu() {

        menuToggle?.classList.remove(
            "active"
        );

        mobileNav?.classList.remove(
            "active"
        );

        menuToggle?.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    menuToggle?.addEventListener(
        "click",
        () => {

            const active =
                mobileNav?.classList.toggle(
                    "active"
                );

            menuToggle.classList.toggle(
                "active",
                active
            );

            menuToggle.setAttribute(
                "aria-expanded",
                String(Boolean(active))
            );

        }
    );


    $$("#mobile-nav a").forEach(link => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });


    /* =====================================================
       PRODUCTS DATABASE
    ===================================================== */

    const products = [

        {
            id: 1,
            name: "Velocity Runner",
            category: "running",
            price: 2999,
            image: "Assets/images/shoe.png",
            description:
                "Lightweight everyday running footwear.",
            color: "Lime",
            rating: 4.7,
            amazonUrl: "",
            flipkartUrl: ""
        },

        {
            id: 2,
            name: "Urban Street",
            category: "sneakers",
            price: 3499,
            image: "Assets/images/shoe2.png",
            description:
                "Clean streetwear styling for everyday use.",
            color: "Blue",
            rating: 4.6,
            amazonUrl: "",
            flipkartUrl: ""
        },

        {
            id: 3,
            name: "Shadow Sport",
            category: "sports",
            price: 4299,
            image: "Assets/images/shoe3.png",
            description:
                "Bold sport-focused footwear for active days.",
            color: "Red",
            rating: 4.8,
            amazonUrl: "",
            flipkartUrl: ""
        },

        {
            id: 4,
            name: "Classic Motion",
            category: "casual",
            price: 3799,
            image: "Assets/images/shoe4.png",
            description:
                "Minimal casual footwear with a premium feel.",
            color: "Orange",
            rating: 4.5,
            amazonUrl: "",
            flipkartUrl: ""
        },

        {
            id: 5,
            name: "Aero Flex",
            category: "running",
            price: 3199,
            image: "Assets/images/shoe.png",
            description:
                "Flexible everyday runner built for comfort.",
            color: "Lime",
            rating: 4.6,
            amazonUrl: "",
            flipkartUrl: ""
        },

        {
            id: 6,
            name: "Street Pulse",
            category: "sneakers",
            price: 3999,
            image: "Assets/images/shoe2.png",
            description:
                "Modern sneaker styling with a clean silhouette.",
            color: "Blue",
            rating: 4.7,
            amazonUrl: "",
            flipkartUrl: ""
        },

        {
            id: 7,
            name: "Power Strike",
            category: "sports",
            price: 4599,
            image: "Assets/images/shoe3.png",
            description:
                "Sporty design made for energetic movement.",
            color: "Red",
            rating: 4.8,
            amazonUrl: "",
            flipkartUrl: ""
        },

        {
            id: 8,
            name: "Daily Classic",
            category: "formal",
            price: 4299,
            image: "Assets/images/shoe4.png",
            description:
                "A refined silhouette for smart everyday looks.",
            color: "Orange",
            rating: 4.4,
            amazonUrl: "",
            flipkartUrl: ""
        }

    ];


    /* =====================================================
       PRODUCT STATE
    ===================================================== */

    let activeCategory = "all";

    let searchQuery = "";

    let sortMode = "featured";

    let wishlist = [];

    let cart = [];

    let comparison = [];

    let selectedProduct = null;


    /* =====================================================
       LOCAL STORAGE
    ===================================================== */

    function saveState() {

        localStorage.setItem(
            "soleva-wishlist",
            JSON.stringify(wishlist)
        );

        localStorage.setItem(
            "soleva-cart",
            JSON.stringify(cart)
        );

        localStorage.setItem(
            "soleva-comparison",
            JSON.stringify(comparison)
        );

    }


    function loadState() {

        try {

            wishlist =
                JSON.parse(
                    localStorage.getItem(
                        "soleva-wishlist"
                    )
                ) || [];

            cart =
                JSON.parse(
                    localStorage.getItem(
                        "soleva-cart"
                    )
                ) || [];

            comparison =
                JSON.parse(
                    localStorage.getItem(
                        "soleva-comparison"
                    )
                ) || [];

        } catch {

            wishlist = [];
            cart = [];
            comparison = [];

        }

    }


    loadState();


    /* =====================================================
       TOAST
    ===================================================== */

    function toast(message) {

        const container =
            $("#toast-container");

        if (!container) return;

        const item =
            document.createElement("div");

        item.className =
            "toast";

        item.textContent =
            message;

        container.appendChild(item);

        setTimeout(() => {

            item.style.opacity = "0";

            item.style.transform =
                "translateY(10px)";

            setTimeout(
                () => item.remove(),
                300
            );

        }, 2600);

    }


    /* =====================================================
       PRODUCT FILTERING
    ===================================================== */

    function getVisibleProducts() {

        let result =
            products.filter(product => {

                const categoryMatch =
                    activeCategory === "all" ||
                    product.category === activeCategory;

                const query =
                    searchQuery.toLowerCase();

                const searchMatch =
                    !query ||
                    product.name
                        .toLowerCase()
                        .includes(query) ||
                    product.category
                        .toLowerCase()
                        .includes(query) ||
                    product.color
                        .toLowerCase()
                        .includes(query);

                return categoryMatch &&
                    searchMatch;

            });


        if (sortMode === "price-low") {

            result.sort(
                (a, b) =>
                    a.price - b.price
            );

        }


        if (sortMode === "price-high") {

            result.sort(
                (a, b) =>
                    b.price - a.price
            );

        }


        if (sortMode === "name") {

            result.sort(
                (a, b) =>
                    a.name.localeCompare(
                        b.name
                    )
            );

        }


        return result;

    }


    /* =====================================================
       PRODUCT CARD
    ===================================================== */

    function productCard(product) {

        const isWishlisted =
            wishlist.includes(product.id);

        const isCompared =
            comparison.includes(product.id);

        return `

            <article
                class="product-card"
                data-product="${product.id}">

                <div class="product-image-wrap">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy">

                    <button
                        class="product-heart ${isWishlisted ? "active" : ""}"
                        data-wishlist="${product.id}"
                        type="button"
                        aria-label="Wishlist">

                        ${isWishlisted ? "♥" : "♡"}

                    </button>

                </div>


                <div class="product-info">

                    <span class="product-category">
                        ${product.category}
                    </span>

                    <h3>
                        ${product.name}
                    </h3>

                    <p class="product-description">
                        ${product.description}
                    </p>


                    <div class="product-bottom">

                        <strong class="product-price">
                            ₹${product.price.toLocaleString("en-IN")}
                        </strong>

                        <button
                            class="product-view"
                            data-view-product="${product.id}"
                            type="button">

                            View

                        </button>

                    </div>


                    <button
                        class="compare-mini ${isCompared ? "active" : ""}"
                        data-compare-product="${product.id}"
                        type="button">

                        ${isCompared
                            ? "✓ Added to compare"
                            : "⇄ Add to compare"}

                    </button>

                </div>

            </article>

        `;

    }


    /* =====================================================
       RENDER PRODUCTS
    ===================================================== */

    function renderProducts() {

        const grid =
            $("#products-grid");

        const empty =
            $("#empty-state");

        const resultCount =
            $("#results-count");

        if (!grid) return;

        const visible =
            getVisibleProducts();


        grid.innerHTML =
            visible
                .map(productCard)
                .join("");


        if (empty) {

            empty.hidden =
                visible.length !== 0;

        }


        if (resultCount) {

            resultCount.textContent =
                `Showing ${visible.length} product${visible.length === 1 ? "" : "s"}`;

        }


        updateProductButtons();

    }


    function updateProductButtons() {

        $$(".product-heart").forEach(button => {

            const id =
                Number(button.dataset.wishlist);

            const active =
                wishlist.includes(id);

            button.classList.toggle(
                "active",
                active
            );

            button.textContent =
                active ? "♥" : "♡";

        });


        $$(".compare-mini").forEach(button => {

            const id =
                Number(
                    button.dataset.compareProduct
                );

            const active =
                comparison.includes(id);

            button.classList.toggle(
                "active",
                active
            );

            button.textContent =
                active
                    ? "✓ Added to compare"
                    : "⇄ Add to compare";

        });

    }


    /* =====================================================
       PRODUCT EVENTS
    ===================================================== */

    $("#products-grid")
        ?.addEventListener(
            "click",
            event => {

                const wishlistButton =
                    event.target.closest(
                        "[data-wishlist]"
                    );

                const viewButton =
                    event.target.closest(
                        "[data-view-product]"
                    );

                const compareButton =
                    event.target.closest(
                        "[data-compare-product]"
                    );


                if (wishlistButton) {

                    toggleWishlist(
                        Number(
                            wishlistButton.dataset.wishlist
                        )
                    );

                    return;

                }


                if (compareButton) {

                    toggleCompare(
                        Number(
                            compareButton.dataset.compareProduct
                        )
                    );

                    return;

                }


                if (viewButton) {

                    openProductModal(
                        Number(
                            viewButton.dataset.viewProduct
                        )
                    );

                }

            }
        );


    /* =====================================================
       SEARCH
    ===================================================== */

    const searchInput =
        $("#product-search");

    function performSearch() {

        searchQuery =
            searchInput?.value
                .trim()
                .toLowerCase() || "";

        updateSearchClear();

        renderProducts();

    }


    searchInput?.addEventListener(
        "input",
        performSearch
    );


    $("#search-button")
        ?.addEventListener(
            "click",
            performSearch
        );


    searchInput?.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                event.preventDefault();

                performSearch();

            }

        }
    );


    function updateSearchClear() {

        const clear =
            $("#clear-search");

        if (!clear || !searchInput)
            return;

        clear.style.display =
            searchInput.value
                ? "flex"
                : "none";

    }


    $("#clear-search")
        ?.addEventListener(
            "click",
            () => {

                if (searchInput) {

                    searchInput.value =
                        "";

                    searchQuery =
                        "";

                }

                updateSearchClear();

                renderProducts();

            }
        );


    /* =====================================================
       CATEGORY
    ===================================================== */

    $$(".filter-btn").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                $$(".filter-btn")
                    .forEach(
                        btn =>
                            btn.classList.remove(
                                "active"
                            )
                    );

                button.classList.add(
                    "active"
                );

                activeCategory =
                    button.dataset.category;

                renderProducts();

            }
        );

    });


    /* =====================================================
       SORT
    ===================================================== */

    $("#product-sort")
        ?.addEventListener(
            "change",
            event => {

                sortMode =
                    event.target.value;

                renderProducts();

            }
        );


    /* =====================================================
       RESET
    ===================================================== */

    function resetFilters() {

        activeCategory =
            "all";

        searchQuery =
            "";

        sortMode =
            "featured";

        if (searchInput)
            searchInput.value = "";

        if ($("#product-sort"))
            $("#product-sort").value =
                "featured";

        $$(".filter-btn")
            .forEach(button => {

                button.classList.toggle(
                    "active",
                    button.dataset.category ===
                    "all"
                );

            });

        updateSearchClear();

        renderProducts();

    }


    $("#reset-filters")
        ?.addEventListener(
            "click",
            resetFilters
        );

    $("#empty-reset-btn")
        ?.addEventListener(
            "click",
            resetFilters
        );


    /* =====================================================
       WISHLIST
    ===================================================== */

    function toggleWishlist(id) {

        const index =
            wishlist.indexOf(id);

        if (index === -1) {

            wishlist.push(id);

            toast(
                "Added to your wishlist ❤️"
            );

        } else {

            wishlist.splice(
                index,
                1
            );

            toast(
                "Removed from wishlist"
            );

        }

        saveState();

        renderProducts();

        updateCounts();

        renderWishlist();

    }


    function renderWishlist() {

        const container =
            $("#wishlist-items");

        const empty =
            $("#wishlist-empty");

        if (!container) return;

        const items =
            wishlist
                .map(id =>
                    products.find(
                        product =>
                            product.id === id
                    )
                )
                .filter(Boolean);


        container.innerHTML =
            items.map(product => `

                <div class="drawer-product">

                    <img
                        src="${product.image}"
                        alt="${product.name}">

                    <div>

                        <h3>
                            ${product.name}
                        </h3>

                        <p>
                            ₹${product.price.toLocaleString("en-IN")}
                        </p>

                    </div>

                    <button
                        class="drawer-remove"
                        data-remove-wishlist="${product.id}"
                        type="button">

                        ×

                    </button>

                </div>

            `).join("");


        if (empty) {

            empty.style.display =
                items.length
                    ? "none"
                    : "block";

        }

    }


    $("#wishlist-items")
        ?.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest(
                        "[data-remove-wishlist]"
                    );

                if (!button) return;

                toggleWishlist(
                    Number(
                        button.dataset.removeWishlist
                    )
                );

            }
        );


    /* =====================================================
       CART
    ===================================================== */

    function addToCart(id) {

        if (!cart.includes(id)) {

            cart.push(id);

            toast(
                "Added to your cart 🛒"
            );

        } else {

            toast(
                "Already in your cart"
            );

        }

        saveState();

        updateCounts();

        renderCart();

    }


    function removeFromCart(id) {

        cart =
            cart.filter(
                productId =>
                    productId !== id
            );

        saveState();

        renderCart();

        updateCounts();

        toast(
            "Removed from cart"
        );

    }


    function renderCart() {

        const container =
            $("#cart-items");

        const empty =
            $("#cart-empty");

        const summary =
            $("#cart-summary");

        if (!container) return;


        const items =
            cart
                .map(id =>
                    products.find(
                        product =>
                            product.id === id
                    )
                )
                .filter(Boolean);


        container.innerHTML =
            items.map(product => `

                <div class="drawer-product">

                    <img
                        src="${product.image}"
                        alt="${product.name}">

                    <div>

                        <h3>
                            ${product.name}
                        </h3>

                        <p>
                            ₹${product.price.toLocaleString("en-IN")}
                        </p>

                    </div>

                    <button
                        class="drawer-remove"
                        data-remove-cart="${product.id}"
                        type="button">

                        ×

                    </button>

                </div>

            `).join("");


        if (empty) {

            empty.style.display =
                items.length
                    ? "none"
                    : "block";

        }


        if (summary) {

            summary.hidden =
                items.length === 0;

        }


        const total =
            items.reduce(
                (sum, product) =>
                    sum + product.price,
                0
            );


        const totalElement =
            $("#cart-total");

        if (totalElement) {

            totalElement.textContent =
                `₹${total.toLocaleString("en-IN")}`;

        }

    }


    $("#cart-items")
        ?.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest(
                        "[data-remove-cart]"
                    );

                if (!button) return;

                removeFromCart(
                    Number(
                        button.dataset.removeCart
                    )
                );

            }
        );


    /* =====================================================
       COUNTS
    ===================================================== */

    function updateCounts() {

        const wishlistCount =
            $("#wishlist-count");

        const cartCount =
            $("#cart-count");

        if (wishlistCount) {

            wishlistCount.textContent =
                wishlist.length;

        }

        if (cartCount) {

            cartCount.textContent =
                cart.length;

        }

    }


    /* =====================================================
       COMPARE
    ===================================================== */

    function toggleCompare(id) {

        if (comparison.includes(id)) {

            comparison =
                comparison.filter(
                    productId =>
                        productId !== id
                );

            toast(
                "Removed from comparison"
            );

        } else {

            if (comparison.length >= 3) {

                toast(
                    "You can compare up to 3 products"
                );

                return;

            }

            comparison.push(id);

            toast(
                "Added to comparison ⇄"
            );

        }

        saveState();

        renderProducts();

        renderCompare();

    }


    function renderCompare() {

        const empty =
            $("#compare-empty");

        const content =
            $("#compare-content");

        const count =
            $("#compare-count");

        if (count) {

            count.textContent =
                `${comparison.length} / 3`;

        }


        if (comparison.length === 0) {

            if (empty)
                empty.hidden = false;

            if (content)
                content.hidden = true;

            return;

        }


        if (empty)
            empty.hidden = true;

        if (content)
            content.hidden = false;


        const items =
            comparison
                .map(id =>
                    products.find(
                        product =>
                            product.id === id
                    )
                )
                .filter(Boolean);


        const head =
            $("#compare-table-head");

        const body =
            $("#compare-table-body");


        if (head) {

            head.innerHTML = `

                <tr>

                    <th>Feature</th>

                    ${items.map(
                        product => `

                        <th>

                            ${product.name}

                            <br>

                            <button
                                class="compare-remove"
                                data-remove-compare="${product.id}"
                                type="button">

                                Remove

                            </button>

                        </th>

                    `).join("")}

                </tr>

            `;

        }


        if (body) {

            body.innerHTML = `

                <tr>

                    <td>Category</td>

                    ${items.map(
                        product =>
                            `<td>${product.category}</td>`
                    ).join("")}

                </tr>


                <tr>

                    <td>Price</td>

                    ${items.map(
                        product =>
                            `<td><strong>₹${product.price.toLocaleString("en-IN")}</strong></td>`
                    ).join("")}

                </tr>


                <tr>

                    <td>Colour</td>

                    ${items.map(
                        product =>
                            `<td>${product.color}</td>`
                    ).join("")}

                </tr>


                <tr>

                    <td>Rating</td>

                    ${items.map(
                        product =>
                            `<td>★ ${product.rating}</td>`
                    ).join("")}

                </tr>

            `;

        }

    }


    $("#compare-table-body")
        ?.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest(
                        "[data-remove-compare]"
                    );

                if (!button) return;

                toggleCompare(
                    Number(
                        button.dataset.removeCompare
                    )
                );

            }
        );


    $("#clear-compare")
        ?.addEventListener(
            "click",
            () => {

                comparison = [];

                saveState();

                renderProducts();

                renderCompare();

                toast(
                    "Comparison cleared"
                );

            }
        );


    /* =====================================================
       PRODUCT MODAL
    ===================================================== */

    function openProductModal(id) {

        const product =
            products.find(
                item =>
                    item.id === id
            );

        if (!product) return;

        selectedProduct =
            product;


        $("#modal-product-image").src =
            product.image;

        $("#modal-product-image").alt =
            product.name;

        $("#modal-product-name")
            .textContent =
            product.name;

        $("#modal-product-category")
            .textContent =
            product.category;

        $("#modal-product-description")
            .textContent =
            product.description;

        $("#modal-product-price")
            .textContent =
            `₹${product.price.toLocaleString("en-IN")}`;


        const amazon =
            $("#modal-amazon-link");

        const flipkart =
            $("#modal-flipkart-link");


        if (product.amazonUrl) {

            amazon.href =
                product.amazonUrl;

            amazon.hidden =
                false;

        } else {

            amazon.hidden =
                true;

        }


        if (product.flipkartUrl) {

            flipkart.href =
                product.flipkartUrl;

            flipkart.hidden =
                false;

        } else {

            flipkart.hidden =
                true;

        }


        $("#product-modal")
            ?.classList.add(
                "active"
            );

        $("#product-modal")
            ?.setAttribute(
                "aria-hidden",
                "false"
            );

        document.body.classList.add(
            "no-scroll"
        );

    }


    function closeProductModal() {

        $("#product-modal")
            ?.classList.remove(
                "active"
            );

        $("#product-modal")
            ?.setAttribute(
                "aria-hidden",
                "true"
            );

        document.body.classList.remove(
            "no-scroll"
        );

        selectedProduct =
            null;

    }


    $("[data-close-product]")
        ?.addEventListener(
            "click",
            closeProductModal
        );


    $("#product-modal")
        ?.addEventListener(
            "click",
            event => {

                if (
                    event.target.id ===
                    "product-modal"
                ) {

                    closeProductModal();

                }

            }
        );


    $("#modal-add-cart")
        ?.addEventListener(
            "click",
            () => {

                if (!selectedProduct)
                    return;

                addToCart(
                    selectedProduct.id
                );

                closeProductModal();

            }
        );


    $("#modal-add-wishlist")
        ?.addEventListener(
            "click",
            () => {

                if (!selectedProduct)
                    return;

                toggleWishlist(
                    selectedProduct.id
                );

            }
        );


    $("#modal-add-compare")
        ?.addEventListener(
            "click",
            () => {

                if (!selectedProduct)
                    return;

                toggleCompare(
                    selectedProduct.id
                );

            }
        );


    /* =====================================================
       DRAWERS
    ===================================================== */

    function openDrawer(id) {

        const drawer =
            $(`#${id}`);

        if (!drawer) return;

        drawer.classList.add(
            "active"
        );

        document.body.classList.add(
            "no-scroll"
        );

    }


    function closeDrawer(id) {

        const drawer =
            $(`#${id}`);

        if (!drawer) return;

        drawer.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "no-scroll"
        );

    }


    $("#wishlist-btn")
        ?.addEventListener(
            "click",
            () => {

                renderWishlist();

                openDrawer(
                    "wishlist-overlay"
                );

            }
        );


    $("#cart-btn")
        ?.addEventListener(
            "click",
            () => {

                renderCart();

                openDrawer(
                    "cart-overlay"
                );

            }
        );


    $("[data-close-wishlist]")
        ?.addEventListener(
            "click",
            () =>
                closeDrawer(
                    "wishlist-overlay"
                )
        );


    $("[data-close-cart]")
        ?.addEventListener(
            "click",
            () =>
                closeDrawer(
                    "cart-overlay"
                )
        );


    $("#wishlist-overlay")
        ?.addEventListener(
            "click",
            event => {

                if (
                    event.target.id ===
                    "wishlist-overlay"
                ) {

                    closeDrawer(
                        "wishlist-overlay"
                    );

                }

            }
        );


    $("#cart-overlay")
        ?.addEventListener(
            "click",
            event => {

                if (
                    event.target.id ===
                    "cart-overlay"
                ) {

                    closeDrawer(
                        "cart-overlay"
                    );

                }

            }
        );


    /* =====================================================
       ACCOUNT AUTH
    ===================================================== */

    const authOverlay =
        $("#auth-overlay");

    const authModal =
        $(".auth-modal");


    function openAuth(view = "signin") {

        setAuthView(view);

        authOverlay?.classList.add(
            "active"
        );

        authOverlay?.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "no-scroll"
        );

    }


    function closeAuth() {

        authOverlay?.classList.remove(
            "active"
        );

        authOverlay?.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "no-scroll"
        );

    }


    function setAuthView(view) {

        const signin =
            $("#auth-signin-view");

        const signup =
            $("#auth-signup-view");

        const forgot =
            $("#auth-forgot-view");


        if (signin)
            signin.hidden =
                view !== "signin";

        if (signup)
            signup.hidden =
                view !== "signup";

        if (forgot)
            forgot.hidden =
                view !== "forgot";

    }


    $("#account-btn")
        ?.addEventListener(
            "click",
            () => openAuth("signin")
        );


    $("#mobile-account-btn")
        ?.addEventListener(
            "click",
            () => {

                closeMobileMenu();

                openAuth("signin");

            }
        );


    $("#auth-close")
        ?.addEventListener(
            "click",
            closeAuth
        );


    authOverlay?.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                authOverlay
            ) {

                closeAuth();

            }

        }
    );


    $("#create-account-btn")
        ?.addEventListener(
            "click",
            () =>
                setAuthView("signup")
        );


    $("#back-to-signin")
        ?.addEventListener(
            "click",
            () =>
                setAuthView("signin")
        );


    $("#forgot-password-btn")
        ?.addEventListener(
            "click",
            () =>
                setAuthView("forgot")
        );


    $("#back-from-forgot")
        ?.addEventListener(
            "click",
            () =>
                setAuthView("signin")
        );


    /* =====================================================
       PASSWORD TOGGLE
    ===================================================== */

    $("#password-toggle")
        ?.addEventListener(
            "click",
            event => {

                const input =
                    $("#signin-password");

                if (!input) return;

                const visible =
                    input.type === "text";

                input.type =
                    visible
                        ? "password"
                        : "text";

                event.currentTarget.textContent =
                    visible
                        ? "Show"
                        : "Hide";

            }
        );


    $$(".password-toggle")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const input =
                        $(`#${button.dataset.password}`);

                    if (!input) return;

                    const visible =
                        input.type === "text";

                    input.type =
                        visible
                            ? "password"
                            : "text";

                    button.textContent =
                        visible
                            ? "Show"
                            : "Hide";

                }
            );

        });


    /* =====================================================
       SIGN IN
    ===================================================== */

    $("#sign-in-form")
        ?.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                toast(
                    "Demo sign-in completed. Backend authentication will be connected later."
                );

                closeAuth();

            }
        );


    /* =====================================================
       SIGN UP
    ===================================================== */

    $("#sign-up-form")
        ?.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const password =
                    $("#signup-password")?.value;

                const confirm =
                    $("#signup-confirm-password")?.value;


                if (
                    password !== confirm
                ) {

                    toast(
                        "Passwords do not match."
                    );

                    return;

                }


                toast(
                    "Demo account created. Database connection will be added later."
                );

                closeAuth();

            }
        );


    /* =====================================================
       FORGOT PASSWORD
    ===================================================== */

    $("#forgot-password-form")
        ?.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                toast(
                    "Password reset demo submitted."
                );

                closeAuth();

            }
        );


    /* =====================================================
       GOOGLE
    ===================================================== */

    $("#google-signin-btn")
        ?.addEventListener(
            "click",
            () => {

                toast(
                    "Google authentication will be connected later."
                );

            }
        );


    /* =====================================================
       NEWSLETTER
    ===================================================== */

    $("#newsletter-form")
        ?.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const email =
                    $("#newsletter-email")
                        ?.value.trim();

                if (!email) return;

                toast(
                    "You're on the SOLEVA update list ✨"
                );

                event.target.reset();

            }
        );


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    $("#back-to-top")
        ?.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Escape"
            ) return;

            closeAuth();

            closeProductModal();

            closeDrawer(
                "wishlist-overlay"
            );

            closeDrawer(
                "cart-overlay"
            );

            closeMobileMenu();

        }
    );


    /* =====================================================
       NAV ACTIVE LINK
    ===================================================== */

    const sections =
        $$("main section[id]");

    const navLinks =
        $$(".nav-link");


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (!entry.isIntersecting)
                            return;

                        navLinks.forEach(
                            link => {

                                link.classList.toggle(
                                    "active",
                                    link.getAttribute(
                                        "href"
                                    ) ===
                                    `#${entry.target.id}`
                                );

                            }
                        );

                    }
                );

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach(
        section =>
            observer.observe(section)
    );


    /* =====================================================
       INITIAL RENDER
    ===================================================== */

    updateCounts();

    renderProducts();

    renderWishlist();

    renderCart();

    renderCompare();

});/* =========================================================
   SOLEVA — MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       BASIC HELPERS
    ===================================================== */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];


    /* =====================================================
       PAGE LOADER
    ===================================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {

            $("#page-loader")?.classList.add("hide");

        }, 700);

    });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const year = $("#current-year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       SOLEVA SHOE THEMES
    ===================================================== */

    const shoeThemes = [

        {
            image: "Assets/images/shoe.png",
            accent: "#9CFF00",
            color: "LIME"
        },

        {
            image: "Assets/images/shoe2.png",
            accent: "#4B6FFF",
            color: "BLUE"
        },

        {
            image: "Assets/images/shoe3.png",
            accent: "#D84A4A",
            color: "RED"
        },

        {
            image: "Assets/images/shoe4.png",
            accent: "#E88928",
            color: "ORANGE"
        }

    ];


    const root = document.documentElement;

    const shoeImage = $("#shoe-image");

    const shoeButtons =
        $$(".shoe-select");

    const heroNumber =
        $("#hero-style-number");

    const heroColor =
        $("#hero-color-name");

    const heroCurrent =
        $("#hero-current");

    const progressLine =
        $("#hero-progress-line");


    let currentShoe = 0;

    let sliderTimer = null;

    let progressTimer = null;


    /* =====================================================
       COLOR HELPER
    ===================================================== */

    function hexToRgba(hex, alpha) {

        const clean =
            hex.replace("#", "");

        const r =
            parseInt(clean.substring(0, 2), 16);

        const g =
            parseInt(clean.substring(2, 4), 16);

        const b =
            parseInt(clean.substring(4, 6), 16);

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;

    }


    /* =====================================================
       APPLY THEME
    ===================================================== */

    function applyTheme(theme) {

        root.style.setProperty(
            "--theme-accent",
            theme.accent
        );

        root.style.setProperty(
            "--theme-glow",
            hexToRgba(theme.accent, .35)
        );

        root.style.setProperty(
            "--theme-glow-soft",
            hexToRgba(theme.accent, .12)
        );

        if (heroColor) {
            heroColor.textContent =
                theme.color;
        }

    }


    /* =====================================================
       HERO SHOE
    ===================================================== */

    function updateHeroButtons() {

        shoeButtons.forEach((button, index) => {

            const active =
                index === currentShoe;

            button.classList.toggle(
                "active",
                active
            );

            button.setAttribute(
                "aria-pressed",
                String(active)
            );

        });

    }


    function resetProgress() {

        if (!progressLine) return;

        progressLine.style.transition = "none";

        progressLine.style.width = "0%";

        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                progressLine.style.transition =
                    "width 7s linear";

                progressLine.style.width =
                    "100%";

            });

        });

    }


    function showShoe(index, animate = true) {

        if (!shoeImage) return;

        currentShoe =
            (index + shoeThemes.length)
            % shoeThemes.length;

        const theme =
            shoeThemes[currentShoe];

        applyTheme(theme);

        updateHeroButtons();

        if (heroNumber) {
            heroNumber.textContent =
                String(currentShoe + 1)
                .padStart(2, "0");
        }

        if (heroCurrent) {
            heroCurrent.textContent =
                String(currentShoe + 1)
                .padStart(2, "0");
        }


        if (animate) {

            shoeImage.classList.add(
                "shoe-changing"
            );

            setTimeout(() => {

                shoeImage.src =
                    theme.image;

                shoeImage.classList.remove(
                    "shoe-changing"
                );

            }, 480);

        } else {

            shoeImage.src =
                theme.image;

        }

        resetProgress();

    }


    function startSlider() {

        clearInterval(sliderTimer);

        clearInterval(progressTimer);

        resetProgress();

        sliderTimer =
            setInterval(() => {

                showShoe(
                    currentShoe + 1,
                    true
                );

            }, 7000);

    }


    shoeButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                showShoe(
                    Number(button.dataset.index),
                    true
                );

                startSlider();

            }
        );

    });


    showShoe(0, false);

    startSlider();


    /* =====================================================
       HERO IMAGE CLICK
    ===================================================== */

    shoeImage?.addEventListener(
        "click",
        () => {

            $("#products")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    $$("[data-scroll]").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const target =
                    document.getElementById(
                        button.dataset.scroll
                    );

                target?.scrollIntoView({
                    behavior: "smooth"
                });

                closeMobileMenu();

            }
        );

    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle =
        $("#menu-toggle");

    const mobileNav =
        $("#mobile-nav");


    function closeMobileMenu() {

        menuToggle?.classList.remove(
            "active"
        );

        mobileNav?.classList.remove(
            "active"
        );

        menuToggle?.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    menuToggle?.addEventListener(
        "click",
        () => {

            const active =
                mobileNav?.classList.toggle(
                    "active"
                );

            menuToggle.classList.toggle(
                "active",
                active
            );

            menuToggle.setAttribute(
                "aria-expanded",
                String(Boolean(active))
            );

        }
    );


    $$("#mobile-nav a").forEach(link => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });


    /* =====================================================
       PRODUCTS DATABASE
    ===================================================== */

    const products = [

        {
            id: 1,
            name: "Velocity Runner",
            category: "running",
            price: 2999,
            image: "Assets/images/shoe.png",
            description:
                "Lightweight everyday running footwear.",
            color: "Lime",
            rating: 4.7,
            amazonUrl: "",
            flipkartUrl: ""
        },

        {
            id: 2,
            name: "Urban Street",
            category: "sneakers",
            price: 3499,
            image: "Assets/images/shoe2.png",
            description:
                "Clean streetwear styling for everyday use.",
            color: "Blue",
            rating: 4.6,
            amazonUrl: "",
            flipkartUrl: ""
        },

        {
            id: 3,
            name: "Shadow Sport",
            category: "sports",
            price: 4299,
            image: "Assets/images/shoe3.png",
            description:
                "Bold sport-focused footwear for active days.",
            color: "Red",
            rating: 4.8,
            amazonUrl: "",
            flipkartUrl: ""
        },

        {
            id: 4,
            name: "Classic Motion",
            category: "casual",
            price: 3799,
            image: "Assets/images/shoe4.png",
            description:
                "Minimal casual footwear with a premium feel.",
            color: "Orange",
            rating: 4.5,
            amazonUrl: "",
            flipkartUrl: ""
        },

        {
            id: 5,
            name: "Aero Flex",
            category: "running",
            price: 3199,
            image: "Assets/images/shoe.png",
            description:
                "Flexible everyday runner built for comfort.",
            color: "Lime",
            rating: 4.6,
            amazonUrl: "",
            flipkartUrl: ""
        },

        {
            id: 6,
            name: "Street Pulse",
            category: "sneakers",
            price: 3999,
            image: "Assets/images/shoe2.png",
            description:
                "Modern sneaker styling with a clean silhouette.",
            color: "Blue",
            rating: 4.7,
            amazonUrl: "",
            flipkartUrl: ""
        },

        {
            id: 7,
            name: "Power Strike",
            category: "sports",
            price: 4599,
            image: "Assets/images/shoe3.png",
            description:
                "Sporty design made for energetic movement.",
            color: "Red",
            rating: 4.8,
            amazonUrl: "",
            flipkartUrl: ""
        },

        {
            id: 8,
            name: "Daily Classic",
            category: "formal",
            price: 4299,
            image: "Assets/images/shoe4.png",
            description:
                "A refined silhouette for smart everyday looks.",
            color: "Orange",
            rating: 4.4,
            amazonUrl: "",
            flipkartUrl: ""
        }

    ];


    /* =====================================================
       PRODUCT STATE
    ===================================================== */

    let activeCategory = "all";

    let searchQuery = "";

    let sortMode = "featured";

    let wishlist = [];

    let cart = [];

    let comparison = [];

    let selectedProduct = null;


    /* =====================================================
       LOCAL STORAGE
    ===================================================== */

    function saveState() {

        localStorage.setItem(
            "soleva-wishlist",
            JSON.stringify(wishlist)
        );

        localStorage.setItem(
            "soleva-cart",
            JSON.stringify(cart)
        );

        localStorage.setItem(
            "soleva-comparison",
            JSON.stringify(comparison)
        );

    }


    function loadState() {

        try {

            wishlist =
                JSON.parse(
                    localStorage.getItem(
                        "soleva-wishlist"
                    )
                ) || [];

            cart =
                JSON.parse(
                    localStorage.getItem(
                        "soleva-cart"
                    )
                ) || [];

            comparison =
                JSON.parse(
                    localStorage.getItem(
                        "soleva-comparison"
                    )
                ) || [];

        } catch {

            wishlist = [];
            cart = [];
            comparison = [];

        }

    }


    loadState();


    /* =====================================================
       TOAST
    ===================================================== */

    function toast(message) {

        const container =
            $("#toast-container");

        if (!container) return;

        const item =
            document.createElement("div");

        item.className =
            "toast";

        item.textContent =
            message;

        container.appendChild(item);

        setTimeout(() => {

            item.style.opacity = "0";

            item.style.transform =
                "translateY(10px)";

            setTimeout(
                () => item.remove(),
                300
            );

        }, 2600);

    }


    /* =====================================================
       PRODUCT FILTERING
    ===================================================== */

    function getVisibleProducts() {

        let result =
            products.filter(product => {

                const categoryMatch =
                    activeCategory === "all" ||
                    product.category === activeCategory;

                const query =
                    searchQuery.toLowerCase();

                const searchMatch =
                    !query ||
                    product.name
                        .toLowerCase()
                        .includes(query) ||
                    product.category
                        .toLowerCase()
                        .includes(query) ||
                    product.color
                        .toLowerCase()
                        .includes(query);

                return categoryMatch &&
                    searchMatch;

            });


        if (sortMode === "price-low") {

            result.sort(
                (a, b) =>
                    a.price - b.price
            );

        }


        if (sortMode === "price-high") {

            result.sort(
                (a, b) =>
                    b.price - a.price
            );

        }


        if (sortMode === "name") {

            result.sort(
                (a, b) =>
                    a.name.localeCompare(
                        b.name
                    )
            );

        }


        return result;

    }


    /* =====================================================
       PRODUCT CARD
    ===================================================== */

    function productCard(product) {

        const isWishlisted =
            wishlist.includes(product.id);

        const isCompared =
            comparison.includes(product.id);

        return `

            <article
                class="product-card"
                data-product="${product.id}">

                <div class="product-image-wrap">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy">

                    <button
                        class="product-heart ${isWishlisted ? "active" : ""}"
                        data-wishlist="${product.id}"
                        type="button"
                        aria-label="Wishlist">

                        ${isWishlisted ? "♥" : "♡"}

                    </button>

                </div>


                <div class="product-info">

                    <span class="product-category">
                        ${product.category}
                    </span>

                    <h3>
                        ${product.name}
                    </h3>

                    <p class="product-description">
                        ${product.description}
                    </p>


                    <div class="product-bottom">

                        <strong class="product-price">
                            ₹${product.price.toLocaleString("en-IN")}
                        </strong>

                        <button
                            class="product-view"
                            data-view-product="${product.id}"
                            type="button">

                            View

                        </button>

                    </div>


                    <button
                        class="compare-mini ${isCompared ? "active" : ""}"
                        data-compare-product="${product.id}"
                        type="button">

                        ${isCompared
                            ? "✓ Added to compare"
                            : "⇄ Add to compare"}

                    </button>

                </div>

            </article>

        `;

    }


    /* =====================================================
       RENDER PRODUCTS
    ===================================================== */

    function renderProducts() {

        const grid =
            $("#products-grid");

        const empty =
            $("#empty-state");

        const resultCount =
            $("#results-count");

        if (!grid) return;

        const visible =
            getVisibleProducts();


        grid.innerHTML =
            visible
                .map(productCard)
                .join("");


        if (empty) {

            empty.hidden =
                visible.length !== 0;

        }


        if (resultCount) {

            resultCount.textContent =
                `Showing ${visible.length} product${visible.length === 1 ? "" : "s"}`;

        }


        updateProductButtons();

    }


    function updateProductButtons() {

        $$(".product-heart").forEach(button => {

            const id =
                Number(button.dataset.wishlist);

            const active =
                wishlist.includes(id);

            button.classList.toggle(
                "active",
                active
            );

            button.textContent =
                active ? "♥" : "♡";

        });


        $$(".compare-mini").forEach(button => {

            const id =
                Number(
                    button.dataset.compareProduct
                );

            const active =
                comparison.includes(id);

            button.classList.toggle(
                "active",
                active
            );

            button.textContent =
                active
                    ? "✓ Added to compare"
                    : "⇄ Add to compare";

        });

    }


    /* =====================================================
       PRODUCT EVENTS
    ===================================================== */

    $("#products-grid")
        ?.addEventListener(
            "click",
            event => {

                const wishlistButton =
                    event.target.closest(
                        "[data-wishlist]"
                    );

                const viewButton =
                    event.target.closest(
                        "[data-view-product]"
                    );

                const compareButton =
                    event.target.closest(
                        "[data-compare-product]"
                    );


                if (wishlistButton) {

                    toggleWishlist(
                        Number(
                            wishlistButton.dataset.wishlist
                        )
                    );

                    return;

                }


                if (compareButton) {

                    toggleCompare(
                        Number(
                            compareButton.dataset.compareProduct
                        )
                    );

                    return;

                }


                if (viewButton) {

                    openProductModal(
                        Number(
                            viewButton.dataset.viewProduct
                        )
                    );

                }

            }
        );


    /* =====================================================
       SEARCH
    ===================================================== */

    const searchInput =
        $("#product-search");

    function performSearch() {

        searchQuery =
            searchInput?.value
                .trim()
                .toLowerCase() || "";

        updateSearchClear();

        renderProducts();

    }


    searchInput?.addEventListener(
        "input",
        performSearch
    );


    $("#search-button")
        ?.addEventListener(
            "click",
            performSearch
        );


    searchInput?.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                event.preventDefault();

                performSearch();

            }

        }
    );


    function updateSearchClear() {

        const clear =
            $("#clear-search");

        if (!clear || !searchInput)
            return;

        clear.style.display =
            searchInput.value
                ? "flex"
                : "none";

    }


    $("#clear-search")
        ?.addEventListener(
            "click",
            () => {

                if (searchInput) {

                    searchInput.value =
                        "";

                    searchQuery =
                        "";

                }

                updateSearchClear();

                renderProducts();

            }
        );


    /* =====================================================
       CATEGORY
    ===================================================== */

    $$(".filter-btn").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                $$(".filter-btn")
                    .forEach(
                        btn =>
                            btn.classList.remove(
                                "active"
                            )
                    );

                button.classList.add(
                    "active"
                );

                activeCategory =
                    button.dataset.category;

                renderProducts();

            }
        );

    });


    /* =====================================================
       SORT
    ===================================================== */

    $("#product-sort")
        ?.addEventListener(
            "change",
            event => {

                sortMode =
                    event.target.value;

                renderProducts();

            }
        );


    /* =====================================================
       RESET
    ===================================================== */

    function resetFilters() {

        activeCategory =
            "all";

        searchQuery =
            "";

        sortMode =
            "featured";

        if (searchInput)
            searchInput.value = "";

        if ($("#product-sort"))
            $("#product-sort").value =
                "featured";

        $$(".filter-btn")
            .forEach(button => {

                button.classList.toggle(
                    "active",
                    button.dataset.category ===
                    "all"
                );

            });

        updateSearchClear();

        renderProducts();

    }


    $("#reset-filters")
        ?.addEventListener(
            "click",
            resetFilters
        );

    $("#empty-reset-btn")
        ?.addEventListener(
            "click",
            resetFilters
        );


    /* =====================================================
       WISHLIST
    ===================================================== */

    function toggleWishlist(id) {

        const index =
            wishlist.indexOf(id);

        if (index === -1) {

            wishlist.push(id);

            toast(
                "Added to your wishlist ❤️"
            );

        } else {

            wishlist.splice(
                index,
                1
            );

            toast(
                "Removed from wishlist"
            );

        }

        saveState();

        renderProducts();

        updateCounts();

        renderWishlist();

    }


    function renderWishlist() {

        const container =
            $("#wishlist-items");

        const empty =
            $("#wishlist-empty");

        if (!container) return;

        const items =
            wishlist
                .map(id =>
                    products.find(
                        product =>
                            product.id === id
                    )
                )
                .filter(Boolean);


        container.innerHTML =
            items.map(product => `

                <div class="drawer-product">

                    <img
                        src="${product.image}"
                        alt="${product.name}">

                    <div>

                        <h3>
                            ${product.name}
                        </h3>

                        <p>
                            ₹${product.price.toLocaleString("en-IN")}
                        </p>

                    </div>

                    <button
                        class="drawer-remove"
                        data-remove-wishlist="${product.id}"
                        type="button">

                        ×

                    </button>

                </div>

            `).join("");


        if (empty) {

            empty.style.display =
                items.length
                    ? "none"
                    : "block";

        }

    }


    $("#wishlist-items")
        ?.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest(
                        "[data-remove-wishlist]"
                    );

                if (!button) return;

                toggleWishlist(
                    Number(
                        button.dataset.removeWishlist
                    )
                );

            }
        );


    /* =====================================================
       CART
    ===================================================== */

    function addToCart(id) {

        if (!cart.includes(id)) {

            cart.push(id);

            toast(
                "Added to your cart 🛒"
            );

        } else {

            toast(
                "Already in your cart"
            );

        }

        saveState();

        updateCounts();

        renderCart();

    }


    function removeFromCart(id) {

        cart =
            cart.filter(
                productId =>
                    productId !== id
            );

        saveState();

        renderCart();

        updateCounts();

        toast(
            "Removed from cart"
        );

    }


    function renderCart() {

        const container =
            $("#cart-items");

        const empty =
            $("#cart-empty");

        const summary =
            $("#cart-summary");

        if (!container) return;


        const items =
            cart
                .map(id =>
                    products.find(
                        product =>
                            product.id === id
                    )
                )
                .filter(Boolean);


        container.innerHTML =
            items.map(product => `

                <div class="drawer-product">

                    <img
                        src="${product.image}"
                        alt="${product.name}">

                    <div>

                        <h3>
                            ${product.name}
                        </h3>

                        <p>
                            ₹${product.price.toLocaleString("en-IN")}
                        </p>

                    </div>

                    <button
                        class="drawer-remove"
                        data-remove-cart="${product.id}"
                        type="button">

                        ×

                    </button>

                </div>

            `).join("");


        if (empty) {

            empty.style.display =
                items.length
                    ? "none"
                    : "block";

        }


        if (summary) {

            summary.hidden =
                items.length === 0;

        }


        const total =
            items.reduce(
                (sum, product) =>
                    sum + product.price,
                0
            );


        const totalElement =
            $("#cart-total");

        if (totalElement) {

            totalElement.textContent =
                `₹${total.toLocaleString("en-IN")}`;

        }

    }


    $("#cart-items")
        ?.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest(
                        "[data-remove-cart]"
                    );

                if (!button) return;

                removeFromCart(
                    Number(
                        button.dataset.removeCart
                    )
                );

            }
        );


    /* =====================================================
       COUNTS
    ===================================================== */

    function updateCounts() {

        const wishlistCount =
            $("#wishlist-count");

        const cartCount =
            $("#cart-count");

        if (wishlistCount) {

            wishlistCount.textContent =
                wishlist.length;

        }

        if (cartCount) {

            cartCount.textContent =
                cart.length;

        }

    }


    /* =====================================================
       COMPARE
    ===================================================== */

    function toggleCompare(id) {

        if (comparison.includes(id)) {

            comparison =
                comparison.filter(
                    productId =>
                        productId !== id
                );

            toast(
                "Removed from comparison"
            );

        } else {

            if (comparison.length >= 3) {

                toast(
                    "You can compare up to 3 products"
                );

                return;

            }

            comparison.push(id);

            toast(
                "Added to comparison ⇄"
            );

        }

        saveState();

        renderProducts();

        renderCompare();

    }


    function renderCompare() {

        const empty =
            $("#compare-empty");

        const content =
            $("#compare-content");

        const count =
            $("#compare-count");

        if (count) {

            count.textContent =
                `${comparison.length} / 3`;

        }


        if (comparison.length === 0) {

            if (empty)
                empty.hidden = false;

            if (content)
                content.hidden = true;

            return;

        }


        if (empty)
            empty.hidden = true;

        if (content)
            content.hidden = false;


        const items =
            comparison
                .map(id =>
                    products.find(
                        product =>
                            product.id === id
                    )
                )
                .filter(Boolean);


        const head =
            $("#compare-table-head");

        const body =
            $("#compare-table-body");


        if (head) {

            head.innerHTML = `

                <tr>

                    <th>Feature</th>

                    ${items.map(
                        product => `

                        <th>

                            ${product.name}

                            <br>

                            <button
                                class="compare-remove"
                                data-remove-compare="${product.id}"
                                type="button">

                                Remove

                            </button>

                        </th>

                    `).join("")}

                </tr>

            `;

        }


        if (body) {

            body.innerHTML = `

                <tr>

                    <td>Category</td>

                    ${items.map(
                        product =>
                            `<td>${product.category}</td>`
                    ).join("")}

                </tr>


                <tr>

                    <td>Price</td>

                    ${items.map(
                        product =>
                            `<td><strong>₹${product.price.toLocaleString("en-IN")}</strong></td>`
                    ).join("")}

                </tr>


                <tr>

                    <td>Colour</td>

                    ${items.map(
                        product =>
                            `<td>${product.color}</td>`
                    ).join("")}

                </tr>


                <tr>

                    <td>Rating</td>

                    ${items.map(
                        product =>
                            `<td>★ ${product.rating}</td>`
                    ).join("")}

                </tr>

            `;

        }

    }


    $("#compare-table-body")
        ?.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest(
                        "[data-remove-compare]"
                    );

                if (!button) return;

                toggleCompare(
                    Number(
                        button.dataset.removeCompare
                    )
                );

            }
        );


    $("#clear-compare")
        ?.addEventListener(
            "click",
            () => {

                comparison = [];

                saveState();

                renderProducts();

                renderCompare();

                toast(
                    "Comparison cleared"
                );

            }
        );


    /* =====================================================
       PRODUCT MODAL
    ===================================================== */

    function openProductModal(id) {

        const product =
            products.find(
                item =>
                    item.id === id
            );

        if (!product) return;

        selectedProduct =
            product;


        $("#modal-product-image").src =
            product.image;

        $("#modal-product-image").alt =
            product.name;

        $("#modal-product-name")
            .textContent =
            product.name;

        $("#modal-product-category")
            .textContent =
            product.category;

        $("#modal-product-description")
            .textContent =
            product.description;

        $("#modal-product-price")
            .textContent =
            `₹${product.price.toLocaleString("en-IN")}`;


        const amazon =
            $("#modal-amazon-link");

        const flipkart =
            $("#modal-flipkart-link");


        if (product.amazonUrl) {

            amazon.href =
                product.amazonUrl;

            amazon.hidden =
                false;

        } else {

            amazon.hidden =
                true;

        }


        if (product.flipkartUrl) {

            flipkart.href =
                product.flipkartUrl;

            flipkart.hidden =
                false;

        } else {

            flipkart.hidden =
                true;

        }


        $("#product-modal")
            ?.classList.add(
                "active"
            );

        $("#product-modal")
            ?.setAttribute(
                "aria-hidden",
                "false"
            );

        document.body.classList.add(
            "no-scroll"
        );

    }


    function closeProductModal() {

        $("#product-modal")
            ?.classList.remove(
                "active"
            );

        $("#product-modal")
            ?.setAttribute(
                "aria-hidden",
                "true"
            );

        document.body.classList.remove(
            "no-scroll"
        );

        selectedProduct =
            null;

    }


    $("[data-close-product]")
        ?.addEventListener(
            "click",
            closeProductModal
        );


    $("#product-modal")
        ?.addEventListener(
            "click",
            event => {

                if (
                    event.target.id ===
                    "product-modal"
                ) {

                    closeProductModal();

                }

            }
        );


    $("#modal-add-cart")
        ?.addEventListener(
            "click",
            () => {

                if (!selectedProduct)
                    return;

                addToCart(
                    selectedProduct.id
                );

                closeProductModal();

            }
        );


    $("#modal-add-wishlist")
        ?.addEventListener(
            "click",
            () => {

                if (!selectedProduct)
                    return;

                toggleWishlist(
                    selectedProduct.id
                );

            }
        );


    $("#modal-add-compare")
        ?.addEventListener(
            "click",
            () => {

                if (!selectedProduct)
                    return;

                toggleCompare(
                    selectedProduct.id
                );

            }
        );


    /* =====================================================
       DRAWERS
    ===================================================== */

    function openDrawer(id) {

        const drawer =
            $(`#${id}`);

        if (!drawer) return;

        drawer.classList.add(
            "active"
        );

        document.body.classList.add(
            "no-scroll"
        );

    }


    function closeDrawer(id) {

        const drawer =
            $(`#${id}`);

        if (!drawer) return;

        drawer.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "no-scroll"
        );

    }


    $("#wishlist-btn")
        ?.addEventListener(
            "click",
            () => {

                renderWishlist();

                openDrawer(
                    "wishlist-overlay"
                );

            }
        );


    $("#cart-btn")
        ?.addEventListener(
            "click",
            () => {

                renderCart();

                openDrawer(
                    "cart-overlay"
                );

            }
        );


    $("[data-close-wishlist]")
        ?.addEventListener(
            "click",
            () =>
                closeDrawer(
                    "wishlist-overlay"
                )
        );


    $("[data-close-cart]")
        ?.addEventListener(
            "click",
            () =>
                closeDrawer(
                    "cart-overlay"
                )
        );


    $("#wishlist-overlay")
        ?.addEventListener(
            "click",
            event => {

                if (
                    event.target.id ===
                    "wishlist-overlay"
                ) {

                    closeDrawer(
                        "wishlist-overlay"
                    );

                }

            }
        );


    $("#cart-overlay")
        ?.addEventListener(
            "click",
            event => {

                if (
                    event.target.id ===
                    "cart-overlay"
                ) {

                    closeDrawer(
                        "cart-overlay"
                    );

                }

            }
        );


    /* =====================================================
       ACCOUNT AUTH
    ===================================================== */

    const authOverlay =
        $("#auth-overlay");

    const authModal =
        $(".auth-modal");


    function openAuth(view = "signin") {

        setAuthView(view);

        authOverlay?.classList.add(
            "active"
        );

        authOverlay?.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "no-scroll"
        );

    }


    function closeAuth() {

        authOverlay?.classList.remove(
            "active"
        );

        authOverlay?.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "no-scroll"
        );

    }


    function setAuthView(view) {

        const signin =
            $("#auth-signin-view");

        const signup =
            $("#auth-signup-view");

        const forgot =
            $("#auth-forgot-view");


        if (signin)
            signin.hidden =
                view !== "signin";

        if (signup)
            signup.hidden =
                view !== "signup";

        if (forgot)
            forgot.hidden =
                view !== "forgot";

    }


    $("#account-btn")
        ?.addEventListener(
            "click",
            () => openAuth("signin")
        );


    $("#mobile-account-btn")
        ?.addEventListener(
            "click",
            () => {

                closeMobileMenu();

                openAuth("signin");

            }
        );


    $("#auth-close")
        ?.addEventListener(
            "click",
            closeAuth
        );


    authOverlay?.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                authOverlay
            ) {

                closeAuth();

            }

        }
    );


    $("#create-account-btn")
        ?.addEventListener(
            "click",
            () =>
                setAuthView("signup")
        );


    $("#back-to-signin")
        ?.addEventListener(
            "click",
            () =>
                setAuthView("signin")
        );


    $("#forgot-password-btn")
        ?.addEventListener(
            "click",
            () =>
                setAuthView("forgot")
        );


    $("#back-from-forgot")
        ?.addEventListener(
            "click",
            () =>
                setAuthView("signin")
        );


    /* =====================================================
       PASSWORD TOGGLE
    ===================================================== */

    $("#password-toggle")
        ?.addEventListener(
            "click",
            event => {

                const input =
                    $("#signin-password");

                if (!input) return;

                const visible =
                    input.type === "text";

                input.type =
                    visible
                        ? "password"
                        : "text";

                event.currentTarget.textContent =
                    visible
                        ? "Show"
                        : "Hide";

            }
        );


    $$(".password-toggle")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const input =
                        $(`#${button.dataset.password}`);

                    if (!input) return;

                    const visible =
                        input.type === "text";

                    input.type =
                        visible
                            ? "password"
                            : "text";

                    button.textContent =
                        visible
                            ? "Show"
                            : "Hide";

                }
            );

        });


    /* =====================================================
       SIGN IN
    ===================================================== */

    $("#sign-in-form")
        ?.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                toast(
                    "Demo sign-in completed. Backend authentication will be connected later."
                );

                closeAuth();

            }
        );


    /* =====================================================
       SIGN UP
    ===================================================== */

    $("#sign-up-form")
        ?.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const password =
                    $("#signup-password")?.value;

                const confirm =
                    $("#signup-confirm-password")?.value;


                if (
                    password !== confirm
                ) {

                    toast(
                        "Passwords do not match."
                    );

                    return;

                }


                toast(
                    "Demo account created. Database connection will be added later."
                );

                closeAuth();

            }
        );


    /* =====================================================
       FORGOT PASSWORD
    ===================================================== */

    $("#forgot-password-form")
        ?.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                toast(
                    "Password reset demo submitted."
                );

                closeAuth();

            }
        );


    /* =====================================================
       GOOGLE
    ===================================================== */

    $("#google-signin-btn")
        ?.addEventListener(
            "click",
            () => {

                toast(
                    "Google authentication will be connected later."
                );

            }
        );


    /* =====================================================
       NEWSLETTER
    ===================================================== */

    $("#newsletter-form")
        ?.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const email =
                    $("#newsletter-email")
                        ?.value.trim();

                if (!email) return;

                toast(
                    "You're on the SOLEVA update list ✨"
                );

                event.target.reset();

            }
        );


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    $("#back-to-top")
        ?.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Escape"
            ) return;

            closeAuth();

            closeProductModal();

            closeDrawer(
                "wishlist-overlay"
            );

            closeDrawer(
                "cart-overlay"
            );

            closeMobileMenu();

        }
    );


    /* =====================================================
       NAV ACTIVE LINK
    ===================================================== */

    const sections =
        $$("main section[id]");

    const navLinks =
        $$(".nav-link");


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (!entry.isIntersecting)
                            return;

                        navLinks.forEach(
                            link => {

                                link.classList.toggle(
                                    "active",
                                    link.getAttribute(
                                        "href"
                                    ) ===
                                    `#${entry.target.id}`
                                );

                            }
                        );

                    }
                );

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach(
        section =>
            observer.observe(section)
    );


    /* =====================================================
       INITIAL RENDER
    ===================================================== */

    updateCounts();

    renderProducts();

    renderWishlist();

    renderCart();

    renderCompare();

});/* =========================================================
   SOLEVA — MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       BASIC HELPERS
    ===================================================== */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];


    /* =====================================================
       PAGE LOADER
    ===================================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {

            $("#page-loader")?.classList.add("hide");

        }, 700);

    });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const year = $("#current-year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       SOLEVA SHOE THEMES
    ===================================================== */

    const shoeThemes = [

        {
            image: "Assets/images/shoe.png",
            accent: "#9CFF00",
            color: "LIME"
        },

        {
            image: "Assets/images/shoe2.png",
            accent: "#4B6FFF",
            color: "BLUE"
        },

        {
            image: "Assets/images/shoe3.png",
            accent: "#D84A4A",
            color: "RED"
        },

        {
            image: "Assets/images/shoe4.png",
            accent: "#E88928",
            color: "ORANGE"
        }

    ];


    const root = document.documentElement;

    const shoeImage = $("#shoe-image");

    const shoeButtons =
        $$(".shoe-select");

    const heroNumber =
        $("#hero-style-number");

    const heroColor =
        $("#hero-color-name");

    const heroCurrent =
        $("#hero-current");

    const progressLine =
        $("#hero-progress-line");


    let currentShoe = 0;

    let sliderTimer = null;

    let progressTimer = null;


    /* =====================================================
       COLOR HELPER
    ===================================================== */

    function hexToRgba(hex, alpha) {

        const clean =
            hex.replace("#", "");

        const r =
            parseInt(clean.substring(0, 2), 16);

        const g =
            parseInt(clean.substring(2, 4), 16);

        const b =
            parseInt(clean.substring(4, 6), 16);

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;

    }


    /* =====================================================
       APPLY THEME
    ===================================================== */

    function applyTheme(theme) {

        root.style.setProperty(
            "--theme-accent",
            theme.accent
        );

        root.style.setProperty(
            "--theme-glow",
            hexToRgba(theme.accent, .35)
        );

        root.style.setProperty(
            "--theme-glow-soft",
            hexToRgba(theme.accent, .12)
        );

        if (heroColor) {
            heroColor.textContent =
                theme.color;
        }

    }


    /* =====================================================
       HERO SHOE
    ===================================================== */

    function updateHeroButtons() {

        shoeButtons.forEach((button, index) => {

            const active =
                index === currentShoe;

            button.classList.toggle(
                "active",
                active
            );

            button.setAttribute(
                "aria-pressed",
                String(active)
            );

        });

    }


    function resetProgress() {

        if (!progressLine) return;

        progressLine.style.transition = "none";

        progressLine.style.width = "0%";

        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                progressLine.style.transition =
                    "width 7s linear";

                progressLine.style.width =
                    "100%";

            });

        });

    }


    function showShoe(index, animate = true) {

        if (!shoeImage) return;

        currentShoe =
            (index + shoeThemes.length)
            % shoeThemes.length;

        const theme =
            shoeThemes[currentShoe];

        applyTheme(theme);

        updateHeroButtons();

        if (heroNumber) {
            heroNumber.textContent =
                String(currentShoe + 1)
                .padStart(2, "0");
        }

        if (heroCurrent) {
            heroCurrent.textContent =
                String(currentShoe + 1)
                .padStart(2, "0");
        }


        if (animate) {

            shoeImage.classList.add(
                "shoe-changing"
            );

            setTimeout(() => {

                shoeImage.src =
                    theme.image;

                shoeImage.classList.remove(
                    "shoe-changing"
                );

            }, 480);

        } else {

            shoeImage.src =
                theme.image;

        }

        resetProgress();

    }


    function startSlider() {

        clearInterval(sliderTimer);

        clearInterval(progressTimer);

        resetProgress();

        sliderTimer =
            setInterval(() => {

                showShoe(
                    currentShoe + 1,
                    true
                );

            }, 7000);

    }


    shoeButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                showShoe(
                    Number(button.dataset.index),
                    true
                );

                startSlider();

            }
        );

    });


    showShoe(0, false);

    startSlider();


    /* =====================================================
       HERO IMAGE CLICK
    ===================================================== */

    shoeImage?.addEventListener(
        "click",
        () => {

            $("#products")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    $$("[data-scroll]").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const target =
                    document.getElementById(
                        button.dataset.scroll
                    );

                target?.scrollIntoView({
                    behavior: "smooth"
                });

                closeMobileMenu();

            }
        );

    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle =
        $("#menu-toggle");

    const mobileNav =
        $("#mobile-nav");


    function closeMobileMenu() {

        menuToggle?.classList.remove(
            "active"
        );

        mobileNav?.classList.remove(
            "active"
        );

        menuToggle?.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    menuToggle?.addEventListener(
        "click",
        () => {

            const active =
                mobileNav?.classList.toggle(
                    "active"
                );

            menuToggle.classList.toggle(
                "active",
                active
            );

            menuToggle.setAttribute(
                "aria-expanded",
                String(Boolean(active))
            );

        }
    );


    $$("#mobile-nav a").forEach(link => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });


    /* =====================================================
       PRODUCTS DATABASE
    ===================================================== */

    const products = [

        {
            id: 1,
            name: "Velocity Runner",
            category: "running",
            price: 2999,
            image: "Assets/images/shoe.png",
            description:
                "Lightweight everyday running footwear.",
            color: "Lime",
            rating: 4.7,
            amazonUrl: "",
            flipkartUrl: ""
        },

        {
            id: 2,
            name: "Urban Street",
            category: "sneakers",
            price: 3499,
            image: "Assets/images/shoe2.png",
            description:
                "Clean streetwear styling for everyday use.",
            color: "Blue",
            rating: 4.6,
            amazonUrl: "",
            flipkartUrl: ""
        },

        {
            id: 3,
            name: "Shadow Sport",
            category: "sports",
            price: 4299,
            image: "Assets/images/shoe3.png",
            description:
                "Bold sport-focused footwear for active days.",
            color: "Red",
            rating: 4.8,
            amazonUrl: "",
            flipkartUrl: ""
        },

        {
            id: 4,
            name: "Classic Motion",
            category: "casual",
            price: 3799,
            image: "Assets/images/shoe4.png",
            description:
                "Minimal casual footwear with a premium feel.",
            color: "Orange",
            rating: 4.5,
            amazonUrl: "",
            flipkartUrl: ""
        },

        {
            id: 5,
            name: "Aero Flex",
            category: "running",
            price: 3199,
            image: "Assets/images/shoe.png",
            description:
                "Flexible everyday runner built for comfort.",
            color: "Lime",
            rating: 4.6,
            amazonUrl: "",
            flipkartUrl: ""
        },

        {
            id: 6,
            name: "Street Pulse",
            category: "sneakers",
            price: 3999,
            image: "Assets/images/shoe2.png",
            description:
                "Modern sneaker styling with a clean silhouette.",
            color: "Blue",
            rating: 4.7,
            amazonUrl: "",
            flipkartUrl: ""
        },

        {
            id: 7,
            name: "Power Strike",
            category: "sports",
            price: 4599,
            image: "Assets/images/shoe3.png",
            description:
                "Sporty design made for energetic movement.",
            color: "Red",
            rating: 4.8,
            amazonUrl: "",
            flipkartUrl: ""
        },

        {
            id: 8,
            name: "Daily Classic",
            category: "formal",
            price: 4299,
            image: "Assets/images/shoe4.png",
            description:
                "A refined silhouette for smart everyday looks.",
            color: "Orange",
            rating: 4.4,
            amazonUrl: "",
            flipkartUrl: ""
        }

    ];


    /* =====================================================
       PRODUCT STATE
    ===================================================== */

    let activeCategory = "all";

    let searchQuery = "";

    let sortMode = "featured";

    let wishlist = [];

    let cart = [];

    let comparison = [];

    let selectedProduct = null;


    /* =====================================================
       LOCAL STORAGE
    ===================================================== */

    function saveState() {

        localStorage.setItem(
            "soleva-wishlist",
            JSON.stringify(wishlist)
        );

        localStorage.setItem(
            "soleva-cart",
            JSON.stringify(cart)
        );

        localStorage.setItem(
            "soleva-comparison",
            JSON.stringify(comparison)
        );

    }


    function loadState() {

        try {

            wishlist =
                JSON.parse(
                    localStorage.getItem(
                        "soleva-wishlist"
                    )
                ) || [];

            cart =
                JSON.parse(
                    localStorage.getItem(
                        "soleva-cart"
                    )
                ) || [];

            comparison =
                JSON.parse(
                    localStorage.getItem(
                        "soleva-comparison"
                    )
                ) || [];

        } catch {

            wishlist = [];
            cart = [];
            comparison = [];

        }

    }


    loadState();


    /* =====================================================
       TOAST
    ===================================================== */

    function toast(message) {

        const container =
            $("#toast-container");

        if (!container) return;

        const item =
            document.createElement("div");

        item.className =
            "toast";

        item.textContent =
            message;

        container.appendChild(item);

        setTimeout(() => {

            item.style.opacity = "0";

            item.style.transform =
                "translateY(10px)";

            setTimeout(
                () => item.remove(),
                300
            );

        }, 2600);

    }


    /* =====================================================
       PRODUCT FILTERING
    ===================================================== */

    function getVisibleProducts() {

        let result =
            products.filter(product => {

                const categoryMatch =
                    activeCategory === "all" ||
                    product.category === activeCategory;

                const query =
                    searchQuery.toLowerCase();

                const searchMatch =
                    !query ||
                    product.name
                        .toLowerCase()
                        .includes(query) ||
                    product.category
                        .toLowerCase()
                        .includes(query) ||
                    product.color
                        .toLowerCase()
                        .includes(query);

                return categoryMatch &&
                    searchMatch;

            });


        if (sortMode === "price-low") {

            result.sort(
                (a, b) =>
                    a.price - b.price
            );

        }


        if (sortMode === "price-high") {

            result.sort(
                (a, b) =>
                    b.price - a.price
            );

        }


        if (sortMode === "name") {

            result.sort(
                (a, b) =>
                    a.name.localeCompare(
                        b.name
                    )
            );

        }


        return result;

    }


    /* =====================================================
       PRODUCT CARD
    ===================================================== */

    function productCard(product) {

        const isWishlisted =
            wishlist.includes(product.id);

        const isCompared =
            comparison.includes(product.id);

        return `

            <article
                class="product-card"
                data-product="${product.id}">

                <div class="product-image-wrap">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy">

                    <button
                        class="product-heart ${isWishlisted ? "active" : ""}"
                        data-wishlist="${product.id}"
                        type="button"
                        aria-label="Wishlist">

                        ${isWishlisted ? "♥" : "♡"}

                    </button>

                </div>


                <div class="product-info">

                    <span class="product-category">
                        ${product.category}
                    </span>

                    <h3>
                        ${product.name}
                    </h3>

                    <p class="product-description">
                        ${product.description}
                    </p>


                    <div class="product-bottom">

                        <strong class="product-price">
                            ₹${product.price.toLocaleString("en-IN")}
                        </strong>

                        <button
                            class="product-view"
                            data-view-product="${product.id}"
                            type="button">

                            View

                        </button>

                    </div>


                    <button
                        class="compare-mini ${isCompared ? "active" : ""}"
                        data-compare-product="${product.id}"
                        type="button">

                        ${isCompared
                            ? "✓ Added to compare"
                            : "⇄ Add to compare"}

                    </button>

                </div>

            </article>

        `;

    }


    /* =====================================================
       RENDER PRODUCTS
    ===================================================== */

    function renderProducts() {

        const grid =
            $("#products-grid");

        const empty =
            $("#empty-state");

        const resultCount =
            $("#results-count");

        if (!grid) return;

        const visible =
            getVisibleProducts();


        grid.innerHTML =
            visible
                .map(productCard)
                .join("");


        if (empty) {

            empty.hidden =
                visible.length !== 0;

        }


        if (resultCount) {

            resultCount.textContent =
                `Showing ${visible.length} product${visible.length === 1 ? "" : "s"}`;

        }


        updateProductButtons();

    }


    function updateProductButtons() {

        $$(".product-heart").forEach(button => {

            const id =
                Number(button.dataset.wishlist);

            const active =
                wishlist.includes(id);

            button.classList.toggle(
                "active",
                active
            );

            button.textContent =
                active ? "♥" : "♡";

        });


        $$(".compare-mini").forEach(button => {

            const id =
                Number(
                    button.dataset.compareProduct
                );

            const active =
                comparison.includes(id);

            button.classList.toggle(
                "active",
                active
            );

            button.textContent =
                active
                    ? "✓ Added to compare"
                    : "⇄ Add to compare";

        });

    }


    /* =====================================================
       PRODUCT EVENTS
    ===================================================== */

    $("#products-grid")
        ?.addEventListener(
            "click",
            event => {

                const wishlistButton =
                    event.target.closest(
                        "[data-wishlist]"
                    );

                const viewButton =
                    event.target.closest(
                        "[data-view-product]"
                    );

                const compareButton =
                    event.target.closest(
                        "[data-compare-product]"
                    );


                if (wishlistButton) {

                    toggleWishlist(
                        Number(
                            wishlistButton.dataset.wishlist
                        )
                    );

                    return;

                }


                if (compareButton) {

                    toggleCompare(
                        Number(
                            compareButton.dataset.compareProduct
                        )
                    );

                    return;

                }


                if (viewButton) {

                    openProductModal(
                        Number(
                            viewButton.dataset.viewProduct
                        )
                    );

                }

            }
        );


    /* =====================================================
       SEARCH
    ===================================================== */

    const searchInput =
        $("#product-search");

    function performSearch() {

        searchQuery =
            searchInput?.value
                .trim()
                .toLowerCase() || "";

        updateSearchClear();

        renderProducts();

    }


    searchInput?.addEventListener(
        "input",
        performSearch
    );


    $("#search-button")
        ?.addEventListener(
            "click",
            performSearch
        );


    searchInput?.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                event.preventDefault();

                performSearch();

            }

        }
    );


    function updateSearchClear() {

        const clear =
            $("#clear-search");

        if (!clear || !searchInput)
            return;

        clear.style.display =
            searchInput.value
                ? "flex"
                : "none";

    }


    $("#clear-search")
        ?.addEventListener(
            "click",
            () => {

                if (searchInput) {

                    searchInput.value =
                        "";

                    searchQuery =
                        "";

                }

                updateSearchClear();

                renderProducts();

            }
        );


    /* =====================================================
       CATEGORY
    ===================================================== */

    $$(".filter-btn").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                $$(".filter-btn")
                    .forEach(
                        btn =>
                            btn.classList.remove(
                                "active"
                            )
                    );

                button.classList.add(
                    "active"
                );

                activeCategory =
                    button.dataset.category;

                renderProducts();

            }
        );

    });


    /* =====================================================
       SORT
    ===================================================== */

    $("#product-sort")
        ?.addEventListener(
            "change",
            event => {

                sortMode =
                    event.target.value;

                renderProducts();

            }
        );


    /* =====================================================
       RESET
    ===================================================== */

    function resetFilters() {

        activeCategory =
            "all";

        searchQuery =
            "";

        sortMode =
            "featured";

        if (searchInput)
            searchInput.value = "";

        if ($("#product-sort"))
            $("#product-sort").value =
                "featured";

        $$(".filter-btn")
            .forEach(button => {

                button.classList.toggle(
                    "active",
                    button.dataset.category ===
                    "all"
                );

            });

        updateSearchClear();

        renderProducts();

    }


    $("#reset-filters")
        ?.addEventListener(
            "click",
            resetFilters
        );

    $("#empty-reset-btn")
        ?.addEventListener(
            "click",
            resetFilters
        );


    /* =====================================================
       WISHLIST
    ===================================================== */

    function toggleWishlist(id) {

        const index =
            wishlist.indexOf(id);

        if (index === -1) {

            wishlist.push(id);

            toast(
                "Added to your wishlist ❤️"
            );

        } else {

            wishlist.splice(
                index,
                1
            );

            toast(
                "Removed from wishlist"
            );

        }

        saveState();

        renderProducts();

        updateCounts();

        renderWishlist();

    }


    function renderWishlist() {

        const container =
            $("#wishlist-items");

        const empty =
            $("#wishlist-empty");

        if (!container) return;

        const items =
            wishlist
                .map(id =>
                    products.find(
                        product =>
                            product.id === id
                    )
                )
                .filter(Boolean);


        container.innerHTML =
            items.map(product => `

                <div class="drawer-product">

                    <img
                        src="${product.image}"
                        alt="${product.name}">

                    <div>

                        <h3>
                            ${product.name}
                        </h3>

                        <p>
                            ₹${product.price.toLocaleString("en-IN")}
                        </p>

                    </div>

                    <button
                        class="drawer-remove"
                        data-remove-wishlist="${product.id}"
                        type="button">

                        ×

                    </button>

                </div>

            `).join("");


        if (empty) {

            empty.style.display =
                items.length
                    ? "none"
                    : "block";

        }

    }


    $("#wishlist-items")
        ?.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest(
                        "[data-remove-wishlist]"
                    );

                if (!button) return;

                toggleWishlist(
                    Number(
                        button.dataset.removeWishlist
                    )
                );

            }
        );


    /* =====================================================
       CART
    ===================================================== */

    function addToCart(id) {

        if (!cart.includes(id)) {

            cart.push(id);

            toast(
                "Added to your cart 🛒"
            );

        } else {

            toast(
                "Already in your cart"
            );

        }

        saveState();

        updateCounts();

        renderCart();

    }


    function removeFromCart(id) {

        cart =
            cart.filter(
                productId =>
                    productId !== id
            );

        saveState();

        renderCart();

        updateCounts();

        toast(
            "Removed from cart"
        );

    }


    function renderCart() {

        const container =
            $("#cart-items");

        const empty =
            $("#cart-empty");

        const summary =
            $("#cart-summary");

        if (!container) return;


        const items =
            cart
                .map(id =>
                    products.find(
                        product =>
                            product.id === id
                    )
                )
                .filter(Boolean);


        container.innerHTML =
            items.map(product => `

                <div class="drawer-product">

                    <img
                        src="${product.image}"
                        alt="${product.name}">

                    <div>

                        <h3>
                            ${product.name}
                        </h3>

                        <p>
                            ₹${product.price.toLocaleString("en-IN")}
                        </p>

                    </div>

                    <button
                        class="drawer-remove"
                        data-remove-cart="${product.id}"
                        type="button">

                        ×

                    </button>

                </div>

            `).join("");


        if (empty) {

            empty.style.display =
                items.length
                    ? "none"
                    : "block";

        }


        if (summary) {

            summary.hidden =
                items.length === 0;

        }


        const total =
            items.reduce(
                (sum, product) =>
                    sum + product.price,
                0
            );


        const totalElement =
            $("#cart-total");

        if (totalElement) {

            totalElement.textContent =
                `₹${total.toLocaleString("en-IN")}`;

        }

    }


    $("#cart-items")
        ?.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest(
                        "[data-remove-cart]"
                    );

                if (!button) return;

                removeFromCart(
                    Number(
                        button.dataset.removeCart
                    )
                );

            }
        );


    /* =====================================================
       COUNTS
    ===================================================== */

    function updateCounts() {

        const wishlistCount =
            $("#wishlist-count");

        const cartCount =
            $("#cart-count");

        if (wishlistCount) {

            wishlistCount.textContent =
                wishlist.length;

        }

        if (cartCount) {

            cartCount.textContent =
                cart.length;

        }

    }


    /* =====================================================
       COMPARE
    ===================================================== */

    function toggleCompare(id) {

        if (comparison.includes(id)) {

            comparison =
                comparison.filter(
                    productId =>
                        productId !== id
                );

            toast(
                "Removed from comparison"
            );

        } else {

            if (comparison.length >= 3) {

                toast(
                    "You can compare up to 3 products"
                );

                return;

            }

            comparison.push(id);

            toast(
                "Added to comparison ⇄"
            );

        }

        saveState();

        renderProducts();

        renderCompare();

    }


    function renderCompare() {

        const empty =
            $("#compare-empty");

        const content =
            $("#compare-content");

        const count =
            $("#compare-count");

        if (count) {

            count.textContent =
                `${comparison.length} / 3`;

        }


        if (comparison.length === 0) {

            if (empty)
                empty.hidden = false;

            if (content)
                content.hidden = true;

            return;

        }


        if (empty)
            empty.hidden = true;

        if (content)
            content.hidden = false;


        const items =
            comparison
                .map(id =>
                    products.find(
                        product =>
                            product.id === id
                    )
                )
                .filter(Boolean);


        const head =
            $("#compare-table-head");

        const body =
            $("#compare-table-body");


        if (head) {

            head.innerHTML = `

                <tr>

                    <th>Feature</th>

                    ${items.map(
                        product => `

                        <th>

                            ${product.name}

                            <br>

                            <button
                                class="compare-remove"
                                data-remove-compare="${product.id}"
                                type="button">

                                Remove

                            </button>

                        </th>

                    `).join("")}

                </tr>

            `;

        }


        if (body) {

            body.innerHTML = `

                <tr>

                    <td>Category</td>

                    ${items.map(
                        product =>
                            `<td>${product.category}</td>`
                    ).join("")}

                </tr>


                <tr>

                    <td>Price</td>

                    ${items.map(
                        product =>
                            `<td><strong>₹${product.price.toLocaleString("en-IN")}</strong></td>`
                    ).join("")}

                </tr>


                <tr>

                    <td>Colour</td>

                    ${items.map(
                        product =>
                            `<td>${product.color}</td>`
                    ).join("")}

                </tr>


                <tr>

                    <td>Rating</td>

                    ${items.map(
                        product =>
                            `<td>★ ${product.rating}</td>`
                    ).join("")}

                </tr>

            `;

        }

    }


    $("#compare-table-body")
        ?.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest(
                        "[data-remove-compare]"
                    );

                if (!button) return;

                toggleCompare(
                    Number(
                        button.dataset.removeCompare
                    )
                );

            }
        );


    $("#clear-compare")
        ?.addEventListener(
            "click",
            () => {

                comparison = [];

                saveState();

                renderProducts();

                renderCompare();

                toast(
                    "Comparison cleared"
                );

            }
        );


    /* =====================================================
       PRODUCT MODAL
    ===================================================== */

    function openProductModal(id) {

        const product =
            products.find(
                item =>
                    item.id === id
            );

        if (!product) return;

        selectedProduct =
            product;


        $("#modal-product-image").src =
            product.image;

        $("#modal-product-image").alt =
            product.name;

        $("#modal-product-name")
            .textContent =
            product.name;

        $("#modal-product-category")
            .textContent =
            product.category;

        $("#modal-product-description")
            .textContent =
            product.description;

        $("#modal-product-price")
            .textContent =
            `₹${product.price.toLocaleString("en-IN")}`;


        const amazon =
            $("#modal-amazon-link");

        const flipkart =
            $("#modal-flipkart-link");


        if (product.amazonUrl) {

            amazon.href =
                product.amazonUrl;

            amazon.hidden =
                false;

        } else {

            amazon.hidden =
                true;

        }


        if (product.flipkartUrl) {

            flipkart.href =
                product.flipkartUrl;

            flipkart.hidden =
                false;

        } else {

            flipkart.hidden =
                true;

        }


        $("#product-modal")
            ?.classList.add(
                "active"
            );

        $("#product-modal")
            ?.setAttribute(
                "aria-hidden",
                "false"
            );

        document.body.classList.add(
            "no-scroll"
        );

    }


    function closeProductModal() {

        $("#product-modal")
            ?.classList.remove(
                "active"
            );

        $("#product-modal")
            ?.setAttribute(
                "aria-hidden",
                "true"
            );

        document.body.classList.remove(
            "no-scroll"
        );

        selectedProduct =
            null;

    }


    $("[data-close-product]")
        ?.addEventListener(
            "click",
            closeProductModal
        );


    $("#product-modal")
        ?.addEventListener(
            "click",
            event => {

                if (
                    event.target.id ===
                    "product-modal"
                ) {

                    closeProductModal();

                }

            }
        );


    $("#modal-add-cart")
        ?.addEventListener(
            "click",
            () => {

                if (!selectedProduct)
                    return;

                addToCart(
                    selectedProduct.id
                );

                closeProductModal();

            }
        );


    $("#modal-add-wishlist")
        ?.addEventListener(
            "click",
            () => {

                if (!selectedProduct)
                    return;

                toggleWishlist(
                    selectedProduct.id
                );

            }
        );


    $("#modal-add-compare")
        ?.addEventListener(
            "click",
            () => {

                if (!selectedProduct)
                    return;

                toggleCompare(
                    selectedProduct.id
                );

            }
        );


    /* =====================================================
       DRAWERS
    ===================================================== */

    function openDrawer(id) {

        const drawer =
            $(`#${id}`);

        if (!drawer) return;

        drawer.classList.add(
            "active"
        );

        document.body.classList.add(
            "no-scroll"
        );

    }


    function closeDrawer(id) {

        const drawer =
            $(`#${id}`);

        if (!drawer) return;

        drawer.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "no-scroll"
        );

    }


    $("#wishlist-btn")
        ?.addEventListener(
            "click",
            () => {

                renderWishlist();

                openDrawer(
                    "wishlist-overlay"
                );

            }
        );


    $("#cart-btn")
        ?.addEventListener(
            "click",
            () => {

                renderCart();

                openDrawer(
                    "cart-overlay"
                );

            }
        );


    $("[data-close-wishlist]")
        ?.addEventListener(
            "click",
            () =>
                closeDrawer(
                    "wishlist-overlay"
                )
        );


    $("[data-close-cart]")
        ?.addEventListener(
            "click",
            () =>
                closeDrawer(
                    "cart-overlay"
                )
        );


    $("#wishlist-overlay")
        ?.addEventListener(
            "click",
            event => {

                if (
                    event.target.id ===
                    "wishlist-overlay"
                ) {

                    closeDrawer(
                        "wishlist-overlay"
                    );

                }

            }
        );


    $("#cart-overlay")
        ?.addEventListener(
            "click",
            event => {

                if (
                    event.target.id ===
                    "cart-overlay"
                ) {

                    closeDrawer(
                        "cart-overlay"
                    );

                }

            }
        );


    /* =====================================================
       ACCOUNT AUTH
    ===================================================== */

    const authOverlay =
        $("#auth-overlay");

    const authModal =
        $(".auth-modal");


    function openAuth(view = "signin") {

        setAuthView(view);

        authOverlay?.classList.add(
            "active"
        );

        authOverlay?.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "no-scroll"
        );

    }


    function closeAuth() {

        authOverlay?.classList.remove(
            "active"
        );

        authOverlay?.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "no-scroll"
        );

    }


    function setAuthView(view) {

        const signin =
            $("#auth-signin-view");

        const signup =
            $("#auth-signup-view");

        const forgot =
            $("#auth-forgot-view");


        if (signin)
            signin.hidden =
                view !== "signin";

        if (signup)
            signup.hidden =
                view !== "signup";

        if (forgot)
            forgot.hidden =
                view !== "forgot";

    }


    $("#account-btn")
        ?.addEventListener(
            "click",
            () => openAuth("signin")
        );


    $("#mobile-account-btn")
        ?.addEventListener(
            "click",
            () => {

                closeMobileMenu();

                openAuth("signin");

            }
        );


    $("#auth-close")
        ?.addEventListener(
            "click",
            closeAuth
        );


    authOverlay?.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                authOverlay
            ) {

                closeAuth();

            }

        }
    );


    $("#create-account-btn")
        ?.addEventListener(
            "click",
            () =>
                setAuthView("signup")
        );


    $("#back-to-signin")
        ?.addEventListener(
            "click",
            () =>
                setAuthView("signin")
        );


    $("#forgot-password-btn")
        ?.addEventListener(
            "click",
            () =>
                setAuthView("forgot")
        );


    $("#back-from-forgot")
        ?.addEventListener(
            "click",
            () =>
                setAuthView("signin")
        );


    /* =====================================================
       PASSWORD TOGGLE
    ===================================================== */

    $("#password-toggle")
        ?.addEventListener(
            "click",
            event => {

                const input =
                    $("#signin-password");

                if (!input) return;

                const visible =
                    input.type === "text";

                input.type =
                    visible
                        ? "password"
                        : "text";

                event.currentTarget.textContent =
                    visible
                        ? "Show"
                        : "Hide";

            }
        );


    $$(".password-toggle")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const input =
                        $(`#${button.dataset.password}`);

                    if (!input) return;

                    const visible =
                        input.type === "text";

                    input.type =
                        visible
                            ? "password"
                            : "text";

                    button.textContent =
                        visible
                            ? "Show"
                            : "Hide";

                }
            );

        });


    /* =====================================================
       SIGN IN
    ===================================================== */

    $("#sign-in-form")
        ?.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                toast(
                    "Demo sign-in completed. Backend authentication will be connected later."
                );

                closeAuth();

            }
        );


    /* =====================================================
       SIGN UP
    ===================================================== */

    $("#sign-up-form")
        ?.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const password =
                    $("#signup-password")?.value;

                const confirm =
                    $("#signup-confirm-password")?.value;


                if (
                    password !== confirm
                ) {

                    toast(
                        "Passwords do not match."
                    );

                    return;

                }


                toast(
                    "Demo account created. Database connection will be added later."
                );

                closeAuth();

            }
        );


    /* =====================================================
       FORGOT PASSWORD
    ===================================================== */

    $("#forgot-password-form")
        ?.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                toast(
                    "Password reset demo submitted."
                );

                closeAuth();

            }
        );


    /* =====================================================
       GOOGLE
    ===================================================== */

    $("#google-signin-btn")
        ?.addEventListener(
            "click",
            () => {

                toast(
                    "Google authentication will be connected later."
                );

            }
        );


    /* =====================================================
       NEWSLETTER
    ===================================================== */

    $("#newsletter-form")
        ?.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const email =
                    $("#newsletter-email")
                        ?.value.trim();

                if (!email) return;

                toast(
                    "You're on the SOLEVA update list ✨"
                );

                event.target.reset();

            }
        );


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    $("#back-to-top")
        ?.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Escape"
            ) return;

            closeAuth();

            closeProductModal();

            closeDrawer(
                "wishlist-overlay"
            );

            closeDrawer(
                "cart-overlay"
            );

            closeMobileMenu();

        }
    );


    /* =====================================================
       NAV ACTIVE LINK
    ===================================================== */

    const sections =
        $$("main section[id]");

    const navLinks =
        $$(".nav-link");


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (!entry.isIntersecting)
                            return;

                        navLinks.forEach(
                            link => {

                                link.classList.toggle(
                                    "active",
                                    link.getAttribute(
                                        "href"
                                    ) ===
                                    `#${entry.target.id}`
                                );

                            }
                        );

                    }
                );

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach(
        section =>
            observer.observe(section)
    );


    /* =====================================================
       INITIAL RENDER
    ===================================================== */

    updateCounts();

    renderProducts();

    renderWishlist();

    renderCart();

    renderCompare();

});
