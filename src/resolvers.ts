import { Resolvers } from "./types";
import { validateFullAmenities } from "./helpers";

export const resolvers: Resolvers = {
    Query: {
        featuredListings : ( _, __, { dataSources }) => {
            return dataSources.listingAPI.getFeaturedListings();
        },

        list: ( _, { id }, { dataSources } ) => {
            return dataSources.listingAPI.getListing(id);
        }
    },

    Listing: {
        amenities: ( { id, amenities }, _, { dataSources } ) => {
            return validateFullAmenities(amenities) ? amenities : dataSources.listingAPI.getAmentities(id);
        }
    },

    Mutation: {
        createListing: async (_, { input }, { dataSources } ) => {
            try {
                const response = await dataSources.listingAPI.createListing(input);
                console.log(response);
                return {
                    code: 200,
                    success: true,
                    message: "Listing successfully created!",
                    listing: response
                };
            } catch (err) {
                return {
                    code: 500,
                    success: false,
                    message: `Something went wrong: ${err.extends.response.body}`,
                    listing: null
                }
            }
        }
    }
};