
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, RotateCcw, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Flashcards = () => {
  const { toast } = useToast();
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<number[]>([]);

  const flashcards = [
    {
      question: "What is Naval Ravikant's definition of wealth?",
      answer: "Wealth is assets that earn while you sleep. It's about owning a piece of a business, real estate, or intellectual property that generates income without your direct time investment.",
      podcast: "The Joe Rogan Experience",
      category: "Entrepreneurship"
    },
    {
      question: "According to Tim Ferriss, what is the key to effective decision making?",
      answer: "Ask yourself: 'What would this look like if it were easy?' This reframes complex problems and often reveals simpler solutions.",
      podcast: "Tim Ferriss Show",
      category: "Productivity"
    },
    {
      question: "What does Lex Fridman say about artificial intelligence and consciousness?",
      answer: "Consciousness might emerge from complex information processing systems. The key question isn't whether AI will be conscious, but how we'll recognize and respect that consciousness.",
      podcast: "Lex Fridman Podcast",
      category: "Technology"
    },
    {
      question: "What is the Pareto Principle mentioned in productivity podcasts?",
      answer: "The 80/20 rule: 80% of results come from 20% of efforts. Focus on identifying and optimizing the 20% that drives the most impact.",
      podcast: "Various",
      category: "Productivity"
    }
  ];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const handleMastered = () => {
    if (!masteredCards.includes(currentCard)) {
      setMasteredCards([...masteredCards, currentCard]);
      toast({
        title: "Card mastered! 🎉",
        description: "Great job! This concept is now in your learned collection.",
      });
    }
    handleNext();
  };

  const handleNeedPractice = () => {
    toast({
      title: "No worries! 📚",
      description: "This card will come up again for more practice.",
    });
    handleNext();
  };

  const progress = (masteredCards.length / flashcards.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Flashcard Learning</h1>
          <p className="text-gray-300 mb-4">Master podcast insights through interactive learning</p>
          
          <div className="max-w-md mx-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300 text-sm">Progress</span>
              <span className="text-purple-400 text-sm">{masteredCards.length}/{flashcards.length} mastered</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                {flashcards[currentCard].category}
              </Badge>
              <span className="text-gray-400">
                {currentCard + 1} of {flashcards.length}
              </span>
            </div>
            
            <Button 
              variant="outline" 
              onClick={handleNext}
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <div className="perspective-1000">
            <Card 
              className={`bg-white/10 backdrop-blur-lg border-white/20 h-96 cursor-pointer transition-transform duration-500 transform-style-preserve-3d ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
              onClick={handleFlip}
            >
              <CardContent className="p-8 h-full flex flex-col justify-between backface-hidden">
                {!isFlipped ? (
                  <>
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <Badge className="bg-blue-600/20 text-blue-300">Question</Badge>
                        {masteredCards.includes(currentCard) && (
                          <Badge className="bg-green-600/20 text-green-300">
                            <Check className="h-3 w-3 mr-1" />
                            Mastered
                          </Badge>
                        )}
                      </div>
                      <h2 className="text-xl font-semibold text-white mb-4 leading-relaxed">
                        {flashcards[currentCard].question}
                      </h2>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-400 mb-4">Click to reveal answer</p>
                      <RotateCcw className="h-6 w-6 text-purple-400 mx-auto" />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <Badge className="bg-green-600/20 text-green-300">Answer</Badge>
                        <Badge variant="outline" className="border-gray-400 text-gray-300">
                          {flashcards[currentCard].podcast}
                        </Badge>
                      </div>
                      <p className="text-white leading-relaxed text-lg">
                        {flashcards[currentCard].answer}
                      </p>
                    </div>
                    <div className="flex gap-4 justify-center mt-6">
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNeedPractice();
                        }}
                        variant="outline"
                        className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Need Practice
                      </Button>
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMastered();
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Got It!
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              Tip: Click the card to flip it, or use the buttons to mark your understanding
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcards;
