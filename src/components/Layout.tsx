import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X, Rocket } from 'lucide-react';
import { useState } from 'react';
import TimeDistortionBackground from './TimeDistortionBackground';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen text-zinc-100 font-sans selection:bg-amber-500/30 relative">
      <TimeDistortionBackground />
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-amber-500/10 rounded-lg group-hover:bg-amber-500/20 transition-colors">
                <Rocket className="w-6 h-6 text-amber-500" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">TimeTravel Agency</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Accueil</Link>
              <Link to="/destinations" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Destinations</Link>
              <Link to="/booking" className="px-4 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-zinc-200 transition-colors">
                Réserver
              </Link>
            </div>

            <button 
              className="md:hidden p-2 text-zinc-400 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-zinc-900 border-b border-white/5 p-4 flex flex-col gap-4"
          >
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-zinc-400 hover:text-white">Accueil</Link>
            <Link to="/destinations" onClick={() => setIsMenuOpen(false)} className="text-zinc-400 hover:text-white">Destinations</Link>
            <Link to="/booking" onClick={() => setIsMenuOpen(false)} className="text-amber-500 font-medium">Réserver</Link>
          </motion.div>
        )}
      </nav>

      <main className="pt-16">
        {children}
      </main>

      <footer className="bg-zinc-900 border-t border-white/5 py-12 mt-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-zinc-500 text-sm">© 2050 TimeTravel Agency. Tous les flux temporels réservés.</p>
        </div>
      </footer>
    </div>
  );
}
