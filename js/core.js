// Core functionality for the грузоперевозки website

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.main-nav') && !e.target.closest('.mobile-menu-toggle')) {
            mainNav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
});

// Modal functions
function openCallbackModal() {
    document.getElementById('callbackModal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}
        
function closeCallbackModal() {
    document.getElementById('callbackModal').style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
}
        
document.getElementById('callbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    
    // Basic validation
    if (!name || !phone) {
        alert('Пожалуйста, заполните все поля');
        return;
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
        alert('Пожалуйста, введите корректный номер телефона');
        return;
    }
    
    // Here you would typically send data to the server
    // For now, we'll just show a success message
    alert(`Спасибо, ${name}! Мы перезвоним вам по номеру ${phone} в ближайшее время.`);
    closeCallbackModal();
    
    // Reset form
    document.getElementById('callbackForm').reset();
});
        
// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('callbackModal');
    if (event.target == modal) {
        closeCallbackModal();
    }
}

// Email validation function
function checkEmail() {
    let email = document.querySelector('#emailField').value;
    
    if (!email) {
        alert('Пожалуйста, введите email адрес');
        return;
    }
    
    if (!email.includes('@')) {
        alert('Нет символа @ в email адресе');
        return;
    }
    
    if (!email.includes('.')) {
        alert('Нет символа . в email адресе');
        return;
    }
    
    // More comprehensive email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Пожалуйста, введите корректный email адрес');
        return;
    }
    
    alert('Спасибо! Мы свяжемся с вами по email в ближайшее время.');
    document.querySelector('#emailField').value = '';
}

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Добавьте эту функцию для обновления даты
function updateDiscountDate() {
    const now = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = now.toLocaleDateString('ru-RU', options);
    
    const discountElement = document.querySelector('.discount-text');
    if (discountElement) {
        discountElement.textContent = `СКИДКА НА ПЕРВЫЙ ЗАКАЗ - 20% (актуально на ${formattedDate})`;
    }
}

// Вызовите функцию при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    // ... существующий код ...
    
    // Обновляем дату в строке со скидкой
    updateDiscountDate();
    
    // ... остальной существующий код ...
});