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
const workerURL = "https://workercomrynet.comry.workers.dev";

const form = document.getElementById("contactForm");
const statusText = document.getElementById("formStatus");

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            statusText.textContent = "Please fill in all fields.";
            return;
        }

        statusText.textContent = "Sending message...";

        const payload = {
            name: name,
            email: email,
            message: message
        };

        try {
            const response = await fetch(workerURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                statusText.textContent = "Message sent successfully!";
                form.reset();
            } else {
                statusText.textContent = "Failed to send message.";
            }
        } catch (error) {
            console.error(error);
            statusText.textContent = "Error sending message.";
        }
    });
}



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
        indicator.classList.add('hide');

        const onEnd = (e) => {
            if (e && e.propertyName && e.propertyName !== 'opacity' && e.propertyName !== 'transform') return;
            indicator.removeEventListener('transitionend', onEnd);
            if (indicator.parentNode) indicator.parentNode.removeChild(indicator);
            removeListeners();
        };

        indicator.addEventListener('transitionend', onEnd);

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