const defaultConfig = {
    headline: 'Anúncios só para chamadas serão descontinuados.',
    subheadline: 'Suas campanhas vão precisar de uma URL de destino. Landing pages otimizadas para ligação e WhatsApp são a solução direta.',
    cta_text: 'Falar no WhatsApp',
    whatsapp_number: '5542999359359',
    email: 'lucasfirak@gmail.com',
    background_color: '#020617',
    surface_color: '#0f172a',
    text_color: '#e2e8f0',
    primary_action_color: '#f59e0b',
    secondary_action_color: '#94a3b8',
    font_family: 'Space Grotesk',
    font_size: 16
};

async function onConfigChange(config) {
    const c = { ...defaultConfig, ...config };

    // Update headline
    const headlineEl = document.getElementById('headline');

    if (headlineEl) {
        headlineEl.innerHTML = `
                Anúncios só para chamadas<br>
                <span class="text-amber-400">serão descontinuados</span>
                `;
    }

    // Update subheadline
    const subheadlineEl = document.getElementById('subheadline');
    if (subheadlineEl) {
        subheadlineEl.textContent = c.subheadline;
    }

    // Update CTA texts
    const ctaTextEl = document.getElementById('cta-text');
    if (ctaTextEl) {
        ctaTextEl.textContent = c.cta_text;
    }

    const ctaFinalTextEl = document.getElementById('cta-final-text');
    if (ctaFinalTextEl) {
        ctaFinalTextEl.textContent = c.cta_text === 'Falar no WhatsApp' ? 'Quero resolver isso agora' : c.cta_text;
    }

    // Update WhatsApp links
    const whatsappUrl = `https://wa.me/${c.whatsapp_number}`;
    const ctaPrimary = document.getElementById('cta-primary');
    const ctaFinal = document.getElementById('cta-final');

    if (ctaPrimary) {
        ctaPrimary.href = whatsappUrl;
        ctaPrimary.target = '_blank';
        ctaPrimary.rel = 'noopener noreferrer';
    }

    if (ctaFinal) {
        ctaFinal.href = whatsappUrl;
        ctaFinal.target = '_blank';
        ctaFinal.rel = 'noopener noreferrer';
    }

    // Update email
    const footerEmail = document.getElementById('footer-email');
    if (footerEmail) {
        footerEmail.textContent = c.email;
    }

    // Update colors
    const heroSection = document.getElementById('hero-section');
    const ctaFinalSection = document.getElementById('cta-final-section');

    if (heroSection) {
        heroSection.style.backgroundColor = c.background_color;
    }

    if (ctaFinalSection) {
        ctaFinalSection.style.backgroundColor = c.background_color;
    }

    // Update primary action color
    if (ctaPrimary) {
        ctaPrimary.style.backgroundColor = c.primary_action_color;
    }

    if (ctaFinal) {
        ctaFinal.style.backgroundColor = c.primary_action_color;
    }

    // Update fonts
    const customFont = c.font_family;
    const baseFontStack = 'sans-serif';
    const displayElements = document.querySelectorAll('.font-display');

    displayElements.forEach(el => {
        el.style.fontFamily = `${customFont}, ${baseFontStack}`;
    });

    // Update font sizes
    const baseSize = c.font_size;
    document.body.style.fontSize = `${baseSize}px`;
}

function mapToCapabilities(config) {
    const c = { ...defaultConfig, ...config };

    return {
        recolorables: [
            {
                get: () => c.background_color,
                set: (value) => {
                    c.background_color = value;
                    window.elementSdk.setConfig({ background_color: value });
                }
            },
            {
                get: () => c.surface_color,
                set: (value) => {
                    c.surface_color = value;
                    window.elementSdk.setConfig({ surface_color: value });
                }
            },
            {
                get: () => c.text_color,
                set: (value) => {
                    c.text_color = value;
                    window.elementSdk.setConfig({ text_color: value });
                }
            },
            {
                get: () => c.primary_action_color,
                set: (value) => {
                    c.primary_action_color = value;
                    window.elementSdk.setConfig({ primary_action_color: value });
                }
            },
            {
                get: () => c.secondary_action_color,
                set: (value) => {
                    c.secondary_action_color = value;
                    window.elementSdk.setConfig({ secondary_action_color: value });
                }
            }
        ],
        borderables: [],
        fontEditable: {
            get: () => c.font_family,
            set: (value) => {
                c.font_family = value;
                window.elementSdk.setConfig({ font_family: value });
            }
        },
        fontSizeable: {
            get: () => c.font_size,
            set: (value) => {
                c.font_size = value;
                window.elementSdk.setConfig({ font_size: value });
            }
        }
    };
}

function mapToEditPanelValues(config) {
    const c = { ...defaultConfig, ...config };
    return new Map([
        ['headline', c.headline],
        ['subheadline', c.subheadline],
        ['cta_text', c.cta_text],
        ['whatsapp_number', c.whatsapp_number],
        ['email', c.email]
    ]);
}

// Initialize SDK
if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities,
        mapToEditPanelValues
    });
} else {
    onConfigChange(defaultConfig);
}

const yearEl = document.getElementById("current-year");

if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}