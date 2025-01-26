import type { Route } from "./+types/home";
import Welcome from "./welcome/welcome";
// import { Goose } from "./goose/goose";
// import { GooseProvider } from '../context/gooseContext';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    // <GooseProvider>
      <Welcome />
    // </GooseProvider>
)
}
