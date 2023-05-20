const map = new maplibregl.Map({
        container: 'map',
        style: {version:8,sources:{osm:{type:'raster',tiles:['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],tileSize:256,attribution:'© OpenStreetMap contributors',maxzoom:19}},layers:[{id:'osm',type:'raster',source:'osm'}]},
        center: [-74.0059, 40.7128],
        zoom: 11
      });

      map.on('error', (event) => { console.error(event.error); document.getElementById('status').textContent = 'Map or data could not load. Check your internet connection and reload.'; });
      map.on('load', () => {
        let filterHour = ['==', ['number', ['get', 'Hour']], 12];
        let filterDay = ['!=', ['string', ['get', 'Day']], 'placeholder'];

        map.addLayer({
          id: 'collisions',
          type: 'circle',
          source: {
            type: 'geojson',
            data: './collisions1601.geojson' // replace this with the url of your own geojson
          },
          paint: {
            'circle-radius': [
              'interpolate',
              ['linear'],
              ['number', ['get', 'Casualty']],
              0,
              4,
              5,
              24
            ],
            'circle-color': [
              'interpolate',
              ['linear'],
              ['number', ['get', 'Casualty']],
              0,
              '#2DC4B2',
              1,
              '#3BB3C3',
              2,
              '#669EC4',
              3,
              '#8B88B6',
              4,
              '#A2719B',
              5,
              '#AA5E79'
            ],
            'circle-opacity': 0.8
          },
          'filter': ['all', filterHour, filterDay]
        });

        document.getElementById('status').textContent = 'Collision map ready';
        // update hour filter when the slider is dragged
        document.getElementById('slider').addEventListener('input', (event) => {
          const hour = parseInt(event.target.value);
          // update the map
          filterHour = ['==', ['number', ['get', 'Hour']], hour];
          map.setFilter('collisions', ['all', filterHour, filterDay]);

          // converting 0-23 hour to AMPM format
          const ampm = hour >= 12 ? 'PM' : 'AM';
          const hour12 = hour % 12 ? hour % 12 : 12;

          // update text in the UI
          document.getElementById('active-hour').innerText = hour12 + ampm;
        });

        document
          .getElementById('filters')
          .addEventListener('change', (event) => {
            const day = event.target.value;
            // update the map filter
            if (day === 'all') {
              filterDay = ['!=', ['string', ['get', 'Day']], 'placeholder'];
            } else if (day === 'weekday') {
              filterDay = [
                'match',
                ['get', 'Day'],
                ['Sat', 'Sun'],
                false,
                true
              ];
            } else if (day === 'weekend') {
              filterDay = [
                'match',
                ['get', 'Day'],
                ['Sat', 'Sun'],
                true,
                false
              ];
            } else {
              console.error('error');
            }
            map.setFilter('collisions', ['all', filterHour, filterDay]);
          });
      });
