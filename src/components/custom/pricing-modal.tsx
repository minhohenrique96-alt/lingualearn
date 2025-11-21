"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Crown, Building2 } from "lucide-react";

interface PricingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const plans = [
  {
    name: "Básico",
    price: "R$ 29,90",
    period: "/mês",
    description: "Perfeito para começar sua jornada",
    icon: Sparkles,
    color: "from-blue-500 to-cyan-500",
    features: [
      "Acesso a 50+ aulas básicas",
      "Tradutor em tempo real",
      "Prática de conversação",
      "Modo offline (5 aulas)",
      "Suporte por email",
      "Certificado de conclusão",
    ],
    paymentLink: "https://pay.hotmart.com/seu-produto-basico",
  },
  {
    name: "Premium",
    price: "R$ 59,90",
    period: "/mês",
    description: "Mais popular entre nossos alunos",
    icon: Crown,
    color: "from-purple-500 to-pink-500",
    popular: true,
    features: [
      "Tudo do plano Básico",
      "Acesso a 200+ aulas avançadas",
      "IA de pronúncia personalizada",
      "Modo offline ilimitado",
      "Aulas ao vivo semanais",
      "Suporte prioritário 24/7",
      "Exercícios personalizados",
      "Análise de progresso detalhada",
    ],
    paymentLink: "https://pay.hotmart.com/seu-produto-premium",
  },
  {
    name: "Empresarial",
    price: "R$ 149,90",
    period: "/mês",
    description: "Para equipes e empresas",
    icon: Building2,
    color: "from-orange-500 to-red-500",
    features: [
      "Tudo do plano Premium",
      "Até 10 usuários inclusos",
      "Dashboard administrativo",
      "Relatórios de progresso da equipe",
      "Conteúdo customizado",
      "Gerente de conta dedicado",
      "Integração com LMS",
      "Treinamento personalizado",
    ],
    paymentLink: "https://pay.hotmart.com/seu-produto-empresarial",
  },
];

export function PricingModal({ open, onOpenChange }: PricingModalProps) {
  const handleSelectPlan = (paymentLink: string) => {
    window.open(paymentLink, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center">
            Escolha o Plano Ideal Para Você
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Todos os planos incluem 7 dias de teste grátis. Cancele quando quiser.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card
                key={plan.name}
                className={`relative p-6 ${
                  plan.popular
                    ? "border-2 border-purple-500 shadow-2xl scale-105"
                    : "border"
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500">
                    Mais Popular
                  </Badge>
                )}

                <div className="text-center mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSelectPlan(plan.paymentLink)}
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                  }`}
                  size="lg"
                >
                  Começar Agora
                </Button>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <h4 className="font-bold text-lg mb-2 text-center">
            🎁 Garantia de 30 Dias
          </h4>
          <p className="text-sm text-gray-700 text-center">
            Não está satisfeito? Devolvemos 100% do seu dinheiro, sem perguntas.
            Experimente sem riscos!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
