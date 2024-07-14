const header = document.querySelector('header');
        const section1 = document.getElementById('sec-one');
    
        window.addEventListener('scroll', () => {
            const section1Bottom = section1.getBoundingClientRect().bottom-200;
        
            if (section1Bottom < 0) {
                header.style.background = '#191A19';
            } else {
                header.style.background = 'linear-gradient(to bottom, black, transparent)';
            }
        });
        function scrollToSection(event, sectionId) {
            event.preventDefault();
            const section = document.getElementById(sectionId);
            const offset = -180;
            const bodyRect = document.body.getBoundingClientRect().top;
            const sectionRect = section.getBoundingClientRect().top;
            const sectionPosition = sectionRect - bodyRect;
            const offsetPosition = sectionPosition + offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        const shopLinks = document.querySelectorAll('.click-shop');
        shopLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const targetId = this.dataset.target;
                document.getElementById(targetId).style.padding = '30px';
                setTimeout(() =>{
                    document.getElementById(targetId).style.padding = '20px';
                },150);
                
            });
        });



        // login page
        document.addEventListener('DOMContentLoaded', () => {
            const loginButton = document.getElementById('loginButton');
            const modal = document.getElementById('loginModal');
            const closeButton = document.querySelector('.close');
            const mainPage = document.getElementById('mainPage');

            loginButton.onclick = () => {
                modal.style.display = 'block';
                mainPage.classList.add('blur');
            };

            closeButton.onclick = () => {
                modal.style.display = 'none';
                mainPage.classList.remove('blur');
            };

            window.onclick = (event) => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                    mainPage.classList.remove('blur');
                }
            };
        });

        //email confirm window
        document.addEventListener('DOMContentLoaded', () => {

        })


        // register page
        document.addEventListener('DOMContentLoaded', () => {
            const registerButton = document.getElementById('registerButton');
            const modal = document.getElementById('registerModal');
            const closeButton = document.querySelector('.close-register');
            const mainPage = document.getElementById('mainPage');

            registerButton.onclick = () => {
                modal.style.display = 'block';
                mainPage.classList.add('blur');
            };

            closeButton.onclick = () => {
                modal.style.display = 'none';
                mainPage.classList.remove('blur');
            };

            window.onclick = (event) => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                    mainPage.classList.remove('blur');
                }
            };
        });
        async function submitLoginForm(event) {
            event.preventDefault();
            
            const form = event.target;
            const formData = new FormData(form);
            
            const response = await fetch('http://0.0.0.0:8080/login', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                window.location.href = 'loged-in.html';
            } else {
                alert('Login failed');
            }
        }


        // burgerbar function

        document.addEventListener('DOMContentLoaded', function () {
            const burgerBar = document.getElementById('navBars');
            const navigation = document.querySelector('.header-right .navigation');
            const navLinks = document.querySelectorAll('.header-right .navigation ul li a');

        
            burgerBar.addEventListener('click', function () {
                navigation.classList.toggle('active');
            });
            navLinks.forEach(link => {
                link.addEventListener('click', function () {
                    navigation.classList.remove('active');
                });
            });
        });


        // document.getElementById('registerForm').addEventListener('submit', function(event) {
        //     event.preventDefault(); // Prevent the form from submitting the traditional way

        //     const formData = new FormData(this);

        //     fetch('http://176.221.151.167:8080/register', {
        //         method: 'POST',
        //         body: formData,
        //     })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data);
        //         // You can display a success message or handle the response as needed
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //         // You can display an error message or handle the error as needed
        //     });
        // });





        // document.getElementById('registrationForm').addEventListener('submit', async function(event) {
        //     event.preventDefault();

        //     const name = document.getElementById('fullName').value;
        //     const phone = document.getElementById('phone').value;
        //     const email = document.getElementById('emailRegister').value;
        //     const password = document.getElementById('passwordRegister').value;

        //     const response = await fetch('http://0.0.0.0:8080/api/v1/', {
        //         method: 'HTTPPOST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({ fullName, phoneNumber, email, password })
        //     });

        //     const result = await response.json();
        //     if (response.ok) {
        //         alert('Registration successful: ' + result.message);
        //     } else {
        //         alert('Registration failed: ' + result.message);
        //     }
        // });



        document.getElementById('registrationForm').addEventListener('submit', async function (event) {
            event.preventDefault();
            const modal = document.getElementById('registerModal');

            const confirm = document.getElementById("confirmation");

            const form = event.target;
            const formData = new FormData(form);
        
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData
                });
        
                if (response.ok) {
                    const data = await response.json();
                    modal.style.display = "none";
                    confirm.style.display = "block";
                    
                } else {
                    const errorData = await response.json();
                    alert("Registration failed: " + errorData.message);
                }
            } catch (error) {
                alert("An unexpected error occurred. Please try again.");
            }
        });
        