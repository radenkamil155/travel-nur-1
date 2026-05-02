import { Trip, Review } from './types.ts';

export const TRIPS: Trip[] = [
  {
    id: 'umrah-plus-turkey',
    title: 'Echoes of the Ottoman Empire',
    destination: 'Makkah, Madinah & Istanbul',
    country: 'Saudi Arabia & Turkey',
    price: 3450,
    duration: '14 Days',
    theme: 'spiritual',
    rating: 4.9,
    reviewsCount: 128,
    heroImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1920',
    storyPreview: 'A journey that transcends borders, weaving together the spiritual serenity of the Haramain with the majestic history of the Ottomans.',
    fullStory: "Our Umrah Plus Turkey journey is designed for the soul that seeks both spiritual renewal and historical depth. Your journey begins in the tranquil city of Madinah, where the air itself feels blessed. You will spend moments of profound reflection in Al-Masjid an-Nabawi before traveling to Makkah for the performance of Umrah. After your spiritual rebirth, we whisk you away to Istanbul, the bridge between worlds. Here, you'll walk through the Hagia Sophia and Blue Mosque, tracing the footsteps of sultans and scholars who shaped Islamic history for centuries.",
    highlights: [
      'Private spiritual guidance throughout the Umrah',
      'Luxury accommodation within steps of the Haram',
      'Exclusive Bosphorus dinner cruise in Istanbul',
      'Guided historical tour of Topkapi Palace and Blue Mosque',
      'Curated halal dining experiences in legendary restaurants'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Madinah', description: 'VIP reception at the airport and transfer to your luxury hotel overlooking the Holy Mosque.' },
      { day: 4, title: 'Travel to Makkah', description: 'Journey to Makkat Al-Mukarramah via high-speed Haramain Express Train.' },
      { day: 5, title: 'The Sacred Rites', description: 'Guided performance of Umrah with dedicated spiritual advisors.' },
      { day: 9, title: 'Istanbul Calling', description: 'Flight to Istanbul and private transfer to a boutique hotel in Sultanahmet.' },
      { day: 14, title: 'Farewell', description: 'A final sunrise over the Golden Horn before your flight home.' }
    ],
    departureDates: ['Oct 12, 2026', 'Nov 05, 2026', 'Dec 20, 2026'],
    spotsLeft: 8
  },
  {
    id: 'moroccan-sands',
    title: 'Colors of the Maghreb',
    destination: 'Marrakech, Fes & Sahara',
    country: 'Morocco',
    price: 2100,
    duration: '10 Days',
    theme: 'adventure',
    rating: 4.8,
    reviewsCount: 85,
    heroImage: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&q=80&w=1920',
    storyPreview: 'Lose yourself in the labyrinthine medinas and find your spirit under the endless stars of the Sahara desert.',
    fullStory: "Morocco is a feast for the senses, and our 'Colors of the Maghreb' expedition is your personal invitation to the banquet. From the vibrant Jemaa el-Fnaa square in Marrakech to the ancient tanneries of Fes, every corner tells a story. But the true magic happens when the city lights fade. You will trek into the golden dunes of Merzouga on camels, arriving at a luxury desert camp where the silence is as profound as the spiritual connection you'll feel under the Milky Way.",
    highlights: [
      'Camel trek at sunset in the Erg Chebbi dunes',
      'Overnight stay in a luxury Berber desert camp',
      'Cooking masterclass with local Moroccan chefs',
      'Private guided tours of Fes El Bali (UNESCO site)',
      'Traditional Hammam and Spa experience'
    ],
    itinerary: [
      { day: 1, title: 'Marrakech Arrival', description: 'Settle into a traditional Riad in the heart of the Medina.' },
      { day: 3, title: 'High Atlas Crossing', description: 'Scenic drive through the mountains to Ait Benhaddou.' },
      { day: 5, title: 'Sahara Magic', description: 'Camel trek and gala dinner under the stars.' },
      { day: 8, title: 'Imperial Fes', description: 'Exploring the 9,000 streets of the world\'s largest car-free urban area.' }
    ],
    departureDates: ['Sep 15, 2026', 'Oct 10, 2026'],
    spotsLeft: 4
  },
  {
    id: 'japanese-zen',
    title: 'The Silent Path',
    destination: 'Kyoto, Tokyo & Hakone',
    country: 'Japan',
    price: 4200,
    duration: '12 Days',
    theme: 'luxury',
    rating: 4.9,
    reviewsCount: 54,
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1920',
    storyPreview: 'Discover the harmony of ancient traditions and futuristic innovation in the Land of the Rising Sun.',
    fullStory: "Our Japanese odyssey is for those who appreciate the beauty of precision and the power of silence. We have meticulously curated a halal-friendly journey through Japan's most iconic landscapes. Experience the architectural marvels of Tokyo, the bamboo groves of Arashiyama, and the majestic presence of Mt. Fuji. This is not just a sightseeing tour; it is an exploration of 'Omotenashi'—the Japanese spirit of selfless hospitality, mirrored in our own dedication to your comfort and peace of mind.",
    highlights: [
      'Halal-certified kaiseki dining experiences',
      'Private tea ceremony with a kimono master',
      'First-class Shinkansen (Bullet Train) travel',
      'Onsen (Hot Spring) experience with private baths',
      'Golden Pavilion (Kinkaku-ji) morning visit'
    ],
    itinerary: [
      { day: 1, title: 'Tokyo Neon', description: 'Introduction to the bustling metropolis and halal-friendly Shinjuku.' },
      { day: 4, title: 'Mt. Fuji & Hakone', description: 'Cable cars and lake cruises with stunning mountain views.' },
      { day: 7, title: 'Kyoto Heritage', description: 'Deep dive into the spiritual heart of Japan.' },
      { day: 10, title: 'Osaka Gourmet', description: 'Ending the trip with the legendary street food of Dotonbori.' }
    ],
    departureDates: ['Nov 11, 2026', 'Mar 25, 2027'],
    spotsLeft: 12
  }
];

export const REVIEWS: Review[] = [
  {
    id: '1',
    userName: 'Aisha Rahman',
    avatar: 'https://i.pravatar.cc/150?u=aisha',
    rating: 5,
    comment: 'The Umrah Plus Turkey trip was life-changing. Everything was handled with such care, allowing me to focus entirely on my worship and the beautiful history.',
    location: 'London, UK'
  },
  {
    id: '2',
    userName: 'Omar Khalid',
    avatar: 'https://i.pravatar.cc/150?u=omar',
    rating: 5,
    comment: 'I’ve traveled with many agencies, but NUR TRAVEL feels different. They don’t just book hotels; they curate an emotional journey. The Sahara camp was unforgettable.',
    location: 'Dubai, UAE'
  },
  {
    id: '3',
    userName: 'Siti Aminah',
    avatar: 'https://i.pravatar.cc/150?u=siti',
    rating: 4,
    comment: 'Exceptional service for my family. Having halal food pre-arranged and prayer times built into the itinerary made everything so stress-free.',
    location: 'Kuala Lumpur, Malaysia'
  }
];
