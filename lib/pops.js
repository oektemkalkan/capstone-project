const popA = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1634538783898-010d08356c24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fHMlQzMlQTRuZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    name: "Elb Funnel",
    location: "Berlin",
    rating: "⭐️⭐️⭐️",
    price: 40,
    currency: "€",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    name: "Laurent Hicker",
    location: "Stuttgart",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    price: 60,
    currency: "€",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1549761505-a31eb21119d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHMlQzMlQTRuZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    name: "Leon von Dellen",
    location: "Dortmund",
    rating: "⭐️⭐️⭐️⭐️",
    price: 50,
    currency: "€",
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1600119692901-94e8b7d2eacd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHMlQzMlQTRuZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    name: "Chris Bemstoj",
    location: "Hamburg",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    price: 70,
    currency: "€",
  },
  {
    id: "5",
    image:
      "https://images.unsplash.com/photo-1597169428801-7c1adf2623bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHMlQzMlQTRuZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    name: "Klara Faso",
    location: "Bayern",
    rating: "⭐️⭐️⭐️⭐️",
    price: 55,
    currency: "€",
  },
];

export function getAllPopArtist() {
  return popA;
}

export function getPAById(id) {
  return popA.find((pop) => pop.id === id);
}
