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
    window.open('https://discord.gg/YOUR_LINK', '_blank');
});

// Contact button
document.querySelector('.contact-btn').addEventListener('click', () => {
    alert('Discord Webhook integration goes here');
});


const webhookURL = "haha no";

const form = document.getElementById("contactForm");
const statusText = document.getElementById("formStatus");

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
        embeds: [
            {
                title: "📩 New Portfolio Message",
                color: 0xB21752,
                fields: [
                    {
                        name: "Name",
                        value: name,
                        inline: true
                    },
                    {
                        name: "Email",
                        value: email,
                        inline: true
                    },
                    {
                        name: "Message",
                        value: message
                    }
                ],
                footer: {
                    text: "Codex Portfolio"
                },
                timestamp: new Date()
            }
        ]
    };

    try {
        const response = await fetch(webhookURL, {
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
        statusText.textContent = "Error sending message.";
    }
});
