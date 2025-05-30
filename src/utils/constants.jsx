const constants = {
  USER: "USER",
};

export default constants;

export const saveUserLocally = (user) => {
  localStorage.setItem(constants.USER, user);
};

export const getUser = () => {
  return localStorage.getItem(constants.USER);
};

export const printLogs = (msg) => {
  console.log(msg);
};

export const productOptions = [
  { value: "eyeGlasses", label: "Eye Glasses" },
  { value: "accessories", label: "Accessories" },
  { value: "sunGlasses", label: "Sunglasses" },
  { value: "spectacleLens", label: "Spectacle Lens" },
  { value: "contactLens", label: "Contact Lens" },
  { value: "readingGlasses", label: "Reading Glasses" },
  { value: "contactSolutions", label: "Contact Solutions" },
];

export const defalutImageBasePath =
  "https://s3.ap-south-1.amazonaws.com/eyesdeal.blinklinksolutions.com/";
