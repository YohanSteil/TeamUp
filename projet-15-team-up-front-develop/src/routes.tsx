import { Outlet, createBrowserRouter } from 'react-router-dom';
import React from 'react';
import Homepage from './components/Homepage/Homepage';
import Contact from './components/Contact/Contact';
// import LegalNotice from './components/LegalesNotices/LegalesNotices';
import About from './components/About/About';
import Conditions from './components/Conditions/Conditions';
import Error404 from './components/Error404/Error404';
import Personalinfos from './components/PersonalInfos/PersonalInfos';
import EventMain from './components/Event/EventMain';
import ProfilMain from './components/Profil/ProfilMain';
import CreateEventMain from './components/CreateEvent/CreateEventMain';
import SearchMain from './components/Search/SearchMain';
import ProfilPublic from './components/ProfilPublic/ProfilPublic';
import LegalesNotices from './components/LegalesNotices/LegalesNotices';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    // errorElement: <Error404 />,

    children: [
      {
        path: '/',
        element: <Homepage />,
      },
      {
        path: '/user/myProfile',
        element: <ProfilMain />,
      },
      {
        path: '/:username',
        element: <ProfilPublic />,
      },
      {
        path: '/personalinfos',
        element: <Personalinfos />,
      },
      {
        path: '/event/:id',
        element: <EventMain />,
      },
      {
        path: '/event/create',
        element: <CreateEventMain />,
      },
      {
        path: '/search',
        element: <SearchMain />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/legalnotice',
        element: <LegalesNotices />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/conditions',
        element: <Conditions />,
      },
      {
        path: '*',
        element: <Error404 />,
      },
    ],
  },
]);

export default router;
