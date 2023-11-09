// HEADER INTERFACE
const burgerBtn = document.getElementById('burger-btn')
const mobileNav = document.getElementById('mobile-nav')
const headerAvatar = document.querySelector('.header__avatar')
const accountPopover = document.querySelector('.account-popover')
burgerBtn.addEventListener('click', function(){
    mobileNav.classList.toggle('collapsed');
});

headerAvatar.addEventListener('click', function(){
    accountPopover.classList.toggle('collapsed');
});
// HEADER INTERFACE

const itemsPerPage = 12;
var productCurrentPage = 1;
const maxItemsPerPagination = 3;

const itemList = [];
for (let i = 1; i <= 100; i++) {
    itemList.push(`Item ${i}`);
}

function displayProducts(prdList, blockContain) {
    blockContain.innerHTML = "";
    const start = (productCurrentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const itemsToDisplay = prdList.slice(start, end);

    for (const item of itemsToDisplay) {
        const prdItem = document.createElement("li");
        prdItem.classList.add("product-card", "col-3");
        prdItem.innerHTML = `
                <div class="product-card__cont">
                    <img src="https://my.naelofar.com/pub/media/catalog/category/ND_09.jpg" alt="Productname" class="product__thumbnail">
                    <div class="product__info">
                        <h6 class="product__name">Foundations Matte Flip Flop Foundations Matte Flip Flop</h6>
                        <div class="stack">
                            <div class="product__color-utility">
                                <div class="color-utility"></div>
                                <div class="color-utility"></div>
                                <div class="color-utility"></div>
                            </div>
                            <div class="product__price--raw subtitle1 font-line_through">60.000đ</div>
                            <div class="product__price--sale subtitle1">30.000đ</div>
                        </div>
                        <button class="btn-add-prd"><i class="icon-add_shopping_cart"></i>Thêm vào giỏ</button>
                    </div>
                </div>
        `;
        blockContain.appendChild(prdItem);
    }    
}

const paginationOfProducts = document.getElementById('index-pagination-products');
// function updatePaginationOfProducts(items) {
//     paginationOfProducts.innerHTML = "";
//     const totalPages = Math.ceil(items.length / itemsPerPage);

//     // Render Previous Button
//     const previousBtn = document.createElement("li");
//     previousBtn.classList.add('pagination__btn-previous');
//     if(productCurrentPage === 1) previousBtn.classList.add('disable');
//     previousBtn.innerHTML = `<i class="icon-chevron_left"></i>`;
//     paginationOfProducts.appendChild(previousBtn);
//     if(!previousBtn.classList.contains('disable')){
//         previousBtn.addEventListener('click', () =>{
//             productCurrentPage--;
//             displayProducts(items, prdItems);
//             updatePaginationOfProducts(items);
//         });
//     }

//     // Render Body Pagination
//     for (let i = 1; i <= totalPages; i++) {
//         const li = document.createElement("li");
//         li.textContent = i;
//         li.classList.add("pagination__item");
//         if (i === productCurrentPage) {
//             li.classList.add("selected");
//         }
//         li.addEventListener("click", () => {
//             productCurrentPage = i;
//             displayProducts(items, prdItems);
//             updatePaginationOfProducts(items);
//         });
//         paginationOfProducts.appendChild(li);
//     }

//     // Render Next Button
//     const nextBtn = document.createElement("li");
//     nextBtn.classList.add('pagination__btn-next');
//     if(productCurrentPage == totalPages) nextBtn.classList.add('disable');
//     nextBtn.innerHTML = `<i class="icon-chevron_right"></i>`;
//     paginationOfProducts.appendChild(nextBtn);
//     if(!nextBtn.classList.contains('disable')){
//         nextBtn.addEventListener('click', () =>{
//             productCurrentPage++;
//             displayProducts(items, prdItems);
//             updatePaginationOfProducts(items);
//         });
//     }
// }

function renderPrevBtnPagination(items, totalPages){
    const previousBtn = document.createElement("li");
    previousBtn.classList.add('pagination__btn-previous');
    if(productCurrentPage === 1) previousBtn.classList.add('disable');
    previousBtn.innerHTML = `<i class="icon-chevron_left"></i>`;
    paginationOfProducts.appendChild(previousBtn);
    if(!previousBtn.classList.contains('disable')){
        previousBtn.addEventListener('click', () =>{
            productCurrentPage--;
            displayProducts(items, prdItems);
            updatePaginationOfProducts(items);
        });
    }
}
function renderNextBtnPagination(items, totalPages){
    const nextBtn = document.createElement("li");
    nextBtn.classList.add('pagination__btn-next');
    if(productCurrentPage == totalPages) nextBtn.classList.add('disable');
    nextBtn.innerHTML = `<i class="icon-chevron_right"></i>`;
    paginationOfProducts.appendChild(nextBtn);
    if(!nextBtn.classList.contains('disable')){
        nextBtn.addEventListener('click', () =>{
            productCurrentPage++;
            displayProducts(items, prdItems);
            updatePaginationOfProducts(items);
        });
    }
}
function renderBodyPagination(items, totalPages){
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement("li");
        li.textContent = i;
        li.classList.add("pagination__item");
        if (i === productCurrentPage) {
            li.classList.add("selected");
        }
        li.addEventListener("click", () => {
            productCurrentPage = i;
            displayProducts(items, prdItems);
            updatePaginationOfProducts(items);
        });
        paginationOfProducts.appendChild(li);
    }  
}
function renderMoreBtnPagination(){
    const moreBtn = document.createElement("li");
    moreBtn.classList.add('pagination__btn-previous', 'disabled');
    moreBtn.innerHTML = `...`;
    paginationOfProducts.appendChild(moreBtn);
}
function updatePaginationOfProducts(items) {
    paginationOfProducts.innerHTML = "";
    const totalPages = Math.ceil(items.length / itemsPerPage);
    console.log(totalPages);
    
    if(totalPages <= 5){
        renderPrevBtnPagination(items, totalPages);
        renderBodyPagination(items, totalPages);
        renderNextBtnPagination(items, totalPages);
    } else{
        renderPrevBtnPagination(items, totalPages);
        if(productCurrentPage <= 3){
            renderBodyPagination(items, 4);
            renderMoreBtnPagination();
        } else if(productCurrentPage >=4 && productCurrentPage <= totalPages-3){
            renderMoreBtnPagination();
            for (let i = productCurrentPage - 1; i <= productCurrentPage + 1; i++) {
                const li = document.createElement("li");
                li.textContent = i;
                li.classList.add("pagination__item");
                if (i === productCurrentPage) {
                    li.classList.add("selected");
                }
                li.addEventListener("click", () => {
                    productCurrentPage = i;
                    displayProducts(items, prdItems);
                    updatePaginationOfProducts(items);
                });
                paginationOfProducts.appendChild(li);
            } 
            renderMoreBtnPagination();
        } else if(productCurrentPage >= totalPages - 2){
            renderMoreBtnPagination();
            for (let i = totalPages - 3; i <= totalPages; i++) {
                const li = document.createElement("li");
                li.textContent = i;
                li.classList.add("pagination__item");
                if (i === productCurrentPage) {
                    li.classList.add("selected");
                }
                li.addEventListener("click", () => {
                    productCurrentPage = i;
                    displayProducts(items, prdItems);
                    updatePaginationOfProducts(items);
                });
                paginationOfProducts.appendChild(li);
            } 
        }
        renderNextBtnPagination(items, totalPages);
    }      
}

const prdItems = document.querySelector(".products__items");
displayProducts(itemList, prdItems);
updatePaginationOfProducts(itemList);
