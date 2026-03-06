import DestinationCard from '@/components/DestinationCard';

const destinations = [
  {
    id: 'paris-1889',
    title: 'Paris - Exposition Universelle',
    year: '1889',
    description: 'Assistez à l\'inauguration de la Tour Eiffel et à l\'apogée de la Belle Époque. Flânez sur les boulevards de Paris dans toute sa splendeur.',
    image: 'https://i.imgur.com/cjnfLQF.jpeg',
    video: 'https://i.imgur.com/QAjgEr7.mp4',
    price: '5 500 ₡',
    tags: ['Culture', 'Histoire', 'Romantisme']
  },
  {
    id: 'cretaceous',
    title: 'Le Crétacé',
    year: '-66M',
    description: 'Marchez parmi les géants. Découvrez la puissance brute de la nature à l\'ère des dinosaures. Des capsules de sécurité entièrement guidées assurent une aventure palpitante mais sûre.',
    image: 'https://i.imgur.com/OyX1cDT.jpeg',
    video: 'https://i.imgur.com/LWowosF.mp4',
    price: '8 900 ₡',
    tags: ['Nature', 'Aventure', 'Faune']
  },
  {
    id: 'florence-1504',
    title: 'Florence - Renaissance',
    year: '1504',
    description: 'Rencontrez les maîtres. Voyez Michel-Ange dévoiler son David. Discutez philosophie avec De Vinci. Immergez-vous dans le berceau du monde moderne.',
    image: 'https://i.imgur.com/DSIutWs.jpeg',
    video: 'https://i.imgur.com/wKbRiRw.mp4',
    price: '6 200 ₡',
    tags: ['Art', 'Philosophie', 'Histoire']
  }
];

export default function Destinations() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Choisissez Votre Époque</h1>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Notre sélection de destinations temporelles offre quelque chose pour chaque voyageur. 
          De l'aube des temps à l'apogée de la civilisation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map(dest => (
          <DestinationCard key={dest.id} {...dest} />
        ))}
      </div>
    </div>
  );
}
