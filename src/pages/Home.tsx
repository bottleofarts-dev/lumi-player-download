import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { InstallGuide } from '../components/InstallGuide';

export function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-50 selection:bg-yellow-400/30 font-sans">
      <main>
        <Hero />
        <Features />
        <InstallGuide />
      </main>
      
      <footer className="border-t border-neutral-800 py-8 text-center text-neutral-500">
        <p>© {new Date().getFullYear()} Lumi Player. All rights reserved.</p>
      </footer>
    </div>
  );
}
