import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import PublicHeader from '@/components/shared/PublicHeader';
import PublicFooter from '@/components/shared/PublicFooter';

interface PublicLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const PublicLayout = ({ 
  children, 
  title = "Fia Global - Bank Correspondent System",
  description = "Fia Global Bank Correspondent System - Bringing financial services to every corner"
}: PublicLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>
      
      <PublicHeader />
      
      <main className="flex-grow pt-16">
        {children}
      </main>
      
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;