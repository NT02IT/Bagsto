ListProduct = [
    {
        productId: "B001",
        name: "San pham 1",
        img: "./assets/img/balo1.jpg",
        createAt: "08 Apr 2022",
        price: "60.47",
        status: "In Stock",
    },
    {
        productId: "B001",
        name: "San pham 2",
        img: "./assets/img/balo1.jpg",
        createAt: "08 Apr 2022",
        price: "55.47",
        status: "In Stock",
    },
    {
        productId: "B001",
        name: "San pham 1",
        img: "./assets/img/balo1.jpg",
        createAt: "08 Apr 2022",
        price: "55.47",
        status: "In Stock",
    },
    {
        productId: "B001",
        name: "San pham 1",
        img: "./assets/img/balo1.jpg",
        createAt: "08 Apr 2022",
        price: "55.47",
        status: "In Stock",
    },
    {
        productId: "B001",
        name: "San pham 1",
        img: "./assets/img/balo1.jpg",
        createAt: "08 Apr 2022",
        price: "55.47",
        status: "In Stock",
    },
    {
        productId: "B001",
        name: "San pham 1",
        img: "./assets/img/balo1.jpg",
        createAt: "08 Apr 2022",
        price: "55.47",
        status: "In Stock",
    },
    {
        productId: "B001",
        name: "San pham 1",
        img: "./assets/img/balo1.jpg",
        createAt: "08 Apr 2022",
        price: "55.47",
        status: "In Stock",
    },
    {
        productId: "B001",
        name: "San pham 1",
        img: "./assets/img/balo1.jpg",
        createAt: "08 Apr 2022",
        price: "55.47",
        status: "In Stock",
    },
    {
        productId: "B001",
        name: "San pham 9",
        img: "./assets/img/balo1.jpg",
        createAt: "08 Apr 2022",
        price: "55.47",
        status: "In Stock",
    },
    {
        productId: "B001",
        name: "San pham 10",
        img: "./assets/img/balo1.jpg",
        createAt: "08 Apr 2022",
        price: "55.47",
        status: "In Stock",
    },
];

const addProduct = document.getElementsByClassName("main-body__header__btnAddProduct")[0];
var table = document.getElementsByClassName("productTable__body")[0];

function loadProduct(listProduct){
    var ListItem = "";
    for (let i=0;i<6;i++){
         ListItem += `
            <tr class="productTable__row">
                <th class="productTable__body__cell">
                    <label for="productTable__body__cell__checkBox"></label>
                    <input type="checkbox" id="productTable__body__cell__checkBox">
                </th>
                <th class="productTable__body__cell">
                    <div class="productTable__body__cell--productName">
                        <img class="Product__img" src="${listProduct[i].img}" alt="">
                        <p class="product__name">${listProduct[i].name}</p>
                    </div>
                </th>
                <th class="productTable__body__cell">
                    <p>${listProduct[i].createAt}</p>
                </th>
                <th class="productTable__body__cell">
                    <p>$ ${listProduct[i].price}</p>
                </th>
                <th class="productTable__body__cell">
                    <div class="productTable__body__cell--productStatus">
                        <p>${listProduct[i].status}</p>
                    </div>
                </th>
                <th class="productTable__body__cell">
                    <button></button>
                </th>
            </tr>
        `;
    }
    table.innerHTML = ListItem;
}


window.onload = function () {
    loadProduct(ListProduct);
};

addProduct.addEventListener("click", loadProduct(ListProduct));