let scroll;
function locoAnime() {
    gsap.registerPlugin(ScrollTrigger);

    scroll = new LocomotiveScroll({
        el: document.querySelector("#wrapper"),
        smooth: true,
        multiplier: 0.8
    });

    scroll.on("scroll", ScrollTrigger.update)
    ScrollTrigger.scrollerProxy("#wrapper", {
        scrollTop(value) {
            return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            }
        },
        pinType: document.querySelector("#wrapper").style.transform ? "transform" : "fixed"
    })
    ScrollTrigger.addEventListener("refresh", () => scroll.update())
    ScrollTrigger.refresh()
};

function navbarScroll() {
    const navbar = document.querySelector('.navbar')
    let lastScroll = 0

    scroll.on('scroll', ({ scroll }) => {
        const currentScroll = scroll.y

        if (currentScroll > lastScroll && currentScroll > 150) {
            gsap.to(navbar, { y: '-100%', duration: 0.4, ease: 'power3.out' })
        } else if (currentScroll < lastScroll) {
            gsap.to(navbar, { y: '0%', duration: 0.4, ease: 'power3.out' })
        }

        lastScroll = currentScroll
    })
}

function themeToggle() {

    const toggle = document.querySelector(".theme-toggle")
    const html = document.documentElement
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
        html.setAttribute("data-theme", savedTheme)
    }

    toggle.addEventListener("click", () => {
        const current = html.getAttribute("data-theme")
        const newTheme = current === "dark" ? "light" : "dark"
        html.setAttribute("data-theme", newTheme)
        localStorage.setItem("theme", newTheme)
    })
}

function hamburgerMenu() {
    const navMenu = document.querySelector('.nav-menu')
    const navLinks = document.querySelector('.nav-links')
    const links = document.querySelectorAll('.nav-links li')

    navMenu.addEventListener('click', () => {
        navMenu.classList.toggle('menu-open')

        if (!navLinks.classList.contains('nav-open')) {

            navLinks.classList.add('nav-open')
            gsap.from(links, {
                y: 60,
                opacity: 0,
                duration: 0.6,
                ease: 'power3.out',
                stagger: 0.08,
                delay: 0.2
            })
        } else {

            navLinks.classList.add('nav-closing')
            setTimeout(() => {
                navLinks.classList.remove('nav-open')
                navLinks.classList.remove('nav-closing')
            }, 500)
        }
    })

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.add('nav-closing')
            navMenu.classList.remove('menu-open')
            setTimeout(() => {
                navLinks.classList.remove('nav-open')
                navLinks.classList.remove('nav-closing')
            }, 500)
        })
    })
}

function navbarAnime() {

    gsap.set(".navbar", {
        y: 100, opacity: 0
    })
    gsap.to(".navbar", {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: "power4.out",
        onComplete: () => {
            gsap.set(".navbar", {
                clearProps: "all"
            })
        }
    })
}

function heroAnime() {
    Splitting()
    const chars = document.querySelectorAll('.hero-heading .char')

    gsap.set(chars, { y: 120, opacity: 0 })
    gsap.set('.hero-tag', { y: 20, opacity: 0 })
    gsap.set('.hero-btn', { y: 20, opacity: 0 })

    gsap.to(chars, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5,
        stagger: 0.03,
    })

    gsap.to('.hero-tag', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.8,
    })

    gsap.to('.hero-btn', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1,
    })
}

function featuredAnime() {
    gsap.from('.featured-heading', {
        scrollTrigger: {
            trigger: '.featured',
            scroller: '#wrapper',
            start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    })

    gsap.from('.featured-card', {
        scrollTrigger: {
            trigger: '.featured-grid',
            scroller: '#wrapper',
            start: 'top 80%',
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15
    })
}

function lookbookAnime() {
    gsap.from('.lookbook-heading', {
        scrollTrigger: {
            trigger: '.lookbook',
            scroller: '#wrapper',
            start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    })

    new Swiper('.lookbook-swiper', {
        slidesPerView: 1.2,
        spaceBetween: 20,
        grabCursor: true,
        loop: true,
        pagination: {
            el: '.lookbook-pagination',
            clickable: true,
        },
        breakpoints: {
            480: {
                slidesPerView: 1.5,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2.5,
                spaceBetween: 24,
            },
            1024: {
                slidesPerView: 3.2,
                spaceBetween: 28,
            }
        }
    })
}

function lookbookAnime() {
    gsap.from(".lookbook-heading", {
        scrollTrigger: {
            trigger: ".lookbook",
            scroller: "#wrapper",
            start: "top 80%",
        },

        y: 60,
        duration: 1,
        ease: "power3.out",
    })

    gsap.from(".lookbook-card", {
        scrollTrigger: {
            trigger: ".lookbook-track",
            scroller: "#wrapper",
            start: "top 80%",
        },

        x: 80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
    })
}


function pageHeroAnime() {
    const pageHeroHeading = document.querySelector('.page-hero-heading')
    const pageHeroTag = document.querySelector('.page-hero-tag')

    if (!pageHeroHeading) return

    Splitting({ target: pageHeroHeading })

    const chars = pageHeroHeading.querySelectorAll('.char')

    gsap.set(chars, { y: 120, opacity: 0 })
    gsap.set(pageHeroTag, { y: 20, opacity: 0 })

    gsap.to(chars, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3,
        stagger: 0.03
    })

    gsap.to(pageHeroTag, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.6
    })
}

function aboutAnime() {
    if (!document.querySelector('.brand-story')) return

    gsap.from('.brand-story-heading', {
        scrollTrigger: {
            trigger: '.brand-story',
            scroller: '#wrapper',
            start: 'top 75%',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    })

    gsap.from('.brand-story-right p', {
        scrollTrigger: {
            trigger: '.brand-story-right',
            scroller: '#wrapper',
            start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2
    })

    gsap.from('.story-btn', {
        scrollTrigger: {
            trigger: '.brand-story-right',
            scroller: '#wrapper',
            start: 'top 75%',
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.4
    })

    gsap.to('.about-full-image img', {
        scrollTrigger: {
            trigger: '.about-full-image',
            scroller: '#wrapper',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        },
        y: -60,
        ease: 'none'
    })

    gsap.from('.mv-number', {
        scrollTrigger: {
            trigger: '.mission-vision',
            scroller: '#wrapper',
            start: 'top 75%',
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.2
    })

    gsap.from('.mv-card h3', {
        scrollTrigger: {
            trigger: '.mission-vision',
            scroller: '#wrapper',
            start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2,
        delay: 0.2
    })

    gsap.from('.mv-card p', {
        scrollTrigger: {
            trigger: '.mission-vision',
            scroller: '#wrapper',
            start: 'top 75%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2,
        delay: 0.4
    })
}

function servicesAnime() {
    if (!document.querySelector('.service-split')) return

    const serviceSplits = document.querySelectorAll('.service-split')

    serviceSplits.forEach((section) => {
        const content = section.querySelector('.service-split-content')
        const image = section.querySelector('.service-split-image')
        const isReverse = section.classList.contains('service-split-reverse')

        gsap.from(image, {
            scrollTrigger: {
                trigger: section,
                scroller: '#wrapper',
                start: 'top 70%',
            },
            x: isReverse ? 60 : -60,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out'
        })

        gsap.from(content.querySelector('.service-number'), {
            scrollTrigger: {
                trigger: section,
                scroller: '#wrapper',
                start: 'top 70%',
            },
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
            delay: 0.2
        })

        gsap.from(content.querySelector('.service-split-heading'), {
            scrollTrigger: {
                trigger: section,
                scroller: '#wrapper',
                start: 'top 70%',
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.3
        })

        gsap.from(content.querySelector('.service-split-text'), {
            scrollTrigger: {
                trigger: section,
                scroller: '#wrapper',
                start: 'top 70%',
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.4
        })

        gsap.from(content.querySelectorAll('.service-features li'), {
            scrollTrigger: {
                trigger: section,
                scroller: '#wrapper',
                start: 'top 70%',
            },
            x: -20,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.1,
            delay: 0.5
        })

        gsap.from(content.querySelector('.service-btn'), {
            scrollTrigger: {
                trigger: section,
                scroller: '#wrapper',
                start: 'top 70%',
            },
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
            delay: 0.7
        })
    })
}


function contactAnime() {
    if (!document.querySelector('.contact-section')) return

    gsap.from('.contact-heading', {
        scrollTrigger: {
            trigger: '.contact-section',
            scroller: '#wrapper',
            start: 'top 75%',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    })

    gsap.from('.contact-item', {
        scrollTrigger: {
            trigger: '.contact-details',
            scroller: '#wrapper',
            start: 'top 75%',
        },
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15
    })

    gsap.from('.contact-social-links a', {
        scrollTrigger: {
            trigger: '.social-icons',
            scroller: '#wrapper',
            start: 'top 80%',
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.1
    })

    gsap.from('.form-group', {
        scrollTrigger: {
            trigger: '.contact-form',
            scroller: '#wrapper',
            start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1
    })

    gsap.from('.form-btn', {
        scrollTrigger: {
            trigger: '.contact-form',
            scroller: '#wrapper',
            start: 'top 75%',
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.5
    })
}

Shery.mouseFollower({
    skewAmount: 5,
    ease: 'cubic-bezier(0.23, 1, 0.320, 1)',
    duration: 1
})

Shery.makeMagnet('.nav-logo, .hero-btn, .statement-btn, .service-btn, .story-btn', {
    ease: 'cubic-bezier(0.23, 1, 0.320, 1)',
    duration: 1
})


new Swiper('.lookbook-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    grabCursor: true,
    loop: true,
    freeMode: true,
    pagination: {
        el: '.lookbook-pagination',
        clickable: true,
    }
})


locoAnime();
navbarAnime();
themeToggle();
hamburgerMenu();
heroAnime();
pageHeroAnime();
featuredAnime();
statementAnime();
lookbookAnime();
aboutAnime();
servicesAnime();
contactAnime();
