actor ConferenceBackend {

  // Define a structure for conferences
  type Conference = {
    id: Nat;
    day: Text;
    time: Text;
    topic: Text;
    speaker: Text;
    location: Text;
    description: Text;
  };

  // Variable stable to store conferences
  stable var conferences : [Conference] = [];

  // Variable to manage the ID of the conference
  var nextId : Nat = 0;

  // Function to add a conference
  public func addConference(day: Text, time: Text, topic: Text, speaker: Text, location: Text, description: Text) : () {
    let newConference : Conference = {
      id = nextId;
      day = day;
      time = time;
      topic = topic;
      speaker = speaker;
      location = location;
      description = description;
    };
    conferences := conferences # [newConference];  // Use # operator to append newConference to conferences
    nextId += 1;
  };

  // Function to get all conferences
  public func getConferences() : [Conference] {
    conferences;  // Return the stable variable conferences directly
  };

  // Function to delete a conference by ID
  public func deleteConferenceById(id: Nat) : () {
    conferences := Array.filter(conferences, func(conf) {
      conf.id != id;
    });
  };

};
