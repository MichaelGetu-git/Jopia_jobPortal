import React from 'react';
import { createBrowserRouter, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import AllJobs from '../pages/AllJobs';
import Protected from './Protected';
import Authentication from './Authentication';
import Profile from '../pages/Profile';
import UpdateJob from '../pages/UpdateJob';
import MyJobs from '../pages/MyJobs';
import PostJobs from '../pages/PostJobs';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Settings from '../pages/Settings';
import SidebarProfile from '../pages/SidebarProfile';
import ProfileEdit from '../pages/ProfileEdit';
import ApplyForJobForm from '../pages/ApplyForJobForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <Navbar />
        <HomePage />
        <Footer />
      </div>
    ),
  },
  {
    path: '/profile',
    element: (
      <Protected isSignedIn={Authentication.isSignedIn}>
        <Profile />
      </Protected>
    ),
  },
  {
    path: '/profileEdit',
    element: (
      <Protected isSignedIn={Authentication.isSignedIn}>
        <Navbar/>
        <ProfileEdit />
        <Footer/>
      </Protected>
    ),
  },
  {
    path: '/sidebarProfile',
    element: (
      <Protected isSignedIn={Authentication.isSignedIn}>
        <SidebarProfile />
        <Footer/>
      </Protected>
    ),
  },
  {
    path: '/edit-job/:id',
    element: (
      <Protected isSignedIn={Authentication.isSignedIn}>
        <Navbar/>
        <UpdateJob />
        <Footer/>
      </Protected>
    ),
    loader: ({ params }) => fetch(`http://localhost:5000/all-jobs/${params.id}`),
  },
  {
    path: '/myJobs',
    element: (
      <Protected isSignedIn={Authentication.isSignedIn}>
        <MyJobs />
      </Protected>
    ),
  },
  {
    path: '/postJobs',
    element: (
      <Protected isSignedIn={Authentication.isSignedIn}>
        <Navbar/>
        <PostJobs />
        <Footer/>
      </Protected>
    ),
  },
  {
    path: '/allJobs',
    element: (
        <div>
          <Navbar />
          <AllJobs />
          <Footer/>
        </div>
    ),
  },
  {
    path: '/jobs/:id/apply',
    element: (
        <div>
          <Navbar />
          <ApplyForJobForm></ApplyForJobForm>
          <Footer/>
        </div>
    ),
  },
  {
    path: '/settings',
    element: (
      <Protected isSignedIn={Authentication.isSignedIn}>
        <Navbar />
        <Settings />
        <Footer/>
      </Protected>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/sign-up',
    element: <Signup />,
  },
]);

export default router;
