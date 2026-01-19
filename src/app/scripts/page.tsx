'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { Plus, Edit2, Trash2, Play, AlertCircle } from 'lucide-react'

interface Script {
  id: string
  name: string
  description: string
  code: string
  status: 'active' | 'inactive'
  createdAt: string
  lastRun?: string
}

export default function ScriptsPage() {
  const [scripts, setScripts] = useState<Script[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedScript, setSelectedScript] = useState<Script | null>(null)
  const [showForm, setShowForm] = useState(false)
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
    const loadScripts = async () => {
      if (!supabase) return
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          router.push('/auth/login')
          return
        }

        // Mock data
        setScripts([
          {
            id: '1',
            name: 'Web Scraper',
            description: 'Coleta dados de sites',
            code: 'const data = await page.evaluate(() => document.body.innerHTML)',
            status: 'active',
            createdAt: '2024-01-15',
            lastRun: '2 horas atrás',
          },
          {
            id: '2',
            name: 'Form Filler',
            description: 'Preenche formulários automaticamente',
            code: 'await page.fill("#email", "test@example.com")',
            status: 'active',
            createdAt: '2024-01-10',
            lastRun: '5 minutos atrás',
          },
        ])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadScripts()
  }, [supabase])

  const handleDelete = (id: string) => {
    if (confirm('Deseja realmente deletar este script?')) {
      setScripts(scripts.filter(s => s.id !== id))
    }
  }

  const handleExecute = (script: Script) => {
    alert(`Executando: ${script.name}`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Scripts</h1>
          <p className="text-gray-600 mt-1">Gerencie seus scripts Playwright</p>
        </div>
        <button
          onClick={() => {
            setSelectedScript(null)
            setShowForm(!showForm)
          }}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition font-medium shadow-md flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Novo Script</span>
        </button>
      </div>

      {/* Form Section */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fadeIn">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {selectedScript ? 'Editar Script' : 'Criar Novo Script'}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setShowForm(false)
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
              <input
                type="text"
                placeholder="Nome do script"
                defaultValue={selectedScript?.name || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
              <input
                type="text"
                placeholder="Descrição do script"
                defaultValue={selectedScript?.description || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Código</label>
              <textarea
                placeholder="Cole o código do seu script"
                defaultValue={selectedScript?.code || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none font-mono text-sm"
                rows={10}
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 rounded-lg transition"
              >
                {selectedScript ? 'Atualizar' : 'Criar'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded-lg transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Scripts List */}
      <div className="space-y-4">
        {scripts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Nenhum script criado ainda</p>
            <p className="text-gray-500 text-sm mt-1">Crie seu primeiro script clicando no botão acima</p>
          </div>
        ) : (
          scripts.map((script) => (
            <div
              key={script.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{script.name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        script.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {script.status === 'active' ? '● Ativo' : '● Inativo'}
                    </span>
                  </div>
                  <p className="text-gray-600">{script.description}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Criado em: {new Date(script.createdAt).toLocaleDateString('pt-BR')}
                    {script.lastRun && ` • Última execução: ${script.lastRun}`}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-100">
                <p className="text-xs font-medium text-gray-600 mb-2">Código:</p>
                <pre className="text-xs text-gray-700 overflow-x-auto font-mono">
                  {script.code.substring(0, 100)}...
                </pre>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleExecute(script)}
                  className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition text-sm font-medium"
                >
                  <Play className="w-4 h-4" />
                  <span>Executar</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedScript(script)
                    setShowForm(true)
                  }}
                  className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition text-sm font-medium"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Editar</span>
                </button>
                <button
                  onClick={() => handleDelete(script.id)}
                  className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition text-sm font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Deletar</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
