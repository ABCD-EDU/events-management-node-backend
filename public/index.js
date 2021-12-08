const subNav = document.getElementById("eventContainer");

async function fetchAsync(url) {
  let response = await fetch(url, {
      method: "GET"
  });
  let data = await response.json();
  return data;
}

const generateEvents = () => {
  const data = fetchAsync("events/1");
  const { eventName, address, date, time, description, status } = data;

  subNav.innerHTML += `
        <section id="card">
            <div id="info">
                <h2 id="event-name">${eventName}</h2>
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
};

window.onload = generateEvents();
