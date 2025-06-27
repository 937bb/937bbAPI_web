<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useGlobalConfig } from '~/utils/globalConfig'

const props = defineProps({
  loadingText: {
    type: String,
    default: '加载中'
  },
  version: {
    type: String,
    default: '1.0.0'
  },
  duration: {
    type: Number,
    default: 2200
  },
  showAnimation: {
    type: Boolean,
    default: true
  },
  animationDuration: {
    type: Number,
    default: 600
  }
})

const { siteName } = useGlobalConfig()

const emit = defineEmits(['loaded'])

// State
const show = ref(true)
const progress = ref(0)
const loadingProgress = ref(0)
let animationFrame = null

// Computed
const logoScale = computed(() => ({
  'scale-105': progress.value > 10,
  'scale-95': progress.value <= 10
}))

const logoOpacity = computed(() => ({
  'opacity-100': progress.value > 15,
  'opacity-0': progress.value <= 15
}))

const titleClasses = computed(() => ({
  'opacity-100 translate-y-0': progress.value > 20,
  'opacity-0 translate-y-4': progress.value <= 20
}))

const textClasses = computed(() => ({
  'opacity-100': progress.value > 25,
  'opacity-0': progress.value <= 25
}))

const progressClasses = computed(() => ({
  'opacity-100': progress.value > 30,
  'opacity-0': progress.value <= 30
}))

// Methods
const startExitAnimation = () => {
  if (!props.showAnimation) {
    handleExit()
    return
  }
  
  setTimeout(handleExit, props.animationDuration)
}

const handleExit = () => {
  show.value = false
  emit('loaded')
}

const easeInOutCubic = (t) => 
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

const updateProgress = (elapsed, duration) => {
  const currentProgress = Math.min(elapsed / duration, 1)
  const easedProgress = easeInOutCubic(currentProgress)
  
  progress.value = easedProgress * 100
  loadingProgress.value = Math.min(Math.round(easedProgress * 100), 100)
  
  return currentProgress
}

const startLoading = () => {
  progress.value = 0
  loadingProgress.value = 0
  
  const duration = props.duration
  const startTime = Date.now()
  
  const animate = () => {
    const elapsed = Date.now() - startTime
    const currentProgress = updateProgress(elapsed, duration)
    
    if (currentProgress < 1) {
      animationFrame = requestAnimationFrame(animate)
    } else {
      setTimeout(startExitAnimation, 600)
    }
  }
  
  animationFrame = requestAnimationFrame(animate)
}

// Lifecycle
onMounted(() => {
  startLoading()
})

onBeforeUnmount(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})

// Expose methods
const publicMethods = {
  startLoading,
  startExitAnimation
}

defineExpose(publicMethods)
</script>

<template>
  <transition name="fade">
    <div v-if="show" class="splash-screen">
      <!-- Animated Background -->
      <div class="splash-bg"></div>
      
      <!-- Main Content -->
      <div class="splash-content">
        <!-- Logo -->
        <div class="logo-container">
          <img 
            src="../assets/logo.jpg" 
            alt="Logo"
            class="logo"
            :class="{ 'logo-visible': progress > 10 }"
          />
        </div>
        
        <!-- App Name -->
        <h1 class="app-name" :class="{ 'app-name-visible': progress > 20 }">
          {{ siteName }}
        </h1>
        
        <!-- Progress Bar -->
        <div class="progress-container">
          <div class="progress-bar" :style="{ width: `${progress}%` }">
            <div class="progress-highlight"></div>
          </div>
        </div>
        
        <!-- Status -->
        <div class="status" :class="{ 'status-visible': progress > 30 }">
          <span class="loading-text">{{ loadingText }}</span>
          <span class="percentage">{{ loadingProgress }}%</span>
        </div>
      </div>
      
      <!-- Version -->
      <div class="version" :class="{ 'version-visible': progress > 40 }">
        v{{ version }}
      </div>
    </div>
  </transition>
</template>

<script>
// ... (rest of the script remains the same)
</script>

<style scoped>
/* Base */
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

/* Background */
.splash-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #f0f4ff 0%, #e6f0ff 100%);
  z-index: -1;
}

/* Content */
.splash-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 320px;
  padding: 2.5rem 2rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.08);
  transform: translateY(0);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  opacity: 0;
  animation: contentFadeIn 0.8s 0.2s forwards;
}

/* Logo */
.logo-container {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(0.8);
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.logo-container img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 16px;
  transition: all 0.5s ease;
}

.logo-visible {
  transform: scale(1);
  opacity: 1;
}

/* App Name */
.app-name {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 2rem;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s;
}

.app-name-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Progress */
.progress-container {
  width: 100%;
  height: 4px;
  background: #f0f0f0;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%);
  border-radius: 2px;
  position: relative;
  transition: width 0.3s ease-out;
}

.progress-highlight {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, 
    rgba(255,255,255,0) 0%, 
    rgba(255,255,255,0.8) 50%, 
    rgba(255,255,255,0) 100%);
  animation: progressShine 1.5s infinite;
}

/* Status */
.status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 0.85rem;
  color: #666;
  opacity: 0;
  transform: translateY(5px);
  transition: all 0.4s ease 0.2s;
}

.status-visible {
  opacity: 1;
  transform: translateY(0);
}

.loading-text {
  font-weight: 500;
}

.percentage {
  font-family: 'SF Mono', 'Roboto Mono', monospace;
  font-weight: 600;
  color: #4f46e5;
}

/* Version */
.version {
  position: absolute;
  bottom: 1.5rem;
  font-size: 0.75rem;
  color: #999;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.4s ease 0.3s;
}

.version-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Animations */
@keyframes contentFadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes progressShine {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Responsive */
@media (max-width: 480px) {
  .splash-content {
    max-width: 280px;
    padding: 2rem 1.5rem;
  }
  
  .logo-container {
    width: 70px;
    height: 70px;
  }
  
  .app-name {
    font-size: 1.5rem;
    margin-bottom: 1.75rem;
  }
  
  .status {
    font-size: 0.8rem;
  }
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
