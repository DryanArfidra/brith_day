document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMEN-ELEMEN YANG DIBUTUHKAN ---
    const steps = document.querySelectorAll('.step');
    const nextBtns = document.querySelectorAll('.next-btn');
    const prevBtns = document.querySelectorAll('.prev-btn');
    const musicToggle = document.getElementById('musicToggle');
    const song = document.getElementById('birthdaySong');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const dots = document.querySelectorAll('.dot');

    let currentStep = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    // --- FUNGSI UNTUK MENAMPILKAN STEP YANG BENAR ---
    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });
        currentStep = stepIndex;
    }

    // --- LOGIKA UNTUK GESER (SWIPE) ---
    function handleSwipe() {
        // Jika geser ke kiri, pindah ke step berikutnya
        if (touchEndX < touchStartX - 50) {
            if (currentStep < steps.length - 1) {
                showStep(currentStep + 1);
            }
        }
        // Jika geser ke kanan, pindah ke step sebelumnya
        if (touchEndX > touchStartX + 50) {
            if (currentStep > 0) {
                showStep(currentStep - 1);
            }
        }
    }

    // Event Listener untuk sentuhan di layar
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    // --- EVENT LISTENER UNTUK TOMBOL NEXT/PREV ---
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const nextStepIndex = parseInt(btn.getAttribute('data-next'));
            if (nextStepIndex < steps.length) {
                showStep(nextStepIndex);
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const prevStepIndex = parseInt(btn.getAttribute('data-prev'));
            if (prevStepIndex >= 0) {
                showStep(prevStepIndex);
            }
        });
    });

    // --- LOGIKA UNTUK INDIKATOR GALERI FOTO ---
    // Menggunakan Intersection Observer API untuk mendeteksi foto yang terlihat
    const observerOptions = {
        root: document.querySelector('.photo-gallery'),
        rootMargin: '0px',
        threshold: 0.7 // Foto dianggap "aktif" jika 70% terlihat
    };

    const photoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(galleryItems).indexOf(entry.target);
                // Update indikator titik
                dots.forEach(dot => dot.classList.remove('active'));
                if (dots[index]) {
                    dots[index].classList.add('active');
                }
            }
        });
    }, observerOptions);

    // Amati setiap item di galeri
    galleryItems.forEach(item => photoObserver.observe(item));


    // --- LOGIKA UNTUK MUSIK ---
    song.volume = 0.5; // Atur volume awal (0.0 - 1.0)
    
    // Coba memutar musik otomatis (bisa jadi diblokir browser)
    song.play().then(() => {
        musicToggle.classList.add('playing');
        song.muted = false;
    }).catch(error => {
        song.muted = true;
        console.log("Autoplay diblokir. User harus berinteraksi dulu.");
    });

    musicToggle.addEventListener('click', () => {
        if (song.paused) {
            song.play();
            musicToggle.classList.add('playing');
            song.muted = false;
        } else {
            song.pause();
            musicToggle.classList.remove('playing');
        }
    });

});