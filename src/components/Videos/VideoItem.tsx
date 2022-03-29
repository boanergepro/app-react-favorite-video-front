import { Video } from "./Video"; // interface
import { TrashIcon, PencilIcon } from "@heroicons/react/solid";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router";
import * as VideoService from "./VideoService";


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
    <div className="group relative bg-[#fff1f2] rounded-md">
      <div className="">
        <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
          <ReactPlayer url={video.url} width="100%" height="100%" />
        </div>
        <div className="p-4">
          <div className="mt-4 flex justify-between">
            <p className="text-md text-black">{video.title}</p>
            <div className="justify-between">
              
              <PencilIcon className="block h-5 w-5 mb-5 text-violet-600" onClick={() => navigate(`/update/${video._id}`)}/>
              <TrashIcon className="block h-5 w-5 text-red-600" onClick={() => deleteVideo(video._id)}/>
              
            </div>
          </div>
          <p className="text-sm text-gray-400">{video.description}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
