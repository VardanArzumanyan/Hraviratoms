import React, { useState } from "react";
import "./App.css";
import hall from "./pics/hall.jpg";
import lusavorich from "./pics/lusavorich.jpeg";
import pin from "./pics/pin.png";
import sd from "./pics/sd.jpg";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    guestCount: "",
  });

  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.guestCount) {
      setNotification({
        message: "Fill in all the fields!",
        type: "error",
      });
      return;
    }

    fetch("/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error:", data.error);
          setNotification({
            message: "There was an error submitting your request.",
            type: "error",
          });
        } else {
          console.log("Success:", data.message);
          setNotification({
            message: "Your request has been sent",
            type: "success",
          });
          setFormData({
            firstName: "",
            lastName: "",
            guestCount: "",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setNotification({
          message: "There was an error submitting your request.",
          type: "error",
        });
      });
  };

  const closeNotification = () => {
    setNotification({
      message: "",
      type: "",
    });
  };

  return (
    <div className="App">
      {notification.message && (
        <div className={`notification ${notification.type}`}>
          <p>{notification.message}</p>
          <button onClick={closeNotification}>Close</button>
        </div>
      )}
      <div className="message">
        <p>Please open the website on a smart phone.</p>
      </div>
      <div className="my">
        <div className="header">
          <div className="header-content">
            <img src={sd} alt="" />
            <div className="header-text">
              <p>
                S&D <br /> WEDDING
              </p>
            </div>
          </div>
        </div>
        <div className="invite-text">
          <div className="invite-text-content">
            <h5>Սիրելի ընկերներ և հարազատներ !</h5>
            <h6>
              Սիրով հրավիրում ենք ձեզ կիսելու մեզ հետ՝ մեր կյանքի կարևոր և
              հիշարժան օրը
            </h6>
            <h4>18.08.2024</h4>
            <hr style={{ width: "100%", textAlign: "center" }}></hr>
          </div>
        </div>

        <div className="church">
          <div className="church-text">
            <div className="title">
              <h5>Պսակադրություն</h5>
            </div>
            <div className="clock">
              <h4>14:30</h4>
            </div>
          </div>
          <div className="church-photo">
            <img src={lusavorich} alt="" />
          </div>
          <div className="location">
            <img src={pin} alt="" style={{ width: "30px" }} />
            <h6>Սուրբ Գրիգոր Լուսավորիչ մայր եկեղեցի, ք․ Երևան </h6>
          </div>
          <a href="https://www.google.com/maps/place/%D0%A1%D0%BE%D0%B1%D0%BE%D1%80+%D0%A1%D0%B2%D1%8F%D1%82%D0%BE%D0%B3%D0%BE+%D0%93%D1%80%D0%B8%D0%B3%D0%BE%D1%80%D0%B8%D1%8F+%D0%9F%D1%80%D0%BE%D1%81%D0%B2%D0%B5%D1%82%D0%B8%D1%82%D0%B5%D0%BB%D1%8F/@40.172162,44.514665,17z/data=!3m1!4b1!4m6!3m5!1s0x406abcf5dce61905:0x5b1b85523b3f82de!8m2!3d40.1721579!4d44.5172399!16s%2Fm%2F06w5y6_?entry=ttu">
            <div className="loc-button">
              <h6>Ինչպես հասնել</h6>
            </div>
          </a>
        </div>

        <hr style={{ width: "80%", marginTop: "40px", marginLeft: "50px" }} />
        <div className="rest">
          <div className="church-text">
            <div className="title">
              <h5>Հարսանեկան խնջույք</h5>
            </div>
            <div className="clock">
              <h4>17:00</h4>
            </div>
          </div>
          <div className="church-photo">
            <img src={hall} alt="" />
          </div>
          <div className="location">
            <img src={pin} alt="" style={{ width: "30px" }} />
            <h6>ՍԱՖԱՐԻ ՀՈԼ, ք․ Չարենցավան</h6>
          </div>

          <a href="http://www.google.com/maps/place/Safari+Hall/@40.4023899,44.6471507,17.37z/data=!4m6!3m5!1s0x404025013eb24ee3:0x29c15ce0b0679667!8m2!3d40.4034252!4d44.647551!16s%2Fg%2F11kj_lcg1c?entry=ttu">
            <div className="loc-button">
              <h6>Ինչպես հասնել</h6>
            </div>
          </a>
        </div>
        <hr style={{ width: "80%", marginTop: "40px", marginLeft: "50px" }} />

        <div className="end-text">
          <h6>
            Խնդրում ենք հաստատել ձեր մասնակցությունը մինչև <p>11.08.2024</p>
          </h6>
        </div>

        <div className="formGroup">
          <form onSubmit={handleSubmit}>
            <div className="formComponent">
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Անուն"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="formComponent">
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Ազգանուն"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="formComponent">
              <input
                type="text"
                id="guestCount"
                name="guestCount"
                placeholder="Հյուրերի քանակ"
                value={formData.guestCount}
                onChange={handleChange}
              />
            </div>

            <button type="submit">Հաստատել</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
