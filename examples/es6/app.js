/* eslint-disable no-console */
/* global document */
import GreenKey from 'greenkey-sdk';

const endpoint = 'replace me';
const GK = new GreenKey(`https://${endpoint}`);

let liveIntercom;

function showLogin(error = {}) {
  if (document.querySelectorAll('.login').length) {
    document.querySelector('.heading').insertAdjacentHTML('beforeend', `<p>Error: ${error.message}</p>`);
  } else {
    document.getElementById('app').innerHTML = loginHTML;
  }
}

async function showBoard() {
  document.getElementById('app').innerHTML = boardHTML;
  try {
    const results = await GK.findUsers();
    results.data.forEach(addUser);
  } catch (e) {
    console.error(e);
  }
}

function addUser(user) {
  const userList = document.querySelector('.user-list');
  if (userList) {
    userList.insertAdjacentHTML('beforeend', genUserHTML(user));
  }
}

function genUserHTML(user) {
  return `
    <li class="level">
      <div class="level-left">
        <div class="level-item">${user.id}</div>
      </div>
      <div class="level-right">
        <div class="level-item"><a href="#" id="${user.id}" class="button is-success">START</a></div>
      </div>
    </li>
    <br>
  `;
}

function initializeSession(voiceToken) {
  showBoard();
  startGKListeners();
  initIntercoms(voiceToken);
}

function startGKListeners() {
  GK.events.on('intercoms.created', (e) => {
    console.log('intercoms.created ::', e);
  });
  GK.events.on('intercoms.patched', (e) => {
    console.log('intercoms.patched ::', e);
  });
  GK.events.on('users.created', (e) => {
    console.log('users.created ::', e);
    addUser(e);
  });
  GK.events.on('users.patched', (e) => {
    console.log('users.patched ::', e);
  });
}

function stopGKListeners() {
  GK.events.removeAllListeners();
}

function showError(e) {
  const errElement = document.getElementById('error-display');
  if (errElement) {
    errElement.innerText = `Error: ${JSON.stringify(e)}`;
  } else {
    console.warn('Could not find error display element when attempting to write error to DOM');
  }
}

async function initIntercoms(voiceToken) {
  const config = {
    endpoint,
    id: voiceToken,
    protocol: 'wss',
    port: 80,
  };

  try {
    const intercomStream = await GK.connectIntercoms(config);
    document.getElementById('remote').srcObject = intercomStream;
  } catch (e) {
    console.error(e);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await GK.startSession({});
    console.log('GreenKey ::', GK);
    if (res && res.voice_token) {
      initializeSession(res.voice_token);
    } else {
      showLogin();
    }
  } catch (e) {
    showLogin(e);
  }
});

document.addEventListener('click', async (ev) => {
  switch (ev.target.id) {
    case 'signup':
      try {
        const passphrase = document.getElementById('pw-input').value;
        const userCreation = await GK.createUser({ passphrase });
        const login = await GK.startSession({ apiKey, id: userCreation.id, passphrase });
        initializeSession(login.voice_token);
      } catch (e) {
        console.error(e);

        showLogin(e);
        showError(e);
      }

      break;
    case 'login':
      let apiKey;
      let id;

      try {
        apiKey = document.getElementById('api-input').value;
        id = document.getElementById('id-input').value;
        const passphrase = document.getElementById('pw-input').value;

        const login = await GK.startSession({ apiKey, id, passphrase });
        initializeSession(login.voice_token);
      } catch (e) {
        console.error(e);

        showLogin(e);
        showError(e);

        if (apiKey) document.getElementById('api-input').value = apiKey;
        if (id) document.getElementById('id-input').value = id;
      }

      break;
    case 'logout':
      try {
        await GK.stopSession();
        stopGKListeners();
        showLogin();
      } catch (e) {
        console.error(e);
        showLogin(e);
      }

      break;
    default:
      if (ev.target.classList.contains('is-success')) {
        const targetUser = ev.target.id;
        const intercom = { targets: [targetUser] };
        try {
          const newIntercom = await GK.createIntercom(intercom);
          if (newIntercom) {
            liveIntercom = newIntercom;
            const intercomButton = ev.target;
            intercomButton.classList.replace('is-success', 'is-danger');
            intercomButton.innerText = 'STOP';
            break;
          }
        } catch (e) {
          console.error(e);
          break;
        }
      } else if (ev.target.classList.contains('is-danger')) {
        const intercom = liveIntercom;
        try {
          const stoppedIntercom = await GK.stopIntercom(intercom);
          if (stoppedIntercom) {
            liveIntercom = null;
            const intercomButton = ev.target;
            intercomButton.classList.replace('is-danger', 'is-success');
            intercomButton.innerText = 'START';
            break;
          }
        } catch (e) {
          console.error(e);
          break;
        }
      }
  }
});

const headerHTML = `
  <div class="hero-head">
    <header class="navbar">
      <div class="container">
        <div class="navbar-brand" style="border-bottom: 1px solid #45D43C;">
          <a class="navbar-item">GreenKey SDK - ES6</a>
        </div>
      </div>
    </header>
  </div>
`;

const errorBoxHTML = `
  <div class="container content" style="max-width: 600px; margin-top: 25px; color: white">
    <p id="error-display">
    </p>
  </div>
`;

const loginHTML = `
  <section class="hero is-black">
    ${headerHTML}
  </section>
  <section class="section">
    <div class="container" style="max-width: 600px; margin-bottom: 25px;">
      <div class="heading has-text-centered">
        <h1 style="color: white; margin-bottom: 10px;">Enter API Key</h1>
      </div>

      <input id="api-input" class="level-item" type="text" name="apiKey" style="margin: 0 auto;" placeholder="API Key">
    </div>
    <div class="container" style="max-width: 600px; margin-bottom: 25px;">
      <div class="heading has-text-centered">
        <h1 style="color: white; margin-bottom: 10px;">Login or Register</h1>
      </div>

      <input id="id-input" class="" type="text" name="id" placeholder="ID" style="display: block; margin: 0 auto;">
      <input id="pw-input" class="" type="password" name="passphrase" placeholder="Passphrase" style="display: block; margin: 0 auto 25px;">
      <button type="button" id="login" class="button signup" style="display: block; width: 100px; margin: 0 auto 7px; background: #45D43C; border-color: #45D43C;"> Login </button>
      <button type="button" id="signup" class="button signup" style="display: block; width: 100px; margin: 0 auto 7px;"> Register </button>

    </div>
    ${errorBoxHTML}
  </section>
`;

const boardHTML = `
<section class="hero is-black is-fullheight">
  ${headerHTML}

  <div class="hero-body">
    <div class="container has-text-centered">
      <h1 class="content">Intercoms</h1>
      <br>
      <div class="columns is-centered">
        <div class="column is-one-third"></div>
        <div class="column is-one-third">
          <ul class="user-list"></ul>
        </div>
        <div class="column is-one-third"></div>
      </div>
    </div>
  </div>

  <div class="hero-foot">
    <nav class="tabs is-boxed is-fullwidth">
      <div class="container">
        <ul>
          <li><a href="#" id="logout">End Session</a></li>
        </ul>
      </div>
    </nav>
  </div>

  <audio id="remote" autoplay></audio>

</section>
`;

