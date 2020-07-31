const express = require("express");
const geolib = require("geolib");
const axios = require("axios");

const PORT = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res) => {
  return res.json({
    status: res.statusCode,
    data: {
      message: "API Active",
    },
  });
});

app.get("/users", (req, res) => {
  Promise.all([getLondonUsers(), getAllUsers()])
    .then(([res1, res2]) => {
      let londonUsers = res1.data;
      let allusers = res2.data;

      // Get all users within 50 miles of London
      let usersWithin50Miles = inRadius(allusers, 128748);

      // Merge data
      let data = { ...londonUsers, ...usersWithin50Miles };

      // Return successful json response
      return res.json({
        status: res.statusCode,
        data: data,
      });
    })
    .catch((err) => {
      // Return error response
      return res.json({
        status: res.statusCode,
        data: err,
      });
    });
});

// Function to filter users where lat,long is within 50 miles of 'London'.
const inRadius = (users, distance) => {
  let filtered = users.filter((user) => {
    return geolib.isPointWithinRadius(
      { latitude: user.latitude, longitude: user.longitude },
      { latitude: 51.509865, longitude: -0.118092 },
      distance
    );
  });
  return filtered;
};

// Get users in 'London'
const getLondonUsers = () => {
  return axios.get("https://bpdts-test-app.herokuapp.com/city/London/users");
};

// Get all users
const getAllUsers = () => {
  return axios.get("https://bpdts-test-app.herokuapp.com/users");
};

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
