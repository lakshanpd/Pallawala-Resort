import "./adminButton.css";
import { useNavigate } from "react-router-dom";

function AdminButton(props) {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div
      className={`admin-button ${props.clicked ? "clicked" : ""}`}
      onClick={() => handleNavigate(props.path)}
    >
      <p>{props.text}</p>
    </div>
  );
}

export default AdminButton;
