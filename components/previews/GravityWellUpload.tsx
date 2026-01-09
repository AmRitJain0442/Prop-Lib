'use client'

import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion'
import { Upload, File, CheckCircle } from 'lucide-react'
import { useState, useRef } from 'react'

export default function GravityWellUpload() {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploaded, setIsUploaded] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [fileName, setFileName] = useState('')
  const [dragCounter, setDragCounter] = useState(0)
  const [orbitalAngle, setOrbitalAngle] = useState(0)
  
  const fileX = useMotionValue(0)
  const fileY = useMotionValue(0)
  const controls = useAnimation()
  const buttonControls = useAnimation()
  const containerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    setDragCounter(prev => prev + 1)
    if (!isDragging) {
      setIsDragging(true)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      
      // Calculate distance to center
      const dx = centerX - mouseX
      const dy = centerY - mouseY
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      // Calculate current angle to mouse position
      const angleToMouse = Math.atan2(dy, dx)
      
      // Apply orbital swirl - increases with proximity
      const orbitalSpeed = Math.max(0, 1 - distance / 300) * 0.15
      setOrbitalAngle(prev => prev + orbitalSpeed)
      
      // Apply gravity effect with orbital motion
      const gravityStrength = Math.max(0, 1 - distance / 300)
      const orbitRadius = distance * (1 - gravityStrength * 0.3)
      
      // Calculate position with orbital swirl
      const swirledAngle = angleToMouse + orbitalAngle
      const targetX = centerX - Math.cos(swirledAngle) * orbitRadius
      const targetY = centerY - Math.sin(swirledAngle) * orbitRadius
      
      fileX.set(targetX)
      fileY.set(targetY)
    }
  }

  const handleFileSelect = async (file: File) => {
    setFileName(file.name)
    setIsUploading(true)
    
    // Animate file icon to center (if dragging)
    if (isDragging) {
      await controls.start({
        scale: [1, 0.5, 0],
        rotate: [0, 720],
        opacity: [1, 1, 0],
        transition: { duration: 0.6, ease: 'easeIn' }
      })
    }
    
    // Transform button to earth/planet while uploading
    buttonControls.start({
      scale: [1, 1.2, 1],
      transition: { duration: 0.8, ease: 'easeOut' }
    })
    
    // Simulate upload delay
    setTimeout(() => {
      setIsUploaded(true)
      setIsUploading(false)
      setIsDragging(false)
      
      // Reset after showing success
      setTimeout(() => {
        setIsUploaded(false)
        setFileName('')
      }, 3000)
    }, 2000)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragCounter(0)
    
    const files = e.dataTransfer.files
    
    if (files.length > 0) {
      handleFileSelect(files[0])
    } else {
      setIsDragging(false)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragCounter(prev => prev - 1)
    if (dragCounter <= 1) {
      setIsDragging(false)
      setOrbitalAngle(0)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-full w-full bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 p-8">
      <div
        ref={containerRef}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        className="relative w-full max-w-md aspect-square"
      >
        {/* Orbital rings */}
        {isDragging && (
          <>
            <motion.div
              className="absolute inset-0 border-2 border-purple-500/30 rounded-full"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-8 border-2 border-blue-500/30 rounded-full"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-16 border-2 border-pink-500/30 rounded-full"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />
          </>
        )}

        {/* Central gravity well button */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          animate={isDragging ? {
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 0 20px rgba(168,85,247,0.5)',
              '0 0 40px rgba(168,85,247,0.8)',
              '0 0 20px rgba(168,85,247,0.5)',
            ]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={handleButtonClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileInputChange}
            className="hidden"
            accept="*/*"
          />
          <div className="relative">
            <motion.div
              className="w-32 h-32 rounded-full flex items-center justify-center shadow-2xl overflow-hidden"
              animate={buttonControls}
              style={{
                background: isUploading || isUploaded
                  ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 30%, #10b981 60%, #059669 100%)'
                  : 'linear-gradient(to bottom right, rgb(147, 51, 234), rgb(219, 39, 119))'
              }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Earth/Planet texture during upload */}
              {(isUploading || isUploaded) && (
                <>
                  {/* Continents/landmasses */}
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="absolute top-4 left-6 w-8 h-6 bg-green-600/60 rounded-full" />
                    <div className="absolute top-8 right-8 w-12 h-8 bg-green-700/60 rounded-lg rotate-45" />
                    <div className="absolute bottom-6 left-8 w-10 h-10 bg-green-600/60 rounded-full" />
                    <div className="absolute bottom-8 right-6 w-6 h-8 bg-green-700/60 rounded-lg -rotate-12" />
                  </motion.div>
                  {/* Clouds */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  >
                    <div className="absolute top-6 right-4 w-6 h-3 bg-white/30 rounded-full blur-sm" />
                    <div className="absolute top-12 left-4 w-8 h-3 bg-white/30 rounded-full blur-sm" />
                    <div className="absolute bottom-10 right-8 w-5 h-2 bg-white/30 rounded-full blur-sm" />
                  </motion.div>
                  {/* Atmosphere glow */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-300/20 via-transparent to-transparent" />
                </>
              )}
              
              {isUploaded ? (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="relative z-10"
                >
                  <CheckCircle className="w-16 h-16 text-white drop-shadow-lg" />
                </motion.div>
              ) : isUploading ? (
                <motion.div
                  className="relative z-10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Upload className="w-16 h-16 text-white/80 drop-shadow-lg" />
                </motion.div>
              ) : (
                <Upload className="w-16 h-16 text-white" />
              )}
            </motion.div>

            {/* Gravity field visualization */}
            {isDragging && (
              <motion.div
                className="absolute inset-0 rounded-full bg-purple-500/20"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </div>
        </motion.div>

        {/* Dragged file indicator */}
        {isDragging && !isUploaded && (
          <motion.div
            className="absolute pointer-events-none"
            style={{
              left: fileX,
              top: fileY,
              x: '-50%',
              y: '-50%',
            }}
            animate={controls}
          >
            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-2xl flex items-center gap-3"
              animate={{
                rotate: orbitalAngle * 57.2958, // Convert radians to degrees
              }}
              transition={{ duration: 0.1, ease: 'linear' }}
            >
              <File className="w-8 h-8 text-purple-600" />
              <span className="text-sm font-medium text-gray-800">
                {fileName || 'Drop file here'}
              </span>
            </motion.div>
          </motion.div>
        )}

        {/* Instructions */}
        {!isDragging && !isUploaded && !isUploading && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-white/60 text-sm">Click to upload or drag a file to experience the gravity well</p>
          </motion.div>
        )}

        {/* Success message */}
        {isUploaded && (
          <motion.div
            className="absolute top-4 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-lg px-4 py-2">
              <p className="text-green-300 text-sm font-medium">File uploaded successfully!</p>
            </div>
          </motion.div>
        )}

        {/* Uploading message */}
        {isUploading && fileName && (
          <motion.div
            className="absolute top-4 left-1/2 -translate-x-1/2 max-w-xs"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-lg px-4 py-2">
              <p className="text-purple-300 text-sm font-medium truncate">Uploading {fileName}...</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
