// DATA HANDLER
function IDGenerate() {
    // Lấy thời gian hiện tại
    var currentTime = new Date().getTime();
    // Tạo mã từ thời gian và lấy 6 ký tự cuối cùng
    var uniqueCode = currentTime.toString().slice(-6);
    return uniqueCode;
}

function getCurrentDate() {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    var formattedDate = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + year;
    return formattedDate;
}

function handleErrorPrdThumbnail(img){
    img.src = '..\\assets\\img\\product_placeholder.png';
}
function handleErrorAvatar(img){
    img.src = '..\\assets\\img\\avatar-placeholder.png';
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
const headerLogo = document.getElementById('header-logo');
const footerLogo = document.getElementById('footer-logo');
const headerTab1 = document.getElementById('header-tab-admin1');
const headerTab2 = document.getElementById('header-tab-admin2');
const headerTab3 = document.getElementById('header-tab-admin3');

const siteAnalysis = document.getElementById('analysis-page');
const siteInvoiceDetail = document.getElementById('invoice-detail-page');

headerLogo.addEventListener('click', () =>{
    resetNavbar();
    clearMainBody();
    siteAnalysis.classList.remove('hidden');
    headerTab1.classList.add('active');
})
footerLogo.addEventListener('click', () =>{
    resetNavbar();
    clearMainBody();
    siteAnalysis.classList.remove('hidden');
    headerTab1.classList.add('active');
})
headerTab1.addEventListener('click', () =>{
    if(!headerTab1.classList.contains('active')){
        resetNavbar();
        clearMainBody();
        headerTab1.classList.add('active');
        siteAnalysis.classList.remove('hidden');
    }
})

function resetNavbar(){
    const headerTabs = document.querySelectorAll('#header-admin .tab');
    for(let i = 0; i < headerTabs.length; i++){
        if(headerTabs[i].classList.contains('active'))
        headerTabs[i].classList.remove('active');
    }
}
function clearMainBody(){
    const sitesMainBody = document.querySelectorAll('[id$="-page"]');
    for(let i = 0; i < sitesMainBody.length; i++){
        sitesMainBody[i].classList.add('hidden');
    }
}
// SIDE NAVIGATE

// HEADER INTERFACE
const burgerBtn = document.getElementById('burger-btn')
const mobileNav = document.getElementById('mobile-nav')
const accountsName = document.querySelectorAll(".hello-account p")
const helloAccounts = document.querySelectorAll(".hello-account")
const headerAdminAvatar = document.querySelector('.header__avatar')
const accountPopover = document.querySelector('.account-popover')
const logoutButtons = document.querySelectorAll(".logout_button")
const navItems = document.querySelectorAll('.nav-item');
const headerAdmin = document.querySelector('#header-admin');
burgerBtn.addEventListener('click', function(){
    mobileNav.classList.toggle('collapsed');
});
headerAdminAvatar.addEventListener('click', function () {
    accountPopover.classList.toggle('collapsed');
});
let userLogin = JSON.parse(localStorage.getItem("currentAdminUser"));
if(userLogin) {
    for(let i = 0; i < accountsName.length; i++) {
        accountsName[i].textContent = userLogin.name;
    }
    for(let i = 0; i < logoutButtons.length; i++) {
        logoutButtons[i].addEventListener('click', function(){
            localStorage.removeItem("currentAdminUser");
            window.location.href = ".\\index.html";
        });
    }
} else{
    clearMainBody();
}

// HEADER INTERFACE

document.addEventListener("click", function (event) {
    // Kiểm tra xem người dùng có bấm ra ngoài popup mobileNav không
    if (!burgerBtn.contains(event.target) && !mobileNav.contains(event.target)) {
      mobileNav.classList.add("collapsed");
    }
    // Kiểm tra xem người dùng có bấm ra ngoài popup accPopover không
    if (!headerAdminAvatar.contains(event.target) && !accountPopover.contains(event.target)) {
      accountPopover.classList.add("collapsed");
    }
});

// STATISTICS
const invoiceRows = document.querySelectorAll(".invoice-table__cont tr");
for (let i = 0; i < invoiceRows.length; i++) {
    invoiceRows[i].addEventListener("click", function (event) {
        clearMainBody();
        siteInvoiceDetail.classList.remove('hidden');
    });
}
const breadcrumbsInvoiceDetails = document.querySelectorAll("#invoice-detail-page .breadcrumb__link");
breadcrumbsInvoiceDetails[0].addEventListener("click", function(){
    clearMainBody();
    siteAnalysis.classList.remove('hidden');
});
breadcrumbsInvoiceDetails[1].addEventListener("click", function(){
    clearMainBody();
    siteAnalysis.classList.remove('hidden');
});
// STATISTICS


