document.addEventListener('DOMContentLoaded', () => {
    // Scroll effect
    const text = document.getElementById('text');
    window.addEventListener('scroll', () => {
        const value = window.scrollY;
        const offset = Math.min(value * 0.3, 250);
        text.style.transform = `translateY(${offset}px)`;
    });

    // Custom next-prev slider
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');
    const slide = document.querySelector('.slide');

    if (next && prev && slide) {
        next.addEventListener('click', () => {
            const items = document.querySelectorAll('.slide .item');
            slide.appendChild(items[0]);
        });

        prev.addEventListener('click', () => {
            const items = document.querySelectorAll('.slide .item');
            slide.prepend(items[items.length - 1]);
        });
    }

    // ========================
    // PETA PULAU INTERAKTIF
    // ========================
    
    // Definisikan nama pulau lengkap berdasarkan class
    const pulauNames = {
        'sum': 'Sumatra',
        'sul': 'Sulawesi',
        'kal': 'Kalimantan',
        'jawa': 'Jawa',
        'ntt': 'Nusa Tenggara',
        'papua': 'Papua'
    };

    // Atur event listener untuk peta
    const mapImages = document.querySelectorAll('.map img');
    
    mapImages.forEach(img => {
        const className = img.className;
        const namaPulau = pulauNames[className] || className.charAt(0).toUpperCase() + className.slice(1);
        
        // Set data attribute untuk nama pulau
        img.setAttribute('data-pulau', namaPulau);
        
        // Atur onclick event dengan nama lengkap
        img.addEventListener('click', function() {
            const namaPulau = this.getAttribute('data-pulau');
            let link = '';
            
            switch(namaPulau) {
                case 'Sumatra': link = 'sumatera.html'; break;
                case 'Sulawesi': link = 'sulawesi.html'; break;
                case 'Kalimantan': link = 'kalimantan.html'; break;
                case 'Jawa': link = 'jawa.html'; break;
                case 'Nusa Tenggara': link = 'nusa-tenggara.html'; break;
                case 'Papua': link = 'papua.html'; break;
            }
            
            showPopup(link, namaPulau);
        });
        
        // Hover effect dengan nama lengkap
        img.addEventListener('mouseenter', (e) => {
            e.target.style.transform = 'scale(1.1)';
            e.target.style.filter = 'brightness(1.2) drop-shadow(0 0 10px rgba(76, 175, 80, 0.6))';
            e.target.style.zIndex = '10';
            e.target.style.transition = 'all 0.3s ease';
            
            // Tooltip dengan nama lengkap
            showMapTooltip(e, namaPulau);
        });

        img.addEventListener('mouseleave', (e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.filter = 'brightness(1) drop-shadow(0 0 0 transparent)';
            e.target.style.zIndex = 'auto';
            removeMapTooltip();
        });
    });

    // Fungsi untuk tooltip peta
    function showMapTooltip(event, pulauName) {
        // Hapus tooltip sebelumnya jika ada
        const existingTooltip = document.querySelector('.peta-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }
        
        const tooltip = document.createElement('div');
        tooltip.className = 'peta-tooltip';
        tooltip.textContent = `Pulau ${pulauName}`;
        tooltip.style.cssText = `
            position: fixed;
            background: linear-gradient(135deg, #2a5c39, #4caf50);
            color: white;
            padding: 8px 20px;
            border-radius: 25px;
            font-size: 14px;
            font-weight: 600;
            z-index: 1000;
            pointer-events: none;
            white-space: nowrap;
            transform: translate(-50%, -100%);
            box-shadow: 0 5px 15px rgba(42, 92, 57, 0.4);
            border: 2px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(5px);
            animation: tooltipFadeIn 0.3s ease-out;
        `;
        
        document.body.appendChild(tooltip);
        
        // Update posisi tooltip
        const updateTooltip = () => {
            const rect = event.target.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top;
            
            tooltip.style.left = `${x}px`;
            tooltip.style.top = `${y}px`;
        };
        
        updateTooltip();
        
        // Simpan reference untuk cleanup
        event.target.tooltip = tooltip;
        event.target.updateTooltip = updateTooltip;
        
        // Update posisi saat scroll atau resize
        window.addEventListener('scroll', updateTooltip);
        window.addEventListener('resize', updateTooltip);
    }

    function removeMapTooltip() {
        const tooltip = document.querySelector('.peta-tooltip');
        if (tooltip) {
            // Hapus event listeners
            window.removeEventListener('scroll', tooltip.updateTooltip);
            window.removeEventListener('resize', tooltip.updateTooltip);
            tooltip.remove();
        }
    }

    // ========================
    // POPUP FUNGSIONALITAS
    // ========================
    
    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popup-text');
    const btnKunjungi = document.getElementById('kunjungi');
    const btnTutup = document.getElementById('tutup');

    // Tombol Kunjungi
    btnKunjungi.addEventListener('click', function() {
        if (currentLink) {
            // Animasi sebelum pindah halaman
            popup.style.opacity = '0';
            popup.querySelector('.popup-box').style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                popup.style.display = 'none';
                window.location.href = currentLink;
            }, 300);
        }
    });

    // Tombol Batal
    btnTutup.addEventListener('click', function() {
        popup.style.opacity = '0';
        popup.querySelector('.popup-box').style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            popup.style.display = 'none';
            currentLink = "";
        }, 300);
    });

    // Tutup popup jika klik di luar
    popup.addEventListener('click', function(e) {
        if (e.target === this) {
            popup.style.opacity = '0';
            popup.querySelector('.popup-box').style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                this.style.display = 'none';
                currentLink = "";
            }, 300);
        }
    });

    // ========================
    // SWIPER SLIDER
    // ========================
    
    // Inisialisasi Swiper untuk card slider
    const swiper = new Swiper('.slider-wrapper', {
        loop: true,
        grabCursor: true,
        spaceBetween: 30,
        slidesPerView: 3, // default desktop
        centeredSlides: true, // slide di tengah
        pagination: { 
            el: '.swiper-pagination', 
            clickable: true, 
            dynamicBullets: true 
        },
        navigation: { 
            nextEl: '.swiper-button-next', 
            prevEl: '.swiper-button-prev' 
        },
        breakpoints: {
            0: { slidesPerView: 1 },
            620: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });

    // ========================
    // INTERAKSI SLIDER FLORA-FAUNA
    // ========================
    
    // Interaksi dengan tombol See More di slider utama
    const seeMoreButtons = document.querySelectorAll('.content button');
    
    seeMoreButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Tampilkan modal/informasi detail
            showDetailModal(index);
            
            // Feedback visual
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // ========================
    // INTERAKSI CARD SLIDER
    // ========================
    
    const cardItems = document.querySelectorAll('.card-item');
    
    cardItems.forEach((card, index) => {
        card.addEventListener('click', () => {
            showSpeciesDetail(index);
        });
        
        // Hover effect untuk card
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 20px 40px rgba(42, 92, 57, 0.4)';
            card.querySelector('.item-name').style.color = '#4caf50';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
            card.querySelector('.item-name').style.color = '#2a5c39';
        });
    });

    // ========================
    // INTERAKSI FOOTER
    // ========================
    
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (validateEmail(email)) {
                // Simulasi pengiriman berhasil
                showNotification('Terima kasih! Anda telah berlangganan newsletter kami.', 'success');
                emailInput.value = '';
            } else {
                showNotification('Harap masukkan email yang valid.', 'error');
            }
        });
    }

    // ========================
    // INTERAKSI MENU NAVIGASI
    // ========================
    
    const navLinks = document.querySelectorAll('.navbar a');
    const currentPage = window.location.pathname.split('/').pop();
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        // Highlight menu aktif
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
        
        // Hover effect
        link.addEventListener('mouseenter', () => {
            if (!link.classList.contains('active')) {
                link.style.color = '#4caf50';
            }
        });
        
        link.addEventListener('mouseleave', () => {
            if (!link.classList.contains('active')) {
                link.style.color = '#fff';
            }
        });
    });

    // ========================
    // DARK MODE TOGGLE
    // ========================
    
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.id = 'darkModeToggle';
    darkModeToggle.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #2a5c39;
        color: white;
        border: none;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(darkModeToggle);
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.className = 'fas fa-sun';
            darkModeToggle.style.background = '#f1c40f';
        } else {
            icon.className = 'fas fa-moon';
            darkModeToggle.style.background = '#2a5c39';
        }
    });

    // ========================
    // TAMBAHAN ANIMASI CSS
    // ========================
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes tooltipFadeIn {
            from {
                opacity: 0;
                transform: translate(-50%, -120%);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -100%);
            }
        }
        
        .species-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .species-modal .modal-content {
            background: white;
            padding: 30px;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            transform: scale(0.8);
            transition: transform 0.3s;
            position: relative;
        }
        
        .species-modal .close-modal {
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
        }
        
        .species-modal h2 {
            color: #2a5c39;
            margin-bottom: 20px;
        }
        
        .modal-info p {
            margin-bottom: 15px;
            line-height: 1.6;
        }
        
        .status-badge {
            display: inline-block;
            padding: 3px 8px;
            background: #e74c3c;
            color: white;
            border-radius: 3px;
            font-size: 12px;
        }
        
        .modal-action-btn {
            background: #2a5c39;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 20px;
            transition: background 0.3s;
        }
        
        .modal-action-btn:hover {
            background: #4caf50;
        }
        
        .peta-tooltip::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-width: 8px;
            border-style: solid;
            border-color: #2a5c39 transparent transparent transparent;
        }
        
        /* Popup animation */
        #popup {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        #popup.show {
            opacity: 1;
        }
        
        #popup.show .popup-box {
            transform: scale(1);
        }
        
        .popup-box {
            transform: scale(0.8);
            transition: transform 0.3s ease;
        }
        
        /* Dark mode styles */
        .dark-mode {
            background: #1a1a1a;
            color: #f0f0f0;
        }
        
        .dark-mode .sec,
        .dark-mode .peta,
        .dark-mode .slider-section,
        .dark-mode .card-slider {
            background: #2a2a2a !important;
        }
        
        .dark-mode .footer-section {
            background: linear-gradient(180deg, #0a1a0a 0%, #051005 100%);
        }
        
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            color: white;
            border-radius: 5px;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }
        
        .notification.success {
            background: #2a5c39;
        }
        
        .notification.error {
            background: #e74c3c;
        }
    `;
    document.head.appendChild(style);
});

// ========================
// FUNGSI GLOBAL
// ========================

let currentLink = "";

// Fungsi showPopup global
function showPopup(link, namaPulau) {
    // Jika namaPulau masih berupa class (singkatan), konversi ke nama lengkap
    const pulauNames = {
        'sum': 'Sumatra',
        'sul': 'Sulawesi',
        'kal': 'Kalimantan',
        'jawa': 'Jawa',
        'ntt': 'Nusa Tenggara',
        'papua': 'Papua',
        'Sumatra': 'Sumatra',
        'Sulawesi': 'Sulawesi',
        'Kalimantan': 'Kalimantan',
        'Jawa': 'Jawa',
        'Nusa Tenggara': 'Nusa Tenggara',
        'Papua': 'Papua'
    };
    
    currentLink = link;
    const namaLengkap = pulauNames[namaPulau] || namaPulau;
    
    // Update teks popup dengan nama lengkap
    document.getElementById('popup-text').textContent = 
        `Apakah Anda ingin mengunjungi halaman Pulau ${namaLengkap}?`;
    
    // Tampilkan popup dengan animasi
    const popup = document.getElementById('popup');
    popup.style.display = 'flex';
    
    // Animasi masuk popup
    setTimeout(() => {
        popup.style.opacity = '1';
        popup.querySelector('.popup-box').style.transform = 'scale(1)';
    }, 10);
}

// Fungsi untuk modal detail spesies
function showDetailModal(index) {
    // Daftar spesies sesuai urutan di slider
    const speciesData = [
        {
            name: "Rafflesia Arnoldi",
            description: "Bunga terbesar di dunia dengan diameter mencapai 1 meter. Hidup sebagai parasit pada tumbuhan inang.",
            habitat: "Hutan hujan tropis Sumatra",
            conservation: "Critically Endangered",
            fact: "Mengeluarkan bau busuk untuk menarik lalat sebagai penyerbuk."
        },
        {
            name: "Macan Tutul Jawa",
            description: "Predator puncak endemik Jawa dengan corak tutul yang unik.",
            habitat: "Hutan tropis Jawa",
            conservation: "Critically Endangered",
            fact: "Memiliki variasi warna hitam yang dikenal sebagai 'macan kumbang'."
        },
        {
            name: "Harimau Sumatera",
            description: "Subspesies harimau terkecil dengan loreng yang rapat.",
            habitat: "Hutan Sumatra",
            conservation: "Critically Endangered",
            fact: "Satu-satunya subspesies harimau yang tersisa di Indonesia."
        },
        {
            name: "Burung Maleo",
            description: "Burung endemik Sulawesi yang terkenal dengan telur besarnya.",
            habitat: "Hutan Sulawesi",
            conservation: "Endangered",
            fact: "Tidak mengerami telurnya sendiri, menggunakan panas bumi untuk menetas."
        },
        {
            name: "Anggrek Hitam Papua",
            description: "Anggrek langka dengan bunga hitam yang eksotis.",
            habitat: "Hutan Papua",
            conservation: "Vulnerable",
            fact: "Bunganya memiliki warna hitam pekat yang sangat langka di dunia anggrek."
        },
        {
            name: "Bunga Edelweis Jawa",
            description: "Bunga abadi yang tumbuh di pegunungan tinggi.",
            habitat: "Pegunungan Jawa",
            conservation: "Protected",
            fact: "Disebut 'bunga abadi' karena bisa bertahan lama tanpa layu."
        },
        {
            name: "Bekantan",
            description: "Primata dengan hidung panjang yang khas.",
            habitat: "Hutan mangrove Kalimantan",
            conservation: "Endangered",
            fact: "Hidung besar pada jantan berfungsi sebagai resonator suara."
        },
        {
            name: "Kantong Semar",
            description: "Tumbuhan karnivora dengan kantong penjebak serangga.",
            habitat: "Hutan tropis Kalimantan",
            conservation: "Protected",
            fact: "Memiliki cairan pencerna untuk melarutkan serangga yang terperangkap."
        }
    ];
    
    const species = speciesData[index] || speciesData[0];
    
    const modalHTML = `
        <div class="species-modal" id="speciesModal">
            <div class="modal-content">
                <button class="close-modal">&times;</button>
                <h2>${species.name}</h2>
                <div class="modal-info">
                    <p><strong>Deskripsi:</strong> ${species.description}</p>
                    <p><strong>Habitat:</strong> ${species.habitat}</p>
                    <p><strong>Fakta Menarik:</strong> ${species.fact}</p>
                    <p><strong>Status Konservasi:</strong> <span class="status-badge">${species.conservation}</span></p>
                </div>
                <button class="modal-action-btn">Pelajari Lebih Lanjut</button>
            </div>
        </div>
    `;
    
    // Hapus modal sebelumnya jika ada
    const existingModal = document.getElementById('speciesModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('speciesModal');
    const closeBtn = modal.querySelector('.close-modal');
    const actionBtn = modal.querySelector('.modal-action-btn');
    
    // Tampilkan modal dengan animasi
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 10);
    
    // Tutup modal
    closeBtn.addEventListener('click', () => {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
        setTimeout(() => modal.remove(), 300);
    });
    
    // Klik di luar modal untuk menutup
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeBtn.click();
        }
    });
    
    // Tombol aksi
    actionBtn.addEventListener('click', () => {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(species.name + ' Indonesia')}`, '_blank');
    });
}

function showSpeciesDetail(index) {
    showDetailModal(index);
}

function showNotification(message, type) {
    // Hapus notifikasi sebelumnya
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function formatNumber(num) {
    if (typeof num !== 'number') return num;
    return num.toLocaleString('id-ID');
}