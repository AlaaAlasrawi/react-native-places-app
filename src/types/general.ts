export type Place = {
  id: number;
  title: string;
  image: any;
  location: any;
  address: string;
};

export type RootStackParamList = {
  AddPlacePage: undefined;
  AllPlacesPage: undefined;
  PlaceDetailsPage: { id: string } | undefined;
};
