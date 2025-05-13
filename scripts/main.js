document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("menu");
    const sections = document.querySelectorAll("main h1, main h2");
    const navLinks = [];
    const h1Headers = document.querySelectorAll("main h1");
    const toggleButton = document.createElement("button");

    // Настраиваем кнопку для скрытия/показа меню
    toggleButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="menu-icon">
            <path d="M6 2C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V4C20 2.89543 19.1046 2 18 2H6Z" fill="#8B4513" />
            <path d="M8 6V16L11 13L14 16V6H8Z" fill="#FF0000" />
        </svg>
    `;
    toggleButton.classList.add("menu-toggle");
    document.body.appendChild(toggleButton);

    toggleButton.addEventListener("click", () => {
        menu.classList.toggle("hidden");
    });

    // Создаем меню
    let currentParentItem = null;

    sections.forEach((section) => {
        const tagName = section.tagName.toLowerCase();
        const id = section.id;
        const text = section.textContent;

        if (tagName === "h1") {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = `#${id}`;
            a.textContent = text;
            a.classList.add("nav-link", "h1-link");
            li.appendChild(a);

            const ul = document.createElement("ul");
            ul.classList.add("sub-menu");
            li.appendChild(ul);
            menu.appendChild(li);
            currentParentItem = li;
        } else if (tagName === "h2" && currentParentItem) {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = `#${id}`;
            a.textContent = text;
            a.classList.add("nav-link");
            li.appendChild(a);
            currentParentItem.querySelector(".sub-menu").appendChild(li);
        }

        navLinks.push({ id, link: document.querySelector(`a[href="#${id}"]`) });
    });

    function updateActiveLink() {
        let currentSection = null;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const nextSectionTop = index < sections.length - 1
                ? sections[index + 1].offsetTop
                : document.body.scrollHeight;

            const scrollPosition = window.scrollY + window.innerHeight / 2;

            if (scrollPosition >= sectionTop && scrollPosition < nextSectionTop) {
                currentSection = section;
            }
        });

        navLinks.forEach(({ id, link }) => {
            if (currentSection && id === currentSection.id && currentSection.tagName.toLowerCase() === "h2") {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });

        h1Headers.forEach((h1, index) => {
            const h1Top = h1.offsetTop;
            const nextH1Top = index < h1Headers.length - 1
                ? h1Headers[index + 1].offsetTop
                : document.body.scrollHeight;

            const isActive = window.scrollY >= h1Top && window.scrollY < nextH1Top;

            const h1Link = document.querySelector(`.nav-link[href="#${h1.id}"]`);
            const subMenu = h1Link.parentElement.querySelector(".sub-menu");

            if (isActive) {
                h1Link.classList.add("highlight");
                subMenu.classList.remove("collapsed");
            } else {
                h1Link.classList.remove("highlight");
                subMenu.classList.add("collapsed");
            }
        });

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