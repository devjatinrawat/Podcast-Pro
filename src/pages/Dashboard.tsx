
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { BookOpen, Play, TrendingUp, Clock, Star, ChevronRight } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const recentPodcasts = [
    { title: "The Joe Rogan Experience", episode: "#1990 - Naval Ravikant", duration: "2h 45m", progress: 75 },
    { title: "Lex Fridman Podcast", episode: "#350 - Elon Musk", duration: "3h 12m", progress: 45 },
    { title: "Tim Ferriss Show", episode: "Naval Ravikant", duration: "1h 30m", progress: 100 },
  ];

  const learningStats = [
    { label: "Total Learning Hours", value: "24h", icon: Clock },
    { label: "Flashcards Mastered", value: "156", icon: BookOpen },
    { label: "Podcasts Completed", value: "12", icon: Star },
    { label: "Learning Streak", value: "7 days", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back!</h1>
          <p className="text-gray-300">Continue your podcast learning journey</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {learningStats.map((stat, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Continue Learning */}
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Continue Learning
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Pick up where you left off
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPodcasts.map((podcast, index) => (
                    <div key={index} className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="text-white font-medium">{podcast.title}</h3>
                          <p className="text-gray-400 text-sm">{podcast.episode}</p>
                        </div>
                        <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                          {podcast.duration}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <Progress value={podcast.progress} className="flex-1" />
                        <span className="text-gray-400 text-sm">{podcast.progress}%</span>
                        <Button size="sm" variant="ghost" className="text-purple-400 hover:bg-purple-400/20">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
                <CardDescription className="text-gray-300">
                  Jump into your learning tools
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => navigate("/flashcards")}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Practice Flashcards
                </Button>
                <Button 
                  onClick={() => navigate("/youtube-podcasts")}
                  variant="outline"
                  className="w-full border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Discover Podcasts
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20 mt-6">
              <CardHeader>
                <CardTitle className="text-white">Today's Goal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-purple-400">15</div>
                    <div className="text-gray-300 text-sm">minutes learning</div>
                  </div>
                  <Progress value={60} className="mb-2" />
                  <p className="text-gray-400 text-sm">9/15 minutes completed</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
