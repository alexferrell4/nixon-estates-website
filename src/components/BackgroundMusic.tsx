import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import classicalTrack from "@/assets/background-classical.mp3";

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.volume = 0.15;
        audioRef.current.play().then(() => {
          setPlaying(true);
          setHasInteracted(true);
        }).catch(() => {});
      }
    };

    document.addEventListener("click", handleInteraction, { once: true });
    document.addEventListener("scroll", handleInteraction, { once: true });

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("scroll", handleInteraction);
    };
  }, [hasInteracted]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.volume = 0.15;
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src={classicalTrack} loop preload="none" />
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 left-6 z-50 bg-nixon-dark/80 backdrop-blur-sm border border-accent/30 text-primary-foreground p-3 rounded-full shadow-lg hover:bg-nixon-dark transition-colors"
        aria-label={playing ? "Mute music" : "Play music"}
      >
        {playing ? <Volume2 className="w-5 h-5 text-accent" /> : <VolumeX className="w-5 h-5 text-accent/60" />}
      </button>
    </>
  );
};

export default BackgroundMusic;
