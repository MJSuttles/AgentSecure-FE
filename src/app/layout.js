import 'bootstrap/dist/css/bootstrap.min.css';
import { Inter } from 'next/font/google';
import PropTypes from 'prop-types';
import ClientProvider from '../utils/context/ClientProvider';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} d-flex flex-column`} style={{ minHeight: '100vh' }}>
        <ClientProvider>
          <main className="flex-grow-1">{children}</main>
        </ClientProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
