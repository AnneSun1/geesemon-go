import { Link } from "react-router-dom"

export default function NavHeader() {
  return (
    <nav className="absolute top-0 right-0 p-6 z-50">
      <ul className="flex space-x-8">
        <li>
          <Link to="/goose" className="text-white hover:text-blue-200 transition-colors">
            Home
          </Link>
        </li>
        <li>
          <Link to="/map" className="text-white hover:text-blue-200 transition-colors">
            Map
          </Link>
        </li>
      </ul>
    </nav>
  )
}

