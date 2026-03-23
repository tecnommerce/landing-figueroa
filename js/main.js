// ================= FUNCIONES PARA EL MENÚ Y NAVEGACIÓN =================

// Función para mostrar/ocultar el menú móvil
function toggleMenu() {
    const navLinks = document.querySelector('.hero-section .nav-links');
    const menuToggle = document.querySelector('.hero-section .menu-toggle');
    
    if (navLinks && menuToggle) {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    }
}

// Función para ocultar todas las secciones de contenido
function hideAllSections() {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const heroMain = document.getElementById('hero-main');
    if (heroMain) {
        heroMain.style.display = 'grid';
    }
}

// Función para mostrar una sección específica
function showSection(sectionId) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Ocultar el hero
    const heroMain = document.getElementById('hero-main');
    if (heroMain) {
        heroMain.style.display = 'none';
    }
    
    // Mostrar la sección seleccionada
    const targetSection = document.getElementById(`section-${sectionId}`);
    if (targetSection) {
        targetSection.classList.add('active');
        // Scroll suave al inicio de la sección
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Si es "inicio", mostrar el hero nuevamente
    if (sectionId === 'inicio') {
        if (heroMain) {
            heroMain.style.display = 'grid';
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Cerrar menú móvil si está abierto
    const navLinks = document.querySelector('.hero-section .nav-links');
    const menuToggle = document.querySelector('.hero-section .menu-toggle');
    if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('active');
    }
}

// Función para volver al inicio (scroll top)
function scrollToTop() {
    hideAllSections();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Cerrar menú al hacer click fuera (para móviles)
document.addEventListener('click', function(event) {
    const nav = document.querySelector('.hero-section .nav-links');
    const toggle = document.querySelector('.hero-section .menu-toggle');
    
    if (nav && toggle && !nav.contains(event.target) && !toggle.contains(event.target)) {
        nav.classList.remove('active');
        toggle.classList.remove('active');
    }
});

// ================= ANIMACIONES AL HACER SCROLL =================
// (Se activarán cuando agreguemos más secciones)

console.log('✅ Landing page cargada correctamente');
// ================= CONTADORES ANIMADOS (SECCIÓN INFORMACIÓN PROFESIONAL) =================
function animateInfoCounters() {
    const counters = document.querySelectorAll('.info-profesional-section .count-up');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        
        // Si ya está animado, no hacemos nada
        if (counter.classList.contains('animated')) return;
        
        // Verificar si el elemento está visible
        const rect = counter.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight - 100 && rect.bottom >= 0);
        
        if (isVisible && !counter.classList.contains('counting')) {
            counter.classList.add('counting');
            
            let startValue = 0;
            const duration = 2000; // 2 segundos
            const increment = target / (duration / 16);
            
            const updateCounter = () => {
                startValue += increment;
                if (startValue < target) {
                    counter.innerText = Math.floor(startValue) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target + '+';
                    counter.classList.add('animated');
                }
            };
            
            updateCounter();
        }
    });
}

// Ejecutar al cargar la página y al hacer scroll
window.addEventListener('load', animateInfoCounters);
window.addEventListener('scroll', animateInfoCounters);
setTimeout(animateInfoCounters, 500);