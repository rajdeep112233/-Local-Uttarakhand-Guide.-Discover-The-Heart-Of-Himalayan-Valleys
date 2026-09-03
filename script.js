
(function () {
    "use strict";

    /*  DATA */
    const TREKS = [
        {
            id: "kartik-swami",
            name: "Kartik Swami Temple",
            region: "Rudraprayag · 10,100ft",
            days: 2,
            price: "₹ 4,000",
            difficulty: "Easy",
            diffClass: "mid",
            image: "images/kartik swami.jpeg",
            desc: "A sacred ridge walk above Rudraprayag with pine forests, sunrise views and the mountain temple at the crest."
        },

        {
            id: "kedarnath",
            name: "Kedarnath",
            region: "Garhwal · 11,650ft",
            days: 5,
            price: "₹ 8,000",
            difficulty: "Moderate",
            diffClass: "mid",
            image: "images/kedarnath.jpeg",
            desc: "A pilgrimage trek to one of the holiest shrines in India, passing forests, waterfalls and the open valley below Kedarnath."
        },
        {
            id: "tungnath",
            name: "Tungnath + Chandrashila",
            region: "Rudraprayag · 13,000ft",
            days: 3,
            price: "₹ 5,000",
            difficulty: "Moderate",
            diffClass: "mid",
            image: "images/chandrashila.jpeg",
            desc: "The shortest highest Shiva temple trek, ending with alpine meadows and a sunrise summit at Chandrashila."
        },
        
        {
            id: "badhanital",
            name: "Badhanital",
            region: "Garhwal · 8,900ft",
            days: 2,
            price: "₹ 4,000",
            difficulty: "Easy",
            diffClass: "mid",
            image: "images/badhanitaal.jpeg",
            desc: "A peaceful lake-side walk into dense deodar and pine forest, perfect for gentle acclimatisation and forest bathing."
        },
        {
            id: "deoriya-taal",
            name: "Deoriya Taal",
            region: "Garhwal · 12,400ft",
            days: 2,
            price: "₹ 4,500",
            difficulty: "Moderate",
            diffClass: "mid",
            image: "images/deoriatal.jpeg",
            desc: "A high-altitude lake trek under the Chaukhamba massif, with remote camps and serene reflections on the water."
        },
        {
            id: "madhyameshwar",
            name: "Madhyameshwar Temple",
            region: "Garhwal · 11,900ft",
            days: 4,
            price: "₹ 6,500",
            difficulty: "Moderate",
            diffClass: "mid",
            image: "images/madhyameshwar.jpeg",
            desc: "A serene high-altitude trek through dense forests, open meadows, and peaceful alpine terrain to the sacred Madhyameshwar shrine."
        },
        {
            id: "triyuginarayan",
            name: "Triyuginarayan Temple",
            region: "Garhwal · 7,080ft",
            days: 2,
            price: "₹ 3,500",
            difficulty: "Easy",
            diffClass: "mid",
            image: "images/triyuginarayan.jpeg",
            desc: "A short and sacred trek to the ancient Triyuginarayan Temple, known for its natural gas fires and spiritual significance on the Mandakini river."
        }
    ];

    function resolveImagePath(src) {
        if (!src) return "";
        if (src.startsWith("http://") || src.startsWith("https://")) return src;
        return "./" + encodeURI(src);
    }

    /* ============ RENDER TREKS ============ */
    function renderTreks() {
        const grid = document.querySelector("[data-testid='trek-grid']");
        if (!grid) return;
        grid.innerHTML = TREKS.map((t, i) => `
            <article class="trek-card reveal" data-testid="trek-card-${t.id}" style="transition-delay:${i * 60}ms">
                <div class="trek-card__media">
                    <img src="${resolveImagePath(t.image)}" alt="${t.name} trek" loading="lazy" />
                    <span class="trek-card__pill ${t.diffClass}">${t.difficulty}</span>
                </div>
                <div class="trek-card__body">
                    <span class="trek-card__region">${t.region}</span>
                    <h3 class="trek-card__title">${t.name}</h3>
                    <p class="trek-card__desc">${t.desc}</p>
                    <div class="trek-card__meta">
                        <div><b>${t.days}<i style="font-family:Inter;font-style:normal;font-size:12px;color:var(--cream-dim);margin-left:4px">days</i></b><span>Duration</span></div>
                        <div><b>${t.price}</b><span>Per person</span></div>
                        <button class="trek-card__book" data-testid="book-${t.id}" data-trek="${t.name}">Book →</button>
                    </div>
                </div>
            </article>
        `).join("");

        // wire "Book" buttons to prefill form
        grid.querySelectorAll(".trek-card__book").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const trek = e.currentTarget.dataset.trek;
                const sel = document.getElementById("f-trek");
                if (sel) {
                    // match by starting substring in option value
                    for (const opt of sel.options) {
                        if (opt.value === trek || opt.value.startsWith(trek)) {
                            sel.value = opt.value;
                            break;
                        }
                    }
                }
                document.getElementById("book").scrollIntoView({ behavior: "smooth" });
                setTimeout(() => document.getElementById("f-name")?.focus(), 700);
            });
        });
        observeReveals();
    }

    /* ============ REVEAL ON SCROLL ============ */
    let io;
    function observeReveals() {
        if (!io) {
            io = new IntersectionObserver((entries) => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        e.target.classList.add("in");
                        io.unobserve(e.target);
                    }
                });
            }, { threshold: 0.8 });
        }
        document.querySelectorAll(".reveal:not(.in)").forEach(el => io.observe(el));
    }

    /* ============ NAV SCROLL ============ */
    function initNav() {
        const nav = document.querySelector(".nav");
        const onScroll = () => {
            if (window.scrollY > 40) nav.classList.add("scrolled");
            else nav.classList.remove("scrolled");
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        const burger = document.querySelector(".nav__burger");
        const menu = document.querySelector(".mobile-menu");
        burger?.addEventListener("click", () => {
            burger.classList.toggle("open");
            menu.classList.toggle("open");
        });
        menu?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
            burger.classList.remove("open");
            menu.classList.remove("open");
        }));
    }

    function escapeHtml(s) {
        return String(s ?? "").replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
    }

    /* ============ FORM ============ */
    function initForm() {
        const form = document.getElementById("booking-form");
        if (!form) return;

        // set min date to today
        const dateEl = document.getElementById("f-date");
        if (dateEl) dateEl.min = new Date().toISOString().split("T")[0];

        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const fd = new FormData(form);
            const data = {
                name: (fd.get("name") || "").toString().trim(),
                email: (fd.get("email") || "").toString().trim(),
                phone: (fd.get("phone") || "").toString().trim(),
                trek: (fd.get("trek") || "").toString().trim(),
                date: (fd.get("date") || "").toString().trim(),
                people: parseInt(fd.get("people"), 10) || 0,
                level: (fd.get("level") || "").toString().trim(),
                message: (fd.get("message") || "").toString().trim()
            };

            // validate
            let ok = true;
            [["f-name", !!data.name], ["f-email", /^\S+@\S+\.\S+$/.test(data.email)], ["f-phone", data.phone.length >= 7], ["f-trek", !!data.trek], ["f-date", !!data.date], ["f-people", data.people >= 1]]
                .forEach(([id, valid]) => {
                    const el = document.getElementById(id);
                    if (el) el.classList.toggle("err", !valid);
                    if (!valid) ok = false;
                });

            if (!ok) {
                document.querySelector(".err")?.focus();
                return;
            }

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Preparing...";
            submitBtn.disabled = true;

            const booking = {
                ...data,
                createdAt: new Date().toISOString()
            };
            localStorage.setItem("rudraprayagBooking", JSON.stringify(booking));

            const modal = document.getElementById("modal");
            const body = document.getElementById("modal-body");
            body.innerHTML = `<p><strong>✅ आपकी Booking Request तैयार है!</strong></p>
                <p>नमस्ते ${escapeHtml(data.name.split(" ")[0])},</p>
                <p>Tap WhatsApp to confirm your booking.</p>
                <p><strong>Trek:</strong> ${escapeHtml(data.trek)}<br><strong>Date:</strong> ${escapeHtml(data.date)}<br><strong>Trekkers:</strong> ${data.people}</p>`;

            const waMsg = encodeURIComponent(
                `Hi Rajdeep, I'd like to book:\n\n• Trek: ${data.trek}\n• Start: ${data.date}\n• Trekkers: ${data.people}\n• Experience: ${data.level}\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\n\n${data.message ? "Note: " + data.message : ""}`
            );
            document.getElementById("wa-link").href = `https://wa.me/919084738318?text=${waMsg}`;

            modal.classList.add("open");
            modal.setAttribute("aria-hidden", "false");
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });

        document.querySelectorAll("[data-modal-close]").forEach(el => {
            el.addEventListener("click", () => {
                const modal = document.getElementById("modal");
                modal.classList.remove("open");
                modal.setAttribute("aria-hidden", "true");
            });
        });

        // clear err on typing
        form.querySelectorAll("input, select, textarea").forEach(el => {
            el.addEventListener("input", () => el.classList.remove("err"));
        });
    }

    /* ============ SMOOTH SCROLL for internal anchors ============ */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener("click", (e) => {
                const id = a.getAttribute("href");
                if (id && id.length > 1) {
                    const target = document.querySelector(id);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                }
            });
        });
    }



    /* ============ INIT ============ */
    function init() {
        renderTreks();
        initNav();
        initForm();
        initSmoothScroll();
        observeReveals();
        const y = document.getElementById("year");
        if (y) y.textContent = new Date().getFullYear();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
