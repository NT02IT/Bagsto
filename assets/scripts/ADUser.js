listUser = [
    {   
        IDUser: "001",
        img: "assets/img/avatar-placeholder.png",
        FullName: "Nguyễn Văn Tèo",
        Address: "12/1 Nguyễn Văn Cừ quận 5 thành phố Hồ Chí Minh",
        CreateDate: "10/1/2023",
        Status: "Active",
    },
    {
        IDUser: "002",
        img: "assets/img/avatar-placeholder.png",
        FullName: "Lê Văn Báo",
        Address: "15/1 Nguyễn Văn Cừ quận 5 thành phố Hồ Chí Minh",
        CreateDate: "20/1/2023",
        Status: "Active",
    },
    {
        IDUser: "003",
        img: "assets/img/avatar-placeholder.png",
        FullName: "Lê Văn Báo",
        Address: "15/1 Nguyễn Văn Cừ quận 5 thành phố Hồ Chí Minh",
        CreateDate: "20/1/2023",
        Status: "Active",
    },
    {
        IDUser: "004",
        img: "assets/img/avatar-placeholder.png",
        FullName: "Lê Văn Báo",
        Address: "15/1 Nguyễn Văn Cừ quận 5 thành phố Hồ Chí Minh",
        CreateDate: "20/1/2023",
        Status: "Active",
    },
    {
        IDUser: "005",
        img: "assets/img/avatar-placeholder.png",
        FullName: "Lê Văn Báo",
        Address: "15/1 Nguyễn Văn Cừ quận 5 thành phố Hồ Chí Minh",
        CreateDate: "20/1/2023",
        Status: "Banned",
    },
    {
        IDUser: "006",
        img: "assets/img/avatar-placeholder.png",
        FullName: "Lê Văn Báo",
        Address: "15/1 Nguyễn Văn Cừ quận 5 thành phố Hồ Chí Minh",
        CreateDate: "20/1/2023",
        Status: "Active",
    },
    {
        IDUser: "007",
        img: "assets/img/avatar-placeholder.png",
        FullName: "Lê Văn Báo",
        Address: "15/1 Nguyễn Văn Cừ quận 5 thành phố Hồ Chí Minh",
        CreateDate: "20/1/2023",
        Status: "Banned",
    },
    {
        IDUser: "008",
        img: "assets/img/avatar-placeholder.png",
        FullName: "Lê Văn Báo",
        Address: "15/1 Nguyễn Văn Cừ quận 5 thành phố Hồ Chí Minh",
        CreateDate: "20/1/2023",
        Status: "Active",
    }
];

// const addUser = document.getElementsByClassName("body-tab")[0];
var tableUser = document.getElementsByClassName("user-table-body")[0];

function loadUser(listUser){
    var listStatus = "";
    for(let i=0;i<6;i++)
    {
        listStatus += `
        <tr class="user-table__row">
            <th class="user-table-body-cell">
            <div class="user-table-title-name">
                <img class="user-img" src="${listUser[i].img}" alt="">
                <p class="user-text">${listUser[i].FullName}</p>
            </div>
                </th>
            <th class="user-table-title-address">
                <p class="user-text">${listUser[i].Address}</p>
            </th>
            <th class="user-table-title-date-create">
                <p class="user-text">${listUser[i].CreateDate}</p>
            </th>
            <th class="user-table-title-status">
                <p class="user-text">${listUser[i].Status}</p>
            </th>
            <th class="user-table-title-switch">
                <i class="icon-more">
            </th>  
        </tr>     
        `;
    }
    tableUser.innerHTML = listStatus;
}
// window.onload = function(){
//     loadUser(listUser);
// };
// addUser.addEventListener("click",loadUser(listUser));
function toggleVisibility(){
    var a = document.getElementById("user-data");
    if (a.style.display === "none"){
        a.style.display = "block";
    } else {
        a.style.display = "block";
    }
}
document.getElementById('preview-image').addEventListener("click",function(){
    document.getElementById('image-input').click();   
});
function previewImage() {
    var input = document.getElementById('image-input');
    var preview = document.getElementById('preview-image');

    var file = input.files[0];

    if (file) {
        var reader = new FileReader();
        
        reader.onload = function(e) {
            preview.style.display="block";
            preview.src = e.target.result;
        }

        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }
}
document.getElementById('preview-image-change').addEventListener("click",function(){
    document.getElementById('image-change').click();   
});
function previewImageChange() {
    var input = document.getElementById('image-change');
    var preview = document.getElementById('preview-image-change');

    var file = input.files[0];

    if (file) {
        var reader = new FileReader();
        
        reader.onload = function(e) {
            preview.style.display="block";
            preview.src = e.target.result;
        }

        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }
}

listBillUser = [
    {
        DateBuying: "12/10/2023",
        IDBill: "01dc1370-3df6-11eb-b378-0242ac130002",
        Price: "33,25$",
    },
    {
        DateBuying: "25/11/2023",
        IDBill: "01dc1370-3df6-11eb-b378-0242ac130003",
        Price: "50$",
    },
    {
        DateBuying: "20/11/2023",
        IDBill: "01dc1370-3df6-11eb-b378-0242ac130003",
        Price: "50$",
    },
    {
        DateBuying: "21/11/2023",
        IDBill: "01dc1370-3df6-11eb-b378-0242ac130003",
        Price: "50$",
    },
    {
        DateBuying: "1/11/2023",
        IDBill: "01dc1370-3df6-11eb-b378-0242ac130003",
        Price: "850$",
    },
    {
        DateBuying: "5/11/2023",
        IDBill: "01dc1370-3df6-11eb-b378-0242ac130003",
        Price: "510$",
    },
    {
        DateBuying: "25/10/2023",
        IDBill: "01dc1370-3df6-11eb-b378-0242ac130003",
        Price: "250$"
    },
    {
        DateBuying: "11/11/2023",
        IDBill: "01dc1370-3df6-11eb-b378-0242ac130003",
        Price: "450$",
    },
    {
        DateBuying: "2/11/2023",
        IDBill: "01dc1370-3df6-11eb-b378-0242ac130003",
        Price: "50,33$",
    },
];

var tableHistoryBuying = document.getElementsByClassName("bill-user")[0];
function loadHistoryBuying(listBillUser){
    var listBill="";
    for(let i=0;i<6;i++)
    {
        listBill +=`
            <tr >
                <th class="date-buying">
                    <p class="table-cell-history-buying"> ${listBillUser[i].DateBuying}</p>   
                </th>
                <th class="bill">
                    <p class="table-cell-history-buying"> ${listBillUser[i].IDBill}</p>
                </th>
                <th class="price">
                    <p class="table-cell-history-buying"> ${listBillUser[i].Price}</p>
                </th>
            </tr>
        `;
    }
    tableHistoryBuying.innerHTML = listBill;
}

let listUserOrder = JSON.parse(localStorage.getItem('products'));
var tableUserOrder= document.getElementsByClassName("user-order-table-detail")[0];
function loadUserOrder(listUserOrder){
    var listOrder="";
    for (let i=0; i< 3 ;i++){
        listOrder += `
        <tr>
                <th class="user-order-product">
                    <p class="table-cell-order">${listUserOrder[i].name}</p>
                </th>
                <th class="user-order-price">
                    <p class="table-cell-order">${listUserOrder[i].price_imported}</p>
                </th>
                <th class="user-order-amount">
                    <p class="table-cell-order"> 1 </p>
                </th>
                <th class="user-order-money">
                    <p class="table-cell-order">${listUserOrder[i].price_sell}</p>
                </th>             
        </tr>
        `;
    }
    tableUserOrder.innerHTML = listOrder;
}
let listReceiver = JSON.parse(localStorage.getItem('receivers'));
const receiversOrder = document.getElementById("address-ship");
function loadReceiver(listReceiver){
    var receiver="";
    receiver += `
    <div class="name-owner"> ${listReceiver[1].name}</div>
    <div class="address-owner">${listReceiver[1].address}</div>
    <div class="phone-owner">${listReceiver[1].phone}</div>
`
receiversOrder.innerHTML= receiver;
}
window.onload = function(){
    console.log(listReceiver);
    loadHistoryBuying(listBillUser);
    loadUser(listUser);
    loadUserOrder(listUserOrder);
    loadReceiver(listReceiver);
}
 

