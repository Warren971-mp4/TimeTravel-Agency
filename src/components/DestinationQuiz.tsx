import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, RefreshCw, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

type DestinationId = 'paris-1889' | 'cretaceous' | 'florence-1504';

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    value: DestinationId;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "Quel type d'expérience recherchez-vous ?",
    options: [
      { text: "Culturelle et artistique", value: 'florence-1504' },
      { text: "Aventure et nature", value: 'cretaceous' },
      { text: "Élégance et raffinement", value: 'paris-1889' },
    ],
  },
  {
    id: 2,
    text: "Votre période préférée ?",
    options: [
      { text: "Histoire moderne (XIXe-XXe siècle)", value: 'paris-1889' },
      { text: "Temps anciens et origines", value: 'cretaceous' },
      { text: "Renaissance et classicisme", value: 'florence-1504' },
    ],
  },
  {
    id: 3,
    text: "Vous préférez :",
    options: [
      { text: "L'effervescence urbaine", value: 'paris-1889' },
      { text: "La nature sauvage", value: 'cretaceous' },
      { text: "L'art et l'architecture", value: 'florence-1504' },
    ],
  },
  {
    id: 4,
    text: "Votre activité idéale :",
    options: [
      { text: "Visiter des monuments", value: 'paris-1889' },
      { text: "Observer la faune", value: 'cretaceous' },
      { text: "Explorer des musées", value: 'florence-1504' },
    ],
  },
];

const destinationsData: Record<DestinationId, { title: string; desc: string; image: string }> = {
  'paris-1889': {
    title: "Paris - 1889",
    desc: "Vous êtes une âme sophistiquée qui apprécie le progrès et l'élégance. La Belle Époque est votre terrain de jeu idéal.",
    image: "https://i.imgur.com/cjnfLQF.jpeg"
  },
  'cretaceous': {
    title: "Le Crétacé",
    desc: "L'aventurier en vous réclame du grandiose. Rien ne vaut la majesté brute de la nature préhistorique.",
    image: "https://i.imgur.com/OyX1cDT.jpeg"
  },
  'florence-1504': {
    title: "Florence - 1504",
    desc: "Votre sensibilité artistique vous guide vers les maîtres de la Renaissance. Une immersion culturelle sans égal.",
    image: "https://i.imgur.com/DSIutWs.jpeg"
  }
};

export default function DestinationQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<DestinationId, number>>({
    'paris-1889': 0,
    'cretaceous': 0,
    'florence-1504': 0,
  });
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<DestinationId | null>(null);

  const handleAnswer = (value: DestinationId) => {
    const newScores = { ...scores, [value]: scores[value] + 1 };
    setScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate winner
      const winner = Object.entries(newScores).reduce((a, b) => newScores[a as DestinationId] > newScores[b as DestinationId] ? a : b)[0] as DestinationId;
      setResult(winner);
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScores({ 'paris-1889': 0, 'cretaceous': 0, 'florence-1504': 0 });
    setShowResult(false);
    setResult(null);
  };

  return (
    <section className="py-24 bg-zinc-900 border-t border-white/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-medium mb-4 border border-amber-500/20"
          >
            <Sparkles className="w-3 h-3" />
            IA Recommandation
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Trouvez votre époque idéale
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400"
          >
            Répondez à 4 questions simples et laissez notre algorithme quantique choisir votre destination.
          </motion.p>
        </div>

        <div className="bg-zinc-950/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl min-h-[400px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-2xl mx-auto"
              >
                <div className="mb-8">
                  <div className="flex justify-between text-xs text-zinc-500 mb-2 uppercase tracking-wider">
                    <span>Question {currentQuestion + 1} / {questions.length}</span>
                    <span>{Math.round(((currentQuestion) / questions.length) * 100)}% complété</span>
                  </div>
                  <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-amber-500"
                      initial={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                      animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <h3 className="text-2xl font-medium text-white mb-8 text-center">{questions[currentQuestion].text}</h3>

                <div className="grid gap-4">
                  {questions[currentQuestion].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option.value)}
                      className="group flex items-center justify-between p-5 rounded-xl bg-zinc-900 border border-white/10 hover:border-amber-500/50 hover:bg-zinc-800 transition-all text-left"
                    >
                      <span className="text-zinc-300 group-hover:text-white transition-colors">{option.text}</span>
                      <div className="w-6 h-6 rounded-full border border-zinc-700 group-hover:border-amber-500 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-all">
                        <ArrowRight className="w-3 h-3 text-amber-500 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500">
                  <Check className="w-8 h-8" />
                </div>
                
                <h3 className="text-zinc-400 text-sm uppercase tracking-widest mb-2">Votre destination idéale est</h3>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
                  {result && destinationsData[result].title}
                </h2>
                
                <p className="text-lg text-zinc-300 mb-8 max-w-xl mx-auto leading-relaxed">
                  {result && destinationsData[result].desc}
                </p>

                {result && (
                  <div className="relative rounded-2xl overflow-hidden aspect-video max-w-lg mx-auto mb-8 border border-white/10 shadow-2xl">
                    <img 
                      src={destinationsData[result].image} 
                      alt={destinationsData[result].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link 
                    to={`/booking?destination=${result}`}
                    className="px-8 py-3 bg-amber-500 text-black font-bold rounded-full hover:bg-amber-400 transition-colors w-full sm:w-auto"
                  >
                    Réserver ce voyage
                  </Link>
                  <button 
                    onClick={resetQuiz}
                    className="px-8 py-3 bg-zinc-800 text-white font-medium rounded-full hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Recommencer
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
