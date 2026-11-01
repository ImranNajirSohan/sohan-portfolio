import axios from 'axios';

// In development, fall back to localhost:8000. In production, connect directly to deployed backend API
const API_BASE = import.meta.env.VITE_API_URL || (
  import.meta.env.DEV 
    ? 'http://localhost:8000/api' 
    : 'https://sohan-portfolio-api.vercel.app/api'
);

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Fallback data in case backend server is initializing
const fallbackData = {
  profile: {
    name: "Sohanur Rahman Sohan",
    tagline: "Full-Stack Software Engineer | Django, Laravel & React Native Specialist",
    typed_roles: "Django & Python Specialist, Laravel & PHP Expert, React.js & React Native Engineer, Full-Stack System Architect",
    roles_list: ["Django & Python Specialist", "Laravel & PHP Expert", "React.js & React Native Engineer", "Full-Stack System Architect"],
    short_bio: "Versatile Full-Stack Engineer with deep mastery in both Python/Django and PHP/Laravel ecosystems. I build scalable backend architectures, high-performance REST APIs, and modern React interfaces that drive business growth.",
    full_bio: "Hello! I am Sohan, a software engineer with a proven track record across modern web development stacks. What sets me apart is my dual capability in both Python/Django and PHP/Laravel—enabling me to architect high-throughput microservices, design scalable relational databases (MySQL, PostgreSQL), and craft fluid, interactive user experiences with React.js and Tailwind CSS. Whether your project demands enterprise Python AI/data pipelines or robust Laravel SaaS architectures, I deliver clean, tested, and high-velocity solutions.",
    avatar_display_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    resume_display_url: "#",
    email: "sohanuddin404@gmail.com",
    phone: "+880 1712-345678",
    location: "Rajshahi, Bangladesh",
    years_of_experience: 3,
    completed_projects: 32,
    satisfied_clients: 22,
    github_url: "https://github.com",
    linkedin_url: "https://linkedin.com",
    twitter_url: "https://twitter.com",
    facebook_url: "https://facebook.com",
    is_available_for_hire: true,
    hero_quote: "Bridging Python Django and PHP Laravel to build reliable, high-speed software that clients love."
  },
  settings: {
    site_title: "Sohan | Full-Stack Engineer (Django & Laravel)",
    hero_badge: "🔥 Open for Hire: Python Django & PHP Laravel Specialist",
    cta_text: "Let's build your next Django or Laravel application!",
    footer_text: "Built with Django & React | Expert in Django, Laravel, React & MySQL.",
    theme_accent_primary: "#FF5E14",
    theme_accent_secondary: "#FFB800"
  },
  skills: [
    { id: 1, name: "Python & Django", category: "Backend", proficiency: 95, icon_name: "terminal", is_featured: true },
    { id: 2, name: "PHP & Laravel", category: "Backend", proficiency: 93, icon_name: "server", is_featured: true },
    { id: 3, name: "React.js", category: "Frontend", proficiency: 90, icon_name: "code", is_featured: true },
    { id: 4, name: "MySQL Database", category: "Database", proficiency: 92, icon_name: "database", is_featured: true },
    { id: 5, name: "Tailwind CSS", category: "Frontend", proficiency: 95, icon_name: "palette", is_featured: true },
    { id: 6, name: "JavaScript (ES6+)", category: "Frontend", proficiency: 92, icon_name: "sparkles", is_featured: true },
    { id: 7, name: "RESTful APIs", category: "Backend", proficiency: 95, icon_name: "network", is_featured: true },
    { id: 8, name: "Docker & VPS", category: "DevOps & Cloud", proficiency: 85, icon_name: "box", is_featured: true },
    { id: 9, name: "Redis & Queues", category: "Backend", proficiency: 84, icon_name: "cpu", is_featured: false },
    { id: 10, name: "Git & GitHub", category: "Tools & Others", proficiency: 92, icon_name: "git-branch", is_featured: true },
    { id: 11, name: "React Native (iOS & Android)", category: "Frontend", proficiency: 90, icon_name: "smartphone", is_featured: true }
  ],
  services: [
    {
      id: 1,
      title: "Python & Django Web Development",
      short_description: "Production-grade backend systems built with Django REST Framework, ORM optimization, and enterprise-grade security.",
      icon_name: "server",
      features_list: ["Django REST Framework APIs", "Robust Authentication & RBAC", "Scalable Database & Caching"]
    },
    {
      id: 2,
      title: "PHP & Laravel SaaS Development",
      short_description: "Custom Laravel web applications, multi-tenant SaaS architectures, Eloquent ORM tuning, and third-party API integrations.",
      icon_name: "layers",
      features_list: ["Laravel Sanctum / Passport Auth", "Payment Gateways (Stripe, SSLCommerz)", "Queues, Events & Notification systems"]
    },
    {
      id: 3,
      title: "Modern React.js Frontend Engineering",
      short_description: "Fluid, interactive user interfaces designed with React, Tailwind CSS, component modularity, and high Lighthouse speed scores.",
      icon_name: "zap",
      features_list: ["Modern React hooks & state management", "Responsive mobile-first layouts", "Seamless REST & WebSocket integration"]
    },
    {
      id: 4,
      title: "MySQL Database Architecture & Optimization",
      short_description: "Clean relational schema design, indexing, slow query analysis, and data migration pipelines for high-traffic platforms.",
      icon_name: "database",
      features_list: ["Complex query profiling & indexing", "ACID transactions & data integrity", "Automated backup & replication setup"]
    },
    {
      id: 5,
      title: "Cross-Platform Mobile App Development (React Native)",
      short_description: "Native-grade iOS & Android applications engineered with React Native, high-velocity UX, push notifications, and offline state synchronization.",
      icon_name: "smartphone",
      features_list: ["React Native iOS & Android Apps", "Clean Architecture & Global State", "Push Notifications & REST/GraphQL API Sync"]
    }
  ],
  experiences: [
    {
      id: 1,
      role_or_degree: "Senior Full-Stack Engineer (Django & Laravel)",
      company_or_institution: "TechInnovate Solutions",
      category: "experience",
      start_date: "2023",
      end_date: "Present",
      is_current: true,
      location: "Dhaka, Bangladesh",
      description: "Architecting enterprise SaaS web applications using Django REST Framework and Laravel, coupled with modern React frontends and optimized MySQL schemas. Reduced query latency by 45%."
    },
    {
      id: 2,
      role_or_degree: "Full-Stack Web Developer",
      company_or_institution: "Apex Software Labs",
      category: "experience",
      start_date: "2021",
      end_date: "2023",
      is_current: false,
      location: "Dhaka, Bangladesh",
      description: "Engineered complex web systems in PHP/Laravel and Python/Django. Integrated payment gateways (Stripe, SSLCommerz) and managed background queues with Redis and Celery."
    },
    {
      id: 3,
      role_or_degree: "B.Sc. in Computer Science & Engineering",
      company_or_institution: "Leading University",
      category: "education",
      start_date: "2017",
      end_date: "2021",
      is_current: false,
      location: "Bangladesh",
      description: "Focus on Software Engineering, Object-Oriented Programming (Python, PHP, Java), Relational Database Management Systems (MySQL), and Web Architecture."
    }
  ],
  projects: [
    {
      id: 1,
      title: "Multi-Vendor E-Commerce Platform",
      tagline: "Full-Featured E-Commerce Ecosystem with Laravel, React & MySQL",
      description: "High-volume online marketplace featuring dynamic catalog filters, vendor dashboard, multi-step checkout with Stripe & SSLCommerz, and automated invoice generation.",
      category: "Full Stack",
      tech_stack_list: ["PHP", "Laravel", "React", "MySQL", "Tailwind CSS", "Redis"],
      image_display_url: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1000&q=80",
      live_url: "https://example.com/demo-ecommerce",
      github_url: "https://github.com",
      is_featured: true
    },
    {
      id: 2,
      title: "Enterprise Cloud Project & Task Manager",
      tagline: "Real-Time Collaboration Platform with Django REST, React & WebSockets",
      description: "Team productivity suite with Kanban boards, role permissions, activity audit logs, time tracking, and instant WebSocket notifications for remote agile squads.",
      category: "Full Stack",
      tech_stack_list: ["Python", "Django", "React", "MySQL", "WebSockets", "Celery"],
      image_display_url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80",
      live_url: "https://example.com/demo-tasks",
      github_url: "https://github.com",
      is_featured: true
    },
    {
      id: 3,
      title: "High-Throughput Authentication & RBAC Microservice",
      tagline: "Enterprise Security Gateway in Django & Laravel Sanctum",
      description: "Centralized authentication system supporting JWT, OAuth2, Two-Factor Authentication (TOTP), IP rate-limiting, and granular permission matrices.",
      category: "Backend & API",
      tech_stack_list: ["Django REST", "Laravel Sanctum", "MySQL", "Docker", "Redis"],
      image_display_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80",
      live_url: "https://example.com/demo-auth",
      github_url: "https://github.com",
      is_featured: true
    },
    {
      id: 4,
      title: "SaaS Financial Analytics & Revenue Dashboard",
      tagline: "Predictive Business Metrics & Real-Time Reporting",
      description: "Interactive data visualization dashboard processing business transactions into actionable KPI charts, exportable PDF reports, and automated revenue insights.",
      category: "Frontend",
      tech_stack_list: ["React", "Tailwind CSS", "Django REST", "Chart.js", "MySQL"],
      image_display_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
      live_url: "https://example.com/demo-analytics",
      github_url: "https://github.com",
      is_featured: true
    }
  ],
  testimonials: [
    {
      id: 1,
      client_name: "Alexander Wright",
      client_role: "CTO",
      company: "VentureFlow Media",
      feedback: "Sohan seamlessly handled our Django API and Laravel services without missing a beat. His ability to switch between Python and PHP while delivering clean React interfaces is extraordinary.",
      rating: 5,
      avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 2,
      client_name: "Tanzina Ahmed",
      client_role: "Product Manager",
      company: "InnoSoft Global",
      feedback: "Outstanding engineer! Sohan refactored our legacy Laravel modules and integrated high-speed Django microservices. The UI is gorgeous, blazing fast, and our users love it.",
      rating: 5,
      avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    }
  ]
};

export const fetchPortfolioData = async () => {
  try {
    const response = await apiClient.get('/portfolio/');
    if (response.data && response.data.profile) {
      return { data: response.data, isLive: true };
    }
    return { data: fallbackData, isLive: false };
  } catch (error) {
    console.warn('Backend API connection note: using fallback data or offline mode.', error.message);
    return { data: fallbackData, isLive: false };
  }
};

export const sendContactMessage = async (messageData) => {
  try {
    const response = await apiClient.post('/contact/', messageData);
    return { success: true, message: response.data.message || 'Message sent successfully!' };
  } catch (error) {
    const errorMsg = error.response?.data?.detail || 'Failed to send message. Please try again.';
    return { success: false, error: errorMsg };
  }
};

export default apiClient;
