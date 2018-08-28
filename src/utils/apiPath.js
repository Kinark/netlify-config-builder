const apiProdUrl = `//${window.location.hostname}`;
const apiDevUrl = `//${window.location.hostname}:1337`;

export default process.env.NODE_ENV === 'production' ? apiProdUrl : apiDevUrl;
