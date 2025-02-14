'use client';
import Navbar from '@/components/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
 return (
  <QueryClientProvider client={queryClient}>
   <Navbar />
   {children}
  </QueryClientProvider>
 );
};

export default layout;
