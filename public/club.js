Vue.createApp({
    data() {
      return {
        message: "hello Vue",
        eventData: {
            title: " ",
            date: " ",
            location: " ",
            description: " ",
            isPrivate: false
        },

        updatesData: {
            title: " ",
            date: " ",
            description: " ",
            isPrivate: false
        },
        events: [],
        updates: [],

        clubName: "Tennis Club",
        clubDetails: "A place for all tennis enthusiasts to get together, hang out and play some games!",
        clubImageUrl: "https://media.zicxa.com/16710",
        eventId: localStorage.getItem('eventId') ? JSON.parse(localStorage.getItem('eventId')) : 1,
        eventMembers: []

      };
    },

    methods: {
        createEvent(){
            this.eventData.date = (new Date()).toLocaleString();
            let data = (JSON.parse(JSON.stringify(this.eventData)));
            data.event_id = this.eventId++;
            localStorage.setItem('eventId', JSON.stringify(this.eventId));
            this.events.push(data);
            localStorage.setItem('events', JSON.stringify(this.events));
        },

        deleteEvent(indexEvent){
            this.events.splice(indexEvent,1);
            localStorage.setItem('events', JSON.stringify(this.events));
        },

        editEvent(indexEvent){
            this.eventData.date = (new Date()).toLocaleString();
            let data = (JSON.parse(JSON.stringify(this.eventData)));
            data.event_id = this.events[indexEvent].event_id;
            this.events.splice(indexEvent,1,data);
            localStorage.setItem('events', JSON.stringify(this.events));
        },


        createUpdates(){
                this.updatesData.date = (new Date()).toLocaleString();
                let data = (JSON.parse(JSON.stringify(this.updatesData)));
                this.updates.push(data);
                localStorage.setItem('updates', JSON.stringify(this.updates));
        },

        deleteUpdates(indexUpdates){
                this.updates.splice(indexUpdates, 1);
                localStorage.setItem('updates', JSON.stringify(this.updates));
        },

        editClubDetails() {
            const newName = prompt('Enter the new club name:');
            const newDetails = prompt('Enter the new club details:');
            const newImageUrl = prompt('Enter the new club image url:');

            if (newName && newDetails && newImageUrl) {
              this.clubName = newName;
              this.clubDetails = newDetails;
              this.clubImageUrl = newImageUrl;

              // Store the data into local storage
              localStorage.setItem('clubName', newName);
              localStorage.setItem('clubDetails', newDetails);
              localStorage.setItem('clubImageUrl', newImageUrl);
            }
          },
        fetchEventMembers(eventIndex) {
            axios.get('/getEventMembers', { params: { event_id: this.events[eventIndex].event_id } })
              .then(response => {
                this.eventMembers = response.data;
              })
              .catch(error => {
                console.error(error);
              });
          }



    },
    mounted() {
        // Check if there are any updates stored in localStorage.
        if (localStorage.getItem('updates')) {
          // Parse the stored string back into an array of updates.
          this.updates = JSON.parse(localStorage.getItem('updates'));
        }
        if (localStorage.getItem('events')) {
            this.events = JSON.parse(localStorage.getItem('events'));
          }
            // Retrieve club details from local storage
  if (localStorage.getItem('clubName')) {
    this.clubName = localStorage.getItem('clubName');
  }
  if (localStorage.getItem('clubDetails')) {
    this.clubDetails = localStorage.getItem('clubDetails');
  }
  if (localStorage.getItem('clubImageUrl')) {
    this.clubImageUrl = localStorage.getItem('clubImageUrl');
  }
      }



  }).mount('#app');
