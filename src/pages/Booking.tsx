import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, Users, Clock, ArrowLeft, Check, Shield, Info } from 'lucide-react';

const destinationsData: Record<string, any> = {
  'paris-1889': {
    id: 'paris-1889',
    title: 'Paris - Exposition Universelle',
    year: '1889',
    tag: 'Sécurité Maximale',
    image: 'https://i.imgur.com/cjnfLQF.jpeg',
    description: "Plongez au cœur de la Révolution Industrielle lors de l'Exposition Universelle de 1889. Admirez la Tour Eiffel flambant neuve, flânez sur les grands boulevards haussmanniens et découvrez les innovations qui ont façonné le monde moderne. Une expérience culturelle et artistique inoubliable.",
    highlights: [
      "Inauguration Tour Eiffel",
      "Cabarets de Montmartre",
      "Rencontre avec Gustave Eiffel",
      "Dîner gastronomique d'époque"
    ],
    price: "5 500 ₡",
    duration: "7 Jours",
    inclus: [
      "Transport temporel A/R",
      "Hébergement d'époque (confort moderne)",
      "Assurance paradoxe",
      "Guide local certifié"
    ],
    prerequis: [
      "Bilan de santé (-3 mois)",
      "Formation protocole temporel (2h)",
      "Vaccination universelle"
    ]
  },
  'cretaceous': {
    id: 'cretaceous',
    title: 'Le Crétacé',
    year: '-66M',
    tag: 'Sécurité Maximale',
    image: 'https://i.imgur.com/OyX1cDT.jpeg',
    description: "Vivez l'aventure ultime en remontant 66 millions d'années en arrière. Observez les plus grands prédateurs que la Terre ait jamais portés dans leur habitat naturel, le tout depuis la sécurité de nos capsules temporelles blindées.",
    highlights: [
      "Observation de Tyrannosaures",
      "Vol panoramique en capsule",
      "Écosystème préservé",
      "Nuit sous les étoiles préhistoriques"
    ],
    price: "8 900 ₡",
    duration: "3 Jours",
    inclus: [
      "Transport temporel A/R",
      "Capsule de survie tout confort",
      "Équipement de camouflage",
      "Repas lyophilisés gastronomiques"
    ],
    prerequis: [
      "Test d'aptitude physique",
      "Formation survie (1 journée)",
      "Décharge de responsabilité"
    ]
  },
  'florence-1504': {
    id: 'florence-1504',
    title: 'Florence - Renaissance',
    year: '1504',
    tag: 'Sécurité Maximale',
    image: 'https://i.imgur.com/DSIutWs.jpeg',
    description: "Marchez dans les rues de Florence à son apogée. Assistez à la création des chefs-d'œuvre de la Renaissance et côtoyez les génies qui ont redéfini l'art et la science occidentale.",
    highlights: [
      "Atelier de Michel-Ange",
      "Débat public de Léonard de Vinci",
      "Visite du Palazzo Vecchio",
      "Banquet privé chez les Médicis"
    ],
    price: "6 200 ₡",
    duration: "5 Jours",
    inclus: [
      "Transport temporel A/R",
      "Villa toscane privée",
      "Costumes d'époque sur mesure",
      "Interprète Renaissance/Moderne"
    ],
    prerequis: [
      "Cours d'étiquette (3h)",
      "Vaccination peste (préventif)",
      "Aucun appareil électronique"
    ]
  }
};

export default function Booking() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const destinationId = searchParams.get('destination') || 'paris-1889';
  const destination = destinationsData[destinationId] || destinationsData['paris-1889'];
  
  const [formData, setFormData] = useState({
    date: '',
    travelers: 1,
    name: '',
    email: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Scroll to top when destination changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [destinationId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ destination: e.target.value });
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-zinc-900 border border-amber-500/20 p-8 rounded-2xl max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-8 h-8 text-amber-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Réservation Confirmée !</h2>
          <p className="text-zinc-400 mb-6">
            Vos coordonnées temporelles pour {destination.title} ont été verrouillées. Veuillez vérifier votre lien neuronal (email) pour la carte d'embarquement.
          </p>
          <button 
            onClick={() => setStatus('idle')}
            className="text-amber-500 hover:text-amber-400 font-medium"
          >
            Réserver un autre voyage
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 min-h-screen pb-24">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={destination.image} 
            alt={destination.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
        </div>
        
        <div className="absolute top-8 left-4 md:left-8 z-20">
          <Link 
            to="/destinations" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-black/70 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Retour
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-12 z-20 max-w-7xl mx-auto w-full">
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="px-3 py-1 bg-amber-500 text-black font-bold rounded-full text-sm">
              {destination.year}
            </span>
            <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full text-sm flex items-center gap-2">
              <Shield className="w-3 h-3" /> {destination.tag}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white font-sans mb-4">
            {destination.title}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-8 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold text-amber-500 mb-4 font-display">L'Expérience</h2>
              <p className="text-zinc-300 text-lg leading-relaxed">
                {destination.description}
              </p>
            </section>

            {/* Highlights Grid */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destination.highlights.map((highlight: string, index: number) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-zinc-900/50 border border-white/5 rounded-xl">
                    <Check className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span className="text-zinc-200">{highlight}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Practical Info */}
            <section className="bg-zinc-900/50 border border-white/5 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-6">Informations Pratiques</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Inclus</h3>
                  <ul className="space-y-3">
                    {destination.inclus.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-zinc-300 text-sm">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Prérequis</h3>
                  <ul className="space-y-3">
                    {destination.prerequis.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-zinc-300 text-sm">
                        <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-zinc-900 border border-white/10 rounded-2xl p-6 shadow-xl shadow-black/50">
              <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-6">
                <div>
                  <p className="text-zinc-400 text-sm mb-1">Prix par voyageur</p>
                  <p className="text-3xl font-bold text-amber-500">{destination.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-zinc-400 text-sm mb-1">Durée</p>
                  <p className="text-white font-medium flex items-center justify-end gap-1">
                    <Clock className="w-4 h-4" /> {destination.duration}
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">Réserver votre Voyage</h3>
              <p className="text-zinc-400 text-sm mb-6">Embarquement immédiat pour l'Histoire.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase mb-1.5">Destination</label>
                  <select 
                    value={destinationId}
                    onChange={handleDestinationChange}
                    className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  >
                    {Object.values(destinationsData).map((d: any) => (
                      <option key={d.id} value={d.id}>{d.title}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase mb-1.5">Date de départ</label>
                    <div className="relative">
                      <input 
                        type="date"
                        required
                        value={formData.date}
                        onChange={e => setFormData({...formData, date: e.target.value})}
                        className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none [color-scheme:dark]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase mb-1.5">Voyageurs</label>
                    <div className="relative">
                      <input 
                        type="number"
                        min="1"
                        max="10"
                        required
                        value={formData.travelers}
                        onChange={e => setFormData({...formData, travelers: parseInt(e.target.value)})}
                        className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase mb-1.5">Nom complet</label>
                  <input 
                    type="text"
                    required
                    placeholder="Jules Verne"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase mb-1.5">Email</label>
                  <input 
                    type="email"
                    required
                    placeholder="jules@verne.fr"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-amber-500 text-black font-bold py-3.5 rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {status === 'submitting' ? 'Traitement...' : 'Confirmer la réservation'}
                </button>
                
                <p className="text-center text-xs text-zinc-500 mt-4">
                  Paiement sécurisé par QuantumPay. Annulation gratuite jusqu'à 48h avant le saut.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
