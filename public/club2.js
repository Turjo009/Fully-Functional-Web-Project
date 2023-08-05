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
        events2: [],
        updates2: [],

        clubName2: "Film Club",
        clubDetails2: "A club for fans of cinema to get together, watch and discuss our favourite films.",
        clubImageUrl2: "https://media.zicxa.com/16710",
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
            this.events2.push(data);
            localStorage.setItem('events2', JSON.stringify(this.events2));
        },

        deleteEvent(indexEvent2){
            this.events2.splice(indexEvent2,1);
            localStorage.setItem('events2', JSON.stringify(this.events2));
        },

        editEvent(indexEvent2){
            this.eventData.date = (new Date()).toLocaleString();
            let data = (JSON.parse(JSON.stringify(this.eventData)));
            data.event_id = this.events[indexEvent2].event_id;
            this.events2.splice(indexEvent2,1,data);
            localStorage.setItem('events2', JSON.stringify(this.events2));
        },


        createUpdates(){
                this.updatesData.date = (new Date()).toLocaleString();
                let data = (JSON.parse(JSON.stringify(this.updatesData)));
                this.updates2.push(data);
                localStorage.setItem('updates2', JSON.stringify(this.updates2));
        },

        deleteUpdates(indexUpdates2){
                this.updates2.splice(indexUpdates2, 1);
                localStorage.setItem('updates2', JSON.stringify(this.updates2));
        },

        editClubDetails() {
            const newName = prompt('Enter the new club name:');
            const newDetails = prompt('Enter the new club details:');
            const newImageUrl = prompt('Enter the new club image url:');

            if (newName && newDetails && newImageUrl) {
              this.clubName2 = newName;
              this.clubDetails2 = newDetails;
              this.clubImageUrl2 = newImageUrl;

              // Store the data into local storage
              localStorage.setItem('clubName2', newName);
              localStorage.setItem('clubDetails2', newDetails);
              localStorage.setItem('clubImageUrl2', newImageUrl);
            }
          },
        fetchEventMembers(eventIndex2) {
            axios.get('/getEventMembers2', { params: { event_id: this.events2[eventIndex2].event_id } })
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
        if (localStorage.getItem('updates2')) {
          // Parse the stored string back into an array of updates.
          this.updates2 = JSON.parse(localStorage.getItem('updates2'));
        }
        if (localStorage.getItem('events2')) {
            this.events2 = JSON.parse(localStorage.getItem('events2'));
          }
            // Retrieve club details from local storage
  if (localStorage.getItem('clubName2')) {
    this.clubName2 = localStorage.getItem('clubName2');
  }
  if (localStorage.getItem('clubDetails2')) {
    this.clubDetails2 = localStorage.getItem('clubDetails2');
  }
  if (localStorage.getItem('clubImageUrl2')) {
    this.clubImageUrl2 = localStorage.getItem('clubImageUrl2');
  }
      }



  }).mount('#app');
