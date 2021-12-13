async function fetchAsync(url) {
  let response = await fetch(url, {
    method: "GET",
  });
  let data = await response.json();
  return data;
}

const generateEvents = () => {
  const subNav = document.getElementById("events");

  fetchAsync("events/category/all").then((data) => {
    const _data = data;
    for (var i = 0; i < _data.length; i++) {
      const { name, address, date, time, description, status, category } =
        _data[i];
      subNav.innerHTML += `
      <section id="card">
          <div id="info">
              <h2 id="event-name">${name}</h2>
              <h3 id="address">${address}</h3>
              <h3 id="date">${date}</h3>
              <h3 id="time">${time}</h3>
              <p id="description">${description}</p>
          </div>
          <div id="footer">
              <h3 id="status">STATUS: ${status}</h3>
              <div id="buttons">
                  <button id="join">JOIN</button>
                  <button id="leave">LEAVE</button>
              </div>
          </div>
      </section>
      `;
    }
  });
};

window.onload = generateEvents();
