// TinyURL API endpoint (you might want to replace this with your own URL shortening service)

const SHORTENER_API = 'https://tinyurl.com/api-create.php?url=';

class LinkMagic {

  constructor() {

    // Existing elements

    this.urlInput = document.getElementById('urlInput');

    this.convertBtn = document.getElementById('convertBtn');

    this.results = document.getElementById('results');

    this.shortUrl = document.getElementById('shortUrl');

    this.qrCode = document.getElementById('qrCode');

    this.downloadQR = document.getElementById('downloadQR');

    // New image upload elements

    this.imageInput = document.getElementById('imageInput');

    this.uploadBtn = document.getElementById('uploadBtn');

    this.imagePreview = document.getElementById('imagePreview');

    this.previewImg = document.getElementById('previewImg');

    this.imageInfo = document.getElementById('imageInfo');

    this.imageUrl = document.getElementById('imageUrl');

    this.imagePath = document.getElementById('imagePath');

    // New music upload elements

    this.musicInput = document.getElementById('musicInput');

    this.uploadMusicBtn = document.getElementById('uploadMusicBtn');

    this.musicPreview = document.getElementById('musicPreview');

    this.previewAudio = document.getElementById('previewAudio');

    this.musicInfo = document.getElementById('musicInfo');

    this.musicUrl = document.getElementById('musicUrl');

    this.musicPath = document.getElementById('musicPath');

    // New video elements

    this.videoInput = document.getElementById('videoInput');

    this.convertVideoBtn = document.getElementById('convertVideoBtn');

    this.videoPreview = document.getElementById('videoPreview');

    this.videoContainer = document.getElementById('videoContainer');

    this.videoEmbed = document.getElementById('videoEmbed');

    this.setupEventListeners();

  }

  setupEventListeners() {

    // Existing event listeners

    this.convertBtn.addEventListener('click', () => this.handleConvert());

    this.downloadQR.addEventListener('click', () => this.handleDownload());

    document.querySelectorAll('.copy-btn').forEach(btn => {

      btn.addEventListener('click', (e) => this.handleCopy(e));

    });

    // New image upload event listeners

    this.uploadBtn.addEventListener('click', () => this.handleImageUpload());

    this.imageInput.addEventListener('change', (e) => this.handleImagePreview(e));

    // New music upload event listeners

    this.uploadMusicBtn.addEventListener('click', () => this.handleMusicUpload());

    this.musicInput.addEventListener('change', (e) => this.handleMusicPreview(e));

    // New video event listeners

    this.convertVideoBtn.addEventListener('click', () => this.handleVideoConvert());

  }

  async handleConvert() {

    const url = this.urlInput.value.trim();

    

    if (!this.isValidUrl(url)) {

      this.showError('Please enter a valid URL');

      return;

    }

    try {

      this.convertBtn.disabled = true;

      this.convertBtn.textContent = 'Converting...';

      // Get shortened URL

      const shortUrl = await this.shortenUrl(url);

      this.shortUrl.value = shortUrl;

      // Generate QR Code

      this.generateQRCode(shortUrl);

      // Show results

      this.results.classList.remove('hidden');

      this.results.style.animation = 'fadeIn 0.5s ease';

    } catch (error) {

      this.showError('An error occurred. Please try again.');

    } finally {

      this.convertBtn.disabled = false;

      this.convertBtn.textContent = 'Convert';

    }

  }

  async handleImageUpload() {

    const file = this.imageInput.files[0];

    if (!file) {

      this.showError('Please select an image to upload');

      return;

    }

    if (!file.type.startsWith('image/')) {

      this.showError('Please select a valid image file');

      return;

    }

    try {

      this.uploadBtn.disabled = true;

      this.uploadBtn.textContent = 'Uploading...';

      // In a real application, you would upload the image to a server here

      // For this demo, we'll create object URLs

      const imageUrl = URL.createObjectURL(file);

      const imagePath = file.name;

      this.imageUrl.value = imageUrl;

      this.imagePath.value = imagePath;

      this.imageInfo.classList.remove('hidden');

      // Animate the info appearance

      this.imageInfo.style.animation = 'fadeIn 0.5s ease';

    } catch (error) {

      this.showError('An error occurred while uploading the image');

    } finally {

      this.uploadBtn.disabled = false;

      this.uploadBtn.textContent = 'Upload';

    }

  }

  handleImagePreview(e) {

    const file = e.target.files[0];

    if (file) {

      const reader = new FileReader();

      reader.onload = (e) => {

        this.previewImg.src = e.target.result;

        this.imagePreview.classList.remove('hidden');

        this.imageInfo.classList.add('hidden');

      };

      reader.readAsDataURL(file);

    }

  }

  async handleMusicUpload() {

    const file = this.musicInput.files[0];

    if (!file) {

      this.showError('Please select a music file to upload');

      return;

    }

    if (!file.type.startsWith('audio/')) {

      this.showError('Please select a valid audio file');

      return;

    }

    try {

      this.uploadMusicBtn.disabled = true;

      this.uploadMusicBtn.textContent = 'Uploading...';

      // In a real application, you would upload the music to a server here

      // For this demo, we'll create object URLs

      const musicUrl = URL.createObjectURL(file);

      const musicPath = file.name;

      this.musicUrl.value = musicUrl;

      this.musicPath.value = musicPath;

      this.musicInfo.classList.remove('hidden');

      // Animate the info appearance

      this.musicInfo.style.animation = 'fadeIn 0.5s ease';

    } catch (error) {

      this.showError('An error occurred while uploading the music file');

    } finally {

      this.uploadMusicBtn.disabled = false;

      this.uploadMusicBtn.textContent = 'Upload';

    }

  }

  handleMusicPreview(e) {

    const file = e.target.files[0];

    if (file) {

      const reader = new FileReader();

      reader.onload = (e) => {

        this.previewAudio.src = e.target.result;

        this.musicPreview.classList.remove('hidden');

        this.musicInfo.classList.add('hidden');

      };

      reader.readAsDataURL(file);

    }

  }

  async handleVideoConvert() {

    const url = this.videoInput.value.trim();

    

    if (!this.isValidUrl(url)) {

      this.showError('Please enter a valid video URL');

      return;

    }

    try {

      this.convertVideoBtn.disabled = true;

      this.convertVideoBtn.textContent = 'Processing...';

      const videoId = this.extractVideoId(url);

      if (!videoId) {

        throw new Error('Invalid video URL');

      }

      const embedUrl = `https://www.youtube.com/embed/${videoId}`;

      const iframe = `<iframe src="${embedUrl}" frameborder="0" allowfullscreen></iframe>`;

      this.videoContainer.innerHTML = iframe;

      this.videoEmbed.value = iframe;

      this.videoPreview.classList.remove('hidden');

      this.videoPreview.style.animation = 'fadeIn 0.5s ease';

    } catch (error) {

      this.showError('Failed to process video URL');

    } finally {

      this.convertVideoBtn.disabled = false;

      this.convertVideoBtn.textContent = 'Process';

    }

  }

  extractVideoId(url) {

    try {

      const urlObj = new URL(url);

      if (urlObj.hostname.includes('youtube.com')) {

        return urlObj.searchParams.get('v');

      } else if (urlObj.hostname.includes('youtu.be')) {

        return urlObj.pathname.slice(1);

      }

    } catch {

      return null;

    }

    return null;

  }

  isValidUrl(url) {

    try {

      new URL(url);

      return true;

    } catch {

      return false;

    }

  }

  async shortenUrl(url) {

    const response = await fetch(`${SHORTENER_API}${encodeURIComponent(url)}`);

    if (!response.ok) throw new Error('Failed to shorten URL');

    return await response.text();

  }

  generateQRCode(url) {

    this.qrCode.innerHTML = '';

    new QRCode(this.qrCode, {

      text: url,

      width: 200,

      height: 200,

      colorDark: '#000000',

      colorLight: '#ffffff',

      correctLevel: QRCode.CorrectLevel.H

    });

  }

  handleDownload() {

    const canvas = this.qrCode.querySelector('canvas');

    const image = canvas.toDataURL('image/png');

    const link = document.createElement('a');

    link.href = image;

    link.download = 'qr-code.png';

    link.click();

  }

  async handleCopy(e) {

    const targetId = e.target.dataset.target;

    const input = document.getElementById(targetId);

    

    try {

      await navigator.clipboard.writeText(input.value);

      const originalText = e.target.textContent;

      e.target.textContent = 'Copied!';

      setTimeout(() => {

        e.target.textContent = originalText;

      }, 2000);

    } catch (err) {

      this.showError('Failed to copy text');

    }

  }

  showError(message) {

    // You could enhance this with a proper toast notification system

    alert(message);

  }

}

class ThemeManager {

  constructor() {

    this.themeToggle = document.getElementById('themeToggle');

    this.theme = localStorage.getItem('theme') || 'light';

    

    this.init();

  }

  init() {

    document.documentElement.setAttribute('data-theme', this.theme);

    

    this.themeToggle.addEventListener('click', () => {

      this.theme = this.theme === 'light' ? 'dark' : 'light';

      document.documentElement.setAttribute('data-theme', this.theme);

      localStorage.setItem('theme', this.theme);

      

      // Animate the transition

      document.documentElement.style.transition = 'all 0.3s ease';

      setTimeout(() => {

        document.documentElement.style.transition = '';

      }, 300);

    });

  }

}

class BackgroundEffect {

  constructor() {

    this.background = document.querySelector('.background');

    this.starsContainer = document.createElement('div');

    this.starsContainer.className = 'stars';

    this.background.appendChild(this.starsContainer);

    

    this.createStars(100);  // Increased to 100 stars

    this.createCircles(40);  // Increased to 40 circles

    window.addEventListener('mousemove', (e) => {

      const mouseX = e.clientX / window.innerWidth - 0.5;

      const mouseY = e.clientY / window.innerHeight - 0.5;

      

      this.starsContainer.style.transform = `

        perspective(1000px)

        rotateX(${mouseY * 10}deg)

        rotateY(${mouseX * 10}deg)

      `;

    });

  }

  createStars(count) {

    for (let i = 0; i < count; i++) {

      const star = document.createElement('div');

      star.className = 'star';

      

      // Enhanced random properties for more varied motion

      const size = Math.random() * 6 + 2;

      const duration = Math.random() * 4 + 3;

      const x = (Math.random() - 0.5) * 300;

      const y = (Math.random() - 0.5) * 300;

      

      star.style.cssText = `

        width: ${size}px;

        height: ${size}px;

        left: ${Math.random() * 100}%;

        top: ${Math.random() * 100}%;

        --duration: ${duration}s;

        --x: ${x}px;

        --y: ${y}px;

      `;

      

      this.starsContainer.appendChild(star);

    }

  }

  createCircles(count) {

    for (let i = 0; i < count; i++) {

      const circle = document.createElement('div');

      circle.className = 'circle';

      

      // Enhanced random properties for more varied motion

      const size = Math.random() * 60 + 20;

      const duration = Math.random() * 5 + 4;

      const x = (Math.random() - 0.5) * 400;

      const y = (Math.random() - 0.5) * 400;

      

      circle.style.cssText = `

        width: ${size}px;

        height: ${size}px;

        left: ${Math.random() * 100}%;

        top: ${Math.random() * 100}%;

        --duration: ${duration}s;

        --x: ${x}px;

        --y: ${y}px;

      `;

      

      this.starsContainer.appendChild(circle);

    }

  }

}

// Initialize the app

document.addEventListener('DOMContentLoaded', () => {

  new ThemeManager();

  new LinkMagic();

  new BackgroundEffect();

});

// Add some CSS animations

const style = document.createElement('style');

style.textContent = `

  @keyframes fadeIn {

    from {

      opacity: 0;

      transform: translateY(10px);

    }

    to {

      opacity: 1;

      transform: translateY(0);

    }

  }

`;

document.head.appendChild(style);