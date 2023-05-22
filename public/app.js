const propertiesContainer = document.getElementById("properties-container");

// start of data fetching
async function getproperties() {
  try {
    const response = await axios.get("/home");
    const data = response.data;
    return data;
  } catch (error) {
    console.error(err);
  }
}

async function getPropertiesByState(stateID) {
  try {
    const response = await axios.get(`/properties/${stateID}`);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function getRealtors() {
  try {
    const response = await axios.get("/realtors");
    const data = response.data;
    return data;
  } catch (error) {}
}
// gets specific realtors
async function getRealtor(id) {
  try {
    const response = await axios.get(`/realtor/${id}`);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error(err);
  }
}

// end of data fetching
// start of display features

const displayProperties = async () => {
  try {
    const propertyData = await getproperties();
    propertyData.forEach((obj) => {
      obj.date_posted = luxon.DateTime.fromISO(obj.date_posted).toFormat(
        "dd LLL yyyy"
      );

      if (obj.images === null) {
        obj.images = "/images/no-image.jpg";
      }

      if (obj.price.length >= 8) {
        obj.price = obj.price.slice(0, 8);
      } else if (obj.price.length >= 10) {
        obj.price = obj.price.slice(0, 10);
      }
      const html = `
    <div class="property-card">
    <div id = "heart" class="save fa-heart"></div>
      <div class="property-img">
        <img src="${obj.images}">
      </div>
      <div class="property-info">
        <div class="price id">${obj.price}<div class="prop-id">${obj.id}</div></div>
        <p>${obj.bed} Bed  ${obj.bath} Bath   ${obj.sqft} Sqft
        </br>${obj.street_address}, ${obj.city}, ${obj.states_id} ${obj.zipcode}
        </br>${obj.date_posted}</p>
          <div class="property-card-footer">
            Realtor:
            <a class="realtor-link" href="">
               ${obj.first_name} ${obj.last_name}
            </a>
          </div>  
      </div>
    </div>`;
      propertiesContainer.insertAdjacentHTML("afterbegin", html);
    });
    propertyCardTimer(); // loads cards
    selectCard();
    saveBtnEvent();
  } catch (error) {}
};

// allows for the property card to be loaded in from dom
const propertyCardTimer = async () => {
  setTimeout(async () => {
    const propertyCards = document.querySelectorAll(".property-card");
    propertyCards.forEach((propertyCard) => {
      propertyCard.addEventListener("click", () => {
        propertyCard.classList.toggle("selected-property");
        console.log("card selected");
      });
    });
  }, 1000);
};

const selectCard = async () => {
  const propertyCards = document.querySelectorAll(".property-card");
  propertyCards.forEach((propertyCard) => {
    propertyCard.addEventListener("click", () => {
      propertyCard.classList.toggle("selected-property");
    });
  });
};

// home screen loads all properties
displayProperties();
setTimeout(() => {
  // still needs work
  const storedClassName = localStorage.getItem("saved-card");
  console.log("loaded");
  if (storedClassName) {
    const element = document.querySelectorAll("#heart");
    element.forEach((card) => {
      card.classList.add(storedClassName);
    });
  }
}, 1500);

// clicking logo also shows all properties
const logo = document.querySelector("#home-link");
logo.addEventListener("click", async () => {
  propertiesContainer.innerHTML = "";
  displayProperties();
});

// displays properties users has saved
const savedProperties = document.querySelector("#saved-properties-link"); // almost complete
savedProperties.addEventListener("click", async () => {
  propertiesContainer.innerHTML = "";
  try {
    const res = await axios(
      `/users/liked_properties/${localStorage.getItem("username")}`
    );
    const savedProperties = res.data;
    savedProperties.forEach((obj) => {
      obj.date_posted = luxon.DateTime.fromISO(obj.date_posted).toFormat(
        "dd LLL yyyy"
      );

      if (obj.images === null) {
        obj.images = "/images/no-image.jpg";
      }
      const html = `
    <div class="property-card">
      <div class="property-img">
      <div id = "heart" class="save fa-heart"></div>
        <img src="${obj.images}">
      </div>
      <div class="property-info">
        <div class="price id">${obj.price}<div class="prop-id">${obj.id}</div></div>
        <p>${obj.bed} Bed  ${obj.bath} Bath   ${obj.sqft} Sqft
        </br>${obj.street_address}, ${obj.city}, ${obj.states_id} ${obj.zipcode}
        </br>${obj.date_posted}</p>
          <div class="property-card-footer">
            Realtor:
            <a class="realtor-link" href="">
               ${obj.first_name} ${obj.last_name}
            </a>
          </div>  
      </div>
    </div>`;
      propertiesContainer.insertAdjacentHTML("afterbegin", html);
      saveBtnEvent();
    });
  } catch (error) {
    console.error(error);
  }
});

const saveBtnEvent = async () => {
  const propertyCards = document.querySelectorAll(".property-card");
  propertyCards.forEach((propertyCard) => {
    const savePropertyBtn = propertyCard.querySelector("#heart");
    savePropertyBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      const username = localStorage.getItem("username");
      const propID = Number(propertyCard.querySelector(".prop-id").textContent);
      const saved = savePropertyBtn.classList.toggle("saved");
      if (saved) {
        const savedCard = document.getElementById("heart");
        savedCard.classList.add("saved");
        console.log(savedCard.className.slice(14));
        localStorage.setItem("saved-card", savedCard.className.slice(14));
        const sendSavedProp = await axios.patch(
          `/users/liked/${username}/${propID}`
        );
        console.log();
      } else {
        console.log(propID);
        localStorage.removeItem("saved-property");
        const sendSavedProp = await axios.patch(
          `/users/remove/${username}/${propID}`
        );
        console.log(sendSavedProp.data);
      }
    });
  });
};

// selector drop down search shows properties by state
const stateSelect = document.getElementById("by-state");
stateSelect.addEventListener("change", async (e) => {
  try {
    propertiesContainer.innerHTML = "";
    const selectedState = e.target.value;
    const displayState = await getPropertiesByState(selectedState);
    displayState.forEach((obj) => {
      console.log(obj);
      obj.date_posted = luxon.DateTime.fromISO(obj.date_posted).toFormat(
        "dd LLL yyyy"
      );

      if (obj.images === null) {
        obj.images = "/images/no-image.jpg";
      }
      const html = `
    <div class="property-card">
      <div class="property-img">
      <div id = "heart" class="save fa-heart"></div>
        <img src="${obj.images}">
      </div>
      <div class="property-info">
        <div class="price id">${obj.price}<div class="prop-id">${obj.property_id}</div></div>
        <p>${obj.bed} Bed  ${obj.bath} Bath   ${obj.sqft} Sqft
        </br>${obj.street_address}, ${obj.city}, ${obj.state_id} ${obj.zipcode}
        </br>${obj.date_posted}</p>
          <div class="property-card-footer">
            Realtor:
            <a class="realtor-link" href="">
               ${obj.first_name} ${obj.last_name}
            </a>
          </div>  
      </div>
    </div>`;
      propertiesContainer.insertAdjacentHTML("afterbegin", html);
    });
    await propertyCardTimer();
  } catch (err) {
    console.error(err);
  }
});

// start crud features
// Add listing code below

const listingForm = document.querySelector("#listing-form");
const listingSubmitButton = document.getElementById("submit-listing");
listingSubmitButton.onclick = async (e) => {
  e.preventDefault();
  const streetAddress = document.querySelector("#street-address").value;
  const city = document.querySelector("#city").value;
  const stateId = document.querySelector("#state-id").value.toUpperCase();
  const zipcode = document.querySelector("#zipcode").value;
  const price = document.querySelector("#price").value;
  const bed = document.querySelector("#bed").value;
  const bath = document.querySelector("#bath").value;
  const sqft = document.querySelector("#sqft").value;
  const image = document.querySelector("#img").value;
  const realtorId = document.querySelector("#realtor-id").value;

  const formData = {
    street_address: streetAddress,
    city: city,
    states_id: stateId,
    zipcode: zipcode,
    price: price,
    bed: bed,
    bath: bath,
    sqft: sqft,
    images: image,
    realtors_id: realtorId,
  };

  if (formData.images === "") {
    formData.images = null;
  }
  axios
    .post("/properties", formData, console.log(formData), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error.response);
    });
  listingForm.reset();
  location.reload();
};

// modal to add listing to properties
const aListingModal = document.getElementById("a-listing");
const aListingBtn = document.getElementById("add-listing");
const aSpan = document.getElementsByClassName("a-close")[0];

// When the user clicks on the button, open the modal
aListingBtn.onclick = () => {
  aListingModal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
aSpan.onclick = () => {
  aListingModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target == aListingModal) {
    aListingModal.style.display = "none";
  }
};

// Delete listing code below

const delForm = document.querySelector(".delete-listing-form");
const listingRemoveButton = document.querySelector("#remove-listing");
listingRemoveButton.onclick = async (e) => {
  e.preventDefault();
  const streetAddress = document.querySelector("#d-street-address").value;
  const city = document.querySelector("#d-city").value;
  const stateId = document.querySelector("#d-state-id").value.toUpperCase();

  const formData = {
    street_address: streetAddress,
    city: city,
    states_id: stateId,
  };

  axios
    .delete(`/properties/${streetAddress}/${city}/${stateId}`, formData)
    .then((res) => {
      alert(`Removed Property Located at:\n
      ${formData.street_address},${formData.city} ${formData.states_id}`);
      console.log(res);
    })
    .catch((error) => {
      console.log(error.response.data.Error);
    });
  location.reload();
  delForm.reset();
};

const dListingModal = document.getElementById("d-listing");
const dListingBtn = document.getElementById("delete-listing");
const dSpan = document.getElementsByClassName("d-close")[0];

// When the user clicks on the button, open the modal
dListingBtn.onclick = () => {
  dListingModal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
dSpan.onclick = () => {
  dListingModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target == dListingModal) {
    dListingModal.style.display = "none";
  }
};

// Update listing code below

const updateForm = document.querySelector("#update-form");
const listingPatchButton = document.querySelector("#update-listing");
listingPatchButton.onclick = async (e) => {
  e.preventDefault();
  const streetAddress = document.querySelector("#p-street-address").value;
  const city = document.querySelector("#p-city").value;
  const stateId = document.querySelector("#p-state-id").value.toUpperCase();
  const zipcode = document.querySelector("#p-zipcode").value;
  const price = document.querySelector("#p-price").value;
  const bed = document.querySelector("#p-bed").value;
  const bath = document.querySelector("#p-bath").value;
  const sqft = document.querySelector("#p-sqft").value;
  const image = document.querySelector("#p-img").value;
  const realtorId = document.querySelector("#p-realtor-id").value;

  const formData = {
    street_address: streetAddress,
    city: city,
    states_id: stateId,
    zipcode: zipcode,
    price: price,
    bed: bed,
    bath: bath,
    sqft: sqft,
    images: image,
    realtors_id: realtorId,
  };
  debugger;
  if (formData.images === "") {
    formData.images = null;
  }
  for (let val in formData) {
    if (formData[val] === "") {
      formData[val] = undefined;
    }
  }
  console.log(formData);
  axios
    .patch(
      `/properties/${streetAddress}/${city}/${stateId}`,
      formData,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      alert(`Updated Property Located at:\n
      ${formData.street_address},${formData.city} ${formData.states_id}`);
      console.log(res.data);
      location.reload();
    })
    .catch((error) => {
      console.log(error.response);
    });
  updateForm.reset();
};

// display patch listing modal
const pListingModal = document.getElementById("p-listing");
const pListingBtn = document.getElementById("patch-listing");
const pSpan = document.getElementsByClassName("p-close")[0];

// When the user clicks on the button, open the modal
pListingBtn.onclick = () => {
  pListingModal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
pSpan.onclick = () => {
  pListingModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target == pListingModal) {
    pListingModal.style.display = "none";
  }
};

// end of crud features
// start user management

// user login
const loginForm = document.querySelector("#user-login-form");
const loginBtn = document.querySelector("#user-login-btn");
loginBtn.onclick = async (e) => {
  e.preventDefault();
  const username = document.querySelector("#user-username").value;
  const password = document.querySelector("#user-password").value;
  const formData = {
    username: username,
    password: password,
  };
  try {
    const res = await axios.post(
      `user/login/${formData.username}/${formData.password}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const token = res.data.accessToken;
    const username = res.data.username;
    if (token) {
      console.log("token");

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      location.reload();
    }
  } catch (err) {
    alert("Invalid Username or Password");
    console.error(err);
    loginForm.reset();
  }
};

// modal to log user in
const userLoginModal = document.getElementById("user-login");
const userLoginBtn = document.querySelector("#login-link");
const userSpan = document.getElementsByClassName("user-close")[0];

// When the user clicks on the button, open the modal
userLoginBtn.addEventListener("click", () => {
  userLoginModal.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
userSpan.onclick = () => {
  userLoginModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target == userLoginModal) {
    userLoginModal.style.display = "none";
  }
};

// user sign up
const registerBtn = document.querySelector("#user-register-btn");
const registerForm = document.querySelector(".user-register-form");
registerBtn.onclick = () => {
  const username = document.querySelector("#register-username").value;
  const password = document.querySelector("#register-password").value;
  const phone = document.querySelector("#register-phone").value;
  const email = document.querySelector("#register-email").value;

  const formData = {
    username: username,
    password: password,
    phone: phone,
    email: email,
  };

  axios
    .post("/user/signup", formData, console.log(formData), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      alert("Username Already Exists.");
      console.log(error.response);
      registerForm.reset();
    });
  location.reload();
};

const userRegisterModal = document.querySelector("#user-register");
const userRegisterBtn = document.querySelector("#register-link");
const registerSpan = document.getElementsByClassName("register-close")[0];

// When the user clicks on the button, open the modal
userRegisterBtn.addEventListener("click", () => {
  userRegisterModal.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
registerSpan.onclick = () => {
  userRegisterModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target == userRegisterModal) {
    userRegisterModal.style.display = "none";
  }
};

// user logout
const logoutLink = document.querySelector("#logout-link");
logoutLink.addEventListener("click", () => {
  localStorage.removeItem("token");
  location.reload();
});

// end of user management

// nav bar dom manipulation and mobile events
// nav button display if token is present or not
const realtorHub = document.querySelector(".realtor-hub");
if (localStorage.getItem("token")) {
  userLoginBtn.style.display = "none";
  userRegisterBtn.style.display = "none";
} else {
  logoutLink.style.display = "none";
  realtorHub.style.display = "none";
  savedProperties.style.display = "none";
}

const mobileNavItems = document.querySelector("#nav-list");
const mobileMenuBar = document.querySelector("#toggle-menu");
mobileMenuBar.addEventListener("click", () => {
  mobileNavItems.classList.toggle("active");
});
