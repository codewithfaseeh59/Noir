
const pageTexts = {
    'index.html': 'Welcome to Noir',
    '': 'Welcome to Noir',
    'collections.html': "Welcome to Noir's Collection",
    'about.html': "Welcome to Noir's Story",
    'services.html': "Welcome to Noir's Services",
    'contact.html': "Welcome to Noir's World"
}

function showLoader() {
    const loader = document.querySelector('.loader')
    const loaderText = document.querySelector('.loader-text')
    const loaderBrand = document.querySelector('.loader-brand')
    const svgPath = document.querySelector('.loader-svg path')

    // Current page detect karo
    const pageName = window.location.pathname.split('/').pop()
    const text = pageTexts[pageName] || 'Welcome to Noir'
    loaderText.textContent = text

    gsap.set(loader, { display: 'flex', opacity: 1 })
    gsap.set(loaderBrand, { y: 20, opacity: 0 })
    gsap.set(loaderText, { y: 10, opacity: 0 })

    svgPath.style.strokeDasharray = '7571'
    svgPath.style.strokeDashoffset = '7571'
    svgPath.style.fill = 'none'
    svgPath.style.stroke = '#c9a96e'
    svgPath.style.strokeWidth = '12'

    const tl = gsap.timeline({
        onComplete: () => hideLoader()
    })

    tl.to(svgPath, {
        strokeDashoffset: 0,
        duration: 3.5,
        ease: 'power1.inOut'
    })
    .to(svgPath, {
        fill: '#c9a96e',
        stroke: 'transparent',
        duration: 0.6,
        ease: 'power2.out'
    })
    .to(loaderBrand, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3
    })
    .to(loaderText, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
    }, '+=0.1')
    .to({}, { duration: 1 })
}

function hideLoader() {
    const loader = document.querySelector('.loader')

    gsap.to(loader, {
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        onComplete: () => {
            gsap.set(loader, { display: 'none' })
        }
    })
}

window.addEventListener('load', () => {
    showLoader()
})