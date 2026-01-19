'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { Zap, TrendingUp, Code2, Shield } from 'lucide-react'

interface Script {
  id: string
  name: string
  description: string
  status: 'active' | 'inactive'
  lastRun?: string
}

export default function DashboardPage() {
  const [scripts, setScripts] = useState<Script[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalRuns: 0,
    activeScripts: 0,
    successRate: 0,
  })
  const [supabase, setSupabase] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    setSupabase(client)
  }, [])

  useEffect(() => {
    const loadData = async () => {
      if (!supabase) return
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          router.push('/auth/login')
          return
        }

        // Mock data - você pode substituir por dados reais do Supabase
        setScripts([
          {
            id: '1',
            name: 'Script de Coleta',
            description: 'Coleta dados de múltiplas fontes',
            status: 'active',
            lastRun: '2 horas atrás',
          },
          {
            id: '2',
            name: 'Script de Processamento',
            description: 'Processa informações em lote',
            status: 'active',
            lastRun: '5 minutos atrás',
          },
          {
            id: '3',
            name: 'Script de Sincronização',
            description: 'Sincroniza dados com API externa',
            status: 'inactive',
            lastRun: '1 dia atrás',
          },
        ])

        setStats({
          totalRuns: 1250,
          activeScripts: 2,
          successRate: 98.5,
        })
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [supabase])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Total Runs */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-sm border border-blue-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium mb-1">Execuções Totais</p>
              <p className="text-3xl font-bold text-blue-900">{stats.totalRuns.toLocaleString()}</p>
              <p className="text-blue-600 text-xs mt-2">↑ 12% este mês</p>
            </div>
            <div className="bg-blue-600 rounded-lg p-3">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Card 2: Active Scripts */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 shadow-sm border border-green-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium mb-1">Scripts Ativos</p>
              <p className="text-3xl font-bold text-green-900">{stats.activeScripts}</p>
              <p className="text-green-600 text-xs mt-2">Prontos para usar</p>
            </div>
            <div className="bg-green-600 rounded-lg p-3">
              <Code2 className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Card 3: Success Rate */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 shadow-sm border border-purple-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium mb-1">Taxa de Sucesso</p>
              <p className="text-3xl font-bold text-purple-900">{stats.successRate}%</p>
              <p className="text-purple-600 text-xs mt-2">Confiabilidade excelente</p>
            </div>
            <div className="bg-purple-600 rounded-lg p-3">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Scripts Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Seus Scripts</h2>
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition font-medium shadow-md">
            + Novo Script
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {scripts.map((script) => (
            <div
              key={script.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{script.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{script.description}</p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    script.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {script.status === 'active' ? '● Ativo' : '● Inativo'}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">Última execução: {script.lastRun}</p>
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-medium rounded transition">
                    Executar
                  </button>
                  <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded transition">
                    Editar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Atividade Recente</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Script executado com sucesso</p>
                <p className="text-xs text-gray-500">há {i} horas</p>
              </div>
              <Zap className="w-4 h-4 text-green-600" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
