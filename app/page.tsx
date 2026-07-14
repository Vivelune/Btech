
"use client";

import React, { useState } from 'react';

import { 
  Lightbulb, 
  User, 
  LayoutDashboard, 
  HelpCircle, 
  Search,
  Cpu,
  Globe,
  Smartphone,
  TrendingUp,
  Palette,
  FileText,
  Mail,
  Phone,
  MapPin,
  Building,
  Target,
  Award,
  Zap,
  Clock,
  ArrowRight
} from 'lucide-react';
import { FloatingNav } from '@/components/ui/floating-navbar';
import { cn } from "@/lib/utils";

import Hero from './components/Hero';
import WebDevCard from './components/WebDevCard';
import MobileAppSection from './components/MobileAppSection';
import DigitalMarketingSection from './components/DigitalMarketingSection';
import RevolutionCard from './components/RevolutionCard';
import JourneySection from './components/JourneySection';
import BoldVisionSection from './components/BoldVisionSection';
import Footer from './components/Footer';
import Navbar from './components/navbar/Navbar';

const Divider = () => (
  <div
    style={{
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(58,158,95,.2), transparent)',
      width: '100%',
    }}
  />
);

const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #22c55e, #4ade80)',
        width: `${scrollProgress}%`,
        zIndex: 50,
        transition: 'width 0.1s ease-out',
      }}
    />
  );
};

/* ==========================================
   1. SOLUTIONS DRAWER CONTENT
   ========================================== */
const SolutionsDrawerBody = () => {
  const categories = [
    {
      id: "digital",
      name: "Digital Solutions",
      icon: <Cpu className="w-4 h-4" />,
      items: [
        { name: "Cloud Services", desc: "Scalable cloud infrastructure" },
        { name: "AI Integration", desc: "Machine learning solutions" },
        { name: "Cybersecurity", desc: "Advanced security solutions" },
        { name: "Data Analytics", desc: "Business intelligence" },
        { name: "Digital Transformation", desc: "Business modernization" },
        { name: "System Integration", desc: "Seamless connectivity" },
        { name: "IT Consulting", desc: "Strategic guidance" },
        { name: "Automation Services", desc: "Process automation" },
        { name: "Tech Support", desc: "24/7 assistance" },
        { name: "Infrastructure Management", desc: "IT infrastructure" },
      ]
    },
    {
      id: "web",
      name: "Web Development",
      icon: <Globe className="w-4 h-4" />,
      items: [
        { name: "Web Applications", desc: "Custom web apps" },
        { name: "E-commerce", desc: "Online stores" },
        { name: "CMS Development", desc: "Content management" },
        { name: "Responsive Design", desc: "Mobile-first design" },
        { name: "SEO Optimization", desc: "Search rankings" },
        { name: "Web Hosting", desc: "Reliable hosting" },
        { name: "Web Security", desc: "Security solutions" },
        { name: "Web Maintenance", desc: "Ongoing support" },
        { name: "Performance Optimization", desc: "Speed improvements" },
      ]
    },
    {
      id: "apps",
      name: "App Development",
      icon: <Smartphone className="w-4 h-4" />,
      items: [
        { name: "iOS Apps", desc: "Native iOS development" },
        { name: "Android Apps", desc: "Native Android apps" },
        { name: "Cross-Platform", desc: "React Native & Flutter" },
        { name: "App Design", desc: "UI/UX design" },
        { name: "App Testing", desc: "Quality assurance" },
        { name: "App Maintenance", desc: "Updates & support" },
        { name: "App Store Optimization", desc: "Visibility boost" },
        { name: "Enterprise Apps", desc: "Business solutions" },
        { name: "Game Development", desc: "Mobile games" },
      ]
    },
    {
      id: "marketing",
      name: "Digital Marketing",
      icon: <TrendingUp className="w-4 h-4" />,
      items: [
        { name: "Social Media Marketing", desc: "Social engagement" },
        { name: "Paid Advertising", desc: "PPC campaigns" },
        { name: "Content Marketing", desc: "Content strategy" },
        { name: "Email Marketing", desc: "Email campaigns" },
        { name: "Influencer Marketing", desc: "Influencer partnerships" },
        { name: "Marketing Analytics", desc: "Performance tracking" },
        { name: "Conversion Optimization", desc: "Conversion rate" },
        { name: "Marketing Strategy", desc: "Strategic planning" },
        { name: "Online Reputation", desc: "Reputation management" },
      ]
    },
    {
      id: "branding",
      name: "Brand & Logo",
      icon: <Palette className="w-4 h-4" />,
      items: [
        { name: "Brand Identity", desc: "Complete branding" },
        { name: "Logo Design", desc: "Custom logos" },
        { name: "Brand Guidelines", desc: "Style guides" },
        { name: "Business Cards", desc: "Print materials" },
        { name: "Letterheads", desc: "Professional stationery" },
        { name: "Logo Consultation", desc: "Expert advice" },
        { name: "Logo Revision", desc: "Logo updates" },
        { name: "Vector Design", desc: "Scalable graphics" },
        { name: "Logo Animation", desc: "Animated logos" },
        { name: "Trademark Support", desc: "Legal protection" },
      ]
    },
    {
      id: "forms",
      name: "Form Builder",
      icon: <FileText className="w-4 h-4" />,
      items: [
        { name: "Survey Forms", desc: "Collect feedback & insights" },
        { name: "Quiz Forms", desc: "Interactive quizzes" },
        { name: "Registration Forms", desc: "Event registrations" },
        { name: "Poll Forms", desc: "Quick opinion polls" },
        { name: "Application Forms", desc: "Job & admission forms" },
        { name: "Contact Forms", desc: "Lead capture forms" },
      ]
    }
  ];

  const [activeTab, setActiveTab] = useState(categories[0].id);
  const activeCategory = categories.find(c => c.id === activeTab) || categories[0];

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full h-full min-h-0 text-left pt-2 pb-4">
      <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible gap-1 pb-3 md:pb-0 md:w-60 border-b md:border-b-0 md:border-r border-neutral-100 dark:border-neutral-900 shrink-0 scrollbar-none">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveTab(category.id)}
            className={cn(
              "flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 hover:text-neutral-900 dark:hover:text-neutral-100 outline-none",
              activeTab === category.id && "bg-neutral-950 text-white dark:bg-white dark:text-black hover:bg-neutral-950 dark:hover:bg-white hover:text-white dark:hover:text-black font-semibold shadow-sm"
            )}
          >
            {category.icon}
            {category.name}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:max-h-[55vh] custom-scrollbar">
        {activeCategory.items.map((item, index) => (
          <div 
            key={index} 
            className="group relative p-4 rounded-xl border border-neutral-100 dark:border-neutral-900 bg-neutral-50/40 dark:bg-neutral-900/20 hover:bg-white dark:hover:bg-neutral-900 transition-all duration-300 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_4px_20px_-4px_rgba(255,255,255,0.02)] cursor-pointer"
          >
            <h4 className="font-semibold text-sm text-neutral-800 dark:text-neutral-200 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
              {item.name}
            </h4>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1 line-clamp-2">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ==========================================
   2. ABOUT DRAWER CONTENT
   ========================================== */
const AboutDrawerBody = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left pt-2 pb-6 max-h-[55vh] overflow-y-auto custom-scrollbar">
      <div className="md:col-span-1 space-y-4">
        <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
          <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3">
            <Building className="w-4 h-4" />
          </div>
          <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-50">Our Mission</h4>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5 leading-relaxed">
            Accelerating digital growth worldwide through hyper-scalable software ecosystems, data strategy, and modern aesthetic identity design.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-neutral-50/60 dark:bg-neutral-900/60 border border-neutral-100 dark:border-neutral-800/80 text-center">
            <span className="block text-xl font-bold text-neutral-900 dark:text-white">99.4%</span>
            <span className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase font-semibold mt-0.5 block">SLA Uptime</span>
          </div>
          <div className="p-4 rounded-xl bg-neutral-50/60 dark:bg-neutral-900/60 border border-neutral-100 dark:border-neutral-800/80 text-center">
            <span className="block text-xl font-bold text-neutral-900 dark:text-white">250+</span>
            <span className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase font-semibold mt-0.5 block">Deployments</span>
          </div>
        </div>
      </div>

      <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { icon: <Target className="w-4 h-4 text-blue-500" /> , title: "Result Oriented", desc: "Data configurations built with specialized event loops monitoring high conversion markers." },
          { icon: <Award className="w-4 h-4 text-purple-500" /> , title: "Award Winning Team", desc: "Crafted by industry leading developers and creative system designers across the globe." },
          { icon: <Zap className="w-4 h-4 text-amber-500" /> , title: "Rapid Development", desc: "Deploy custom full-stack solutions and modular applications inside optimal lifecycles." },
          { icon: <Clock className="w-4 h-4 text-emerald-500" /> , title: "24/7 Global Delivery", desc: "Continuous code evaluation and server management structures available at all intervals." }
        ].map((v, i) => (
          <div key={i} className="p-4 rounded-2xl border border-neutral-100 dark:border-neutral-900 bg-white dark:bg-neutral-900/30 shadow-sm flex gap-3.5">
            <div className="h-8 w-8 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shrink-0 flex items-center justify-center">
              {v.icon}
            </div>
            <div>
              <h5 className="font-semibold text-sm text-neutral-800 dark:text-neutral-200">{v.title}</h5>
              <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1 leading-relaxed">{v.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ==========================================
   3. DASHBOARD DRAWER CONTENT
   ========================================== */
const DashboardDrawerBody = () => {
  return (
    <div className="space-y-6 text-left pt-2 pb-6 max-h-[55vh] overflow-y-auto custom-scrollbar">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: "System Health", value: "Optimal", metric: "0ms latency", color: "text-emerald-500" },
          { title: "Active Services", value: "14 / 24", metric: "4 processing loops", color: "text-blue-500" },
          { title: "Ecosystem Version", value: "v4.12.0", metric: "Up to date", color: "text-neutral-400" }
        ].map((stat, i) => (
          <div key={i} className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
            <span className="text-xs text-neutral-400 dark:text-neutral-500 block font-medium">{stat.title}</span>
            <span className={cn("text-xl font-bold block mt-1", stat.color)}>{stat.value}</span>
            <span className="text-[11px] text-neutral-400 mt-0.5 block">{stat.metric}</span>
          </div>
        ))}
      </div>

      <div className="p-5 rounded-2xl border border-neutral-100 dark:border-neutral-900 bg-white dark:bg-neutral-900/20">
        <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-3.5">Live Operations Pipeline</h4>
        <div className="space-y-3">
          {[
            { label: "Frontend Shell Optimization", progress: "92%", color: "bg-emerald-500" },
            { label: "API Gateway Firewall Deployment", progress: "45%", color: "bg-blue-500" },
            { label: "Bespoke Assets Compiling", progress: "100%", color: "bg-purple-500" }
          ].map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-neutral-600 dark:text-neutral-400">
                <span>{item.label}</span>
                <span>{item.progress}</span>
              </div>
              <div className="h-1.5 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div className={cn("h-full rounded-full transition-all duration-500", item.color)} style={{ width: item.progress }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ==========================================
   4. SUPPORT DRAWER CONTENT
   ========================================== */
const SupportDrawerBody = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-left pt-2 pb-6 max-h-[55vh] overflow-y-auto custom-scrollbar">
      <div className="md:col-span-2 space-y-3">
        <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-200">How can we assist you?</h4>
        <p className="text-xs text-neutral-400 leading-relaxed">
          Access our diagnostic environments or open priority communication tickets directly with our operational engineering teams.
        </p>
        <div className="space-y-2 pt-2">
          <button className="w-full text-left p-3 rounded-xl border border-neutral-100 dark:border-neutral-900 bg-neutral-50/50 dark:bg-neutral-900/40 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-all flex items-center justify-between text-xs font-semibold text-neutral-700 dark:text-neutral-300 group">
            <span>🚀 Open Developer Ticket</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </button>
          <button className="w-full text-left p-3 rounded-xl border border-neutral-100 dark:border-neutral-900 bg-neutral-50/50 dark:bg-neutral-900/40 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-all flex items-center justify-between text-xs font-semibold text-neutral-700 dark:text-neutral-300 group">
            <span>📖 Knowledge Database</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </button>
        </div>
      </div>

      <div className="md:col-span-3 border-t md:border-t-0 md:border-l border-neutral-100 dark:border-neutral-900 pt-4 md:pt-0 md:pl-6 space-y-3">
        <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-200">Frequent Inquiries</h4>
        <div className="space-y-2.5">
          {[
            { q: "What is standard production delivery lifecycle?", a: "Most full-scale applications go production live inside 4 to 6 weeks depending on architectural requirements." },
            { q: "Are custom branding graphics scalable?", a: "Yes. All vector frameworks are delivered via pristine SVG layouts and organized stylesheets with complete guidelines." },
            { q: "Do you provide automated cloud monitoring?", a: "Our enterprise packages feature 24/7 diagnostic logging engines checking database endpoints continuously." }
          ].map((faq, i) => (
            <div key={i} className="p-3 rounded-xl bg-neutral-50/30 dark:bg-neutral-900/10 border border-neutral-100/70 dark:border-neutral-900/60">
              <h5 className="text-xs font-semibold text-neutral-800 dark:text-neutral-300">{faq.q}</h5>
              <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-1 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ==========================================
   5. SEARCH DRAWER CONTENT
   ========================================== */
const SearchDrawerBody = () => {
  return (
    <div className="space-y-4 text-left pt-2 pb-6 max-h-[55vh] flex flex-col">
      <div className="relative group shrink-0">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-neutral-500 group-focus-within:text-emerald-500 transition-colors" />
        <input 
          type="text" 
          autoFocus
          placeholder="Search services, products, or guidelines..." 
          className="w-full pl-11 pr-4 py-3.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 outline-none focus:border-neutral-400 dark:focus:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 transition-all"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex gap-1">
          <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-neutral-200 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400 font-sans border border-neutral-300 dark:border-neutral-700 font-medium">⌘</kbd>
          <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-neutral-200 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400 font-sans border border-neutral-300 dark:border-neutral-700 font-medium">K</kbd>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pt-2">
        <span className="text-[11px] font-bold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase block px-1">Suggested Pipelines</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { tag: "Web Applications", cat: "Development" },
            { tag: "AI Integration", cat: "Digital Solutions" },
            { tag: "Brand Identity Layouts", cat: "Design Ecosystem" },
            { tag: "SLA Infrastructure Specs", cat: "Documentation" }
          ].map((s, idx) => (
            <div key={idx} className="p-3 rounded-xl border border-neutral-100 dark:border-neutral-900 bg-neutral-50/20 dark:bg-neutral-900/10 hover:bg-neutral-50 dark:hover:bg-neutral-900 flex items-center justify-between cursor-pointer group transition-colors">
              <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">{s.tag}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 font-medium">{s.cat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ==========================================
   MAIN PAGE MOUNT
   ========================================== */
export default function MainPage() {
  const navItems = [
    {
      name: "Solutions",
      link: "#solutions",
      icon: <Lightbulb className="h-4 w-4 text-neutral-500 dark:text-white" />,
      drawerContent: {
        title: "Ecosystem Capabilities",
        description: "Choose a digital vertical to view our specialized solutions.",
        body: <SolutionsDrawerBody />
      }
    },
    {
      name: "About",
      link: "#about",
      icon: <User className="h-4 w-4 text-neutral-500 dark:text-white" />,
      drawerContent: {
        title: "Operational Framework",
        description: "Discover our technical benchmarks, values, and core structural pillars.",
        body: <AboutDrawerBody />
      }
    },
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <LayoutDashboard className="h-4 w-4 text-neutral-500 dark:text-white" />,
      drawerContent: {
        title: "Technical Control Center",
        description: "Real-time state overview of running workflows and build environments.",
        body: <DashboardDrawerBody />
      }
    },
    {
      name: "Support",
      link: "/support",
      icon: <HelpCircle className="h-4 w-4 text-neutral-500 dark:text-white" />,
      drawerContent: {
        title: "Global Support Console",
        description: "Get architecture guidance, open support queues, or view FAQs.",
        body: <SupportDrawerBody />
      }
    },
    {
      name: "Search",
      link: "#search",
      icon: <Search className="h-4 w-4 text-neutral-500 dark:text-white" />,
      drawerContent: {
        title: "Global Search Engine",
        description: "Query our operational indexes and modular services instantly.",
        body: <SearchDrawerBody />
      }
    },
  ];

  const contactCustomData = {
    title: "Initiate Project Request",
    description: "Connect instantly with our engineering coordinators down below.",
    body: (
      <div className="space-y-3 pt-1 text-left">
        <div className="grid grid-cols-1 gap-2.5">
          {[
            { icon: <Mail className="w-4 h-4 text-neutral-400" />, label: "Corporate Email", text: "team@agency.com" },
            { icon: <Phone className="w-4 h-4 text-neutral-400" />, label: "Direct Inbound Line", text: "+1 (555) 019-2834" },
            { icon: <MapPin className="w-4 h-4 text-neutral-400" />, label: "HQ Headquarters", text: "San Francisco, CA" }
          ].map((c, idx) => (
            <div key={idx} className="flex items-center gap-3.5 p-3 rounded-xl border border-neutral-100 dark:border-neutral-900 bg-neutral-50/50 dark:bg-neutral-900/40">
              <div className="h-8 w-8 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800 shrink-0 flex items-center justify-center">
                {c.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">{c.label}</span>
                <span className="text-xs font-medium text-neutral-700 dark:text-neutral-200 mt-0.5">{c.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  };

  return (
    <>
      <Navbar />
      <FloatingNav navItems={navItems} contactDrawerContent={contactCustomData} />
      <ScrollProgressBar />
      <Hero />
      <BoldVisionSection />
      <WebDevCard />
      <section id="mobile-app-section">
        <MobileAppSection />
      </section>
      <section id="digital-marketing-section">
        <DigitalMarketingSection />
      </section>
      <RevolutionCard />
      <JourneySection />
      <Footer />
    </>
  );
}