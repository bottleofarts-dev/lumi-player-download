import { motion } from "motion/react";
import { Download, CheckCircle2, Settings, Smartphone } from "lucide-react";

const steps = [
  {
    id: 1,
    name: 'Download the APK',
    description: 'Tap the download button above to get the latest debug APK file directly from the GitHub repository.',
    icon: Download,
  },
  {
    id: 2,
    name: 'Enable Unknown Sources',
    description: 'Go to your device Settings > Security (or Apps) and enable "Install unknown apps" for your web browser.',
    icon: Settings,
  },
  {
    id: 3,
    name: 'Install the App',
    description: 'Open the downloaded APK file and tap "Install". Wait a few moments for the installation to complete.',
    icon: Smartphone,
  },
  {
    id: 4,
    name: 'Enjoy your media',
    description: 'Open Lumi Player, grant the necessary storage permissions to read your media files, and start watching!',
    icon: CheckCircle2,
  },
];

export function InstallGuide() {
  return (
    <div className="py-24 sm:py-32 bg-[#0a0a0a] border-t border-neutral-900/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">How to Install</h2>
          <p className="mt-6 text-lg leading-8 text-neutral-400">
            Follow these simple steps to install the Lumi Player debug APK on your Android device. 
            No Google Play Services required.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="relative pl-0 lg:pl-4 transition-all"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
              >
                {/* Connector line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-12 w-full h-[2px] bg-neutral-800 -z-10" />
                )}
                
                <div className="bg-[#141414] border border-neutral-800/80 rounded-3xl p-6 h-full relative group hover:border-yellow-500/30 transition-colors">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-400 text-neutral-950 font-bold mb-6 ring-4 ring-[#0a0a0a]">
                    {step.id}
                  </div>
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
                    <step.icon className="w-5 h-5 text-yellow-400" />
                    {step.name}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-600/10 text-yellow-500/90 border border-yellow-500/20 px-4 py-2 rounded-full text-sm font-medium">
              Note: You might see a Google Play Protect warning since this is an unverified debug build. Select "Install anyway".
            </div>
        </div>
      </div>
    </div>
  );
}
