import React, { useEffect, useState } from "react";
import Axios from "axios";

import Hero from "./Hero/hero";
import Services from "./Services/services";
import Projects from "./Projects/projects";
import About from "./About/about";
import ContactInfo from "./ContactInfo/contactinfo";

Axios.defaults.withCredentials = true;

function Home() {
  if (window.scrollY > 300) {
    console.log("Scrolling");
  }

  const [projectsData, setProjectsData] = useState([]);
  const [image, setImage] = useState();
  useEffect(() => {
    Axios.get("http://localhost:8080/project").then((response) => {
      // console.log(response.data);
      const projectsArray = response.data.slice(0, 2);
      setProjectsData(projectsArray);
    });
  }, []);

  useEffect(() => {
    Axios({
      method: "GET",
      url: "http://localhost:8080/photo",
      withCredentials: true,
      // header: { "content-Type": "image/png" },
    })
      .then((response) => {
        console.log("http://localhost:8080/images/" + response.data);
        setImage("http://localhost:8080/images/" + response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Hero />
      <Services />
      <Projects projectsData={projectsData} />
      <About image={image} />
      <ContactInfo />
    </div>
  );
}

export default Home;
