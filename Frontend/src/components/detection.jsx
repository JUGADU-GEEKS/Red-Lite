import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  Play, 
  Pause, 
  RotateCcw, 
  Activity, 
  Car, 
  Truck, 
  Bus,
  Camera,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  MapPin
} from "lucide-react";

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

// Lane Upload Component
const LaneUpload = ({ 
  direction, 
  position, 
  onUpload, 
  loading, 
  frame, 
  counts,
  isActive 
}) => {
  const directions = {
    north: { label: "North Lane", icon: "↑", rotation: "rotate-0" },
    south: { label: "South Lane", icon: "↓", rotation: "rotate-180" },
    east: { label: "East Lane", icon: "→", rotation: "rotate-90" },
    west: { label: "West Lane", icon: "←", rotation: "rotate-270" }
  };

  return (
    <motion.div
      className={`w-full h-full flex items-center justify-center`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: position * 0.2 }}
    >
      <motion.div
        className={`relative w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl h-64 sm:h-72 lg:h-80 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border-2 ${
          isActive ? 'border-blue-500/50' : 'border-gray-700/50'
        } rounded-2xl p-3 sm:p-4 shadow-2xl overflow-hidden`}
        whileHover={{ scale: 1.02, borderColor: "#3b82f6" }}
        animate={isActive ? { 
          boxShadow: ["0 0 20px #3b82f64d", "0 0 30px #3b82f680", "0 0 20px #3b82f64d"] 
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Direction Indicator */}
        <div className="flex items-center justify-center mb-3 sm:mb-4">
          <motion.div
            className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl ${directions[direction].rotation}`}
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.3 }}
          >
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
          </motion.div>
          <div className="ml-2 sm:ml-3">
            <h3 className="text-sm sm:text-lg font-semibold text-white">{directions[direction].label}</h3>
            <div className="flex items-center gap-1 sm:gap-2">
              <Camera className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
              <span className="text-xs sm:text-sm text-gray-400">Lane {position + 1}</span>
            </div>
          </div>
        </div>

        {/* Upload Area */}
        {!frame ? (
          <motion.div
            className="relative border-2 border-dashed border-gray-600 rounded-xl p-4 sm:p-6 text-center h-32 sm:h-40 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
            whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
          >
            <input
              type="file"
              accept="video/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) onUpload(file, direction);
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={loading}
            />
            
            <motion.div
              animate={loading ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 1, repeat: loading ? Infinity : 0 }}
            >
              {loading ? (
                <Clock className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-blue-400 mb-2 sm:mb-3" />
              ) : (
                <Upload className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-400 mb-2 sm:mb-3" />
              )}
            </motion.div>
            
            <p className="text-sm sm:text-base text-white font-medium mb-1">
              {loading ? "Processing..." : "Upload Video"}
            </p>
            <p className="text-xs sm:text-sm text-gray-400 px-2 text-center">
              {loading ? "Analyzing traffic..." : "Drop video file here or click to browse"}
            </p>
          </motion.div>
        ) : (
          /* Video Display */
          <motion.div
            className="relative rounded-xl overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={`data:image/jpeg;base64,${frame}`}
              alt={`${direction} lane detection`}
              className="w-full h-40 sm:h-48 lg:h-56 object-cover bg-black"
            />
            <div className="absolute top-2 right-2">
              <motion.div
                className="bg-green-500/80 backdrop-blur-sm rounded-full p-1.5 sm:p-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Vehicle Counts */}
        {counts && Object.keys(counts).length > 0 && (
          <motion.div
            className="mt-3 sm:mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="text-xs sm:text-sm font-semibold text-gray-300 mb-2 flex items-center gap-1 sm:gap-2">
              <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
              Live Detection
            </h4>
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
              {Object.entries(counts).map(([vehicle, count]) => {
                const getVehicleIcon = (type) => {
                  switch (type.toLowerCase()) {
                    case 'car': return Car;
                    case 'truck': return Truck;
                    case 'bus': return Bus;
                    default: return Car;
                  }
                };
                
                const VehicleIcon = getVehicleIcon(vehicle);
                
                return (
                  <motion.div
                    key={vehicle}
                    className="bg-gray-800/60 rounded-lg p-1.5 sm:p-2 flex items-center justify-between"
                    whileHover={{ backgroundColor: "rgba(55, 65, 81, 0.8)" }}
                  >
                    <div className="flex items-center gap-1 sm:gap-2">
                      <VehicleIcon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                      <span className="text-xs text-gray-300 capitalize">{vehicle}</span>
                    </div>
                    <motion.span
                      className="text-xs sm:text-sm font-bold text-emerald-400"
                      key={count}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {count}
                    </motion.span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Status Indicator */}
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
          <motion.div
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${
              loading ? 'bg-yellow-400' : frame ? 'bg-green-400' : 'bg-gray-400'
            }`}
            animate={loading ? { opacity: [1, 0.3, 1] } : {}}
            transition={{ duration: 1, repeat: loading ? Infinity : 0 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

// LaneStats component for per-lane statistics
const LaneStats = ({ counts, direction }) => {
  if (!counts || Object.keys(counts).length === 0) return null;
  const directionLabel = {
    north: 'North Lane',
    south: 'South Lane',
    east: 'East Lane',
    west: 'West Lane',
  }[direction] || direction;
  return (
    <div className="mt-3 sm:mt-4 w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-4 sm:p-6 shadow-xl mx-auto">
      <h3 className="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4 text-white">{directionLabel} Statistics</h3>
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        {Object.entries(counts).map(([vehicle, count]) => (
          <div key={vehicle} className="bg-slate-800/80 rounded-xl p-3 sm:p-4 flex flex-col items-center">
            <span className="text-xl sm:text-2xl font-bold text-emerald-400 mb-1">{count}</span>
            <span className="text-xs sm:text-sm text-blue-300 capitalize text-center">{vehicle} Detected</span>
          </div>
        ))}
      </div>
    </div>
  );
};

function Detection() {
  const [lanes, setLanes] = useState({
    north: { counts: {}, frame: "", loading: false },
    south: { counts: {}, frame: "", loading: false },
    east: { counts: {}, frame: "", loading: false },
    west: { counts: {}, frame: "", loading: false }
  });
  
  const wsRefs = useRef({});

  React.useEffect(() => {
    // Inject custom scrollbar styles
    const style = document.createElement('style');
    style.textContent = scrollbarStyles;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
      // Close all WebSocket connections
      Object.values(wsRefs.current).forEach(ws => {
        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.close();
        }
      });
    };
  }, []);

  const upload = async (file, direction) => {
    const form = new FormData();
    form.append("file", file);
    
    setLanes(prev => ({
      ...prev,
      [direction]: { ...prev[direction], loading: true }
    }));

    try {
      const res = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      
      setLanes(prev => ({
        ...prev,
        [direction]: { ...prev[direction], loading: false }
      }));

      startWebSocket(data.path, direction);
    } catch (error) {
      console.error("Upload failed:", error);
      setLanes(prev => ({
        ...prev,
        [direction]: { ...prev[direction], loading: false }
      }));
    }
  };

  const startWebSocket = (path, direction) => {
    // Close existing WebSocket for this direction
    if (wsRefs.current[direction]) {
      wsRefs.current[direction].close();
    }

    // Use lane-specific WebSocket endpoint
    wsRefs.current[direction] = new WebSocket("ws://localhost:8000/ws/process");

    wsRefs.current[direction].onopen = () => {
      wsRefs.current[direction].send(JSON.stringify({ path }));
    };

    wsRefs.current[direction].onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLanes(prev => ({
        ...prev,
        [direction]: {
          ...prev[direction],
          counts: data.counts,
          frame: data.frame
        }
      }));
    };

    wsRefs.current[direction].onerror = (e) => {
      console.error(`WebSocket error for ${direction}:`, e);
    };

    wsRefs.current[direction].onclose = () => {
      console.log(`WebSocket closed for ${direction}`);
    };
  };

  const getTotalCounts = () => {
    const totals = {};
    Object.values(lanes).forEach(lane => {
      Object.entries(lane.counts).forEach(([vehicle, count]) => {
        totals[vehicle] = (totals[vehicle] || 0) + count;
      });
    });
    return totals;
  };

  const getActiveLanes = () => {
    return Object.entries(lanes).filter(([_, lane]) => lane.frame).length;
  };

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
        className="relative z-10 text-center py-6 sm:py-8 px-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/20 rounded-full px-4 sm:px-6 py-2 mb-4"
          whileHover={{ scale: 1.05 }}
        >
          <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
          <span className="text-xs sm:text-sm font-medium text-blue-300">Live Traffic Detection</span>
        </motion.div>
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent px-4">
          Smart Crossroad Monitor
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto px-4">
          Real-time vehicle detection across all four lanes using advanced YOLO computer vision
        </p>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-400 mb-1">{getActiveLanes()}/4</div>
            <div className="text-xs sm:text-sm text-gray-400">Active Lanes</div>
          </div>
          {Object.entries(getTotalCounts()).slice(0, 3).map(([vehicle, count]) => (
            <div key={vehicle} className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-3 sm:p-4 text-center">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-emerald-400 mb-1">{count}</div>
              <div className="text-xs sm:text-sm text-gray-400 capitalize">{vehicle}s</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Crossroad Layout */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 pb-8">
        {/* Mobile and Tablet Layout (Vertical Stack) */}
        <div className="lg:hidden space-y-8 w-full max-w-lg mx-auto">
          <div className="flex flex-col items-center">
            <LaneUpload direction="north" position={0} onUpload={upload} loading={lanes.north.loading} frame={lanes.north.frame} counts={lanes.north.counts} isActive={!!lanes.north.frame} />
            <LaneStats counts={lanes.north.counts} direction="north" />
          </div>
          
          <div className="flex flex-col items-center">
            <LaneUpload direction="east" position={1} onUpload={upload} loading={lanes.east.loading} frame={lanes.east.frame} counts={lanes.east.counts} isActive={!!lanes.east.frame} />
            <LaneStats counts={lanes.east.counts} direction="east" />
          </div>
          
          <div className="flex flex-col items-center">
            <LaneUpload direction="south" position={2} onUpload={upload} loading={lanes.south.loading} frame={lanes.south.frame} counts={lanes.south.counts} isActive={!!lanes.south.frame} />
            <LaneStats counts={lanes.south.counts} direction="south" />
          </div>
          
          <div className="flex flex-col items-center">
            <LaneUpload direction="west" position={3} onUpload={upload} loading={lanes.west.loading} frame={lanes.west.frame} counts={lanes.west.counts} isActive={!!lanes.west.frame} />
            <LaneStats counts={lanes.west.counts} direction="west" />
          </div>
        </div>

        {/* Desktop Layout (Grid) */}
        <div className="hidden lg:flex flex-col items-center justify-center min-h-[800px] gap-y-20">
          {/* Row 1: North & East */}
          <div className="flex flex-row justify-between items-start w-full max-w-5xl xl:max-w-6xl gap-x-12 xl:gap-x-20">
            <div className="flex flex-col items-center flex-1">
              <LaneUpload direction="north" position={0} onUpload={upload} loading={lanes.north.loading} frame={lanes.north.frame} counts={lanes.north.counts} isActive={!!lanes.north.frame} />
              <LaneStats counts={lanes.north.counts} direction="north" />
            </div>
            <div className="flex flex-col items-center flex-1">
              <LaneUpload direction="east" position={2} onUpload={upload} loading={lanes.east.loading} frame={lanes.east.frame} counts={lanes.east.counts} isActive={!!lanes.east.frame} />
              <LaneStats counts={lanes.east.counts} direction="east" />
            </div>
          </div>
          {/* Row 2: West & South */}
          <div className="flex flex-row justify-between items-start w-full max-w-5xl xl:max-w-6xl gap-x-12 xl:gap-x-20">
            <div className="flex flex-col items-center flex-1">
              <LaneUpload direction="west" position={3} onUpload={upload} loading={lanes.west.loading} frame={lanes.west.frame} counts={lanes.west.counts} isActive={!!lanes.west.frame} />
              <LaneStats counts={lanes.west.counts} direction="west" />
            </div>
            <div className="flex flex-col items-center flex-1">
              <LaneUpload direction="south" position={1} onUpload={upload} loading={lanes.south.loading} frame={lanes.south.frame} counts={lanes.south.counts} isActive={!!lanes.south.frame} />
              <LaneStats counts={lanes.south.counts} direction="south" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detection;