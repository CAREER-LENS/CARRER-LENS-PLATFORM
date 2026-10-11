/**
 * CareerLens — Career Data Module
 * 
 * Structured career database supporting 11+ career paths.
 * Each career contains: education, branches, interests, skills,
 * roadmap, projects, and internship preparation data.
 * 
 * To add a new career: add an entry to the CAREERS array following the same schema.
 */

const CAREERS = [
  {
    id: "ai-engineer",
    name: "AI Engineer",
    icon: "🤖",
    description: "Design, build, and deploy artificial intelligence systems and solutions.",
    relevantEducation: ["B.Tech", "M.Tech", "B.E.", "M.E.", "B.Sc", "M.Sc", "MCA", "BCA"],
    relevantBranches: ["CSE", "AIML", "AI", "IT", "Data Science", "Computer Science", "Information Technology", "AI & ML", "Artificial Intelligence"],
    interestKeywords: ["AI", "Artificial Intelligence", "Deep Learning", "Neural Networks", "NLP", "Computer Vision", "Generative AI", "LLM"],
    relevantSkills: ["Python", "TensorFlow", "PyTorch", "NumPy", "Pandas", "Scikit-learn", "Keras", "OpenCV", "NLP", "Deep Learning", "Machine Learning", "Neural Networks", "Data Analysis", "Mathematics", "Statistics", "Linear Algebra"],
    requiredSkills: ["Python", "Machine Learning", "Deep Learning", "TensorFlow or PyTorch", "Mathematics", "Statistics"],
    roadmap: [
      { step: 1, title: "Python Fundamentals", description: "Master Python programming, data structures, and OOP concepts." },
      { step: 2, title: "Mathematics & Statistics", description: "Linear algebra, calculus, probability, and statistical methods." },
      { step: 3, title: "Data Analysis with NumPy & Pandas", description: "Learn data manipulation, cleaning, and exploratory analysis." },
      { step: 4, title: "Machine Learning Fundamentals", description: "Supervised, unsupervised learning, model evaluation with Scikit-learn." },
      { step: 5, title: "Deep Learning & Neural Networks", description: "CNNs, RNNs, Transformers using TensorFlow or PyTorch." },
      { step: 6, title: "AI Specialization", description: "NLP, Computer Vision, or Generative AI — pick your focus area." },
      { step: 7, title: "AI Projects & Portfolio", description: "Build 3–5 real AI projects and deploy them." },
      { step: 8, title: "Internship Preparation", description: "Practice ML interviews, create resume, apply to AI roles." }
    ],
    projects: [
      { name: "Sentiment Analysis Tool", difficulty: "Beginner", skills: ["Python", "NLP", "Text Processing"], description: "Build a tool that analyzes sentiment from product reviews or social media posts." },
      { name: "Image Classification System", difficulty: "Intermediate", skills: ["Python", "TensorFlow", "CNN", "Computer Vision"], description: "Create a deep learning model that classifies images into categories using convolutional neural networks." },
      { name: "AI Career Recommendation Engine", difficulty: "Advanced", skills: ["Python", "ML", "NLP", "Full Stack"], description: "Build an AI-powered system that recommends career paths based on user skills and interests." }
    ],
    internshipPrep: [
      "Master Python and at least one ML framework (TensorFlow/PyTorch)",
      "Build 2–3 AI/ML projects with real datasets",
      "Create a strong GitHub profile showcasing your AI work",
      "Write a resume highlighting AI projects and skills",
      "Practice ML coding questions and system design",
      "Apply to AI/ML internships on LinkedIn, Internshala, and company portals"
    ]
  },
  {
    id: "ml-engineer",
    name: "Machine Learning Engineer",
    icon: "🧠",
    description: "Build and optimize machine learning models for production systems.",
    relevantEducation: ["B.Tech", "M.Tech", "B.E.", "M.E.", "B.Sc", "M.Sc", "MCA"],
    relevantBranches: ["CSE", "AIML", "AI", "IT", "Data Science", "Computer Science", "AI & ML", "Artificial Intelligence"],
    interestKeywords: ["Machine Learning", "ML", "Data Modeling", "Predictive Analytics", "Statistical Modeling"],
    relevantSkills: ["Python", "Scikit-learn", "TensorFlow", "PyTorch", "NumPy", "Pandas", "SQL", "Statistics", "Data Analysis", "Feature Engineering", "Model Deployment", "MLOps", "Docker", "Mathematics"],
    requiredSkills: ["Python", "Scikit-learn", "Statistics", "SQL", "Machine Learning Algorithms", "Model Deployment"],
    roadmap: [
      { step: 1, title: "Python & SQL Fundamentals", description: "Strong foundation in Python programming and SQL databases." },
      { step: 2, title: "Statistics & Probability", description: "Statistical methods, hypothesis testing, and probability theory." },
      { step: 3, title: "Data Wrangling", description: "Data cleaning, transformation, and feature engineering with Pandas." },
      { step: 4, title: "ML Algorithms", description: "Regression, classification, clustering, ensemble methods." },
      { step: 5, title: "Model Evaluation & Tuning", description: "Cross-validation, hyperparameter tuning, and model selection." },
      { step: 6, title: "ML in Production", description: "Model deployment, APIs, MLOps, and monitoring." },
      { step: 7, title: "ML Projects", description: "Build end-to-end ML projects with real-world datasets." },
      { step: 8, title: "Internship Preparation", description: "Prepare for ML engineering interviews and apply." }
    ],
    projects: [
      { name: "Student Grade Predictor", difficulty: "Beginner", skills: ["Python", "Scikit-learn", "Pandas"], description: "Predict student grades based on study habits and demographics using regression models." },
      { name: "Recommendation System", difficulty: "Intermediate", skills: ["Python", "Collaborative Filtering", "Matrix Factorization"], description: "Build a movie or product recommendation system using collaborative filtering techniques." },
      { name: "Real-Time Fraud Detection", difficulty: "Advanced", skills: ["Python", "ML", "Streaming Data", "Model Deployment"], description: "Create a real-time fraud detection system that processes streaming transaction data." }
    ],
    internshipPrep: [
      "Master ML algorithms and their mathematical foundations",
      "Build 2–3 end-to-end ML projects with deployment",
      "Create a GitHub portfolio with well-documented ML projects",
      "Prepare a resume emphasizing ML skills and projects",
      "Practice ML interview questions (algorithms, coding, system design)",
      "Apply to ML internships at tech companies and startups"
    ]
  },
  {
    id: "fullstack-developer",
    name: "Full Stack Web Developer",
    icon: "🌐",
    description: "Build complete web applications from frontend interfaces to backend systems.",
    relevantEducation: ["B.Tech", "M.Tech", "B.E.", "M.E.", "BCA", "MCA", "B.Sc", "M.Sc", "Diploma"],
    relevantBranches: ["CSE", "IT", "Computer Science", "Information Technology", "Software Engineering"],
    interestKeywords: ["Web Development", "Web Dev", "Frontend", "Backend", "Full Stack", "Web Design", "Web Applications", "Website Development", "MERN", "MEAN"],
    relevantSkills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express", "MongoDB", "SQL", "TypeScript", "Next.js", "Vue.js", "Angular", "REST API", "Git", "Tailwind", "Bootstrap", "PHP", "Django", "Flask"],
    requiredSkills: ["HTML", "CSS", "JavaScript", "React or Vue.js", "Node.js", "Database (SQL or MongoDB)", "Git"],
    roadmap: [
      { step: 1, title: "HTML & CSS Fundamentals", description: "Learn semantic HTML, CSS layouts, Flexbox, Grid, and responsive design." },
      { step: 2, title: "JavaScript Mastery", description: "DOM manipulation, ES6+, async/await, and modern JS patterns." },
      { step: 3, title: "Frontend Framework", description: "Learn React.js (or Vue.js) for building dynamic user interfaces." },
      { step: 4, title: "Backend Development", description: "Node.js + Express.js for building REST APIs and server-side logic." },
      { step: 5, title: "Database & Authentication", description: "MongoDB or PostgreSQL, user authentication, and authorization." },
      { step: 6, title: "Full Stack Projects", description: "Build complete web applications combining frontend and backend." },
      { step: 7, title: "Deployment & DevOps", description: "Deploy apps on Vercel, Netlify, or cloud platforms." },
      { step: 8, title: "Internship Preparation", description: "Build portfolio, prepare for web dev interviews." }
    ],
    projects: [
      { name: "Personal Portfolio Website", difficulty: "Beginner", skills: ["HTML", "CSS", "JavaScript"], description: "Create a responsive personal portfolio to showcase your projects and skills." },
      { name: "Task Management App", difficulty: "Intermediate", skills: ["React", "Node.js", "MongoDB", "REST API"], description: "Build a full-stack task manager with CRUD operations, authentication, and real-time updates." },
      { name: "E-Commerce Platform", difficulty: "Advanced", skills: ["React", "Node.js", "Database", "Payment Integration"], description: "Develop a complete e-commerce platform with product catalog, cart, checkout, and admin panel." }
    ],
    internshipPrep: [
      "Master HTML, CSS, JavaScript, and at least one frontend framework",
      "Build 2–3 full-stack projects with live deployments",
      "Create a portfolio website showcasing your work",
      "Write a resume highlighting web development projects",
      "Practice web dev interview questions (JS, React, system design)",
      "Apply to web development internships on LinkedIn, Internshala, AngelList"
    ]
  },
  {
    id: "data-scientist",
    name: "Data Scientist",
    icon: "📊",
    description: "Extract insights from data using statistical analysis and machine learning.",
    relevantEducation: ["B.Tech", "M.Tech", "B.E.", "M.E.", "B.Sc", "M.Sc", "MCA", "MBA"],
    relevantBranches: ["CSE", "AIML", "IT", "Data Science", "Computer Science", "Mathematics", "Statistics", "AI & ML"],
    interestKeywords: ["Data Science", "Data Analysis", "Data Analytics", "Business Intelligence", "Big Data", "Data Visualization", "Analytics"],
    relevantSkills: ["Python", "R", "SQL", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Tableau", "Power BI", "Statistics", "Machine Learning", "Excel", "Data Visualization", "Scikit-learn", "Jupyter"],
    requiredSkills: ["Python", "SQL", "Statistics", "Pandas", "Data Visualization", "Machine Learning Basics"],
    roadmap: [
      { step: 1, title: "Python & SQL", description: "Learn Python for data analysis and SQL for querying databases." },
      { step: 2, title: "Statistics & Probability", description: "Descriptive/inferential statistics, distributions, and hypothesis testing." },
      { step: 3, title: "Data Analysis & Visualization", description: "Pandas, Matplotlib, Seaborn for exploring and visualizing data." },
      { step: 4, title: "Machine Learning", description: "Basic ML algorithms for predictive modeling and classification." },
      { step: 5, title: "Advanced Analytics", description: "Time series, A/B testing, and advanced statistical methods." },
      { step: 6, title: "Business Intelligence Tools", description: "Tableau, Power BI for creating interactive dashboards." },
      { step: 7, title: "Data Science Projects", description: "Build end-to-end data science projects with real datasets." },
      { step: 8, title: "Internship Preparation", description: "Create portfolio, prepare for data science interviews." }
    ],
    projects: [
      { name: "Student Data Analyzer", difficulty: "Beginner", skills: ["Python", "Pandas", "Matplotlib"], description: "Analyze and visualize student performance data to find patterns and insights." },
      { name: "Sales Prediction Dashboard", difficulty: "Intermediate", skills: ["Python", "ML", "Tableau", "SQL"], description: "Build a predictive model for sales forecasting with an interactive dashboard." },
      { name: "Customer Churn Analysis System", difficulty: "Advanced", skills: ["Python", "ML", "Statistical Analysis", "Data Pipelines"], description: "Create an end-to-end system that predicts and explains customer churn." }
    ],
    internshipPrep: [
      "Master Python, SQL, and statistical analysis",
      "Build 2–3 data science projects with real-world datasets",
      "Create a GitHub portfolio with Jupyter notebooks",
      "Write a resume highlighting data analysis skills and projects",
      "Practice data science interview questions (statistics, SQL, ML)",
      "Apply to data science internships at analytics companies"
    ]
  },
  {
    id: "cybersecurity-analyst",
    name: "Cybersecurity Analyst",
    icon: "🔒",
    description: "Protect systems and networks from cyber threats and vulnerabilities.",
    relevantEducation: ["B.Tech", "M.Tech", "B.E.", "M.E.", "BCA", "MCA", "B.Sc", "M.Sc"],
    relevantBranches: ["CSE", "IT", "Computer Science", "Information Technology", "Cybersecurity", "Information Security", "ECE"],
    interestKeywords: ["Cybersecurity", "Cyber Security", "Ethical Hacking", "Network Security", "Information Security", "Hacking", "Penetration Testing", "Security"],
    relevantSkills: ["Networking", "Linux", "Python", "Wireshark", "Nmap", "Metasploit", "Firewalls", "Cryptography", "Ethical Hacking", "OWASP", "TCP/IP", "Security Auditing", "Kali Linux", "Bash"],
    requiredSkills: ["Networking Fundamentals", "Linux", "Python", "Security Tools (Wireshark/Nmap)", "Cryptography Basics", "OWASP"],
    roadmap: [
      { step: 1, title: "Networking Fundamentals", description: "TCP/IP, OSI model, protocols, subnetting, and network architecture." },
      { step: 2, title: "Linux Administration", description: "Linux command line, file system, permissions, and system administration." },
      { step: 3, title: "Security Fundamentals", description: "CIA triad, threat modeling, cryptography, and security principles." },
      { step: 4, title: "Security Tools", description: "Wireshark, Nmap, Metasploit, and vulnerability scanning tools." },
      { step: 5, title: "Ethical Hacking", description: "Penetration testing methodology, web app security, OWASP Top 10." },
      { step: 6, title: "Incident Response", description: "Threat detection, incident handling, and forensic analysis." },
      { step: 7, title: "Security Projects & Labs", description: "Build security labs, capture-the-flag challenges, and security tools." },
      { step: 8, title: "Certifications & Internships", description: "Prepare for CEH/CompTIA Security+ and apply for security roles." }
    ],
    projects: [
      { name: "Network Scanner Tool", difficulty: "Beginner", skills: ["Python", "Networking", "Sockets"], description: "Build a network scanner that discovers active hosts and open ports on a network." },
      { name: "Web Vulnerability Scanner", difficulty: "Intermediate", skills: ["Python", "OWASP", "Web Security"], description: "Create a tool that scans web applications for common vulnerabilities like XSS and SQL injection." },
      { name: "Security Operations Dashboard", difficulty: "Advanced", skills: ["Python", "Log Analysis", "SIEM", "Dashboard"], description: "Build a security monitoring dashboard that analyzes logs and detects anomalies." }
    ],
    internshipPrep: [
      "Master networking, Linux, and security fundamentals",
      "Build 2–3 security tools or complete CTF challenges",
      "Get certified (CompTIA Security+ or CEH recommended)",
      "Create a GitHub portfolio with security projects",
      "Practice cybersecurity interview questions",
      "Apply to cybersecurity internships at IT and security companies"
    ]
  },
  {
    id: "software-developer",
    name: "Software Developer",
    icon: "💻",
    description: "Design, develop, and maintain software applications and systems.",
    relevantEducation: ["B.Tech", "M.Tech", "B.E.", "M.E.", "BCA", "MCA", "B.Sc", "M.Sc", "Diploma"],
    relevantBranches: ["CSE", "IT", "Computer Science", "Information Technology", "Software Engineering"],
    interestKeywords: ["Programming", "Software Development", "Coding", "Software Engineering", "Application Development", "Desktop Applications", "Mobile Development", "App Development"],
    relevantSkills: ["Java", "C++", "Python", "C#", "JavaScript", "Go", "Rust", "Git", "Data Structures", "Algorithms", "OOP", "Design Patterns", "Testing", "Docker", "Linux", "REST API", "Agile"],
    requiredSkills: ["Java or C++ or Python", "Data Structures & Algorithms", "OOP", "Git", "Problem Solving", "Software Design"],
    roadmap: [
      { step: 1, title: "Programming Fundamentals", description: "Master one primary language (Java/C++/Python) with strong OOP skills." },
      { step: 2, title: "Data Structures & Algorithms", description: "Arrays, linked lists, trees, graphs, sorting, searching, DP." },
      { step: 3, title: "Software Design", description: "Design patterns, SOLID principles, and clean code practices." },
      { step: 4, title: "Version Control & Tools", description: "Git, GitHub, CI/CD, and development workflows." },
      { step: 5, title: "Database & APIs", description: "SQL, NoSQL databases, REST API design, and integration." },
      { step: 6, title: "Testing & Quality", description: "Unit testing, integration testing, and code review practices." },
      { step: 7, title: "Software Projects", description: "Build 3–5 software projects demonstrating different skills." },
      { step: 8, title: "Interview Preparation", description: "Practice DSA problems, system design, and behavioral interviews." }
    ],
    projects: [
      { name: "Command-Line Task Manager", difficulty: "Beginner", skills: ["Python or Java", "File I/O", "OOP"], description: "Build a CLI-based task manager with add, delete, mark complete, and list features." },
      { name: "Chat Application", difficulty: "Intermediate", skills: ["Java/Python", "Networking", "Multithreading", "GUI"], description: "Create a real-time chat application with client-server architecture." },
      { name: "Distributed File System", difficulty: "Advanced", skills: ["Java/C++", "Networking", "Concurrency", "System Design"], description: "Design and implement a simplified distributed file system." }
    ],
    internshipPrep: [
      "Master at least one programming language deeply",
      "Solve 200+ DSA problems on LeetCode/CodeForces",
      "Build 2–3 software projects with clean architecture",
      "Create a strong GitHub profile with well-documented code",
      "Prepare for coding interviews (DSA + system design)",
      "Apply to software development internships at tech companies"
    ]
  },
  {
    id: "embedded-systems-engineer",
    name: "Embedded Systems Engineer",
    icon: "⚡",
    description: "Design and program embedded hardware systems and IoT devices.",
    relevantEducation: ["B.Tech", "M.Tech", "B.E.", "M.E.", "Diploma"],
    relevantBranches: ["ECE", "EEE", "Electronics", "Electrical", "CSE", "IT", "Mechatronics", "Instrumentation", "Electronics & Communication"],
    interestKeywords: ["Embedded Systems", "IoT", "Internet of Things", "Microcontroller", "Robotics", "Arduino", "Raspberry Pi", "Hardware Programming", "Embedded"],
    relevantSkills: ["C", "C++", "Arduino", "Raspberry Pi", "Microcontrollers", "RTOS", "Assembly", "PCB Design", "Sensors", "I2C", "SPI", "UART", "Embedded C", "IoT", "ARM", "PIC", "AVR"],
    requiredSkills: ["C/C++", "Microcontroller Programming", "Electronics Fundamentals", "RTOS Basics", "Communication Protocols (I2C/SPI/UART)"],
    roadmap: [
      { step: 1, title: "C/C++ Programming", description: "Master C and C++ with focus on memory management and low-level programming." },
      { step: 2, title: "Electronics Fundamentals", description: "Digital/analog circuits, sensors, actuators, and basic PCB design." },
      { step: 3, title: "Microcontroller Programming", description: "Arduino, AVR, PIC, or ARM microcontroller programming." },
      { step: 4, title: "Communication Protocols", description: "I2C, SPI, UART, CAN, and wireless protocols (BLE, WiFi)." },
      { step: 5, title: "RTOS & Embedded OS", description: "FreeRTOS, real-time constraints, and task scheduling." },
      { step: 6, title: "IoT & Connectivity", description: "IoT platforms, cloud connectivity, and sensor networks." },
      { step: 7, title: "Embedded Projects", description: "Build hardware projects combining sensors, MCUs, and software." },
      { step: 8, title: "Internship Preparation", description: "Prepare portfolio with embedded projects and apply." }
    ],
    projects: [
      { name: "Smart Home Sensor System", difficulty: "Beginner", skills: ["Arduino", "Sensors", "C"], description: "Build a sensor system that monitors temperature, humidity, and light with alerts." },
      { name: "IoT Weather Station", difficulty: "Intermediate", skills: ["Raspberry Pi", "Python", "IoT", "Cloud"], description: "Create a weather station that collects data from sensors and displays on a web dashboard." },
      { name: "Autonomous Line-Following Robot", difficulty: "Advanced", skills: ["C++", "Microcontrollers", "Motor Control", "PID"], description: "Build a robot that follows a line autonomously using sensors and PID control." }
    ],
    internshipPrep: [
      "Master C/C++ for embedded development",
      "Build 2–3 hardware projects with microcontrollers",
      "Document projects with circuit diagrams and code on GitHub",
      "Learn to use an oscilloscope and debugging tools",
      "Practice embedded systems interview questions",
      "Apply to embedded/IoT internships at hardware companies"
    ]
  },
  {
    id: "vlsi-engineer",
    name: "VLSI Engineer",
    icon: "🔬",
    description: "Design and verify integrated circuits and semiconductor chips.",
    relevantEducation: ["B.Tech", "M.Tech", "B.E.", "M.E."],
    relevantBranches: ["ECE", "EEE", "Electronics", "Electrical", "VLSI", "Electronics & Communication", "Microelectronics"],
    interestKeywords: ["VLSI", "Chip Design", "Semiconductor", "IC Design", "Digital Design", "RTL", "ASIC", "FPGA"],
    relevantSkills: ["Verilog", "VHDL", "Digital Electronics", "FPGA", "SystemVerilog", "Cadence", "Synopsys", "ASIC Design", "RTL Design", "Logic Design", "Xilinx", "CMOS", "Analog Electronics"],
    requiredSkills: ["Verilog or VHDL", "Digital Electronics", "FPGA", "Logic Design", "EDA Tools"],
    roadmap: [
      { step: 1, title: "Digital Electronics", description: "Logic gates, combinational/sequential circuits, and state machines." },
      { step: 2, title: "Verilog/VHDL", description: "Hardware description languages for digital circuit design." },
      { step: 3, title: "RTL Design", description: "Register Transfer Level design methodology and best practices." },
      { step: 4, title: "FPGA Development", description: "FPGA programming, synthesis, and implementation on Xilinx/Intel boards." },
      { step: 5, title: "Verification", description: "Testbench design, simulation, and functional verification." },
      { step: 6, title: "Physical Design Basics", description: "Floor planning, placement, routing, and timing analysis." },
      { step: 7, title: "VLSI Projects", description: "Design and verify digital circuits on FPGA platforms." },
      { step: 8, title: "Internship Preparation", description: "Prepare for VLSI interviews and apply to semiconductor companies." }
    ],
    projects: [
      { name: "ALU Design in Verilog", difficulty: "Beginner", skills: ["Verilog", "Digital Logic", "Simulation"], description: "Design a basic Arithmetic Logic Unit with add, subtract, AND, OR operations in Verilog." },
      { name: "UART Communication Module", difficulty: "Intermediate", skills: ["Verilog", "FPGA", "Serial Communication"], description: "Implement a UART transmitter and receiver module with testbench verification." },
      { name: "RISC-V Processor Core", difficulty: "Advanced", skills: ["Verilog", "Computer Architecture", "FPGA", "Pipelining"], description: "Design a simplified RISC-V processor with pipeline stages on an FPGA." }
    ],
    internshipPrep: [
      "Master Verilog/VHDL and digital design fundamentals",
      "Build 2–3 VLSI projects with verification testbenches",
      "Document designs with block diagrams and waveforms on GitHub",
      "Learn industry EDA tools (Cadence, Synopsys, Xilinx Vivado)",
      "Practice VLSI interview questions (logic design, timing, verification)",
      "Apply to VLSI internships at semiconductor companies"
    ]
  },
  {
    id: "electrical-engineer",
    name: "Electrical Engineer",
    icon: "⚙️",
    description: "Design and develop electrical systems, power electronics, and control systems.",
    relevantEducation: ["B.Tech", "M.Tech", "B.E.", "M.E.", "Diploma"],
    relevantBranches: ["EEE", "Electrical", "Electronics", "ECE", "Power Systems", "Electrical Engineering", "Electrical & Electronics"],
    interestKeywords: ["Electrical Engineering", "Power Systems", "Power Electronics", "Control Systems", "Electrical Design", "Renewable Energy", "Electric Vehicles"],
    relevantSkills: ["MATLAB", "Simulink", "Power Systems", "Circuit Design", "Control Systems", "PLC", "SCADA", "AutoCAD Electrical", "Power Electronics", "Transformers", "Motors", "Renewable Energy"],
    requiredSkills: ["Circuit Analysis", "MATLAB/Simulink", "Power Systems", "Control Systems", "Electrical Safety Standards"],
    roadmap: [
      { step: 1, title: "Circuit Analysis", description: "AC/DC circuits, network theorems, and circuit simulation." },
      { step: 2, title: "Power Systems", description: "Generation, transmission, distribution, and power system analysis." },
      { step: 3, title: "Control Systems", description: "Transfer functions, stability analysis, PID controllers." },
      { step: 4, title: "MATLAB & Simulink", description: "Simulation and modeling of electrical systems." },
      { step: 5, title: "Power Electronics", description: "Converters, inverters, motor drives, and power control." },
      { step: 6, title: "PLC & Automation", description: "Industrial automation, PLC programming, and SCADA systems." },
      { step: 7, title: "Electrical Projects", description: "Build projects combining circuit design and simulation." },
      { step: 8, title: "Internship Preparation", description: "Prepare for electrical engineering interviews and apply." }
    ],
    projects: [
      { name: "Home Energy Monitor", difficulty: "Beginner", skills: ["Circuit Design", "Sensors", "Data Logging"], description: "Build a device that monitors home electricity consumption and displays usage data." },
      { name: "Solar Charge Controller", difficulty: "Intermediate", skills: ["Power Electronics", "MATLAB", "Circuit Design"], description: "Design a solar panel charge controller with MPPT algorithm simulation." },
      { name: "Smart Grid Simulation", difficulty: "Advanced", skills: ["MATLAB", "Simulink", "Power Systems", "Renewable Energy"], description: "Simulate a smart grid system with renewable energy integration and load balancing." }
    ],
    internshipPrep: [
      "Master circuit analysis and power system fundamentals",
      "Build 2–3 electrical engineering projects with simulations",
      "Learn MATLAB/Simulink for system modeling",
      "Document projects with circuit diagrams and simulation results",
      "Practice EE interview questions (circuits, power, control systems)",
      "Apply to electrical engineering internships at power and manufacturing companies"
    ]
  },
  {
    id: "mechanical-design-engineer",
    name: "Mechanical Design Engineer",
    icon: "🏭",
    description: "Design mechanical components and systems using CAD tools and engineering principles.",
    relevantEducation: ["B.Tech", "M.Tech", "B.E.", "M.E.", "Diploma"],
    relevantBranches: ["Mechanical", "Mechatronics", "Manufacturing", "Industrial", "Automobile", "Mechanical Engineering", "Production Engineering"],
    interestKeywords: ["Mechanical Design", "CAD", "Product Design", "3D Modeling", "Manufacturing", "Automotive", "Mechanical Engineering", "Design Engineering"],
    relevantSkills: ["AutoCAD", "SolidWorks", "CATIA", "Fusion 360", "ANSYS", "FEA", "GD&T", "3D Printing", "CNC", "Thermodynamics", "Fluid Mechanics", "Material Science", "Creo", "Manufacturing Processes"],
    requiredSkills: ["SolidWorks or AutoCAD", "Engineering Drawing", "Material Science Basics", "FEA Basics", "GD&T"],
    roadmap: [
      { step: 1, title: "Engineering Drawing", description: "Technical drawing, projections, sections, and dimensioning." },
      { step: 2, title: "CAD Software", description: "AutoCAD, SolidWorks, or CATIA for 2D and 3D modeling." },
      { step: 3, title: "Material Science", description: "Properties of materials, selection criteria, and testing." },
      { step: 4, title: "Mechanical Design Principles", description: "Machine design, stress analysis, and failure theories." },
      { step: 5, title: "FEA & Simulation", description: "Finite Element Analysis using ANSYS or SolidWorks Simulation." },
      { step: 6, title: "Manufacturing Processes", description: "Casting, machining, welding, and 3D printing processes." },
      { step: 7, title: "Design Projects", description: "Design mechanical components and assemblies with analysis." },
      { step: 8, title: "Internship Preparation", description: "Build portfolio with CAD designs and apply to design roles." }
    ],
    projects: [
      { name: "Gear Assembly Design", difficulty: "Beginner", skills: ["SolidWorks", "Engineering Drawing", "Assembly"], description: "Design a gear assembly with proper tolerances and create engineering drawings." },
      { name: "Robotic Arm Mechanism", difficulty: "Intermediate", skills: ["CAD", "Kinematics", "FEA", "3D Printing"], description: "Design a 3-DOF robotic arm with stress analysis and 3D printed prototype." },
      { name: "Electric Vehicle Chassis", difficulty: "Advanced", skills: ["CATIA/SolidWorks", "FEA", "Material Science", "Automotive Design"], description: "Design an EV chassis with structural analysis and weight optimization." }
    ],
    internshipPrep: [
      "Master at least one CAD software (SolidWorks/AutoCAD/CATIA)",
      "Build 2–3 design projects with analysis and documentation",
      "Create a portfolio with 3D models and engineering drawings",
      "Learn basics of FEA and simulation",
      "Practice mechanical design interview questions",
      "Apply to design engineering internships at manufacturing companies"
    ]
  },
  {
    id: "civil-structural-engineer",
    name: "Civil / Structural Engineer",
    icon: "🏗️",
    description: "Design and analyze buildings, bridges, and infrastructure projects.",
    relevantEducation: ["B.Tech", "M.Tech", "B.E.", "M.E.", "Diploma"],
    relevantBranches: ["Civil", "Structural", "Construction", "Civil Engineering", "Environmental Engineering"],
    interestKeywords: ["Civil Engineering", "Structural Engineering", "Construction", "Building Design", "Infrastructure", "Architecture", "Structural Design"],
    relevantSkills: ["AutoCAD", "STAAD Pro", "ETABS", "Revit", "Primavera", "Surveying", "RCC Design", "Steel Structures", "Concrete Technology", "Soil Mechanics", "Structural Analysis", "Estimation", "MS Project"],
    requiredSkills: ["AutoCAD", "Structural Analysis", "RCC Design", "Surveying Basics", "Construction Management Basics"],
    roadmap: [
      { step: 1, title: "Engineering Mechanics", description: "Statics, dynamics, strength of materials, and structural behavior." },
      { step: 2, title: "AutoCAD & BIM", description: "2D drafting with AutoCAD and Building Information Modeling with Revit." },
      { step: 3, title: "Structural Analysis", description: "Analysis of beams, trusses, frames using classical and matrix methods." },
      { step: 4, title: "RCC & Steel Design", description: "Design of reinforced concrete and steel structural elements." },
      { step: 5, title: "Design Software", description: "STAAD Pro, ETABS for structural analysis and design." },
      { step: 6, title: "Construction Management", description: "Project planning, estimation, and scheduling with Primavera/MS Project." },
      { step: 7, title: "Civil Engineering Projects", description: "Design structural projects with analysis reports." },
      { step: 8, title: "Internship Preparation", description: "Prepare portfolio with design projects and apply to firms." }
    ],
    projects: [
      { name: "Residential Building Design", difficulty: "Beginner", skills: ["AutoCAD", "RCC Design", "Estimation"], description: "Design a small residential building with structural plans and cost estimation." },
      { name: "Bridge Structural Analysis", difficulty: "Intermediate", skills: ["STAAD Pro", "Structural Analysis", "Steel Design"], description: "Analyze and design a small bridge structure with load calculations." },
      { name: "Green Building Design", difficulty: "Advanced", skills: ["Revit", "ETABS", "Sustainable Design", "BIM"], description: "Design an energy-efficient green building with BIM modeling and structural analysis." }
    ],
    internshipPrep: [
      "Master AutoCAD and at least one structural analysis software",
      "Build 2–3 structural design projects with analysis reports",
      "Create a portfolio with drawings and design calculations",
      "Learn construction site practices and safety standards",
      "Practice civil engineering interview questions",
      "Apply to civil engineering internships at construction firms"
    ]
  }
];

module.exports = { CAREERS };
