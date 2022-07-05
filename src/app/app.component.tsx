import React from 'react';

import { useState } from 'react';

import Header from '~/layout/header.component';
import Footer from '~/layout/footer.component';

const App = () => (
  <div className="flex flex-col min-h-screen">
    <Header />

    <main className="flex-grow">
      <h2>Main Content</h2>
    </main>

    <Footer />
  </div>
);

export default App;
