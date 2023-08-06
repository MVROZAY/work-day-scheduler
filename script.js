$(function () {
  // Function to get the current hour in 24-hour format
  function getCurrentHour() {
    return parseInt(dayjs().format('H'));
  }

  // Function to set the class for each time-block based on past, present, or future
  function updateTimeBlockClasses() {
    const currentHour = getCurrentHour();

    $('.time-block').each(function () {
      const hour = parseInt($(this).attr('id').split('-')[1]);

      if (hour < currentHour) {
        $(this).removeClass('present future').addClass('past');
      } else if (hour === currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }

  // Function to load saved events from local storage and display them on the page
  function loadSavedEvents() {
    $('.time-block').each(function () {
      const hour = $(this).attr('id');
      const event = localStorage.getItem(hour);

      $(this).find('.description').val(event);
    });
  }

  // Function to save an event to local storage
  function saveEvent(hour, event) {
    localStorage.setItem(hour, event);
  }

  // Function to display the current date in the header
  function displayCurrentDate() {
    const currentDate = dayjs().format('dddd, MMMM D, YYYY');
    $('#currentDay').text(currentDate);
  }

  // Generate time blocks for standard business hours (9am to 5pm)
  function generateTimeBlocks() {
    const container = $('.container-fluid');

    for (let hour = 9; hour <= 17; hour++) {
      let displayHour = hour;
      let amPm = 'AM';
    
      if (hour > 12) {
        displayHour = hour - 12;
        amPm = 'PM';
      }
    
      const timeBlock = $(`
        <div id="hour-${hour}" class="row time-block">
          <div class="col-2 col-md-1 hour text-center py-3">${displayHour}${amPm}</div>
          <textarea class="col-8 col-md-10 description" rows="3"></textarea>
          <button class="btn saveBtn col-2 col-md-1" aria-label="save">
            <i class="fas fa-save" aria-hidden="true"></i>
          </button>
        </div>
      `);
    
      container.append(timeBlock);
    }
    

  }

  // Add a click event listener to the save button
  $('.container-fluid').on('click', '.saveBtn', function () {
    const hour = $(this).parent().attr('id');
    const event = $(this).prev().val();
    saveEvent(hour, event);
  });

  // Display the current date in the header
  displayCurrentDate();

  // Generate time blocks for standard business hours
  generateTimeBlocks();

  // Apply the past, present, or future class to each time-block
  updateTimeBlockClasses();

  // Load saved events from local storage
  loadSavedEvents();

  // Update time-block classes every minute to handle the change of present/future blocks
  setInterval(updateTimeBlockClasses, 60000);
});
