import AsyncStorage from "@react-native-async-storage/async-storage";
import { Place } from "../types/general";

const URL = "";

class PlaceService {
  private static readonly PLACES_KEY = "places";

  public async addPlace(newPlace: Place): Promise<void> {
    const stored = await AsyncStorage.getItem(PlaceService.PLACES_KEY);
    const places: Place[] = stored ? JSON.parse(stored) : [];

    places.push(newPlace);

    await AsyncStorage.setItem(PlaceService.PLACES_KEY, JSON.stringify(places));
  }

  public async getPlaces(): Promise<Place[]> {
    const stored = await AsyncStorage.getItem(PlaceService.PLACES_KEY);
    return stored ? (JSON.parse(stored) as Place[]) : [];
  }

  public async deletePlace(id: number): Promise<void> {
    const stored = await AsyncStorage.getItem(PlaceService.PLACES_KEY);
    const places: Place[] = stored ? JSON.parse(stored) : [];

    const updatedPlaces = places.filter((p) => p.id !== id);

    await AsyncStorage.setItem(
      PlaceService.PLACES_KEY,
      JSON.stringify(updatedPlaces)
    );
  }

  public async clearPlaces(): Promise<void> {
    await AsyncStorage.removeItem(PlaceService.PLACES_KEY);
  }

  public async updatePlace(updated: Place): Promise<void> {
    const stored = await AsyncStorage.getItem(PlaceService.PLACES_KEY);
    const places: Place[] = stored ? JSON.parse(stored) : [];
    const idx = places.findIndex((p) => p.id === updated.id);
    if (idx === -1) throw new Error("Place not found");
    places[idx] = updated;
    await AsyncStorage.setItem(PlaceService.PLACES_KEY, JSON.stringify(places));
  }
}

export default new PlaceService();
