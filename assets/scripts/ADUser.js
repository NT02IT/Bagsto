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

const addUser = document.getElementsByClassName("body-tab")[0];
var tableUser = document.getElementsByClassName("user-table-body")[0];

function loadUser(listUser){
    var listStatus = "";
    for(let i=0;i<6;i++)
    {
        listStatus += `
        <tr class="user-table__row">
            <th class="user-table-body-cell">
            <div class="user-table-body-cell__Name">
                <img class="user-img" src="${listUser[i].img}" alt="">
                <p class="user-name">${listUser[i].FullName}</p>
            </div>
                </th>
            <th class="user-table-body-cell">
                <p class="user-address">${listUser[i].Address}</p>
            </th>
            <th class="user-table-body-cell">
                <p class="user-createdate">${listUser[i].CreateDate}</p>
            </th>
            <th class="user-table-body-cell">
            <div class="user-table-body-cell__status">
                <p class="user-status">${listUser[i].Status}</p>
            </div>
            </th>
            <th class="user-table-body-cell">
                <i class="icon-more">
            </th>  
        </tr>     
        `;
    }
    tableUser.innerHTML = listStatus;
}
window.onload = function(){
    loadUser(listUser);
};
addUser.addEventListener("click",loadUser(listUser));
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