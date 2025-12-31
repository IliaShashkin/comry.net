// Intersection Observer for fade-in
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.fade')
    .forEach(el => observer.observe(el));

// Discord button
document.querySelector('.discord-btn').addEventListener('click', () => {
    window.open('https://discord.gg/JfX6zrNkU8', '_blank');
});

// Contact button
document.getElementById('mailtoBtn').addEventListener('click', () => {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    const to = encodeURIComponent('you@example.com');
    const subject = encodeURIComponent('Сообщение с портфолио');
    const bodyLines = [];
    if (name) bodyLines.push('Name: ' + name);
    if (email) bodyLines.push('Senders email: ' + email);
    if (message) bodyLines.push('', 'Message: ', message);
    const body = encodeURIComponent(bodyLines.join('\n'));

    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
});

// Navbar shadow + hide scroll-indicator logic
(function() {
    const navbar = document.querySelector('.navbar');
    const indicator = document.querySelector('.scroll-indicator');

    function updateNavbar() {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    let hideTimeout = null;
    function hideIndicator() {
        if (!indicator) return;
        // запустить плавное скрытие
        indicator.classList.add('hide');

        const onEnd = (e) => {
            // игнорировать посторонние свойства
            if (e && e.propertyName && e.propertyName !== 'opacity' && e.propertyName !== 'transform') return;
            indicator.removeEventListener('transitionend', onEnd);
            if (indicator.parentNode) indicator.parentNode.removeChild(indicator);
            removeListeners();
        };

        indicator.addEventListener('transitionend', onEnd);

        // запасной таймаут на случай, если transitionend не сработает
        const fallback = setTimeout(() => {
            try { onEnd(); } finally { clearTimeout(fallback); }
        }, 1000);

        if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
        }
    }
    function onFirstInteraction(e) {
        if (e.type === 'keydown') {
            const keys = ['ArrowDown','PageDown',' ','Home','End'];
            if (!keys.includes(e.key)) return;
        }
        hideIndicator();
    }

    function removeListeners() {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('wheel', onFirstInteraction);
        window.removeEventListener('touchstart', onFirstInteraction);
        window.removeEventListener('keydown', onFirstInteraction);
    }
    function onScroll() {
        updateNavbar();
        if (window.scrollY > 100) hideIndicator();
    }



    window.addEventListener('load', () => {
        updateNavbar();
        if (indicator) {
            hideTimeout = setTimeout(hideIndicator, 4000);
            window.addEventListener('wheel', onFirstInteraction, { passive: true });
            window.addEventListener('touchstart', onFirstInteraction, { passive: true });
            window.addEventListener('keydown', onFirstInteraction);
        }
        window.addEventListener('scroll', onScroll, { passive: true });
    });
})();