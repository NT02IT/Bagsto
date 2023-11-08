const itemsPerPage = 12;
const maxItemsPerPagination = 3;
const prdItems = document.querySelector(".products__items");
const pagination = document.querySelector(".pagination");

const itemList = [];
for (let i = 1; i <= 50; i++) {
  itemList.push(`Item ${i}`);
}

function displayItems(currentPage, items) {
    prdItems.innerHTML = "";
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const itemsToDisplay = items.slice(start, end);

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
        prdItems.appendChild(prdItem);
    }    
}

function updatePagination(currentPage, items) {
    pagination.innerHTML = "";
    const totalPages = Math.ceil(items.length / itemsPerPage);

    // Render Previous Button
    const previousBtn = document.createElement("li");
    previousBtn.classList.add('pagination__btn-previous');
    if(currentPage === 1) previousBtn.classList.add('disable');
    previousBtn.innerHTML = `<i class="icon-chevron_left"></i>`;
    pagination.appendChild(previousBtn);

    // Render Body Pagination
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement("li");
        li.textContent = i;
        li.classList.add("pagination__item");
        if (i === currentPage) {
            li.classList.add("selected");
        }
        li.addEventListener("click", () => {
            displayItems(i, items);
            updatePagination(i, items);
        });
        pagination.appendChild(li);
    }

    // Render Next Button
    const nextBtn = document.createElement("li");
    nextBtn.classList.add('pagination__btn-next');
    if(currentPage == totalPages) nextBtn.classList.add('disable');
    nextBtn.innerHTML = `<i class="icon-chevron_right"></i>`;
    pagination.appendChild(nextBtn);
}

displayItems(1, itemList);
updatePagination(1, itemList);
