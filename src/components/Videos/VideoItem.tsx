import React from "react";
import { Video } from "./Video"; // interface
import ReactPlayer from "react-player";
import { useNavigate } from "react-router";
import * as VideoService from "./VideoService";
import "./VideoItem.css";

interface Props {
  video: Video;
  loadVideo: () => void;
}

const VideoItem = ({ video, loadVideo }: Props) => {
  const navigate = useNavigate();

  const deleteVideo = async (id: any) => {
    console.log("removing");

    await VideoService.deleteVideo(id);
    loadVideo();
  };

  return (
    <div className="col-md-4 video-card" style={{ cursor: "pointer" }}>
      <div className="card card-body">
        <div className="d-flex justify-content-between">
          <h3 onClick={() => navigate(`/update/${video._id}`)}>
            {video.title}
          </h3>
          <span className="text-danger" onClick={() => deleteVideo(video._id)}>
            X
          </span>
        </div>
        <p>{video.description}</p>
        <ReactPlayer url={video.url} width="100%" height="100%" />
      </div>
    </div>
  );
};

export default VideoItem;
