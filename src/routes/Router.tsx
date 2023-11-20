import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import WelcomePage from '../pages/welcomePage/WelcomePage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<WelcomePage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
