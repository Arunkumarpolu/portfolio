/*==================================================
STICKY HEADER
==================================================*/

const header = document.getElementById("header");

if (header) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });

}


/*==================================================
SCROLL PROGRESS BAR
==================================================*/

const progressBar = document.getElementById("progress-bar");

if (progressBar) {
    let documentHeight = 0;
    let scrollableHeight = 0;
    const updateScrollableHeight = () => {
        scrollableHeight = Math.max(0, documentHeight - window.innerHeight);
    };

    if ("ResizeObserver" in window) {
        const documentSizeObserver = new ResizeObserver(entries => {
            documentHeight = entries[0].contentRect.height;
            updateScrollableHeight();
        });

        documentSizeObserver.observe(document.body);
        window.addEventListener("resize", updateScrollableHeight, { passive: true });
    } else {
        const measureDocumentHeight = () => {
            documentHeight = document.documentElement.scrollHeight;
            updateScrollableHeight();
        };

        window.addEventListener("load", measureDocumentHeight, { once: true });
        window.addEventListener("resize", measureDocumentHeight, { passive: true });
    }

    window.addEventListener("scroll", () => {

        const scrollTop = document.documentElement.scrollTop;

        const progress = scrollableHeight > 0
            ? (scrollTop / scrollableHeight) * 100
            : 0;

        progressBar.style.transform = `scaleX(${progress / 100})`;

    }, { passive: true });

}


/*==================================================
BACK TO TOP
==================================================*/

const topBtn = document.getElementById("backToTop");

if (topBtn) {
    const updateBackToTopVisibility = () => {
        const isVisible = window.scrollY > 400;

        topBtn.classList.toggle("is-visible", isVisible);
        topBtn.setAttribute("aria-hidden", String(!isVisible));
        topBtn.tabIndex = isVisible ? 0 : -1;
    };

    updateBackToTopVisibility();
    window.addEventListener("scroll", updateBackToTopVisibility, { passive: true });
    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/*==================================================
MOBILE MENU
==================================================*/

const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const closeBtn = document.getElementById("close-menu");
const overlay = document.querySelector(".menu-overlay");

function closeMobileMenu(restoreFocus = false) {
    if (!mobileMenu) {
        return;
    }

    mobileMenu.classList.remove("active");
    mobileMenu.setAttribute("aria-hidden", "true");

    if (overlay) {
        overlay.classList.remove("active");
    }

    if (menuBtn) {
        menuBtn.setAttribute("aria-expanded", "false");
        if (restoreFocus) {
            menuBtn.focus();
        }
    }
}

if (mobileMenu) {
    mobileMenu.setAttribute("aria-hidden", "true");
}

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.add("active");
        mobileMenu.setAttribute("aria-hidden", "false");
        if (overlay) {
            overlay.classList.add("active");
        }
        menuBtn.setAttribute("aria-expanded", "true");

        if (closeBtn) {
            closeBtn.focus();
        }
    });

    mobileMenu.addEventListener("keydown", event => {
        if (event.key !== "Tab") {
            return;
        }

        const focusableElements = [
            ...mobileMenu.querySelectorAll(
                'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
        ].filter(element => element.getClientRects().length > 0);

        if (!focusableElements.length) {
            event.preventDefault();
            return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    });
}

if (closeBtn && mobileMenu) {
    closeBtn.addEventListener("click", () => {
        closeMobileMenu(true);
    });
}

if (overlay && mobileMenu) {
    overlay.addEventListener("click", () => {
        closeMobileMenu(true);
    });
}

window.addEventListener("resize", () => {
    if (window.innerWidth > 1200) {
        const focusWasInMenu =
            mobileMenu && mobileMenu.contains(document.activeElement);

        closeMobileMenu();

        if (focusWasInMenu) {
            const desktopNavLink =
                document.querySelector(".navbar a");

            const logo =
                document.querySelector(".logo");

            (desktopNavLink || logo)?.focus();
        }
    }
});


/*==================================================
ACTIVE MENU
==================================================*/

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');


if (sections.length && navLinks.length) {
    let sectionOffsets = [];

    const updateActiveLink = () => {
        if (!sectionOffsets.length) {
            return;
        }

        let current = "";

        for (const section of sectionOffsets) {
            if (window.scrollY >= section.top - 120) {
                current = section.id;
            } else {
                break;
            }
        }

        const currentHref = current ? `#${current}` : "";

        navLinks.forEach(link => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === currentHref
            );
        });
    };

    const updateSectionOffsets = () => {
        sectionOffsets = Array.from(sections, section => ({
            id: section.id,
            top: section.getBoundingClientRect().top + window.scrollY
        }));

        updateActiveLink();
    };

    window.addEventListener("load", updateSectionOffsets, { once: true });
    window.addEventListener("resize", updateSectionOffsets, { passive: true });
    window.addEventListener("scroll", updateActiveLink, { passive: true });

}


/*==================================================
SMOOTH SCROLL
==================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const targetId = this.getAttribute("href");

        // Ignore empty "#"
        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (target) {

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

            if (window.location.hash !== targetId) {
                window.history.pushState(null, "", targetId);
            }

            if (mobileMenu && mobileMenu.classList.contains("active")) {
                closeMobileMenu();
                target.setAttribute("tabindex", "-1");
                target.focus({ preventScroll: true });
            }

        }

    });

});


/*==================================================
DARK MODE
==================================================*/

const themeToggle = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");

function updateThemeToggleState(light) {
    themeToggle.setAttribute(
        "aria-label",
        light ? "Switch to dark mode" : "Switch to light mode"
    );
    themeToggle.setAttribute("aria-pressed", String(light));
}

if (currentTheme === "light") {

    document.body.classList.add("light");

    if (themeToggle) {

        themeToggle.innerHTML =
            '<i class="fa-solid fa-sun" aria-hidden="true"></i>';

    }

}


if (themeToggle) {
    updateThemeToggleState(document.body.classList.contains("light"));

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light");

        const light =
            document.body.classList.contains("light");

        localStorage.setItem(
            "theme",
            light ? "light" : "dark"
        );

        themeToggle.innerHTML = light
            ? '<i class="fa-solid fa-sun" aria-hidden="true"></i>'
            : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';
        updateThemeToggleState(light);

    });

}


/*==================================================
TYPING ANIMATION
==================================================*/

const typingElement =
    document.getElementById("typing-text");


const words = [

    "Technical SEO Specialist",
    "Programmatic SEO Specialist",
    "Local SEO Specialist",
    "SEO Automation Specialist"

];


let wordIndex = 0;
let charIndex = 0;
let deleting = false;


function typeEffect() {

    if (!typingElement || !words.length) {
        return;
    }


    const currentWord = words[wordIndex];


    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;


        if (charIndex === currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1800);

            return;

        }

    } else {

        typingElement.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;


        if (charIndex === 0) {

            deleting = false;

            wordIndex =
                (wordIndex + 1) % words.length;

        }

    }


    setTimeout(
        typeEffect,
        deleting ? 50 : 90
    );

}


typeEffect();


/*==================================================
COUNTER
==================================================*/

const counters =
    document.querySelectorAll(".counter");


if (counters.length && "IntersectionObserver" in window) {

    const counterObserver =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const counter = entry.target;

                    const target =
                        Number(counter.dataset.target);


                    if (!target) {
                        return;
                    }


                    let count = 0;

                    const speed =
                        target / 100;


                    const update = () => {

                        count += speed;


                        if (count < target) {

                            counter.innerText =
                                Math.ceil(count);

                            requestAnimationFrame(update);

                        } else {

                            counter.innerText =
                                target + "+";

                        }

                    };


                    update();

                    counterObserver.unobserve(counter);

                }

            });

        }, {
            threshold: 0.5
        });


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

}


/*==================================================
SKILL BAR ANIMATION
==================================================*/

const skillBars =
    document.querySelectorAll(".skill-progress");


if (skillBars.length && "IntersectionObserver" in window) {

    const skillObserver =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const bar = entry.target.querySelector(".skill-progress");

                    if (bar) {
                        bar.classList.add("is-visible");
                        skillObserver.unobserve(entry.target);
                    }

                }

            });

        }, {
            threshold: 0.5
        });


    skillBars.forEach(bar => {
        if (bar.parentElement) {
            skillObserver.observe(bar.parentElement);
        }
    });

} else {
    skillBars.forEach(bar => bar.classList.add("is-visible"));
}


/*==================================================
SCROLL REVEAL
==================================================*/

const revealElements =
    document.querySelectorAll(
        ".section-heading, .about-wrapper, .timeline-item, .skill-item, .tool-card, .service-card, .education-card, .contact-card"
    );


if (revealElements.length && "IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        }, {
            threshold: 0.15
        });


    revealElements.forEach(el => {

        el.classList.add("hidden-animation");

        revealObserver.observe(el);

    });

}


/*==================================================
TOAST NOTIFICATION
==================================================*/

function showToast(message, type) {

    const toast =
        document.createElement("div");


    toast.className =
        "toast " + type;


    toast.textContent = message;


    document.body.appendChild(toast);


    setTimeout(() => {

        toast.classList.add("show");

    }, 100);


    setTimeout(() => {

        toast.classList.remove("show");


        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 3000);

}


/*==================================================
IMAGE LAZY LOADING
==================================================*/

const lazyImages =
    document.querySelectorAll("img[data-src]");


if (lazyImages.length && "IntersectionObserver" in window) {

    const lazyObserver =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const img = entry.target;


                    img.src =
                        img.dataset.src;


                    img.removeAttribute(
                        "data-src"
                    );


                    lazyObserver.unobserve(img);

                }

            });

        });


    lazyImages.forEach(img => {

        lazyObserver.observe(img);

    });

}


/*==================================================
SEO SCORE ANIMATION
==================================================*/

const seoScore =
    document.querySelector(".seo-score-number");


if (seoScore) {

    let score = 0;

    const target = 100;


    const interval =
        setInterval(() => {

            score++;

            seoScore.textContent =
                score + "%";


            if (score >= target) {

                clearInterval(interval);

            }

        }, 20);

}


/*==================================================
KEYBOARD ACCESSIBILITY
==================================================*/

document.addEventListener("keydown", (e) => {

    if (
        e.key === "Escape" &&
        mobileMenu &&
        mobileMenu.classList.contains("active")
    ) {
        closeMobileMenu(true);
    }

});


/*==================================================
REDUCED MOTION
==================================================*/

const reduceMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (reduceMotion.matches) {

    document.documentElement.style.scrollBehavior =
        "auto";

}


/*==================================================
CONTACT FORM VALIDATION & SUBMISSION
==================================================*/

const contactForm =
    document.querySelector("#contactForm");


if (contactForm) {

    contactForm.addEventListener("submit", (e) => {

        const name =
            document.querySelector("#name");

        const email =
            document.querySelector("#email");

        const message =
            document.querySelector("#message");


        /*------------------------------------------
        Required Field Validation
        ------------------------------------------*/

        if (
            !name ||
            !email ||
            !message ||
            name.value.trim() === "" ||
            email.value.trim() === "" ||
            message.value.trim() === ""
        ) {

            e.preventDefault();

            showToast(
                "Please fill all required fields.",
                "error"
            );

            return;

        }


        /*------------------------------------------
        Email Validation
        ------------------------------------------*/

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailRegex.test(email.value.trim())) {

            e.preventDefault();

            showToast(
                "Please enter a valid email.",
                "error"
            );

            return;

        }


        /*------------------------------------------
        Show Sending Status
        ------------------------------------------*/

        const submitBtn =
            contactForm.querySelector(
                "button[type='submit']"
            );


        if (submitBtn) {

            submitBtn.disabled = true;

            submitBtn.textContent =
                "Sending...";

        }


        /*
        IMPORTANT:
        Do NOT show "Message sent successfully"
        here.

        Formspree handles the actual submission.
        */

    });

}
