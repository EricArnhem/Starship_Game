import { axiosClient } from "../apiClient";

/**
 * Retrieves a list of all the starship classes from the API.
 * 
 * @returns {Promise} A Promise that resolves to the list of all starship classes.
 */
export function getStarshipClasses() {
    return axiosClient.get('/starship-class');
}