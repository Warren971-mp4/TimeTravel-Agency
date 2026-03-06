import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowUpRight } from 'lucide-react';

interface DestinationProps {
  id: string;
  title: string;
  year: string;
  description: string;
  image: string;
  video?: string;
  price?: string;
  tags: string[];
}

export default function DestinationCard({ id, title, year, description, image, video, price, tags }: DestinationProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, transition: { duration: 0.4, ease: "easeOut" } }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative h-[500px] w-full overflow-hidden rounded-2xl bg-zinc-900 border border-white/10 shadow-lg hover:shadow-2xl hover:shadow-amber-900/20 transition-all duration-500"
    >
      <img 
        src={image} 
        alt={title} 
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-60 ${video ? 'z-0' : 'z-10'}`}
        loading="lazy"
      />
      
      {video && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"
        >
          <source src={video} type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent z-20" />
      
      <div className="absolute top-4 right-4 z-30">
        <span className="px-3 py-1 bg-amber-500 text-black text-sm font-bold rounded-full shadow-lg shadow-amber-500/20">
          {year}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-8 z-30 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          {tags.map(tag => (
            <span key={tag} className="px-2 py-1 text-xs font-medium bg-white/10 backdrop-blur-md rounded-md text-white/90 border border-white/10">
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-2 font-sans">{title}</h3>
        <p className="text-zinc-300 mb-6 line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
          {description}
        </p>
        
        <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-4">
          {price && (
            <div className="text-amber-500 font-bold text-lg">
              {price} <span className="text-xs text-zinc-400 font-normal">/ personne</span>
            </div>
          )}
          <Link 
            to={`/booking?destination=${id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-amber-400 transition-colors"
          >
            Réserver <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
