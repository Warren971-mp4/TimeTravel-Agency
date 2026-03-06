import Hero from '@/components/Hero';
import DestinationCard from '@/components/DestinationCard';
import { motion } from 'motion/react';
import { Shield, Star, Zap } from 'lucide-react';

const featuredDestinations = [
  {
    id: 'paris-1889',
    title: 'Paris - Exposition Universelle',
    year: '1889',
    description: 'Assistez à l\'inauguration de la Tour Eiffel et à l\'apogée de la Belle Époque.',
    image: 'https://i.imgur.com/cjnfLQF.jpeg',
    video: 'https://i.imgur.com/QAjgEr7.mp4',
    price: '5 500 ₡',
    tags: ['Culture', 'Histoire']
  },
  {
    id: 'cretaceous',
    title: 'Le Crétacé',
    year: '-66M',
    description: 'Marchez parmi les géants. Découvrez la puissance brute de la nature à l\'ère des dinosaures.',
    image: 'https://i.imgur.com/OyX1cDT.jpeg',
    video: 'https://i.imgur.com/LWowosF.mp4',
    price: '8 900 ₡',
    tags: ['Nature', 'Aventure']
  },
  {
    id: 'florence-1504',
    title: 'Florence - Renaissance',
    year: '1504',
    description: 'Rencontrez les maîtres. Voyez Michel-Ange dévoiler son David. Discutez philosophie avec De Vinci.',
    image: 'https://i.imgur.com/DSIutWs.jpeg',
    video: 'https://i.imgur.com/wKbRiRw.mp4',
    price: '6 200 ₡',
    tags: ['Art', 'Philosophie']
  }
];

import DestinationQuiz from '@/components/DestinationQuiz';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      
      {/* Features Section */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5"
            >
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-amber-500">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Sécurité Quantique</h3>
              <p className="text-zinc-400">Nos boucliers temporels brevetés garantissent votre sécurité et vous protègent des paradoxes.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5"
            >
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-amber-500">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Transport Instantané</h3>
              <p className="text-zinc-400">Pas de décalage horaire. Pas de temps de trajet. Entrez dans la capsule et sortez dans l'histoire.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5"
            >
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-amber-500">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Expérience Premium</h3>
              <p className="text-zinc-400">Hébergement de luxe à chaque époque. Vivez le passé avec le confort moderne.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-24 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-end mb-12"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Destinations Populaires</h2>
              <p className="text-zinc-400">Nos destinations les plus prisées ce mois-ci.</p>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDestinations.map((dest, index) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <DestinationCard {...dest} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Quiz */}
      <DestinationQuiz />

      {/* How It Works - Minimal & Modern */}
      <section className="py-16 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {[
              { num: "01", title: "Sélection", desc: "Choisissez votre destination parmi nos époques certifiées." },
              { num: "02", title: "Immersion", desc: "Briefing complet et équipement d'époque fourni." },
              { num: "03", title: "Départ", desc: "Transfert quantique instantané vers le passé." }
            ].map((step, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="px-8 py-4 text-center md:text-left group cursor-default"
              >
                <span className="block text-6xl font-sans font-bold text-zinc-900 mb-4 group-hover:text-zinc-800 transition-colors">{step.num}</span>
                <h3 className="text-lg font-medium text-white mb-2 group-hover:text-amber-500 transition-colors">{step.title}</h3>
                <p className="text-zinc-500 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Social Proof / Testimonials */}
      <section className="py-24 bg-zinc-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ce que disent nos voyageurs</h2>
            <p className="text-zinc-400">Ils ont vu l'histoire de leurs propres yeux.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sophie L.",
                role: "Architecte",
                quote: "Voir la construction des pyramides a changé ma vision de l'ingénierie pour toujours. Une expérience bouleversante.",
                trip: "Gizeh, -2560"
              },
              {
                name: "Marc D.",
                role: "Historien",
                quote: "J'ai passé ma vie à étudier la Rome antique. Y marcher, sentir les odeurs, entendre les bruits... c'est indescriptible.",
                trip: "Rome, 120"
              },
              {
                name: "Elena R.",
                role: "Passionnée de Jazz",
                quote: "Le Paris des années 20 est encore plus vibrant que dans les films. J'ai pu voir Joséphine Baker sur scène !",
                trip: "Paris, 1925"
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-zinc-900 border border-white/5 relative overflow-hidden group hover:border-amber-500/30 transition-colors"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Star className="w-24 h-24 text-amber-500 rotate-12" />
                </div>
                
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>

                <blockquote className="text-lg text-zinc-300 mb-6 italic relative z-10">
                  "{testimonial.quote}"
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-white">{testimonial.name}</div>
                    <div className="text-xs text-zinc-500">{testimonial.role} • <span className="text-amber-500/80">{testimonial.trip}</span></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
