import axios from "axios";
import { Video } from "./Video";

const API = 'http://localhost:4000';

export const getVideos = async () => {
    return await axios.get<Video[]>(`${API}/videos`);
}

export const createVideo = async (video: Video) => {
    return await axios.post(`${API}/videos`, video);
}

export const getVideo = async(id: any) => {
    return await axios.get<Video>(`${API}/videos/${id}`);

}

export const updateVideo = async (id: any, video: Video) => {
    console.log(`${API}/videos/${id}`);
    return await axios.put<Video>(`${API}/videos/${id}`, video);
}

export const deleteVideo = async (id: any) => {
    return await axios.delete<Video>(`${API}/videos/${id}`);
}