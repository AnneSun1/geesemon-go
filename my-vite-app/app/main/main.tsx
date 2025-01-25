import NavHeader from "../components/nav-header"
import "./app.css"

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#001233] to-[#003366]">
      {/* Stars Background */}
      <div className="stars" />

      {/* Navigation */}
      <NavHeader />

      {/* Main Content */}
      <main className="relative container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-6xl font-bold text-white mb-4">GeesesHacks</h1>
            <h2 className="text-2xl text-blue-200">January 25-26 • Waterloo, ON</h2>
            <p className="text-xl text-gray-300">Applications closed... Stay tuned for decisions!</p>
            <div className="flex items-center space-x-4">
              <span className="text-white">Powered by</span>
              <img src="/google-developers.png" alt="Google Developers" className="h-8" />
            </div>
            {/* <SocialLinks /> */}
          </div>

          <div className="space-y-8">
            {/* <StatsCard />
            <TerminalWindow /> */}
          </div>
        </div>

        {/* Mountain Silhouettes */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-mountains" />

        {/* Flying Geese */}
        <div className="absolute right-0 top-1/4 transform -translate-y-1/2">
          <div className="flying-geese" />
        </div>
      </main>
    </div>
  )
}

