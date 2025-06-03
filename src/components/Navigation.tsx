
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Headphones, Home, BookOpen, Youtube, LogOut } from "lucide-react";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: BookOpen, label: "Flashcards", path: "/flashcards" },
    { icon: Youtube, label: "YouTube", path: "/youtube-podcasts" },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="bg-gray-900/50 backdrop-blur-lg border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Headphones className="h-8 w-8 text-purple-400" />
            <span className="text-white font-bold text-xl">PodcastLearn</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={location.pathname === item.path ? "default" : "ghost"}
                onClick={() => navigate(item.path)}
                className={`flex items-center space-x-2 ${
                  location.pathname === item.path 
                    ? "bg-purple-600 text-white" 
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Button>
            ))}
            
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-gray-300 hover:text-white hover:bg-gray-800"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
