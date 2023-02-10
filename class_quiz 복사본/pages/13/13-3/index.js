import ReactPlayer from "react-player";

export default function youtubePage() {
  return (
    <ReactPlayer
      url="https://www.youtube.com/watch?v=8rlPwpNtuUA"
      muted={true}
      width="800px"
      height="600px"
      playing={true}
    />
  );
}
