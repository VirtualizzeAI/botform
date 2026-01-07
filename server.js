import express from 'express'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { runScript } from './script.js'
import { config } from './src/config/index.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = config.server.port

const supabase = createClient(config.supabase.url, config.supabase.anonKey)

// Servir arquivos estáticos ANTES do middleware de autenticação
app.use(express.static(path.join(__dirname, 'src/public')))
app.use(express.json())

// Endpoint para obter configuração do Supabase de forma segura
app.get('/api/config', (req, res) => {
    res.json({
        supabaseUrl: config.supabase.url,
        supabaseAnonKey: config.supabase.anonKey
    })
})

// Middleware para verificar autenticação - exclui rotas públicas
app.use(async (req, res, next) => {
    // Permitir rotas públicas
    if (req.path === '/login' || req.path.startsWith('/public/')) {
        return next()
    }
    
    // Permitir GET para arquivos estáticos da raiz
    if (req.method === 'GET' && (req.path === '/login.html' || req.path === '/app.js')) {
        return next()
    }
    
    // Para rotas protegidas, verificar token
    if (req.path === '/run-script') {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            return res.status(401).json({ error: 'Token não fornecido' })
        }
        const { data: { user }, error } = await supabase.auth.getUser(token)
        if (error || !user) {
            return res.status(401).json({ error: 'Token inválido' })
        }
        req.user = user
    }
    
    next()
})

// Rota para login
app.post('/login', async (req, res) => {
    const { email, password } = req.body
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
        return res.status(400).json({ error: error.message })
    }
    res.json({ token: data.session.access_token })
})

// Rota para executar o script
app.post('/run-script', async (req, res) => {
    const { times } = req.body
    if (!times || times < 1) {
        return res.status(400).json({ error: 'Número de vezes inválido' })
    }

    try {
        for (let i = 0; i < times; i++) {
            console.log(`Executando script ${i + 1}/${times}`)
            await runScript()
        }
        res.json({ message: `Script executado ${times} vez(es) com sucesso` })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.listen(port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${port}`)
    console.log(`Environment: ${config.server.env}`)
})