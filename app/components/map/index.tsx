import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createMap, getMap } from "../../features/twoPicture/twoPictureSlice";
import { RootState, useAppDispatch } from "../../store";
import { createCustomMap } from "./CustomMap";

const Map = () => {
  const { map } = useSelector((state: RootState) => state.twoPicture);
  const { lat, lng } = map;

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMap());
  }, [dispatch]);

  const [newLat, setNewLat] = useState(0);
  const [newLng, setNewLng] = useState(0);
  const [isAddMap, setIsAddMap] = useState(false);
  const { isAdmin } = useSelector((state: RootState) => state.context);

  const handleCreate = async () => {
    await dispatch(createMap({ lat: newLat, lng: newLng }));
    setIsAddMap(false);
    setNewLat(0);
    setNewLng(0);
    window.location.reload();
  };

  useEffect(() => {
    const customMap = createCustomMap({
      divId: "mapDiv",
      lat: lat ? lat : 37.7749,
      lng: lng ? lng : -122.4194,
    });

    const location = {
      lat: lat ? lat : 37.7749,
      lng: lng ? lng : -122.4194,
    };
    customMap.addMarker({ location });
  }, [dispatch, lat, lng]);

  return (
    <div className="w-full flex flex-col ">
      <div id="mapDiv" className="w-full h-[300px]" />
      {!isAddMap && isAdmin && (
        <button
          className="capitalize border-2 w-fit p-2 rounded-lg mx-auto mt-4 pointer hover:bg-slate-300"
          onClick={() => setIsAddMap(true)}
        >
          Change Location
        </button>
      )}
      {isAddMap && isAdmin && (
        <div className="w-5/6 flex flex-col gap-5  py-10 mx-auto ">
          <div>
            <label className="w-32" htmlFor="lat">
              Lat
            </label>
            <input
              className="border-2 w-1/3 mx-4 rounded-md "
              type="number"
              name="lat"
              value={newLat}
              onChange={(e) => setNewLat(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label className="w-32" htmlFor="lng">
              Lng
            </label>
            <input
              className="border-2 w-1/3 mx-4 rounded-md "
              type="number"
              name="lng"
              value={newLng}
              onChange={(e) => setNewLng(parseFloat(e.target.value))}
            />
          </div>
          <button
            className="capitalize border-2 w-fit p-2 rounded-lg mx-auto mt-4 pointer hover:bg-slate-300"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      )}
    </div>
  );
};

export default Map;
