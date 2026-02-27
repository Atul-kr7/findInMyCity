import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaces for Google Geocoding API
export interface GeocodingResult {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  types: string[];
}

export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface Geometry {
  bounds?: Bounds;
  location: LatLng;
  location_type: string;
  viewport: Bounds;
}

export interface Bounds {
  northeast: LatLng;
  southwest: LatLng;
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface GeocodingResponse {
  results: GeocodingResult[];
  status: string;
  error_message?: string;
}

export interface ReverseGeocodingResponse {
  results: GeocodingResult[];
  status: string;
  error_message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private readonly GOOGLE_GEOCODING_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
  private readonly API_KEY = 'YOUR_GOOGLE_API_KEY'; // Replace with your actual API key

  constructor(private http: HttpClient) { }

  /**
   * Geocode an address to get coordinates (latitude, longitude)
   * @param address The address to geocode
   * @returns Observable of GeocodingResponse
   */
  geocodeAddress(address: string): Observable<GeocodingResponse> {
    const params = new HttpParams()
      .set('address', address)
      .set('key', this.API_KEY);

    return this.http.get<GeocodingResponse>(this.GOOGLE_GEOCODING_API_URL, { params });
  }

  /**
   * Reverse geocode coordinates to get address
   * @param lat Latitude
   * @param lng Longitude
   * @returns Observable of ReverseGeocodingResponse
   */
  reverseGeocodeCoordinates(lat: number, lng: number): Observable<ReverseGeocodingResponse> {
    const params = new HttpParams()
      .set('latlng', `${lat},${lng}`)
      .set('key', this.API_KEY);

    return this.http.get<ReverseGeocodingResponse>(this.GOOGLE_GEOCODING_API_URL, { params });
  }

  /**
   * Geocode address with additional parameters
   * @param address The address to geocode
   * @param bounds Optional bounds to bias the results
   * @param region Optional region code
   * @returns Observable of GeocodingResponse
   */
  geocodeAddressWithFilters(
    address: string,
    bounds?: { northeast: LatLng; southwest: LatLng },
    region?: string
  ): Observable<GeocodingResponse> {
    let params = new HttpParams()
      .set('address', address)
      .set('key', this.API_KEY);

    if (region) {
      params = params.set('region', region);
    }

    if (bounds) {
      const boundsString = `${bounds.southwest.lat},${bounds.southwest.lng}|${bounds.northeast.lat},${bounds.northeast.lng}`;
      params = params.set('bounds', boundsString);
    }

    return this.http.get<GeocodingResponse>(this.GOOGLE_GEOCODING_API_URL, { params });
  }

  /**
   * Extract latitude and longitude from the first result
   * @param response GeocodingResponse from API
   * @returns LatLng object or null if no results
   */
  extractCoordinates(response: GeocodingResponse): LatLng | null {
    if (response.results && response.results.length > 0) {
      return response.results[0].geometry.location;
    }
    return null;
  }

  /**
   * Extract formatted address from the first result
   * @param response GeocodingResponse from API
   * @returns Formatted address or empty string
   */
  extractAddress(response: GeocodingResponse): string {
    if (response.results && response.results.length > 0) {
      return response.results[0].formatted_address;
    }
    return '';
  }

  /**
   * Check if the API response was successful
   * @param response GeocodingResponse from API
   * @returns true if status is 'OK', false otherwise
   */
  isSuccessful(response: GeocodingResponse): boolean {
    return response.status === 'OK';
  }
}
