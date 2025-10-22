import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Play_Button({tmdb_id}) {
    const navigate = useNavigate()
    function handleClick(){
        navigate(`/watchMovie/${tmdb_id}`)
    }

  return (
    <div
      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer rounded-lg">
      <div className="bg-white/20 hover:bg-white/30 rounded-full p-5 transition">
        <Play className="text-white w-12 h-12" fill="white" onClick={handleClick}/>
      </div>
    </div>
  );
}

export default Play_Button;
