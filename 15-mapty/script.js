'use strict';

// prettier-ignore
// const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


class Workout {

    date = new Date();
    id = (Date.now() + '').slice(-10); //take the last 10 numbers
    clicks = 0;


    constructor(coords, distance, duration) {
        this.coords = coords; //array of lat, lng [lat, lng]
        this.distance = distance; //in km
        this.duration = duration; //in min
    }

    _setDescription() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.description = `${this._type[0].toUpperCase()}${this._type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
    }

    click() {
        this.clicks++;
    }
}

class Running extends Workout {
    _type = 'running';
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();
    }

    calcPace() {
        //define the pace in min/km
        return this.pace = this.duration / this.distance;
    }
}

class Cycling extends Workout {
    _type = 'cycling';
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription();
    }

    calcSpeed() {
        //km/h
        return this.speed = this.distance / (this.duration / 60);
    }
}

const run1 = new Running([45, -34], 5.3, 28, 163);
const cycle1 = new Cycling([33, -43], 5.4, 56, 34);

console.log(run1, cycle1);

class App {

    _mapZoomLevel = 13;
    _map;
    _mapEvent;
    _workouts = [];

    constructor() {
        //get user position
        this._getPosition();

        //get data from local storage
        this._getLocalStorage();

        //Attach event handler
        form.addEventListener('submit', this._newWorkout.bind(this)); //bind 'this' to class instead of form
        inputType.addEventListener('change', this._toggleElevationField);
        containerWorkouts.addEventListener('click', this._movetoPopup.bind(this));
    }

    _getPosition() {
        /**
        * Geolocation API
        * 
        * this function takes two call-back functions, first one is when it is successful.
        * second one is when it fails. 
        */
        if (navigator.geolocation) { //check if the api exists in-case the browser is old
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),
                function () {
                    console.log('Did not get your position');
                });
        }
    }

    _loadMap(position) {
        // console.log(position);
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        console.log(latitude, longitude);

        const coords = [latitude, longitude];

        /**
         * Displaying map using Leaflet library
         */
        this._map = L.map('map').setView(coords, this._mapZoomLevel);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this._map);

        //Adding the marker
        console.log(this._map);
        //handle clicks on map
        this._map.on('click', this._showForm.bind(this));

        this._workouts.forEach(work => {
            this._renderWorkoutMarker(work);
        })
    }

    _showForm(mapE) {
        this._mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
    }

    _hideForm() {

        //clear input fields
        inputDistance.value = inputDuration.value = inputElevation.value = inputCadence.value = '';
        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(() => form.style.display = 'grid', 1000);
    }

    _toggleElevationField() {
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }

    _newWorkout(e) {
        //will return true only if all inputs are of type number
        const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp));
        const allPositive = (...inputs) => inputs.every(inp => inp > 0);

        e.preventDefault();

        //get form data
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        const { lat, lng } = this._mapEvent.latlng;
        let workout;
        //validate form data


        //if running, create running object
        if (type === 'running') {
            const cadence = +inputCadence.value;
      
            // Check if data is valid
            if (
              // !Number.isFinite(distance) ||
              // !Number.isFinite(duration) ||
              // !Number.isFinite(cadence)
              !validInputs(distance, duration, cadence) ||
              !allPositive(distance, duration, cadence)
            )
              return alert('Inputs have to be positive numbers!');
      
            workout = new Running([lat, lng], distance, duration, cadence);
          }

        //if cycling, create cycling object
        if (type === 'cycling') {
            const elevation = +inputElevation.value;

            if (
                !validInputs(distance, duration, elevation) ||
                !allPositive(distance, duration)
            ) return console.error('Inputs have to be positive');

            workout = new Running([lat, lng], distance, duration, elevation);
        }

        //add new object to workout array
        this._workouts.push(workout);
        console.log(this._workouts);

        //render workout on map as marker
        this._renderWorkoutMarker(workout);

        //render workout on a list
        this._renderWorkout(workout);
        //hide form and clear input fields

        //clear input fields + hide form
        this._hideForm();


        //set local storage to all workouts
        this._setLocalStorage();
    }


    _renderWorkoutMarker (workout) {
        //Display Marker
        console.log(this._mapEvent);


        L.marker(workout.coords)
        .addTo(this._map)
        .bindPopup(L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: `${workout._type}-popup`, //css class name to style the popup
        }))
            .setPopupContent(`${workout._type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`)
            .openPopup();
    }

    _renderWorkout(workout) {
        let html = `
        <li class="workout workout--${workout._type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${
              workout._type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
      `;
  
      if (workout._type === 'running')
        html += `
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
        `;
  
      if (workout._type === 'cycling')
        html += `
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>
        `;
  
      form.insertAdjacentHTML('afterend', html);
    }

    _movetoPopup(e) {
        // select the closes workout in the map index 
        const workoutEl = e.target.closest('.workout');
        console.log(workoutEl);

        if(!workoutEl) return;

        const workout = this._workouts.find(work => work.id === workoutEl.dataset.id);
        console.log(workout);

        this._map.setView(workout.coords, this._mapZoomLevel, {
            animate: true,
            pan: {
                duration: 1
            },
        });

        //using the public interface
        // workout.click(); //objects coming from localstorage don't have access to parent prototype
    }

    _setLocalStorage() {
        //use local storage API
        localStorage.setItem('workouts', JSON.stringify(this._workouts));
    }

    _getLocalStorage() {
        const data = JSON.parse(localStorage.getItem('workouts'));
        console.log(data);

        if(!data) return;

        this._workouts = data;

        this._workouts.forEach(work => {
            this._renderWorkout(work);

        })
    }

    reset() {
        localStorage.removeItem('workouts');
        //location is an Object from the browers, one of the methods is to reload the page
        location.reload();
    }
}


const app = new App();
