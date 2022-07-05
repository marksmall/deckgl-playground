import React from 'react';

import { useAppConfig } from './useAppConfig';

import Header from '~/layout/header.component';
import Footer from '~/layout/footer.component';

const App = () => {
  const { data: config, status, error } = useAppConfig();
  console.log('DATA: ', config);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <h2>Main Content</h2>
      </main>

      <Footer />
    </div>
  );
};

export default App;
