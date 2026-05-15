import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"

type Props = {
    latitude: number
    longitude: number
    name: string
}

const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
})

function MapView({ latitude, longitude, name }: Props) {
    return (
        <div className="overflow-hidden rounded-3xl shadow-sm">
            <MapContainer
                center={[latitude, longitude]}
                zoom={15}
                scrollWheelZoom={false}
                className="h-[400px] w-full"
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker
                    position={[latitude, longitude]}
                    icon={markerIcon}
                >
                    <Popup>{name}</Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default MapView