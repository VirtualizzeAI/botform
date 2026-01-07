import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Obter credenciais do servidor para evitar exposição no browser
async function getSupabaseConfig() {
    const response = await fetch('/api/config')
    return response.json()
}

let supabase

// Inicializar Supabase
async function initSupabase() {
    const config = await getSupabaseConfig()
    supabase = createClient(config.supabaseUrl, config.supabaseAnonKey)
}

async function handleLogin(event) {
    event.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const errorEl = document.getElementById('error')
    const submitBtn = document.getElementById('submitBtn')

    submitBtn.disabled = true
    submitBtn.textContent = 'Entrando...'

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            errorEl.classList.add('show')
            errorEl.textContent = error.message
        } else {
            localStorage.setItem('token', data.session.access_token)
            window.location.href = '/index.html'
        }
    } catch (err) {
        errorEl.classList.add('show')
        errorEl.textContent = 'Erro ao fazer login. Tente novamente.'
    } finally {
        submitBtn.disabled = false
        submitBtn.textContent = 'Entrar'
    }
}

async function logout() {
    localStorage.removeItem('token')
    await supabase.auth.signOut()
    window.location.href = '/login.html'
}

async function startScript() {
    const times = document.getElementById('times').value
    const statusEl = document.getElementById('status')
    const submitBtn = document.getElementById('submitBtn')
    const token = localStorage.getItem('token')

    if (!token) {
        statusEl.classList.add('show', 'error')
        statusEl.textContent = 'Erro: Não logado'
        return
    }

    if (!times || times < 1) {
        statusEl.classList.add('show', 'error')
        statusEl.textContent = 'Insira um número válido'
        return
    }

    statusEl.classList.remove('success', 'error')
    statusEl.classList.add('show', 'loading')
    statusEl.innerHTML = '<div class="spinner"></div> Executando script...'
    
    submitBtn.disabled = true
    document.getElementById('times').disabled = true

    try {
        const response = await fetch('/run-script', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ times: parseInt(times) })
        })

        const result = await response.json()
        
        if (response.ok) {
            statusEl.classList.remove('loading')
            statusEl.classList.add('success')
            statusEl.textContent = '✓ ' + result.message
            document.getElementById('executionCount').textContent = times
            document.getElementById('statusText').textContent = 'Sucesso'
        } else {
            statusEl.classList.remove('loading')
            statusEl.classList.add('error')
            statusEl.textContent = '✗ Erro: ' + result.error
        }
    } catch (error) {
        statusEl.classList.remove('loading')
        statusEl.classList.add('error')
        statusEl.textContent = '✗ Erro: ' + error.message
    } finally {
        submitBtn.disabled = false
        document.getElementById('times').disabled = false
    }
}

// Verificar autenticação na página de dashboard
async function checkAuth() {
    await initSupabase()
    
    const isLoginPage = window.location.pathname === '/login.html' || window.location.pathname === '/'
    const token = localStorage.getItem('token')

    // Se estiver na página de login e já tem token, redireciona para dashboard
    if (isLoginPage && token) {
        const { data, error } = await supabase.auth.getUser(token)
        if (!error && data.user) {
            window.location.href = '/index.html'
        } else {
            localStorage.removeItem('token')
        }
    }

    // Se estiver na dashboard e não tem token, redireciona para login
    if (!isLoginPage && !token) {
        window.location.href = '/login.html'
    }

    // Se tem token, verifica validade com Supabase
    if (token && !isLoginPage) {
        const { data, error } = await supabase.auth.getUser(token)
        if (error || !data.user) {
            localStorage.removeItem('token')
            window.location.href = '/login.html'
        }
    }
}

// Executar verificação quando a página carregar
checkAuth()

// Expor funções para o HTML
window.handleLogin = handleLogin
window.logout = logout
window.startScript = startScript