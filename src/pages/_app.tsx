import '@/styles/globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app'
import { CartProvider } from '@/components/lib/context/cart-context';

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  return (
    <>
      <CartProvider>
        <AnimatePresence mode='wait'>
          <Component {...pageProps} key={pathname}/>
        </AnimatePresence>
      </CartProvider>
    </>
  );
}
