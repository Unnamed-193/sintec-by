   document.addEventListener('DOMContentLoaded', function() {
            const accordionButtons = document.querySelectorAll('.accordion__button');
            
            accordionButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const item = this.parentElement;
                    const content = this.nextElementSibling;
                    
                    // Закрываем все открытые элементы
                    document.querySelectorAll('.accordion__item.active').forEach(activeItem => {
                        if (activeItem !== item) {
                            activeItem.classList.remove('active');
                            activeItem.querySelector('.accordion__content').style.maxHeight = '0';
                        }
                    });
                    
                    // Переключаем текущий элемент
                    item.classList.toggle('active');
                    
                    if (item.classList.contains('active')) {
                        content.style.maxHeight = content.scrollHeight + 'px';
                    } else {
                        content.style.maxHeight = '0';
                    }
                });
            });
        });