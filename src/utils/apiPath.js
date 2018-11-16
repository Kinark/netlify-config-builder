const apiProdUrl = `//${window.location.hostname}`;
const apiDevUrl = `${apiProdUrl}:1337`;

export default process.env.NODE_ENV === 'production' ? apiProdUrl : apiDevUrl;
