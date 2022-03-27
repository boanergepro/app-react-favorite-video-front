import React, { useEffect, useState } from "react";
import { Video } from "./Video";
import VideoItem from "./VideoItem";
import * as videoService from "./VideoService";

const VideoList = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  const loadVideos = async () => {
    const res = await videoService.getVideos();
    console.log(res);
    //parser y ordenar la respuesta antes de renderizar por fecha
    const formatedVideos: Video[] = res.data
      .map((video) => {
        return {
          ...videos,
          _id: video._id,
          url: video.url,
          title: video.title,
          description: video.description,
          createdAt: video.createdAt ? new Date(video.createdAt) : new Date(),
          updatedAt: video.updatedAt ? new Date(video.updatedAt) : new Date(),
        };
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); // ordenar

    setVideos(formatedVideos);
  };

  useEffect(() => {
    loadVideos();
  }, []);

  return (
    <div className="row">
      {videos.map((video) => {
        return <VideoItem video={video} key={video._id} loadVideo={ loadVideos }/>;
      })}
    </div>
  );
};

export default VideoList;
