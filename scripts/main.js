document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("menu");
    const sections = document.querySelectorAll("main h1, main h2");
    const navLinks = [];
    const h1Headers = document.querySelectorAll("main h1");

    // Создаем меню
    let currentParentItem = null;

    sections.forEach((section) => {
        const tagName = section.tagName.toLowerCase();
        const id = section.id;
        const text = section.textContent;

        if (tagName === "h1") {
            // Создаем элемент первого уровня для h1
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = `#${id}`;
            a.textContent = text;
            a.classList.add("nav-link", "h1-link");
            li.appendChild(a);

            // Создаем подменю для h2
            const ul = document.createElement("ul");
            ul.classList.add("sub-menu");
            li.appendChild(ul);
            menu.appendChild(li);
            currentParentItem = li; // Запоминаем текущий пункт родителя
        } else if (tagName === "h2" && currentParentItem) {
            // Добавляем элемент второго уровня в текущий h1
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = `#${id}`;
            a.textContent = text;
            a.classList.add("nav-link");
            li.appendChild(a);
            currentParentItem.querySelector(".sub-menu").appendChild(li);
        }

        // Сохраняем ссылки для дальнейшего выделения активного пункта
        navLinks.push({ id, link: document.querySelector(`a[href="#${id}"]`) });
    });

    // Обновляем активный пункт меню и подчеркивание H1 в меню
    function updateActiveLink() {
        let currentSection = null;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const nextSectionTop =
                index < sections.length - 1
                    ? sections[index + 1].offsetTop
                    : document.body.scrollHeight;

            const scrollPosition = window.scrollY + window.innerHeight / 2;

            if (scrollPosition >= sectionTop && scrollPosition < nextSectionTop) {
                currentSection = section;
            }
        });

        navLinks.forEach(({ id, link }) => {
            if (currentSection && id === currentSection.id && "h2" === currentSection.tagName.toLowerCase()) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });

        // Подчеркивание для активного H1 в меню и управление видимостью H2
        h1Headers.forEach((h1, index) => {
            const h1Top = h1.offsetTop;
            const nextH1Top =
                index < h1Headers.length - 1
                    ? h1Headers[index + 1].offsetTop
                    : document.body.scrollHeight;

            // Проверяем, находится ли экран в пределах контента H1
            const isActive = window.scrollY + window.innerHeight / 2 >= h1Top &&
                window.scrollY < nextH1Top;

            // Выделяем пункт меню H1
            const h1Link = document.querySelector(`.nav-link[href="#${h1.id}"]`);
            const subMenu = h1Link.parentElement.querySelector(".sub-menu");

            if (isActive) {
                h1Link.classList.add("highlight");
                subMenu.classList.remove("collapsed"); // Показываем вложенные H2
            } else {
                h1Link.classList.remove("highlight");
                subMenu.classList.add("collapsed"); // Скрываем вложенные H2
            }
        });

        // Гарантируем, что только один заголовок H1 выделен
        const highlightedLinks = document.querySelectorAll(".h1-link.highlight");
        if (highlightedLinks.length > 1) {
            highlightedLinks.forEach((link, index) => {
                if (index > 0) link.classList.remove("highlight");
            });
        }
    }

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();
});