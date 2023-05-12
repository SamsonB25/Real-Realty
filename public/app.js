const testDiv = document.getElementById("test");

async function getproperties() {
  try {
    const response = await axios.get(
      "https://real-realty.onrender.com/properties"
    );
    console.log(response.data);
  } catch (error) {}
}
getproperties();

async function getRealtors() {
  try {
    const response = await axios.get(
      "https://real-realty.onrender.com/realtors"
    );
    console.log(response.data);
  } catch (error) {}
}
getRealtors();
