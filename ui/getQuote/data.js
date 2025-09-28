// GetQuote form configuration data
export const getQuoteConfig = {
  // Registration input configuration
  registrationInput: {
    name: "vehicleIdentification.registrationNumber",
    label: "Enter your Registration number",
    placeholder: "Enter your Registration number",
    type: "text",
    reg: true,
    component: "FormTextInput",
  },

  // Vehicle details dropdowns configuration
  vehicleDropdowns: [
    {
      name: "vehicleIdentification.vehicleType",
      label: "My Vehicle is a....",
      placeholder: "Choose Vehicle",
      component: "Dropdown",
      options: ["Car", "Motorcycle", "Truck", "Bus"],
    },
    {
      name: "vehicleIdentification.make",
      label: "Make",
      placeholder: "Choose Make",
      component: "Dropdown",
      options: [
        "Toyota",
        "Honda",
        "Ford",
        "Chevrolet",
        "BMW",
        "Mercedes",
        "Audi",
        "Volkswagen",
        "Nissan",
        "Hyundai",
        "Kia",
        "Mazda",
        "Subaru",
        "Volvo",
      ],
    },
    {
      name: "vehicleIdentification.model",
      label: "Model",
      placeholder: "Choose Model",
      component: "Dropdown",
      options: [
        "Camry",
        "Accord",
        "F-150",
        "Silverado",
        "3 Series",
        "C-Class",
        "A4",
        "Golf",
        "Civic",
        "Corolla",
        "Focus",
        "Fiesta",
      ],
    },
    {
      name: "vehicleIdentification.year",
      label: "Year",
      placeholder: "Choose Year",
      component: "Dropdown",
      options: [
        "2024",
        "2023",
        "2022",
        "2021",
        "2020",
        "2019",
        "2018",
        "2017",
        "2016",
        "2015",
        "2014",
        "2013",
        "2012",
        "2011",
        "2010",
        "2009",
        "2008",
        "2007",
        "2006",
        "2005",
      ],
    },
  ],

  // Duration selections configuration
  durationSelections: [
    {
      name: "quickSelection",
      label: "How long will you need it?",
      component: "Selection1",
      type: "checkbox",
      items: ["1 Day", "2 Days", "1 Week"],
      clearFields: [
        "duration.customDuration.type",
        "duration.customDuration.value",
      ],
    },
    {
      name: "customDuration.type",
      label: "Need it specific? Choose your duration",
      component: "Selection1",
      type: "checkbox",
      items: ["Hours", "Days", "Weeks"],
      clearFields: ["duration.quickSelection", "duration.customDuration.value"],
    },
  ],

  // Dynamic duration values based on selected type
  durationValues: {
    Hours: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    Days: ["1", "2", "3", "4", "5", "6", "7"],
    Weeks: ["1", "2", "3", "4"],
  },

  // Form buttons configuration
  buttons: {
    submit: {
      label: "Continue",
      loadingLabel: "Loading...",
      type: "submit",
      icon: {
        src: "/svg/arrow-right.svg",
        alt: "arrow-right",
        width: 27,
        height: 14,
      },
    },
    toggle: {
      showRegDetails: "I don't know my reg yet",
      hideRegDetails: "Back to registration number",
      type: "button",
    },
  },
};
