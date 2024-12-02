import { Amenity } from "./types"

const hasOwnPropertyName = (amenity: Amenity): boolean => "name" in amenity;

export const validateFullAmenities = (amenityList: Amenity[]) => amenityList.some(hasOwnPropertyName);

