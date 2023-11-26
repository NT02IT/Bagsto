// REGEX FORMAT
const emailFormat = /.*@.+/;
const numberFormat = /[0-9]/;
const lowercaseFormat = /[a-z]/;
const uppercaseFormat = /[A-Z]/;
const specialCharFormat = /[\!\@\#\$\%\^\&\*]/;
const phonenumFormat = /^0\d{8,10}$/;
// REGEX FORMAT

// DATA INIT
//----------------------------------------------------------------
function writeToStorage(key, valueUrl) {
    const storedData = localStorage.getItem(key);
    if (!storedData) {
        fetch(valueUrl)
            .then(response => response.json())
            .then(data => {
            localStorage.setItem(key, JSON.stringify(data));
            })
            .catch(error => console.error('Error reading JSON file:', error));
    }
}

function getFromStorage(key) {
  const storedData = localStorage.getItem(key);
  if (storedData) {
    const users = JSON.parse(storedData);
    return users;
  } else {
    // console.log('No data found in localStorage.');
    return null;
  }
}
writeToStorage('products', '../../data/products.json');
let productList = getFromStorage('products');
writeToStorage('users', '../../data/users.json');
let usersList = getFromStorage('users');

//----------------------------------------------------------------
// DATA INIT

// PRODUCT DISPLAY
//----------------------------------------------------------------
const itemsPerPage = 12;
const maxPaginationItem = 5;

function displayProducts(htmlContainer, productList, currentPage){
    htmlContainer.innerHTML = "";
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const itemsToDisplay = productList.slice(start, end);

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
                        <div class="product__price--raw subtitle2 font-line_through">60.000đ</div>
                        <div class="product__price--sale subtitle1">30.000đ</div>
                    </div>
                    <button class="btn-add-prd"><i class="icon-add_shopping_cart"></i>Thêm vào giỏ</button>
                </div>
            </div>
        `;
        htmlContainer.appendChild(prdItem);
    }  
}
//----------------------------------------------------------------
// PRODUCT DISPLAY

// PAGINATION CONTROL
//----------------------------------------------------------------
function renderPrevBtnPagination(htmlContainer, productList, pagination, currentPage) {
    const previousBtn = document.createElement("li");    
    previousBtn.classList.add('pagination__btn-previous');
    if(currentPage === 1) previousBtn.classList.add('disable');
    previousBtn.innerHTML = `<i class="icon-chevron_left"></i>`;
    pagination.appendChild(previousBtn);

    if(!previousBtn.classList.contains('disable')){
        previousBtn.addEventListener('click', () =>{
            currentPage--;
            displayProducts(htmlContainer, productList, currentPage);
            updatePaginationOfProducts(htmlContainer, productList, pagination, currentPage)
        });
    }
}

function renderNextBtnPagination(htmlContainer, productList, pagination, currentPage, totalPages){
    const nextBtn = document.createElement("li");
    nextBtn.classList.add('pagination__btn-next');
    if(currentPage == totalPages) nextBtn.classList.add('disable');
    nextBtn.innerHTML = `<i class="icon-chevron_right"></i>`;
    pagination.appendChild(nextBtn);
    if(!nextBtn.classList.contains('disable')){
        nextBtn.addEventListener('click', () =>{
            currentPage++;
            displayProducts(htmlContainer, productList, currentPage);
            updatePaginationOfProducts(htmlContainer, productList, pagination, currentPage)
        });
    }
}

function renderBodyPagination(htmlContainer, productList, pagination, currentPage, paginationItemQuantity){
    for (let i = 1; i <= paginationItemQuantity; i++) {
        const li = document.createElement("li");
        li.textContent = i;
        li.classList.add("pagination__item");
        if (i === currentPage) {
            li.classList.add("selected");
        }
        li.addEventListener("click", () => {
            currentPage = i;
            displayProducts(htmlContainer, productList, currentPage);
            updatePaginationOfProducts(htmlContainer, productList, pagination, currentPage);
        });
        pagination.appendChild(li);
    }  
}

function renderMoreBtnPagination(pagination){
    const moreBtn = document.createElement("li");
    moreBtn.classList.add('pagination__btn-previous', 'disabled');
    moreBtn.innerHTML = `...`;
    pagination.appendChild(moreBtn);
}

function updatePaginationOfProducts(htmlContainer, productList, pagination, currentPage){
    pagination.innerHTML = "";
    const totalPages = Math.ceil(productList.length / itemsPerPage);
    if(productList.length <= itemsPerPage) return
    if(totalPages <= maxPaginationItem){
        renderPrevBtnPagination(htmlContainer, productList, pagination, currentPage);
        renderBodyPagination(htmlContainer, productList, pagination, currentPage, totalPages);
        renderNextBtnPagination(htmlContainer, productList, pagination, currentPage, totalPages);
    } else{
        renderPrevBtnPagination(htmlContainer, productList, pagination, currentPage);
        if(currentPage <= maxPaginationItem-2){
            renderBodyPagination(htmlContainer, productList, pagination, currentPage, maxPaginationItem-1);
            renderMoreBtnPagination(pagination);
        } else if(currentPage >= maxPaginationItem-1 && currentPage <= totalPages-(maxPaginationItem-2)){
            renderMoreBtnPagination(pagination);
            for (let i = currentPage - (maxPaginationItem-((maxPaginationItem%2)?4:5)); i <= currentPage + (maxPaginationItem-4); i++) {
                const li = document.createElement("li");
                li.textContent = i;
                li.classList.add("pagination__item");
                if (i === currentPage) {
                    li.classList.add("selected");
                }
                li.addEventListener("click", () => {
                    currentPage = i;
                    displayProducts(htmlContainer, productList, currentPage);
                    updatePaginationOfProducts(htmlContainer, productList, pagination, currentPage)
                });
                pagination.appendChild(li);
            } 
            renderMoreBtnPagination(pagination);
        } else if(currentPage >= totalPages - (maxPaginationItem-3)){
            renderMoreBtnPagination(pagination);
            for (let i = totalPages - (maxPaginationItem-2); i <= totalPages; i++) {
                const li = document.createElement("li");
                li.textContent = i;
                li.classList.add("pagination__item");
                if (i === currentPage) {
                    li.classList.add("selected");
                }
                li.addEventListener("click", () => {
                    currentPage = i;
                    displayProducts(htmlContainer, productList, currentPage);
                    updatePaginationOfProducts(htmlContainer, productList, pagination, currentPage)
                });
                pagination.appendChild(li);
            } 
        }
        renderNextBtnPagination(htmlContainer, productList, pagination, currentPage, totalPages);
    }      
}
//----------------------------------------------------------------
// PAGINATION CONTROL

// INDEX SITE 
//----------------------------------------------------------------
var currentPage_Index = 1;
const prdItems_Index = document.querySelector("#index-page .products__items");
const pagination_Index = document.getElementById('index-pagination-products');
displayProducts(prdItems_Index, productList, currentPage_Index);
updatePaginationOfProducts(prdItems_Index, productList, pagination_Index, currentPage_Index);
//----------------------------------------------------------------
// INDEX SITE 

// PRODUCTS SITE
//----------------------------------------------------------------
var currentPage_Product = 1;
const prdItems_Product = document.querySelector("#product-page .products__items");
const pagination_Product = document.getElementById('product-pagination-products');
displayProducts(prdItems_Product, productList, currentPage_Product);
updatePaginationOfProducts(prdItems_Product, productList, pagination_Product, currentPage_Product);
//----------------------------------------------------------------
// PRODUCTS SITE