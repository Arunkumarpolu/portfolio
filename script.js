/*==================================================
LOADER
==================================================*/

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {

        loader.style.opacity = "0";
        loader.style.visibility = "hidden";

        setTimeout(() => {
            loader.remove();
        }, 500);

    }

});


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

    window.addEventListener("scroll", () => {

        const scrollTop = document.documentElement.scrollTop;

        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress = height > 0
            ? (scrollTop / height) * 100
            : 0;

        progressBar.style.width = progress + "%";

    });

}


/*==================================================
BACK TO TOP
==================================================*/

const topBtn = document.getElementById("backToTop");

if (topBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            topBtn.style.opacity = "1";
            topBtn.style.visibility = "visible";

        } else {

            topBtn.style.opacity = "0";
            topBtn.style.visibility = "hidden";

        }

    });


    topBtn.addEventListener("click", (e) => {

        e.preventDefault();

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


if (menuBtn && mobileMenu && overlay) {

    menuBtn.addEventListener("click", () => {

        mobileMenu.classList.add("active");
        overlay.classList.add("active");

    });

}


if (closeBtn && mobileMenu && overlay) {

    closeBtn.addEventListener("click", () => {

        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");

    });

}


if (overlay && mobileMenu) {

    overlay.addEventListener("click", () => {

        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");

    });

}


/*==================================================
ACTIVE MENU
==================================================*/

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");


if (sections.length && navLinks.length) {

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 120;
            const height = section.offsetHeight;

            if (window.pageYOffset >= top) {
                current = section.getAttribute("id");
            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }

        });

    });

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

            // Close mobile menu after clicking a link
            if (mobileMenu && overlay) {

                mobileMenu.classList.remove("active");
                overlay.classList.remove("active");

            }

        }

    });

});


/*==================================================
DARK MODE
==================================================*/

const themeToggle = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");


if (currentTheme === "light") {

    document.body.classList.add("light");

    if (themeToggle) {

        themeToggle.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    }

}


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light");

        const light =
            document.body.classList.contains("light");

        localStorage.setItem(
            "theme",
            light ? "light" : "dark"
        );

        themeToggle.innerHTML = light
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';

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

                    const bar = entry.target;


                    let value = "80%";


                    if (bar.classList.contains("technical")) {
                        value = "95%";
                    }

                    else if (bar.classList.contains("onpage")) {
                        value = "95%";
                    }

                    else if (bar.classList.contains("offpage")) {
                        value = "90%";
                    }

                    else if (bar.classList.contains("local")) {
                        value = "94%";
                    }

                    else if (bar.classList.contains("keyword")) {
                        value = "92%";
                    }

                    else if (bar.classList.contains("analytics")) {
                        value = "88%";
                    }


                    bar.style.width = value;

                    skillObserver.unobserve(bar);

                }

            });

        }, {
            threshold: 0.5
        });


    skillBars.forEach(bar => {

        bar.style.width = "0";

        skillObserver.observe(bar);

    });

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
PERFORMANCE
==================================================*/

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});


/*==================================================
KEYBOARD ACCESSIBILITY
==================================================*/

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        const mobileMenu =
            document.getElementById("mobile-menu");

        const overlay =
            document.querySelector(".menu-overlay");


        if (mobileMenu) {

            mobileMenu.classList.remove("active");

        }


        if (overlay) {

            overlay.classList.remove("active");

        }

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
