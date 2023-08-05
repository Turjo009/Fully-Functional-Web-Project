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
        events1: [],
        updates1: [],

        clubName1: "Drama Club",
        clubDetails1: "A club for all those interested in live acting and performance.",
        clubImageUrl1: "https://media.zicxa.com/16710",
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
            this.events1.push(data);
            localStorage.setItem('events1', JSON.stringify(this.events1));
        },

        deleteEvent(indexEvent1){
            this.events1.splice(indexEvent1,1);
            localStorage.setItem('events1', JSON.stringify(this.events1));
        },

        editEvent(indexEvent1){
            this.eventData.date = (new Date()).toLocaleString();
            let data = (JSON.parse(JSON.stringify(this.eventData)));
            data.event_id = this.events[indexEvent1].event_id;
            this.events1.splice(indexEvent1,1,data);
            localStorage.setItem('events1', JSON.stringify(this.events1));
        },


        createUpdates(){
                this.updatesData.date = (new Date()).toLocaleString();
                let data = (JSON.parse(JSON.stringify(this.updatesData)));
                this.updates1.push(data);
                localStorage.setItem('updates1', JSON.stringify(this.updates1));
        },

        deleteUpdates(indexUpdates1){
                this.updates1.splice(indexUpdates1, 1);
                localStorage.setItem('updates1', JSON.stringify(this.updates1));
        },

        editClubDetails() {
            const newName = prompt('Enter the new club name:');
            const newDetails = prompt('Enter the new club details:');
            const newImageUrl = prompt('Enter the new club image url:');

            if (newName && newDetails && newImageUrl) {
              this.clubName1 = newName;
              this.clubDetails1 = newDetails;
              this.clubImageUrl1 = newImageUrl;

              // Store the data into local storage
              localStorage.setItem('clubName1', newName);
              localStorage.setItem('clubDetails1', newDetails);
              localStorage.setItem('clubImageUrl1', newImageUrl);
            }
          },
        fetchEventMembers(eventIndex1) {
            axios.get('/getEventMembers1', { params: { event_id: this.events1[eventIndex1].event_id } })
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
        if (localStorage.getItem('updates1')) {
          // Parse the stored string back into an array of updates.
          this.updates1 = JSON.parse(localStorage.getItem('updates1'));
        }
        if (localStorage.getItem('events1')) {
            this.events1 = JSON.parse(localStorage.getItem('events1'));
          }
            // Retrieve club details from local storage
  if (localStorage.getItem('clubName1')) {
    this.clubName1 = localStorage.getItem('clubName1');
  }
  if (localStorage.getItem('clubDetails1')) {
    this.clubDetails1 = localStorage.getItem('clubDetails1');
  }
  if (localStorage.getItem('clubImageUrl1')) {
    this.clubImageUrl1 = localStorage.getItem('clubImageUrl1');
  }
      }



  }).mount('#app');
