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
            
            const response = await fetch('http://localhost:5029/login', {
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