const http = require("http"); //built-in module
const Users = [
  {
    name: "Ram",
    age: 25,
  },
  {
    name: "Raj",
    age: 30,
  },
  {
    name: "Rahul",
    age: 50,
  },
];
// The createServer function takes a callback as an argument. This callback takes Request and Response objects as arguments for further processing
const server = http.createServer(function (request, response) {
  // response.write("Hello from server")

  // if sending only users then error will come from js
  // response.write(users)

  // so stringify
  // response.write(JSON.stringify(users))

  // creating an array of path by splitting it from /
  const paths = request.url.split("/");
  console.log("Paths---", paths);
  console.log("Methods---", request.method);
  // -------------------------------------
  // getting list of all users at http://localhost:3000/users
  // paths.length = 2 because bydefault there will be one empty element in the array due to split operation.
  if (request.method === "GET" && paths[1] === "users" && paths.length === 2) {
    response.write(JSON.stringify(Users));
    // getting a specific indexed user at http://localhost:3000/users/idx
  } else if (request.method === "GET" && paths[1] === "users" && paths[2]) {
    // getting the index from the url path array
    const idx = paths[2];
    // finding the user
    const user = Users[idx];
    if (user) {
      response.write(JSON.stringify(user));
    } else {
      response.write("Not Found");
    }
    // Posting a user at http://localhost:3000/users
  } else if (request.method === "POST" && paths[1] === "users") {
    let data = "";
    // .on is event listener which will listen when 'data' packets are arrived
    // chunk is part of datapackets sent over the network
    // collecting the data receieved on request
    request.on("data", function (chunk) {
      data += chunk;
    });
    request.on("end", function () {
      // need to parse the data into JSON coz the data sent through the request would be in the form like "name":"Thor" but JSON objects dont have such quotes on key so it needs to be like name:"Thor"
      const obj = JSON.parse(data.toString());
      // creating new user by appending the object at the end of the users array mentioned above in the file
      Users.push(obj);
    });
    // resource created successfully
    response.statusCode = 201;
    response.write("User data created.");
  }
  // Update a user using PUT
  else if (request.method === "PUT" && paths[1] === "users" && paths[2]) {
    const idx = paths[2];
    let data = "";
    console.log(Users[idx]);

    if (Users[idx]) {
      request.on("data", function (chunk) {
        data += chunk;
      });
      request.on("end", function () {
        const obj = JSON.parse(data.toString());
        Users[idx] = {
          ...Users[idx],
          ...obj,
        };
      });

      response.write("user updated successfully");
    } else {
      response.write("user not found");
    }
  }
  // DELETE user using idx
  else if (request.method === "DELETE" && paths[1] === "users" && paths[2]) {
    const name = paths[2];

    const idx = Users.findIndex(
      (element) => element.name.toLowerCase() === name.toLowerCase()
    );
    if (idx === -1) {
      response.write("user not found");
    } else {
      Users.splice(idx, 1);
      response.write("user deleted successfully");
    }
  } else {
    response.write("Not Found");
  }

  response.end();
});

server.listen(3000, function () {
  console.log("server is running on port number 3000");
});
