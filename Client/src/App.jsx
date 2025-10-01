import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Interviewee from './pages/Interviewee'
import Interviewer from './pages/Interviewer'
import { useDispatch, useSelector } from 'react-redux'
import Login from './component/Login'
import SignupPage from './component/Signup'
import Profile from './component/Profile'
import FetchCurrentUser from './FindCurrentUser/GetCurrentUser'
import Logout from './component/Logout'
import History from './component/History'
import CandidateDetails from './component/CandidateDetails'
import InterviewStart from './component/InterviewStart'
import ViewInterview from './component/ViewInterview'
import ViewSummary from './component/ViewSummary'

const App = () => {

  const dispatch = useDispatch();
  const Userdata = useSelector(state => state.user.userdata);
  const isLoading = useSelector(state => state.user.isLoading);

  useEffect(() => {
    dispatch(FetchCurrentUser());
  }, []);

  if (isLoading) {
    return <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 z-50">
      {/* Spinner */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 w-full h-full border-8 border-purple-500 border-t-yellow-400 rounded-full animate-spin shadow-[0_0_50px_rgba(255,255,255,0.5)]"></div>
        <div className="absolute inset-0 w-full h-full border-4 border-transparent border-t-pink-500 rounded-full animate-spin "></div>
      </div>

      {/* Text */}
      <p className="mt-6 text-3xl font-extrabold text-white drop-shadow-lg animate-pulse">
        Loading...
      </p>

      {/* Subtext */}
      <p className="mt-2 text-white/70 sm:text-lg italic">
        Preparing your experience, please wait
      </p>

    </div>
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element:
        <div>
          {
            !Userdata ? <Login /> : Userdata?.user?.userType === "admin" ? <Interviewer /> : <Interviewee />
          }
        </div>

    },

    {
      path: '/login',
      element: <div>
        {
          !Userdata ? <Login /> : Userdata?.user?.userType === "admin" ? <Interviewer /> : <Interviewee />
        }
      </div>
    },

    {
      path: '/signup',
      element: <div>
        {
          !Userdata ? <SignupPage /> : Userdata?.user?.userType === "admin" ? <Interviewer /> : <Interviewee />
        }
      </div>

    },

    {
      path: '/profile',
      element: <div>
        {
          Userdata ? <Profile /> : <Login />
        }
      </div>
    },

    {
      path: '/history',
      element: <div>
        {
          Userdata ? <History /> : <Login />
        }
      </div>
    },

    {
      path: '/details/:id',
      element: <div>
        {
          Userdata ? <CandidateDetails /> : <Login />
        }
      </div>
    },

    {
      path: '/interview/:id',
      element: <div>
        {
          Userdata ? <InterviewStart /> : <Login />
        }
      </div>
    },

    {
      path: '/summary/:id',
      element: <div>
        {
          Userdata ? <ViewSummary /> : <Login />
        }
      </div>
    },


    {
      path: '/view/:id',
      element: <div>
        {
          Userdata ? <ViewInterview /> : <Login />
        }
      </div>
    },

    {
      path: '/logout',
      element: <Logout />
    },
  ])

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
