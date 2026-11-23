// Ask Ayush Knowledge Base & AI Agent Logic
(function () {
  'use strict';

  // --- Theme Management ---
  const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  if (currentTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  window.toggleTheme = function () {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
  };

  // --- Recruiter Mode Management ---
  let recruiterMode = localStorage.getItem('recruiterMode') === 'true';

  window.updateRecruiterModeUI = function () {
    const toggle = document.getElementById('recruiter-toggle');
    const indicator = document.getElementById('recruiter-indicator');
    if (toggle) toggle.setAttribute('aria-checked', recruiterMode ? 'true' : 'false');
    if (indicator) {
      if (recruiterMode) {
        indicator.classList.remove('translate-x-0');
        indicator.classList.add('translate-x-5');
      } else {
        indicator.classList.remove('translate-x-5');
        indicator.classList.add('translate-x-0');
      }
    }

    // Toggle body class which controls hiding top menu tabs and non-recruiter sections
    if (recruiterMode) {
      document.body.classList.add('recruiter-active');
    } else {
      document.body.classList.remove('recruiter-active');
    }

    // Update profile photo: profile-1.png in recruiter mode, profile-2.jpg in standard mode
    const profileImg = document.getElementById('profile-img');
    if (profileImg) {
      const targetSrc = recruiterMode ? 'res/profile-1.png' : 'res/profile-2.jpg';
      if (!profileImg.src.endsWith(targetSrc)) {
        profileImg.style.opacity = '0.4';
        setTimeout(() => {
          profileImg.src = targetSrc;
          profileImg.style.opacity = '1';
        }, 150);
      }
    }

    renderSuggestedQuestions();
  };

  window.toggleRecruiterMode = function () {
    recruiterMode = !recruiterMode;
    localStorage.setItem('recruiterMode', recruiterMode ? 'true' : 'false');
    window.updateRecruiterModeUI();
  };

  // --- Ayush Sharma Resume Knowledge Base ---
  const RESUME_KNOWLEDGE = {
    profile: {
      name: "Ayush Sharma",
      title: "Lead AI Engineer · IBM Software Labs | SRE & Cloud Architect",
      location: "Gurgaon, Haryana, India",
      linkedin: "https://linkedin.com/in/ayush-sharma97",
      github: "https://github.com/itsayushs",
      education: "B.Tech in Information Technology from Manipal University Jaipur (2015-2019)",
      experienceYears: "7+ years",
      publication: "IEEE 2018: Analysis and Improvements on Current Pothole Detection Techniques (ICSCEE)"
    },
    experience: [
      {
        company: "IBM Software Labs",
        role: "Lead AI Engineer",
        period: "Aug 2026 – Present",
        location: "Gurgaon, IN",
        highlights: [] // No description for current role as requested
      },
      {
        company: "Cvent",
        role: "Sr. Site Reliability Engineer",
        period: "Jan 2024 – Aug 2026",
        location: "Gurgaon, IN",
        highlights: [
          "Spearheaded management of self-hosted Continuous Delivery platform Octopus Deploy for ~200 daily deployments across ECS Fargate microservices and legacy .NET monoliths.",
          "Designed & deployed Model Context Protocol (FastMCP with Auth + User Elicitation) servers integrated with Octopus Deploy to streamline release workflows.",
          "Implemented multi-cluster Kubernetes deployments with GPU-enabled nodes using ArgoCD and Karpenter + KEDA for AI workloads, achieving ~99.95% deployment reliability with zero-downtime rollouts.",
          "Built RAG pipeline using Docling, ChromaDB, and AWS Bedrock (Python SDK) to access system runbooks, postmortems, and compliance docs, cutting L2 escalations by ~25%.",
          "Introduced K8sGPT AI diagnostics for Kubernetes clusters, slashing incident triage time by 30–40%.",
          "Embedded as SRE across 4+ cross-functional teams (TS, Java, .NET), reducing MTTR by 35% and high-severity incidents by 40%, keeping service uptime at 99.99%. Mentored 15+ engineers.",
          "Led POC integrating AI-assisted troubleshooting with n8n workflows and AI agents for Slack CI/CD triage.",
          "Introduced Crossplane as a Kubernetes control plane for cloud infra, reducing environment provisioning from ~1 day to <1 hour.",
          "Organization-wide DORA metrics tracking via Jenkins, Octopus Deploy, and Datadog across 750+ services and 55+ teams (20% reduction in change failure rate)."
        ]
      },
      {
        company: "IBM",
        role: "Site Reliability Engineer",
        period: "May 2021 – Dec 2023",
        location: "Gurgaon, IN",
        highlights: [
          "Multi-cloud distributed system transformations for banking & aviation clients, cutting system downtime by 30%.",
          "Designed reusable Terraform modules across AWS, IBM Cloud, and Azure with GitOps compliance.",
          "Observability for 1500+ node HPC cluster (SLIs/SLOs, LogDNA, Grafana, InfluxDB), reducing issue detection time by 35% and boosting cluster reliability by 20%.",
          "Automated operations using Ansible, Python, and Bash with ChatOps-based self-healing infra.",
          "Optimized enterprise OpenShift clusters, resolving a network bottleneck on AI workloads and reducing pod startup latency by ~25%.",
          "Accelerated AWS EKS deployments by optimizing Helm chart architecture, reducing deployment time by 40% and increasing release frequency by 25%."
        ]
      },
      {
        company: "Bristlecone",
        role: "Associate Cloud Engineer",
        period: "May 2019 – Apr 2021",
        location: "Noida, IN",
        highlights: [
          "Modernized monolithic Java applications to cloud-native serverless architecture using TypeScript (50% scalability boost, 30% lower maintenance overhead).",
          "Hands-on public cloud orchestration across AWS EC2, EKS Fargate, WAF, IAM, Route53, Lambda, VPC, S3, SQS, SNS, Secrets Manager, CloudWatch.",
          "Led cloud migration from AWS to Rackspace OpenStack (25% faster provisioning, self-service platform).",
          "Automated AWS infra provisioning with Terraform, Pulumi, and boto3 (-85% deployment time).",
          "Built end-to-end CI/CD with GitHub Actions & Jenkins to Kubernetes and AWS Lambda (2x velocity)."
        ]
      },
      {
        company: "ATMCES Technologies",
        role: "Software Engineer Trainee",
        period: "Jan 2019 – May 2019",
        location: "Hyderabad, IN",
        highlights: [
          "Developed RESTful API on Python Flask & MongoDB for dashboard application.",
          "Containerized full stack using Docker & Docker Compose.",
          "Automated CI pipeline in Jenkins with PyLint and PyTest coverage."
        ]
      }
    ],
    certifications: [
      "Microsoft: Azure Solutions Architect Expert (AZ-305)",
      "Microsoft: DevOps Engineer Expert (AZ-400)",
      "Microsoft: Azure Administrator Associate (AZ-104) [ID: 990145023]",
      "CNCF: Certified Kubernetes Administrator (CKA v1.18) [ID: LF-gx7ubca7qa]",
      "Red Hat: Certified Specialist in OpenShift Administration (EX280)",
      "Red Hat: Certified Specialist in Ansible Automation (EX407)",
      "Red Hat: RHCE / RHCSA v7.3 [ID: 180-008-328]",
      "HashiCorp: Certified Terraform Associate (v002)",
      "Amazon: AWS Certified Cloud Practitioner (CLF-C01) [ID: 3F06YYZ2YFEQ1K9T]"
    ],
    skills: {
      ai_systems: ["Mastra Multi-Agent Systems", "Agentic AI", "Model Context Protocol (FastMCP)", "RAG Pipelines", "pgvector", "AWS Bedrock", "LangChain", "ChromaDB", "Agent Evals", "K8sGPT"],
      languages: ["TypeScript", "Python", "Bash", "Go", "SQL", "YAML"],
      cloud: ["AWS", "Azure", "IBM Cloud", "GCP", "OpenStack"],
      containers: ["Kubernetes (Helm, ArgoCD, Karpenter, KEDA)", "OpenShift", "Docker", "Docker Compose"],
      observability: ["Datadog (Agent Traces & Evals)", "Prometheus", "Grafana", "LogDNA", "InfluxDB", "OpenTelemetry", "DORA Metrics"],
      devops: ["Octopus Deploy", "Terraform", "Crossplane", "Pulumi", "Ansible", "Jenkins", "GitHub Actions", "GitLab CI", "Azure DevOps"]
    }
  };

  // --- Suggested Questions for Normal vs Recruiter Mode ---
  const NORMAL_QUESTIONS = [
    "What is Ayush's current role at IBM Software Labs?",
    "Tell me about his Mastra Multi-Agent SRE platform",
    "What is his experience with Kubernetes & GPU workloads?",
    "How does he bridge AI Engineering and SRE?",
    "How can I contact Ayush?"
  ];

  const RECRUITER_QUESTIONS = [
    "Summarize Ayush's 7+ years of experience in 3 lines",
    "What are his key certifications?",
    "What is his strongest AI & SRE project?",
    "What scale and reliability numbers has he achieved?",
    "How do I reach out to hire him?"
  ];

  function renderSuggestedQuestions() {
    const list = document.getElementById('suggested-questions-list');
    if (!list) return;
    const questions = recruiterMode ? RECRUITER_QUESTIONS : NORMAL_QUESTIONS;
    list.innerHTML = '';
    questions.forEach(q => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'w-full text-left rounded-full border border-[var(--rule)] px-3.5 py-2 text-[13.5px] text-[var(--ink2)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--card)]';
      btn.textContent = q;
      btn.onclick = () => sendUserQuestion(q, true);
      li.appendChild(btn);
      list.appendChild(li);
    });
  }

  // --- Dialog & Chat State ---
  let chatHistory = [];
  let isStreaming = false;
  let remainingDaily = 30;

  window.openAskAyush = function () {
    const dialog = document.getElementById('ask-dialog');
    if (dialog && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = 'hidden';
      renderSuggestedQuestions();
      setTimeout(() => {
        const input = document.getElementById('ask-input');
        if (input) input.focus();
      }, 50);
    }
  };

  window.closeAskAyush = function () {
    const dialog = document.getElementById('ask-dialog');
    if (dialog && dialog.open) {
      dialog.close();
      document.documentElement.style.overflow = '';
    }
  };

  window.clearAskAyush = function () {
    chatHistory = [];
    const container = document.getElementById('chat-messages');
    if (container) container.innerHTML = '';
    const emptyState = document.getElementById('ask-empty-state');
    if (emptyState) emptyState.style.display = 'block';
    const newChatBtn = document.getElementById('new-chat-btn');
    if (newChatBtn) newChatBtn.style.display = 'none';
    const input = document.getElementById('ask-input');
    if (input) {
      input.value = '';
      input.focus();
    }
  };

  // Keyboard shortcut: ⌘K or Ctrl+K to toggle
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const dialog = document.getElementById('ask-dialog');
      if (dialog && dialog.open) {
        closeAskAyush();
      } else {
        openAskAyush();
      }
    }
  });

  // --- Smart Local AI Knowledge Matcher & Streamer ---
  function generateAnswer(query) {
    const q = query.toLowerCase();
    let contactCTA = false;
    let answer = "";

    if (q.includes("contact") || q.includes("reach") || q.includes("hire") || q.includes("work with") || q.includes("email") || q.includes("touch")) {
      contactCTA = true;
      answer = `You can get in touch with **Ayush Sharma** directly via:\n\n` +
        `- **Email Button:** Click the "Email Ayush" button below to launch your email client.\n` +
        `- **LinkedIn:** [linkedin.com/in/ayush-sharma97](https://www.linkedin.com/in/ayush-sharma97)\n` +
        `- **GitHub:** [github.com/itsayushs](https://github.com/itsayushs)\n` +
        `- **Location:** Gurgaon (NCR), India\n\n` +
        `Ayush is currently working as Lead AI Engineer at IBM Software Labs and is open to high-impact technical leadership discussions.`;
    } else if (q.includes("ibm") || q.includes("current") || q.includes("now") || q.includes("software labs")) {
      answer = `**Ayush Sharma** currently works as a **Lead AI Engineer at IBM Software Labs** (since August 2026), based in Gurgaon, India.\n\n` +
        `- Prior to this, he was at **Cvent** (Jan 2024 – Aug 2026) as Sr. Site Reliability Engineer leading Continuous Delivery on Octopus Deploy, FastMCP tooling, and GPU Kubernetes clusters.\n` +
        `- He has 7+ years of experience bridging Enterprise AI Engineering, Multi-Agent systems, and resilient cloud-native infrastructure.`;
    } else if (q.includes("mastra") || q.includes("multi-agent") || q.includes("agent") || q.includes("debugging") || q.includes("pgvector")) {
      answer = `Ayush contributed to the development of a **TypeScript-native, Mastra-based Multi-Agent SRE Debugging Platform**:\n\n` +
        `- **Intelligent Log Correlation:** Enables analysis and correlation of build and deployment logs across Jenkins and Octopus Deploy.\n` +
        `- **Contextual Runbook RAG:** Retrieves contextual knowledge from Confluence-based runbooks, postmortems, and internal documentation.\n` +
        `- **Optimized Vector Search:** Leveraged **pgvector** for embedding storage, semantic similarity search, and high-precision retrieval.\n` +
        `- **Agent Evals & Reliability:** Built rigorous agent evaluations (Evals) to validate consistent tool calling and response accuracy.\n` +
        `- **Datadog Observability:** Integrated Datadog to track agent execution traces, tool usage, latency, and operational effectiveness.`;
    } else if (q.includes("summarize") || q.includes("3 lines") || q.includes("summary") || q.includes("years") || q.includes("overview")) {
      answer = `**Ayush Sharma** is a Lead AI Engineer and Site Reliability Engineering professional with **7+ years** of experience:\n\n` +
        `- Currently serving as **Lead AI Engineer at IBM Software Labs**, with previous senior roles at **Cvent**, **IBM**, and **Bristlecone**.\n` +
        `- Specializes in production-grade AI-native applications, **Mastra Multi-Agent architectures**, **FastMCP** integrations, and **Docling/pgvector RAG** pipelines.\n` +
        `- Proven enterprise infrastructure track record: multi-cluster GPU Kubernetes, ~200 daily deployments, **99.99% service uptime**, and 9 top industry certifications (CKA, Azure Solutions Architect Expert, RHCE).`;
    } else if (q.includes("certif") || q.includes("credential") || q.includes("cka") || q.includes("azure") || q.includes("rhce")) {
      answer = `Ayush holds **9 verified industry certifications** spanning cloud architecture, Kubernetes, DevOps, and automation:\n\n` +
        `- **Microsoft Certified:** Azure Solutions Architect Expert (AZ-305) & DevOps Engineer Expert (AZ-400)\n` +
        `- **CNCF:** Certified Kubernetes Administrator (CKA v1.18, ID: LF-gx7ubca7qa)\n` +
        `- **Red Hat:** RHCE / RHCSA v7.3 (ID: 180-008-328), OpenShift Administration (EX280), Ansible Automation (EX407)\n` +
        `- **HashiCorp:** Certified Terraform Associate (v002)\n` +
        `- **Microsoft:** Azure Administrator Associate (AZ-104)\n` +
        `- **Amazon:** AWS Certified Cloud Practitioner (CLF-C01)`;
    } else if (q.includes("kubernetes") || q.includes("k8s") || q.includes("karpenter") || q.includes("keda") || q.includes("gpu")) {
      answer = `Ayush has extensive production Kubernetes engineering experience:\n\n` +
        `- **GPU AI Clusters:** Implemented multi-cluster Kubernetes deployments with GPU-enabled nodes using **ArgoCD** and **Karpenter + KEDA** for AI inference workloads, achieving **~99.95% deployment reliability** with zero-downtime rollouts.\n` +
        `- **Self-Service Diagnostics:** Introduced **K8sGPT** AI diagnostics, reducing cluster incident triage time by 30–40%.\n` +
        `- **Cloud Control Plane:** Deployed **Crossplane** to enable developers to declare cloud resources (AWS/GCP) via Kubernetes CRDs, dropping provisioning times from ~1 day to <1 hour.\n` +
        `- **OpenShift Tuning:** At IBM, tuned enterprise OpenShift clusters, resolving AI networking bottlenecks and cutting pod startup latency by 25%.`;
    } else if (q.includes("tech stack") || q.includes("stack") || q.includes("skills") || q.includes("tools")) {
      answer = `Ayush's technical stack spans Enterprise AI and Cloud Infrastructure:\n\n` +
        `- **AI & Multi-Agent:** TypeScript, Mastra, FastMCP, Agent Evals, pgvector, AWS Bedrock, LangChain, ChromaDB, Docling, K8sGPT\n` +
        `- **Languages:** TypeScript, Python, Bash, Go, SQL, YAML\n` +
        `- **Cloud & IaC:** AWS, Azure, IBM Cloud, OpenStack, Terraform, Crossplane, Pulumi, Ansible\n` +
        `- **Containers & Orchestration:** Kubernetes (ArgoCD, Helm, Karpenter, KEDA), OpenShift, Docker\n` +
        `- **Observability:** Datadog (Traces, Tool Evals), Prometheus, Grafana, LogDNA, InfluxDB, DORA metrics\n` +
        `- **CI/CD:** Octopus Deploy, Jenkins, GitHub Actions, GitLab CI, Azure DevOps`;
    } else if (q.includes("cvent") || q.includes("octopus")) {
      answer = `At **Cvent** (Jan 2024 – Aug 2026, Sr. SRE in Gurgaon):\n\n` +
        `- Managed Octopus Deploy for company-wide continuous delivery (~200 daily deployments across ECS Fargate and .NET monoliths).\n` +
        `- Engineered FastMCP server tools with user elicitation for release automation.\n` +
        `- Scaled GPU Kubernetes clusters with ArgoCD, Karpenter, and KEDA (~99.95% deployment reliability).\n` +
        `- Built Docling + Bedrock RAG pipeline (-25% L2 escalations).\n` +
        `- Embedded across 4+ cross-functional teams, cutting MTTR by 35% and keeping 99.99% service uptime.\n` +
        `- Drove organization-wide DORA metrics across 750+ services and 55+ teams.`;
    } else {
      answer = `Ayush Sharma is a **Lead AI Engineer at IBM Software Labs** with 7+ years of experience combining Enterprise AI Engineering with deep SRE, DevOps, and Cloud Architecture.\n\n` +
        `You can ask about:\n` +
        `- His current role at **IBM Software Labs**\n` +
        `- His **Mastra-based Multi-Agent SRE Debugging Platform** (pgvector, Datadog evals)\n` +
        `- His multi-cluster **GPU Kubernetes** & **FastMCP** work at Cvent\n` +
        `- His **9 verified certifications** (CKA, Azure Solutions Architect, RHCE)\n` +
        `- Or click below to get in touch!`;
    }

    return { answer, contactCTA };
  }

  // --- Message Rendering & Streaming Simulation ---
  function appendMessage(role, text, isThinking = false) {
    const container = document.getElementById('chat-messages');
    const emptyState = document.getElementById('ask-empty-state');
    if (emptyState) emptyState.style.display = 'none';
    const newChatBtn = document.getElementById('new-chat-btn');
    if (newChatBtn) newChatBtn.style.display = 'inline-block';

    const msgDiv = document.createElement('div');
    msgDiv.className = role === 'user' ? 'chat-msg-user mb-3' : 'chat-msg-bot mb-4';

    if (isThinking) {
      msgDiv.innerHTML = '<span class="ask-thinking text-[var(--muted)]">Thinking<i>.</i><i>.</i><i>.</i></span>';
    } else {
      msgDiv.innerHTML = formatMarkdown(text);
    }

    container.appendChild(msgDiv);
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    return msgDiv;
  }

  function formatMarkdown(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="link-u font-medium text-[var(--ink)]">$1</a>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n- /g, '<br>• ');
  }

  async function streamResponse(botMsgDiv, fullText, contactCTA) {
    botMsgDiv.innerHTML = '';
    const words = fullText.split(' ');
    let current = '';

    for (let i = 0; i < words.length; i++) {
      current += (i === 0 ? '' : ' ') + words[i];
      botMsgDiv.innerHTML = formatMarkdown(current);
      const container = document.getElementById('chat-messages');
      if (container) container.scrollTo({ top: container.scrollHeight });
      await new Promise(r => setTimeout(r, 18));
    }

    if (contactCTA) {
      const ctaDiv = document.createElement('div');
      ctaDiv.className = 'mt-3 pt-3 border-t border-[var(--rule)] flex flex-wrap gap-2';
      ctaDiv.innerHTML = `
        <a href="mailto:69ayushsharma@gmail.com" class="btn btn-primary text-[13px] py-1.5 px-3">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          Email Ayush
        </a>
      `;
      botMsgDiv.appendChild(ctaDiv);
    }
  }

  window.sendUserQuestion = async function (questionText, isSuggested = false) {
    const input = document.getElementById('ask-input');
    const text = (questionText || (input ? input.value : '')).trim();
    if (!text || isStreaming) return;

    if (input) input.value = '';
    isStreaming = true;

    remainingDaily = Math.max(0, remainingDaily - 1);
    const badge = document.getElementById('remaining-queries');
    if (badge) badge.textContent = `${remainingDaily} queries left today`;

    appendMessage('user', text);
    chatHistory.push({ role: 'user', content: text });

    const botMsgDiv = appendMessage('assistant', '', true);

    await new Promise(r => setTimeout(r, 450));
    const { answer, contactCTA } = generateAnswer(text);
    await streamResponse(botMsgDiv, answer, contactCTA);

    chatHistory.push({ role: 'assistant', content: answer });
    isStreaming = false;

    if (input) input.focus();
  };

  document.addEventListener('DOMContentLoaded', () => {
    window.updateRecruiterModeUI();

    const input = document.getElementById('ask-input');
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendUserQuestion();
        }
      });
    }

    const form = document.getElementById('ask-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        sendUserQuestion();
      });
    }
  });

})();
