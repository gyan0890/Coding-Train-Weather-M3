function setup() {
    let lat, long;

    const button = document.getElementById('submit');
    button.addEventListener('click', async event =>{

    const data = {lat, long};
    options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const response = await fetch('/api', options);
    const data1 = await response.json();
    console.log(data1);
}); 

if('geolocation' in navigator) {
console.log('Geolocation is available');
navigator.geolocation.getCurrentPosition(async position => {

        lat = position.coords.latitude;
        long = position.coords.longitude;
        console.log(position);
        document.getElementById('latitude').textContent = lat;
        document.getElementById('longitude').textContent = long;

        const city = "London";
        const app = "960e483ee545f7d120460cbbb1283524";
        const api_url = `/weather/${city},${app}`

        const response = await fetch(api_url);
        const json = await response.json();
        console.log(json);
});
}
else {
console.log('Geolocation is not available');
load = true;
}

}