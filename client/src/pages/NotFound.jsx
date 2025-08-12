import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      {/* Big 404 Text */}
      <h1 className="text-9xl font-extrabold text-gray-300 select-none">404</h1>

      {/* Title */}
      <h2 className="mt-4 text-3xl font-bold text-gray-800">
        Page Not Found
      </h2>

      {/* Description */}
      <p className="mt-2 text-gray-600 max-w-md">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>

      {/* Go Home Button */}
      <Link
        to="/"
        className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
}
