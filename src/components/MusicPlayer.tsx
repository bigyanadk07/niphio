import React, { useEffect, useRef, useState } from 'react'

interface Track {
  src: string
  artist?: string
}

// Just list your files here — the display title is pulled from the filename.
// e.g. "/audio/midnight-city.mp3" -> "Midnight City"
const tracks: Track[] = [
  { src: '/audio/Until I End Up Dead.mp3', artist: 'Dream' },
  { src: '/audio/Mr. Man.mp3', artist: 'Stephen' },
  { src: '/audio/Youth.mp3 ', artist: 'Glass Animals'},
  { src: '/audio/Tongues.mp3 ', artist: 'Joywave'}
]

const getTitleFromFilename = (src: string) => {
  const filename = src.split('/').pop() ?? ''
  const nameOnly = filename.replace(/\.[^/.]+$/, '')
  return nameOnly
    .replace(/[-_]+/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const formatTime = (seconds: number) => {
  if (!isFinite(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

const MusicPlayer: React.FC = () => {
  const [current, setCurrent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const audioRef = useRef<HTMLAudioElement>(null)

  const title = getTitleFromFilename(tracks[current].src)
  const artist = tracks[current].artist ?? 'Unknown Artist'

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false))
    } else {
      audio.pause()
    }
  }, [isPlaying, current])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  const togglePlay = () => setIsPlaying((p) => !p)

  const next = () => {
    setCurrent((c) => (c + 1) % tracks.length)
    setIsPlaying(true)
  }

  const prev = () => {
    setCurrent((c) => (c - 1 + tracks.length) % tracks.length)
    setIsPlaying(true)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) setProgress(audioRef.current.currentTime)
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value)
    if (audioRef.current) audioRef.current.currentTime = time
    setProgress(time)
  }

  return (
    <div className="w-full max-w-[280px] sm:max-w-sm mx-auto bg-[#121212] rounded-lg sm:rounded-xl p-3 sm:p-4">
      <audio
        ref={audioRef}
        src={tracks[current].src}
        onEnded={next}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* Track info */}
      <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-md bg-[#282828] flex items-center justify-center overflow-hidden">
          <div className="flex items-end gap-[3px] h-3.5 sm:h-4">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-[3px] bg-[#1DB954] rounded-full"
                style={{
                  height: isPlaying ? undefined : '4px',
                  animation: isPlaying
                    ? `eq 0.8s ease-in-out ${i * 0.15}s infinite`
                    : 'none',
                }}
              />
            ))}
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-medium text-white truncate">
            {title}
          </p>
          <p className="text-[10px] sm:text-xs text-[#B3B3B3] truncate">
            {artist}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-1.5 sm:gap-2 mb-2.5 sm:mb-3">
        <span className="text-[9px] sm:text-[10px] text-[#B3B3B3] w-7 sm:w-8 text-right shrink-0">
          {formatTime(progress)}
        </span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={progress}
          onChange={handleSeek}
          className="flex-1 min-w-0 h-1 accent-[#1DB954] cursor-pointer"
          style={{
            background: `linear-gradient(to right, #1DB954 ${
              duration ? (progress / duration) * 100 : 0
            }%, #4d4d4d ${duration ? (progress / duration) * 100 : 0}%)`,
          }}
        />
        <span className="text-[9px] sm:text-[10px] text-[#B3B3B3] w-7 sm:w-8 shrink-0">
          {formatTime(duration)}
        </span>
      </div>

      {/* Controls + volume */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <button
            onClick={prev}
            aria-label="Previous track"
            className="text-[#B3B3B3] hover:text-white transition-colors duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="sm:w-4 sm:h-4">
              <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
            </svg>
          </button>

          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-white hover:scale-105 transition-transform duration-200 shrink-0"
          >
            {isPlaying ? (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="#121212" className="sm:w-3 sm:h-3">
                <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
              </svg>
            ) : (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="#121212" className="sm:w-3 sm:h-3">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <button
            onClick={next}
            aria-label="Next track"
            className="text-[#B3B3B3] hover:text-white transition-colors duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="sm:w-4 sm:h-4">
              <path d="M16 6h2v12h-2zM6 6l8.5 6L6 18z" />
            </svg>
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-1.5 sm:gap-2 w-16 sm:w-24 min-w-0 shrink">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="#B3B3B3"
            className="shrink-0 sm:w-3.5 sm:h-3.5"
          >
            <path d="M3 10v4h4l5 5V5L7 10H3z" />
          </svg>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="flex-1 min-w-0 h-1 cursor-pointer"
            style={{
              background: `linear-gradient(to right, #1DB954 ${
                volume * 100
              }%, #4d4d4d ${volume * 100}%)`,
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes eq {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        input[type='range'] {
          -webkit-appearance: none;
          appearance: none;
          border-radius: 999px;
        }
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.2s;
        }
        input[type='range']:hover::-webkit-slider-thumb {
          opacity: 1;
        }
      `}</style>
    </div>
  )
}

export default MusicPlayer