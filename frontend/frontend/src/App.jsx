import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import EmployeeComponent from './components/EmployeeComponent';
import Layout from './components/Layout';
import DashboardComponent from './components/DashboardComponent';
import ListProjectComponent from './components/ListProjectComponent';
import ProjectComponent from './components/ProjectComponent';
import ProjectAnalytics from './components/ProjectAnalytics';
import AddEventComponent from './components/AddEventComponent';
import SettingsComponent from './components/SettingsComponent';
import AccountComponent from './components/AccountComponent';
import LoginComponent from './components/LoginComponent';
import PerformanceReviews from './components/PerformanceReviews';
import OffboardEmployee from './components/OffboardEmployee';
import { isAuthenticated } from './services/AuthService';
import ViewCalendarComponent from './components/ViewCalendarComponent';
import LeaveRequestsComponent from './components/LeaveRequestsComponent';
import GeneratePayroll from './components/GeneratePayroll';
import ViewPayslips from './components/ViewPayslips';
import ScheduleComponent from './components/ScheduleComponent';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Redirect authenticated users away from login
const PublicRoute = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route for login */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginComponent />
            </PublicRoute>
          }
        />
        {/* Protected routes with Layout */}
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <ListEmployeeComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees"
            element={
              <ProtectedRoute>
                <ListEmployeeComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-employee"
            element={
              <ProtectedRoute>
                <EmployeeComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-employee/:id"
            element={
              <ProtectedRoute>
                <EmployeeComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/performance-review"
            element={
              <ProtectedRoute>
                <PerformanceReviews/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/offboard"
            element={
              <ProtectedRoute>
                <OffboardEmployee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <ListProjectComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-project"
            element={
              <ProtectedRoute>
                <ProjectComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/project-analytics"
            element={
              <ProtectedRoute>
                <ProjectAnalytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/schedule"
            element={
              <ProtectedRoute>
                <ScheduleComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance"
            element={
              <ProtectedRoute>
                <ViewCalendarComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-event"
            element={
              <ProtectedRoute>
                <AddEventComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leave-requests"
            element={
              <ProtectedRoute>
                <LeaveRequestsComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payroll"
            element={
              <ProtectedRoute>
                <GeneratePayroll />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payslips"
            element={
              <ProtectedRoute>
                <ViewPayslips />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountComponent />
              </ProtectedRoute>
            }
          />
          {/* Redirect root to dashboard for authenticated users */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;