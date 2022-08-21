import { axiosClient } from "../apiClient";

export function getStarships(){
    return axiosClient.get('/starship');
}