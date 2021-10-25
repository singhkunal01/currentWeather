const wrapper = document.querySelector(".wrapper");
const inputPart = document.querySelector(".input-part");
const inputValue = document.querySelector("input");
const DeviceLocationbutton = document.querySelector(".btn");
const warningText = document.querySelector(".warning-txt");
const weatherImage = document.querySelector(".weather-part img");
const backBtn = document.querySelector("header i");
const body = document.querySelector("body");
const apiKey = "25f33d8b68474993d4a60565c0b4a23b";
let url;
DeviceLocationbutton.addEventListener("click", () => {
  //if the browser supports the geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Browser doesn't supports the Geolocation ");
  }
});
//on success this function
const onSuccess = (currPos) => {
  const { latitude, longitude } = currPos.coords;
  url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  allDetails();
};
//on failure this function
const onError = (error) => {
  warningText.innerText = `Error : ${error.message}`;
  warningText.classList.add("error");
};
/* when user types something then this event listener works */
inputValue.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && inputValue != "") {
    // console.log('you clicked');
    //call this function
    giveCityResult(inputValue.value);
    }
  else {
      warningText.innerText = 'City Can Not Be Empty ,Please Enter Something';
      warningText.classList.add('error');
    }
});
//definition of function
const giveCityResult = (cityName) => {
  url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  allDetails();
};
const allDetails = () => {
  warningText.innerText = `Please Wait, Fetching Results..`;
  warningText.classList.add("pending");
  fetch(url)
    .then((response) => response.json())
    .then((result) => giveWeatherInfo(result));
};
//weather info after typing the city name
const giveWeatherInfo = (cityEntered) => {
  if (cityEntered.cod == 404 || cityEntered.cod == 400) {
    warningText.innerText = `Error : ${cityEntered.message}`;
    warningText.classList.add("error");
    warningText.classList.replace("pending", "error");
  } else {
    // data fetched by api
    const cityName = cityEntered.name;
    const countryName = cityEntered.sys.country;
    const { description, id } = cityEntered.weather[0];
    const { feels_like, humidity, temp } = cityEntered.main;
    if (id == 800) {
      weatherImage.src = "./Weather Icons/clear.svg";
      body.style.background =
        "linear-gradient(to right top, #a1b3c6, #6acfe4, #33e9d0, #8cf98b, #fff735)";
    } else if (id >= 200 && id <= 232) {
      weatherImage.src = "./Weather Icons/storm.svg";
      body.style.background =
        "linear-gradient(to left top, #14eef8, #4ee8ff, #75e2ff, #94dcff, #acd6fa, #a1c4e2, #96b3cb, #8ba2b4, #68808c, #496065, #2e4042, #162322)";
    } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
      weatherImage.src = "./Weather Icons/rain.svg";
      body.style.background =
        "linear-gradient(to left top, #788ba8, #6183b9, #497bc9, #2e71d8, #0266e5)";
    } else if (id >= 600 && id <= 622) {
      weatherImage.src = "./Weather Icons/snow.svg";
      body.style.background =
        "linear-gradient(to left top, #dadee3, #c1d2e9, #a8c6ee, #8ebaf3, #72adf8)";
    } else if (id >= 701 && id <= 781) {
      weatherImage.src = "./Weather Icons/haze.svg";
      body.style.background =
        "linear-gradient(to right top, #dadee3, #a1a7ae, #6c737c, #3b434d, #0e1823)";
    } else if (id >= 801 && id <= 804) {
      weatherImage.src = "./Weather Icons/cloud.svg";
      body.style.background =
        "linear-gradient(to right top, #629ca4, #5ea0b2, #5da4c0, #62a6cd, #6ea8da, #6db0e4, #6bb7ee, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)";
    }

    //add all these values to the specific elements in html
    document.querySelector(".temp .number").innerText = Math.floor(temp);
    document.querySelector(".weather").innerText = description;
    document.querySelector(".temp .number-2").innerText =
      Math.floor(feels_like);
    document.querySelector(".humidity span").innerText = `${humidity} %`;
    document.querySelector(
      ".location span"
    ).innerText = `${cityName},${countryName}`;
    warningText.classList.remove("pending", "error");
    wrapper.classList.add("active");
  }
};
backBtn.addEventListener("click", () => {
  wrapper.classList.remove("active");
});
