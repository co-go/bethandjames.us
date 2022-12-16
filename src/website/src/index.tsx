import React from 'react';
import ReactDOM from 'react-dom/client';
import { ParallaxProvider } from 'react-scroll-parallax';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import './styles/global.sass';
import Home from './Home';
import reportWebVitals from './reportWebVitals';
import RSVPForm from './components/RSVPForm';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/rsvp",
    element: <RSVPForm />,
  },
]);

root.render(
  <React.StrictMode>
    <ParallaxProvider>
      <RouterProvider router={router} />
    </ParallaxProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
