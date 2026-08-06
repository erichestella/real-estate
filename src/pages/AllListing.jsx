import { useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import properties from '../data/properties.js'
import '../components/FeaturedProperties.css'
import './AllListing.css'

// Property pins for the map. Uses the same kind of listing info as the
// Featured Properties section (name, sqm, short description, price, photo).
const mapProperties = [
  {
    id: 'YR-12238',
    name: '2-Bedroom House and Lot, Buenaventura Subdivision',
    sqm: '796 SQM',
    description: '2-bedroom, 2-toilet & bath home with a 4-car garage, situated in a quiet subdivision.',
    price: '₱123,567,902.05',
    image: 'https://i.pinimg.com/1200x/0c/46/79/0c4679231cce2def3ec84134ee295b9a.jpg',
    lat: 14.5378,
    lng: 121.0014,
    bedrooms: 2,
    bathrooms: 2,
    garage: 4,
    address: '1223 St., Buenaventura Subdivision',
    lister: {
      name: 'Ms. Maria C. Dela Cruz',
      phone: '0949392292',
      email: 'mariacdc@gmail.com',
    },
  },
  {
    id: 'YR-73160',
    name: 'Commercial Property along Roxas Boulevard, Parañaque',
    sqm: '2,228 SQM',
    description: 'Prime commercial lot facing Roxas Boulevard, ideal for mixed-use development.',
    price: '₱5,000,000,000',
    image: 'https://i.pinimg.com/1200x/d4/53/15/d45315c6406925c66791f215c299364c.jpg',
    lat: 14.5083,
    lng: 120.9822,
    address: 'Roxas Boulevard, Parañaque City',
    lister: {
      name: 'Mr. Jerome A. Santos',
      phone: '0917 234 5678',
      email: 'jerome.santos@yourrealstate.com',
    },
  },
  {
    id: 'YR-73140',
    name: 'Aseana Business Park Lot, Parañaque City',
    sqm: '2,378 SQM',
    description: 'Corner commercial lot inside the growing Aseana Business Park district.',
    price: '₱3,500,000,000',
    image: 'https://i.pinimg.com/736x/7c/dd/d3/7cddd359e1f8df8b528c1f30cf16a6b1.jpg',
    lat: 14.5137,
    lng: 120.9865,
    address: 'Aseana Business Park, Parañaque City',
    lister: {
      name: 'Ms. Karen L. Villanueva',
      phone: '0918 345 6789',
      email: 'karen.villanueva@yourrealstate.com',
    },
  },
  {
    id: 'YR-95160',
    name: '2-Storey Mansion, South Forbes Park, Makati',
    sqm: '1,500 SQM',
    description: 'Grand 2-storey mansion with 3 bedrooms in a guarded Makati village.',
    price: '₱3,500,000,000',
    image: 'https://i.pinimg.com/1200x/0c/46/79/0c4679231cce2def3ec84134ee295b9a.jpg',
    lat: 14.5453,
    lng: 121.0198,
    bedrooms: 3,
    bathrooms: 4,
    garage: 3,
    address: 'South Forbes Park, Makati City',
    lister: {
      name: 'Ms. Patricia G. Reyes',
      phone: '0919 456 7890',
      email: 'patricia.reyes@yourrealstate.com',
    },
  },
  {
    id: 'YR-88120',
    name: 'Vacant Lot, Ayala Alabang Village, Muntinlupa',
    sqm: '1,000 SQM',
    description: 'Vacant residential lot ready for a custom-built family home.',
    price: '₱180,000,000',
    image: 'https://i.pinimg.com/736x/3d/f9/95/3df995674be1a35dac536b20fc78896e.jpg',
    lat: 14.4189,
    lng: 121.0311,
    address: 'Ayala Alabang Village, Muntinlupa City',
    lister: {
      name: 'Mr. Ramon T. Bautista',
      phone: '0920 567 8901',
      email: 'ramon.bautista@yourrealstate.com',
    },
  },
  {
    id: 'YR-64410',
    name: '4BR Family Home, Urdaneta Village, Makati',
    sqm: '650 SQM',
    description: 'Fully furnished 4-bedroom, 3-bathroom home in a premier Makati village.',
    price: '₱120,000,000',
    image: 'https://i.pinimg.com/736x/2c/0d/49/2c0d4915f8ff63ef037cabf7d88e5ad1.jpg',
    lat: 14.5570,
    lng: 121.0224,
    bedrooms: 4,
    bathrooms: 3,
    garage: 2,
    address: 'Urdaneta Village, Makati City',
    lister: {
      name: 'Ms. Angela M. Cruz',
      phone: '0921 678 9012',
      email: 'angela.cruz@yourrealstate.com',
    },
  },
  {
    id: 'YR-51290',
    name: 'Commercial Building, Timog Avenue, Quezon City',
    sqm: '800 SQM',
    description: 'Corner commercial building along the busy Timog Avenue strip.',
    price: '₱250,000,000',
    image: 'https://i.pinimg.com/736x/6d/1e/2c/6d1e2c631542855931b1e22a3a1e993d.jpg',
    lat: 14.6392,
    lng: 121.0410,
    address: 'Timog Avenue, Quezon City',
    lister: {
      name: 'Mr. Dennis P. Aquino',
      phone: '0922 789 0123',
      email: 'dennis.aquino@yourrealstate.com',
    },
  },
  {
    id: 'YR-34210',
    name: '3-Bedroom Modern Condo Unit, Bonifacio Global City, Taguig',
    sqm: '120 SQM',
    description: "Modern high-rise condo unit with skyline views, walking distance to BGC's business and lifestyle hubs.",
    price: '₱35,000,000',
    image: 'https://i.pinimg.com/1200x/0c/46/79/0c4679231cce2def3ec84134ee295b9a.jpg',
    lat: 14.5511,
    lng: 121.0509,
    bedrooms: 3,
    bathrooms: 2,
    garage: 1,
    address: '32nd Street, Bonifacio Global City, Taguig',
    lister: {
      name: 'Mr. Paolo R. Ramos',
      phone: '0923 111 2233',
      email: 'paolo.ramos@yourrealstate.com',
    },
  },
  {
    id: 'YR-56780',
    name: 'Commercial Office Space, Ortigas Center, Pasig',
    sqm: '500 SQM',
    description: 'Prime office space in the heart of Ortigas Center, ideal for corporate headquarters or BPO operations.',
    price: '₱85,000,000',
    image: 'https://i.pinimg.com/1200x/d4/53/15/d45315c6406925c66791f215c299364c.jpg',
    lat: 14.5866,
    lng: 121.0630,
    address: 'Ortigas Center, Pasig City',
    lister: {
      name: 'Ms. Cristina D. Lopez',
      phone: '0924 222 3344',
      email: 'cristina.lopez@yourrealstate.com',
    },
  },
  {
    id: 'YR-47120',
    name: '2-Bedroom Condo Unit, Shaw Boulevard, Mandaluyong',
    sqm: '65 SQM',
    description: 'Cozy 2-bedroom condo close to malls, MRT stations, and major business districts along Shaw Boulevard.',
    price: '₱12,500,000',
    image: 'https://i.pinimg.com/736x/7c/dd/d3/7cddd359e1f8df8b528c1f30cf16a6b1.jpg',
    lat: 14.5794,
    lng: 121.0359,
    bedrooms: 2,
    bathrooms: 2,
    garage: 1,
    address: 'Shaw Boulevard, Mandaluyong City',
    lister: {
      name: 'Mr. Anton V. Garcia',
      phone: '0925 333 4455',
      email: 'anton.garcia@yourrealstate.com',
    },
  },
  {
    id: 'YR-68930',
    name: '4-Bedroom Family Home, Marikina Heights, Marikina City',
    sqm: '220 SQM',
    description: 'Spacious family home in a quiet residential subdivision, near schools and the Marikina River Park.',
    price: '₱15,800,000',
    image: 'https://i.pinimg.com/736x/3d/f9/95/3df995674be1a35dac536b20fc78896e.jpg',
    lat: 14.6507,
    lng: 121.1029,
    bedrooms: 4,
    bathrooms: 3,
    garage: 2,
    address: 'Marikina Heights, Marikina City',
    lister: {
      name: 'Ms. Loraine S. Fernandez',
      phone: '0926 444 5566',
      email: 'loraine.fernandez@yourrealstate.com',
    },
  },
  {
    id: 'YR-29450',
    name: 'Commercial Building, Cubao, Quezon City',
    sqm: '600 SQM',
    description: 'Well-located commercial building near Araneta City, suitable for retail or office conversion.',
    price: '₱95,000,000',
    image: 'https://i.pinimg.com/736x/2c/0d/49/2c0d4915f8ff63ef037cabf7d88e5ad1.jpg',
    lat: 14.6194,
    lng: 121.0530,
    address: 'Cubao, Quezon City',
    lister: {
      name: 'Mr. Edward N. Torres',
      phone: '0927 555 6677',
      email: 'edward.torres@yourrealstate.com',
    },
  },
  {
    id: 'YR-95171',
    name: '2-Bedroom Condo Unit in Salcedo Village, Makati',
    sqm: '78 SQM',
    description: 'Well-maintained condo unit with easy access to malls, transport, and business districts.',
    price: '₱18,500,000',
    image: 'https://i.pinimg.com/736x/6d/1e/2c/6d1e2c631542855931b1e22a3a1e993d.jpg',
    lat: 14.5605,
    lng: 121.0198,
    bedrooms: 2,
    bathrooms: 2,
    garage: 1,
    address: 'Salcedo Village, Makati',
    lister: {
      name: 'Mr. Gabriel S. Mendoza',
      phone: '0918 350 4657',
      email: 'gabriel.mendoza@yourrealstate.com',
    },
  },
  {
    id: 'YR-95172',
    name: '3-Bedroom Condo Unit in Legazpi Village, Makati',
    sqm: '95 SQM',
    description: 'Well-maintained condo unit with easy access to malls, transport, and business districts.',
    price: '₱22,000,000',
    image: 'https://i.pinimg.com/1200x/0c/46/79/0c4679231cce2def3ec84134ee295b9a.jpg',
    lat: 14.5578,
    lng: 121.018,
    bedrooms: 3,
    bathrooms: 2,
    garage: 1,
    address: 'Legazpi Village, Makati',
    lister: {
      name: 'Ms. Beatriz N. Ocampo',
      phone: '0927 189 7912',
      email: 'beatriz.ocampo@yourrealstate.com',
    },
  },
  {
    id: 'YR-95173',
    name: '3-Bedroom Townhouse in Poblacion, Makati',
    sqm: '160 SQM',
    description: 'Modern townhouse unit offering privacy and space in a gated community.',
    price: '₱28,750,000',
    image: 'https://i.pinimg.com/1200x/d4/53/15/d45315c6406925c66791f215c299364c.jpg',
    lat: 14.5657,
    lng: 121.035,
    bedrooms: 3,
    bathrooms: 3,
    garage: 2,
    address: 'Poblacion, Makati',
    lister: {
      name: 'Mr. Julius P. Navarro',
      phone: '0917 617 1434',
      email: 'julius.navarro@yourrealstate.com',
    },
  },
  {
    id: 'YR-51301',
    name: '1-Bedroom Condo Unit in Katipunan Avenue, Quezon City',
    sqm: '42 SQM',
    description: 'Well-maintained condo unit with easy access to malls, transport, and business districts.',
    price: '₱9,800,000',
    image: 'https://i.pinimg.com/1200x/d4/53/15/d45315c6406925c66791f215c299364c.jpg',
    lat: 14.639,
    lng: 121.073,
    bedrooms: 1,
    bathrooms: 1,
    garage: 1,
    address: 'Katipunan Avenue, Quezon City',
    lister: {
      name: 'Ms. Trisha M. Villamor',
      phone: '0927 529 4611',
      email: 'trisha.villamor@yourrealstate.com',
    },
  },
  {
    id: 'YR-51302',
    name: '4-Bedroom House and Lot in Fairview, Quezon City',
    sqm: '180 SQM',
    description: 'Comfortable family home in a peaceful residential neighborhood, close to schools and markets.',
    price: '₱13,200,000',
    image: 'https://i.pinimg.com/736x/7c/dd/d3/7cddd359e1f8df8b528c1f30cf16a6b1.jpg',
    lat: 14.7369,
    lng: 121.0555,
    bedrooms: 4,
    bathrooms: 3,
    garage: 2,
    address: 'Fairview, Quezon City',
    lister: {
      name: 'Mr. Rico D. Buenaventura',
      phone: '0910 877 3615',
      email: 'rico.buenaventura@yourrealstate.com',
    },
  },
  {
    id: 'YR-51303',
    name: 'Commercial Space for Sale in Commonwealth Avenue, Quezon City',
    sqm: '450 SQM',
    description: 'Versatile commercial space suited for retail, office, or mixed-use development.',
    price: '₱60,000,000',
    image: 'https://i.pinimg.com/736x/3d/f9/95/3df995674be1a35dac536b20fc78896e.jpg',
    lat: 14.698,
    lng: 121.085,
    address: 'Commonwealth Avenue, Quezon City',
    lister: {
      name: 'Ms. Fely A. Robles',
      phone: '0914 320 6514',
      email: 'fely.robles@yourrealstate.com',
    },
  },
  {
    id: 'YR-34221',
    name: '2-Bedroom Condo Unit in McKinley Hill, Taguig',
    sqm: '70 SQM',
    description: 'Well-maintained condo unit with easy access to malls, transport, and business districts.',
    price: '₱16,900,000',
    image: 'https://i.pinimg.com/736x/3d/f9/95/3df995674be1a35dac536b20fc78896e.jpg',
    lat: 14.5455,
    lng: 121.0563,
    bedrooms: 2,
    bathrooms: 2,
    garage: 1,
    address: 'McKinley Hill, Taguig',
    lister: {
      name: 'Mr. Vince L. Domingo',
      phone: '0921 967 6635',
      email: 'vince.domingo@yourrealstate.com',
    },
  },
  {
    id: 'YR-34222',
    name: '3-Bedroom House and Lot in Lower Bicutan, Taguig',
    sqm: '140 SQM',
    description: 'Comfortable family home in a peaceful residential neighborhood, close to schools and markets.',
    price: '₱9,400,000',
    image: 'https://i.pinimg.com/736x/2c/0d/49/2c0d4915f8ff63ef037cabf7d88e5ad1.jpg',
    lat: 14.522,
    lng: 121.0567,
    bedrooms: 3,
    bathrooms: 2,
    garage: 1,
    address: 'Lower Bicutan, Taguig',
    lister: {
      name: 'Ms. Marielle T. Isidro',
      phone: '0924 649 3045',
      email: 'marielle.isidro@yourrealstate.com',
    },
  },
  {
    id: 'YR-34223',
    name: 'Vacant Lot for Sale in Fort Bonifacio, Taguig',
    sqm: '300 SQM',
    description: 'Clean, titled vacant lot ready for a custom-built home or investment project.',
    price: '₱45,000,000',
    image: 'https://i.pinimg.com/736x/6d/1e/2c/6d1e2c631542855931b1e22a3a1e993d.jpg',
    lat: 14.535,
    lng: 121.05,
    address: 'Fort Bonifacio, Taguig',
    lister: {
      name: 'Mr. Oscar F. Marcelo',
      phone: '0927 400 6925',
      email: 'oscar.marcelo@yourrealstate.com',
    },
  },
  {
    id: 'YR-34224',
    name: '3-Bedroom Townhouse in Ususan, Taguig',
    sqm: '110 SQM',
    description: 'Modern townhouse unit offering privacy and space in a gated community.',
    price: '₱11,750,000',
    image: 'https://i.pinimg.com/1200x/0c/46/79/0c4679231cce2def3ec84134ee295b9a.jpg',
    lat: 14.515,
    lng: 121.068,
    bedrooms: 3,
    bathrooms: 2,
    garage: 1,
    address: 'Ususan, Taguig',
    lister: {
      name: 'Ms. Charmaine R. Yumul',
      phone: '0911 777 4733',
      email: 'charmaine.yumul@yourrealstate.com',
    },
  },
  {
    id: 'YR-56791',
    name: '2-Bedroom Condo Unit in Kapitolyo, Pasig',
    sqm: '55 SQM',
    description: 'Well-maintained condo unit with easy access to malls, transport, and business districts.',
    price: '₱10,600,000',
    image: 'https://i.pinimg.com/1200x/d4/53/15/d45315c6406925c66791f215c299364c.jpg',
    lat: 14.5701,
    lng: 121.0567,
    bedrooms: 2,
    bathrooms: 1,
    garage: 1,
    address: 'Kapitolyo, Pasig',
    lister: {
      name: 'Mr. Ivan C. Salcedo',
      phone: '0917 987 2654',
      email: 'ivan.salcedo@yourrealstate.com',
    },
  },
  {
    id: 'YR-56792',
    name: 'Commercial Space for Sale in Ortigas East, Pasig',
    sqm: '520 SQM',
    description: 'Versatile commercial space suited for retail, office, or mixed-use development.',
    price: '₱72,000,000',
    image: 'https://i.pinimg.com/736x/7c/dd/d3/7cddd359e1f8df8b528c1f30cf16a6b1.jpg',
    lat: 14.585,
    lng: 121.07,
    address: 'Ortigas East, Pasig',
    lister: {
      name: 'Ms. Denise K. Alcantara',
      phone: '0921 266 7065',
      email: 'denise.alcantara@yourrealstate.com',
    },
  },
  {
    id: 'YR-56793',
    name: '4-Bedroom House and Lot in Rosario, Pasig',
    sqm: '190 SQM',
    description: 'Comfortable family home in a peaceful residential neighborhood, close to schools and markets.',
    price: '₱14,500,000',
    image: 'https://i.pinimg.com/736x/3d/f9/95/3df995674be1a35dac536b20fc78896e.jpg',
    lat: 14.5766,
    lng: 121.1,
    bedrooms: 4,
    bathrooms: 3,
    garage: 2,
    address: 'Rosario, Pasig',
    lister: {
      name: 'Mr. Bryan J. Cabrera',
      phone: '0912 723 3803',
      email: 'bryan.cabrera@yourrealstate.com',
    },
  },
  {
    id: 'YR-56794',
    name: '3-Bedroom Townhouse in Valle Verde, Pasig',
    sqm: '175 SQM',
    description: 'Modern townhouse unit offering privacy and space in a gated community.',
    price: '₱19,300,000',
    image: 'https://i.pinimg.com/736x/2c/0d/49/2c0d4915f8ff63ef037cabf7d88e5ad1.jpg',
    lat: 14.582,
    lng: 121.073,
    bedrooms: 3,
    bathrooms: 3,
    garage: 2,
    address: 'Valle Verde, Pasig',
    lister: {
      name: 'Ms. Adrienne P. Mercado',
      phone: '0924 488 5422',
      email: 'adrienne.mercado@yourrealstate.com',
    },
  },
  {
    id: 'YR-47131',
    name: '4-Bedroom House and Lot in Wack-Wack, Mandaluyong',
    sqm: '260 SQM',
    description: 'Comfortable family home in a peaceful residential neighborhood, close to schools and markets.',
    price: '₱32,000,000',
    image: 'https://i.pinimg.com/1200x/d4/53/15/d45315c6406925c66791f215c299364c.jpg',
    lat: 14.5844,
    lng: 121.0466,
    bedrooms: 4,
    bathrooms: 4,
    garage: 2,
    address: 'Wack-Wack, Mandaluyong',
    lister: {
      name: 'Mr. Nathaniel B. Espino',
      phone: '0927 324 6313',
      email: 'nathaniel.espino@yourrealstate.com',
    },
  },
  {
    id: 'YR-47132',
    name: '1-Bedroom Condo Unit in Barangka, Mandaluyong',
    sqm: '38 SQM',
    description: 'Well-maintained condo unit with easy access to malls, transport, and business districts.',
    price: '₱8,900,000',
    image: 'https://i.pinimg.com/736x/7c/dd/d3/7cddd359e1f8df8b528c1f30cf16a6b1.jpg',
    lat: 14.575,
    lng: 121.033,
    bedrooms: 1,
    bathrooms: 1,
    garage: 1,
    address: 'Barangka, Mandaluyong',
    lister: {
      name: 'Ms. Kristine V. Peralta',
      phone: '0917 941 1525',
      email: 'kristine.peralta@yourrealstate.com',
    },
  },
  {
    id: 'YR-47133',
    name: '3-Bedroom Townhouse in Highway Hills, Mandaluyong',
    sqm: '120 SQM',
    description: 'Modern townhouse unit offering privacy and space in a gated community.',
    price: '₱13,750,000',
    image: 'https://i.pinimg.com/736x/3d/f9/95/3df995674be1a35dac536b20fc78896e.jpg',
    lat: 14.592,
    lng: 121.043,
    bedrooms: 3,
    bathrooms: 2,
    garage: 1,
    address: 'Highway Hills, Mandaluyong',
    lister: {
      name: 'Mr. Emil G. Bautista',
      phone: '0912 316 6155',
      email: 'emil.bautista@yourrealstate.com',
    },
  },
  {
    id: 'YR-47134',
    name: '2-Bedroom Condo Unit in Plainview, Mandaluyong',
    sqm: '60 SQM',
    description: 'Well-maintained condo unit with easy access to malls, transport, and business districts.',
    price: '₱11,200,000',
    image: 'https://i.pinimg.com/736x/2c/0d/49/2c0d4915f8ff63ef037cabf7d88e5ad1.jpg',
    lat: 14.585,
    lng: 121.029,
    bedrooms: 2,
    bathrooms: 2,
    garage: 1,
    address: 'Plainview, Mandaluyong',
    lister: {
      name: 'Ms. Josephine R. Tolentino',
      phone: '0924 246 5339',
      email: 'josephine.tolentino@yourrealstate.com',
    },
  },
  {
    id: 'YR-68941',
    name: '3-Bedroom House and Lot in Concepcion, Marikina',
    sqm: '150 SQM',
    description: 'Comfortable family home in a peaceful residential neighborhood, close to schools and markets.',
    price: '₱10,900,000',
    image: 'https://i.pinimg.com/1200x/d4/53/15/d45315c6406925c66791f215c299364c.jpg',
    lat: 14.639,
    lng: 121.101,
    bedrooms: 3,
    bathrooms: 2,
    garage: 1,
    address: 'Concepcion, Marikina',
    lister: {
      name: 'Mr. Alfredo M. Santiago',
      phone: '0927 369 8019',
      email: 'alfredo.santiago@yourrealstate.com',
    },
  },
  {
    id: 'YR-68942',
    name: '3-Bedroom Townhouse in Malanday, Marikina',
    sqm: '105 SQM',
    description: 'Modern townhouse unit offering privacy and space in a gated community.',
    price: '₱8,600,000',
    image: 'https://i.pinimg.com/736x/7c/dd/d3/7cddd359e1f8df8b528c1f30cf16a6b1.jpg',
    lat: 14.647,
    lng: 121.098,
    bedrooms: 3,
    bathrooms: 2,
    garage: 1,
    address: 'Malanday, Marikina',
    lister: {
      name: 'Ms. Corazon E. Villareal',
      phone: '0917 241 9348',
      email: 'corazon.villareal@yourrealstate.com',
    },
  },
  {
    id: 'YR-68943',
    name: '1-Bedroom Condo Unit in Fortune, Marikina',
    sqm: '32 SQM',
    description: 'Well-maintained condo unit with easy access to malls, transport, and business districts.',
    price: '₱6,500,000',
    image: 'https://i.pinimg.com/736x/3d/f9/95/3df995674be1a35dac536b20fc78896e.jpg',
    lat: 14.633,
    lng: 121.094,
    bedrooms: 1,
    bathrooms: 1,
    address: 'Fortune, Marikina',
    lister: {
      name: 'Mr. Diego S. Camacho',
      phone: '0913 256 3621',
      email: 'diego.camacho@yourrealstate.com',
    },
  },
  {
    id: 'YR-68944',
    name: 'Vacant Lot for Sale in Sto. Nino, Marikina',
    sqm: '200 SQM',
    description: 'Clean, titled vacant lot ready for a custom-built home or investment project.',
    price: '₱7,200,000',
    image: 'https://i.pinimg.com/736x/2c/0d/49/2c0d4915f8ff63ef037cabf7d88e5ad1.jpg',
    lat: 14.628,
    lng: 121.098,
    address: 'Sto. Nino, Marikina',
    lister: {
      name: 'Ms. Wilma T. Bermudez',
      phone: '0912 494 7252',
      email: 'wilma.bermudez@yourrealstate.com',
    },
  },
]

const LEAFLET_CSS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
const LEAFLET_JS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'

function loadLeaflet() {
  return new Promise((resolve, reject) => {
    if (window.L) {
      resolve(window.L)
      return
    }

    if (!document.querySelector(`link[href="${LEAFLET_CSS}"]`)) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = LEAFLET_CSS
      document.head.appendChild(link)
    }

    const existingScript = document.querySelector(`script[src="${LEAFLET_JS}"]`)
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(window.L))
      existingScript.addEventListener('error', reject)
      return
    }

    const script = document.createElement('script')
    script.src = LEAFLET_JS
    script.async = true
    script.onload = () => resolve(window.L)
    script.onerror = reject
    document.body.appendChild(script)
  })
}

function Maps() {
  const mapContainerRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  const goToProperty = (id) => {
    navigate(`/property/${id}`, { state: { from: '/all-listing' } })
  }

  useEffect(() => {
    let cancelled = false

    loadLeaflet().then((L) => {
      if (cancelled || !mapContainerRef.current || mapInstanceRef.current) return

      const map = L.map(mapContainerRef.current, {
        scrollWheelZoom: true,
      }).setView([14.55, 121.0], 11)

      // Free, no-API-key OpenStreetMap tiles (no Google Maps billing/quota used).
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map)

      mapProperties.forEach((property) => {
        const specsHtml =
          property.bedrooms || property.bathrooms || property.garage
            ? `
              <div class="map-popup__specs">
                ${property.bedrooms ? `<span><i class="fa-solid fa-bed"></i>${property.bedrooms} Bed</span>` : ''}
                ${property.bathrooms ? `<span><i class="fa-solid fa-sink"></i>${property.bathrooms} Bath</span>` : ''}
                ${property.garage ? `<span><i class="fa-solid fa-warehouse"></i>${property.garage} Garage</span>` : ''}
              </div>
            `
            : ''

        const popupHtml = `
          <div class="map-popup">
            <img src="${property.image}" alt="${property.name}" class="map-popup__image" />
            <div class="map-popup__body">
              <p class="map-popup__price">${property.price}</p>
              <h4 class="map-popup__name">${property.name}</h4>
              <p class="map-popup__sqm">${property.sqm}</p>
              ${specsHtml}
              <p class="map-popup__desc">${property.description}</p>
              <button type="button" class="map-popup__btn" data-property-id="${property.id}">
                View Full Details
              </button>
            </div>
          </div>
        `

        const marker = L.marker([property.lat, property.lng])
          .addTo(map)
          .bindPopup(popupHtml, { maxWidth: 240 })

        // The popup is raw HTML injected by Leaflet (not React), so we wire
        // the button's click after each popup open to navigate to the
        // full Property Details page.
        marker.on('popupopen', (e) => {
          const btn = e.popup.getElement()?.querySelector('.map-popup__btn')
          if (btn) {
            btn.addEventListener('click', () => goToProperty(property.id))
          }
        })
      })

      mapInstanceRef.current = map
    })

    return () => {
      cancelled = true
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Lets a button elsewhere in the site (e.g. Help section's "Talk to an
  // agent") link straight to /all-listing#all-properties and land scrolled
  // to the cards grid, offset for the fixed navbar. React Router doesn't
  // reset scroll position on navigation, so we always reset to the top
  // first — otherwise leftover scroll from whatever page we came from
  // gets added into the target's position and overshoots way past it.
  useEffect(() => {
    window.scrollTo(0, 0)

    if (!location.hash) return
    const target = document.querySelector(location.hash)
    if (!target) return

    const navbarOffset = 90
    const top = target.getBoundingClientRect().top - navbarOffset
    window.scrollTo({ top, behavior: 'smooth' })
  }, [location.hash])

  return (
    <div>
      <Navbar />

      <section className="maps-page">
        <div
          className="maps-page__banner"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1526731955462-f6085f39e742?fm=jpg&q=80&w=1800&auto=format&fit=crop')",
          }}
        >
          <div className="maps-page__banner-overlay" aria-hidden="true" />
          <div className="container maps-page__header">
            <h1>All Listing</h1>
            <p>Explore our listings by location. Click a pin to see the size, price, and details of each property.</p>
          </div>
        </div>

        <div className="container">
          <div className="maps-page__map-frame">
            <div className="maps-page__map" ref={mapContainerRef} />
          </div>

          {/* <div className="maps-page__tile">
            <h3>How to read the map</h3>
            <p>
              Each pin marks a listed property. Tap or click a pin to open its details:
              size in square meters, name, a short description, price, and a photo.
              Zoom or drag the map to explore other areas around Metro Manila.
            </p>
          </div> */}

          <div className="maps-page__listings" id="all-properties">
            <h2 className="maps-page__listings-title">All Properties</h2>

            <div className="featured__grid">
              {properties.map((property) => (
                <article
                  className="property-card"
                  key={property.id}
                  onClick={() => goToProperty(property.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      goToProperty(property.id)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="property-card__image">
                    <img src={property.image} alt={property.title} loading="lazy" />
                    <span className="property-card__location">
                      <i className="fa-solid fa-location-dot" aria-hidden="true"></i> {property.location.toUpperCase()}
                    </span>
                  </div>

                  <div className="property-card__body">
                    <p className="property-card__price">₱ {property.price.replace('₱', '')}</p>
                    <p className="property-card__ref">Your RealState ID No.{property.id.replace('YR-', '')}</p>
                    <h3>{property.title}</h3>

                    <div className="property-card__specs">
                      <span><i className="fa-solid fa-bed" aria-hidden="true"></i> {property.beds ? `${property.beds} Bedrooms` : 'Bedrooms'}</span>
                      <span><i className="fa-solid fa-bath" aria-hidden="true"></i> {property.baths ? `${property.baths} Bathrooms` : 'Bathrooms'}</span>
                    </div>

                    <p
                      className={`property-card__status property-card__status--${property.status
                        .replace(/\s/g, '')
                        .toLowerCase()}`}
                    >
                      {property.status}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Maps