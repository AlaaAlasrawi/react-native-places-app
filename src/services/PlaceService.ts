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
}

export default new PlaceService();
