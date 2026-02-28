import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MapPin, Calendar, Users, ExternalLink, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

/**
 * QatAIyef: AI Engineering Nights - Event Registration Website
 * Design Philosophy: Luxe Minimalism
 * - Generous whitespace and breathing room
 * - Deep maroon (#631616) as primary accent
 * - Gold (#B58D53) for micro-interactions
 * - Typography-first design with Playfair Display (titles) and Lora (body)
 */

interface Speaker {
  name: string;
  role: string;
  company: string;
  country: string;
  linkedinUrl: string;
  imageUrl?: string;
}

interface DaySchedule {
  day: number;
  date: string;
  title: string;
  description: string;
  speakers: Speaker[];
  isPanel?: boolean;
}

const schedule: DaySchedule[] = [
  {
    day: 1,
    date: "March 8, 2026",
    title: "Build a Secure GenAI App",
    description: "From Idea to Production - Learn modern GenAI application architecture and security best practices",
    speakers: [
      {
        name: "Bady Ammar",
        role: "Creative Strategist",
        company: "Independent / Consultant",
        country: "Saudi Arabia",
        linkedinUrl: "https://linkedin.com/in/badyammar",
      },
    ],
  },
  {
    day: 2,
    date: "March 9, 2026",
    title: "RAG that Actually Works",
    description: "Master Retrieval-Augmented Generation with practical methodologies for integrating LLMs with private datasets",
    speakers: [
      {
        name: "Abdelrahman Hafrag",
        role: "Co-Founder",
        company: "Almach AI",
        country: "United States",
        linkedinUrl: "https://linkedin.com/in/abdelrahman-hafrag",
      },
    ],
  },
  {
    day: 3,
    date: "March 10, 2026",
    title: "From Repo to Production",
    description: "Deploying AI Apps the Right Way - Strategic deployment, version control, and scalable management",
    speakers: [
      {
        name: "Hany Saad",
        role: "Senior Software Engineering Manager",
        company: "ITWorx",
        country: "Egypt",
        linkedinUrl: "https://linkedin.com/in/hanysaad",
      },
    ],
  },
  {
    day: 4,
    date: "March 11, 2026",
    title: "Agentic AI, Tools, MCPs",
    description: "Beyond Chatbots - Discover AI agents, multi-step reasoning, and external tool integration",
    speakers: [
      {
        name: "Ayman Mostafa",
        role: "AI Engineer & Host of AI World Podcast",
        company: "Independent / Consultant",
        country: "Egypt",
        linkedinUrl: "https://linkedin.com/in/ayman-mostafa",
      },
    ],
  },
  {
    day: 5,
    date: "March 12, 2026",
    title: "Evaluating, Monitoring & Trusting LLM Systems",
    description: "Foster trust in AI systems through rigorous evaluation, monitoring, and continuous improvement",
    speakers: [
      {
        name: "Fam Louiz",
        role: "HPC & AI Software Engineer",
        company: "Deutsche Bahn",
        country: "Germany",
        linkedinUrl: "https://linkedin.com/in/fam-louiz",
      },
    ],
  },
  {
    day: 6,
    date: "March 13, 2026",
    title: "Intensive Career Night: AI & Engineering Paths",
    description: "PANEL DAY - Insights into recruitment, role expectations, and career trajectories in AI and DevOps",
    speakers: [
      {
        name: "Dr. Marwa El Hefnawy",
        role: "AI and 5G/6G System Engineering Expert",
        company: "Various (Apple, Intel, Huawei)",
        country: "Egypt",
        linkedinUrl: "https://linkedin.com/in/marwa-el-hefnawy",
      },
      {
        name: "Omar Samir",
        role: "AI & Data Consultant",
        company: "EY",
        country: "Egypt",
        linkedinUrl: "https://linkedin.com/in/omar-samir",
      },
      {
        name: "Ayman Saber",
        role: "GenAI Engineer",
        company: "VOIS",
        country: "Egypt",
        linkedinUrl: "https://linkedin.com/in/ayman-saber",
      },
    ],
    isPanel: true,
  },
  {
    day: 7,
    date: "March 14, 2026",
    title: "Entrepreneurship Night: How to Start and Ship a Successful AI Product",
    description: "PANEL DAY - Pragmatic guide to developing successful AI products and go-to-market strategies",
    speakers: [
      {
        name: "Dr. Amani Eissa",
        role: "VP of Artificial Intelligence",
        company: "Keheilan",
        country: "Egypt",
        linkedinUrl: "https://linkedin.com/in/amani-eissa",
      },
      {
        name: "Ahmed Abdelhamid",
        role: "Investor - Deeptech",
        company: "Keheilan",
        country: "Egypt",
        linkedinUrl: "https://linkedin.com/in/ahmed-abdelhamid",
      },
    ],
    isPanel: true,
  },
];

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    university: "",
    position: "",
    ieeeStatus: "",
    resumeUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.university || !formData.position) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to Google Sheets via Apps Script
      const response = await fetch(
        "https://script.google.com/macros/d/1cE_joDVSBwGuM8GhK33svMzFvM4Ogpegc5fq0MkmiNM/usercopy/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            university: formData.university,
            position: formData.position,
            ieeeStatus: formData.ieeeStatus || "N/A",
            resumeUrl: formData.resumeUrl || "N/A",
          }).toString(),
        }
      );

      toast.success("Registration submitted successfully! We'll be in touch soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        university: "",
        position: "",
        ieeeStatus: "",
        resumeUrl: "",
      });
    } catch (error) {
      toast.error("Failed to submit registration. Please try again.");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663218767548/JZLmaUjE6Urqx3LY7mpNck/qataiyef_72ec057f.jpeg"
              alt="QatAIyef Logo"
              className="h-10 w-auto"
            />
            <div>
              <h1 className="text-xl font-bold text-maroon">QatAIyef</h1>
              <p className="text-xs text-muted-foreground">AI Engineering Nights</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-8 items-center">
            <a href="#agenda" className="text-sm font-medium text-foreground hover:text-maroon transition-colors">
              Agenda
            </a>
            <a href="#speakers" className="text-sm font-medium text-foreground hover:text-maroon transition-colors">
              Speakers
            </a>
            <a href="#register" className="text-sm font-medium text-foreground hover:text-maroon transition-colors">
              Register
            </a>
            <a href="#partnerships" className="text-sm font-medium text-foreground hover:text-maroon transition-colors">
              Partnerships
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden"
        style={{
          backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663218767548/JZLmaUjE6Urqx3LY7mpNck/hero-background-9R9mmQLg6BxnfE5ja9CGQS.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-cream/80 via-cream/60 to-cream/40"></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="mb-6 animate-fade-in">
            <span className="inline-block px-4 py-2 bg-gold/20 text-maroon rounded-full text-sm font-semibold mb-4">
              March 8-14, 2026 • 9:00 PM - 11:00 PM Cairo Time
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-maroon mb-6 leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
            QatAIyef
          </h1>
          <p className="text-2xl md:text-3xl text-dark-brown mb-4 font-semibold animate-fade-in" style={{ animationDelay: "0.2s" }}>
            AI Engineering Nights
          </p>
          <p className="text-lg text-foreground mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "0.3s" }}>
            From GenAI Apps to Production & Careers - A comprehensive 7-day online technical event guiding you through secure GenAI development, production deployment, and career pathways in AI engineering.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button
              size="lg"
              className="bg-maroon hover:bg-maroon/90 text-cream px-8"
              onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
            >
              Register Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-maroon text-maroon hover:bg-maroon/5"
              onClick={() => document.getElementById("agenda")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Agenda
            </Button>
          </div>
        </div>
      </section>

      {/* Event Info Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 border-gold/30 hover:shadow-lg transition-shadow">
              <Calendar className="w-12 h-12 text-gold mb-4" />
              <h3 className="text-xl font-bold text-maroon mb-2">7 Days</h3>
              <p className="text-foreground">March 8-14, 2026 • 9 PM - 11 PM Cairo Time</p>
            </Card>
            <Card className="p-8 border-gold/30 hover:shadow-lg transition-shadow">
              <Users className="w-12 h-12 text-gold mb-4" />
              <h3 className="text-xl font-bold text-maroon mb-2">13 Expert Speakers</h3>
              <p className="text-foreground">Industry leaders from around the world sharing insights</p>
            </Card>
            <Card className="p-8 border-gold/30 hover:shadow-lg transition-shadow">
              <Mail className="w-12 h-12 text-gold mb-4" />
              <h3 className="text-xl font-bold text-maroon mb-2">Contact</h3>
              <p className="text-foreground">ieee-eui-sb@eui.edu.eg</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Agenda Section */}
      <section id="agenda" className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-maroon mb-4 text-center">Event Agenda</h2>
          <p className="text-center text-foreground mb-16 max-w-2xl mx-auto">
            Explore our comprehensive 7-day program covering everything from secure GenAI development to career pathways and entrepreneurship.
          </p>

          <div className="space-y-8">
            {schedule.map((daySchedule, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-8 border-l-4 border-gold hover:shadow-lg transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-block bg-maroon text-cream px-4 py-2 rounded-full font-bold text-sm">
                        Day {daySchedule.day}
                      </span>
                      {daySchedule.isPanel && (
                        <span className="inline-block bg-gold/30 text-maroon px-3 py-1 rounded-full text-xs font-semibold">
                          PANEL
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{daySchedule.date}</p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-maroon mb-2">{daySchedule.title}</h3>
                <p className="text-foreground mb-6">{daySchedule.description}</p>

                <div className="space-y-3">
                  {daySchedule.speakers.map((speaker, speakerIndex) => (
                    <div key={speakerIndex} className="flex items-center justify-between p-4 bg-cream rounded-lg hover:bg-gold/10 transition-colors">
                      <div>
                        <p className="font-semibold text-maroon">{speaker.name}</p>
                        <p className="text-sm text-foreground">{speaker.role}</p>
                        <p className="text-xs text-muted-foreground">
                          {speaker.company} • {speaker.country}
                        </p>
                      </div>
                      <a
                        href={speaker.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold hover:text-maroon transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section id="speakers" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-maroon mb-4 text-center">Meet Our Speakers</h2>
          <p className="text-center text-foreground mb-16 max-w-2xl mx-auto">
            Learn from industry experts and thought leaders in AI engineering, DevOps, and entrepreneurship.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {schedule.flatMap((day) =>
              day.speakers.map((speaker, index) => (
                <Card key={`${day.day}-${index}`} className="overflow-hidden hover:shadow-xl transition-shadow border-gold/20">
                  <div className="h-64 bg-gradient-to-br from-gold/20 to-maroon/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-maroon/10 mx-auto mb-4 flex items-center justify-center">
                        <Users className="w-10 h-10 text-maroon" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-maroon mb-1">{speaker.name}</h3>
                    <p className="text-sm font-semibold text-gold mb-2">{speaker.role}</p>
                    <p className="text-sm text-foreground mb-1">{speaker.company}</p>
                    <p className="text-xs text-muted-foreground mb-4">{speaker.country}</p>
                    <a
                      href={speaker.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-maroon hover:text-gold transition-colors font-semibold"
                    >
                      View Profile <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section
        id="register"
        className="py-20 relative"
        style={{
          backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663218767548/JZLmaUjE6Urqx3LY7mpNck/registration-section-bg-CDVC7FVX5VXtXX8eZPj2r7.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cream/95 to-cream/80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-maroon mb-4 text-center">Register Now</h2>
          <p className="text-center text-foreground mb-12 max-w-2xl mx-auto">
            Secure your spot at QatAIyef: AI Engineering Nights. Fill out the form below to register for this exclusive event.
          </p>

          <div className="max-w-2xl mx-auto bg-white rounded-lg p-8 shadow-lg border border-gold/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-foreground font-semibold">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => handleFormChange("name", e.target.value)}
                  className="mt-2 border-border focus:border-gold focus:ring-gold"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-foreground font-semibold">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleFormChange("email", e.target.value)}
                  className="mt-2 border-border focus:border-gold focus:ring-gold"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-foreground font-semibold">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+20 XXX XXX XXXX"
                  value={formData.phone}
                  onChange={(e) => handleFormChange("phone", e.target.value)}
                  className="mt-2 border-border focus:border-gold focus:ring-gold"
                  required
                />
              </div>

              <div>
                <Label htmlFor="university" className="text-foreground font-semibold">
                  University/Organization *
                </Label>
                <Input
                  id="university"
                  placeholder="Your university or organization"
                  value={formData.university}
                  onChange={(e) => handleFormChange("university", e.target.value)}
                  className="mt-2 border-border focus:border-gold focus:ring-gold"
                  required
                />
              </div>

              <div>
                <Label htmlFor="position" className="text-foreground font-semibold">
                  Current Position *
                </Label>
                <Input
                  id="position"
                  placeholder="e.g., Student, Software Engineer, Data Scientist"
                  value={formData.position}
                  onChange={(e) => handleFormChange("position", e.target.value)}
                  className="mt-2 border-border focus:border-gold focus:ring-gold"
                  required
                />
              </div>

              <div>
                <Label htmlFor="ieeeStatus" className="text-foreground font-semibold">
                  IEEE Membership Status
                </Label>
                <Select value={formData.ieeeStatus} onValueChange={(value) => handleFormChange("ieeeStatus", value)}>
                  <SelectTrigger className="mt-2 border-border focus:border-gold focus:ring-gold">
                    <SelectValue placeholder="Select your IEEE membership status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not-member">Not a Member</SelectItem>
                    <SelectItem value="student-member">Student Member</SelectItem>
                    <SelectItem value="professional-member">Professional Member</SelectItem>
                    <SelectItem value="ieee-cs-member">IEEE Computer Society Member</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="resumeUrl" className="text-foreground font-semibold">
                  Resume URL (Optional)
                </Label>
                <Input
                  id="resumeUrl"
                  type="url"
                  placeholder="https://example.com/your-resume.pdf"
                  value={formData.resumeUrl}
                  onChange={(e) => handleFormChange("resumeUrl", e.target.value)}
                  className="mt-2 border-border focus:border-gold focus:ring-gold"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-maroon hover:bg-maroon/90 text-cream font-semibold py-3 text-lg"
              >
                {isSubmitting ? "Submitting..." : "Register for QatAIyef"}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Your information will be securely submitted and used only for event communication.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Partnerships Section */}
      <section
        id="partnerships"
        className="py-20 relative"
        style={{
          backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663218767548/JZLmaUjE6Urqx3LY7mpNck/partnerships-section-bg-2zUExyNjve4atv8JiPYjdZ.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-cream/90 to-cream/85"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-maroon mb-4">Partnerships</h2>
          <p className="text-lg text-foreground mb-12 max-w-2xl mx-auto">
            Stay tuned for exciting partnership announcements with leading organizations in AI, technology, and innovation.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-8 border-2 border-gold/30 hover:border-gold transition-colors">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663218767548/JZLmaUjE6Urqx3LY7mpNck/ieee logo_fb432d17.jpg"
                alt="IEEE"
                className="h-20 mx-auto mb-4 object-contain"
              />
              <h3 className="text-lg font-bold text-maroon">IEEE</h3>
            </div>

            <div className="bg-white rounded-lg p-8 border-2 border-gold/30 hover:border-gold transition-colors">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663218767548/JZLmaUjE6Urqx3LY7mpNck/ieee eui cs_8bff8249.jpeg"
                alt="IEEE EUI Computer Society"
                className="h-20 mx-auto mb-4 object-contain"
              />
              <h3 className="text-lg font-bold text-maroon">IEEE EUI CS</h3>
            </div>

            <div className="bg-white rounded-lg p-8 border-2 border-gold/30 hover:border-gold transition-colors">
              <div className="h-20 flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-gold">+</span>
              </div>
              <h3 className="text-lg font-bold text-maroon">More Coming Soon</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-maroon text-cream py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">QatAIyef</h3>
              <p className="text-cream/80">AI Engineering Nights - A comprehensive technical event for AI professionals and enthusiasts.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-cream/80">
                <li>
                  <a href="#agenda" className="hover:text-gold transition-colors">
                    Agenda
                  </a>
                </li>
                <li>
                  <a href="#speakers" className="hover:text-gold transition-colors">
                    Speakers
                  </a>
                </li>
                <li>
                  <a href="#register" className="hover:text-gold transition-colors">
                    Register
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <p className="text-cream/80 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                ieee-eui-sb@eui.edu.eg
              </p>
              <p className="text-cream/80 mt-2">March 8-14, 2026</p>
            </div>
          </div>
          <div className="border-t border-cream/20 pt-8 text-center text-cream/60 text-sm">
            <p>&copy; 2026 QatAIyef: AI Engineering Nights. All rights reserved.</p>
            <p className="mt-2">Organized by IEEE EUI Computer Society Student Branch</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
