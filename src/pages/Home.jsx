import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/Firebase";

const Placeorder = () => {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [distance, setDistance] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const calculateDistanceAndSave = () => {
    if (!window.google) {
      setError("Google Maps not loaded");
      return;
    }

    setLoading(true);
    setError("");

    const service = new window.google.maps.DistanceMatrixService();

    service.getDistanceMatrix(
      {
        origins: [pickup],
        destinations: [drop],
        travelMode: window.google.maps.TravelMode.DRIVING,
        unitSystem: window.google.maps.UnitSystem.METRIC,
      },
      async (response, status) => {
        setLoading(false);

        if (status !== "OK") {
          setError("Distance calculation failed");
          return;
        }

        const element = response.rows[0].elements[0];

        if (element.status !== "OK") {
          setError("Invalid route");
          return;
        }

        const distanceText = element.distance.text;
        const distanceValue = element.distance.value / 1000; // km

        setDistance(distanceText);

        // 🔥 Save to Firebase
        await addDoc(collection(db, "orders"), {
          pickup,
          drop,
          distanceText,
          distanceValue,
          createdAt: serverTimestamp(),
        });
      }
    );
  };

  return (
    <div>
      <h2>Place Order</h2>

      <input
        placeholder="Pickup location"
        value={pickup}
        onChange={(e) => setPickup(e.target.value)}
      />

      <input
        placeholder="Drop location"
        value={drop}
        onChange={(e) => setDrop(e.target.value)}
      />

      <button onClick={calculateDistanceAndSave} disabled={loading}>
        {loading ? "Calculating..." : "Place Order"}
      </button>

      {distance && <p>Distance: {distance}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Placeorder;
