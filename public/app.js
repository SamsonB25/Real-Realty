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
      const html = `
    <div class="property-card">
      <div class="property-img">
        <img src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg">
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

// modal to add listing to properties
const listingModal = document.getElementById("listing");
const listingBtn = document.getElementById("add-listing");
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
listingBtn.onclick = function () {
  listingModal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  listingModal.style.display = "none";
};

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == listingModal) {
//     listingModal.style.display = "none";
//   }
// };

// submit button that when submited creates listing
const listingSubmitButton = document.getElementById("submit-listing");
listingSubmitButton.onclick = () => {
  const streetAddress = document.querySelector(".street-address").value;
  const city = document.querySelector(".city").value;
  const stateId = document.querySelector(".state-id").value;
  const zipcode = document.querySelector(".zipcode").value;
  const price = document.querySelector(".price").value;
  const bed = document.querySelector(".bed").value;
  const bath = document.querySelector(".bath").value;
  const sqft = document.querySelector(".sqft").value;
  const realtorId = document.querySelector(".realtor-id").value;

  const formData = {
    street_address: streetAddress,
    city: city,
    states_id: stateId.toUpperCase(),
    zipcode: zipcode,
    price: price,
    bed: bed,
    bath: bath,
    sqft: sqft,
    realtors_id: realtorId,
  };

  axios
    .post("/properties", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      alert(error.response.data.Error);
    });
};
