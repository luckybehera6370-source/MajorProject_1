const safeCoordinates = Array.isArray(coordinates) && coordinates.length === 2 && coordinates.every(Number.isFinite)
    ? coordinates
    : [77.2090, 28.6139];

if (!mapToken) {
    console.warn('Mapbox token is not configured.');
} else {
    mapboxgl.accessToken = mapToken;

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: safeCoordinates,
        zoom: 9
    });

    const marker = new mapboxgl.Marker({ color: 'red' })
        .setLngLat(safeCoordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h4>${locationName}</h4><p>Exact location provided after booking</p>`
        ))
        .addTo(map);
}