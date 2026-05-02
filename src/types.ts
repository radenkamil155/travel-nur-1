import { Package, MapPin, Clock, Star, Users, Calendar, ShieldCheck, Heart, Plane, Search, ChevronRight, Menu, X, Instagram, Facebook, Twitter, Mail, Phone, MessageSquare, Play, Globe, Compass, ArrowRight, Shield, Check, Info, Sparkles, Filter } from 'lucide-react';

export interface Trip {
  id: string;
  title: string;
  destination: string;
  country: string;
  price: number;
  duration: string; // e.g. "10 Days"
  theme: 'spiritual' | 'adventure' | 'luxury' | 'family';
  rating: number;
  reviewsCount: number;
  heroImage: string;
  storyPreview: string;
  fullStory: string;
  highlights: string[];
  itinerary: { day: number; title: string; description: string }[];
  departureDates: string[];
  spotsLeft: number;
}

export interface Review {
  id: string;
  userName: string;
  avatar: string;
  rating: number;
  comment: string;
  location: string;
  videoUrl?: string;
}

export type OperationType = 'create' | 'update' | 'delete' | 'list' | 'get' | 'write';
