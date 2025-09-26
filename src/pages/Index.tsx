import { useState } from 'react';
import { Search, Filter, Star, ExternalLink, Tag, Clock, Users, Zap, Brain, MessageSquare, Palette, PenTool, TrendingUp, Bot, Code, GraduationCap, Database, FileText, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    website: 'https://notion.com/help/guides/category/ai',
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
  // AI Writing, Editing & Creativity
  {
    id: '13',
    name: 'DeepSeek',
    description: 'AI research company offering advanced LLMs for reasoning tasks and complex problem-solving.',
    category: 'AI Writing & Creativity',
    pricing: 'Freemium',
    rating: 4.5,
    users: '2M+',
    tags: ['LLM', 'Reasoning', 'Research'],
    features: ['Advanced Reasoning', 'Complex Problem Solving', 'Research Tasks', 'Multi-modal'],
    website: 'https://deepseek.com',
    logo: '🔬',
    featured: false,
  },
  {
    id: '14',
    name: 'Grok',
    description: 'AI assistant created by xAI (Elon Musk\'s company) with real-time information access.',
    category: 'AI Assistant',
    pricing: 'Freemium',
    rating: 4.3,
    users: '5M+',
    tags: ['AI Assistant', 'Real-time', 'Conversational'],
    features: ['Real-time Information', 'Conversational AI', 'Twitter Integration', 'Humor'],
    website: 'https://grok.com',
    logo: '🚀',
    featured: true,
  },
  {
    id: '15',
    name: 'Writesonic',
    description: 'AI copywriting tool for blogs, ads, and marketing content with SEO optimization.',
    category: 'Content Writing',
    pricing: 'Freemium',
    rating: 4.4,
    users: '3M+',
    tags: ['Copywriting', 'Marketing', 'SEO'],
    features: ['Blog Writing', 'Ad Copy', 'SEO Content', 'Landing Pages'],
    website: 'https://writesonic.com',
    logo: '📝',
    featured: false,
  },
  {
    id: '16',
    name: 'QuillBot',
    description: 'AI paraphrasing, summarizing, and citation tool for academic and professional writing.',
    category: 'AI Writing & Creativity',
    pricing: 'Freemium',
    rating: 4.6,
    users: '50M+',
    tags: ['Paraphrasing', 'Summarizing', 'Citations'],
    features: ['Paraphrasing', 'Grammar Check', 'Plagiarism Detection', 'Citation Generator'],
    website: 'https://quillbot.com',
    logo: '🪶',
    featured: true,
  },
  {
    id: '17',
    name: 'Leonardo AI',
    description: 'AI for generating game assets, art, and textures with advanced creative controls.',
    category: 'Image Generation',
    pricing: 'Freemium',
    rating: 4.5,
    users: '4M+',
    tags: ['Game Assets', 'Art Creation', 'Textures'],
    features: ['Game Asset Generation', 'Texture Creation', 'Art Styles', 'Animation'],
    website: 'https://leonardo.ai',
    logo: '🎮',
    featured: false,
  },
  {
    id: '18',
    name: 'Grammarly',
    description: 'Grammar checker & AI writing assistant for error-free and impactful writing.',
    category: 'AI Writing & Creativity',
    pricing: 'Freemium',
    rating: 4.7,
    users: '30M+',
    tags: ['Grammar', 'Writing Assistant', 'Proofreading'],
    features: ['Grammar Check', 'Tone Adjustment', 'Plagiarism Detection', 'Writing Suggestions'],
    website: 'https://grammarly.com',
    logo: '✅',
    featured: true,
  },
  {
    id: '19',
    name: 'Wordtune',
    description: 'AI writing rephraser and tone adjuster that helps improve clarity and style.',
    category: 'AI Writing & Creativity',
    pricing: 'Freemium',
    rating: 4.4,
    users: '5M+',
    tags: ['Rephrasing', 'Tone Adjustment', 'Clarity'],
    features: ['Sentence Rewriting', 'Tone Adjustment', 'Clarity Enhancement', 'Shortening'],
    website: 'https://wordtune.com',
    logo: '🎭',
    featured: false,
  },
  {
    id: '20',
    name: 'Canva Magic',
    description: 'Canva\'s AI design features like Magic Write & Magic Edit for creative design.',
    category: 'Design Tools',
    pricing: 'Freemium',
    rating: 4.8,
    users: '100M+',
    tags: ['Design', 'Magic Write', 'Magic Edit'],
    features: ['Magic Write', 'Magic Edit', 'Background Remover', 'Presentation AI'],
    website: 'https://canva.com/magic/',
    logo: '✨',
    featured: true,
  },
  {
    id: '21',
    name: 'Figma AI',
    description: 'Figma\'s AI for design suggestions and automation in collaborative design.',
    category: 'Design Tools',
    pricing: 'Freemium',
    rating: 4.6,
    users: '20M+',
    tags: ['Design', 'Collaboration', 'Automation'],
    features: ['Design Suggestions', 'Auto Layout', 'Component Generation', 'Plugin Integration'],
    website: 'https://figma.com/ai/',
    logo: '🎨',
    featured: false,
  },
  {
    id: '22',
    name: 'Napkin AI',
    description: 'Visual thinking & idea-mapping powered by AI for brainstorming and planning.',
    category: 'Productivity Tools',
    pricing: 'Freemium',
    rating: 4.2,
    users: '500K+',
    tags: ['Visual Thinking', 'Mind Mapping', 'Brainstorming'],
    features: ['Visual Mapping', 'Idea Organization', 'Collaboration', 'Templates'],
    website: 'https://napkin.ai',
    logo: '🧭',
    featured: false,
  },
  {
    id: '23',
    name: 'DorkGPT',
    description: 'Fun AI-based tool for generating "Google dorks" search queries for research.',
    category: 'Productivity Tools',
    pricing: 'Free',
    rating: 4.0,
    users: '100K+',
    tags: ['Search Queries', 'Research', 'Security'],
    features: ['Google Dorks', 'Search Optimization', 'Security Research', 'Query Generation'],
    website: 'https://dorkgpt.com',
    logo: '🔍',
    featured: false,
  },
  {
    id: '24',
    name: 'Lovart AI',
    description: 'AI art and avatar creation platform for personalized digital art.',
    category: 'Image Generation',
    pricing: 'Freemium',
    rating: 4.3,
    users: '1M+',
    tags: ['AI Art', 'Avatar Creation', 'Personalization'],
    features: ['Avatar Generation', 'Art Styles', 'Personalization', 'High Quality'],
    website: 'https://lovart.ai',
    logo: '🖼️',
    featured: false,
  },
  {
    id: '25',
    name: 'AdGen AI',
    description: 'AI tool to generate ad creatives and marketing copy for digital campaigns.',
    category: 'Content Writing',
    pricing: 'Freemium',
    rating: 4.2,
    users: '800K+',
    tags: ['Ad Creation', 'Marketing Copy', 'Creative'],
    features: ['Ad Creative Generation', 'Copy Writing', 'A/B Testing', 'Campaign Optimization'],
    website: 'https://adgenai.com',
    logo: '📱',
    featured: false,
  },
  {
    id: '26',
    name: 'Sketch to Animation',
    description: 'AI converts sketches into animations for creative projects.',
    category: 'Video Generation',
    pricing: 'Free',
    rating: 4.1,
    users: '200K+',
    tags: ['Sketch to Animation', 'Creative', 'Experimental'],
    features: ['Sketch Animation', 'Creative Tools', 'Experimental Features', 'Quick Generation'],
    website: 'https://sketch.metademolab.com',
    logo: '✏️',
    featured: false,
  },
  {
    id: '27',
    name: 'Pinspec AI',
    description: 'AI for Pinterest-like visual search & inspiration discovery.',
    category: 'AI Tools',
    pricing: 'Freemium',
    rating: 4.0,
    users: '300K+',
    tags: ['Visual Search', 'Inspiration', 'Pinterest'],
    features: ['Visual Search', 'Inspiration Board', 'Similar Images', 'Trend Discovery'],
    website: 'https://pinspec.ai',
    logo: '📌',
    featured: false,
  },
  {
    id: '28',
    name: 'Gamma',
    description: 'AI-powered slide deck and doc creator for presentations and documents.',
    category: 'Productivity Tools',
    pricing: 'Freemium',
    rating: 4.5,
    users: '2M+',
    tags: ['Presentations', 'Documents', 'AI Creation'],
    features: ['Slide Generation', 'Document Creation', 'Templates', 'Collaboration'],
    website: 'https://gamma.app',
    logo: '📊',
    featured: true,
  },
  {
    id: '29',
    name: 'GitMind',
    description: 'Mind mapping and diagram tool with AI for visual organization.',
    category: 'Productivity Tools',
    pricing: 'Freemium',
    rating: 4.3,
    users: '1.5M+',
    tags: ['Mind Mapping', 'Diagrams', 'Organization'],
    features: ['Mind Maps', 'Flowcharts', 'AI Suggestions', 'Collaboration'],
    website: 'https://gitmind.com',
    logo: '🗺️',
    featured: false,
  },
  {
    id: '30',
    name: 'Recraft AI',
    description: 'AI design tool for vector art and images with professional quality.',
    category: 'Design Tools',
    pricing: 'Freemium',
    rating: 4.4,
    users: '800K+',
    tags: ['Vector Art', 'Design', 'Professional'],
    features: ['Vector Generation', 'Brand Consistency', 'Style Control', 'High Resolution'],
    website: 'https://recraft.ai',
    logo: '🎯',
    featured: false,
  },
  {
    id: '31',
    name: '3D Logo Lab',
    description: 'AI 3D logo and branding creator for professional brand identity.',
    category: 'Design Tools',
    pricing: 'Freemium',
    rating: 4.1,
    users: '400K+',
    tags: ['3D Logo', 'Branding', 'Identity'],
    features: ['3D Logo Creation', 'Brand Identity', 'Multiple Formats', 'Commercial Use'],
    website: 'https://3dlogolab.io',
    logo: '🏢',
    featured: false,
  },
  // Productivity, Notes & Utilities
  {
    id: '32',
    name: 'VirusTotal',
    description: 'File & URL malware scanner for security analysis and threat detection.',
    category: 'Productivity Tools',
    pricing: 'Freemium',
    rating: 4.8,
    users: '50M+',
    tags: ['Security', 'Malware Scanner', 'Analysis'],
    features: ['File Scanning', 'URL Analysis', 'Threat Detection', 'Security Reports'],
    website: 'https://virustotal.com',
    logo: '🛡️',
    featured: true,
  },
  {
    id: '33',
    name: 'Vocal Remover',
    description: 'Remove vocals/instruments from songs using AI audio processing.',
    category: 'Media Tools',
    pricing: 'Free',
    rating: 4.2,
    users: '5M+',
    tags: ['Audio Processing', 'Vocal Removal', 'Music'],
    features: ['Vocal Removal', 'Instrument Isolation', 'Karaoke Creation', 'Audio Editing'],
    website: 'https://vocalremover.org',
    logo: '🎵',
    featured: false,
  },
  {
    id: '34',
    name: 'BuildAI',
    description: 'No-code platform to create AI apps without programming knowledge.',
    category: 'Development Tools',
    pricing: 'Freemium',
    rating: 4.3,
    users: '800K+',
    tags: ['No-code', 'AI Apps', 'Platform'],
    features: ['No-code Builder', 'AI Integration', 'App Templates', 'Deployment'],
    website: 'https://buildai.space',
    logo: '🔧',
    featured: false,
  },
  {
    id: '35',
    name: 'Magic Eraser',
    description: 'AI removes unwanted objects from photos with advanced inpainting.',
    category: 'Image Generation',
    pricing: 'Freemium',
    rating: 4.4,
    users: '3M+',
    tags: ['Photo Editing', 'Object Removal', 'Inpainting'],
    features: ['Object Removal', 'Background Editing', 'Batch Processing', 'High Quality'],
    website: 'https://magicstudio.com/magiceraser/',
    logo: '🪄',
    featured: false,
  },
  {
    id: '36',
    name: 'Draw.io',
    description: 'Online diagramming tool for flowcharts, network diagrams, and more.',
    category: 'Productivity Tools',
    pricing: 'Free',
    rating: 4.6,
    users: '10M+',
    tags: ['Diagramming', 'Flowcharts', 'Free'],
    features: ['Flowcharts', 'Network Diagrams', 'UML', 'Collaboration'],
    website: 'https://draw.io',
    logo: '📐',
    featured: false,
  },
  {
    id: '37',
    name: 'Eraser.io',
    description: 'Collaborative whiteboard & design tool for team brainstorming.',
    category: 'Productivity Tools',
    pricing: 'Freemium',
    rating: 4.3,
    users: '1M+',
    tags: ['Whiteboard', 'Collaboration', 'Design'],
    features: ['Collaborative Whiteboard', 'Templates', 'Real-time Editing', 'Integrations'],
    website: 'https://eraser.io',
    logo: '🖼️',
    featured: false,
  },
  {
    id: '38',
    name: 'Dream Interpreter AI',
    description: 'AI dream analysis & explanations for understanding subconscious thoughts.',
    category: 'Media Tools',
    pricing: 'Freemium',
    rating: 3.9,
    users: '200K+',
    tags: ['Dream Analysis', 'Psychology', 'Entertainment'],
    features: ['Dream Interpretation', 'Symbol Analysis', 'Psychological Insights', 'Journal'],
    website: 'https://dreaminterpreter.ai',
    logo: '🌙',
    featured: false,
  },
  // Learning & Coding Practice
  {
    id: '39',
    name: 'Regex101',
    description: 'Regex tester with explanation & debugger for regular expressions.',
    category: 'Development Tools',
    pricing: 'Free',
    rating: 4.8,
    users: '5M+',
    tags: ['Regex', 'Testing', 'Developer Tools'],
    features: ['Regex Testing', 'Pattern Explanation', 'Debugger', 'Multiple Flavors'],
    website: 'https://regex101.com',
    logo: '🔤',
    featured: true,
  },
  {
    id: '40',
    name: 'Carbon',
    description: 'Create beautiful code snippets for presentations and sharing.',
    category: 'Development Tools',
    pricing: 'Free',
    rating: 4.7,
    users: '2M+',
    tags: ['Code Screenshots', 'Sharing', 'Presentation'],
    features: ['Beautiful Code Images', 'Syntax Highlighting', 'Themes', 'Export Options'],
    website: 'https://carbon.now.sh',
    logo: '📸',
    featured: false,
  },
  {
    id: '41',
    name: 'Roadmap.sh',
    description: 'Guides & roadmaps for learning development skills and career paths.',
    category: 'Learning Platforms',
    pricing: 'Free',
    rating: 4.9,
    users: '10M+',
    tags: ['Learning', 'Roadmaps', 'Career'],
    features: ['Learning Paths', 'Skill Roadmaps', 'Career Guidance', 'Community'],
    website: 'https://roadmap.sh',
    logo: '🗺️',
    featured: true,
  },
  {
    id: '42',
    name: 'Replit',
    description: 'Cloud IDE for coding with AI features and collaborative development.',
    category: 'Development Tools',
    pricing: 'Freemium',
    rating: 4.5,
    users: '20M+',
    tags: ['Cloud IDE', 'Collaboration', 'AI Coding'],
    features: ['Cloud IDE', 'AI Assistant', 'Collaboration', 'Deployment'],
    website: 'https://replit.com',
    logo: '💻',
    featured: true,
  },
  {
    id: '43',
    name: 'Cursor',
    description: 'AI coding editor with GPT support for enhanced development experience.',
    category: 'Development Tools',
    pricing: 'Freemium',
    rating: 4.6,
    users: '1M+',
    tags: ['AI Coding', 'Editor', 'GPT Integration'],
    features: ['AI Code Completion', 'GPT Integration', 'Smart Editing', 'Code Generation'],
    website: 'https://cursor.com',
    logo: '🎯',
    featured: true,
  },
  {
    id: '44',
    name: 'Lovable',
    description: 'Collaborative AI software builder for rapid web development.',
    category: 'Development Tools',
    pricing: 'Freemium',
    rating: 4.7,
    users: '500K+',
    tags: ['AI Development', 'Web Builder', 'Collaboration'],
    features: ['AI Web Development', 'React/TypeScript', 'Real-time Preview', 'Collaboration'],
    website: 'https://lovable.dev',
    logo: '💝',
    featured: true,
  },
  {
    id: '45',
    name: 'Bolt.new',
    description: 'AI tool to instantly spin up coding projects with full-stack capabilities.',
    category: 'Development Tools',
    pricing: 'Free',
    rating: 4.4,
    users: '800K+',
    tags: ['Project Generation', 'Full-stack', 'Instant'],
    features: ['Instant Project Setup', 'Full-stack Templates', 'AI Generation', 'Quick Deploy'],
    website: 'https://bolt.new',
    logo: '⚡',
    featured: false,
  },
  {
    id: '46',
    name: 'V0',
    description: 'AI UI-to-code generator by Vercel for React component creation.',
    category: 'Development Tools',
    pricing: 'Free',
    rating: 4.5,
    users: '2M+',
    tags: ['UI Generation', 'React', 'Vercel'],
    features: ['UI to Code', 'React Components', 'Tailwind CSS', 'Copy & Paste'],
    website: 'https://v0.app',
    logo: '🎨',
    featured: true,
  },
  {
    id: '47',
    name: 'LeetCode',
    description: 'Coding interview prep & problems for technical skill development.',
    category: 'Learning Platforms',
    pricing: 'Freemium',
    rating: 4.4,
    users: '50M+',
    tags: ['Coding Practice', 'Interview Prep', 'Algorithms'],
    features: ['Coding Problems', 'Interview Prep', 'Mock Interviews', 'Discussions'],
    website: 'https://leetcode.com',
    logo: '🧮',
    featured: true,
  },
  {
    id: '48',
    name: 'GeeksforGeeks',
    description: 'Tutorials, DSA, job prep platform for computer science learning.',
    category: 'Learning Platforms',
    pricing: 'Freemium',
    rating: 4.3,
    users: '30M+',
    tags: ['Tutorials', 'DSA', 'Job Prep'],
    features: ['Tutorials', 'Data Structures', 'Algorithms', 'Interview Prep'],
    website: 'https://geeksforgeeks.org',
    logo: '🤓',
    featured: false,
  },
  // AI Research & APIs
  {
    id: '49',
    name: 'OpenRouter',
    description: 'Gateway to multiple AI models with one API for easy integration.',
    category: 'AI Research & APIs',
    pricing: 'Freemium',
    rating: 4.6,
    users: '500K+',
    tags: ['API Gateway', 'Multiple Models', 'Integration'],
    features: ['Multi-model API', 'Cost Optimization', 'Model Comparison', 'Easy Integration'],
    website: 'https://openrouter.ai',
    logo: '🔗',
    featured: true,
  },
  {
    id: '50',
    name: 'Groq Console',
    description: 'Access Groq\'s LPU for ultra-fast AI inference and processing.',
    category: 'AI Research & APIs',
    pricing: 'Freemium',
    rating: 4.5,
    users: '200K+',
    tags: ['LPU', 'Fast Inference', 'API'],
    features: ['Ultra-fast Inference', 'LPU Technology', 'API Access', 'High Performance'],
    website: 'https://console.groq.com',
    logo: '🚀',
    featured: false,
  },
  {
    id: '51',
    name: 'Hugging Face',
    description: 'Open-source platform for AI models, datasets, and ML community.',
    category: 'AI Research & APIs',
    pricing: 'Freemium',
    rating: 4.8,
    users: '10M+',
    tags: ['Open Source', 'Models', 'Community'],
    features: ['Model Hub', 'Datasets', 'Spaces', 'Transformers Library'],
    website: 'https://huggingface.co',
    logo: '🤗',
    featured: true,
  },
  // Academics, Research & Study
  {
    id: '52',
    name: 'Paper Panda',
    description: 'Unlocks academic papers paywalls with DOI for research access.',
    category: 'Academic Tools',
    pricing: 'Free',
    rating: 4.3,
    users: '1M+',
    tags: ['Academic Papers', 'Research', 'DOI'],
    features: ['Paywall Bypass', 'DOI Access', 'Research Papers', 'Academic Resources'],
    website: 'https://paperpanda.app',
    logo: '🐼',
    featured: false,
  },
  {
    id: '53',
    name: 'Paperpal',
    description: 'AI academic writing & grammar checker for research papers.',
    category: 'Academic Tools',
    pricing: 'Freemium',
    rating: 4.4,
    users: '2M+',
    tags: ['Academic Writing', 'Grammar', 'Research'],
    features: ['Academic Grammar', 'Research Writing', 'Citation Help', 'Plagiarism Check'],
    website: 'https://paperpal.com',
    logo: '📄',
    featured: false,
  },
  {
    id: '54',
    name: 'arXiv',
    description: 'Free repository for scientific preprints and research papers.',
    category: 'Academic Tools',
    pricing: 'Free',
    rating: 4.7,
    users: '5M+',
    tags: ['Scientific Papers', 'Preprints', 'Research'],
    features: ['Scientific Papers', 'Preprints', 'Research Archive', 'Open Access'],
    website: 'https://arxiv.org',
    logo: '📚',
    featured: true,
  },
  {
    id: '55',
    name: 'Wolfram Alpha',
    description: 'Computational knowledge engine for mathematical and scientific queries.',
    category: 'Academic Tools',
    pricing: 'Freemium',
    rating: 4.6,
    users: '20M+',
    tags: ['Mathematics', 'Computation', 'Knowledge'],
    features: ['Mathematical Computation', 'Scientific Data', 'Step-by-step Solutions', 'Graphs'],
    website: 'https://wolframalpha.com',
    logo: '🔢',
    featured: true,
  },
  // Media, Fun & Misc
  {
    id: '56',
    name: 'ChatPDF',
    description: 'Chat with your PDF documents using AI for quick information extraction.',
    category: 'Media Tools',
    pricing: 'Freemium',
    rating: 4.3,
    users: '5M+',
    tags: ['PDF Chat', 'Document Analysis', 'AI Reading'],
    features: ['PDF Interaction', 'Document Q&A', 'Information Extraction', 'Multi-language'],
    website: 'https://chatpdf.com',
    logo: '📄',
    featured: false,
  },
  {
    id: '57',
    name: 'Descript',
    description: 'AI audio/video editor & podcasting tool with transcription features.',
    category: 'Media Tools',
    pricing: 'Freemium',
    rating: 4.5,
    users: '3M+',
    tags: ['Audio Editing', 'Video Editing', 'Podcasting'],
    features: ['Audio/Video Editing', 'Transcription', 'Voice Cloning', 'Screen Recording'],
    website: 'https://descript.com',
    logo: '🎬',
    featured: true,
  },
  {
    id: '58',
    name: 'Dora',
    description: 'No-code website builder with AI for creating modern websites.',
    category: 'Development Tools',
    pricing: 'Freemium',
    rating: 4.2,
    users: '800K+',
    tags: ['No-code', 'Website Builder', 'AI Design'],
    features: ['No-code Builder', 'AI Design', 'Responsive', 'Modern Templates'],
    website: 'https://dora.run',
    logo: '🌐',
    featured: false,
  },
  {
    id: '59',
    name: 'Gumloop',
    description: 'AI automation and workflows tool for business process optimization.',
    category: 'Productivity Tools',
    pricing: 'Freemium',
    rating: 4.1,
    users: '400K+',
    tags: ['Automation', 'Workflows', 'Business'],
    features: ['Workflow Automation', 'AI Integration', 'Business Processes', 'Task Management'],
    website: 'https://gumloop.com',
    logo: '🔄',
    featured: false,
  },
];

const categories = ['All', 'AI Tools', 'AI Assistant', 'AI Writing & Creativity', 'Image Generation', 'Content Writing', 'SEO Tools', 'Code Assistant', 'Writing Assistant', 'Video Generation', 'Design Tools', 'Productivity Tools', 'Media Tools', 'Development Tools', 'Learning Platforms', 'AI Research & APIs', 'Academic Tools', 'Chatbot'];
const pricingFilters = ['All', 'Free', 'Freemium', 'Paid'];

const categoryIcons = {
  'AI Tools': <Bot className="w-4 h-4" />,
  'AI Assistant': <Brain className="w-4 h-4" />,
  'AI Writing & Creativity': <PenTool className="w-4 h-4" />,
  'Image Generation': <Palette className="w-4 h-4" />,
  'Content Writing': <PenTool className="w-4 h-4" />,
  'SEO Tools': <TrendingUp className="w-4 h-4" />,
  'Code Assistant': <MessageSquare className="w-4 h-4" />,
  'Writing Assistant': <MessageSquare className="w-4 h-4" />,
  'Video Generation': <Zap className="w-4 h-4" />,
  'Design Tools': <Palette className="w-4 h-4" />,
  'Productivity Tools': <Zap className="w-4 h-4" />,
  'Media Tools': <Gamepad2 className="w-4 h-4" />,
  'Development Tools': <Code className="w-4 h-4" />,
  'Learning Platforms': <GraduationCap className="w-4 h-4" />,
  'AI Research & APIs': <Database className="w-4 h-4" />,
  'Academic Tools': <FileText className="w-4 h-4" />,
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

  const handleExploreClick = (website: string) => {
    window.open(website, '_blank', 'noopener,noreferrer');
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
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 z-10" />
              <Input
                type="text"
                placeholder="Search AI tools, chatbots, assistants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg glass-effect border-white/20 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-black/20 text-white placeholder:text-muted-foreground"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
            {searchTerm && (
              <div className="mt-2 text-sm text-muted-foreground text-center">
                Found {filteredTools.length} tools matching "{searchTerm}"
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="flex justify-center space-x-8 mb-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-gradient">59+</div>
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
                    onClick={() => handleExploreClick(tool.website)}
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
                      onClick={() => handleExploreClick(tool.website)}
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