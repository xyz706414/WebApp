import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { useScrollRestoration } from './hooks/useScrollRestoration';
import { PageWrapper } from './components/PageWrapper';
import { HomePage } from './pages/HomePage';
import { PromptPage } from './pages/PromptPage';
import { ResultPage } from './pages/ResultPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { AccountPage } from './pages/AccountPage';
import { HistoryPage } from './pages/HistoryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { FAQPage } from './pages/FAQPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';

const AppContent = () => {
  // Initialize scroll restoration system
  useScrollRestoration();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={
            <PageWrapper scrollToTopOnMount transitionDuration={500}>
              <HomePage />
            </PageWrapper>
          } />
          <Route path="/create" element={
            <PageWrapper scrollToTopOnMount transitionDuration={400}>
              <PromptPage />
            </PageWrapper>
          } />
          <Route path="/result" element={
            <PageWrapper preserveScroll transitionDuration={300}>
              <ResultPage />
            </PageWrapper>
          } />
          <Route path="/templates" element={
            <PageWrapper scrollToTopOnMount transitionDuration={400}>
              <TemplatesPage />
            </PageWrapper>
          } />
          <Route path="/account" element={
            <PageWrapper scrollToTopOnMount transitionDuration={400}>
              <AccountPage />
            </PageWrapper>
          } />
          <Route path="/history" element={
            <PageWrapper scrollToTopOnMount transitionDuration={400}>
              <HistoryPage />
            </PageWrapper>
          } />
          <Route path="/about" element={
            <PageWrapper scrollToTopOnMount transitionDuration={500}>
              <AboutPage />
            </PageWrapper>
          } />
          <Route path="/contact" element={
            <PageWrapper scrollToTopOnMount transitionDuration={400}>
              <ContactPage />
            </PageWrapper>
          } />
          <Route path="/privacy" element={
            <PageWrapper scrollToTopOnMount transitionDuration={400}>
              <PrivacyPage />
            </PageWrapper>
          } />
          <Route path="/terms" element={
            <PageWrapper scrollToTopOnMount transitionDuration={400}>
              <TermsPage />
            </PageWrapper>
          } />
          <Route path="/faq" element={
            <PageWrapper scrollToTopOnMount transitionDuration={400}>
              <FAQPage />
            </PageWrapper>
          } />
          <Route path="/onboarding" element={
            <PageWrapper scrollToTopOnMount transitionDuration={600}>
              <OnboardingPage />
            </PageWrapper>
          } />
          <Route path="/login" element={
            <PageWrapper scrollToTopOnMount transitionDuration={500}>
              <LoginPage />
            </PageWrapper>
          } />
          <Route path="/signup" element={
            <PageWrapper scrollToTopOnMount transitionDuration={500}>
              <SignupPage />
            </PageWrapper>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;