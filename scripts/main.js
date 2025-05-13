document.addEventListener("DOMContentLoaded", () => {
    // Получаем все заголовки h2
    const sections = document.querySelectorAll("main h2[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    // Функция для определения активного раздела
    function updateActiveLink() {
        let currentSection = null;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const nextSectionTop =
                index < sections.length - 1
                    ? sections[index + 1].offsetTop
                    : document.body.scrollHeight;

            // Позиция скролла
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            // Проверяем, находится ли пользователь между текущим и следующим заголовком
            if (scrollPosition >= sectionTop && scrollPosition < nextSectionTop) {
                currentSection = section;
            }
        });

        // Обновляем классы активных ссылок
        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (currentSection && link.getAttribute("href") === `#${currentSection.id}`) {
                link.classList.add("active");
            }
        });
    }

    // Добавляем обработчик прокрутки
    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink(); // Запуск при загрузке страницы
});