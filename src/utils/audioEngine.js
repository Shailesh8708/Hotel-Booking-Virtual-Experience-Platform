// VELOCITY ONE — Web Audio Synthesizer Engine
// Zero external sound file dependencies, instant response, 100% reliable across browsers

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true; // Initially muted as per luxury automotive spec
    this.engineOsc = null;
    this.engineGain = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.initialized = true;
    } catch {
      // AudioContext unavailable or blocked
    }
  }

  ensureContext() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.ensureContext();
      this.playChime(600, 0.08, 'sine');
    } else {
      if (this.engineGain) {
        this.engineGain.gain.setValueAtTime(0, this.ctx.currentTime);
      }
    }
    return this.isMuted;
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (!muted) {
      this.ensureContext();
    }
  }

  playChime(freq = 440, duration = 0.1, type = 'sine', gainVal = 0.05) {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.6, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // silent fail
    }
  }

  playClick() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.045);
    } catch {
      // silent
    }
  }

  playHover() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1800, this.ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.035);
    } catch {
      // silent
    }
  }

  playReveal() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // Sub-bass rumble
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(45, now);
      subOsc.frequency.exponentialRampToValueAtTime(75, now + 1.2);
      subGain.gain.setValueAtTime(0.12, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 1.85);

      // Electric motor turbine whine rising
      const motorOsc = this.ctx.createOscillator();
      const motorGain = this.ctx.createGain();
      motorOsc.type = 'sawtooth';
      motorOsc.frequency.setValueAtTime(120, now + 0.2);
      motorOsc.frequency.exponentialRampToValueAtTime(1200, now + 1.5);

      // Low pass filter to keep it luxurious and deep
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.exponentialRampToValueAtTime(2800, now + 1.5);

      motorGain.gain.setValueAtTime(0.0001, now);
      motorGain.gain.exponentialRampToValueAtTime(0.08, now + 0.4);
      motorGain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

      motorOsc.connect(filter);
      filter.connect(motorGain);
      motorGain.connect(this.ctx.destination);

      motorOsc.start(now + 0.1);
      motorOsc.stop(now + 2.05);

      // Glass shimmer / chime accent at peak
      setTimeout(() => {
        if (!this.isMuted) {
          this.playChime(1050, 0.4, 'sine', 0.06);
        }
      }, 900);
    } catch {
      // silent
    }
  }

  playColorSwitch() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(640, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(980, this.ctx.currentTime + 0.09);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch {
      // silent
    }
  }

  playLightSwitch() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(480, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.13);
    } catch {
      // silent
    }
  }
}

export const sound = new AudioEngine();
export default sound;

