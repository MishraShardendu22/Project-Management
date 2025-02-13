interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {

  
  return (
    <div className="flex flex-col min-h-screen">
      {children}
    </div>
  );
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Become a User Now 😏`,
  description: 'ProjectZen | Become a User and Find out what people think about you !!',
};