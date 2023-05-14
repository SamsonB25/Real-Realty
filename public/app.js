const propertiesContainer = document.getElementById("properties-container");

async function getproperties() {
  try {
    const response = await axios.get("/properties");
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

const displayProperty = async () => {
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

displayProperty();
