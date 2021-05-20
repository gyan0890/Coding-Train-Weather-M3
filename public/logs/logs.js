getData();
                async function getData(){

                    const response = await fetch('/api');
                    const data = await response.json();

                    for(item of data) {
                        const root = document.createElement('div');
                        const date = document.createElement('div');
                        const latitude = document.createElement('div');
                        const longitude = document.createElement('div');
       

                        const dateString = new Date(item.timestamp).toLocaleString();
                        date.textContent = dateString;
                        latitude.textContent = `latitude: ${item.lat}`;
                        longitude.textContent = `longitude: ${item.long}`;
                        root.append(date, latitude, longitude);
                        document.body.append(root);

                    }

                    console.log(data);
                }