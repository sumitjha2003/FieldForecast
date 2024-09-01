let url;

if (window.location.hostname === 'localhost') {
    url = 'http://localhost:4999';
} else if (window.location.hostname === 'FieldForecast.onrender.com') {
    url = 'https://FieldForecast.onrender.com';
} else {
    // Default URL
    url = 'http://localhost:4999';
}
export default url;
