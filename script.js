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

// 8. Global Footprint Metrics Dashboard ScrollTrigger Count-up Animation
const footprintDashboard = document.querySelector('.footprint-dashboard');
if (footprintDashboard) {
    const metricNumbers = document.querySelectorAll('.metric-number');
    metricNumbers.forEach(metric => {
        const targetVal = parseInt(metric.getAttribute('data-target'), 10);
        const obj = { value: 0 };
        gsap.to(obj, {
            value: targetVal,
            duration: 2.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: footprintDashboard,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            onUpdate: function() {
                let currentVal = Math.floor(obj.value);
                if (targetVal === 100) {
                    metric.textContent = currentVal + '%';
                } else if (targetVal === 3668 || targetVal === 3738) {
                    metric.textContent = currentVal.toLocaleString();
                } else {
                    metric.textContent = currentVal;
                }
            },
            onComplete: function() {
                if (targetVal === 100) {
                    metric.textContent = targetVal + '%';
                } else if (targetVal === 3668 || targetVal === 3738) {
                    metric.textContent = targetVal.toLocaleString();
                } else {
                    metric.textContent = targetVal;
                }
            }
        });
    });
}

// 9. Interactive B2B Outreach Email Simulator
const outreachData = {
    resorts: [
        {
            name: "Belmond Hotel Cipriani (Italy)",
            contact: "Roberto Baccari",
            email: "roberto.baccari@belmond.com",
            subject: "Brand Collaboration: Cinematic Visual Campaign for Belmond Hotel Cipriani",
            focus: "the timeless romance, floating gardens, private lagoon excursions, and heritage suites of Hotel Cipriani",
            support: "complimentary luxury suite accommodations for our 2-person production crew",
            location: "Venice, Italy",
            month: "September"
        },
        {
            name: "Six Senses Ibiza (Spain)",
            contact: "Roy Aloni",
            email: "roy.aloni@sixsenses.com",
            subject: "Partnership Proposal: Quiet Luxury and Wellness Campaign for Six Senses Ibiza",
            focus: "the sustainable luxury, cliff-side sunset decks, organic farms, and holistic wellness programs of Six Senses Ibiza",
            support: "comped cave suite stay for 3 nights during our target shoot",
            location: "Ibiza, Spain",
            month: "July"
        },
        {
            name: "La Réserve Ramatuelle (France)",
            contact: "Eric Boonstoppel",
            email: "e.boonstoppel@lareserve-ramatuelle.com",
            subject: "Partnership Proposal: Quiet Luxury and Architecture Showcase for La Réserve",
            focus: "the mid-century mineral architecture, secluded pine retreats, and Mediterranean horizons of La Réserve Ramatuelle",
            support: "complimentary villa stay during our Saint-Tropez production dates",
            location: "Saint-Tropez, France",
            month: "August"
        }
    ],
    aviation: [
        {
            name: "La Compagnie (France)",
            contact: "Christian Vernet",
            email: "c.vernet@lacompagnie.com",
            subject: "Partnership Proposal: Sky-Dining and Cabin Storytelling for La Compagnie",
            focus: "the boutique all-business-class cabin, fine French sky-dining, and exclusive airport lounge amenities of La Compagnie",
            support: "sponsored round-trip business transits between Paris and New York",
            location: "Paris - New York route",
            month: "October"
        },
        {
            name: "ITA Airways (Italy)",
            contact: "Fabio Lazzerini",
            email: "f.lazzerini@ita-airways.com",
            subject: "Brand Collaboration: Cinematic Business Class Experience on ITA Airways",
            focus: "the refined Italian cabin comfort, authentic regional dining, and seamless long-haul service of ITA Airways",
            support: "sponsored flight coverage between Rome and Tokyo for our creative team",
            location: "Rome - Tokyo route",
            month: "November"
        }
    ],
    rail: [
        {
            name: "Belmond Royal Scotsman (UK)",
            contact: "Gary Franklin",
            email: "gary.franklin@belmond.com",
            subject: "Brand Collaboration: Cinematic Heritage Campaign for Belmond Royal Scotsman",
            focus: "the Edwardian mahogany design, vintage cabin quarters, gourmet dining carriage, and moving Highland scenery of the Royal Scotsman",
            support: "complimentary state cabin for 3 nights during our target Scottish journey",
            location: "Scottish Highlands",
            month: "July"
        },
        {
            name: "Seven Stars in Kyushu (Japan)",
            contact: "Koji Karaike",
            email: "k.karaike@jrkyushu.co.jp",
            subject: "Brand Collaboration: Cinematic Journey on Seven Stars in Kyushu",
            focus: "the bespoke wood craftsmanship, fusion of Japanese and Western design, and panoramic view cars of Seven Stars",
            support: "complimentary suite accommodation on the 4-day Kyushu loop",
            location: "Kyushu, Japan",
            month: "October"
        }
    ],
    sponsors: [
        {
            name: "Leica Camera (Germany)",
            contact: "Stephan Schulz",
            email: "stephan.schulz@leica-camera.com",
            subject: "Sponsorship Proposal: Cinematic Travel Documentary powered by Leica",
            focus: "the ultimate optical precision, monochrome rendering heritage, and timeless magnesium craftsmanship of Leica gear",
            support: "sponsorship backing and production kit loan of the new Leica SL3 system",
            location: "Global Production",
            month: "Ongoing"
        },
        {
            name: "Rimowa (Germany)",
            contact: "Hugues Bonnet-Masimbert",
            email: "h.bonnet@rimowa.com",
            subject: "Brand Collaboration: Sleek Travel Campaign with Rimowa Classic Cabin",
            focus: "the iconic grooved aluminum design, flawless high-impact durability, and seamless travel lifestyle of Rimowa cases",
            support: "sponsorship funding and full gear transit case backing",
            location: "Global Production",
            month: "Ongoing"
        }
    ]
};

const sectorSelect = document.getElementById('sector-select');
const brandSelect = document.getElementById('brand-select');
const emailTo = document.getElementById('email-to');
const emailSubject = document.getElementById('email-subject');
const emailBody = document.getElementById('email-body');

function populateBrands(sector) {
    if (!brandSelect) return;
    brandSelect.innerHTML = '';
    const brands = outreachData[sector];
    brands.forEach((brand, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = brand.name;
        brandSelect.appendChild(option);
    });
    updateEmailContent(brands[0], sector);
}

function updateEmailContent(brand, sector) {
    if (!brand || !emailTo || !emailSubject || !emailBody) return;
    
    emailTo.textContent = brand.email;
    
    let subject = "";
    let body = "";
    const portfolioLink = "https://anextvid-boop.github.io/sayyah-byond-travel/";
    const linkNote = "(please note this temporary staging site uses visual placeholders which we will immediately update with the custom visual assets we produce with you)";
    
    if (sector === "sponsors") {
        subject = `Sponsorship Proposal: Cinematic Travel Documentary powered by ${brand.name.split(" (")[0]}`;
        body = `Dear ${brand.contact.split(" ")[0]},
 
My name is Jahroinimo, Lead Director of sayyah-byond-travel (${portfolioLink}) — a new specialized luxury travel media agency backed by my established production company ANEXTVID (www.anextvid.com) and my personal photography portfolio (https://anextvid-boop.github.io/anextvid-landing/). To get the ball rolling, we are looking for brand sponsors to support my one-person production crew with ${brand.support} in exchange for custom, high-end cinematic assets.
 
Specifically, we want to deliver a bespoke package of vertical social Reels, professional product and detail photography, and commercial B-roll highlighting ${brand.focus}. You can preview our specialized travel layout on our staging site here: ${portfolioLink} ${linkNote}.
 
To get our production moving, we are actively looking for sponsorships to cover our travel costs. Let us know what you might be able to support with as far as brand gear sponsorships, travel expenses, and a production stipend or funding backing. While we are highly flexible with our visual packages, securing brand sponsorships and travel finance support is essential to offset the high costs of traveling and crew expenses on the road.
 
Could you let us know who is the best person to discuss sponsorships and travel support with, and what you would need from a creator standpoint to get started?
 
With warm regards,
 
Jahroinimo
Lead Director, sayyah-byond-travel & ANEXTVID
sayyah-byond-travel Staging: ${portfolioLink}
Photography Portfolio: https://anextvid-boop.github.io/anextvid-landing/
anextvid@gmail.com | www.anextvid.com`;
    } else if (sector === "rail" || sector === "resorts") {
        let brandName = brand.name.split(" (")[0];
        if (sector === "rail") {
            subject = `Transit Partnership / sponsorship? ${brandName} x sayyah-byond-travel`;
        } else {
            subject = `Visual Partnership / accommodation support? ${brandName} x sayyah-byond-travel`;
        }
        
        body = `Dear ${brand.contact.split(" ")[0]},
 
My name is Jahroinimo, Lead Director of sayyah-byond-travel (${portfolioLink}) — a new specialized luxury travel media agency backed by my established production company ANEXTVID (www.anextvid.com) and my personal photography portfolio (https://anextvid-boop.github.io/anextvid-landing/). To get the ball rolling and establish our footprint, we are seeking premier partners to host my one-person production crew at ${brandName} in exchange for custom, high-end cinematic assets.
 
Specifically, we want to deliver a bespoke package of vertical social Reels and high-resolution commercial photography highlighting ${brand.focus}. You can preview our specialized travel layout on our staging site here: ${portfolioLink} ${linkNote}.
 
To get our production moving, we are actively looking for sponsorships to cover our travel costs. Let us know what you might be able to support with as far as hosted stay coverage, travel expenses, and a production stipend or funding backing. While we are highly flexible with our visual packages, securing stay sponsorships and travel finance support is essential to offset the high costs of traveling and crew expenses on the road.
 
Could you let us know who is the best person to discuss sponsorships and travel support with, and what you would need from a creator standpoint to get started?
 
With warm regards,
 
Jahroinimo
Lead Director, sayyah-byond-travel & ANEXTVID
sayyah-byond-travel Staging: ${portfolioLink}
Photography Portfolio: https://anextvid-boop.github.io/anextvid-landing/
anextvid@gmail.com | www.anextvid.com`;
    } else {
        // aviation
        subject = `Flight Partnership / sponsorship? ${brand.name.split(" (")[0]} x sayyah-byond-travel`;
        body = `Dear ${brand.contact.split(" ")[0]},
 
My name is Jahroinimo, Lead Director of sayyah-byond-travel (${portfolioLink}) — a new specialized luxury travel media agency backed by my established production company ANEXTVID (www.anextvid.com) and my personal photography portfolio (https://anextvid-boop.github.io/anextvid-landing/). To get the ball rolling, we are looking for flight sponsors to host my one-person production crew on your ${brand.location} routes in exchange for custom, high-end cinematic assets.
 
Specifically, we want to deliver a bespoke package of vertical social Reels and high-resolution commercial photography highlighting ${brand.focus}. You can preview our specialized travel layout on our staging site here: ${portfolioLink} ${linkNote}.
 
To get our production moving, we are actively looking for sponsorships to cover our travel costs. Let us know what you might be able to support with as far as flight coverage, travel expenses, and a production stipend or funding backing. While we are highly flexible with our visual packages, securing flight sponsorships and travel finance support is essential to offset the high costs of traveling and crew expenses on the road.
 
Could you let us know who is the best person to discuss sponsorships and travel support with, and what you would need from a creator standpoint to get started?
 
With warm regards,
 
Jahroinimo
Lead Director, sayyah-byond-travel & ANEXTVID
sayyah-byond-travel Staging: ${portfolioLink}
Photography Portfolio: https://anextvid-boop.github.io/anextvid-landing/
anextvid@gmail.com | www.anextvid.com`;
    }

    emailSubject.textContent = subject;
    emailBody.textContent = body;
}

if (sectorSelect && brandSelect) {
    sectorSelect.addEventListener('change', (e) => {
        populateBrands(e.target.value);
    });

    brandSelect.addEventListener('change', (e) => {
        const sector = sectorSelect.value;
        const index = e.target.value;
        updateEmailContent(outreachData[sector][index], sector);
    });

    // Initialize first sector and brand
    populateBrands('resorts');
}
