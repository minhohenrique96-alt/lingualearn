"use client";

import { useState, useEffect } from "react";
import { Languages, BookOpen, MessageSquare, Mic, Volume2, ArrowRightLeft, Download, Check, Wifi, WifiOff, User, BarChart3, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AuthModal } from "@/components/custom/auth-modal";
import { PricingModal } from "@/components/custom/pricing-modal";
import { ReviewModal } from "@/components/custom/review-modal";
import { NotificationCenter } from "@/components/custom/notification-center";
import { UserDashboard } from "@/components/custom/user-dashboard";
import { toast } from "sonner";

export default function Home() {
  const [activeTab, setActiveTab] = useState("lessons");
  const [translationText, setTranslationText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("pt");
  const [targetLang, setTargetLang] = useState("en");
  const [isTranslating, setIsTranslating] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [downloadedLessons, setDownloadedLessons] = useState<number[]>([]);
  const [downloadingLessons, setDownloadingLessons] = useState<number[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [reviewModalData, setReviewModalData] = useState<{ open: boolean; lessonId: number; lessonTitle: string }>({
    open: false,
    lessonId: 0,
    lessonTitle: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userTier, setUserTier] = useState<"free" | "basic" | "premium" | "enterprise">("free");

  const languages = [
    { code: "pt", name: "Português", flag: "🇧🇷" },
    { code: "en", name: "Inglês", flag: "🇺🇸" },
    { code: "es", name: "Espanhol", flag: "🇪🇸" },
    { code: "fr", name: "Francês", flag: "🇫🇷" },
    { code: "de", name: "Alemão", flag: "🇩🇪" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "ja", name: "Japonês", flag: "🇯🇵" },
    { code: "ko", name: "Coreano", flag: "🇰🇷" },
    { code: "zh", name: "Chinês", flag: "🇨🇳" },
    { code: "ru", name: "Russo", flag: "🇷🇺" },
    { code: "ar", name: "Árabe", flag: "🇸🇦" },
    { code: "hi", name: "Hindi", flag: "🇮🇳" },
    { code: "nl", name: "Holandês", flag: "🇳🇱" },
    { code: "sv", name: "Sueco", flag: "🇸🇪" },
    { code: "no", name: "Norueguês", flag: "🇳🇴" },
    { code: "da", name: "Dinamarquês", flag: "🇩🇰" },
    { code: "fi", name: "Finlandês", flag: "🇫🇮" },
    { code: "pl", name: "Polonês", flag: "🇵🇱" },
    { code: "tr", name: "Turco", flag: "🇹🇷" },
    { code: "el", name: "Grego", flag: "🇬🇷" },
    { code: "he", name: "Hebraico", flag: "🇮🇱" },
    { code: "th", name: "Tailandês", flag: "🇹🇭" },
    { code: "vi", name: "Vietnamita", flag: "🇻🇳" },
    { code: "id", name: "Indonésio", flag: "🇮🇩" },
    { code: "ms", name: "Malaio", flag: "🇲🇾" },
    { code: "cs", name: "Tcheco", flag: "🇨🇿" },
    { code: "ro", name: "Romeno", flag: "🇷🇴" },
    { code: "hu", name: "Húngaro", flag: "🇭🇺" },
    { code: "uk", name: "Ucraniano", flag: "🇺🇦" },
    { code: "bg", name: "Búlgaro", flag: "🇧🇬" },
  ];

  const lessons = [
    {
      id: 1,
      title: "Inglês Básico - Saudações",
      level: "Iniciante",
      progress: 75,
      duration: "15 min",
      icon: "👋",
      size: "2.5 MB",
      tier: "free",
      rating: 4.8,
      reviews: 1250,
    },
    {
      id: 2,
      title: "Espanhol - Números e Cores",
      level: "Iniciante",
      progress: 45,
      duration: "20 min",
      icon: "🔢",
      size: "3.1 MB",
      tier: "free",
      rating: 4.7,
      reviews: 980,
    },
    {
      id: 3,
      title: "Francês - Conversação Básica",
      level: "Intermediário",
      progress: 30,
      duration: "25 min",
      icon: "💬",
      size: "4.2 MB",
      tier: "basic",
      rating: 4.9,
      reviews: 2100,
    },
    {
      id: 4,
      title: "Alemão - Gramática Essencial",
      level: "Intermediário",
      progress: 60,
      duration: "30 min",
      icon: "📚",
      size: "5.8 MB",
      tier: "basic",
      rating: 4.6,
      reviews: 750,
    },
    {
      id: 5,
      title: "Japonês - Hiragana e Katakana",
      level: "Iniciante",
      progress: 0,
      duration: "35 min",
      icon: "🇯🇵",
      size: "6.2 MB",
      tier: "premium",
      rating: 5.0,
      reviews: 3400,
    },
    {
      id: 6,
      title: "Inglês Avançado - Business English",
      level: "Avançado",
      progress: 0,
      duration: "40 min",
      icon: "💼",
      size: "7.5 MB",
      tier: "premium",
      rating: 4.9,
      reviews: 1890,
    },
  ];

  // Detectar status de conexão
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success("Conexão restaurada!");
    };
    const handleOffline = () => {
      setIsOnline(false);
      toast.warning("Você está offline");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Carregar lições baixadas do localStorage
    const saved = localStorage.getItem("downloadedLessons");
    if (saved) {
      setDownloadedLessons(JSON.parse(saved));
    }

    // Simular usuário logado (em produção, verificar com Supabase)
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      const tier = localStorage.getItem("userTier") as any || "free";
      setUserTier(tier);
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleDownloadLesson = async (lessonId: number) => {
    if (!isLoggedIn) {
      toast.error("Faça login para baixar aulas");
      setIsAuthModalOpen(true);
      return;
    }

    setDownloadingLessons((prev) => [...prev, lessonId]);

    // Simular download
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newDownloaded = [...downloadedLessons, lessonId];
    setDownloadedLessons(newDownloaded);
    localStorage.setItem("downloadedLessons", JSON.stringify(newDownloaded));
    setDownloadingLessons((prev) => prev.filter((id) => id !== lessonId));
    toast.success("Aula baixada com sucesso!");
  };

  const handleRemoveDownload = (lessonId: number) => {
    const newDownloaded = downloadedLessons.filter((id) => id !== lessonId);
    setDownloadedLessons(newDownloaded);
    localStorage.setItem("downloadedLessons", JSON.stringify(newDownloaded));
    toast.success("Download removido");
  };

  const isLessonDownloaded = (lessonId: number) => downloadedLessons.includes(lessonId);
  const isLessonDownloading = (lessonId: number) => downloadingLessons.includes(lessonId);

  const canAccessLesson = (lessonTier: string) => {
    if (!isLoggedIn) return false;
    
    const tierHierarchy = { free: 0, basic: 1, premium: 2, enterprise: 3 };
    return tierHierarchy[userTier] >= tierHierarchy[lessonTier as keyof typeof tierHierarchy];
  };

  const handleTranslate = async () => {
    if (!translationText.trim()) return;
    
    if (!isLoggedIn) {
      toast.error("Faça login para usar o tradutor");
      setIsAuthModalOpen(true);
      return;
    }
    
    setIsTranslating(true);
    // Simulação de tradução
    setTimeout(() => {
      setTranslatedText(`[Tradução simulada de ${languages.find(l => l.code === sourceLang)?.name} para ${languages.find(l => l.code === targetLang)?.name}]: ${translationText}`);
      setIsTranslating(false);
    }, 1000);
  };

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setTranslationText(translatedText);
    setTranslatedText(translationText);
  };

  const handleOpenReview = (lessonId: number, lessonTitle: string) => {
    if (!isLoggedIn) {
      toast.error("Faça login para avaliar aulas");
      setIsAuthModalOpen(true);
      return;
    }
    setReviewModalData({ open: true, lessonId, lessonTitle });
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userTier", "premium"); // 7 dias grátis do premium
    setUserTier("premium");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userTier");
    setUserTier("free");
    toast.success("Logout realizado com sucesso");
  };

  const getTierBadge = (tier: string) => {
    const badges = {
      free: { label: "Grátis", color: "bg-gray-500" },
      basic: { label: "Básico", color: "bg-blue-500" },
      premium: { label: "Premium", color: "bg-purple-500" },
      enterprise: { label: "Empresarial", color: "bg-orange-500" },
    };
    return badges[tier as keyof typeof badges] || badges.free;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl">
                <Languages className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  LinguaLearn
                </h1>
                <p className="text-xs text-gray-600">Aprenda idiomas de forma inteligente</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Status de Conexão */}
              <Badge 
                variant={isOnline ? "default" : "secondary"}
                className={`flex items-center gap-1 ${isOnline ? "bg-green-500" : "bg-gray-500"}`}
              >
                {isOnline ? (
                  <>
                    <Wifi className="w-3 h-3" />
                    Online
                  </>
                ) : (
                  <>
                    <WifiOff className="w-3 h-3" />
                    Offline
                  </>
                )}
              </Badge>

              {/* Notificações */}
              {isLoggedIn && <NotificationCenter />}

              {/* Botão de Conta */}
              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <Badge className={getTierBadge(userTier).color}>
                    {getTierBadge(userTier).label}
                  </Badge>
                  <Button 
                    variant="outline"
                    onClick={handleLogout}
                    className="gap-2"
                  >
                    <User className="w-4 h-4" />
                    Sair
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Entrar / Cadastrar
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Offline Banner */}
      {!isOnline && (
        <div className="bg-yellow-50 border-b border-yellow-200">
          <div className="container mx-auto px-4 py-3">
            <p className="text-sm text-yellow-800 text-center">
              🔒 Você está offline. Apenas conteúdos baixados estão disponíveis.
            </p>
          </div>
        </div>
      )}

      {/* Trial Banner */}
      {isLoggedIn && userTier === "premium" && (
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <div className="container mx-auto px-4 py-3">
            <p className="text-sm text-center">
              🎉 Você está no período de teste grátis do Premium! Aproveite todos os recursos por 7 dias.
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
            <TabsTrigger value="lessons" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Aulas</span>
            </TabsTrigger>
            <TabsTrigger value="translator" className="flex items-center gap-2">
              <Languages className="w-4 h-4" />
              <span className="hidden sm:inline">Tradutor</span>
            </TabsTrigger>
            <TabsTrigger value="practice" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Prática</span>
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2" disabled={!isLoggedIn}>
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
          </TabsList>

          {/* Lessons Tab */}
          <TabsContent value="lessons" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Suas Aulas de Idiomas
              </h2>
              <p className="text-gray-600">
                Continue de onde parou e alcance seus objetivos
              </p>
              {downloadedLessons.length > 0 && (
                <Badge className="mt-2 bg-green-500">
                  {downloadedLessons.length} {downloadedLessons.length === 1 ? "aula baixada" : "aulas baixadas"}
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lessons.map((lesson) => {
                const isDownloaded = isLessonDownloaded(lesson.id);
                const isDownloading = isLessonDownloading(lesson.id);
                const canAccess = (isOnline && canAccessLesson(lesson.tier)) || isDownloaded;
                const tierBadge = getTierBadge(lesson.tier);

                return (
                  <Card 
                    key={lesson.id} 
                    className={`p-6 hover:shadow-xl transition-all duration-300 border-2 ${
                      isDownloaded ? "border-green-200 bg-green-50/30" : "hover:border-blue-200"
                    } ${!canAccess ? "opacity-50" : ""}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{lesson.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2 flex-wrap">
                              {lesson.title}
                              {isDownloaded && (
                                <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                                  <Check className="w-3 h-3 mr-1" />
                                  Offline
                                </Badge>
                              )}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <p className="text-sm text-gray-600">{lesson.level}</p>
                              <Badge className={`${tierBadge.color} text-xs`}>
                                {tierBadge.label}
                              </Badge>
                            </div>
                          </div>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            {lesson.duration}
                          </span>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{lesson.rating}</span>
                          </div>
                          <span className="text-xs text-gray-500">
                            ({lesson.reviews} avaliações)
                          </span>
                        </div>
                        
                        <div className="space-y-2 mt-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Progresso</span>
                            <span className="font-semibold text-blue-600">
                              {lesson.progress}%
                            </span>
                          </div>
                          <Progress value={lesson.progress} className="h-2" />
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button 
                            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                            disabled={!canAccess}
                            onClick={() => {
                              if (!isLoggedIn) {
                                setIsAuthModalOpen(true);
                              } else if (!canAccessLesson(lesson.tier)) {
                                setIsPricingModalOpen(true);
                              }
                            }}
                          >
                            {!isLoggedIn ? "Faça Login" : !canAccessLesson(lesson.tier) ? "Assinar" : canAccess ? "Continuar Aula" : "Indisponível Offline"}
                          </Button>
                          
                          {canAccessLesson(lesson.tier) && (
                            <>
                              {isDownloaded ? (
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => handleRemoveDownload(lesson.id)}
                                  className="shrink-0 border-green-300 text-green-700 hover:bg-green-50"
                                >
                                  <Check className="w-4 h-4" />
                                </Button>
                              ) : (
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => handleDownloadLesson(lesson.id)}
                                  disabled={isDownloading || !isOnline}
                                  className="shrink-0"
                                >
                                  <Download className={`w-4 h-4 ${isDownloading ? "animate-bounce" : ""}`} />
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleOpenReview(lesson.id, lesson.title)}
                                className="shrink-0"
                              >
                                <Star className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>

                        {isDownloaded && (
                          <p className="text-xs text-green-600 mt-2">
                            ✓ Disponível offline • {lesson.size}
                          </p>
                        )}
                        {isDownloading && (
                          <p className="text-xs text-blue-600 mt-2 animate-pulse">
                            ⬇ Baixando... • {lesson.size}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <Card className="p-8 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">
                    Desbloqueie Aulas Premium
                  </h3>
                  <p className="text-blue-100 mb-4">
                    Acesse mais de 200 aulas exclusivas, IA de pronúncia personalizada e muito mais
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-white/20 text-white">7 dias grátis</Badge>
                    <Badge className="bg-white/20 text-white">Cancele quando quiser</Badge>
                    <Badge className="bg-white/20 text-white">Garantia de 30 dias</Badge>
                  </div>
                </div>
                <Button 
                  size="lg"
                  onClick={() => setIsPricingModalOpen(true)}
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  Ver Planos
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Translator Tab */}
          <TabsContent value="translator" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Tradutor em Tempo Real
              </h2>
              <p className="text-gray-600">
                Traduza textos instantaneamente entre 30 idiomas diferentes
              </p>
              {!isOnline && (
                <Badge variant="secondary" className="mt-2">
                  Requer conexão com internet
                </Badge>
              )}
            </div>

            <Card className="p-6 max-w-4xl mx-auto">
              <div className="space-y-6">
                {/* Language Selection */}
                <div className="flex items-center gap-4">
                  <Select value={sourceLang} onValueChange={setSourceLang} disabled={!isOnline || !isLoggedIn}>
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          <span className="flex items-center gap-2">
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={swapLanguages}
                    className="shrink-0"
                    disabled={!isOnline || !isLoggedIn}
                  >
                    <ArrowRightLeft className="w-4 h-4" />
                  </Button>

                  <Select value={targetLang} onValueChange={setTargetLang} disabled={!isOnline || !isLoggedIn}>
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          <span className="flex items-center gap-2">
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Translation Input */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Texto Original
                    </label>
                    <Textarea
                      placeholder={isLoggedIn ? "Digite o texto para traduzir..." : "Faça login para usar o tradutor"}
                      value={translationText}
                      onChange={(e) => setTranslationText(e.target.value)}
                      className="min-h-[200px] resize-none"
                      disabled={!isOnline || !isLoggedIn}
                    />
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2" disabled={!isOnline || !isLoggedIn}>
                        <Mic className="w-4 h-4" />
                        Falar
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2" disabled={!isOnline || !isLoggedIn}>
                        <Volume2 className="w-4 h-4" />
                        Ouvir
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Tradução
                    </label>
                    <Textarea
                      placeholder="A tradução aparecerá aqui..."
                      value={translatedText}
                      readOnly
                      className="min-h-[200px] resize-none bg-gray-50"
                    />
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2" disabled={!isOnline || !isLoggedIn}>
                        <Volume2 className="w-4 h-4" />
                        Ouvir
                      </Button>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleTranslate}
                  disabled={isTranslating || !translationText.trim() || !isOnline || !isLoggedIn}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  size="lg"
                >
                  {!isLoggedIn ? "Faça Login para Traduzir" : !isOnline ? "Requer Conexão" : isTranslating ? "Traduzindo..." : "Traduzir"}
                </Button>
              </div>
            </Card>

            {/* Language Grid Display */}
            <Card className="p-6 max-w-4xl mx-auto">
              <h3 className="text-xl font-bold mb-4 text-center">
                Idiomas Disponíveis ({languages.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-200 border border-blue-100"
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="text-sm font-medium text-gray-700">
                      {lang.name}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Practice Tab */}
          <TabsContent value="practice" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Prática de Conversação
              </h2>
              <p className="text-gray-600">
                Pratique suas habilidades com exercícios interativos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-green-200">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Diálogos</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Pratique conversações do dia a dia
                </p>
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600" 
                  disabled={!isOnline || !isLoggedIn}
                  onClick={() => !isLoggedIn && setIsAuthModalOpen(true)}
                >
                  {!isLoggedIn ? "Faça Login" : isOnline ? "Começar" : "Requer Conexão"}
                </Button>
              </Card>

              <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-200">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mic className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Pronúncia</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Melhore sua pronúncia com IA
                </p>
                <Button 
                  className="w-full bg-orange-500 hover:bg-orange-600" 
                  disabled={!isOnline || !isLoggedIn}
                  onClick={() => !isLoggedIn && setIsAuthModalOpen(true)}
                >
                  {!isLoggedIn ? "Faça Login" : isOnline ? "Praticar" : "Requer Conexão"}
                </Button>
              </Card>

              <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Vocabulário</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Expanda seu vocabulário
                </p>
                <Button 
                  className="w-full bg-purple-500 hover:bg-purple-600" 
                  disabled={!isOnline || !isLoggedIn}
                  onClick={() => !isLoggedIn && setIsAuthModalOpen(true)}
                >
                  {!isLoggedIn ? "Faça Login" : isOnline ? "Estudar" : "Requer Conexão"}
                </Button>
              </Card>
            </div>

            {isLoggedIn && (
              <Card className="p-8 max-w-3xl mx-auto">
                <h3 className="text-xl font-bold mb-4">Seu Progresso Semanal</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Tempo de Estudo</span>
                      <span className="font-semibold">12h 30min / 15h</span>
                    </div>
                    <Progress value={83} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Exercícios Completos</span>
                      <span className="font-semibold">45 / 50</span>
                    </div>
                    <Progress value={90} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Sequência de Dias</span>
                      <span className="font-semibold">7 dias 🔥</span>
                    </div>
                    <Progress value={100} className="h-3" />
                  </div>
                </div>
              </Card>
            )}
          </TabsContent>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Seu Dashboard de Aprendizado
              </h2>
              <p className="text-gray-600">
                Acompanhe seu progresso e conquistas
              </p>
            </div>

            {isLoggedIn ? (
              <UserDashboard />
            ) : (
              <Card className="p-12 text-center max-w-2xl mx-auto">
                <User className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-bold mb-2">Faça login para ver seu dashboard</h3>
                <p className="text-gray-600 mb-6">
                  Acompanhe seu progresso, conquistas e estatísticas detalhadas
                </p>
                <Button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Entrar / Cadastrar
                </Button>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600 text-sm">
            <p>© 2024 LinguaLearn - Aprenda idiomas de forma inteligente</p>
            <p className="mt-2">Desenvolvido com ❤️ para estudantes de idiomas</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal 
        open={isAuthModalOpen} 
        onOpenChange={setIsAuthModalOpen}
        onSuccess={handleAuthSuccess}
      />
      <PricingModal 
        open={isPricingModalOpen} 
        onOpenChange={setIsPricingModalOpen}
      />
      <ReviewModal
        open={reviewModalData.open}
        onOpenChange={(open) => setReviewModalData({ ...reviewModalData, open })}
        lessonId={reviewModalData.lessonId}
        lessonTitle={reviewModalData.lessonTitle}
      />
    </div>
  );
}
