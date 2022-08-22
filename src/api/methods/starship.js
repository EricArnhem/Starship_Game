import { axiosClient } from "../apiClient";

export function getStarships() {
    return axiosClient.get('/starship');
}

export function createStarship(starshipData) {
    return axiosClient.post('/starship', starshipData)
    .catch(error => {
        console.log(error);
        // Returning error to display the correct result message to the client
        return error;
    });
}