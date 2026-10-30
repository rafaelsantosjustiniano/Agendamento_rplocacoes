// ======================================================
// RP LOCAÇÕES
// PRODUTOS
// ======================================================


// ======================================================
// ⚠️ AQUI VOCÊ TROCA AS FOTOS
// ======================================================
//
// Coloque suas imagens dentro da pasta:
//
// imagens/
//
// Depois coloque o nome do arquivo aqui.
//
// Exemplo:
//
// imagem: 'imagens/cadeira.jpg'
//
// ======================================================


const products = [


    // ================= JOGO DE MESA =================

    {
        id: 'jogo',

        name: 'Jogo de mesa',

        price: 10,

        category: 'jogos',

        image: 'imagens/jogo-de-mesa.webp',

        tag: 'MÍN. 6 JOGOS',

        description:
            'Preço especial para pedidos a partir de 6 jogos.',

        min: 6
    },


    // ================= MESA AVULSA =================

    {
        id: 'mesa',

        name: 'Mesa avulsa',

        price: 5,

        category: 'avulsos',

        image: 'imagens/mesa.webp',

        tag: 'AVULSO',

        description:
            'Mesa para montar sua estrutura.'
    },


    // ================= CADEIRA =================

    {
        id: 'cadeira',

        name: 'Cadeira',

        price: 3,

        category: 'avulsos',

        image: 'imagens/cadeira.jpg',

        tag: 'AVULSO',

        description:
            'Cadeira plástica para eventos.'
    },


    // ================= TAMPÃO =================

    {
        id: 'tam_pao',

        name: 'Tampão',

        price: 7,

        category: 'avulsos',

        image: 'imagens/tampão.webp',

        tag: 'AVULSO',

        description:
            'Tampão para mesa de evento.'
    },


    // ================= TOALHA DE MESA =================

    {
        id: 'toalha_mesa',

        name: 'Toalha de mesa',

        price: 6,

        category: 'toalhas',

        image: 'imagens/toalhas-de-mesas.jpg',

        tag: 'TOALHA',

        description:
            'Toalha para mesa.'
    },


    // ================= TOALHA DE TAMPÃO =================

    {
        id: 'toalha_tampao',

        name: 'Toalha de tampão',

        price: 7,

        category: 'toalhas',

        image: 'imagens/toalhas-de-tampao.jpg',

        tag: 'TOALHA',

        description:
            'Toalha para tampão.'
    }

];



// ======================================================
// CARRINHO
// ======================================================


let cart = JSON.parse(

    localStorage.getItem(
        'rpLocacoesCart'
    ) || '{}'

);



// ======================================================
// FORMATAÇÃO DE DINHEIRO
// ======================================================


const money = (value) => {

    return value.toLocaleString(

        'pt-BR',

        {
            style: 'currency',

            currency: 'BRL'
        }

    );

};



// ======================================================
// SALVAR CARRINHO
// ======================================================


function saveCart() {

    localStorage.setItem(

        'rpLocacoesCart',

        JSON.stringify(cart)

    );


    renderCart();

}



// ======================================================
// PEGAR PRODUTOS DO CARRINHO
// ======================================================


function cartEntries() {

    return Object.entries(cart)

        .filter(
            ([, quantity]) =>
                quantity > 0
        )

        .map(
            ([id, quantity]) => ({

                product:
                    products.find(
                        product =>
                            product.id === id
                    ),

                qty: quantity

            })
        )

        .filter(
            item => item.product
        );

}



// ======================================================
// MOSTRAR PRODUTOS NA TELA
// ======================================================


function renderProducts(
    category = 'todos'
) {


    const grid =
        document.getElementById(
            'productsGrid'
        );


    const filtered =

        category === 'todos'

            ? products

            : products.filter(
                product =>
                    product.category === category
            );


    grid.innerHTML =

        filtered.map(product => `

            <article class="product-card">


                <div class="product-visual">


                    <span class="product-tag">

                        ${product.tag}

                    </span>


                    <img

                        class="product-image"

                        src="${product.image}"

                        alt="${product.name}"

                        loading="lazy"

                    >


                </div>



                <div class="product-info">


                    <h3>

                        ${product.name}

                    </h3>


                    <p>

                        ${product.description}

                    </p>



                    <div class="price">


                        <div>


                            <strong>

                                ${money(
                                    product.price
                                )}

                            </strong>


                            <small>

                                / unidade

                            </small>


                        </div>



                        <button

                            class="add-btn"

                            onclick="
                                addToCart(
                                    '${product.id}'
                                )
                            ">

                            + Adicionar

                        </button>


                    </div>


                </div>


            </article>

        `).join('');

}



// ======================================================
// MOSTRAR CARRINHO
// ======================================================


function renderCart() {


    const items =
        cartEntries();


    const box =
        document.getElementById(
            'cartItems'
        );


    // ================= CARRINHO VAZIO =================

    if (!items.length) {


        box.innerHTML = `

            <div class="empty-cart">

                Seu carrinho está vazio.

                <br><br>

                Adicione os produtos
                que deseja reservar.

            </div>

        `;


    }


    // ================= CARRINHO COM PRODUTOS =================

    else {


        box.innerHTML =

            items.map(
                ({ product, qty }) => `

                <div class="cart-item">


                    <div>


                        <h4>

                            ${product.name}

                        </h4>


                        <div class="unit">

                            ${money(
                                product.price
                            )}

                            por unidade

                        </div>


                    </div>



                    <div class="cart-item-right">


                        <div class="item-total">

                            ${money(
                                product.price * qty
                            )}

                        </div>



                        <div class="qty-controls">


                            <button

                                onclick="
                                    changeQty(
                                        '${product.id}',
                                        -1
                                    )
                                ">

                                −

                            </button>


                            <span>

                                ${qty}

                            </span>


                            <button

                                onclick="
                                    changeQty(
                                        '${product.id}',
                                        1
                                    )
                                ">

                                +

                            </button>


                            <button

                                class="remove"

                                onclick="
                                    removeItem(
                                        '${product.id}'
                                    )
                                ">

                                Excluir

                            </button>


                        </div>


                    </div>


                </div>

            `

            ).join('');

    }



    // ==================================================
    // QUANTIDADE TOTAL
    // ==================================================


    const count =

        items.reduce(

            (total, item) =>

                total + item.qty,

            0

        );



    // ==================================================
    // VALOR TOTAL
    // ==================================================


    const total =

        items.reduce(

            (total, item) =>

                total +

                (
                    item.product.price *
                    item.qty
                ),

            0

        );



    // ==================================================
    // ATUALIZAR NÚMERO DO CARRINHO
    // ==================================================


    document.getElementById(
        'cartCount'
    ).textContent = count;


    document.getElementById(
        'cartCountMobile'
    ).textContent = count;



    // ==================================================
    // ATUALIZAR TOTAL
    // ==================================================


    document.getElementById(
        'cartTotal'
    ).textContent = money(total);

}



// ======================================================
// ADICIONAR PRODUTO
// ======================================================


function addToCart(id) {


    cart[id] =

        (cart[id] || 0) + 1;


    saveCart();


    openCart();

}



// ======================================================
// ALTERAR QUANTIDADE
// ======================================================


function changeQty(
    id,
    delta
) {


    cart[id] =

        (cart[id] || 0) + delta;


    if (cart[id] <= 0) {

        delete cart[id];

    }


    saveCart();

}



// ======================================================
// EXCLUIR PRODUTO
// ======================================================


function removeItem(id) {


    delete cart[id];


    saveCart();

}



// ======================================================
// LIMPAR CARRINHO
// ======================================================


function clearCart() {


    cart = {};


    saveCart();

}



// ======================================================
// ABRIR CARRINHO
// ======================================================


function openCart() {


    document

        .getElementById(
            'cartDrawer'
        )

        .classList.add('open');


    document

        .getElementById(
            'cartBackdrop'
        )

        .classList.add('open');


    document.body
        .classList.add('no-scroll');

}



// ======================================================
// FECHAR CARRINHO
// ======================================================


function closeCart() {


    document

        .getElementById(
            'cartDrawer'
        )

        .classList.remove('open');


    document

        .getElementById(
            'cartBackdrop'
        )

        .classList.remove('open');


    document.body
        .classList.remove('no-scroll');

}



// ======================================================
// ABRIR MODAL DE RESERVA
// ======================================================


function openModal() {


    // Verificar carrinho vazio

    if (!cartEntries().length) {


        alert(

            'Adicione pelo menos um produto ao carrinho antes de reservar.'

        );


        return;

    }



    // ==================================================
    // VERIFICAR MÍNIMO DE 6 JOGOS
    // ==================================================


    const jogos =
        cart.jogo || 0;


    if (
        jogos > 0 &&
        jogos < 6
    ) {


        alert(

            'O jogo de mesa possui quantidade mínima de 6 jogos. Aumente para 6 ou mais jogos.'

        );


        return;

    }



    closeCart();



    document

        .getElementById(
            'checkoutModal'
        )

        .classList.add('open');


    document.body
        .classList.add('no-scroll');

}



// ======================================================
// FECHAR MODAL
// ======================================================


function closeModal() {


    document

        .getElementById(
            'checkoutModal'
        )

        .classList.remove('open');


    document.body
        .classList.remove('no-scroll');

}



// ======================================================
// MENSAGEM DO WHATSAPP
// ======================================================


function buildWhatsappMessage(
    name,
    date,
    note
) {


    const items =
        cartEntries();



    // ==================================================
    // CALCULAR TOTAL
    // ==================================================


    const total =

        items.reduce(

            (sum, item) =>

                sum +

                (
                    item.product.price *
                    item.qty
                ),

            0

        );



    // ==================================================
    // FORMATAR DATA
    // ==================================================


    const formattedDate =

        new Date(
            date + 'T12:00:00'
        ).toLocaleDateString(
            'pt-BR'
        );



    // ==================================================
    // COMEÇO DA MENSAGEM
    // ==================================================


    let message =

        `Olá! Sou ${name}.` +

        `\n\n` +

        `Quero reservar os seguintes itens para o dia ${formattedDate}:`;



    // ==================================================
    // PRODUTOS
    // ==================================================


    items.forEach(
        ({ product, qty }) => {


            message +=

                `\n\n` +

                `• ${qty}x ${product.name}` +

                ` — ${money(
                    product.price *
                    qty
                )}`;

        }
    );



    // ==================================================
    // TOTAL
    // ==================================================


    message +=

        `\n\n` +

        `*Total estimado: ${money(
            total
        )}*`;



    // ==================================================
    // OBSERVAÇÃO
    // ==================================================


    if (
        note.trim()
    ) {


        message +=

            `\n\n` +

            `Observação: ${note.trim()}`;

    }



    // ==================================================
    // FINAL DA MENSAGEM
    // ==================================================


    message +=

        `\n\n` +

        `Gostaria de confirmar a disponibilidade e reservar, por favor.`;



    // ==================================================
    // LINK DO WHATSAPP
    // ==================================================


    const whatsappUrl =

        `https://wa.me/5579991788586?text=` +

        encodeURIComponent(
            message
        );


    return whatsappUrl;

}



// ======================================================
// CATEGORIAS
// ======================================================


document

    .querySelectorAll('.tab')

    .forEach(tab => {


        tab.addEventListener(
            'click',
            () => {


                // Remover active

                document

                    .querySelectorAll('.tab')

                    .forEach(
                        item =>

                            item.classList.remove(
                                'active'
                            )
                    );


                // Adicionar active

                tab.classList.add(
                    'active'
                );


                // Mostrar categoria

                renderProducts(
                    tab.dataset.category
                );

            }
        );

    });



// ======================================================
// BOTÃO CARRINHO DESKTOP
// ======================================================


document

    .getElementById(
        'openCart'
    )

    .addEventListener(
        'click',
        openCart
    );



// ======================================================
// BOTÃO CARRINHO MOBILE
// ======================================================


document

    .getElementById(
        'openCartMobile'
    )

    .addEventListener(
        'click',
        () => {


            document

                .getElementById(
                    'mobileMenu'
                )

                .classList.remove(
                    'open'
                );


            openCart();

        }
    );



// ======================================================
// FECHAR CARRINHO
// ======================================================


document

    .getElementById(
        'closeCart'
    )

    .addEventListener(
        'click',
        closeCart
    );



// ======================================================
// CLICAR FORA DO CARRINHO
// ======================================================


document

    .getElementById(
        'cartBackdrop'
    )

    .addEventListener(
        'click',
        closeCart
    );



// ======================================================
// BOTÃO RESERVAR
// ======================================================


document

    .getElementById(
        'checkoutBtn'
    )

    .addEventListener(
        'click',
        openModal
    );



// ======================================================
// LIMPAR CARRINHO
// ======================================================


document

    .getElementById(
        'clearCart'
    )

    .addEventListener(
        'click',
        clearCart
    );



// ======================================================
// FECHAR MODAL
// ======================================================


document

    .getElementById(
        'closeModal'
    )

    .addEventListener(
        'click',
        closeModal
    );



// ======================================================
// MENU MOBILE
// ======================================================


document

    .getElementById(
        'menuToggle'
    )

    .addEventListener(
        'click',
        () => {


            document

                .getElementById(
                    'mobileMenu'
                )

                .classList.toggle(
                    'open'
                );

        }
    );



// ======================================================
// FECHAR MENU MOBILE
// ======================================================


document

    .querySelectorAll(
        '.mobile-menu a'
    )

    .forEach(link => {


        link.addEventListener(
            'click',
            () => {


                document

                    .getElementById(
                        'mobileMenu'
                    )

                    .classList.remove(
                        'open'
                    );

            }
        );

    });



// ======================================================
// FORMULÁRIO DE RESERVA
// ======================================================


document

    .getElementById(
        'checkoutForm'
    )

    .addEventListener(
        'submit',
        (event) => {


            event.preventDefault();



            const name =

                document

                    .getElementById(
                        'customerName'
                    )

                    .value;



            const date =

                document

                    .getElementById(
                        'eventDate'
                    )

                    .value;



            const note =

                document

                    .getElementById(
                        'customerNote'
                    )

                    .value;



            const whatsapp =

                buildWhatsappMessage(
                    name,
                    date,
                    note
                );



            // Abrir WhatsApp

            window.open(
                whatsapp,
                '_blank'
            );

        }
    );



// ======================================================
// IMPEDIR DATA PASSADA
// ======================================================


document

    .getElementById(
        'eventDate'
    )

    .min =

        new Date()

            .toISOString()

            .split('T')[0];



// ======================================================
// ANO DO SITE
// ======================================================


document

    .getElementById(
        'year'
    )

    .textContent =

        new Date()
            .getFullYear();



// ======================================================
// INICIAR SITE
// ======================================================


renderProducts();

renderCart();