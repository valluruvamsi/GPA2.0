const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
let uppass = [];
let inpass = [];
signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});
signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});
function upimg(element) {
    var Image = element.querySelector('img');
    if (Image) {
        if (Image.classList.contains('clicked')) {
            Image.classList.remove('clicked');
            uppass.splice(uppass.indexOf(element.id), 1);
        }
        else {
            Image.classList.add('clicked');
            uppass.push(element.id);
        }
    }
}
function inimg(element) {
    var Image = element.querySelector('img');
    if (Image) {
        if (Image.classList.contains('clicked')) {
            Image.classList.remove('clicked');
            inpass.splice(inpass.indexOf(element.id), 1);
        }
        else {
            Image.classList.add('clicked');
            inpass.push(element.id);
        }
    }
}
function signup() {
    var upmail = document.getElementById('upmail').value;

    if (upmail === '' || uppass.length === 0) {
        alert('Email and password cannot be empty');
    } else {
        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: upmail, password: uppass.join('') })
        }).then(response => response.json()).then(data => {
            if (data.message) {
                alert(data.message);
                sendMail2();
            }
            if (data.error) {
                console.error(data.error);
            }
        });
    }
}
function signin() {
    var inmail = document.getElementById('inmail').value;
    fetch('/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: inmail, password: inpass.join('') })
    }).then(response => response.json()).then(data => {
        if (data.message) {
            if (data.message === 'Signed in successfully') {
                alert(data.message);
                NewTab();
            }
            else {
                sendMail3();
                alert('Sign in was unsuccessful');
            }
        }
        if (data.error) {
            console.error(data.error);
        }
    });
}
function sendMail3() {
    var params = {
        to_email: document.getElementById('inmail').value,
        subject: 'Login Attempt Failed',
        message: 'Your login attempt has failed. Please check your credentials.'
    };
    emailjs.send('service_7yx9dmh', 'template_u3lfpmc', params)
        .then(function(res) {
            alert("Mail sent successfully");
        }, function(error) {
            console.log("Error sending mail:", error);
        });
}
function sendMail2() {
    var params = {
        to_email: document.getElementById('upmail').value,
        subject: 'Account Created Successfully',
        message: 'Your account has been created successfully. Welcome to our platform!'
    };
    emailjs.send('service_7yx9dmh', 'template_u3lfpmc', params)
        .then(function(res) {
            alert("Mail sent successfully");
        }, function(error) {
            console.log("Error sending mail:", error);
        });
}
function NewTab() {
    window.open(
      "https://mlrit.ac.in/", "_blank");
}