document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("main h2[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    function updateActiveLink() {
        let currentSection = null;

        sections.forEach((section) => {
            const sectionTop = section.getBoundingClientRect().top;

            // Проверяем, если верх раздела находится выше середины экрана, но ниже верхней части
            if (sectionTop <= window.innerHeight / 2 && sectionTop >= -section.offsetHeight / 2) {
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

    // Запускаем обновление при прокрутке и загрузке
    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();
});