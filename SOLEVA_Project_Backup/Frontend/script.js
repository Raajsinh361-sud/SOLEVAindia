/* =====================================================
   SOLEVA — CLEAN JAVASCRIPT
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const root = document.documentElement;


    /* ================= LOADER ================= */

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {

        setTimeout(() => {
            loader?.classList.add("hidden");
        }, 500);

    });


    /* ================= HERO SHOES ================= */

    const shoeThemes = [

        {
            image: "../Assets/images/shoe.png",
            accent: "#9CFF00"
        },

        {
            image: "../Assets/images/shoe2.png",
            accent: "#4B6FFF"
        },

        {
            image: "../Assets/images/shoe3.png",
            accent: "#D84A4A"
        },

        {
            image: "../Assets/images/shoe4.png",
            accent: "#E88928"
        }

    ];


    const shoeImage =
        document.getElementById("shoe-image");

    const shoeButtons =
        [...document.querySelectorAll(".shoe-select")];

    let currentShoe = 0;

    let sliderTimer;


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


    function applyTheme(theme) {

        root.style.setProperty(
            "--theme-accent",
            theme.accent
        );

        root.style.setProperty(
            "--theme-glow",
            hexToRgba(theme.accent, 0.35)
        );

        root.style.setProperty(
            "--theme-glow-soft",
            hexToRgba(theme.accent, 0.12)
        );

    }


    function showShoe(index, animate = true) {

        currentShoe =
            (index + shoeThemes.length)
            % shoeThemes.length;

        const theme =
            shoeThemes[currentShoe];

        applyTheme(theme);


        shoeButtons.forEach((button, i) => {

            button.classList.toggle(
                "active",
                i === currentShoe
            );

        });


        if (!shoeImage) return;


        if (!animate) {

            shoeImage.src =
                theme.image;

            return;

        }


        shoeImage.classList.add(
            "shoe-changing"
        );


        setTimeout(() => {

            shoeImage.src =
                theme.image;

            shoeImage.onload = () => {

                shoeImage.classList.remove(
                    "shoe-changing"
                );

            };

        }, 450);

    }


    function resetSlider() {

        clearInterval(sliderTimer);

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

                resetSlider();

            }
        );

    });


    showShoe(0, false);

    resetSlider();


    /* ================= SCROLL BUTTONS ================= */

    document
        .querySelectorAll("[data-scroll]")
        .forEach(button => {

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

                }
            );

        });


    shoeImage?.addEventListener(
        "click",
        () => {

            document
                .getElementById("products")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


    /* ================= PRODUCTS ================= */

    const products = [

        {
            id: 1,
            name: "Velocity Runner",
            category: "running",
            price: 2999,
            image: "../Assets/images/shoe.png",
            description:
                "Lightweight everyday running footwear."
        },

        {
            id: 2,
            name: "Urban Street",
            category: "sneakers",
            price: 3499,
            image: "../Assets/images/shoe2.png",
            description:
                "Clean streetwear style for everyday use."
        },

        {
            id: 3,
            name: "Shadow Sport",
            category: "sports",
            price: 4299,
            image: "../Assets/images/shoe3.png",
            description:
                "Sport-focused design with a bold look."
        },

        {
            id: 4,
            name: "Classic Motion",
            category: "casual",
            price: 3799,
            image: "../Assets/images/shoe4.png",
            description:
                "Minimal casual footwear with a premium feel."
        }

    ];


    const grid =
        document.getElementById(
            "products-grid"
        );

    const search =
        document.getElementById(
            "product-search"
        );

    const sort =
        document.getElementById(
            "product-sort"
        );


    let activeCategory = "all";

    let wishlist =
        JSON.parse(
            localStorage.getItem(
                "soleva-wishlist"
            )
        ) || [];

    let cart =
        JSON.parse(
            localStorage.getItem(
                "soleva-cart"
            )
        ) || [];

    let compare =
        JSON.parse(
            localStorage.getItem(
                "soleva-compare"
            )
        ) || [];


    function saveData() {

        localStorage.setItem(
            "soleva-wishlist",
            JSON.stringify(wishlist)
        );

        localStorage.setItem(
            "soleva-cart",
            JSON.stringify(cart)
        );

        localStorage.setItem(
            "soleva-compare",
            JSON.stringify(compare)
        );

    }


    function updateCounts() {

        const wishlistCount =
            document.getElementById(
                "wishlist-count"
            );

        const cartCount =
            document.getElementById(
                "cart-count"
            );


        if (wishlistCount) {

            wishlistCount.textContent =
                wishlist.length;

        }


        if (cartCount) {

            cartCount.textContent =
                cart.length;

        }

    }


    function renderProducts() {

        if (!grid) return;


        const query =
            (search?.value || "")
            .trim()
            .toLowerCase();


        let filtered =
            products.filter(product => {

                const categoryMatch =
                    activeCategory === "all" ||
                    product.category ===
                    activeCategory;


                const searchMatch =
                    !query ||
                    product.name
                        .toLowerCase()
                        .includes(query) ||
                    product.category
                        .toLowerCase()
                        .includes(query) ||
                    product.description
                        .toLowerCase()
                        .includes(query);


                return (
                    categoryMatch &&
                    searchMatch
                );

            });


        if (sort?.value === "price-low") {

            filtered.sort(
                (a, b) =>
                    a.price - b.price
            );

        }

        if (sort?.value === "price-high") {

            filtered.sort(
                (a, b) =>
                    b.price - a.price
            );

        }


        if (!filtered.length) {

            grid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">⌕</div>
                    <h3>No footwear found</h3>
                    <p>
                        Try another search or category.
                    </p>
                </div>
            `;

            return;

        }


        grid.innerHTML =
            filtered.map(product => {

                const isWishlisted =
                    wishlist.includes(
                        product.id
                    );


                return `

                <article
                    class="product-card"
                    data-id="${product.id}">

                    <div
                        class="product-image-wrap">

                        <img
                            src="${product.image}"
                            alt="${product.name}"
                            loading="lazy">

                    </div>


                    <div
                        class="product-category">

                        ${product.category}

                    </div>


                    <h3>
                        ${product.name}
                    </h3>


                    <p
                        class="product-description">

                        ${product.description}

                    </p>


                    <div
                        class="product-bottom">

                        <div
                            class="product-price">

                            ₹${product.price.toLocaleString("en-IN")}

                        </div>


                        <div
                            class="product-actions">

                            <button
                                class="product-action wishlist-action ${isWishlisted ? "active" : ""}"
                                data-id="${product.id}"
                                type="button"
                                title="Wishlist">

                                ${isWishlisted ? "♥" : "♡"}

                            </button>


                            <button
                                class="product-action compare-action"
                                data-id="${product.id}"
                                type="button"
                                title="Compare">

                                ⇄

                            </button>

                        </div>

                    </div>


                    <button
                        class="view-product"
                        data-id="${product.id}"
                        type="button">

                        View Product

                    </button>

                </article>

                `;

            }).join("");

    }


    document
        .querySelectorAll(".filter-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".filter-btn"
                        )
                        .forEach(btn => {

                            btn.classList.remove(
                                "active"
                            );

                        });


                    button.classList.add(
                        "active"
                    );


                    activeCategory =
                        button.dataset.category;


                    renderProducts();

                }
            );

        });


    search?.addEventListener(
        "input",
        renderProducts
    );


    document
        .getElementById("search-button")
        ?.addEventListener(
            "click",
            renderProducts
        );


    sort?.addEventListener(
        "change",
        renderProducts
    );


    /* ================= PRODUCT ACTIONS ================= */

    grid?.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "button"
                );


            if (!button) return;


            const id =
                Number(button.dataset.id);


            const product =
                products.find(
                    item => item.id === id
                );


            if (!product) return;


            if (
                button.classList.contains(
                    "wishlist-action"
                )
            ) {

                if (
                    wishlist.includes(id)
                ) {

                    wishlist =
                        wishlist.filter(
                            item => item !== id
                        );

                } else {

                    wishlist.push(id);

                }

                saveData();
                updateCounts();
                renderProducts();

                return;

            }


            if (
                button.classList.contains(
                    "compare-action"
                )
            ) {

                if (
                    !compare.includes(id)
                ) {

                    compare.push(id);

                }

                saveData();
                renderCompare();

                document
                    .getElementById("compare")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

                return;

            }


            if (
                button.classList.contains(
                    "view-product"
                )
            ) {

                openProductModal(
                    product
                );

            }

        }
    );


    /* ================= PRODUCT MODAL ================= */

    const productModal =
        document.getElementById(
            "product-modal"
        );

    const modalClose =
        document.getElementById(
            "modal-close"
        );


    function openProductModal(product) {

        const imageBox =
            document.getElementById(
                "modal-product-image"
            );

        const category =
            document.getElementById(
                "modal-category"
            );

        const title =
            document.getElementById(
                "modal-title"
            );

        const description =
            document.getElementById(
                "modal-description"
            );

        const price =
            document.getElementById(
                "modal-price"
            );

        const compareButton =
            document.getElementById(
                "modal-compare-btn"
            );


        imageBox.innerHTML = `
            <img
                src="${product.image}"
                alt="${product.name}">
        `;

        category.textContent =
            product.category;

        title.textContent =
            product.name;

        description.textContent =
            product.description;

        price.textContent =
            `₹${product.price.toLocaleString("en-IN")}`;


        compareButton.onclick = () => {

            if (!compare.includes(product.id)) {

                compare.push(product.id);

                saveData();

            }

            renderCompare();

            productModal.classList.remove(
                "active"
            );

            document
                .getElementById("compare")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        };


        productModal.classList.add(
            "active"
        );

    }


    modalClose?.addEventListener(
        "click",
        () => {

            productModal.classList.remove(
                "active"
            );

        }
    );


    productModal?.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                productModal
            ) {

                productModal.classList.remove(
                    "active"
                );

            }

        }
    );


    /* ================= COMPARE ================= */

    function renderCompare() {

        const panel =
            document.getElementById(
                "compare-panel"
            );


        if (!panel) return;


        const selected =
            products.filter(
                product =>
                    compare.includes(
                        product.id
                    )
            );


        if (!selected.length) {

            panel.innerHTML = `

                <div class="empty-state">

                    <div class="empty-icon">
                        ⇄
                    </div>

                    <h3>
                        Nothing to compare yet
                    </h3>

                    <p>
                        Select products from the
                        Products section to compare them here.
                    </p>

                    <button
                        class="primary-button small-button"
                        type="button"
                        data-scroll="products">

                        Browse Products

                    </button>

                </div>

            `;

            bindScrollButtons();

            return;

        }


        panel.innerHTML = `

            <div class="compare-grid">

                ${selected.map(product => `

                    <div class="compare-item">

                        <img
                            src="${product.image}"
                            alt="${product.name}">

                        <span>
                            ${product.category}
                        </span>

                        <h3>
                            ${product.name}
                        </h3>

                        <strong>
                            ₹${product.price.toLocaleString("en-IN")}
                        </strong>

                        <button
                            class="remove-compare"
                            data-id="${product.id}"
                            type="button">

                            Remove

                        </button>

                    </div>

                `).join("")}

            </div>

        `;


        panel
            .querySelectorAll(
                ".remove-compare"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const id =
                            Number(
                                button.dataset.id
                            );

                        compare =
                            compare.filter(
                                item => item !== id
                            );

                        saveData();

                        renderCompare();

                    }
                );

            });

    }


    function bindScrollButtons() {

        document
            .querySelectorAll(
                "[data-scroll]"
            )
            .forEach(button => {

                button.onclick = () => {

                    document
                        .getElementById(
                            button.dataset.scroll
                        )
                        ?.scrollIntoView({
                            behavior: "smooth"
                        });

                };

            });

    }


    /* ================= AUTH ================= */

    const overlay =
        document.getElementById(
            "auth-overlay"
        );

    const modal =
        document.querySelector(
            ".auth-modal"
        );

    const account =
        document.getElementById(
            "account-btn"
        );

    const close =
        document.getElementById(
            "auth-close"
        );

    const create =
        document.getElementById(
            "create-account-btn"
        );

    const back =
        document.getElementById(
            "back-to-signin"
        );


    function openAuth() {

        modal?.classList.remove(
            "signup-mode"
        );

        overlay?.classList.add(
            "active"
        );

        overlay?.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";

    }


    function closeAuth() {

        overlay?.classList.remove(
            "active"
        );

        overlay?.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow =
            "";

    }


    account?.addEventListener(
        "click",
        openAuth
    );

    close?.addEventListener(
        "click",
        closeAuth
    );


    overlay?.addEventListener(
        "click",
        event => {

            if (
                event.target === overlay
            ) {

                closeAuth();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeAuth();

                productModal?.classList.remove(
                    "active"
                );

            }

        }
    );


    create?.addEventListener(
        "click",
        () => {

            modal?.classList.add(
                "signup-mode"
            );

        }
    );


    back?.addEventListener(
        "click",
        () => {

            modal?.classList.remove(
                "signup-mode"
            );

        }
    );


    /* ================= PASSWORD ================= */

    document
        .getElementById(
            "password-toggle"
        )
        ?.addEventListener(
            "click",
            event => {

                const input =
                    document.getElementById(
                        "signin-password"
                    );


                if (
                    input.type ===
                    "password"
                ) {

                    input.type =
                        "text";

                    event.currentTarget
                        .textContent =
                        "Hide";

                } else {

                    input.type =
                        "password";

                    event.currentTarget
                        .textContent =
                        "Show";

                }

            }
        );


    /* ================= DEMO AUTH ================= */

    document
        .getElementById(
            "sign-in-form"
        )
        ?.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                alert(
                    "Demo Sign In successful. Real authentication will be connected later."
                );

                closeAuth();

            }
        );


    document
        .getElementById(
            "sign-up-form"
        )
        ?.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const password =
                    document.getElementById(
                        "signup-password"
                    ).value;

                const confirmPassword =
                    document.getElementById(
                        "signup-confirm-password"
                    ).value;


                if (
                    password !==
                    confirmPassword
                ) {

                    alert(
                        "Passwords do not match."
                    );

                    return;

                }


                alert(
                    "Demo account created. Real database authentication will be connected later."
                );

                closeAuth();

            }
        );


    /* ================= WISHLIST ================= */

    document
        .getElementById(
            "wishlist-btn"
        )
        ?.addEventListener(
            "click",
            () => {

                if (!wishlist.length) {

                    alert(
                        "Your wishlist is empty."
                    );

                    return;

                }

                alert(
                    `You have ${wishlist.length} item(s) in your wishlist.`
                );

            }
        );


    /* ================= CART ================= */

    document
        .getElementById(
            "cart-btn"
        )
        ?.addEventListener(
            "click",
            () => {

                alert(
                    "Cart system is ready for the next marketplace integration stage."
                );

            }
        );


    /* ================= INITIALIZE ================= */

    updateCounts();

    renderProducts();

    renderCompare();

});
