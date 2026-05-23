import { motion } from "motion/react";
import { Settings, Zap, MonitorPlay, Shield, Volume2, Maximize } from "lucide-react";

const features = [
  {
    name: 'Hardware Acceleration',
    description: 'Utilizes cutting-edge hardware decoding for buttery smooth 4K and 8K playback without draining your battery.',
    icon: Zap,
  },
  {
    name: 'Intuitive Gestures',
    description: 'Control volume, brightness, and seeking with simple screen swipes. Designed for easy one-handed use.',
    icon: Maximize,
  },
  {
    name: 'Format Support',
    description: 'Plays almost any video format you throw at it (MKV, MP4, AVI, MOV, Ogg, FLAC, TS, M2TS, Wv and AAC).',
    icon: MonitorPlay,
  },
  {
    name: 'Audio Boost',
    description: 'Crystal clear audio processing with a built-in equalizer and up to 200% volume boost for quiet media.',
    icon: Volume2,
  },
  {
    name: 'Privacy Focused',
    description: 'No telemetry, no ads, and no unnecessary permissions. Your media stays yours.',
    icon: Shield,
  },
  {
    name: 'Advanced Subtitles',
    description: 'Multi-track audio and subtitle support. Automatically load subtitles or search for them online.',
    icon: Settings,
  },
];

export function Features() {
  return (
    <div className="py-24 sm:py-32 bg-[#0c0c0c] relative border-t border-neutral-900/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-yellow-400">Next-gen playback</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need in a video player
          </p>
          <p className="mt-6 text-lg leading-8 text-neutral-400">
            Lumi Player is built from the ground up for speed, reliability, and ease of use. 
            Enjoy a premium viewing experience on your Android device.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.name} 
                className="flex flex-col relative bg-[#141414] border border-neutral-800/60 p-6 rounded-3xl hover:bg-[#1a1a1a] transition-colors shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-yellow-400/10 border border-yellow-400/20">
                    <feature.icon className="h-5 w-5 text-yellow-500" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-neutral-400">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
