'use client'

import { useState } from 'react'

type AuthMethod = 'email' | 'phone' | 'sso'

interface HorecaLoginProps {
  onAuthenticated: (identity: string) => void
}

const ssoProviders = [
  'Van der Valk Hotels',
  'Marriott International',
  'Restaurant Group NL',
  'Bilderberg Hotels',
]

export function HorecaLogin({ onAuthenticated }: HorecaLoginProps) {
  const [method, setMethod] = useState<AuthMethod>('email')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [ssoProvider, setSsoProvider] = useState('')

  function handleSendCode(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (method === 'email' && !email.includes('@')) {
      setError('Voer een geldig e-mailadres in')
      return
    }
    if (method === 'phone' && phone.length < 8) {
      setError('Voer een geldig telefoonnummer in')
      return
    }

    setCodeSent(true)
  }

  function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (code === '123456') {
      const identity = method === 'email' ? email : phone
      onAuthenticated(identity)
    } else {
      setError('Ongeldige code. Probeer 123456')
    }
  }

  function handleSSO() {
    if (ssoProvider) {
      onAuthenticated(ssoProvider)
    }
  }

  const tabs: { key: AuthMethod; label: string }[] = [
    { key: 'email', label: 'E-mail' },
    { key: 'phone', label: 'Telefoon' },
    { key: 'sso', label: 'Groothandel SSO' },
  ]

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-burgundy-800 px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-burgundy-800 via-burgundy-800/95 to-charcoal-900/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,168,75,0.06)_0%,_transparent_60%)]" />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <p className="font-accent text-gold-400 italic text-lg mb-2">
            Spanish Terroir
          </p>
          <h1 className="font-heading text-2xl sm:text-3xl text-cream-50 mb-2">
            Horeca Portaal
          </h1>
          <p className="text-sm text-cream-200/70 font-body">
            Log in om uw wijnlijst te beheren en bij te bestellen
          </p>
        </div>

        <div className="bg-cream-50/5 backdrop-blur-sm border border-cream-50/15 rounded-2xl p-6 sm:p-8">
          {/* Auth method tabs */}
          <div className="flex gap-1 p-1 bg-charcoal-900/30 rounded-lg mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => {
                  setMethod(tab.key)
                  setCodeSent(false)
                  setCode('')
                  setError('')
                }}
                className={`flex-1 py-2 px-3 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 ${
                  method === tab.key
                    ? 'bg-gold-500 text-charcoal-900'
                    : 'text-cream-200 hover:text-cream-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Email / Phone flow */}
          {(method === 'email' || method === 'phone') && (
            <>
              {!codeSent ? (
                <form onSubmit={handleSendCode} className="space-y-4">
                  {method === 'email' ? (
                    <div>
                      <label htmlFor="login-email" className="block text-sm text-cream-200 mb-1.5 font-body">
                        E-mailadres
                      </label>
                      <input
                        id="login-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="naam@restaurant.nl"
                        className="w-full px-4 py-3 rounded-lg bg-cream-50/5 border border-cream-50/20 text-cream-50 placeholder:text-cream-200/30 focus:outline-none focus:border-gold-400 transition-colors duration-200 font-body"
                        autoFocus
                      />
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="login-phone" className="block text-sm text-cream-200 mb-1.5 font-body">
                        Telefoonnummer
                      </label>
                      <input
                        id="login-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+31 6 1234 5678"
                        className="w-full px-4 py-3 rounded-lg bg-cream-50/5 border border-cream-50/20 text-cream-50 placeholder:text-cream-200/30 focus:outline-none focus:border-gold-400 transition-colors duration-200 font-body"
                        autoFocus
                      />
                    </div>
                  )}

                  {error && (
                    <p className="text-terracotta-500 text-sm font-body">{error}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 bg-gold-500 text-charcoal-900 font-semibold rounded-lg hover:bg-gold-400 transition-colors duration-200"
                  >
                    Verstuur code
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyCode} className="space-y-4">
                  <p className="text-sm text-cream-200 font-body">
                    We hebben een 6-cijferige code gestuurd naar{' '}
                    <span className="text-gold-400 font-medium">
                      {method === 'email' ? email : phone}
                    </span>
                  </p>

                  <div>
                    <label htmlFor="login-code" className="block text-sm text-cream-200 mb-1.5 font-body">
                      Verificatiecode
                    </label>
                    <input
                      id="login-code"
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="123456"
                      className="w-full px-4 py-3 rounded-lg bg-cream-50/5 border border-cream-50/20 text-cream-50 text-center text-2xl tracking-[0.5em] placeholder:text-cream-200/30 focus:outline-none focus:border-gold-400 transition-colors duration-200 font-body"
                      autoFocus
                    />
                  </div>

                  {error && (
                    <p className="text-terracotta-500 text-sm font-body">{error}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 bg-gold-500 text-charcoal-900 font-semibold rounded-lg hover:bg-gold-400 transition-colors duration-200"
                  >
                    Inloggen
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCodeSent(false)
                      setCode('')
                      setError('')
                    }}
                    className="w-full text-sm text-cream-200/60 hover:text-cream-200 transition-colors duration-200 font-body"
                  >
                    Andere gegevens gebruiken
                  </button>
                </form>
              )}
            </>
          )}

          {/* SSO flow */}
          {method === 'sso' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="sso-provider" className="block text-sm text-cream-200 mb-1.5 font-body">
                  Selecteer uw organisatie
                </label>
                <select
                  id="sso-provider"
                  value={ssoProvider}
                  onChange={(e) => setSsoProvider(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-cream-50/5 border border-cream-50/20 text-cream-50 focus:outline-none focus:border-gold-400 transition-colors duration-200 font-body"
                >
                  <option value="" className="bg-charcoal-900 text-cream-50">Kies een organisatie...</option>
                  {ssoProviders.map((provider) => (
                    <option key={provider} value={provider} className="bg-charcoal-900 text-cream-50">
                      {provider}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={handleSSO}
                disabled={!ssoProvider}
                className="w-full py-3 bg-gold-500 text-charcoal-900 font-semibold rounded-lg hover:bg-gold-400 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Inloggen via SSO
              </button>

              <p className="text-xs text-cream-200/40 text-center font-body">
                U wordt doorgestuurd naar het inlogportaal van uw organisatie
              </p>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-cream-200/40 mt-6 font-body">
          Prototype — elke code &ldquo;123456&rdquo; wordt geaccepteerd
        </p>
      </div>
    </div>
  )
}
