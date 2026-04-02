/* works.js — Renders project cards from projects.json */
(function () {
  const grid = document.getElementById('works-grid');
  if (!grid) return;

  const projects = [
    {
      title: "Sentiment Analysis Web App with AWS SageMaker",
      description: "A web app for determining movie review sentiment using AWS SageMaker. Deploys a trained model via SageMaker, uses AWS Lambda and API Gateway for real-time positive/negative sentiment prediction on IMDB reviews.",
      category: "Machine Learning",
      technologies: ["Python", "AWS SageMaker", "AWS Lambda", "API Gateway", "HTML"],
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=900&h=600&q=80&fit=crop",
      github: "https://github.com/ShobhitDixit98/Sentiment-Analysis-Web-App-with-AWS-SageMaker",
      featured: true
    },
    {
      title: "YOLOv10 — Real-Time Object Detection",
      description: "Implementation of YOLOv10 for real-time end-to-end object detection with NMS-free training. Achieves state-of-the-art performance across model scales from Nano to Extra-Large.",
      category: "Computer Vision",
      technologies: ["Python", "PyTorch", "YOLO", "OpenCV"],
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&h=600&q=80&fit=crop",
      github: "https://github.com/ShobhitDixit98/YOLOv10-Real-Time-Object-Detection",
      featured: false
    },
    {
      title: "E2E DevOps Microservices Pipeline with Kubernetes",
      description: "Complete end-to-end DevOps automation pipeline for deploying microservices using Terraform, Ansible, Docker, and Kubernetes with CI/CD via GitHub Actions.",
      category: "DevOps / MLOps",
      technologies: ["Terraform", "Docker", "Kubernetes", "GitHub Actions"],
      image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=900&h=600&q=80&fit=crop",
      github: "https://github.com/ShobhitDixit98/E2E-DevOps-Microservices-Pipeline-with-Kubernetes",
      featured: false
    },
    {
      title: "NLP Text Analysis Tool with Streamlit",
      description: "Interactive NLP analysis tool featuring sentiment analysis, NER, word cloud generation, and POS tagging with fully customizable parameters.",
      category: "NLP",
      technologies: ["Python", "Streamlit", "spaCy", "NLP"],
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&h=600&q=80&fit=crop",
      github: "https://github.com/ShobhitDixit98/Text-Analysis-Using-NLP-with-Streamlit",
      featured: false
    },
    {
      title: "Data Science IPython Notebooks",
      description: "A comprehensive reference collection of ML/DL notebooks covering deep learning (TensorFlow, Keras), scikit-learn, SciPy, Spark, MapReduce, and AWS.",
      category: "Data Science",
      technologies: ["Python", "TensorFlow", "scikit-learn", "Spark"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=600&q=80&fit=crop",
      github: "https://github.com/ShobhitDixit98/Data-Science-IPython-Notebooks",
      featured: false
    }
  ];

  projects.forEach((p, i) => {
    const num = String(i + 1).padStart(2, '0');
    const isFeatured = p.featured ? 'featured' : '';

    const tagsHtml = p.technologies.map(t =>
      `<span class="work-tag">${t}</span>`
    ).join('');

    const cardHtml = `
      <div class="work-card ${isFeatured}">
        <img class="work-card-img" src="${p.image}" alt="${p.title}" loading="lazy">
        <div class="work-card-overlay">
          <div class="work-card-num">${num} ${p.category.toUpperCase()}</div>
          <div class="work-card-title">${p.title}</div>
          <div class="work-card-desc">${p.description}</div>
          <div class="work-card-tags">${tagsHtml}</div>
          ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener" class="work-card-link"><i class="fab fa-github"></i> View on GitHub</a>` : ''}
        </div>
      </div>
    `;
    grid.insertAdjacentHTML('beforeend', cardHtml);
  });
})();
