import { Routes, Route } from 'react-router-dom'
import { AdminAuthProvider } from './context/AdminAuthContext.jsx'
import ProtectedAdminRoute from './components/ProtectedAdminRoute.jsx'
import MainPage from './pages/MainPage.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminMainPage from './pages/AdminMainPage.jsx'
import BookViewing from './pages/BookViewing.jsx'
import AllListing from './pages/AllListing.jsx'
import Contact from './pages/Contact.jsx'
import List from './pages/List.jsx'
import Profile from './pages/Profile.jsx'
import Messages from './pages/Messages.jsx'
import Notifications from './pages/Notifications.jsx'
import PropertyDetails from './pages/PropertyDetails.jsx'

function App() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminMainPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/notifications"
          element={
            <ProtectedAdminRoute>
              <Notifications />
            </ProtectedAdminRoute>
          }
        />
        <Route path="/book-viewing" element={<BookViewing />} />
        <Route path="/all-listing" element={<AllListing />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/list-property" element={<List />} />
        <Route
          path="/profile"
          element={
            <ProtectedAdminRoute>
              <Profile />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedAdminRoute>
              <Messages />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </AdminAuthProvider>
  )
}

export default App