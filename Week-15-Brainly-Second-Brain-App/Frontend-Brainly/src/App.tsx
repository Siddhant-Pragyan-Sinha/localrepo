import { Signin } from "./pages/Signin"; // Importing the Signin page component
import { Signup } from "./pages/Signup"; // Importing the Signup page component
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Importing Router components from react-router-dom for routing
import { Dashboard } from "./pages/dashboard"; // Importing the Dashboard page component
import ErrorBoundary from "./components/ErrorBoundary";
import { MemeErrorPage } from "./pages/MemeErrorPage"; // Importing the MemeErrorPage component

// App component to define the routing structure of the application
function App() {
  return (
    <BrowserRouter>
    <ErrorBoundary>
      {/* BrowserRouter is the main wrapper for routing in React */}
      <Routes>
        {/* Redirect root to signin */}
        <Route path="/" element={<Navigate to="/signin" replace />} />
        
        {/* Defining the routes for each page of the application */}
        <Route path="/signup" element={<Signup />} /> {/* Route for signup page */}
        <Route path="/signin" element={<Signin />} /> {/* Route for signin page */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Route for dashboard page */}
        
        {/* Catch all route for 404 */}
        <Route path="*" element={<MemeErrorPage />} />
      </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App; // Exporting the App component as the default export