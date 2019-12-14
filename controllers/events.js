exports.getAllevetns =  (req, res) => {
  const events = [
    {
      "name":"Developer Circle by Facebook Owerri",
      "Description":"pARTE AFTE PARTE",
      "date":"14th Dec 2019",
      "time":"10:00 AM",
      "organizerid":"12345678909876543",
      "organizername":"Ndubisi",
      "registration_url":"https://randomimmamge.com",
      "map_url":"https://maps.google.com",
      "comments":[{"user":"codemon","comment":"Very nice event, keep it up"}],
      "rating":5,
      "event_pictures":[
        {"url":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT07ZtokQ5AZUHnAmSPP5H_4z0ZwGoJ3T8VUBt5JuGU1AthuyOS"},
        {"url":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ6XaHBNufXZ4vtm27YKkV4nnXQD_bN215aFMTHG0-f1i1Wfw1l"}],
      "event_image":"https://www.refreshmiami.com/wp-content/uploads/2018/10/Dev-Circle-image-.png"
    }
  ]
  return res.json(events);
}

exports.upcomingEvents = (req, res) => {
 const events = [
    {
      "name":"Google Developer Group Owerri",
      "Description":"Meetup After Meetup",
      "date":"14th Dec 2019",
      "time":"10:00 AM",
      "organizerid":"12345678909876543",
      "organizername":"Ndubisi",
      "registration_url":"https://randomimmamge.com",
      "map_url":"https://maps.google.com",
      "comments":[{"user":"codemon","comment":"Very nice event, keep it up"}],
      "rating":5,
      "event_pictures":[
        {"url":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT07ZtokQ5AZUHnAmSPP5H_4z0ZwGoJ3T8VUBt5JuGU1AthuyOS"},
        {"url":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ6XaHBNufXZ4vtm27YKkV4nnXQD_bN215aFMTHG0-f1i1Wfw1l"}],
      "event_image":"https://www.refreshmiami.com/wp-content/uploads/2018/10/Dev-Circle-image-.png"
    }
  ]
  return res.json(events);
}


exports.pastevents = (req, res) => {
  
}

exports.eventToday = (req, res) => {

}