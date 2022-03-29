import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { Video } from "./Video";
import * as VideoService from "./VideoService";
import "react-toastify/dist/ReactToastify.css";
import Button from "../Button";

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

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setvideo({ ...video, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(video);
    if (params.id) {
      console.log("updating");
      await VideoService.updateVideo(params.id, video);
      toast.success("Video updating");
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
    setvideo({ title, description, url }); // setear en el state
  };

  useEffect(() => {
    if (params.id) loadVideo(params.id);
  }, []);

  return (
    <div className="bg-[#fff1f2] rounded-xl border m-auto p-4 shadow-xl lg:w-1/3 md:w-1/2 sm:w-10/12">
      <div className="flex justify-center">
        <h3 className="font-sans font-bold text-gray-800 m-auto">New video</h3>
      </div>

      <form className="py-5" onSubmit={handleSubmit}>
        <div className="flex justify-center pb-3">
          <input
            type="text"
            name="title"
            placeholder="Write a title for this video"
            className="w-3/4 border border-solid border-inherit rounded-md p-2"
            onChange={handleInputChange}
            value={video.title}
            autoFocus
          />
        </div>
        <div className="flex justify-center pb-3">
          <input
            type="text"
            name="url"
            placeholder="https://example.com"
            className="w-3/4 border border-solid border-inherit rounded-md p-2"
            onChange={handleInputChange}
            value={video.url}
          />
        </div>
        <div className="flex justify-center pb-3">
          <textarea
            name="description"
            className="w-3/4 border border-solid border-inherit rounded-md p-2"
            onChange={handleTextAreaChange}
            placeholder="Write a description"
          ></textarea>
        </div>
        {params.id ? (
         <Button title={'Update video'} />
        ) : (
          <Button title={'Create a new video'} />
        )}
      </form>
    </div>
  );
};

export default VideoForm;
