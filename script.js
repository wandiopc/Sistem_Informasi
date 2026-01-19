class ResponsiveNavigation {
  constructor() {
    this.navbar = document.querySelector('.main-nav');
    this.navLinks = document.querySelector('.nav-links');
    this.menuToggle = document.querySelector('.menu-toggle');
    this.header = document.querySelector('.blue-header');
    
    this.breakpoints = {
      mobile: 768,
      tablet: 1024,
      desktop: 1200
    };
    
    this.currentBreakpoint = this.getCurrentBreakpoint();
    this.isMenuOpen = false;
    
    this.init();
  }
  
  init() {
    this.setupMenuItems();
    this.setupEventListeners();
    this.handleResize();
    this.setupStickyNavbar();
  }
  
  getCurrentBreakpoint() {
    const width = window.innerWidth;
    if (width <= this.breakpoints.mobile) return 'mobile';
    if (width <= this.breakpoints.tablet) return 'tablet';
    if (width <= this.breakpoints.desktop) return 'desktop';
    return 'large';
  }
  
  setupMenuItems() {
    const menuItems = [
      { label: 'Beranda', link: 'index.html' },
      { label: 'Dosen', link: 'dosen.html' },
      { label: 'Mahasiswa', link: 'mahasiswa.html' },
      { label: 'Kurikulum', link: 'kurikulum.html' },
      { label: 'Materi', link: 'materi.html' },
      { label: 'Upload Tugas', link: 'tugas.html' },
      { label: 'Kontak ', link: 'kontak.html' }
    ];
    
    if (this.navLinks && this.navLinks.children.length === 0) {
      menuItems.forEach(item => {
        const a = document.createElement('a');
        a.href = item.link;
        a.textContent = item.label;
        a.setAttribute('role', 'menuitem');
        a.setAttribute('tabindex', '0');
        this.navLinks.appendChild(a);
      });
    }
    
    this.setActiveMenuItem();
  }
  
  setActiveMenuItem() {
    if (!this.navLinks) return;
    
    const current = window.location.pathname.split('/').pop() || 'index.html';
    this.navLinks.querySelectorAll('a').forEach(a => {
      a.classList.remove('active');
      const href = a.getAttribute('href').split('/').pop();
      if (href === current) {
        a.classList.add('active');
      }
    });
  }
  
  setupEventListeners() {
    // Mobile menu toggle
    if (this.menuToggle) {
      this.menuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleMobileMenu();
      });
      
      // Keyboard support
      this.menuToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleMobileMenu();
        }
      });
    }
    
    // Close menu when clicking menu items
    if (this.navLinks) {
      this.navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
          this.closeMobileMenu();
        }
      });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isMenuOpen && !e.target.closest('.main-nav')) {
        this.closeMobileMenu();
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
      this.handleResize();
    });
    
    // Handle orientation change on mobile
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.handleResize();
      }, 100);
    });
  }
  
  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    
    if (this.navLinks) {
      this.navLinks.classList.toggle('show', this.isMenuOpen);
    }
    
    if (this.menuToggle) {
      this.menuToggle.setAttribute('aria-expanded', String(this.isMenuOpen));
      this.menuToggle.classList.toggle('active', this.isMenuOpen);
    }
    
    // Prevent body scroll when menu is open on mobile
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    
    // Add animation class
    if (this.navbar) {
      this.navbar.classList.toggle('menu-open', this.isMenuOpen);
    }
  }
  
  closeMobileMenu() {
    this.isMenuOpen = false;
    
    if (this.navLinks) {
      this.navLinks.classList.remove('show');
    }
    
    if (this.menuToggle) {
      this.menuToggle.setAttribute('aria-expanded', 'false');
      this.menuToggle.classList.remove('active');
    }
    
    if (this.navbar) {
      this.navbar.classList.remove('menu-open');
    }
    
    document.body.style.overflow = '';
  }
  
  handleResize() {
    const newBreakpoint = this.getCurrentBreakpoint();
    
    // Close mobile menu when switching to desktop
    if (newBreakpoint !== 'mobile' && this.isMenuOpen) {
      this.closeMobileMenu();
    }
    
    // Update navbar classes based on breakpoint
    this.updateNavbarClasses(newBreakpoint);
    
    // Adjust menu items visibility
    this.adjustMenuItems(newBreakpoint);
    
    this.currentBreakpoint = newBreakpoint;
  }
  
  updateNavbarClasses(breakpoint) {
    if (!this.navbar) return;
    
    // Remove all breakpoint classes
    this.navbar.classList.remove('mobile-nav', 'tablet-nav', 'desktop-nav', 'large-nav');
    
    // Add current breakpoint class
    this.navbar.classList.add(`${breakpoint}-nav`);
  }
  
  adjustMenuItems(breakpoint) {
    if (!this.navLinks) return;
    
    const menuItems = this.navLinks.querySelectorAll('a');
    
    switch (breakpoint) {
      case 'mobile':
        this.setupMobileLayout(menuItems);
        break;
      case 'tablet':
        this.setupTabletLayout(menuItems);
        break;
      case 'desktop':
      case 'large':
        this.setupDesktopLayout(menuItems);
        break;
    }
  }
  
  setupMobileLayout(menuItems) {
    // All items in mobile menu
    menuItems.forEach(item => {
      item.style.display = 'block';
    });
  }
  
  setupTabletLayout(menuItems) {
    // Show all items but with compact styling
    menuItems.forEach(item => {
      item.style.display = 'block';
    });
  }
  
  setupDesktopLayout(menuItems) {
    // Show all items horizontally
    menuItems.forEach(item => {
      item.style.display = 'block';
    });
  }
  
  setupStickyNavbar() {
    if (!this.header || !this.navbar) return;
    
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    const updateNavbar = () => {
      const scrollY = window.scrollY;
      const headerHeight = this.header.offsetHeight;
      
      if (scrollY > headerHeight) {
        this.navbar.classList.add('sticky');
      } else {
        this.navbar.classList.remove('sticky');
      }
      
      // Hide navbar on scroll down, show on scroll up (mobile only)
      if (this.currentBreakpoint === 'mobile') {
        if (scrollY > lastScrollY && scrollY > headerHeight) {
          this.navbar.classList.add('nav-hidden');
        } else {
          this.navbar.classList.remove('nav-hidden');
        }
      }
      
      lastScrollY = scrollY;
      ticking = false;
    };
    
    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', requestTick, { passive: true });
  }
}

class ResponsiveUtils {
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  static throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  
  static isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }
  
  static getViewportSize() {
    return {
      width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
      height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    };
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.responsiveNav = new ResponsiveNavigation();
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden && window.responsiveNav) {
    window.responsiveNav.closeMobileMenu();
  }
});

const navLinks = document.querySelector('.nav-links');
const menuToggle = document.querySelector('.menu-toggle');

(function(){
  const header = document.querySelector('.blue-header');
  const mainNav = document.querySelector('.main-nav');
  if(!header || !mainNav) return;

  let placeholder = null;

  function makePlaceholder(h){
    if(!placeholder){
      placeholder = document.createElement('div');
      placeholder.className = 'nav-placeholder';
      mainNav.parentNode.insertBefore(placeholder, mainNav.nextSibling);
    }
    placeholder.style.height = h + 'px';
  }

  function removePlaceholder(){
    if(placeholder && placeholder.parentNode){
      placeholder.parentNode.removeChild(placeholder);
      placeholder = null;
    }
  }

  function updateSticky(){
    const navH = Math.ceil(mainNav.getBoundingClientRect().height);
    const headerBottom = header.offsetTop + header.offsetHeight;
    const scrollY = window.scrollY || window.pageYOffset;

    if(scrollY >= headerBottom - navH){
      if(!mainNav.classList.contains('fixed')){
        mainNav.classList.add('fixed');
        makePlaceholder(navH);
      }
    } else {
      if(mainNav.classList.contains('fixed')){
        mainNav.classList.remove('fixed');
        removePlaceholder();
      }
    }
  }

  window.addEventListener('scroll', updateSticky, {passive:true});
  window.addEventListener('resize', updateSticky);
  updateSticky();
})();

if(menuToggle && navLinks){
  navLinks.classList.remove('show');
  menuToggle.setAttribute('aria-expanded', 'false');
  
  menuToggle.addEventListener('click', (e)=>{
    e.preventDefault();
    const isOpen = navLinks.classList.contains('show');
    
    if(isOpen){
      navLinks.classList.remove('show');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      navLinks.classList.add('show');
      menuToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  });

  document.addEventListener('click', (e)=>{
    if(!e.target.closest('.nav-wrapper') && navLinks.classList.contains('show')){
      navLinks.classList.remove('show');
      menuToggle.setAttribute('aria-expanded','false');
      document.body.style.overflow = '';
    }
  });

  navLinks.addEventListener('click', (e)=>{
    if(e.target.tagName === 'A'){
      navLinks.classList.remove('show');
      menuToggle.setAttribute('aria-expanded','false');
      document.body.style.overflow = '';
    }
  });

  menuToggle.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      menuToggle.click();
    }
  });
  
  window.addEventListener('resize', ()=>{
    if(window.innerWidth > 768 && navLinks.classList.contains('show')){
      navLinks.classList.remove('show');
      menuToggle.setAttribute('aria-expanded','false');
      document.body.style.overflow = '';
    }
  });
}

/* ===== Hero banner image controls ===== */
// Optional banner controls (only present in earlier layout)
const heroImage = document.querySelector('.hero-image');
const heroToggle = document.getElementById('hero-toggle');
const heroPanel = document.getElementById('hero-panel');
const heroUpload = document.getElementById('hero-upload');
const heroPreset = document.getElementById('hero-preset');
const heroApply = document.getElementById('hero-apply');
const heroReset = document.getElementById('hero-reset');

if(heroImage){
  const saved = localStorage.getItem('heroBannerSrc');
  if(saved){ heroImage.src = saved; }
}

if(heroToggle && heroPanel){
  heroToggle.addEventListener('click', ()=>{ heroPanel.hidden = !heroPanel.hidden; });
}

if(heroApply){
  heroApply.addEventListener('click', ()=>{
    if(heroUpload && heroUpload.files && heroUpload.files[0]){
      const file = heroUpload.files[0];
      const reader = new FileReader();
      reader.onload = function(e){ if(heroImage) heroImage.src = e.target.result; try{ localStorage.setItem('heroBannerSrc', e.target.result); }catch(e){} };
      reader.readAsDataURL(file);
    } else if(heroPreset && heroPreset.value){ if(heroImage) heroImage.src = heroPreset.value; try{ localStorage.setItem('heroBannerSrc', heroPreset.value); }catch(e){} }
    if(heroPanel) heroPanel.hidden = true;
  });
}

if(heroReset){
  heroReset.addEventListener('click', ()=>{
    const defaultSrc = 'asset/its.png'; if(heroImage) heroImage.src = defaultSrc; localStorage.removeItem('heroBannerSrc'); if(heroUpload) heroUpload.value = ''; if(heroPreset) heroPreset.value = ''; if(heroPanel) heroPanel.hidden = true;
  });
}

/* ===== Manual hero slider - optimized for performance ===== */
const slidesWrap = document.querySelector('.slides');
const slides = document.querySelectorAll('.slide');
const btnPrev = document.querySelector('.slider-arrow.prev');
const btnNext = document.querySelector('.slider-arrow.next');
let current = 0;
const total = slides.length;
const duration = 500;
let isTransitioning = false;

function goTo(index){
  if(!slidesWrap || isTransitioning || total === 0) return;
  
  if(index < 0){ index = total - 1; }
  if(index >= total){ index = 0; }
  
  if(index === current) return;
  
  isTransitioning = true;
  current = index;
  
  requestAnimationFrame(() => {
    slidesWrap.style.transition = `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    slidesWrap.style.transform = `translateX(-${current * 100}%)`;
    slidesWrap.setAttribute('data-current', String(current));
  });
  
  setTimeout(() => {
    isTransitioning = false;
  }, duration + 50);
}

function throttledGoTo(index) {
  if (!isTransitioning) {
    goTo(index);
  }
}

if(btnPrev){ 
  btnPrev.addEventListener('click', () => throttledGoTo(current - 1)); 
}
if(btnNext){ 
  btnNext.addEventListener('click', () => throttledGoTo(current + 1)); 
}

// Touch/Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

function handleTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
}

function handleTouchEnd(e) {
  touchEndX = e.changedTouches[0].screenX;
  touchEndY = e.changedTouches[0].screenY;
  handleSwipe();
}

function handleSwipe() {
  const swipeThreshold = 50;
  const swipeDistanceX = Math.abs(touchEndX - touchStartX);
  const swipeDistanceY = Math.abs(touchEndY - touchStartY);
  
  // Only trigger swipe if horizontal movement is greater than vertical
  if (swipeDistanceX > swipeDistanceY && swipeDistanceX > swipeThreshold) {
    if (touchEndX < touchStartX) {
      // Swipe left - next slide
      throttledGoTo(current + 1);
    }
    if (touchEndX > touchStartX) {
      // Swipe right - previous slide
      throttledGoTo(current - 1);
    }
  }
}

// Add touch events to slider
if (slidesWrap) {
  slidesWrap.addEventListener('touchstart', handleTouchStart, { passive: true });
  slidesWrap.addEventListener('touchend', handleTouchEnd, { passive: true });
}

let keyboardThrottle = false;
document.addEventListener('keydown', (e)=>{
  if(keyboardThrottle) return;
  
  if(e.key === 'ArrowLeft') {
    throttledGoTo(current - 1);
    keyboardThrottle = true;
    setTimeout(() => keyboardThrottle = false, 300);
  }
  if(e.key === 'ArrowRight') {
    throttledGoTo(current + 1);
    keyboardThrottle = true;
    setTimeout(() => keyboardThrottle = false, 300);
  }
});

function preloadSliderImages() {
  slides.forEach((slide, index) => {
    const img = slide.querySelector('img');
    if (img && img.src) {
      const preloadImg = new Image();
      preloadImg.src = img.src;
      
      preloadImg.onload = () => {
        img.style.opacity = '1';
      };
      
      preloadImg.onerror = () => {
        console.log('Image failed to load:', img.src);
        img.src = 'asset/logo.png';
        img.style.opacity = '1';
      };
    }
  });
}

function initializeSlider() {
  if(slidesWrap && slides.length > 0) {
    slidesWrap.style.transform = 'translateX(0%)';
    slidesWrap.setAttribute('data-current', '0');
    current = 0;
    preloadSliderImages();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSlider);
} else {
  initializeSlider();
}

// Show slider controls on pointer hover/move; keep touch toggle behavior
const heroSlider = document.querySelector('.hero-slider');
const heroSliderInner = document.querySelector('.hero-slider-inner');

if(heroSliderInner && heroSlider){
  const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);

  // Pointer devices: reveal on hover/mousemove and hide on leave
  heroSliderInner.addEventListener('mouseenter', ()=> heroSlider.classList.add('controls-visible'));
  heroSliderInner.addEventListener('mousemove', ()=> heroSlider.classList.add('controls-visible'));
  heroSliderInner.addEventListener('mouseleave', ()=> heroSlider.classList.remove('controls-visible'));

  // Touch devices: toggle controls on tap inside slider, hide on outside tap
  if(isTouch){
    heroSliderInner.addEventListener('click', (e)=>{
      if(e.target.closest('.slider-arrow')) return;
      heroSlider.classList.toggle('controls-visible');
    });

    document.addEventListener('click', (e)=>{
      if(!e.target.closest('.hero-slider-inner')){
        heroSlider.classList.remove('controls-visible');
      }
    });
  }
}
// Handle static dropdown menus (for pages that don't use dynamic menu generation) - REMOVED since no more dropdowns

// ===== ADDITIONAL RESPONSIVE ENHANCEMENTS =====

// Touch gesture support for mobile menu
class TouchGestureHandler {
  constructor() {
    this.startY = 0;
    this.currentY = 0;
    this.isScrolling = false;
    
    if (ResponsiveUtils.isTouchDevice()) {
      this.setupTouchEvents();
    }
  }
  
  setupTouchEvents() {
    const navLinks = document.querySelector('.nav-links');
    
    if (navLinks) {
      navLinks.addEventListener('touchstart', (e) => {
        this.startY = e.touches[0].clientY;
      }, { passive: true });
      
      navLinks.addEventListener('touchmove', (e) => {
        this.currentY = e.touches[0].clientY;
        const diff = this.startY - this.currentY;
        
        // Close menu on swipe up
        if (diff > 50 && window.responsiveNav) {
          window.responsiveNav.closeMobileMenu();
        }
      }, { passive: true });
    }
  }
}

// Viewport height fix for mobile browsers
class ViewportFix {
  constructor() {
    this.updateViewportHeight();
    window.addEventListener('resize', ResponsiveUtils.debounce(() => {
      this.updateViewportHeight();
    }, 100));
  }
  
  updateViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
}

// Performance optimization for scroll events
class ScrollOptimizer {
  constructor() {
    this.ticking = false;
    this.setupOptimizedScroll();
  }
  
  setupOptimizedScroll() {
    const handleScroll = () => {
      if (!this.ticking) {
        requestAnimationFrame(() => {
          // Custom scroll handling here
          this.ticking = false;
        });
        this.ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
  }
}

// Accessibility enhancements
class AccessibilityEnhancer {
  constructor() {
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupScreenReaderSupport();
  }
  
  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      const navLinks = document.querySelector('.nav-links');
      const menuToggle = document.querySelector('.menu-toggle');
      
      // Escape key closes mobile menu
      if (e.key === 'Escape' && window.responsiveNav) {
        window.responsiveNav.closeMobileMenu();
      }
      
      // Tab navigation within mobile menu
      if (e.key === 'Tab' && navLinks && navLinks.classList.contains('show')) {
        const focusableElements = navLinks.querySelectorAll('a');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
  }
  
  setupFocusManagement() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
      // Focus first menu item when mobile menu opens
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            if (navLinks.classList.contains('show')) {
              const firstLink = navLinks.querySelector('a');
              if (firstLink) {
                setTimeout(() => firstLink.focus(), 100);
              }
            }
          }
        });
      });
      
      observer.observe(navLinks, { attributes: true });
    }
  }
  
  setupScreenReaderSupport() {
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (menuToggle) {
      // Add screen reader text
      const srText = document.createElement('span');
      srText.className = 'sr-only';
      srText.textContent = 'Toggle navigation menu';
      menuToggle.appendChild(srText);
    }
  }
}

// Initialize all enhancements
document.addEventListener('DOMContentLoaded', () => {
  new TouchGestureHandler();
  new ViewportFix();
  new ScrollOptimizer();
  new AccessibilityEnhancer();
});

// Handle network status changes
window.addEventListener('online', () => {
  document.body.classList.remove('offline');
});

window.addEventListener('offline', () => {
  document.body.classList.add('offline');
});

// Preload critical resources
const preloadCriticalResources = () => {
  const criticalImages = document.querySelectorAll('img[data-critical]');
  criticalImages.forEach(img => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = img.src;
    document.head.appendChild(link);
  });
};

// Initialize preloading
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', preloadCriticalResources);
} else {
  preloadCriticalResources();
}