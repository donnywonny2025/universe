import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import './App.css';
import { Star } from './components/Star';
import { Planet } from './components/Planet';
import { Mars } from './components/Mars';

function App() {
  return (
    <Canvas camera={{ position: [0, 5, 15], fov: 75 }}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      <Star />
      <Planet orbitRadius={5} speed={0.5} color="#0099ff" />
      <Planet orbitRadius={8} speed={0.3} size={0.8} color="#ff6600" />
      <Mars />
      <OrbitControls />
    </Canvas>
  );
}

export default App;
