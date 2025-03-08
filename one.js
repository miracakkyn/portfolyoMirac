// DOM (Document Object Model) elemanlarını seç
const burger = document.querySelector('.burger'); // Hamburger menü ikonunu seç
const nav = document.querySelector('.nav-links'); // Navigasyon linklerini seç
const navLinks = document.querySelectorAll('.nav-links li'); // Tüm nav linklerini dizi olarak seç
const categoryButtons = document.querySelectorAll('.category-btn'); // Beceri kategorisi butonlarını seç
const skillContainers = document.querySelectorAll('.skills-container'); // Beceri konteynerlerini seç

// Hamburger menü tıklama olayı
burger.addEventListener('click', () => {
    // Navigasyon menüsünü aç/kapat (toggle)
    nav.classList.toggle('active');
    
    // Burger animasyonu
    burger.classList.toggle('toggle');
});

// Kategori butonları için tıklama olayları
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Önce tüm butonlardan 'active' sınıfını kaldır
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Tıklanan butona 'active' sınıfını ekle
        button.classList.add('active');
        
        // Hedef kategoriyi al (data-category özelliğinden)
        const target = button.getAttribute('data-category');
        
        // Tüm beceri konteynerlerini gizle
        skillContainers.forEach(container => {
            container.classList.remove('active');
        });
        
        // Hedef beceri konteynerini göster
        document.getElementById(`${target}-skills`).classList.add('active');
    });
});

// Sayfa yüklendiğinde yürütülecek fonksiyon
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling (yumuşak kaydırma) için tüm iç bağlantılara olay dinleyici ekle
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Varsayılan link davranışını engelle
            
            // Hedef elemanı seç
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Hedef elemana yumuşak kaydırma yap
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Mobil menü açıksa kapat
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                burger.classList.remove('toggle');
            }
        });
    });
});

// Kaydırma olayını dinle (scroll event)
window.addEventListener('scroll', () => {
    // Sayfanın ne kadar aşağı kaydırıldığını al
    const scrollPosition = window.scrollY;
    
    // Belirli bir noktadan sonra navbar'ın arka planını daha belirgin yap
    if (scrollPosition > 100) {
        document.querySelector('.navbar').style.backgroundColor = 'rgba(18, 18, 18, 0.98)';
    } else {
        document.querySelector('.navbar').style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
    }
});
// Form işleme kodu - one.js dosyasına ekleyin
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (form) { // Form varsa işlem yap
    form.addEventListener('submit', function(event) {
        // Form gönderilirken durum mesajı göster
        formStatus.innerHTML = '<div class="sending">Mesajınız gönderiliyor...</div>';
        
        // FormSubmit tarafından işlenmesi için event.preventDefault() yapmıyoruz!
        // Form normal şekilde submit edilecek
        
        localStorage.setItem('formSubmitted', 'true');
    });
    
    // Sayfa yüklendiğinde, form daha önce gönderilmiş mi kontrol et
    window.onload = function() {
        if (localStorage.getItem('formSubmitted') === 'true') {
            // Form gönderilmiş, teşekkür mesajını göster
            formStatus.innerHTML = '<div class="success">Mesajınız başarıyla gönderildi! Teşekkür ederiz.</div>';
            form.reset();
            
            // Durumu sıfırla
            localStorage.removeItem('formSubmitted');
        }
    };
}