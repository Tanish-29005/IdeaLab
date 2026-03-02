import MarqueeModule from "react-fast-marquee";
import "./MarqueeComponent.css";

const Marquee = MarqueeModule.default || MarqueeModule;

export default function MarqueeComponent() {
  return (
    <div className="marquee-wrapper">
      <Marquee
        speed={60}
        gradient={false}
        pauseOnHover={true}
      >
        <span className="marquee-item iot">IoT</span>
        <span className="marquee-item pcb">PCB Design</span>
        <span className="marquee-item printing">3D Printing</span>
        <span className="marquee-item robotics">Robotics</span>

        <span className="marquee-item iot">IoT</span>
        <span className="marquee-item pcb">PCB Design</span>
        <span className="marquee-item printing">3D Printing</span>
        <span className="marquee-item robotics">Robotics</span>
      </Marquee>
    </div>
  );
}