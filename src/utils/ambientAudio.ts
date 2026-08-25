// Web Audio API based subtle cinematic focus atmosphere (Ocean waves & night breeze drone)

class AmbientFocusAudio {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private gainNode: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private oscillator1: OscillatorNode | null = null;
  private oscillator2: OscillatorNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public start(): void {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master Gain
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.04, this.ctx.currentTime); // Gentle low volume
      this.gainNode.connect(this.ctx.destination);

      // Low pass filter for warm oceanic rumble
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(280, this.ctx.currentTime);
      this.filterNode.connect(this.gainNode);

      // Deep harmonic drone (55Hz and 110Hz - A1 / A2)
      this.oscillator1 = this.ctx.createOscillator();
      this.oscillator1.type = 'sine';
      this.oscillator1.frequency.setValueAtTime(55, this.ctx.currentTime);
      this.oscillator1.connect(this.filterNode);
      this.oscillator1.start();

      this.oscillator2 = this.ctx.createOscillator();
      this.oscillator2.type = 'triangle';
      this.oscillator2.frequency.setValueAtTime(82.4, this.ctx.currentTime); // E2 fifth
      this.oscillator2.connect(this.filterNode);
      this.oscillator2.start();

      // Pink/Brown oceanic noise buffer
      const bufferSize = this.ctx.sampleRate * 3;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 1.8; // swell
      }

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = buffer;
      this.noiseNode.loop = true;

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      this.noiseNode.connect(noiseGain);
      noiseGain.connect(this.filterNode);
      this.noiseNode.start();

      this.isPlaying = true;
    } catch {
      this.isPlaying = false;
    }
  }

  public stop(): void {
    try {
      if (this.gainNode && this.ctx) {
        this.gainNode.gain.setTargetAtTime(0.001, this.ctx.currentTime, 0.5);
      }
      setTimeout(() => {
        if (this.oscillator1) {
          this.oscillator1.stop();
          this.oscillator1.disconnect();
        }
        if (this.oscillator2) {
          this.oscillator2.stop();
          this.oscillator2.disconnect();
        }
        if (this.noiseNode) {
          this.noiseNode.stop();
          this.noiseNode.disconnect();
        }
        if (this.ctx && this.ctx.state !== 'closed') {
          this.ctx.close();
        }
        this.ctx = null;
        this.isPlaying = false;
      }, 600);
    } catch {
      this.isPlaying = false;
    }
  }
}

export const ambientAudio = new AmbientFocusAudio();
