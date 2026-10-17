# NYC Collision Map

An interactive map of NYC motor-vehicle collisions in January 2016. It helps explore how collision locations and casualty counts change by hour and weekday/weekend. Built with HTML, CSS, JavaScript, MapLibre, and OpenStreetMap.

## Run on your PC

Install Node.js 18 or newer, then run:

```sh
git clone https://github.com/anonymnd/data-visualisation-collisions-map.git
cd data-visualisation-collisions-map/collision-map
npm start
```

Open http://127.0.0.1:4327/. No npm installation or API key is needed; internet access is required for map tiles and libraries. Use the hour slider and day filters; larger circles indicate more casualties.

Data: [NYC motor vehicle collisions](https://data.cityofnewyork.us/Public-Safety/Motor-Vehicle-Collisions-Crashes/h9gi-nx95). Counts describe the supplied snapshot, not traffic-adjusted crash risk.
