# WebRTC-TalkMate
<details>
<summary>Table of Contents</summary>
<ol>
<li>
<a href="#about-the-project">About The Project</a>
<ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
</li>
<li><a href="#getting-started">Getting Started</a>
<ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#some-pictures-from-the-project">Some Pictures of the Project</a></li>
    <li><a href="#📬contact">Contact</a></li>
</ol>
</details>


## About The Project

This projects aim is facilitate talk to peer-to-peer communication with your friends or group meeting with team. You can sign up and login with email and password. With this account you can video-audio call, share your screen, mute-unmute your voice, close your camera during the meeting, or create, join or leave group call.

### Built With
- ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
- ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
---
#### Frontend:
- [![React][react.js]][react-url]
- [![React Router][react-router]][react-router-dom]
- [![Redux][redux-img]][redux-toolkit]
- ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
  </br>
#### Backend:
- [![Nodejs][node.js]][nodejs-url]
- [![Expressjs][express.js]][expressjs-url]
- [![Mongodb][mongodb]][mongodb-url]
- [![JWT][jwt-img]][jwt-url]
- <img src="https://repository-images.githubusercontent.com/2518028/adb2df00-9431-11e9-9ccd-26f012b80f29" alt="Express Validator" width="100" title="Express Validator">

### Prerequisites

- npm
  ```sh
  npm install
  ```
### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/muhammedkalabasi10/Invoice-Management-System-MERN
   ```
2. Install NPM packages in terminal
   ```sh
   npm install
   ```
3. In the first terminal `cd client` and create a `.env` file in the root of your client directory
4. Supply the following credentials
   ```js
   REACT_APP_API = http://localhost:5000
   REACT_APP_URL = http://localhost:3000
   ```
5. `cd server` and create a `.env` file in the root of your client directory
6. Supply the following credentials
   ```js
   PORT=5000
   MONGODB_URL=Your MongoDB url
   ACCESS_TOKEN_SECRET=random bytes
   REFRESH_TOKEN_SECRET=random bytes
   API_LINK=http://localhost:3000
   ```
### Features
- Facilitating running app with Docker
- List of active users
- List of active group meetings
- Peer-to-peer meeting
- Peer-to-peer messaging
- Creating group meeting
- Join or leave group meeting
- Screen sharing during p2p or group meeting
- Mute-unmute options during meeting
- Camera on-off options during meeting
- Leave meeting option
- Exiting from meeting when closing the browser
- Call accept and reject options
- If the called user in meeting during the calling, showing message about this situation
- Disappearing message after send or receive after 3 second
- Login/Signup User Account
- Security for Csrf
- Data validation on server side
- Cors restriction
- Access Token and Refresh Token

### Some Pictures from the Project
- Empty Dashboard: <img width="960" alt="1" src="https://github.com/muhammedkalabasi10/WebRTC-TalkMate/assets/97872051/14065d88-b6be-401d-b4d2-eac30da356ed">
- Calling screen whom caller user: <img width="959" alt="2" src="https://github.com/muhammedkalabasi10/WebRTC-TalkMate/assets/97872051/dcc09a3a-1e2a-4832-a3b4-c9997e778de0">
- Calling screen whom called user: <img width="960" alt="3" src="https://github.com/muhammedkalabasi10/WebRTC-TalkMate/assets/97872051/3bd494c4-7098-4929-accc-566c75fadf31">
- Peer-to-peer meeting screen: <img width="958" alt="4" src="https://github.com/muhammedkalabasi10/WebRTC-TalkMate/assets/97872051/65a24910-d441-4959-8590-76aff6d85f5b">
- Dashboard during there is a group meeting: <img width="960" alt="5" src="https://github.com/muhammedkalabasi10/WebRTC-TalkMate/assets/97872051/b866a0cf-41bc-400b-af22-fb2cf0750059">
- Group meeting screen whom creator the room: <img width="960" alt="6" src="https://github.com/muhammedkalabasi10/WebRTC-TalkMate/assets/97872051/8c54d643-a479-4a5e-a670-982a7a1d71b3">

### 📬Contact
- Github: https://github.com/muhammedkalabasi10/WebRTC-TalkMate/tree/main
- Linkedin: https://www.linkedin.com/in/muhammed-kalaba%C5%9F%C4%B1-116287248/

<!-- LINKS & IMAGES -->
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[react-router]: https://camo.githubusercontent.com/4f9d20f3a284d2f6634282f61f82a62e99ee9906537dc9859decfdc9efbb51ec/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f52656163745f526f757465722d4341343234353f7374796c653d666f722d7468652d6261646765266c6f676f3d72656163742d726f75746572266c6f676f436f6c6f723d7768697465
[react-router-dom]: https://reactrouter.com/en/main
[redux-img]: https://camo.githubusercontent.com/6908bc5919e46cd787b8e5117f092f5ed37da82e8bd602e6339060ea0fff722c/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f52656475782d3539334438383f7374796c653d666f722d7468652d6261646765266c6f676f3d7265647578266c6f676f436f6c6f723d7768697465
[redux-toolkit]: https://redux-toolkit.js.org/
[node.js]: https://camo.githubusercontent.com/dfc69d704694f22168bea3d84584663777fa5301dcad5bbcb5459b336da8d554/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6f64652e6a732d3433383533443f7374796c653d666f722d7468652d6261646765266c6f676f3d6e6f64652e6a73266c6f676f436f6c6f723d7768697465
[nodejs-url]: https://nodejs.org/en/
[express.js]: https://camo.githubusercontent.com/7f73136d92799b19be179d1ed87b461120c35ed917c7d5ab59a7606209da7bd3/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f457870726573732e6a732d3030303030303f7374796c653d666f722d7468652d6261646765266c6f676f3d65787072657373266c6f676f436f6c6f723d7768697465
[expressjs-url]: https://expressjs.com/
[mongodb]: https://camo.githubusercontent.com/72e92f69f36703548704a9eeda2a9889c2756b5e08f01a9aec6e658c148d014e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4d6f6e676f44422d3445413934423f7374796c653d666f722d7468652d6261646765266c6f676f3d6d6f6e676f6462266c6f676f436f6c6f723d7768697465
[mongodb-url]: https://www.mongodb.com/
[jwt-img]: https://camo.githubusercontent.com/92407fc26e09271d8137b8aaf1585b266f04046b96f1564dfe5a69f146e21301/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4a57542d3030303030303f7374796c653d666f722d7468652d6261646765266c6f676f3d4a534f4e253230776562253230746f6b656e73266c6f676f436f6c6f723d7768697465
[jwt-url]: https://jwt.io/
