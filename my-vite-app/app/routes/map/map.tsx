import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import "./map.css"
// const { LngLat } = mapboxgl;
import NavHeader from '../../components/nav-header';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import { Link } from 'react-router';
const INITIAL_CENTER: [number, number] = [-80.5204,43.4643];
const INITIAL_ZOOM: number = 11;
const BASE_URL: string = 'https://vancouver-litterbin-map-api.vercel.app';

interface TrashcanData {
  features: {
    geometry: {
      coordinates: [number, number];
    };
  }[];
}

export default function Map() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const [center, setCenter] = useState<[number, number]>(INITIAL_CENTER);
  const [zoom, setZoom] = useState<number>(INITIAL_ZOOM);
  const [trashcanData, setTrashcanData] = useState<TrashcanData>({ features: [] });

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW5uZS1zdW4iLCJhIjoiY2x3OW9iandtMDVpZzJqcnpneGZwYjNkMyJ9.eJnId9hutvkgXLwik2UxBg';

    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: center,
        zoom: zoom,
      });
      new mapboxgl.Marker({ color: 'red' }) // You can customize the marker color here
      .setLngLat( [-80.5449, 43.4723])
      .setPopup(new mapboxgl.Popup().setHTML('<h3>University of Waterloo</h3>')) // Add popup
      .addTo(mapRef.current);

      mapRef.current.on('move', () => {
        const mapCenter = mapRef.current!.getCenter();
        const mapZoom = mapRef.current!.getZoom();
        setCenter([mapCenter.lng, mapCenter.lat]);
        setZoom(mapZoom);
      });

      const geolocateUser = new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        showUserHeading: true,
      });

      mapRef.current.addControl(geolocateUser, 'bottom-right');

      geolocateUser.on('geolocate', async (e) => {
        console.log(e.coords);
        const fullUrl = BASE_URL.concat(`/near-me/query?x=${e.coords.longitude}&y=${e.coords.latitude}`);
        const response = await axios.get(fullUrl);
        console.log(response.data);
        setTrashcanData(response.data);
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);


  return (
    <>
    <nav className="absolute top-0 right-0 p-6 z-50">
      <ul className="flex space-x-8">
        <li>
          <Link to="/goose" className="text-white hover:text-blue-200 transition-colors bg-black p-2 rounded-md" >
            GOOSE
          </Link>
        </li>
        <li>
          <Link to="/map" className="text-white hover:text-blue-200 transition-colors bg-black pt-2 pb-2 px-3 rounded-md">
            MAP
          </Link>
        </li>
      </ul>
    </nav>
      <div className="sidebar">
        Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} | Zoom: {zoom.toFixed(2)}
      </div>
      <div id="map-container" ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
    </>
  );
}

