import { useEffect, useRef } from 'react';

const INTERACTIVE_SELECTOR = 'a, button, input, select, textarea, summary, [role="button"], [data-sfx]';

const GlobalInteractionSound = () => {
    const audioContextRef = useRef(null);
    const activeHoverTargetRef = useRef(null);
    const lastHoverAtRef = useRef(0);

    const getAudioContext = () => {
        if (audioContextRef.current) return audioContextRef.current;
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return null;
        audioContextRef.current = new AudioContextClass();
        return audioContextRef.current;
    };

    const unlockAudio = () => {
        const audioContext = getAudioContext();
        if (!audioContext || audioContext.state !== 'suspended') return;
        audioContext.resume().catch(() => { });
    };

    const playTone = (type) => {
        const audioContext = getAudioContext();
        if (!audioContext || audioContext.state === 'suspended') return;

        const now = audioContext.currentTime;
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        if (type === 'hover') {
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(720, now);
            oscillator.frequency.exponentialRampToValueAtTime(860, now + 0.03);
            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.012);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
            oscillator.start(now);
            oscillator.stop(now + 0.065);
            return;
        }

        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(420, now);
        oscillator.frequency.exponentialRampToValueAtTime(180, now + 0.06);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.015, now + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
        oscillator.start(now);
        oscillator.stop(now + 0.085);
    };

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;

        const onPointerOver = (event) => {
            if (event.pointerType && event.pointerType !== 'mouse') return;
            const target = event.target instanceof Element ? event.target.closest(INTERACTIVE_SELECTOR) : null;
            if (!target || target === activeHoverTargetRef.current) return;

            const now = window.performance.now();
            if (now - lastHoverAtRef.current < 70) return;

            activeHoverTargetRef.current = target;
            lastHoverAtRef.current = now;
            playTone('hover');
        };

        const onPointerOut = (event) => {
            const target = event.target instanceof Element ? event.target.closest(INTERACTIVE_SELECTOR) : null;
            if (target && target === activeHoverTargetRef.current) {
                activeHoverTargetRef.current = null;
            }
        };

        const onClick = (event) => {
            if (event.button && event.button !== 0) return;
            const target = event.target instanceof Element ? event.target.closest(INTERACTIVE_SELECTOR) : null;
            if (!target) return;
            unlockAudio();
            playTone('click');
        };

        window.addEventListener('pointerdown', unlockAudio, true);
        window.addEventListener('keydown', unlockAudio, true);
        window.addEventListener('pointerover', onPointerOver, true);
        window.addEventListener('pointerout', onPointerOut, true);
        window.addEventListener('click', onClick, true);

        return () => {
            window.removeEventListener('pointerdown', unlockAudio, true);
            window.removeEventListener('keydown', unlockAudio, true);
            window.removeEventListener('pointerover', onPointerOver, true);
            window.removeEventListener('pointerout', onPointerOut, true);
            window.removeEventListener('click', onClick, true);

            const audioContext = audioContextRef.current;
            if (audioContext && audioContext.state !== 'closed') {
                audioContext.close().catch(() => { });
            }
        };
    }, []);

    return null;
};

export default GlobalInteractionSound;
