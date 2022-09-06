import React, { useState } from "react";
import "./addproject.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

Axios.defaults.withCredentials = true;

function AddProject() {
  let navigate = useNavigate();
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  /* Date.prototype.today = () => {
    return (
      (this.getDate() < 10 ? "0" : "") +
      this.getDate() +
      "/" +
      (this.getMonth() + 1 < 10 ? "0" : "") +
      (this.getMonth() + 1) +
      "/" +
      this.getFullYear()
    );
  };*/
  let newDate = new Date();
  // console.log(new Date());

  const logOut = () => {
    Axios.get("http://localhost:8080/api/logout").then((response) => {
      console.log(response);
      navigate("/");
    });
  };

  const submitProject = () => {
    Axios.post("http://localhost:8080/project", {
      projectTitle: projectTitle,
      projectDescription: projectDescription,
      date: new Date().toISOString().slice(0, 10),
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div>
      <div className="admin">
        <div className="side-bar">
          <Link to="/" target="_blank">
            <img className="home" src="./images/home2.png" />
            <p className="hide">Home</p>
          </Link>

          <Link to="/blog" target="_blank">
            <img className="blog-icon" src="./images/symbols.png" />
            <p className="hide">Blog</p>
          </Link>

          <Link to="/createblog" target="_blank">
            <img src="./images/content-writing.png" />
          </Link>

          <Link to="" target="_blank">
            <img src="./images/project.png" />
          </Link>
        </div>
        <div className="main-bar">
          <div className="navigation-bar">
            <div>
              <img src="./images/dashboard.png" />
              <h1>Dashboard</h1>
            </div>

            <button onClick={logOut}>Log Out</button>
          </div>
          <div className="main-content">
            <input
              type="text"
              placeholder="Project Name"
              onChange={(e) => {
                setProjectTitle(e.target.value);
              }}
            />
            <textarea
              placeholder="Description"
              onChange={(e) => {
                setProjectDescription(e.target.value);
              }}
            />
            <button onClick={submitProject}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProject;
