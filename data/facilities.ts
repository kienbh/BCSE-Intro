export interface Room {
  id: string;
  name: string;
  location: string;
  building: string;
  description: string;
  specs: string[];
  computerCount?: number;
  image: string;
}

export interface EquipmentCategory {
  id: string;
  name: string;
  description: string;
  items: { name: string; count?: number; specs?: string }[];
  image: string;
}

export const rooms: Room[] = [
  {
    id: 'hl-3204',
    name: 'Phòng máy tính 3204',
    location: 'Hòa Lạc',
    building: 'GĐ3, QGHN04',
    description: 'Phòng máy chính quy mô lớn nhất, phục vụ giảng dạy và thực hành.',
    specs: ['35 máy tính', 'Software Servers', 'NAS 48TB', 'AI Server'],
    computerCount: 35,
    image: '/images/facilities/room-3204.jpg',
  },
  {
    id: 'workshop',
    name: 'BCSE · Computer Science & Engineering Laboratory',
    location: 'λ Lab',
    building: '',
    description: 'Không gian maker đa năng — Manufacture Machines, Electrical Workbench, Robotic Playground.',
    specs: ['13 máy tính', 'Máy in 3D & Laser', 'Bàn điện tử', 'Robotic Playground'],
    computerCount: 13,
    image: '/images/facilities/workshop.jpg',
  },
  {
    id: 'md-502',
    name: 'Phòng máy tính 502',
    location: 'Mỹ Đình',
    building: 'DomA',
    description: 'Phòng máy tại cơ sở Mỹ Đình, phục vụ giảng dạy.',
    specs: ['15 máy tính'],
    computerCount: 15,
    image: '/images/facilities/room-502.jpg',
  },
];

export const equipmentCategories: EquipmentCategory[] = [
  {
    id: 'manufacture',
    name: 'Máy sản xuất',
    description: 'From Design to Manufacture — thiết kế và chế tạo sản phẩm ngay tại workshop.',
    items: [
      { name: 'Máy in 3D (FDM)', count: 6, specs: 'PLA/PETG/TPU/ABS, AMS' },
      { name: 'Máy cắt Laser', count: 3, specs: 'CO2, gỗ/acrylic/giấy' },
      { name: 'Máy khoan CNC', count: 3 },
    ],
    image: '/images/facilities/manufacture.jpg',
  },
  {
    id: 'servers',
    name: 'Hạ tầng Server',
    description: 'AI Server phục vụ ML/AI, VPS cluster cho sinh viên deploy dự án.',
    items: [
      { name: 'AI Server', count: 1, specs: 'RTX 4090, 32GB RAM' },
      { name: 'Software Servers', count: 2 },
      { name: 'NAS Storage', count: 1, specs: '48TB' },
      { name: 'VPS Cluster (Proxmox)', count: 10, specs: 'SV01-SV10' },
    ],
    image: '/images/facilities/servers.jpg',
  },
  {
    id: 'robotics',
    name: 'Robotics & AI Platforms',
    description: 'Nền tảng phát triển robot và AI cho nghiên cứu và đào tạo.',
    items: [
      { name: 'UGOT Robot Dev Kit' },
      { name: 'NVIDIA Orin AGX 64GB' },
      { name: 'Xilinx Kria KV260' },
      { name: 'Drone Tarot 650' },
      { name: 'Berkeley Humanoid Lite', specs: '2025' },
    ],
    image: '/images/facilities/robotics.jpg',
  },
  {
    id: 'iot-lab',
    name: 'IoT Lab Kits',
    description: 'Kit IoT, embedded, sensors cho thực hành và nghiên cứu.',
    items: [
      { name: 'ESP32, Raspberry Pi, Jetson Nano, Arduino' },
      { name: 'Sensors (DHT22, Ultrasonic, MPU6050...)' },
      { name: 'Motors, Displays, Grove Kits' },
      { name: 'Soldering, Multimeter, Oscilloscope' },
    ],
    image: '/images/facilities/iot-lab.jpg',
  },
];
