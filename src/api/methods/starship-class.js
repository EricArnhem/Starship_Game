import { axiosClient } from "../apiClient";

export function getStarshipClasses(){
    return axiosClient.get('/starship-class');
}