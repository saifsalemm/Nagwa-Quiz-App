import { gsap } from 'gsap';

export default function ScreenTransition(){
    gsap.fromTo(
        ".transition-div",
        {
          height: '100vh',
        },
        {
          height: 0,
          duration: 0.7,
        }
      );
}