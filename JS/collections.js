function filterAnime() {
    const filterBtns = document.querySelectorAll(".filter-btn")
    const cards = document.querySelectorAll(".collection-card")

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {

            filterBtns.forEach(b => b.classList.remove("active"))
            btn.classList.add("active")

            const filter = btn.getAttribute("data-filter")

            cards.forEach(card => {
                if (filter === "all" || card.getAttribute("data-category") === filter) {
                    gsap.to(card, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.4,
                        ease: "power3.out",
                        display: "block"
                    })
                } else {
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.95,
                        duration: 0.4,
                        ease: "power3.out",
                        onComplete: () => {
                            card.style.display = "none"
                        }
                    })
                }
            })
        })
    })
}

function searchAnime() {
    const searchInput = document.querySelector('.search-bar input')
    const cards = document.querySelectorAll('.collection-card')

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase()

        cards.forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase()

            if (name.includes(query)) {
                gsap.to(card, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.4,
                    ease: 'power3.out',
                    display: 'block'
                })
            } else {
                gsap.to(card, {
                    opacity: 0,
                    scale: 0.95,
                    duration: 0.4,
                    ease: 'power3.out',
                    onComplete: () => {
                        card.style.display = 'none'
                    }
                })
            }
        })
    })
}

function sortAnime() {
    const sortSelect = document.querySelector('.sort-select select')
    const grid = document.querySelector('.collections-grid')
    const cards = document.querySelectorAll('.collection-card')

    sortSelect.addEventListener('change', () => {
        const value = sortSelect.value
        const cardsArr = [...cards]

        cardsArr.sort((a, b) => {
            const priceA = parseInt(a.querySelector('span').textContent.replace('$', ''))
            const priceB = parseInt(b.querySelector('span').textContent.replace('$', ''))

            if (value === 'low-high') return priceA - priceB
            if (value === 'high-low') return priceB - priceA
            return 0
        })

        gsap.to(cards, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            ease: 'power3.out',
            onComplete: () => {
                cardsArr.forEach(card => grid.appendChild(card))

                gsap.to(cards, {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: 'power3.out',
                    stagger: 0.05
                })
            }
        })
    })
}

function collectionsAnime() {
    gsap.from('.page-hero-heading', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3
    })

    gsap.from('.page-hero-tag', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.5
    })

    gsap.from('.collection-card', {
        scrollTrigger: {
            trigger: '.collections-grid',
            scroller: '#wrapper',
            start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1
    })
}

filterAnime();
searchAnime();
sortAnime();
collectionsAnime();