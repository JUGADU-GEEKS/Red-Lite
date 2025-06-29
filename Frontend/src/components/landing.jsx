import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Cpu, Wifi, BarChart3, CheckCircle, ArrowRight, Activity, Zap, Shield, Clock } from 'lucide-react';

function Landing() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Custom scrollbar styles (same as landing page)
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        {/* Mouse Follower */}
        <motion.div
          className="absolute w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 160,
            y: mousePosition.y - 160,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 container mx-auto px-6 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.header className="text-center mb-16" variants={itemVariants}>
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/20 rounded-full px-6 py-2 mb-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Activity className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Smart Traffic Revolution</span>
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Smart Traffic
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Control System
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Revolutionizing urban mobility with AI-powered traffic management. 
            Intelligent lane detection, real-time optimization, and IoT integration 
            for seamless city-wide traffic flow.
          </motion.p>
        </motion.header>

        {/* Hero Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          variants={itemVariants}
        >
          {[
            { icon: Camera, label: "Live Detection", value: "99.2%", color: "text-blue-400" },
            { icon: Zap, label: "Response Time", value: "<2s", color: "text-emerald-400" },
            { icon: Shield, label: "Reliability", value: "99.9%", color: "text-purple-400" },
            { icon: Clock, label: "Efficiency", value: "+45%", color: "text-orange-400" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-center"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(55, 65, 81, 0.8)"
              }}
              variants={floatingVariants}
              animate="animate"
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
              <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Stack */}
        <motion.div className="mb-20" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Powered by Advanced Technology
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Camera, name: "YOLOv5", desc: "Computer Vision", gradient: "from-blue-500 to-cyan-500" },
              { icon: Cpu, name: "FastAPI", desc: "AI Backend", gradient: "from-emerald-500 to-teal-500" },
              { icon: BarChart3, name: "Node.js", desc: "Logic Controller", gradient: "from-purple-500 to-pink-500" },
              { icon: Wifi, name: "Arduino", desc: "IoT Integration", gradient: "from-orange-500 to-red-500" }
            ].map((tech, index) => (
              <motion.div
                key={index}
                className="group relative"
                whileHover={{ y: -10 }}
                variants={itemVariants}
              >
                <motion.div
                  className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-center h-full"
                  whileHover={{
                    borderColor: "rgba(59, 130, 246, 0.5)",
                    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.1)"
                  }}
                  variants={pulseVariants}
                  animate="animate"
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${tech.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <tech.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{tech.name}</h3>
                  <p className="text-sm text-gray-400">{tech.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div className="mb-20" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Core Features
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Real-time Vehicle Detection",
                desc: "Advanced YOLO-based computer vision for accurate vehicle counting and traffic density analysis",
                icon: Camera,
                gradient: "from-blue-500/20 to-cyan-500/20"
              },
              {
                title: "Intelligent Signal Control",
                desc: "Dynamic traffic light management based on live traffic data and optimized algorithms",
                icon: Activity,
                gradient: "from-emerald-500/20 to-teal-500/20"
              },
              {
                title: "IoT Integration",
                desc: "Seamless Arduino-based hardware control with Wi-Fi connectivity for instant signal updates",
                icon: Wifi,
                gradient: "from-purple-500/20 to-pink-500/20"
              },
              {
                title: "Conflict Prevention",
                desc: "Advanced logic ensures no conflicting signals with safe lane transitions",
                icon: Shield,
                gradient: "from-orange-500/20 to-red-500/20"
              },
              {
                title: "Live Monitoring",
                desc: "Real-time dashboard with camera feeds, vehicle counts, and system status",
                icon: BarChart3,
                gradient: "from-indigo-500/20 to-purple-500/20"
              },
              {
                title: "Emergency Override",
                desc: "Manual control capabilities for emergency situations and maintenance",
                icon: Zap,
                gradient: "from-rose-500/20 to-pink-500/20"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-br ${feature.gradient} backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6`}
                whileHover={{ 
                  scale: 1.02,
                  borderColor: "rgba(59, 130, 246, 0.3)"
                }}
                variants={itemVariants}
              >
                <feature.icon className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          variants={itemVariants}
        >
          <motion.div
            className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/20 rounded-3xl p-12 max-w-4xl mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Ready to Transform Traffic Management?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the smart city revolution with our AI-powered traffic control system. 
              Reduce congestion, improve safety, and optimize urban mobility.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href='/detection'>
              <motion.button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </a>
              
              <motion.button
                className="border border-gray-600 hover:border-blue-500 px-8 py-4 rounded-xl font-semibold text-white hover:bg-blue-500/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Demo
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 right-20 w-4 h-4 bg-blue-400 rounded-full opacity-60"
        animate={{
          y: [0, -30, 0],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-32 left-16 w-6 h-6 bg-purple-400 rounded-full opacity-40"
        animate={{
          y: [0, -40, 0],
          x: [0, 20, 0],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <motion.div
        className="absolute top-1/2 right-8 w-3 h-3 bg-emerald-400 rounded-full opacity-50"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </div>
  );
}

export default Landing;