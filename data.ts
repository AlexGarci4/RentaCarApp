import { Car, CarCategory } from './types';

export const CARS: Car[] = [
  {
    id: '1',
    name: 'Audi R8 Spyder',
    brand: 'Audi',
    model: '5.2L V10 FSI',
    price: 450,
    deposit: 1500,
    category: CarCategory.SPORT,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAslR6mIlFbaK_33q4z8ve-a9-UU5NjZ75seH_VFQz9eFfomM1funGk7FLhysCXKEpzESrJ_RdzyHiHYmlxvc6V1mrRvCmBdcdIZozYjHtBLiF_9hSFbc5BdF5vqcV39ht1tHEIz9416L7V6klSvNUKrgsXPGRcuepIZiVlbNz8EFQAisBUvJ2uDRR5YJYhkd6l1bx_26Y-1ftaRPoUvbnMzxR6XAggpvwZqbu1L62E7hvzqOH6GJEuV31Uczj2h4hGOCzeccgHYT96',
    description: 'Siente la libertad con el Audi R8 Spyder. Un superdeportivo descapotable que combina un rendimiento impresionante con un diseño icónico. Su motor V10 atmosférico ofrece una banda sonora inigualable.',
    specs: {
      speed: '320 km/h',
      seats: 2,
      fuel: 'Gasolina',
      acceleration: '3.4s',
      transmission: 'Automático'
    },
    features: ['Bang & Olufsen Sound', 'Virtual Cockpit', 'Nappa Leather', 'Carbon Ceramic Brakes'],
    gallery: [
       { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVpRxX7_geregJ6iO6G3REMhcZb4MtANIpwipZ3MODFTpPxmPtHRCdyMkXhUgSp5IAEwGFCtB3J63W5IPYaxp82uUWSfwp5amjv4-XRabs7ZD8fsnCdvgGeivfNhMrMS4xQkAFo18PyW9m1QwNTMFYslknRRYydETfKpSxdfwEBtCIqAyzp1AB2cghJyghw0enxHqpi-tOuxMkjfgBRb8dyyUSCG1z8fJrFZTl9soMBl17tRjyH8VEN0__ofs_nh_J_82WayC5QMaI', label: 'Interior' },
       { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPUF_pqpuyEp8CJ4YTIv6wkK-LkrtliYxMkLnEPNBwpj1Q4WI7tMX4zpxfRQlARMDAdGGuC9qC7HFL9n1bq13Q98dgEu0Nzj8uiYPBpYuGG4y2FbOKb1OH4S7fzhqq_odpi_29Ic1XM05zWWrleGE9LE_qUgYVrhZCydvi_5D1S9xerqpRl8cVCI0yt26ByUTaBo8QqdR9KUv3eiC4gIMYqHQt7Qs71xRFkWdLYbxDZu1POd8FBdenabgD1DqqyDytBwzjvmV67cxk', label: 'Rims' }
    ],
    rating: 4.8
  },
  {
    id: '2',
    name: 'Mercedes-Benz G63 AMG',
    brand: 'Mercedes-Benz',
    model: 'V8 Biturbo',
    price: 380,
    deposit: 1200,
    category: CarCategory.SUV,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqtByXK_Mpwelfs8pDPiMdwJbj4tAj0-EYKnzoKk3EGTLP4W3GRh1RTSSYSnCJmCLF9YwXgigGYMFaUW-zMtRuf-YyqKKoWyxu1ZgiTja6Tnr85rgMovYF7UOatYc-BM4md0zv-DM3t7kOZ8r3vjVfLugxt0bHsNdrLIvn1J1HRvAVV6E0eJ7uUAQOiLtWjQmuxV-LHy9a2kouCZjjl_A_0YeyyKRkvuiwfL0aBZ_Ue-SUs53rgES5Ynm0hydMBroBJFLGyqD_mnRb',
    description: 'El rey de los todoterrenos. El Clase G combina una capacidad off-road legendaria con un lujo interior insuperable y la potencia bruta de AMG.',
    specs: {
      speed: '220 km/h',
      seats: 5,
      fuel: 'Gasolina',
      acceleration: '4.5s',
      transmission: 'Automático'
    },
    features: ['Massage Seats', 'Burmester Audio', 'Night Package', 'Sunroof'],
    gallery: [
        { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVpRxX7_geregJ6iO6G3REMhcZb4MtANIpwipZ3MODFTpPxmPtHRCdyMkXhUgSp5IAEwGFCtB3J63W5IPYaxp82uUWSfwp5amjv4-XRabs7ZD8fsnCdvgGeivfNhMrMS4xQkAFo18PyW9m1QwNTMFYslknRRYydETfKpSxdfwEBtCIqAyzp1AB2cghJyghw0enxHqpi-tOuxMkjfgBRb8dyyUSCG1z8fJrFZTl9soMBl17tRjyH8VEN0__ofs_nh_J_82WayC5QMaI', label: 'Interior' }
    ],
    rating: 4.9
  },
  {
    id: '3',
    name: 'Tesla Model S Plaid',
    brand: 'Tesla',
    model: 'Plaid Tri-Motor',
    price: 290,
    deposit: 1000,
    category: CarCategory.SEDAN,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_sYB6QoNJL833MGcP-SDJhpZsJPXkDHBf1P-cCowsmfjTpLvh5xQZV8mELojbIViqzZ2nudFN1lvk7D2gY_-UOjMuK6NiA_aaiNlh6uSYTB1Nh40kEb_Vb1-aY_7OCoPMyuAOJ7yqYpIrD87jMpM5rxbmvhGdLRvXsem5slNyg6Xfa87Hs89m0dv6RBAkY32t9AP6qk3nh_0OdKpBkwATasww53uK41gNgFXCziY9kb5XmvqJFQh12jrFrACUkxIW951pevxPE-k8',
    description: 'El futuro ya está aquí. Con una aceleración que rompe récords y tecnología de piloto automático, el Model S Plaid redefine lo que un sedán puede ser.',
    specs: {
      speed: '322 km/h',
      seats: 5,
      fuel: 'Eléctrico',
      acceleration: '2.1s',
      transmission: 'Automático'
    },
    features: ['Autopilot', 'Gaming Computer', 'Yoke Steering', 'Glass Roof'],
    gallery: [],
    rating: 4.7
  },
   {
    id: '4',
    name: 'Mercedes-Benz AMG GT',
    brand: 'Mercedes-Benz',
    model: 'Coupé V8',
    price: 450,
    deposit: 1500,
    category: CarCategory.SPORT,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAe174hqGZxG1uRqd5yeGMYBGsz59H8bQrZPxxLUqds214Re2LakixSg22kW_PTFzvh5efT1F2Zyql9tociBDG4_pWqVXANLsNqj7WaQWqXf7RtMbPfgRSxCFOnP3ly0f01UHPI24eITJc4WEa2VcrU0aJ7I4qmT24CyCzUg9ZjY0HMq6nuVIACX2eutGhJ91hbOdq8AtLhz-QwFPH332Qnm0PI7qyCbH66LYYdxJm1RELnkrau1r53BKHdUX80jDYWlewPNPT8AErK',
    description: 'Experimenta la potencia pura y la elegancia del Mercedes-AMG GT. Diseñado para quienes buscan no solo transporte, sino una experiencia de conducción visceral.',
    specs: {
      speed: '312 km/h',
      seats: 2,
      fuel: 'Gasolina',
      acceleration: '3.2s',
      transmission: 'Automático'
    },
    features: ['Bluetooth', 'Navegador GPS', 'Asientos Cuero', 'Cámara 360', 'Seguro Total'],
    gallery: [
        { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVpRxX7_geregJ6iO6G3REMhcZb4MtANIpwipZ3MODFTpPxmPtHRCdyMkXhUgSp5IAEwGFCtB3J63W5IPYaxp82uUWSfwp5amjv4-XRabs7ZD8fsnCdvgGeivfNhMrMS4xQkAFo18PyW9m1QwNTMFYslknRRYydETfKpSxdfwEBtCIqAyzp1AB2cghJyghw0enxHqpi-tOuxMkjfgBRb8dyyUSCG1z8fJrFZTl9soMBl17tRjyH8VEN0__ofs_nh_J_82WayC5QMaI', label: 'Interior' },
        { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPUF_pqpuyEp8CJ4YTIv6wkK-LkrtliYxMkLnEPNBwpj1Q4WI7tMX4zpxfRQlARMDAdGGuC9qC7HFL9n1bq13Q98dgEu0Nzj8uiYPBpYuGG4y2FbOKb1OH4S7fzhqq_odpi_29Ic1XM05zWWrleGE9LE_qUgYVrhZCydvi_5D1S9xerqpRl8cVCI0yt26ByUTaBo8QqdR9KUv3eiC4gIMYqHQt7Qs71xRFkWdLYbxDZu1POd8FBdenabgD1DqqyDytBwzjvmV67cxk', label: 'Llantas' },
        { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAao14Phfnks0FQwJ0T-HD0Sl5Zi8bp8czrxj7U1jMA8M16SWkItQwhhaqTHBhdn6zM46j_5E4wVgR7QAhy5FkxWbvC7E2Y1K_ua6r---5uw9PnBtfsSRWw1ks1kLxuSFTGkNQyWT2ufCYbXRvX4OchOz4ATZRMrVDSQOZYEZUfatOiHwpTnVmLdIAgvKadXywLV2M3Paj9-D5v8d04F_JjlfdWBMIfoxkRLOeQCNC0zXF68nj6_2mUnHnm0tGLCF2U94BlA7w2_pBP', label: 'Trasera' }
    ],
    rating: 4.9
  },
  {
    id: '5',
    name: 'Porsche 911 Carrera',
    brand: 'Porsche',
    model: 'Carrera 4S',
    price: 450,
    deposit: 1500,
    category: CarCategory.SPORT,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgDcrBkNRK6nAoNwSEmh8NAs9pvfefWzm7tAINf8LHAD0U9o9J8fqNna4TZItNKVGV7pSmn7b_F85sKIJ3P1oXXu3mTNEf5ZrPgEj3XBCslSh3-LO4sfhxFLte46hCCvrKDAe9sARRhvy8m9MSaxXdzgkFxgv0K6IiPQCGxBPVDrETCArXGqta1ADY9KC3ttmY3k-0rYsOnpCOyN6CWODo6Pia_COvFU7lf4WJKjKWW4JPBPiMvE3kV4BJtgcgrs26T1WHXZTWRStm',
    description: 'El icono atemporal. El 911 es la referencia por la que se miden todos los demás deportivos. Equilibrio perfecto entre uso diario y prestaciones de circuito.',
    specs: {
      speed: '308 km/h',
      seats: 2,
      fuel: 'Gasolina',
      acceleration: '3.4s',
      transmission: 'Automático'
    },
    features: ['Sport Chrono', 'PASM Suspension', 'BOSE Surround', 'Apple CarPlay'],
    gallery: [],
    rating: 5.0
  }
];