import "./App.css";
import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home"
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import OpenRoute from "./components/core/Auth/OpenRoute";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Myprofile from "./components/core/DashboardPage/Myprofile";
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";
import Settings from "./components/core/DashboardPage/Settings";
import EnrolledCourses from "./components/core/DashboardPage/EnrolledCourses";
import Cart from "./components/core/DashboardPage/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import { AddCourse } from "./components/core/DashboardPage/AddCourse";
import MyCourses from "./components/core/DashboardPage/MyCourses";
import EditCourse from "./components/core/DashboardPage/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
//import Catalog from "./pages/Catalog";
//import ProfileDropDown from "./components/core/Auth/ProfileDropDown";
function App() {
  const { user } = useSelector((state) => state.profile)
  return (
    <div className=" w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>

        <Route path="/" element={<Home/>}/>

        <Route path="*" element={<Error/>}/>

        <Route path="/catalog/:catalogName" element={<Catalog/>}/>

        <Route path="/about" element={<About/>}/>

        <Route path="/contact" element={<Contact/>}/>

        <Route path="courses/:courseId" element={<CourseDetails />} />

        <Route path="/login" element={<OpenRoute>
          <Login/>
        </OpenRoute>}/>

        <Route path="/signup" element={<OpenRoute>
          <Signup/>
        </OpenRoute>}/>

        <Route path="/forgot-password" element={<OpenRoute>
          <ForgotPassword/>
        </OpenRoute>}/>

        <Route path="/update-password/:id" element={<OpenRoute>
          <UpdatePassword/>
        </OpenRoute>}/>

        <Route path="/verify-email" element={<OpenRoute>
          <VerifyEmail/>
        </OpenRoute>}/>

        <Route element={<PrivateRoute>
             <Dashboard/>
          </PrivateRoute>}>
          <Route path="dashboard/my-profile" element={<Myprofile/>}/>
          <Route path="dashboard/Settings" element={<Settings />} />
          {/* Route only for Students */}
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="dashboard/enrolled-courses"
                element={<EnrolledCourses />}/>
              <Route path="dashboard/cart" element={<Cart />} />
            </>
          )}
          {/* Route only for Instructor */}
            <>
              <Route path="dashboard/add-course" element={<AddCourse/>}/>
              <Route path="dashboard/my-courses" element={<MyCourses/>}/>
              <Route path="dashboard/edit-course/:courseId" element={<EditCourse/>}/>
            </>
          <Route path="dashboard/settings" element={<Settings />} />


           {/* For the watching course lectures */}
        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route>
        </Route>

        
      </Routes>
     
    </div>
  )
}

export default App;
