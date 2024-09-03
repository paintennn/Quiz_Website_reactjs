import { useState } from "react";
import "./Login.scss";
import { GrFormPrevious } from "react-icons/gr";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postRegister } from "../../services/ApiServices";
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    //validate

    // Submit API
    try {
      let data = await postRegister(email, password, username);
      console.log("data", data);

      // Check result
      if (data && data.EC === 0) {
        toast.success(data.EM); // Thành công
        navigate("/login"); // Hoặc trang khác nếu cần
      } else {
        toast.error(data.EM); // Thất bại
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };
  return (
    <div className="container mt-5">
      <div className="back">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          <GrFormPrevious />
          Back Home
        </button>
      </div>
      <div className="mt-2 title">
        <h1>Quizz</h1>
        <h3>Hello,Who's this?</h3>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Register</h3>
            </div>
            <div className="card-body">
              <div className="form-group mb-2">
                <label for="email">Email address</label>
                <input
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group mb-3 position-relative">
                <label htmlFor="password" className="mb-2">
                  Password
                </label>
                <input
                  onChange={(event) => setPassword(event.target.value)}
                  value={password}
                  type={showPassword ? "text" : "password"} // Toggle password visibility
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label for="email">User Name</label>
                <input
                  onChange={(event) => setUserName(event.target.value)}
                  value={username}
                  type="text"
                  className="form-control"
                  placeholder="Enter your User Name"
                  required
                />
              </div>
              <div className="orther mb-2">
                <a
                  onClick={() => {
                    navigate("/login");
                  }}
                  href=""
                >
                  Login
                </a>
              </div>
              <button
                onClick={() => handleRegister()}
                type="submit"
                className="btn-submit btn btn-primary btn-block"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
