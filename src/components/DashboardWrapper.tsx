import React from 'react';
import { AuthProvider } from '../lib/auth-context';
import { NavBar } from './NavBar';
import { ElectoralExplorer } from './electoral/ElectoralExplorer';
import { ContributionPage } from './forms/ContributionPage';
import { HomePage } from './HomePage';

interface DashboardWrapperProps {
  page: 'explorar' | 'contribuir' | 'home';
}

export function DashboardWrapper({ page }: DashboardWrapperProps) {
  return (
    <AuthProvider>
      <NavBar />
      {page === 'explorar' && <ElectoralExplorer />}
      {page === 'contribuir' && <ContributionPage />}
      {page === 'home' && <HomePage />}
    </AuthProvider>
  );
}
