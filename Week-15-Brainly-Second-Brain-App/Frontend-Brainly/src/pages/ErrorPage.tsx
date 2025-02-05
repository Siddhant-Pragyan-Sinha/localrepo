// src/pages/ErrorPage.tsx
import React from "react";

interface ErrorPageProps {
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error, errorInfo }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600">Something went wrong!</h1>
      <p className="mt-4 text-gray-700">We're sorry, but an unexpected error occurred.</p>
      {error && (
        <div className="mt-6 p-4 bg-white border border-red-200 rounded-lg">
          <h2 className="text-xl font-semibold text-red-800">Error Details</h2>
          <p className="mt-2 text-sm text-gray-600">{error.message}</p>
          {errorInfo && (
            <pre className="mt-4 p-2 bg-gray-50 text-xs text-gray-600 overflow-auto">
              {errorInfo.componentStack}
            </pre>
          )}
        </div>
      )}
      <button
        className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        onClick={() => window.location.reload()}
      >
        Reload Page
      </button>
    </div>
  );
};

export default ErrorPage;