const propertiesContainer = document.getElementById("properties-container");

async function getproperties() {
  try {
    const response = await axios.get("/home");
    const data = response.data;
    return data;
  } catch (error) {}
}

async function getRealtors() {
  try {
    const response = await axios.get("/realtors");
    const data = response.data;
    return data;
  } catch (error) {}
}

async function getRealtor(id) {
  try {
    const response = await axios.get(`/realtor/${id}`);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {}
}

const displayProperties = async () => {
  try {
    const propertyData = await getproperties();
    propertyData.forEach((obj) => {
      if (obj.images === null) {
        obj.images = "/images/no-image.jpg";
      }
      const html = `
    <div class="property-card">
      <div class="property-img">
        <img src="${obj.images}">
      </div>
      <div class="property-info">
        <p><span class="price">${obj.price}</span>
        </br>${obj.bed} Bed  ${obj.bath} Bath   ${obj.sqft} Sqft
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
  } catch (error) {}
};

displayProperties();

// Add listing code below
const listingForm = document.getElementsByClassName("listing-form");
const listingSubmitButton = document.getElementById("submit-listing");
listingForm.onsubmit = async (e) => {
  e.preventDefault();
  const streetAddress = document.querySelector(".street-address").value;
  const city = document.querySelector(".city").value;
  const stateId = document.querySelector(".state-id").value.toUpperCase();
  const zipcode = document.querySelector(".zipcode").value;
  const price = document.querySelector(".price").value;
  const bed = document.querySelector(".bed").value;
  const bath = document.querySelector(".bath").value;
  const sqft = document.querySelector(".sqft").value;
  const realtorId = document.querySelector(".realtor-id").value;

  const formData = {
    street_address: streetAddress,
    city: city,
    states_id: stateId,
    zipcode: zipcode,
    price: price,
    bed: bed,
    bath: bath,
    sqft: sqft,
    images: "/images/no-image.jpg",
    realtors_id: realtorId,
  };

  await axios
    .post("/properties", formData, {
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
  alert("Property added");
  listingForm.reset();
};

// modal to add listing to properties
const aListingModal = document.getElementById("a-listing");
const aListingBtn = document.getElementById("add-listing");
const aSpan = document.getElementsByClassName("a-close")[0];

// When the user clicks on the button, open the modal
aListingBtn.onclick = function () {
  aListingModal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
aSpan.onclick = function () {
  aListingModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == aListingModal) {
    aListingModal.style.display = "none";
  }
};
// Delete listing code below
const delForm = document.getElementsByClassName("delete-listing-form");
const listingRemoveButton = document.getElementById("remove-listing");
listingRemoveButton.onsubmit = async (e) => {
  e.preventDefault();
  const streetAddress = document.querySelector(".d-street-address").value;
  const city = document.querySelector(".d-city").value;
  const stateId = document.querySelector(".d-state-id").value.toUpperCase();

  const formData = {
    street_address: streetAddress,
    city: city,
    states_id: stateId,
  };

  axios
    .delete(
      `/properties/${streetAddress}/${city}/${stateId}`,
      formData,
      alert("property Removed")
    )
    .then((res) => {
      location.reload();
    })
    .catch((error) => {
      console.log(error.response.data.Error);
    });
  delForm.reset();
};

const dListingModal = document.getElementById("d-listing");
const dListingBtn = document.getElementById("delete-listing");
const dSpan = document.getElementsByClassName("d-close")[0];

// When the user clicks on the button, open the modal
dListingBtn.onclick = function () {
  dListingModal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
dSpan.onclick = function () {
  dListingModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == dListingModal) {
    dListingModal.style.display = "none";
  }
};
