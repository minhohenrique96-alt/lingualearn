"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, Clock, TrendingUp, Award, Calendar } from "lucide-react";

export function UserDashboard() {
  const stats = [
    {
      label: "Aulas Completas",
      value: "45",
      total: "200",
      percentage: 22.5,
      icon: Trophy,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      label: "Tempo de Estudo",
      value: "32h",
      total: "50h",
      percentage: 64,
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "Sequência",
      value: "7",
      total: "dias",
      percentage: 100,
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      label: "Nível Atual",
      value: "B1",
      total: "Intermediário",
      percentage: 45,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const achievements = [
    { name: "Primeira Aula", icon: "🎯", unlocked: true },
    { name: "7 Dias Seguidos", icon: "🔥", unlocked: true },
    { name: "10 Aulas Completas", icon: "⭐", unlocked: true },
    { name: "Mestre da Pronúncia", icon: "🎤", unlocked: false },
    { name: "Poliglota", icon: "🌍", unlocked: false },
    { name: "100 Horas", icon: "⏰", unlocked: false },
  ];

  const recentActivity = [
    { lesson: "Inglês Básico - Saudações", date: "Hoje, 14:30", progress: 100 },
    { lesson: "Espanhol - Números", date: "Hoje, 10:15", progress: 75 },
    { lesson: "Francês - Conversação", date: "Ontem, 16:45", progress: 60 },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-6">
              <div className="flex items-center gap-4">
                <div className={`${stat.bgColor} p-3 rounded-xl`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold">{stat.value}</span>
                    <span className="text-sm text-gray-500">/ {stat.total}</span>
                  </div>
                  <Progress value={stat.percentage} className="h-2 mt-2" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Achievements */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-yellow-600" />
          <h3 className="text-lg font-bold">Conquistas</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.name}
              className={`text-center p-4 rounded-lg border-2 transition-all ${
                achievement.unlocked
                  ? "border-yellow-300 bg-yellow-50"
                  : "border-gray-200 bg-gray-50 opacity-50"
              }`}
            >
              <div className="text-4xl mb-2">{achievement.icon}</div>
              <p className="text-xs font-medium">{achievement.name}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold">Atividade Recente</h3>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-1">
                <p className="font-medium text-sm">{activity.lesson}</p>
                <p className="text-xs text-gray-500">{activity.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={activity.progress} className="w-24 h-2" />
                <span className="text-sm font-medium text-gray-600 w-12">
                  {activity.progress}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
