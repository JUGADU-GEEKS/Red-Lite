import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 

  Activity,
  Camera,
  CheckCircle,
  Eye,
  Monitor,
  Wifi,
  Cpu,
  Server,
  Zap,
  ArrowRight,
  ArrowDown,
  Settings,
  Shield,
  ChevronRight,
  Code,
  Lightbulb,
  FileVideo,
  Brain,
  Radio,
} from "lucide-react";

// Custom scrollbar styles
const scrollbarStyles = `
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #000000 100%);
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
    border-radius: 10px;
    border: 1px solid #1e293b;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #2563eb 0%, #7c3aed 50%, #0891b2 100%);
  }
`;

// Step Card Component
const StepCard = ({ step, title, description, icon: Icon, techStack, isActive, onClick }) => {
  return (
    <motion.div
      className={`relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border-2 ${
        isActive ? 'border-blue-500/50' : 'border-gray-700/50'
      } rounded-2xl p-6 shadow-2xl cursor-pointer overflow-hidden`}
      whileHover={{ scale: 1.02, borderColor: "#3b82f6" }}
      animate={isActive ? { 
        boxShadow: ["0 0 20px #3b82f64d", "0 0 30px #3b82f680", "0 0 20px #3b82f64d"] 
      } : {}}
      transition={{ duration: 2, repeat: Infinity }}
      onClick={onClick}
    >
      {/* Step Number */}
      <div className="flex items-center gap-4 mb-4">
        <motion.div
          className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg"
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.3 }}
        >
          {step}
        </motion.div>
        <div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Icon className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">{techStack}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-300 leading-relaxed mb-4">{description}</p>

      {/* Status Indicator */}
      <div className="absolute top-4 right-4">
        <motion.div
          className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-400' : 'bg-gray-400'}`}
          animate={isActive ? { opacity: [1, 0.3, 1] } : {}}
          transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
        />
      </div>

      {/* Hover Arrow */}
      <motion.div
        className="absolute bottom-4 right-4 opacity-0"
        whileHover={{ opacity: 1, x: 5 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronRight className="w-5 h-5 text-blue-400" />
      </motion.div>
    </motion.div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, color }) => {
  return (
    <motion.div
      className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-xl"
      whileHover={{ scale: 1.05, borderColor: color }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center`} style={{ backgroundColor: `${color}20` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
};

// Tech Stack Component
const TechStackCard = ({ category, technologies, icon: Icon, color }) => {
  return (
    <motion.div
      className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-xl"
      whileHover={{ scale: 1.02, borderColor: color }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center`} style={{ backgroundColor: `${color}20` }}>
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        <h3 className="text-xl font-semibold text-white">{category}</h3>
      </div>
      <div className="space-y-2">
        {technologies.map((tech, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-2 text-gray-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
            <span className="text-sm">{tech}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

function Usage() {
  const [activeStep, setActiveStep] = useState(1);

  React.useEffect(() => {
    // Inject custom scrollbar styles
    const style = document.createElement('style');
    style.textContent = scrollbarStyles;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const steps = [
    {
      step: 1,
      title: "Live Video Input",
      description: "Upload or connect live video feeds from 4 directions (North, South, East, West lanes). Government can provide live camera feeds or use pre-recorded traffic videos for analysis.",
      icon: FileVideo,
      techStack: "Camera Integration"
    },
    {
      step: 2,
      title: "AI Vehicle Detection",
      description: "Each video is processed using YOLOv5 and OpenCV to detect and count vehicles in real-time. The system identifies cars, trucks, buses, and other vehicles with high accuracy.",
      icon: Brain,
      techStack: "FastAPI + YOLOv5 + OpenCV"
    },
    {
      step: 3,
      title: "Traffic Logic Controller",
      description: "Node.js middleware analyzes vehicle counts from all lanes, applies intelligent logic to decide which lane gets green signal, ensuring no conflicting signals between perpendicular lanes.",
      icon: Cpu,
      techStack: "Node.js + Express"
    },
    {
      step: 4,
      title: "Arduino Signal Control",
      description: "The system sends control signals to Arduino via Wi-Fi (ESP8266). Arduino controls LED lights representing traffic signals for each lane, ensuring only one lane has green at a time.",
      icon: Radio,
      techStack: "Arduino UNO + ESP8266"
    },
    {
      step: 5,
      title: "Real-time Dashboard",
      description: "React frontend displays current signal status, live vehicle counts, camera feeds, and provides admin override capabilities for emergency situations.",
      icon: Monitor,
      techStack: "React.js + WebSocket"
    }
  ];

  const coreFeatures = [
    {
      icon: Eye,
      title: "Real-time Detection",
      description: "Advanced computer vision analyzes traffic density through live camera feeds",
      color: "#3b82f6"
    },
    {
      icon: Shield,
      title: "Conflict Prevention",
      description: "Ensures no conflicting signals - perpendicular lanes are never green together",
      color: "#10b981"
    },
    {
      icon: Zap,
      title: "Dynamic Control",
      description: "Automatically adjusts signal timing based on traffic density and priority logic",
      color: "#f59e0b"
    },
    {
      icon: Wifi,
      title: "IoT Integration",
      description: "Seamless communication between software and hardware via Wi-Fi connectivity",
      color: "#8b5cf6"
    },
    {
      icon: Settings,
      title: "Admin Override",
      description: "Manual control capabilities for emergency situations and maintenance",
      color: "#ef4444"
    },
    {
      icon: Activity,
      title: "Live Monitoring",
      description: "Real-time dashboard showing current status, counts, and system health",
      color: "#06b6d4"
    }
  ];

  const techStack = [
    {
      category: "Frontend",
      icon: Monitor,
      color: "#3b82f6",
      technologies: ["React.js", "Framer Motion", "Tailwind CSS", "WebSocket Client"]
    },
    {
      category: "AI Backend",
      icon: Brain,
      color: "#10b981",
      technologies: ["FastAPI", "YOLOv5", "OpenCV", "Ultralytics", "Python"]
    },
    {
      category: "Logic Controller",
      icon: Server,
      color: "#f59e0b",
      technologies: ["Node.js", "Express.js", "HTTP/WebSocket", "Traffic Algorithms"]
    },
    {
      category: "Hardware",
      icon: Cpu,
      color: "#8b5cf6",
      technologies: ["Arduino UNO", "ESP8266 Wi-Fi", "LED Controllers", "IoT Sensors"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white overflow-x-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -25, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      </div>

      {/* Header */}
      <motion.div
        className="relative z-10 text-center py-8 sm:py-12 px-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/20 rounded-full px-6 py-2 mb-6"
          whileHover={{ scale: 1.05 }}
        >
          <Lightbulb className="w-5 h-5 text-blue-400" />
          <span className="text-sm font-medium text-blue-300">How to Use Guide</span>
        </motion.div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
          Smart Traffic Control System
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          A comprehensive 4-lane intelligent traffic management system using computer vision and IoT to detect traffic density and dynamically control signal lights
        </p>
      </motion.div>

      {/* System Overview */}
      <motion.section
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">🔍 System Objective</h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
            Create an intelligent system that analyzes traffic density, decides optimal signal timing, prevents conflicting signals, and controls Arduino-based LED traffic lights via Wi-Fi communication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Step-by-Step Process */}
      <motion.section
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">🧠 Core Logic Flow</h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Follow these steps to understand how the system processes traffic data and controls signals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <StepCard
                {...step}
                isActive={activeStep === step.step}
                onClick={() => setActiveStep(step.step)}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Traffic Logic Rules */}
      <motion.section
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">🔁 Traffic Logic Rules</h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Core algorithms that ensure safe and efficient traffic flow
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                Safety Rules
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span>Only <strong>1 lane</strong> can have green signal at any time</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span>Perpendicular lanes are <strong>never green together</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span>Emergency override available for admins</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-400" />
                Priority Logic
              </h3>
              <div className="bg-gray-900/60 rounded-lg p-4 font-mono text-sm text-gray-300">
                <div className="text-green-400 mb-2">// Basic Priority Algorithm</div>
                <div className="text-blue-300">if</div> (laneA &gt; laneB && laneA &gt; laneC && laneA &gt; laneD) {'{'}
                <div className="ml-4 text-yellow-300">green = A</div>
                {'}'}
                <div className="mt-2 text-gray-500">// Based on vehicle density + timing rotation</div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Tech Stack */}
      <motion.section
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">🏗️ Technology Stack</h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Comprehensive technology integration for intelligent traffic management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techStack.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TechStackCard {...tech} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Getting Started */}
      <motion.section
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">🚀 Quick Start Guide</h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Basic setup instructions for development team
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-400" />
                  1. FastAPI + YOLO Backend
                </h3>
                <ul className="text-gray-300 text-sm space-y-1 ml-6">
                  <li>• Use ultralytics/yolov5</li>
                  <li>• Create FastAPI endpoint for frame analysis</li>
                  <li>• Return vehicle count per lane</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Server className="w-5 h-5 text-green-400" />
                  2. Node.js Logic Controller
                </h3>
                <ul className="text-gray-300 text-sm space-y-1 ml-6">
                  <li>• Poll FastAPI every few seconds</li>
                  <li>• Maintain state of all 4 lanes</li>
                  <li>• Send signal updates to Arduino</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-purple-400" />
                  3. Arduino + LEDs
                </h3>
                <ul className="text-gray-300 text-sm space-y-1 ml-6">
                  <li>• Receive data over Wi-Fi</li>
                  <li>• Control LED states per lane</li>
                  <li>• Implement safety protocols</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-yellow-400" />
                  4. React Frontend
                </h3>
                <ul className="text-gray-300 text-sm space-y-1 ml-6">
                  <li>• Display current signal status</li>
                  <li>• Show camera previews</li>
                  <li>• Admin override controls</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Communication Flow */}
      <motion.section
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">📡 Communication Flow</h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <motion.div
            className="flex flex-col items-center gap-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <span className="text-white font-semibold">Camera Feed</span>
          </motion.div>

          <ArrowRight className="w-6 h-6 text-gray-400 hidden md:block" />
          <ArrowDown className="w-6 h-6 text-gray-400 md:hidden" />

          <motion.div
            className="flex flex-col items-center gap-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <span className="text-white font-semibold">AI Processing</span>
          </motion.div>

          <ArrowRight className="w-6 h-6 text-gray-400 hidden md:block" />
          <ArrowDown className="w-6 h-6 text-gray-400 md:hidden" />

          <motion.div
            className="flex flex-col items-center gap-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
              <Cpu className="w-8 h-8 text-white" />
            </div>
            <span className="text-white font-semibold">Logic Controller</span>
          </motion.div>

          <ArrowRight className="w-6 h-6 text-gray-400 hidden md:block" />
          <ArrowDown className="w-6 h-6 text-gray-400 md:hidden" />

          <motion.div
            className="flex flex-col items-center gap-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Radio className="w-8 h-8 text-white" />
            </div>
            <span className="text-white font-semibold">Arduino Control</span>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer CTA */}
      <motion.section
        className="relative z-10 text-center py-16 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Begin by uploading traffic videos to the detection system and watch as the AI analyzes traffic patterns in real-time. The system will automatically manage signal timing for optimal traffic flow.
          </p>
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full"
          >
            {/* ...button or content here... */}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

export default Usage;