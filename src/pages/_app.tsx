import type { AppProps } from 'next/app';
import '../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/context/AuthContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />;
      <ToastContainer autoClose={2500} />
    </AuthProvider>
  );
}
