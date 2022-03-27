import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { Video } from "./Video";
import * as VideoService from "./VideoService";
import "react-toastify/dist/ReactToastify.css";

const VideoForm = () => {
  const navigate = useNavigate(); // esto no se puede hacer dentro de una funcion
  const params = useParams(); // sirve para capturar los parametros enviados en el route
  
  const initialState = {
    title: "",
    description: "",
    url: "",
  };

  // crear el state con un estado inicial
  const [video, setvideo] = useState<Video>(initialState);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setvideo({ ...video, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (params.id) {
      console.log('updating');
      await VideoService.updateVideo(params.id,video);
      toast.success('Video updating');
    } else {
      await VideoService.createVideo(video);
      toast.success("New video added");
    }

    setvideo(initialState);
    navigate("/", { replace: true });
    
  };

  const loadVideo = async (id: string) => {
    const res = await VideoService.getVideo(id);
    const { title, description, url } = res.data; // parse data
    setvideo({ title, description, url })// setear en el state
   
  }

  useEffect(() => {
    if (params.id) loadVideo(params.id);
  }, []);

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <div className="card">
          <div className="card-body">
            <h3>New video</h3>

            <form onSubmit={handleSubmit}>
              <div className="p-2">
                <input
                  type="text"
                  name="title"
                  placeholder="Write a title for this video"
                  className="form-control"
                  onChange={handleInputChange}
                  value={video.title}
                  autoFocus
                />
              </div>

              <div className="p-2">
                <input
                  type="text"
                  name="url"
                  placeholder="https://example.com"
                  className="form-control"
                  onChange={handleInputChange}
                  value={video.url}
                />
              </div>

              <div className="p-2">
                <input
                  name="description"
                  placeholder="Write a description"
                  className="form-control"
                  onChange={handleInputChange}
                  value={video.description}
                />
              </div>

              {params.id ? (
                <button className="btn btn-info">Update video</button>
              ) : (
                <button className="btn btn-primary">Create video</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoForm;
