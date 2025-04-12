import { useLocation } from "react-router-dom";

function Location() {
  const location = useLocation();

  // Get the last part of the URL path
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const currentPage = pathSegments[pathSegments.length - 1] || "Home";

  return <h1 className="text-2xl font-bold">Current Page: {currentPage}</h1>;
}

export default Location;
