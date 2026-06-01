// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
const links = document.querySelectorAll('a, button, .magnetic, .menu-btn');

document.addEventListener('mousemove', (e) => {
    // Immediate cursor
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Follower cursor with slight delay
    follower.style.left = e.clientX + 'px';
    follower.style.top = e.clientY + 'px';
});

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        follower.classList.add('hover');
    });
    link.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        follower.classList.remove('hover');
    });
});

// Magnetic Buttons Effect
const magnetics = document.querySelectorAll('.magnetic');
magnetics.forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
        const position = btn.getBoundingClientRect();
        const x = e.pageX - position.left - position.width / 2;
        const y = e.pageY - position.top - position.height / 2;
        
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    btn.addEventListener('mouseout', function() {
        btn.style.transform = 'translate(0px, 0px)';
    });
});

// Overlay Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const overlayMenu = document.querySelector('.overlay-menu');
const hamburger = document.querySelector('.hamburger');
const menuLinks = document.querySelectorAll('.overlay-menu a');

menuBtn.addEventListener('click', () => {
    overlayMenu.classList.toggle('active');
    // Animate hamburger to X
    if (overlayMenu.classList.contains('active')) {
        hamburger.children[0].style.transform = 'translateY(4px) rotate(45deg)';
        hamburger.children[1].style.transform = 'translateY(-4px) rotate(-45deg)';
    } else {
        hamburger.children[0].style.transform = 'translateY(0) rotate(0)';
        hamburger.children[1].style.transform = 'translateY(0) rotate(0)';
    }
});

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        overlayMenu.classList.remove('active');
        hamburger.children[0].style.transform = 'translateY(0) rotate(0)';
        hamburger.children[1].style.transform = 'translateY(0) rotate(0)';
    });
});


// === GSAP Animations === //

// 1. Hero Reveal
const heroTl = gsap.timeline();
heroTl.to('.hero-bg', {
    scale: 1.05,
    duration: 2,
    ease: "power3.out"
})
.to('.hero-title span span', {
    y: '0%',
    duration: 1,
    stagger: 0.2,
    ease: "power4.out"
}, "-=1.5")
.to('.hero-subtitle', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out"
}, "-=0.8");

// Hero Parallax on Scroll
gsap.to('.hero-bg', {
    y: "30%",
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// 2. Text Reveal (About Section)
gsap.to('.reveal-text', {
    backgroundPositionX: '0%',
    ease: "none",
    scrollTrigger: {
        trigger: ".about",
        start: "top 70%",
        end: "bottom 80%",
        scrub: 1
    }
});

// 3 & 4. Horizontal Pinned Scroll (Expertise)
let mm = gsap.matchMedia();

mm.add("(min-width: 901px)", () => {
    let panels = gsap.utils.toArray(".horizontal-panel");
    let scrollTween = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: ".expertise-container",
            pin: true,
            scrub: 1,
            snap: 1 / (panels.length - 1),
            end: () => "+=" + document.querySelector(".expertise-container").offsetWidth
        }
    });

    // Add horizontal scroll parallax for panel backgrounds
    panels.forEach(panel => {
        const bg = panel.querySelector('.panel-bg');
        gsap.fromTo(bg, 
            { scale: 1.1, xPercent: -10 },
            { 
                scale: 1, 
                xPercent: 10,
                ease: "none",
                scrollTrigger: {
                    trigger: panel,
                    containerAnimation: scrollTween,
                    start: "left right",
                    end: "right left",
                    scrub: true
                }
            }
        );
    });
});

// 5. Gallery Image Parallax
const galleryItems = document.querySelectorAll('.parallax-img img');
galleryItems.forEach(img => {
    gsap.to(img, {
        y: "10%",
        ease: "none",
        scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
});

// 6. Panoramic Showcase Parallax & Text Fade-in
const panoramaItems = document.querySelectorAll('.panorama-item');
panoramaItems.forEach(item => {
    const bg = item.querySelector('.panorama-bg');
    const content = item.querySelector('.panorama-content');
    
    // Parallax background transition
    gsap.to(bg, {
        y: "20%",
        ease: "none",
        scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    // Content fade up reveal
    gsap.to(content, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: item,
            start: "top 75%",
            toggleActions: "play none none reverse"
        }
    });
});

// 7. Experiences Cards Reveal
const revealCards = document.querySelectorAll('.reveal-card');
revealCards.forEach(card => {
    gsap.fromTo(card, 
        { opacity: 0, y: 50 },
        { 
            opacity: 1, 
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        }
    );
});

// Form submission prevention (Demo)
document.querySelector('.premium-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button');
    btn.innerHTML = 'Message Sent <span>✓</span>';
    btn.style.background = '#e1c699';
    btn.style.color = '#020405';
});

