// Simple data hub for portfolio cards
const portfolioData = [
  {
    id: 1,
    title: "Kin & Co Website",
    excerpt: "A responsive website project demonstrating layout and design skills.",
    image: "assets/images/project1.jpg",
    tags: ["HTML", "CSS", "JS"],
    category: "dev",
    link: "https://kinandco.com/"
  },
  {
    id: 5,
    title: "Fusion Brand Identity",
    excerpt: "A complete branding package including logo, color palette, and typography for a fictional tech startup.",
    // IMPORTANT: Replace with your actual image filename
    image: "assets/images/designs/branding.jpg",
    tags: ["Branding", "Logo Design", "UI"],
    category: "design",
    link: "https://drive.google.com/drive/folders/1CgHsvLGQdMBdJhbQ38v-ONLElvS7JqBz?usp=drive_link"
  },
  {
    id: 6,
    title: "Urban Marketing Campaign",
    excerpt: "A series of digital and print assets for a new fashion product launch, focusing on a modern, edgy aesthetic.",
    // IMPORTANT: Replace with your actual image filename
    image: "assets/images/designs/marketing.jpg",
    tags: ["Marketing", "Illustration", "Print"],
    category: "design",
    link: "https://drive.google.com/drive/folders/1CgHsvLGQdMBdJhbQ38v-ONLElvS7JqBz?usp=drive_link"
  },
  {
    id: 7,
    title: "Scannable Digital Card",
    excerpt: "A custom QR code design. When scanned, it instantly displays my full contact details and portfolio.",
    image: "assets/images/designs/barcode.jpg",
    tags: ["Interactive", "Branding"],
    category: "design",
    link: "https://drive.google.com/drive/folders/1CgHsvLGQdMBdJhbQ38v-ONLElvS7JqBz?usp=drive_link"
  }
];

// Export if used as module (simple approach for inline script usage)
window.portfolioData = portfolioData;