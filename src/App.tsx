import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import routes from 'routes';

function App() {
  return (
    <React.Suspense fallback={'Loading...'}>
      <Routes>
        {Object.values(routes).map((route, index) => {
          const { component: Component, path } = route;
          return <Route path={path} key={index} element={<Component />} />;
        })}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
