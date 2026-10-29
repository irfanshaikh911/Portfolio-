import { Outlet } from 'react-router-dom'
import { SmoothScroll } from './components/SmoothScroll'
import { ScrollProgress } from './components/motion/ScrollProgress'
import { ScrollToTop } from './components/ScrollToTop'
import { Navigation } from './components/Navigation'
import { Marquee } from './components/Marquee'
import { Footer } from './components/Footer'
import { ChatBookingProvider } from './components/ChatBookingContext'
import { useTheme } from './hooks/useTheme'
import { useAccent } from './hooks/useAccent'

export function AppLayout() {
  const { theme, toggleTheme } = useTheme()
  useAccent()

  return (
    <SmoothScroll>
      <ChatBookingProvider>
        <ScrollToTop />
        <ScrollProgress />
        <div className="app">
          <div className="page-shell">
            <Navigation theme={theme} onToggleTheme={toggleTheme} />
            <main>
              <Outlet />
            </main>
            <Marquee />
            <Footer />
          </div>
        </div>
      </ChatBookingProvider>
    </SmoothScroll>
  )
}
