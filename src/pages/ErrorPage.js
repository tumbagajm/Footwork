import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import error from "../images/not-found.svg"

function ErrorPage() {
  const data = {
    title: "404 - Page Not Found",
    content: "The page you are looking for cannot be found.",
    destination: "/",
    label: "Back Home",
  };

  return (
    <>

    <Container className="mt-5 d-flex flex-column justify-content-center align-items-center gap-5">
        <img
          src={error}
          alt="404"
          className="img-fluid w-50"
        />
        <p>
          Go back to the <Link to="/" className="text-decoration-none">homepage</Link>
        </p>
      </Container>
    </>
  );
}

export default ErrorPage;