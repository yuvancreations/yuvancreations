import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const restoreGithubPagesRedirect = () => {
    const params = new URLSearchParams(window.location.search)
    const redirect = params.get('redirect')
    if (!redirect) return

    try {
        const decoded = decodeURIComponent(redirect)
        if (!decoded.startsWith('/')) return
        window.history.replaceState({}, document.title, decoded)
    } catch {
        // Ignore malformed redirect query value.
    }
}

restoreGithubPagesRedirect()

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
