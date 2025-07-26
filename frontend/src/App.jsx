import { useState } from 'react'

function App() {
  const [copiedCommand, setCopiedCommand] = useState('')

  const copyToClipboard = async (text, commandName) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCommand(commandName)
      setTimeout(() => setCopiedCommand(''), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const TerminalBox = ({ command, commandName, children }) => (
    <div className="relative bg-gray-900 rounded-lg p-4 font-mono text-sm">
      <button
        onClick={() => copyToClipboard(command, commandName)}
        className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors duration-200"
      >
        {copiedCommand === commandName ? (
          <span className="text-green-400">✓</span>
        ) : (
          <span>📋</span>
        )}
      </button>
      <div className="text-green-400 mb-2">$ {children}</div>
      <div className="text-gray-300">{command}</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">Vindex</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">How It Works</a>
              <a href="#why-vindex" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Why Vindex</a>
              <a href="#get-started" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Get Started</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <pre className="text-6xl md:text-8xl font-mono text-gray-800 leading-none">
{`╔══════════════════════════════════════════════════════════════╗
║  ██╗   ██╗██╗███╗   ██╗██████╗ ███████╗██╗  ██╗            ║
║  ██║   ██║██║████╗  ██║██╔══██╗██╔════╝██║ ██╔╝            ║
║  ██║   ██║██║██╔██╗ ██║██║  ██║█████╗  █████╔╝             ║
║  ╚██╗ ██╔╝██║██║╚██╗██║██║  ██║██╔══╝  ██╔═██╗             ║
║   ╚████╔╝ ██║██║ ╚████║██████╔╝███████╗██║  ██╗            ║
║    ╚═══╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝            ║
╚══════════════════════════════════════════════════════════════╝`}
            </pre>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Let Your Machine Pick Your Best Idea
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Vindex is a CLI tool that helps developers organize and prioritize their project ideas using intelligent analysis.
          </p>
          <a
            href="#get-started"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Get Started
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            How It Works
          </h2>
          
          <div className="space-y-16">
            {/* Step 1 */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4">1</span>
                  <h3 className="text-2xl font-bold text-gray-900">Organize Your Projects</h3>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Create a simple JSON file with your project ideas. Include descriptions, technologies, and any relevant details that matter to you.
                </p>
              </div>
              <div className="flex-1 w-full">
                <TerminalBox command="vindex init" commandName="init">
                  vindex init
                </TerminalBox>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4">2</span>
                  <h3 className="text-2xl font-bold text-gray-900">Analyze & Rank</h3>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Vindex analyzes your projects using intelligent algorithms to rank them based on feasibility, impact, and your preferences.
                </p>
              </div>
              <div className="flex-1 w-full">
                <TerminalBox command="vindex analyze" commandName="analyze">
                  vindex analyze
                </TerminalBox>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4">3</span>
                  <h3 className="text-2xl font-bold text-gray-900">Get Your Next Best Idea</h3>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Receive a prioritized list of your projects with detailed insights and recommendations to help you make informed decisions.
                </p>
              </div>
              <div className="flex-1 w-full">
                <TerminalBox command="vindex recommend" commandName="recommend">
                  vindex recommend
                </TerminalBox>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Vindex Section */}
      <section id="why-vindex" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            Why Vindex?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Analysis</h3>
              <p className="text-gray-600">
                Uses advanced algorithms to evaluate project feasibility, market potential, and alignment with your skills.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Save Time</h3>
              <p className="text-gray-600">
                Stop spending hours deciding what to build next. Get instant, data-driven recommendations for your best projects.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Developer Focused</h3>
              <p className="text-gray-600">
                Built by developers, for developers. Simple CLI interface that fits seamlessly into your workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="get-started" className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Find Your Next Best Idea?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of developers who are building better projects with Vindex.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Install Vindex
            </a>
            <a
              href="#"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              View Documentation
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg mb-4">Built with ❤️ for developers</p>
          <p className="text-sm">
            © 2024 Vindex. Open source and free to use.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
