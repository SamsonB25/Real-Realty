const testDiv = document.getElementById("test");

async function getproperties() {
  try {
    const response = await axios.get(
      "https://real-realty.onrender.com/properties"
    );
    console.log(response);
  } catch (error) {}
}
getproperties();
