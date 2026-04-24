interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
}

export const createCustomMap = ({
  divId,
  lat,
  lng,
}: {
  divId: string;
  lat: number;
  lng: number;
}) => {
  const element = document.getElementById(divId)!;
  const location = {
    lat: lat,
    lng: lng,
  };
  const googleMap = new google.maps.Map(element, {
    zoom: 18,
    center: location, // Set the center to the desired marker position
  });

  const addMarker = (mappable: Mappable): void => {
    const marker = new google.maps.Marker({
      map: googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng,
      },
    });
  };

  return {
    addMarker,
  };
};

// // Example usage
// const customMap = createCustomMap("mapDiv");
// const location = {
//   lat: 37.7749,
//   lng: -122.4194,
// };
// customMap.addMarker({ location });
