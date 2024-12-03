import { RESTDataSource } from "@apollo/datasource-rest";

import { Listing, Amenity, CreateListingInput } from "../types";
import DataLoader from "dataloader";

export class ListingAPI extends RESTDataSource {

    baseURL = "https://rt-airlock-services-listing.herokuapp.com/";

    private batchAmenities = new DataLoader( async (listingIds): Promise<Amenity[][]> => {
        console.log("Making one batched call with ", listingIds);
        const amenitiesList = await this.get<Amenity[][]>("amenities/listings", {
            params: {
                ids: listingIds.join(",")
            }
        });
        console.log(amenitiesList);
        return amenitiesList;
    } );

    getFeaturedListings(): Promise<Listing[]> {
        return this.get<Listing[]>("featured-listings");
    }

    getListing(listingId: string): Promise<Listing> {
        return this.get<Listing>( `listings/${listingId}` );
    }

    getAmentities(listingId: string): Promise<Amenity[]> {
        // console.log("Making a follow-up call for amenities with ", listingId);
        // return this.get<Amenity[]>(`listings/${listingId}/amenities`);
        console.log("Making a follow-up call for amenities with ", listingId);
        return this.batchAmenities.load(listingId);
    }

    createListing(listing: CreateListingInput) {
        return this.post("listings", {
            body: { 
                listing 
            }
        });
    }
}