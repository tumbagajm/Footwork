import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

function ErrorPage() {
  const data = {
    title: "404 - Page Not Found",
    content: "The page you are looking for cannot be found.",
    destination: "/",
    label: "Back Home",
  };

  return (
    <>
      <Container className="text-center border rounded my-5 p-5">
        <h1>{data.title}</h1>
        <h4>{data.content}</h4>
        <Link to={data.destination}>{data.label}</Link>
      </Container>
    </>
  );
}

export default ErrorPage;