// DATA HANDLER
function IDGenerate() {
  var ngayGioHienTai = new Date();
  var chuoiNgayGio = ngayGioHienTai.toISOString().replace(/[-:T.]/g, "").slice(0, 14);
  var ID = chuoiNgayGio.slice(0, 6);
  return ID;
}
// DATA HANDLER

// VALIDATION
//----------------------------------------------------------------
/* ----------------------------
	CustomValidation prototype
	- Keeps track of the list of invalidity messages for this input
	- Keeps track of what validity checks need to be performed for this input
	- Performs the validity checks and sends feedback to the front end
---------------------------- */
function CustomValidation() {
	this.invalidities = [];
	this.validityChecks = [];
}
CustomValidation.prototype = {
	addInvalidity: function(message) {
		this.invalidities.push(message);
	},
	getInvalidities: function() {
		return this.invalidities.join('. \n');
	},
	checkValidity: function(input) {
		for ( var i = 0; i < this.validityChecks.length; i++ ) {
      var requirementElement = this.validityChecks[i].element;
			var isInvalid = this.validityChecks[i].isInvalid(input);
      var messages = this.validityChecks[i].invalidityMessage;
			if (isInvalid) {
				this.addInvalidity(messages);
			}
			if (requirementElement) {
				if (isInvalid) {
					requirementElement.classList.add('invalid');
            inner_ul = ``;
            for(var j = 0; j < this.invalidities.length; j++) {
                inner_ul += `<li>${this.invalidities[j]}</li>`;
            }
            requirementElement.innerHTML = inner_ul;
				} else {
					requirementElement.classList.remove('invalid');
				}
			} 
		}
	}
};

/* ----------------------------
	Check this input
	Function to check this particular input
	If input is invalid, use setCustomValidity() to pass a message to be displayed
---------------------------- */
function checkInput(input) {
	input.CustomValidation.invalidities = [];
	input.CustomValidation.checkValidity(input);

	// if ( input.CustomValidation.invalidities.length == 0 && input.value != '' ) {
	// 	input.setCustomValidity('');
	// } else {
	// 	var message = input.CustomValidation.getInvalidities();
	// 	input.setCustomValidity(message);
  //   console.log(message);
	// }
}
//----------------------------------------------------------------
// VALIDATION

// SIDE NAVIGATE
const mainBody = document.getElementById('main-body');
const sitesMainBody = document.querySelectorAll('[id$="-page"]');
const headerLogo = document.getElementById('header-logo');
const footerLogo = document.getElementById('footer-logo');
const headerTab1 = document.getElementById('header-tab-1');
const headerTab2 = document.getElementById('header-tab-2');
const headerTab3 = document.getElementById('header-tab-3');

const loginIndex = document.querySelector('#login-page.client');
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

      // const prdItems_Product = document.querySelector("#product-page .products__items");
      // const pagination_Product = document.getElementById('product-pagination-products');
      // displayProducts(prdItems_Product, itemList, currentPageBaloProduct);
      // updatePaginationOfProducts(prdItems_Product, itemList, pagination_Product, currentPageBaloProduct);
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
const accountsName = document.querySelectorAll(".hello-account p")
const helloAccounts = document.querySelectorAll(".hello-account")
const logoutButtons = document.querySelectorAll(".logout_button")
const signinSignupBtns = document.querySelectorAll('.header-signin-signup')
const headerClientAvatar = document.querySelector('#header-client .header__avatar')
const accountPopover = document.querySelector('.account-popover')
burgerBtn.addEventListener('click', function () {
  mobileNav.classList.toggle('collapsed');
});

headerClientAvatar.addEventListener('click', function () {
  accountPopover.classList.toggle('collapsed');
});

for(let i = 0; i < signinSignupBtns.length; i++) {
  signinSignupBtns[i].addEventListener('click', function(){
    clearMainBody();
    loginIndex.classList.remove('hidden')
  });
}

clearMainBody();
siteIndex.classList.remove('hidden');
let userLogin = JSON.parse(localStorage.getItem("currentUser"));
function isLoggedIn() {
  userLogin = JSON.parse(localStorage.getItem("currentUser"));
  headerClientAvatar.classList.remove('hidden');
  for(let i = 0; i < signinSignupBtns.length; i++){
    signinSignupBtns[i].classList.add('hidden');
  }
  for(let i = 0; i < accountsName.length; i++) {
    accountsName[i].textContent = userLogin.name;
  }
  for(let i = 0; i < logoutButtons.length; i++) {
    logoutButtons[i].classList.remove('hidden');
  }
  for(let i = 0; i < helloAccounts.length; i++) {
    helloAccounts[i].classList.remove('hidden');
  }
}
function doNotLogin(){
  headerClientAvatar.classList.add('hidden');
  for(let i = 0; i < signinSignupBtns.length; i++){
    signinSignupBtns[i].classList.remove('hidden');
  }
  for(let i = 0; i < logoutButtons.length; i++) {
    logoutButtons[i].classList.add('hidden');
  }
  for(let i = 0; i < helloAccounts.length; i++) {
    helloAccounts[i].classList.add('hidden');
  }
}

if(userLogin){ 
  isLoggedIn();
}
else{
  doNotLogin();
}
// HEADER INTERFACE

// COMMON HANDLER
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

for(let i = 0; i < logoutButtons.length; i++){
  logoutButtons[i].addEventListener("click",()=>{
    localStorage.removeItem("currentUser");
    clearMainBody();
    siteIndex.classList.remove('hidden');
    window.location.reload();
  })
}
// Log out
// COMMON HANDLER

//SIGNIN SITE
document.querySelector("#login-page .login__signup--btn").addEventListener("click", function () {
  clearMainBody();
  document.querySelector("#signup-page").classList.remove("hidden");
});

// Check Validation
var signinEmailValidityChecks = [
	{
		isInvalid: function(input) {
			return !emailFormat.test(input.value);
		},
		invalidityMessage: 'Định dạng email không đúng',
		element: document.querySelector('.input-requirements.for-signin__email')
	}
];
var signinEmailInput = document.getElementById('login-email');
signinEmailInput.CustomValidation = new CustomValidation();
signinEmailInput.CustomValidation.validityChecks = signinEmailValidityChecks;

var signinPasswordValidityChecks = [
	{
		isInvalid: function(input) {
			return input.value.length < 8 | input.value.length > 100;
		},
		invalidityMessage: 'Mật khẩu phải có ít nhất 8 ký tự',
		element: document.querySelector('.input-requirements.for-signin__password')
	},
	{
		isInvalid: function(input) {
			return !numberFormat.test(input.value);
		},
		invalidityMessage: 'Mật khẩu phải bao gồm ký tự và số',
		element: document.querySelector('.input-requirements.for-signin__password')
	},
	{
		isInvalid: function(input) {
			return !lowercaseFormat.test(input.value);
		},
		invalidityMessage: 'Mật khẩu phải bao gồm ký tự in thường',
		element: document.querySelector('.input-requirements.for-signin__password')
	},
	{
		isInvalid: function(input) {
			return !uppercaseFormat.test(input.value);
		},
		invalidityMessage: 'Mật khẩu phải bao gồm ký tự in hoa',
		element: document.querySelector('.input-requirements.for-signin__password')
	},
	{
		isInvalid: function(input) {
			return !specialCharFormat.test(input.value);
		},
		invalidityMessage: 'Mật khẩu phải chứa ký tự đặc biệt',
		element: document.querySelector('.input-requirements.for-signin__password')
	}
];
var signinPasswordInput = document.getElementById('login-password');
signinPasswordInput.CustomValidation = new CustomValidation();
signinPasswordInput.CustomValidation.validityChecks = signinPasswordValidityChecks;

var signinInputs = document.querySelectorAll('#login-page input:not([type="submit"]).js-checking');
var signinSubmit = document.querySelector('#login-page input[type="submit"]');
for (var i = 0; i < signinInputs.length; i++) {
	signinInputs[i].addEventListener('keyup', function() {
		checkInput(this);
	});
}
signinSubmit.addEventListener('click', function() {
	for (var i = 0; i < signinInputs.length; i++) {
		checkInput(signinInputs[i]);
	}
});
// Check Validation

// Check exist and login
signinSubmit.addEventListener("click", () => {
  const u = usersList.find((user) => ((user.email == signinEmailInput.value && user.password == signinPasswordInput.value && user.role == "client") ? user : null));
  if (u) {
    clearMainBody();
    siteIndex.classList.remove('hidden');
    localStorage.setItem("currentUser",JSON.stringify(u));

    for(let i = 0; i < accountsName.length; i++) {
      accountsName[i].textContent = u.name;
    }
    isLoggedIn();
  }
  else {
    alert("Không có tài khoản")
  }
});
// Check exist and login
//SIGNIN SITE

// SIGNUP SITE
document.querySelector("#signup-page .signup__login--btn").addEventListener("click", function () {
  clearMainBody();
  document.querySelector("#login-page").classList.remove("hidden");
});

// Check Validation
var signupPhoneNumValidityChecks = [
	{
		isInvalid: function(input) {
			return !phonenumFormat.test(input.value);
		},
		invalidityMessage: 'Định dạng số điện thoại không đúng',
		element: document.querySelector('.input-requirements.for-signup__phonenumber')
	}
];
var signupPhonenumInput = document.getElementById('signup-phonenum');
signupPhonenumInput.CustomValidation = new CustomValidation();
signupPhonenumInput.CustomValidation.validityChecks = signupPhoneNumValidityChecks;

var signupEmailValidityChecks = [
	{
		isInvalid: function(input) {
			return !emailFormat.test(input.value);
		},
		invalidityMessage: 'Định dạng email không đúng',
		element: document.querySelector('.input-requirements.for-signup__email')
	}
];
var signupEmailInput = document.getElementById('signup-email');
signupEmailInput.CustomValidation = new CustomValidation();
signupEmailInput.CustomValidation.validityChecks = signupEmailValidityChecks;

var signupPasswordValidityChecks = [
	{
		isInvalid: function(input) {
			return input.value.length < 8 | input.value.length > 100;
		},
		invalidityMessage: 'Mật khẩu phải có ít nhất 8 ký tự',
		element: document.querySelector('.input-requirements.for-signup__password')
	},
	{
		isInvalid: function(input) {
			return !numberFormat.test(input.value);
		},
		invalidityMessage: 'Mật khẩu phải bao gồm ký tự và số',
		element: document.querySelector('.input-requirements.for-signup__password')
	},
	{
		isInvalid: function(input) {
			return !lowercaseFormat.test(input.value);
		},
		invalidityMessage: 'Mật khẩu phải bao gồm ký tự in thường',
		element: document.querySelector('.input-requirements.for-signup__password')
	},
	{
		isInvalid: function(input) {
			return !uppercaseFormat.test(input.value);
		},
		invalidityMessage: 'Mật khẩu phải bao gồm ký tự in hoa',
		element: document.querySelector('.input-requirements.for-signup__password')
	},
	{
		isInvalid: function(input) {
			return !specialCharFormat.test(input.value);
		},
		invalidityMessage: 'Mật khẩu phải chứa ký tự đặc biệt',
		element: document.querySelector('.input-requirements.for-signup__password')
	}
];
var signupPasswordInput = document.getElementById('signup-password');
signupPasswordInput.CustomValidation = new CustomValidation();
signupPasswordInput.CustomValidation.validityChecks = signupPasswordValidityChecks;

var signupPasswordRepeatInput = document.getElementById('signup-password_repeat');
var signupPasswordRepeatValidityChecks = [
	{
		isInvalid: function() {
			return signupPasswordInput.value != signupPasswordRepeatInput.value;
		},
		invalidityMessage: 'Mật khẩu không trùng khớp',
        element: document.querySelector('.input-requirements.for-signup__password-repeat')
	}
];
signupPasswordRepeatInput.CustomValidation = new CustomValidation();
signupPasswordRepeatInput.CustomValidation.validityChecks = signupPasswordRepeatValidityChecks;

var signupInputs = document.querySelectorAll('#signup-page input:not([type="submit"]).js-checking');
var signupSubmit = document.querySelector('#signup-page input[type="submit"]');
for (var i = 0; i < signupInputs.length; i++) {
	signupInputs[i].addEventListener('keyup', function() {
		checkInput(this);
	});
}
signupSubmit.addEventListener('click', function() {
	for (var i = 0; i < signupInputs.length; i++) {
		checkInput(signupInputs[i]);
	}
});

function validateSignupForm(){
  if(!document.getElementById("signup-fullname").value) return false;
  if(!document.getElementById("signup-phonenum").value) return false;
  if(!document.getElementById("signup-address").value) return false;
  if(!document.getElementById("signup-email").value) return false;
  if(!document.getElementById("signup-password").value) return false;
  if(!document.getElementById("signup-password_repeat").value) return false;
  if(signupPhonenumInput.CustomValidation.invalidities.length > 0) return false;
  if(signupEmailInput.CustomValidation.invalidities.length > 0) return false;
  if(signupPasswordInput.CustomValidation.invalidities.length > 0) return false;
  if(signupPasswordRepeatInput.CustomValidation.invalidities.length > 0) return false;
  return true;
}
// Check Validation

// Check exist and signup
signupSubmit.addEventListener("click", () => {
  const u = usersList.find((user) => ((user.email == signupEmailInput.value && user.role == "client") ? user : null));
  if (u) {
    alert("Email đã được sử dụng");
  }
  if(validateSignupForm()) {     
      const newuser = {
        id: "AC" + IDGenerate(),
        name: document.getElementById("signup-fullname").value,
        email: document.getElementById("signup-email").value,
        password: document.getElementById("signup-password").value,
        address: document.getElementById("signup-address").value,        
        phone: document.getElementById("signup-phonenum").value,
        role: "client",
        avatar: ""
      }
      usersList.push(newuser);
      localStorage.setItem("users",JSON.stringify(usersList));
      localStorage.setItem("currentUser",JSON.stringify(newuser));
      isLoggedIn();
      clearMainBody();
      siteIndex.classList.remove('hidden');
      
      for(let i = 0; i < accountsName.length; i++) {
        accountsName[i].textContent = u.name;
      }

    
     
  }

});
// Check exist and signup
// SIGNUP SITE


// Account
document.getElementsByClassName("hello-account")[1].addEventListener("click", () => {
  alert("Đây là thông tin của bạn");
  clearMainBody();
  document.getElementById("account").style.display = "block";
})

document.addEventListener('DOMContentLoaded', function () {
  var tbody = document.getElementById('Table-info').getElementsByTagName('tbody')[0];
  var productDetailsContainer = document.getElementById('ProductDetailsContainer');
  var productDetailsContent = document.getElementById('ProductDetailsContent');
  var account = document.getElementById('account'); // Thêm đoạn này để tham chiếu đến phần tử account



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



// hàm đăng xuất


//dang ki

//cart//

const cartPage = document.getElementById('cart-page');
cartPage.classList.remove('hidden');


function createDeleteIcon() {
  const deleteCell = document.createElement('td');
  const deleteButton = document.createElement('button');

  const trashIcon = document.createElement('img');
  trashIcon.src = 'assets/brand/icons/svg/trash.svg'; 

  deleteButton.appendChild(trashIcon);
  deleteButton.classList.add('delete-button');
  deleteButton.addEventListener('click', function() {
    const row = this.closest('tr');
    row.remove(); 
  });

  deleteCell.appendChild(deleteButton);
  return deleteCell;
}

function createQuantityCell() {
  const quantityCell = document.createElement('td');
  quantityCell.classList.add('quantity-cell'); 

  const quantityValue = document.createElement('span');
  quantityValue.textContent = '1'; 
  quantityValue.classList.add('quantity-value');


  const decreaseButton = document.createElement('button');
  decreaseButton.textContent = '-';
  decreaseButton.classList.add('custom-decrease-button');
  decreaseButton.addEventListener('click', () => {
      let currentValue = parseInt(quantityValue.textContent);
      if (currentValue > 1) {
          quantityValue.textContent = (currentValue - 1).toString();
      }
  });
  quantityCell.appendChild(decreaseButton);
  quantityCell.appendChild(quantityValue);

  const increaseButton = document.createElement('button');
  increaseButton.textContent = '+';
  increaseButton.classList.add('custom-increase-button');
  increaseButton.addEventListener('click', () => {
      let currentValue = parseInt(quantityValue.textContent);
      quantityValue.textContent = (currentValue + 1).toString();
  });
  quantityCell.appendChild(increaseButton);

  return quantityCell;
}


// Hàm điền dữ liệu vào bảng
function fillTableWithData(data) {
  data.forEach(item => {
      const row = document.createElement('tr');

      // Tạo và điền các ô dữ liệu vào hàng
      const productNameCell = document.createElement('td');
      productNameCell.textContent = item.name;
      row.appendChild(productNameCell);

      const priceCell = document.createElement('td');
      priceCell.textContent = item.price_sell.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
      row.appendChild(priceCell);

      const quantityCell = createQuantityCell(); // Sử dụng hàm tạo cột số lượng
      row.appendChild(quantityCell);

      const totalCell = document.createElement('td');
      const total = (parseInt(quantityCell.firstChild.textContent) * item.price_sell) - item.price_sell; 
      totalCell.textContent = total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
      row.appendChild(totalCell);

      const deleteCell = createDeleteIcon(); // Thêm cột biểu tượng thùng rác
      row.appendChild(deleteCell);

      tableBody.appendChild(row);
  });
  applyColumnWidths();
}

const tableBody = document.getElementById('table-body');
function applyColumnWidths() {
  const headerColumns = document.querySelectorAll('.head-table th');

  // Lấy số lượng cột trong tiêu đề
  const numOfColumns = headerColumns.length;

  const dataRows = document.querySelectorAll('.product-table tbody tr');
  dataRows.forEach(row => {
    const dataColumns = row.querySelectorAll('td');

    dataColumns.forEach((column, index) => {
      const width = window.getComputedStyle(headerColumns[index]).width;
      column.style.minWidth = width; // Sử dụng minWidth để ô dữ liệu có độ rộng tối thiểu tương đương với cột tiêu đề
    });

    // Đặt độ rộng cho ô cuối cùng (nút xóa), nếu cần thiết
    const deleteCell = row.querySelector('.delete-button');
    if (deleteCell) {
      deleteCell.style.minWidth = window.getComputedStyle(headerColumns[numOfColumns - 1]).width;
    }
  });
}

// Gọi hàm applyColumnWidths sau khi dữ liệu đã được thêm vào bảng
fetch('data/products.json')
  .then(response => response.json())
  .then(data => {
      fillTableWithData(data);
      applyColumnWidths(); // Áp dụng kích thước cột sau khi thêm dữ liệu vào bảng
  })
  .catch(error => {
      console.error('Error fetching data:', error);
  });

//cart//
//checkout//

// })
document.addEventListener('DOMContentLoaded', function() {
  let data;
  function showCustomerAddresses() {
    var listAddresses = document.getElementById('listAddresses');
    listAddresses.innerHTML = '';

    fetch('data/receivers.json')
      .then(response => response.json())
      .then(data => {
        var isFirstDefaultAdded = false;

        data.slice(0, 4).forEach(function(customer, index) {
          var customerDiv = document.createElement('div');
          customerDiv.classList.add('customer-address');

          var namePara = document.createElement('p');
          namePara.classList.add('customer-info', 'customer-name');
          namePara.textContent = `${customer.name}`;

          var addressPara = document.createElement('p');
          addressPara.classList.add('customer-info', 'customer-address-text');
          addressPara.textContent = `${customer.address}`;

          var phonePara = document.createElement('p');
          phonePara.classList.add('customer-info', 'customer-phone');
          phonePara.textContent = `${customer.phone}`;

          var buttonContainer = document.createElement('div');
          buttonContainer.classList.add('button-on-address');

          var confirmButton = document.createElement('button');
          confirmButton.classList.add('confirmButton')
          confirmButton.textContent = 'Giao đến địa chỉ này';

          var defaultLabel = document.createElement('span');
          defaultLabel.classList.add('default-label');
          defaultLabel.textContent = 'Mặc định';
          if (customer.default && !isFirstDefaultAdded) {
            defaultLabel.style.color = 'lightblue';
            namePara.appendChild(defaultLabel);
            isFirstDefaultAdded = true;
          }

          var deleteButton = document.createElement('button');
          deleteButton.classList.add('deleteButton');
          deleteButton.textContent = 'Xóa';
          deleteButton.addEventListener('click', function() {
            var addressToDelete = this.closest('.customer-address');
            addressToDelete.remove();
          }); 

          buttonContainer.appendChild(deleteButton);
          buttonContainer.appendChild(confirmButton);
          customerDiv.appendChild(namePara);
          customerDiv.appendChild(addressPara);
          customerDiv.appendChild(phonePara);
          customerDiv.appendChild(buttonContainer);

          listAddresses.appendChild(customerDiv);
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  showCustomerAddresses();

});

document.addEventListener('DOMContentLoaded', function () {
  const checkoutAddress = document.getElementById('checkoutAddress');
  const checkoutPayment = document.getElementById('checkoutPayment');
  const checkoutSuccess = document.getElementById('checkoutSuccess');
  const mainbody = document.querySelector("#index-page");
  const bodyCheckout = document.querySelector("#checkoutPayment");
  const buttonBackMain = document.querySelector("#backHomePageButton");
  const continueShoppingButton = document.querySelector("#paymentSuccessButton");
  const backToAddressButton = document.getElementById('backButton');

  document.getElementById('listAddresses').addEventListener('click', function (event) {
    if (event.target.classList.contains('confirmButton')) {
      checkoutAddress.classList.add('hidden');
      checkoutPayment.classList.remove('hidden');
      document.querySelector('.step-two .step-circle').classList.add('step-circle-active');
    }
  });

  const paymentButton = document.getElementById('paymentButton');
  paymentButton.addEventListener('click', function() {
    checkoutPayment.classList.add('hidden');
    checkoutSuccess.classList.remove('hidden');
  });

  buttonBackMain.addEventListener('click', () =>{
    mainbody.classList.remove('hidden');
    bodyCheckout.classList.add('hidden');
    checkoutSuccess.classList.add('hidden'); 
  });

  continueShoppingButton.addEventListener('click', () => {
    mainbody.classList.remove('hidden');
    checkoutSuccess.classList.add('hidden'); 
  });
  backToAddressButton.addEventListener('click', function () {
    checkoutPayment.classList.add('hidden');
    checkoutAddress.classList.remove('hidden');
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const optionTransports = document.querySelectorAll('.option-transport');

  optionTransports.forEach(option => {
      option.addEventListener('click', function(event) {
          const radioBtn = option.querySelector('input[type="radio"]');
          if (!radioBtn.checked) {
              radioBtn.checked = true;
          }
      });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const optionTransports = document.querySelectorAll('.option-payment');

  optionTransports.forEach(option => {
      option.addEventListener('click', function(event) {
          const radioBtn = option.querySelector('input[type="radio"]');
          if (!radioBtn.checked) {
              radioBtn.checked = true;
          }
      });
  });
});





//checkout//




/*checkoutpayment*/
document.addEventListener('DOMContentLoaded', function() {
  const customRadios = document.querySelectorAll('.custom-radio');

  customRadios.forEach(customRadio => {
    customRadio.addEventListener('change', function() {
      const radioLabel = this.nextElementSibling.querySelector('label');
      if (this.checked) {
        radioLabel.style.backgroundColor = '#4CAF50'; 
      } else {
        radioLabel.style.backgroundColor = ''; 
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const listAddresses = document.getElementById('listAddresses');
  const contentAddress = document.getElementById('contentAddress');
  const editAddressButton = document.querySelector('.edit-address .edit-button');

  // Lấy danh sách các địa chỉ
  const addresses = listAddresses.querySelectorAll('.customer-address');

  // Kiểm tra xem danh sách có địa chỉ hay không và lấy địa chỉ đầu tiên
  if (addresses.length > 0) {
      const firstAddressData = addresses[0].innerHTML;

      // Gán dữ liệu vào contentAddress
      contentAddress.innerHTML = firstAddressData;

      // Thêm sự kiện khi click vào nút "Chỉnh sửa"
      editAddressButton.addEventListener('click', function() {
          // Hiển thị địa chỉ đầu tiên khi click vào nút "Chỉnh sửa"
          contentAddress.innerHTML = firstAddressData;
      });
  }
});



/*checkoutpayment*/
document.addEventListener('DOMContentLoaded', function () {
  const cartToCheckout = document.getElementById('cart-page');
  const checkoutAddress = document.getElementById('checkoutAddress');
  const checkoutPayment = document.getElementById('checkoutPayment');
  const checkoutSuccess = document.getElementById('checkoutSuccess');
  const mainbody = document.querySelector("#index-page");
  const bodyCheckout = document.querySelector("#checkoutPayment");
  const continueShoppingToCheckout = document.getElementById('paymentButton');
  const continueShoppingButton = document.querySelector("#paymentSuccessButton");
  const backToAddressButton = document.getElementById('backButton');
  const buttonBackMain = document.querySelector("#backHomePageButton");

  continueShoppingToCheckout.addEventListener('click', () => {
    cartToCheckout.classList.add('hidden');
    checkoutAddress.classList.remove('hidden');
  });

  document.getElementById('listAddresses').addEventListener('click', function (event) {
    if (event.target.classList.contains('confirmButton')) {
      checkoutAddress.classList.add('hidden');
      checkoutPayment.classList.remove('hidden');
      document.querySelector('.step-two .step-circle').classList.add('step-circle-active');
    }
  });

  const paymentButton = document.getElementById('paymentButton');
  paymentButton.addEventListener('click', function() {
    checkoutPayment.classList.add('hidden');
    checkoutSuccess.classList.remove('hidden');
  });

  buttonBackMain.addEventListener('click', () => {
    mainbody.classList.remove('hidden');
    bodyCheckout.classList.add('hidden');
    checkoutSuccess.classList.add('hidden');
    checkoutPayment.classList.add('hidden');
    checkoutAddress.classList.add('hidden');
    cartToCheckout.classList.remove('hidden');
  });

  continueShoppingButton.addEventListener('click', () => {
    mainbody.classList.remove('hidden');
    checkoutSuccess.classList.add('hidden');
    checkoutPayment.classList.add('hidden');
    checkoutAddress.classList.add('hidden');
    cartToCheckout.classList.remove('hidden');
  });

  backToAddressButton.addEventListener('click', () => {
    checkoutPayment.classList.add('hidden');
    checkoutAddress.classList.remove('hidden');
  });
});
