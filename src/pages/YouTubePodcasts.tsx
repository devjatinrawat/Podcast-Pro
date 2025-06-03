
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Play, Clock, Eye, ThumbsUp } from "lucide-react";
import { useState } from "react";

const YouTubePodcasts = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const podcastVideos = [
    {
      id: "1",
      title: "Joe Rogan Experience #1990 - Naval Ravikant",
      channel: "PowerfulJRE",
      thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=225&fit=crop",
      duration: "2:45:30",
      views: "2.3M",
      likes: "45K",
      description: "Naval Ravikant discusses wealth, happiness, and the future of technology.",
      category: "Business"
    },
    {
      id: "2", 
      title: "Lex Fridman Podcast #350 - Elon Musk",
      channel: "Lex Fridman",
      thumbnail: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=400&h=225&fit=crop",
      duration: "3:12:15",
      views: "4.1M",
      likes: "89K",
      description: "Deep conversation about AI, space exploration, and the future of humanity.",
      category: "Technology"
    },
    {
      id: "3",
      title: "Tim Ferriss Show - Naval Ravikant",
      channel: "Tim Ferriss",
      thumbnail: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=225&fit=crop",
      duration: "1:30:45",
      views: "1.8M",
      likes: "32K",
      description: "The angel philosopher on reading, decision-making, and the pursuit of happiness.",
      category: "Productivity"
    },
    {
      id: "4",
      title: "Huberman Lab - The Science of Sleep",
      channel: "Andrew Huberman",
      thumbnail: "https://images.unsplash.com/photo-1541199249251-f713e6145474?w=400&h=225&fit=crop",
      duration: "2:15:20",
      views: "3.2M",
      likes: "67K",
      description: "Evidence-based tools for improving sleep quality and performance.",
      category: "Health"
    },
    {
      id: "5",
      title: "Diary of a CEO - Gary Vaynerchuk",
      channel: "The Diary Of A CEO",
      thumbnail: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=225&fit=crop",
      duration: "1:45:10",
      views: "856K",
      likes: "21K",
      description: "Entrepreneurship, social media, and building authentic businesses.",
      category: "Business"
    },
    {
      id: "6",
      title: "Jordan Peterson - 12 Rules for Life",
      channel: "Jordan B Peterson",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop",
      duration: "2:30:00",
      views: "2.7M",
      likes: "54K",
      description: "Psychology, responsibility, and finding meaning in life.",
      category: "Psychology"
    }
  ];

  const categories = ["All", "Business", "Technology", "Health", "Psychology", "Productivity"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredVideos = podcastVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.channel.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">YouTube Podcasts</h1>
          <p className="text-gray-300">Discover and watch the best podcast episodes</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search podcasts, hosts, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-gray-400"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-purple-600 text-white"
                    : "border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <Card key={video.id} className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {video.duration}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/50 rounded-t-lg">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                    <Play className="h-5 w-5 mr-2" />
                    Watch
                  </Button>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-white text-sm leading-tight line-clamp-2">
                    {video.title}
                  </CardTitle>
                  <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 text-xs">
                    {video.category}
                  </Badge>
                </div>
                <CardDescription className="text-gray-400 text-sm">
                  {video.channel}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {video.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {video.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      {video.likes}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No podcasts found matching your criteria.</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filter options.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default YouTubePodcasts;
