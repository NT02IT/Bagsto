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

function checkInput(input) {
    input.CustomValidation.invalidities = [];
    input.CustomValidation.checkValidity(input);
}
//----------------------------------------------------------------
// VALIDATION
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
function clearMainBody(){
    const sitesMainBody = document.querySelectorAll('[id$="-page"]');
    for(let i = 0; i < sitesMainBody.length; i++){
        sitesMainBody[i].classList.add('hidden');
    }
}

var analysisPage = document.getElementById('analysis-page');
const accountsName = document.querySelectorAll(".hello-account p");
// Check exist and login
usersList = JSON.parse(localStorage.getItem('users'))
let userLogin = JSON.parse(localStorage.getItem("currentAdminUser"));
if(userLogin){
    window.location.href = ".\\admin.html";
}
signinSubmit.addEventListener("click", () => {
    console.log(usersList);
    const user = usersList.find((user) => ((user.email == signinEmailInput.value && user.password == signinPasswordInput.value && user.role == "admin") ? user : null));
    if (user) {
        // clearMainBody();
        // analysisPage.classList.remove('hidden');
        localStorage.setItem("currentAdminUser",JSON.stringify(user));

        for(let i = 0; i < accountsName.length; i++) {
            accountsName[i].textContent = user.name;
        }
        window.location.href = "./admin.html";
    }
    else {
        alert("Không có tài khoản")
    }
});