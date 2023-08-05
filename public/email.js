function sendEmail(email, username, event_title, event_location, event_description) {
  fetch('/send-email/event', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, username, event_title, event_location, event_description })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function sendUpdate(email, username, update_title, update_description) {
  fetch('/send-email/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, username, update_title, update_description })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function sendEmailsToMembers(event_title, event_location, event_description) {
  fetch('/club-members')
    .then(response => response.json())
    .then(data => {
      const members = data.members.filter(member => member.email !== null);
      const membersEmails = members.map(member => member.email);
      const membersUsernames = members.map(member => member.username);

      membersEmails.forEach((email, index) => {
        sendEmail(
          email,
          membersUsernames[index],
          event_title,
          event_location,
          event_description
        );
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function sendUpdatesToMembers(update_title, update_description) {
  fetch('/club-members')
    .then(response => response.json())
    .then(data => {
      const members = data.members.filter(member => member.email !== null);
      const membersEmails = members.map(member => member.email);
      const membersUsernames = members.map(member => member.username);

      membersEmails.forEach((email, index) => {
        sendUpdate(
          email,
          membersUsernames[index],
          update_title,
          update_description
        );
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const createEventForm = document.querySelector('#create_event');

    createEventForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const event_title = document.querySelector('#event_title').value;
      const event_location = document.querySelector('#event_location').value;
      const event_description = document.querySelector('#event_description').value;

      if (event_title.trim() !== '' && event_location.trim() !== '' && event_description.trim() !== '') {
        sendEmailsToMembers(event_title, event_location, event_description);
      } else {
        console.log('Please fill in all the required fields.');
      }
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    const createUpdateForm = document.querySelector('#create_updates');

    createUpdateForm.addEventListener('submit', (update) => {
      update.preventDefault();
      const update_title = document.querySelector('#title').value;
      const update_description = document.querySelector('#description').value;

      if (update_title.trim() !== '' && update_description.trim() !== '') {
        sendUpdatesToMembers(update_title, update_description);
      } else {
        console.log('Please fill in all the required fields.');
      }
    });
  });
