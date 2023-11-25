// SIDE NAVIGATE
const mainBody = document.getElementById('main-body');
const sitesMainBody = document.querySelectorAll('[id$="-page"]');
const headerLogo = document.getElementById('header-logo');
const footerLogo = document.getElementById('footer-logo');
const headerTab1 = document.getElementById('header-tab-1');
const headerTab2 = document.getElementById('header-tab-2');
const headerTab3 = document.getElementById('header-tab-3');

const siteIndex = document.getElementById('index-page');
const siteProduct = document.getElementById('product-page');

headerLogo.addEventListener('click', () => {
  resetNavbar();
  clearMainBody();
  siteIndex.classList.remove('hidden');
})
footerLogo.addEventListener('click', () => {
  resetNavbar();
  clearMainBody();
  siteIndex.classList.remove('hidden');
})
var currentPageBaloProduct = 1;
headerTab1.addEventListener('click', () => {
  if (!headerTab1.classList.contains('active')) {
    resetNavbar();
    if (!headerTab1.classList.contains('active'))
      headerTab1.classList.add('active');
    clearMainBody();
    if (siteProduct.classList.contains('hidden')) {
      siteProduct.classList.remove('hidden');
      siteProduct.classList.add('product-balo')

      const prdItems_Product = document.querySelector("#product-page .products__items");
      const pagination_Product = document.getElementById('product-pagination-products');
      displayProducts(prdItems_Product, itemList, currentPageBaloProduct);
      updatePaginationOfProducts(prdItems_Product, itemList, pagination_Product, currentPageBaloProduct);
    }
  }
})

function resetNavbar() {
  if (headerTab1.classList.contains('active'))
    headerTab1.classList.remove('active');
  if (headerTab2.classList.contains('active'))
    headerTab2.classList.remove('active');
  if (headerTab3.classList.contains('active'))
    headerTab3.classList.remove('active');
}
function clearMainBody() {
  for (let i = 0; i < sitesMainBody.length; i++) {
    sitesMainBody[i].classList.add('hidden');
  }
}
// SIDE NAVIGATE

// HEADER INTERFACE
const burgerBtn = document.getElementById('burger-btn')
const mobileNav = document.getElementById('mobile-nav')
const headerClientAvatar = document.querySelector('#header-client .header__avatar')
const accountPopover = document.querySelector('.account-popover')
burgerBtn.addEventListener('click', function () {
  mobileNav.classList.toggle('collapsed');
});

headerClientAvatar.addEventListener('click', function () {
  accountPopover.classList.toggle('collapsed');
});
// HEADER INTERFACE

const filterProductBtns = document.querySelectorAll('.action__filter');
// const filterCloseBtn = document.getElementById('btn-filter-close');
const filterPopover = document.getElementById('product-filter');
for (let i = 0; i < filterProductBtns.length; i++) {
  const filterCloseBtn = document.querySelector('#btn-filter-close');
  filterCloseBtn.addEventListener('click', function () {
    filterPopover.classList.add('collapsed');
  });

  filterProductBtns[i].addEventListener("click", function () {
    filterPopover.classList.remove("collapsed");

    const deleteFilterOptionBtn = filterPopover.querySelector(".filter__action .delete");
    deleteFilterOptionBtn.addEventListener("click", () => {
      const prdFilterGenderList = filterPopover.querySelectorAll('.filter__gender input[type="checkbox"]');
      const prdFilterBrandList = filterPopover.querySelectorAll('.filter__brand input[type="checkbox"]');
      const prdFilterColorList = filterPopover.querySelectorAll('.filter__color input[type="checkbox"]');
      const prdFilterPriceList = filterPopover.querySelectorAll('.filter__price input[type="text"]');
      resetFilterOption(prdFilterGenderList);
      resetFilterOption(prdFilterBrandList);
      resetFilterOption(prdFilterColorList);
      for (let i = 0; i < prdFilterPriceList.length; i++) {
        prdFilterPriceList[i].value = "";
      }
    });
  });
}

// filterProductBtn.addEventListener('click', function(){
//     filterPopover.classList.remove('collapsed');

//     const prdFilterGenderList = filterPopover.querySelectorAll('.filter__gender input[type="checkbox"]')
//     const prdFilterBrandList = filterPopover.querySelectorAll('.filter__brand input[type="checkbox"]')
//     const prdFilterColorList = filterPopover.querySelectorAll('.filter__color input[type="checkbox"]')
//     const prdFilterPriceList = filterPopover.querySelectorAll('.filter__price input[type="text"]')
//     const deleteFilterOptionBtn = filterPopover.querySelector('.filter__action .delete')
//     deleteFilterOptionBtn.addEventListener('click', () => {
//         resetFilterOption(prdFilterGenderList);
//         resetFilterOption(prdFilterBrandList);
//         resetFilterOption(prdFilterColorList);
//         for(let i = 0; i < prdFilterPriceList.length; i++){
//             prdFilterPriceList[i].value = ""
//         }
//     });
// });
// filterCloseBtn.addEventListener('click', function(){
//     filterPopover.classList.add('collapsed');
// });

// const filterProductBtns = document.querySelectorAll('.action__filter');
// const filterPopovers = document.querySelectorAll("[id^='product-filter']");
// for (let i = 0; i < filterProductBtns.length; i++) {
//   console.log(i);

//   const filterCloseBtns = document.querySelectorAll('#btn-filter-close');
//   filterCloseBtns[i].addEventListener('click', function(){
//     filterPopovers[i].classList.add('collapsed');
//   });

//   filterProductBtns[i].addEventListener("click", function () {
//     filterPopovers[i].classList.remove("collapsed");

//     const prdFilterGenderList = filterPopovers[i].querySelectorAll('.filter__gender input[type="checkbox"]');
//     const prdFilterBrandList = filterPopovers[i].querySelectorAll('.filter__brand input[type="checkbox"]');
//     const prdFilterColorList = filterPopovers[i].querySelectorAll('.filter__color input[type="checkbox"]');
//     const prdFilterPriceList = filterPopovers[i].querySelectorAll('.filter__price input[type="text"]');
//     const deleteFilterOptionBtn = filterPopovers[i].querySelector(".filter__action .delete");
//     deleteFilterOptionBtn.addEventListener("click", () => {
//       resetFilterOption(prdFilterGenderList);
//       resetFilterOption(prdFilterBrandList);
//       resetFilterOption(prdFilterColorList);
//       for (let i = 0; i < prdFilterPriceList.length; i++) {
//         prdFilterPriceList[i].value = "";
//       }
//     });
//   });
// }

function resetFilterOption(listOption) {
  for (let i = 0; i < listOption.length; i++) {
    listOption[i].checked = false;
  }
}

const sortProductBtns = document.querySelectorAll('.action__sort');
const sortProductPopovers = document.querySelectorAll('.sort-popover')
for (let i = 0; i < sortProductPopovers.length; i++) {
  sortProductBtns[i].addEventListener('click', function () {
    sortProductPopovers[i].classList.toggle('hidden');
  });
}

const filterPopoverProduct = document.querySelector('.filter-desktop');
const deleteFilterOptionBtnProductPage = document.querySelector('.filter-desktop .filter__action > button.type-inherit');
deleteFilterOptionBtnProductPage.addEventListener('click', function () {
  const prdFilterGenderList = filterPopoverProduct.querySelectorAll('.filter__gender input[type="checkbox"]');
  const prdFilterBrandList = filterPopoverProduct.querySelectorAll('.filter__brand input[type="checkbox"]');
  const prdFilterColorList = filterPopoverProduct.querySelectorAll('.filter__color input[type="checkbox"]');
  const prdFilterPriceList = filterPopoverProduct.querySelectorAll('.filter__price input[type="text"]');
  resetFilterOption(prdFilterGenderList);
  resetFilterOption(prdFilterBrandList);
  resetFilterOption(prdFilterColorList);
  for (let i = 0; i < prdFilterPriceList.length; i++) {
    prdFilterPriceList[i].value = "";
  }
});


document.addEventListener("click", function (event) {
  // Kiểm tra xem người dùng có bấm ra ngoài popup mobileNav không
  if (!burgerBtn.contains(event.target) && !mobileNav.contains(event.target)) {
    mobileNav.classList.add("collapsed");
  }
  // Kiểm tra xem người dùng có bấm ra ngoài popup accPopover không
  if (!headerClientAvatar.contains(event.target) && !accountPopover.contains(event.target)) {
    accountPopover.classList.add("collapsed");
  }
  // Kiểm tra xem người dùng có bấm ra ngoài popup productFilterPopover không
  check = true;
  for (let i = 0; i < filterProductBtns.length; i++) {
    if (filterProductBtns[i].contains(event.target)) {
      check = false;
    }
  }
  if (check && !filterPopover.contains(event.target)) {
    filterPopover.classList.add("collapsed");
  }
  // Kiểm tra xem người dùng có bấm ra ngoài popup sortProductPopover không
  for (let i = 0; i < sortProductPopovers.length; i++) {
    if (!sortProductBtns[i].contains(event.target) && !sortProductPopovers[i].contains(event.target)) {
      sortProductPopovers[i].classList.add("hidden");
    }
  }
});

//xuất hiện ẩn đăng nhập đăng kí


document.getElementById("SignUp__button").addEventListener("click", function () {
  document.getElementById("LogInUser-page").style.display = "none";
  document.getElementById("SignupUser-page").style.display = "block";
});

document.getElementById("SignIn__button").addEventListener("click", function () {
  document.getElementById("SignupUser-page").style.display = "none";
  document.getElementById("LogInUser-page").style.display = "block";
});


// Account
document.getElementsByClassName("hello-account")[1].addEventListener("click", () => {
  var obj = document.getElementById("account-page");
  obj.style.display = "block";
})

document.addEventListener('DOMContentLoaded', function () {
  var tbody = document.getElementById('Table-info').getElementsByTagName('tbody')[0];
  var productDetailsContainer = document.getElementById('ProductDetailsContainer');
  var productDetailsContent = document.getElementById('ProductDetailsContent');
  var account = document.getElementById('account-page'); // Thêm đoạn này để tham chiếu đến phần tử account


  // Mảng chứa dữ liệu đơn hàng
  var newData = [
    // ... (giữ nguyên phần dữ liệu)
    {
      col1: '',
      col2: '20/11/2003',
      col3: 'ABCDXYZ',
      col4: '200$',
      col5: '...',
      shippingAddress: '123 Đường ABC, Thành phố XYZ',
      productList: [
        { name: 'Sản phẩm 1', price: 100 },
        { name: 'Sản phẩm 2', price: 50 }
      ],
    },
    {
      col1: '',
      col2: '20/11/2003',
      col3: 'EBCDXYZ',
      col4: '200$',
      col5: '...',
      shippingAddress: '123 Đường ABC, Thành phố XYZ',
      productList: [
        { name: 'Sản phẩm 1', price: 100 },
        { name: 'Sản phẩm 1', price: 100 },
        { name: 'Sản phẩm 1', price: 100 },
        { name: 'Sản phẩm 1', price: 100 },
        { name: 'Sản phẩm 2', price: 50 }
      ],
    },
    {
      col1: '',
      col2: '20/2/2022',
      col3: 'KJSJFJS',
      col4: '500$',
      col5: '...',
      shippingAddress: '123 Đường ABC, Thành phố XYZ',
      productList: [
        { name: 'Sản phẩm 1', price: 100 },
        { name: 'Sản phẩm 1', price: 100 },
        { name: 'Sản phẩm 1', price: 100 },
        { name: 'Sản phẩm 1', price: 100 },
        { name: 'Sản phẩm 2', price: 50 }
      ],
    },
  ];


  // Đọc dữ liệu từ mảng và thêm vào bảng
  for (var i = 0; i < newData.length; i++) {
    var row = tbody.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);

    cell1.innerHTML = newData[i].col1;
    cell2.innerHTML = newData[i].col2;
    cell3.innerHTML = newData[i].col3;
    cell4.innerHTML = newData[i].col4;

    cell1.className = 'Table_Row_Invoice';
    cell2.className = 'Table_Row_Invoice';
    cell3.className = 'Table_Row_Invoice';
    cell4.className = 'Table_Row_Invoice';

  }

});
//thêm ảnh vào Avatar
document.getElementById('Avatar-image').addEventListener("click", function () {
  document.getElementById('image-input').click();
});
function previewImageAvatar() {
  var input = document.getElementById('image-input-Avatar');
  var preview = document.getElementById('Avatar-image');

  var file = input.files[0];

  if (file) {
    var reader = new FileReader();

    reader.onload = function (e) {
      preview.style.display = "block";
      preview.src = e.target.result;
    }

    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}
//chọn vào 1 đơn hàng xuất ra chi tiết đơn hàng


var userdata  = [
  {
      id: 1,
      name: "Leanne Graham",
      email: "Sincere@april.biz",
      password: "1234567890",
      address: "173 Võ Thị Sáu, Q.1, Tp.HCM",
      phone: "0327531105",
      avatar: ""
  },
  {
      id: 2,
      name: "Ervin Howell",
      email: "Shanna@melissa.tv",
      password: "1234567890",
      address: "98 Xuân Diệu, Mộ Đức, Quảng Ngãi",
      phone: "0523235565",
      avatar: ""
  },
  {
      id: 3,
      name: "Clementine Bauch",
      email: "Nathan@yesenia.net",
      password: "1234567890",
      address: "375 Võ Trường Toản, Ngô Mây, Bình Định",
      phone: "05467882326",
      avatar: ""
  },
  {
      id: 4,
      name: "Patricia Lebsack",
      email: "Julianne.OConner@kory.org",
      password: "1234567890",
      address: "967/98 Trần Xuân Soạn, Quận 7, Tp.HCM",
      phone: "0567868323",
      avatar: ""
  },
  {
      id: 5,
      name: "Chelsey Dietrich",
      email: "Lucio_Hettinger@annie.ca",
      password: "1234567890",
      address: "132 Võ Nguyên Giáp, Phù Mỹ, Bình Định",
      phone: "04365781223",
      avatar: ""
  },
  {
      id: 6,
      name: "Mrs. Dennis Schulist",
      email: "Karley_Dach@jasper.info",
      password: "1234567890",
      address: "02 Trần Bình Trọng, Hải Dương",
      phone: "0567876884",
      avatar: ""
  },
  {
      id: 7,
      name: "Kurtis Weissnat",
      email: "Telly.Hoeger@billy.biz",
      password: "1234567890",
      address: "187 Nguyễn Thị Minh Khai, Đống Đa, Hà Nội",
      phone: "05678832241",
      avatar: ""
  },
  {
      id: 8,
      name: "Nicholas Runolfsdottir V",
      email: "Sherwood@rosamond.me",
      password: "1234567890",
      address: "72 Hồng Bàng, Q.10. Tp.HCM",
      phone: "04565782345",
      avatar: ""
  },
  {
      id: 9,
      name: "Glenna Reichert",
      email: "Chaim_McDermott@dana.io",
      password: "1234567890",
      address: "128/6/12 Nguyễn Đình Chiểu, Q.5, Tp. HCM",
      phone: "04665753343",
      avatar: ""
  },
  {
      id: 10,
      name: "Clementina DuBuque",
      email: "Rey.Padberg@karina.biz",
      password: "1234567890",
      address: "32 Bình Qưới, Thanh Đa, Q.Bình Thạnh, Tp.HCM",
      phone: "05643524454",
      avatar: ""
  },
  {
      id: 11,
      name: "Nguyễn Anh Tuấn",
      email: "lowtee.vn@gmail.com",
      password: "1234567890",
      address: "967/98 Trần Xuân Soạn, Quận 7, Tp.HCM",
      phone: "0327431105",
      avatar: ""
  }

]
  localStorage.setItem("userdata", JSON.stringify(userdata));

const userName = document.querySelector("#UserName-Usersingin");
const passwordName = document.querySelector("#Password-Usersingin");
const btn = document.querySelector("#btnLogin");

btn.addEventListener("click", () => {
  const u = userdata.find((user) => user.name == userName.value && user.password == passwordName.value)
  if (u) {
    alert("đăng nhập thành công")
    console.log("co user");
    document.getElementById("font-bold account-name").innerText = ` ${u.name} `;
    localStorage.setItem("saveLogin",JSON.stringify(u));
    // đọc thông tin vào ô thông tin user
    document.getElementById("user_fullName").value = `${u.name} `;
    document.getElementById("user_number").value = `${u.phone} `;
    document.getElementById("user_address").value = `${u.address} `;
    document.getElementById("user_email").value = `${u.email} `;
    document.getElementById("user_pass").value = `${u.password} `;
    document.getElementById("user_checkpass").value = `${u.password} `;
    document.getElementById("Avatar-image").src= u.avatar ;
  }
  else {
    alert("không có tài khoản")
  }
  // console.log(userName.value);
  // console.log(passwordName.value);
});

// reload ko mất thông tin
function checkSave(){
  const saveLogin=JSON.parse(localStorage.getItem("saveLogin"));
  if(saveLogin){
    document.getElementById("font-bold account-name").innerText = ` ${saveLogin.name} `;
    // ô thông tin
    document.getElementById("user_fullName").value = `${saveLogin.name} `;
    document.getElementById("user_number").value = `${saveLogin.phone} `;
    document.getElementById("user_address").value = `${saveLogin.address} `;
    document.getElementById("user_email").value = `${saveLogin.email} `;
    document.getElementById("user_pass").value = `${saveLogin.password} `;
    document.getElementById("user_checkpass").value = `${saveLogin.password} `;
  }
}
checkSave();
// hàm đăng xuất
function checkLogout()
{
  localStorage.removeItem("saveLogin");
}

document.getElementById("logout_bt").addEventListener("click",()=>{
  checkLogout()
  window.location.reload();
})

//dang ki
var userdata = JSON.parse(localStorage.getItem("userdata"));
const btsup = document.querySelector("#btnsignup");
btsup.addEventListener("click", () => {
  const usercheck = document.querySelector("#UserName-UserSignup");
  const u = userdata.find((user) => user.name == usercheck.value)
  if (u) {
    alert("đã có tên tài khoảng được sử dụng");
  }
  else { 
    const newname = document.querySelector("#UserName-UserSignup").value;
    const newphone = document.querySelector("#SDT-UserSignup").value;
    const newaddress = document.querySelector("#ADDRESS-UserSignup").value;
    const newemail = document.querySelector("#EMAIL-UserSignup").value;
    const newpassword = document.querySelector("#Password-UserSignup").value;
    const newcheckpassword = document.querySelector("#CheckPassword-UserSignup").value;
    if(newpassword == newcheckpassword)
    {
      const newuser = {
        name: newname,
        phone: newphone,
        address: newaddress,
        email: newemail,
        password: newpassword,
      }
      userdata.push(newuser);
      localStorage.setItem("userdata",JSON.stringify(userdata));
      alert("đăng ki thành công mời bạn đăng nhập");
    }
    else{
      alert("xác nhận mật khẩu không đúng với mật khẩu");
    }
  }

});