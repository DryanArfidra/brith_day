// Tunggu hingga seluruh konten halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    
    // Fungsi untuk menjalankan efek confetti
    function launchConfetti() {
        const duration = 3 * 1000; // 3 detik
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            
            // Confetti dari sisi kiri bawah
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            }));
            // Confetti dari sisi kanan bawah
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            }));
        }, 250);
    }

    // Jalankan confetti saat halaman dibuka
    launchConfetti();

    // Opsional: Atur agar musik tidak langsung autoplay keras-keras
    // (Kebanyakan browser modern memblokir autoplay)
    const music = document.getElementById('bg-music');
    music.volume = 0.5; // Set volume 50%
    
    // Coba untuk memutar musik setelah ada interaksi pertama dari user
    document.body.addEventListener('click', function() {
        if (music.paused) {
            music.play();
        }
    }, { once: true }); // Hanya berjalan sekali

});