import * as THREE from 'three';

// Premium metallic material shared across objects
const createMetallicMaterial = () => {
  return new THREE.MeshStandardMaterial({
    color: 0x222230,
    metalness: 0.9,
    roughness: 0.2,
    envMapIntensity: 1.0,
  });
};

export const createFloatingWeightPlates = (sceneInstance) => {
  const material = createMetallicMaterial();
  const geometry = new THREE.CylinderGeometry(1.5, 1.5, 0.2, 32);
  
  // Create 3 plates
  const plates = [];
  for (let i = 0; i < 3; i++) {
    const plate = new THREE.Mesh(geometry, material);
    
    // Position them in a subtle diagonal layout
    plate.position.set(
      (Math.random() - 0.5) * 4 + 2, 
      (Math.random() - 0.5) * 4, 
      (Math.random() - 0.5) * 4 - 2
    );
    
    // Initial random rotation
    plate.rotation.x = Math.random() * Math.PI;
    plate.rotation.y = Math.random() * Math.PI;
    
    // Custom properties for animation logic
    plate.userData = {
      baseY: plate.position.y,
      speed: Math.random() * 0.02 + 0.01,
      offset: Math.random() * Math.PI * 2,
      rotationSpeed: Math.random() * 0.01 + 0.005
    };

    plates.push(plate);

    sceneInstance.addObject(plate, (mouse) => {
      // 1. Subtle bobbing up and down
      const time = Date.now() * 0.001;
      plate.position.y = plate.userData.baseY + Math.sin(time * 2 + plate.userData.offset) * 0.3;
      
      // 2. Constant slow rotation
      plate.rotation.x += plate.userData.rotationSpeed;
      plate.rotation.y += plate.userData.rotationSpeed * 0.5;

      // 3. React to cursor (subtle tilt)
      plate.rotation.z = mouse.x * 0.5;
      plate.position.x += (mouse.x - plate.position.x) * 0.01;
    });
  }
};

export const createProgressRing = (sceneInstance, percentage = 0.75) => {
  const geometry = new THREE.TorusGeometry(2, 0.15, 16, 100, Math.PI * 2 * percentage);
  
  const material = new THREE.MeshStandardMaterial({
    color: 0x06D6A0, // Progression Green
    metalness: 0.5,
    roughness: 0.2,
    emissive: 0x06D6A0,
    emissiveIntensity: 0.2
  });
  
  const ring = new THREE.Mesh(geometry, material);
  ring.position.set(0, 0, 0);

  sceneInstance.addObject(ring, (mouse) => {
    // Face the camera but tilt slightly based on mouse
    ring.rotation.x = mouse.y * 0.2;
    ring.rotation.y = mouse.x * 0.2;
  });

  return ring;
};
