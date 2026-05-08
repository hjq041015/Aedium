import { createRootRoute } from '@tanstack/react-router';
import NavBar from '../components/NavBar.tsx';

const RootLayout = () => (
  <>
    <NavBar />
  </>
);

export const Route = createRootRoute({ component: RootLayout });