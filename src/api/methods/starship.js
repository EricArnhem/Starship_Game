import { axiosClient } from "../apiClient";

/**
 * Retrieves a list of all the starships from the API.
 * 
 * @returns {Promise} A Promise that resolves to the list of all starships.
 */
export function getStarships() {
  return axiosClient.get('/starship');
}

/**
 * Retrieves a starship by its name from the API.
 * 
 * @param {string} starshipName - The name of the starship to retrieve.
 * @returns {Promise} A Promise that resolves to the starship data.
 */
export function getStarshipByName(starshipName) {
  return axiosClient.get(`/starship/name/${starshipName}`);
}

/**
 * Checks the availability of a starship name by sending a request to the API.
 * 
 * @param {string} starshipName - The name of the starship to check for availability.
 * @returns {Promise} A Promise that resolves with the API response indicating whether the name is available or not.
 */
export function checkStarshipName(starshipName) {
  return axiosClient.get(`/starship/checkname/${starshipName}`);
}

/**
 * Creates a new starship using the provided data.
 *
 * @param {object} starshipData - The data for creating the new starship.
 * @param {string} starshipData.name - The name of the new starship.
 * @param {number} starshipData.starshipClassId - The ID of the starship class for the new starship.
 * @returns {Promise} A Promise that resolves when the starship is successfully created or rejects with an error.
 */
export function createStarship(starshipData) {
  return axiosClient.post('/starship', starshipData)
    .catch(error => {
      console.log(error);
      // Returning error to display the correct result message to the client
      return error;
    });
}

/**
 * Updates a starship using the provided data
 * 
 * @param {string} starshipPublicId - The public ID of the starship to update.
 * @param {object} starshipData - The data for updating the starship.
 * @param {string} starshipData.name - The updated name of the starship.
 * @param {number} starshipData.starshipClassId - The updated ID of the starship class for the starship.
 * @returns {Promise} A Promise that resolves when the starship is successfully updated or rejects with an error.
 */
export function updateStarship(starshipPublicId, starshipData) {
  return axiosClient.put(`/starship/${starshipPublicId}`, starshipData)
    .catch(error => {
      console.log(error);
      // Returning error to display the correct result message to the client
      return error;
    })
}

/**
 * Updates the fuel left for a starship using the provided data.
 * 
 * @param {string} starshipPublicId - The public ID of the starship of which we want to update the fuel left.
 * @param {object} starshipData - The data for updating the starship's fuel left.
 * @param {number} starshipData.fuelLeft - The updated amount of fuel left for the starship.
 * @returns {Promise} A Promise that resolves when the starship fuel left is successfully updated or rejects with an error.
 */
export function updateStarshipFuelLeft(starshipPublicId, starshipData) {
  return axiosClient.put(`/starship/${starshipPublicId}/fuel-left`, starshipData)
    .catch(error => {
      console.log(error);
      // Returning error to display the correct result message to the client
      return error;
    })
}

/**
 * Deletes the starship with the provided public ID
 * 
 * @param {string} starshipPublicId - The public ID of the starship to delete.
 * @returns {Promise} A Promise that resolves when the starship is successfully deleted or rejects with an error.
 */
export function deleteStarship(starshipPublicId) {
  return axiosClient.delete(`/starship/${starshipPublicId}`)
    .catch(error => {
      console.log(error);
      // Returning error to display the correct result message to the client
      return error;
    })
}