import { useState } from 'react';
import { Search, Filter, Star, ExternalLink, Tag, Clock, Users, Zap, Brain, MessageSquare, Palette, PenTool, TrendingUp, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  pricing: 'Free' | 'Paid' | 'Freemium';
  rating: number;
  users: string;
  tags: string[];
  features: string[];
  website: string;
  logo: string;
  featured: boolean;
}

const tools: Tool[] = [
  {
    id: '1',
    name: 'ChatGPT',
    description: 'Advanced AI chatbot for conversational AI, content generation, and problem-solving across multiple domains.',
    category: 'AI Assistant',
    pricing: 'Freemium',
    rating: 4.8,
    users: '100M+',
    tags: ['Conversational AI', 'Content Generation', 'Code Assistant'],
    features: ['Natural Language Processing', 'Code Generation', 'Creative Writing', 'Problem Solving'],
    website: 'https://chat.openai.com',
    logo: '🤖',
    featured: true,
  },
  {
    id: '2',
    name: 'Midjourney',
    description: 'AI-powered image generation tool that creates stunning artwork from text descriptions with artistic flair.',
    category: 'Image Generation',
    pricing: 'Paid',
    rating: 4.9,
    users: '15M+',
    tags: ['Image Generation', 'Art Creation', 'Design'],
    features: ['Text-to-Image', 'Style Transfer', 'High Resolution', 'Commercial Use'],
    website: 'https://midjourney.com',
    logo: '🎨',
    featured: true,
  },
  {
    id: '3',
    name: 'Claude',
    description: 'Constitutional AI assistant focused on helpful, harmless, and honest interactions with advanced reasoning.',
    category: 'AI Assistant',
    pricing: 'Freemium',
    rating: 4.7,
    users: '5M+',
    tags: ['AI Assistant', 'Reasoning', 'Analysis'],
    features: ['Long Context', 'Document Analysis', 'Code Review', 'Research Assistant'],
    website: 'https://claude.ai',
    logo: '🧠',
    featured: false,
  },
  {
    id: '4',
    name: 'GitHub Copilot',
    description: 'AI pair programmer that suggests code and entire functions in real-time, right from your editor.',
    category: 'Code Assistant',
    pricing: 'Paid',
    rating: 4.6,
    users: '1M+',
    tags: ['Code Generation', 'IDE Integration', 'Programming'],
    features: ['Code Completion', 'Function Generation', 'Multi-language Support', 'Context Awareness'],
    website: 'https://github.com/features/copilot',
    logo: '👨‍💻',
    featured: true,
  },
  {
    id: '5',
    name: 'Notion AI',
    description: 'Built-in AI writing assistant that helps with brainstorming, editing, and content creation within Notion.',
    category: 'Writing Assistant',
    pricing: 'Freemium',
    rating: 4.5,
    users: '30M+',
    tags: ['Writing', 'Productivity', 'Note-taking'],
    features: ['Content Generation', 'Grammar Check', 'Summarization', 'Translation'],
    website: 'https://notion.so/ai',
    logo: '📝',
    featured: false,
  },
  {
    id: '6',
    name: 'RunwayML',
    description: 'Creative AI suite for video editing, image generation, and multimedia content creation with AI magic tools.',
    category: 'Video Generation',
    pricing: 'Freemium',
    rating: 4.4,
    users: '2M+',
    tags: ['Video Editing', 'AI Effects', 'Creative Tools'],
    features: ['AI Video Generation', 'Green Screen', 'Style Transfer', 'Motion Tracking'],
    website: 'https://runwayml.com',
    logo: '🎬',
    featured: true,
  },
  {
    id: '7',
    name: 'Copy.ai',
    description: 'AI-powered copywriting tool that generates high-converting marketing copy, blog posts, and social media content.',
    category: 'Content Writing',
    pricing: 'Freemium',
    rating: 4.3,
    users: '8M+',
    tags: ['Copywriting', 'Marketing', 'Blog Writing'],
    features: ['Blog Posts', 'Ad Copy', 'Social Media', 'Email Marketing'],
    website: 'https://copy.ai',
    logo: '✍️',
    featured: false,
  },
  {
    id: '8',
    name: 'Jasper',
    description: 'Enterprise-grade AI content platform for creating blog posts, marketing copy, and creative content at scale.',
    category: 'Content Writing',
    pricing: 'Paid',
    rating: 4.4,
    users: '100K+',
    tags: ['Content Creation', 'Marketing', 'Enterprise'],
    features: ['Brand Voice', 'Template Library', 'Team Collaboration', 'SEO Optimization'],
    website: 'https://jasper.ai',
    logo: '📄',
    featured: true,
  },
  {
    id: '9',
    name: 'Surfer SEO',
    description: 'AI-powered SEO tool for content optimization, keyword research, and search engine ranking improvement.',
    category: 'SEO Tools',
    pricing: 'Paid',
    rating: 4.6,
    users: '150K+',
    tags: ['SEO', 'Content Optimization', 'Keyword Research'],
    features: ['SERP Analysis', 'Content Editor', 'Keyword Planner', 'Rank Tracking'],
    website: 'https://surferseo.com',
    logo: '📈',
    featured: false,
  },
  {
    id: '10',
    name: 'SEMrush Writing Assistant',
    description: 'AI writing tool integrated with SEO insights to create optimized content that ranks higher in search results.',
    category: 'SEO Tools',
    pricing: 'Freemium',
    rating: 4.5,
    users: '7M+',
    tags: ['SEO Writing', 'Content Optimization', 'SERP Analysis'],
    features: ['SEO Score', 'Readability Check', 'Tone Analysis', 'Plagiarism Detection'],
    website: 'https://semrush.com',
    logo: '🔍',
    featured: false,
  },
  {
    id: '11',
    name: 'DALL-E 3',
    description: 'OpenAI\'s most advanced text-to-image generation model that creates highly detailed and accurate images from descriptions.',
    category: 'Image Generation',
    pricing: 'Paid',
    rating: 4.7,
    users: '10M+',
    tags: ['Text-to-Image', 'AI Art', 'Creative Design'],
    features: ['High Resolution', 'Style Variety', 'Prompt Understanding', 'Commercial Use'],
    website: 'https://openai.com/dall-e-3',
    logo: '🖼️',
    featured: false,
  },
  {
    id: '12',
    name: 'Perplexity AI',
    description: 'AI-powered search engine and research assistant that provides accurate answers with real-time information and citations.',
    category: 'AI Tools',
    pricing: 'Freemium',
    rating: 4.6,
    users: '10M+',
    tags: ['AI Search', 'Research', 'Real-time Info'],
    features: ['Web Search', 'Citations', 'Follow-up Questions', 'Academic Mode'],
    website: 'https://perplexity.ai',
    logo: '🔍',
    featured: true,
  },
];

const categories = ['All', 'AI Tools', 'AI Assistant', 'Image Generation', 'Content Writing', 'SEO Tools', 'Code Assistant', 'Writing Assistant', 'Video Generation', 'Chatbot'];
const pricingFilters = ['All', 'Free', 'Freemium', 'Paid'];

const categoryIcons = {
  'AI Tools': <Bot className="w-4 h-4" />,
  'AI Assistant': <Brain className="w-4 h-4" />,
  'Image Generation': <Palette className="w-4 h-4" />,
  'Content Writing': <PenTool className="w-4 h-4" />,
  'SEO Tools': <TrendingUp className="w-4 h-4" />,
  'Code Assistant': <MessageSquare className="w-4 h-4" />,
  'Writing Assistant': <MessageSquare className="w-4 h-4" />,
  'Video Generation': <Zap className="w-4 h-4" />,
  'Chatbot': <MessageSquare className="w-4 h-4" />,
};

export default function Index() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPricing, setSelectedPricing] = useState('All');

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesPricing = selectedPricing === 'All' || tool.pricing === selectedPricing;
    
    return matchesSearch && matchesCategory && matchesPricing;
  });

  const featuredTools = tools.filter(tool => tool.featured);

  const handleExploreClick = (toolName: string) => {
    toast({
      title: "Coming Soon!",
      description: `Detailed page for ${toolName} will be available soon.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-lg bg-white/5">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gradient">AI Tools Directory</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">Browse</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">Categories</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">Submit Tool</a>
            <Button variant="outline" size="sm" className="glass-effect">
              Sign In
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
            Discover the Best AI Tools
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Find and explore cutting-edge AI tools, assistants, and chatbots. From free to premium solutions, 
            discover the perfect AI companion for your needs.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search AI tools, chatbots, assistants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg glass-effect border-white/20 focus:border-primary"
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex justify-center space-x-8 mb-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-gradient">{tools.length}+</div>
              <div className="text-sm text-muted-foreground">AI Tools</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gradient">{categories.length - 1}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gradient">150M+</div>
              <div className="text-sm text-muted-foreground">Users Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured AI Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredTools.map((tool) => (
              <Card key={tool.id} className="gradient-card border-white/10 hover-glow transition-smooth cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{tool.logo}</span>
                      <div>
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge variant={tool.pricing === 'Free' ? 'secondary' : tool.pricing === 'Paid' ? 'destructive' : 'default'}>
                            {tool.pricing}
                          </Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            {tool.rating}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-sm">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-1" />
                      {tool.users} users
                    </div>
                    <div className="flex items-center space-x-1">
                      {categoryIcons[tool.category as keyof typeof categoryIcons]}
                      <span className="text-sm text-muted-foreground">{tool.category}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tool.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    onClick={() => handleExploreClick(tool.name)}
                    className="w-full gradient-primary hover:shadow-glow transition-smooth"
                  >
                    Explore Tool
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Filters & All Tools */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="glass-effect border-white/20">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      <div className="flex items-center space-x-2">
                        {category !== 'All' && categoryIcons[category as keyof typeof categoryIcons]}
                        <span>{category}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select value={selectedPricing} onValueChange={setSelectedPricing}>
                <SelectTrigger className="glass-effect border-white/20">
                  <SelectValue placeholder="Select Pricing" />
                </SelectTrigger>
                <SelectContent>
                  {pricingFilters.map((pricing) => (
                    <SelectItem key={pricing} value={pricing}>{pricing}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <Card key={tool.id} className="gradient-card border-white/10 hover-glow transition-smooth cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{tool.logo}</span>
                      <div>
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge variant={tool.pricing === 'Free' ? 'secondary' : tool.pricing === 'Paid' ? 'destructive' : 'default'}>
                            {tool.pricing}
                          </Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            {tool.rating}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-sm line-clamp-2">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Users className="w-4 h-4 mr-1" />
                        {tool.users}
                      </div>
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        {categoryIcons[tool.category as keyof typeof categoryIcons]}
                        <span>{tool.category}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {tool.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      onClick={() => handleExploreClick(tool.name)}
                      variant="outline" 
                      className="w-full glass-effect hover:bg-primary hover:text-primary-foreground transition-smooth"
                    >
                      View Details
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 rounded bg-gradient-primary flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gradient">AI Tools Directory</span>
          </div>
          <p className="text-muted-foreground mb-4">
            Discover, compare, and find the perfect AI tools for your needs.
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">About</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">Submit Tool</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">Contact</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">API</a>
          </div>
        </div>
      </footer>
    </div>
  );
}