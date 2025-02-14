import AuthProvider from '@/components/authProvider';
import { Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import './globals.css';

const geistSans = localFont({
  src: '../public/fonts/Geist.woff2', // Adjust path as needed
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
 variable: '--font-geist-mono',
 subsets: ['latin'],
});

export const metadata: Metadata = {
 title: {
  template: '%s | ProjectZen',
  default: 'ProjectZen - Made By Shardendu Mishra',
 },
 description:
  'ProjectZen | Sometimes Roasting, Sometimes Toasting - Made With Love By Shardendu Mishra Using Next.js 15',
};

export default function RootLayout({
 children,
}: Readonly<{ children: React.ReactNode }>) {
 return (
  <html lang="en">
   <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    {/* <QueryClientProvider client={queryClient}> */}
     {/* <ThemeProvider> */}
    <AuthProvider>
      <Navbar />
      {children}
      <Footer />
    </AuthProvider>
      {/* </ThemeProvider> */}
    {/* </QueryClientProvider> */}
    <Toaster position="top-right" reverseOrder={false} />
   </body>
  </html>
 );
}
