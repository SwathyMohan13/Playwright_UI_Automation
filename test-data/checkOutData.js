export const invalidCheckOutData = [
     {
          scenario: "Empty First Name",
          firstName: "",
          lastName: "Mohan",
          zip: "560034",
          errorMessage: "Error: First Name is required"
     },
     {
          scenario: "Empty Last Name",
          firstName: "Swathy",
          lastName: "",
          zip: "560034",
          errorMessage: "Error: Last Name is required"
     },
     {
          scenario: "Empty Zip",
          firstName: "Swathy",
          lastName: "Mohan",
          zip: "",
          errorMessage: "Error: Postal Code is required"
     }
];

export const checkOutData = {
     valid: {
          firstName: "Swathy",
          lastName: "Mohan",
          zip: "560034"
     }
};