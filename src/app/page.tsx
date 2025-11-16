"use client";

import { useState } from "react";
import { Languages, BookOpen, MessageSquare, Mic, Volume2, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

export default function Home() {
  const [activeTab, setActiveTab] = useState("lessons");
  const [translationText, setTranslationText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("pt");
  const [targetLang, setTargetLang] = useState("en");
  const [isTranslating, setIsTranslating] = useState(false);

  const languages = [
    { code: "pt", name: "Português" },
    { code: "en", name: "Inglês" },
    { code: "es", name: "Espanhol" },
    { code: "fr", name: "Francês" },
    { code: "de", name: "Alemão" },
    { code: "it", name: "Italiano" },
    { code: "ja", name: "Japonês" },
    { code: "ko", name: "Coreano" },
    { code: "zh", name: "Chinês" },
  ];

  const lessons = [
    {
      id: 1,
      title: "Inglês Básico - Saudações",
      level: "Iniciante",
      progress: 75,
      duration: "15 min",
      icon: "👋",
    },
    {
      id: 2,
      title: "Espanhol - Números e Cores",
      level: "Iniciante",
      progress: 45,
      duration: "20 min",
      icon: "🔢",
    },
    {
      id: 3,
      title: "Francês - Conversação Básica",
      level: "Intermediário",
      progress: 30,
      duration: "25 min",
      icon: "💬",
    },
    {
      id: 4,
      title: "Alemão - Gramática Essencial",
      level: "Intermediário",
      progress: 60,
      duration: "30 min",
      icon: "📚",
    },
  ];

  const handleTranslate = async () => {
    if (!translationText.trim()) return;
    
    setIsTranslating(true);
    // Simulação de tradução (em produção, usar API real)
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
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              Minha Conta
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {lessons.map((lesson) => (
                <Card key={lesson.id} className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{lesson.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">
                            {lesson.title}
                          </h3>
                          <p className="text-sm text-gray-600">{lesson.level}</p>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          {lesson.duration}
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

                      <Button 
                        className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      >
                        Continuar Aula
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-8 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">
                    Desbloqueie Aulas Premium
                  </h3>
                  <p className="text-blue-100">
                    Acesse mais de 100 aulas exclusivas e recursos avançados
                  </p>
                </div>
                <Button 
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  Assinar Agora
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
                Traduza textos instantaneamente entre diversos idiomas
              </p>
            </div>

            <Card className="p-6 max-w-4xl mx-auto">
              <div className="space-y-6">
                {/* Language Selection */}
                <div className="flex items-center gap-4">
                  <Select value={sourceLang} onValueChange={setSourceLang}>
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={swapLanguages}
                    className="shrink-0"
                  >
                    <ArrowRightLeft className="w-4 h-4" />
                  </Button>

                  <Select value={targetLang} onValueChange={setTargetLang}>
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
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
                      placeholder="Digite o texto para traduzir..."
                      value={translationText}
                      onChange={(e) => setTranslationText(e.target.value)}
                      className="min-h-[200px] resize-none"
                    />
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Mic className="w-4 h-4" />
                        Falar
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
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
                      <Button variant="outline" size="sm" className="gap-2">
                        <Volume2 className="w-4 h-4" />
                        Ouvir
                      </Button>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleTranslate}
                  disabled={isTranslating || !translationText.trim()}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  size="lg"
                >
                  {isTranslating ? "Traduzindo..." : "Traduzir"}
                </Button>
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
                <Button className="w-full bg-green-500 hover:bg-green-600">
                  Começar
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
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  Praticar
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
                <Button className="w-full bg-purple-500 hover:bg-purple-600">
                  Estudar
                </Button>
              </Card>
            </div>

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
    </div>
  );
}
