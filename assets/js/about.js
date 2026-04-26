/* about.js — Renders experience, education, skills for About page */
(function () {

  /* ── Experience ──────────────────────────────────────────── */
  const expData = [
    {
      title: "ML Engineer (NLP Research)",
      company: "AI/ML Co-op, Computational Social Science Lab, Drexel University, PA, USA",
      period: "Sep 2025 — Mar 2026",
      desc: "Driving large-scale ML research focused on modeling online community behavior, toxicity dynamics, and lifecycle patterns using advanced NLP and statistical learning. Designed end-to-end data pipelines to process and analyze 200GB+ of Reddit data.",
      bullets: [
        "Architected scalable data pipelines to process 500k+ unstructured Reddit dataset using Python",
        "Applied transformer-based NLP models (Hugging Face, DeBERTa) and Detoxify for toxicity classification across millions of records",
        "Engineered features including sentiment distributions, toxicity scores, and temporal engagement metrics",
        "Performed statistical modeling and EDA to uncover trends in community growth and moderation impact",
        "Developed automated workflows for data collection via APIs on Linux HPC environments",
        "Collaborated with interdisciplinary teams to translate ML outputs into interpretable research insights"
      ]
    },
    {
      title: "Software Engineer (ML, Data & Backend Systems)",
      company: "Mobileum Technologies, India",
      period: "Oct 2021 — Dec 2024",
      desc: "Built data-driven systems and intelligent automation for large-scale telecom analytics platforms, combining data engineering, ML concepts, and distributed system operations. Delivered 23% reduction in network congestion and maintained 98.8% production uptime.",
      bullets: [
        "Designed anomaly detection solutions using Python, SQL, and statistical techniques, reduced network congestion by 23%",
        "Processed and analyzed large-scale telecom datasets (millions of events/day) for user behavior and network performance insights",
        "Developed robust data pipelines and ETL automation scripts using Python and Bash",
        "Integrated ML-based targeting logic into CRM platforms, improving campaign effectiveness for 100K+ users in EMEA",
        "Led production server migrations across Linux and Solaris environments, ensuring 98.8% uptime",
        "Handled L2/L3 incidents with deep root cause analysis in distributed systems"
      ]
    }
  ];

  const expList = document.getElementById('exp-list');
  if (expList) {
    expList.innerHTML = expData.map(e => `
      <div class="exp-item">
        <div class="exp-header">
          <div>
            <div class="exp-title">${e.title}</div>
            <div class="exp-company">${e.company}</div>
          </div>
          <div class="exp-period">${e.period}</div>
        </div>
        <div class="exp-desc">${e.desc}</div>
        <div class="exp-bullets">
          ${e.bullets.map(b => `<div class="exp-bullet">${b}</div>`).join('')}
        </div>
      </div>
    `).join('');
  }

  /* ── Education ───────────────────────────────────────────── */
  const eduData = [
    {
      degree: "Master of Science in Artificial Intelligence and Machine Learning",
      school: "Drexel University, PA, USA",
      period: "Graduated March 2026",
      logo: "https://1000logos.net/wp-content/uploads/2024/07/Drexel-University-Logo.png"
    },
    {
      degree: "Bachelor of Technology, Information Technology",
      school: "Krishna Institute of Engineering and Technology, Ghaziabad, India",
      period: "Graduated July 2021",
      logo: "https://www.kiet.edu/assets/images/logo/KIET-Logo.jpg"
    }
  ];

  const eduList = document.getElementById('edu-list');
  if (eduList) {
    eduList.innerHTML = eduData.map(e => `
      <div class="edu-item">
        <img class="edu-logo" src="${e.logo}" alt="${e.school}" loading="lazy"
          onerror="this.style.display='none'">
        <div>
          <div class="edu-degree">${e.degree}</div>
          <div class="edu-school">${e.school}</div>
          <div class="edu-period">${e.period}</div>
        </div>
      </div>
    `).join('');
  }

  /* ── Skills ──────────────────────────────────────────────── */
  const skillsData = [
    {
      label: "Programming Languages",
      tags: ["Python", "SQL", "R", "Java", "Bash", "C/C++"]
    },
    {
      label: "ML / DL Frameworks",
      tags: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "XGBoost", "LightGBM", "Hugging Face Transformers", "LangChain", "LlamaIndex"]
    },
    {
      label: "Tools & Platforms",
      tags: ["AWS SageMaker", "AWS Lambda", "AWS S3", "AWS EC2", "Azure ML Studio", "Google Cloud Vertex AI", "Apache Spark", "PySpark", "Kafka", "Databricks", "Snowflake", "Docker", "Kubernetes", "Airflow", "MLflow", "GitHub Actions", "Jenkins"]
    },
    {
      label: "Data & Analytics",
      tags: ["FAISS", "Pinecone", "Chroma", "Tableau", "Power BI", "Plotly", "Matplotlib", "Pandas", "NumPy"]
    },
    {
      label: "Core Competencies",
      tags: ["RAG (Retrieval-Augmented Generation)", "Prompt Engineering", "MLOps", "CI/CD", "Feature Engineering", "Statistical Modeling", "A/B Testing", "Transformers / BERT / GPT", "Time Series Forecasting", "Explainable AI (SHAP, LIME)", "Data Pipelines", "Bayesian Modeling"]
    }
  ];

  const skillsList = document.getElementById('skills-list');
  if (skillsList) {
    skillsList.innerHTML = skillsData.map(cat => `
      <div>
        <div class="skill-cat-label">${cat.label}</div>
        <div class="skill-tags">
          ${cat.tags.map(t => `<span class="skill-tag">${t}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

})();
