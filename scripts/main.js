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
            a.classList.add("nav-link");
            li.appendChild(a);
            menu.appendChild(li);

            // Создаем подменю для h2
            const ul = document.createElement("ul");
            li.appendChild(ul);
            currentParentItem = ul;
        } else if (tagName === "h2" && currentParentItem) {
            // Добавляем элемент второго уровня в текущий h1
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = `#${id}`;
            a.textContent = text;
            a.classList.add("nav-link");
            li.appendChild(a);
            currentParentItem.appendChild(li);
        }

        // Сохраняем ссылки для дальнейшего выделения активного пункта
        navLinks.push({ id, link: document.querySelector(`a[href="#${id}"]`) });
    });

    // Обновляем активный пункт меню и подчеркивание H1
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
            if (currentSection && id === currentSection.id) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });

        // Подчеркивание для активного H1, если активен один из его H2
        h1Headers.forEach((h1, index) => {
            const h1Top = h1.offsetTop;
            const nextH1Top =
                index < h1Headers.length - 1
                    ? h1Headers[index + 1].offsetTop
                    : document.body.scrollHeight;

            // Проверяем, есть ли активный H2, принадлежащий текущему H1
            const hasActiveH2 = Array.from(sections).some((section) => {
                if (
                    section.tagName.toLowerCase() === "h2" &&
                    section.offsetTop >= h1Top &&
                    section.offsetTop < nextH1Top
                ) {
                    return (
                        window.scrollY + window.innerHeight / 2 >= section.offsetTop &&
                        window.scrollY + window.innerHeight / 2 < section.offsetTop + section.offsetHeight
                    );
                }
                return false;
            });

            if (hasActiveH2) {
                h1.classList.add("highlight");
            } else {
                h1.classList.remove("highlight");
            }
        });
    }

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();
});