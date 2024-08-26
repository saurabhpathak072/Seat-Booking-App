


document.addEventListener("DOMContentLoaded", function () {
//   const moviesList = [
//       { name: "Flash", price: 7 },
//       { name: "Avengers", price: 10 },
//       { name: "Joker", price: 8 },
//       { name: "Toy Story", price: 6 },
//   ];

  const moviesList = [
    { movieName: "Flash", price: 7 },
    { movieName: "Spiderman", price: 5 },
    { movieName: "Batman", price: 4 },
  ];

  const selectmoviesList = document.querySelector('#selectMovie');
  const movieNameElement = document.getElementById("movieName");
  const moviePriceElement = document.getElementById("moviePrice");
  const totalPriceElement = document.getElementById("totalPrice");
  const seatContainer = document.getElementById("seatCont");
  const selectedSeatsHolder = document.getElementById("SelectedSeat");
//   const selectedSeatsHolder = document.getElementById("selectedSeatsHolder");
  const continueBtn = document.getElementById("proceedBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  const numberofSeats = document.getElementById("numberOfSeat");

  let selectedSeats = [];
  let currentMoviePrice = 7;

  // 1. Populate the dropdown
  moviesList.forEach((movie, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = `${movie.movieName} $${movie.price}`;
      selectmoviesList.appendChild(option);
  });

  // 2. Handle movie selection
  selectmoviesList.addEventListener("change", function (event) {
      const selectedMovie = moviesList[event.target.value];
      movieNameElement.textContent = selectedMovie.movieName;
      moviePriceElement.textContent = `$ ${selectedMovie.price}`;
      currentMoviePrice = selectedMovie.price;
      updateTotalPrice();
  });

  // 3. Handle seat selection
  seatContainer.querySelectorAll(".seat").forEach((seat, index) => {
      seat.addEventListener("click", function () {
          if (!seat.classList.contains("occupied")) {
              if (seat.classList.contains("selected")) {
                  seat.classList.remove("selected");
                  selectedSeats = selectedSeats.filter(seatIndex => seatIndex !== index);
              } else {
                  seat.classList.add("selected");
                  selectedSeats.push(index);
              }
              updateTotalPrice();
              updateSelectedSeatsHolder();
          }
      });
  });

  // 4. Continue button functionality
  continueBtn.addEventListener("click", function () {
      if (selectedSeats.length === 0) {
          alert("Oops no seat Selected");
      } else {
          alert("Yayy! Your Seats have been booked");
          selectedSeats.forEach(seatIndex => {
              const seat = seatContainer.querySelectorAll(".seat")[seatIndex];
              seat.classList.remove("selected");
              seat.classList.add("occupied");
          });
          selectedSeats = [];
          updateTotalPrice();
          updateSelectedSeatsHolder();
      }
  });

  // 5. Cancel button functionality
  cancelBtn.addEventListener("click", function () {
      selectedSeats.forEach(seatIndex => {
          const seat = seatContainer.querySelectorAll(".seat")[seatIndex];
          seat.classList.remove("selected");
      });
      selectedSeats = [];
      updateTotalPrice();
      updateSelectedSeatsHolder();
  });

  // 6. Helper functions
  function updateTotalPrice() {
      const totalPrice = selectedSeats.length * currentMoviePrice;
      totalPriceElement.textContent = `$ ${totalPrice}`;
  }

  function updateSelectedSeatsHolder() {
    numberofSeats.textContent = selectedSeats.length || 0;

      if (selectedSeats.length === 0) {
          selectedSeatsHolder.innerHTML = `<span class="noSelected">No Seat Selected</span>`;
      } else {
        selectedSeatsHolder.innerHTML = null;
        selectedSeats.forEach(seat=>{
            const selSeatSpan = document.createElement('span');
            selSeatSpan.classList.add("selectedSeat");
            selSeatSpan.textContent = seat;
            selectedSeatsHolder.appendChild(selSeatSpan) 
        })
      }
  }

  // Initialize with the default movie
  selectmoviesList.value = 0;
  updateTotalPrice();
});