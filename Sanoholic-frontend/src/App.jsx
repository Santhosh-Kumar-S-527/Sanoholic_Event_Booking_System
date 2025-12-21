import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import RoleSelect from "./pages/RoleSelect";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Bookings from "./pages/Bookings";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import EventBookings from "./pages/EventBookings";
import AdminDashboard from "./pages/admin/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminBookingsByEvents from "./pages/admin/AdminBookingsByEvents";
import AdminBookingsByUsers from "./pages/admin/AdminBookingsByUsers";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminOrganizerRequests from "./pages/admin/AdminOrganizerRequests";
import OrganizerRequest from "./pages/OrganizerRequest";
import ChangePassword from "./pages/ChangePassword";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* ENTRY */}
        <Route path="/" element={<RoleSelect />} />

        {/* PUBLIC */}
        <Route path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER */}
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events/:id"
          element={
            <ProtectedRoute>
              <EventDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />

        {/* ORGANIZER */}
        <Route
          path="/organizer"
          element={
            <RoleRoute allowedRoles={["organizer", "admin"]}>
              <OrganizerDashboard />
            </RoleRoute>
          }
        />

        <Route
          path="/organizer/create"
          element={
            <RoleRoute allowedRoles={["organizer", "admin"]}>
              <CreateEvent />
            </RoleRoute>
          }
        />

        <Route
          path="/organizer/edit/:id"
          element={
            <RoleRoute allowedRoles={["organizer", "admin"]}>
              <EditEvent />
            </RoleRoute>
          }
        />

        <Route
          path="/organizer/bookings/:id"
          element={
            <RoleRoute allowedRoles={["organizer", "admin"]}>
              <EventBookings />
            </RoleRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </RoleRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/events"
          element={
            <ProtectedRoute role="admin">
              <AdminEvents />
            </ProtectedRoute>
          }
        />

        <Route path="/admin/bookings" element={<ProtectedRoute role="admin"><AdminBookings /></ProtectedRoute>} />
        <Route path="/admin/bookings/events" element={<ProtectedRoute role="admin"><AdminBookingsByEvents /></ProtectedRoute>} />
        <Route path="/admin/bookings/users" element={<ProtectedRoute role="admin"><AdminBookingsByUsers /></ProtectedRoute>} />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="admin">
              <AdminUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute role="admin">
              <AdminAnalytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/organizer-requests"
          element={
            <ProtectedRoute role="admin">
              <AdminOrganizerRequests />
            </ProtectedRoute>
          }
        />

        <Route path="/organizer-request" element={<OrganizerRequest />} />

        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
