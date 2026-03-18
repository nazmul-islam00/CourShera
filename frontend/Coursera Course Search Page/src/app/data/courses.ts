export interface Course {
  id: string;
  title: string;
  provider: string;
  rating: number;
  reviews: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  category: string;
  skills: string[];
  enrolled: number;
  price: number | 'Free';
  image: string;
  description: string;
  productType: 'Course' | 'Specialization' | 'Professional Certificate';
  badge?: 'Free Trial' | 'New' | 'Preview';
}

export const courses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Computer Vision and Image Processing',
    provider: 'IBM',
    rating: 4.3,
    reviews: 1400,
    level: 'Intermediate',
    duration: '1 - 3 Months',
    category: 'Computer Science',
    skills: ['Computer Vision', 'Transfer Learning', 'Convolutional Neural Networks', 'IBM Cloud', 'Cloud Applications', 'Application'],
    enrolled: 2500000,
    price: 'Free',
    image: 'computer vision processing',
    description: 'Learn computer vision fundamentals and image processing',
    productType: 'Course',
    badge: 'Free Trial'
  },
  {
    id: '2',
    title: 'Advanced Computer Vision with TensorFlow',
    provider: 'DeepLearning.AI',
    rating: 4.7,
    reviews: 531,
    level: 'Intermediate',
    duration: '1 - 4 Weeks',
    category: 'Computer Science',
    skills: ['Computer Vision', 'Tensorflow', 'Image Analysis', 'Transfer Learning', 'Convolutional Neural Networks', 'Keras (Neural Network Library)'],
    enrolled: 1800000,
    price: 'Free',
    image: 'tensorflow deep learning',
    description: 'Master advanced computer vision with TensorFlow',
    productType: 'Course',
    badge: 'Free Trial'
  },
  {
    id: '3',
    title: 'Computer Vision and Sequence Analysis in Machine Learning',
    provider: 'Cleveland Clinic',
    rating: 4.6,
    reviews: 89,
    level: 'Intermediate',
    duration: '1 - 4 Weeks',
    category: 'Data Science',
    skills: ['Convolutional Neural Networks', 'Transfer Learning', 'Healthcare 5.0', 'Predictive Modeling', 'Applied Machine Learning', 'Biomedical'],
    enrolled: 3200000,
    price: 'Free',
    image: 'medical imaging healthcare',
    description: 'Apply computer vision to healthcare and medical imaging',
    productType: 'Course',
    badge: 'New'
  },
  {
    id: '4',
    title: 'Computer Vision',
    provider: 'University of Colorado Boulder',
    rating: 4.6,
    reviews: 41,
    level: 'Intermediate',
    duration: '1 - 3 Months',
    category: 'Computer Science',
    skills: ['Computer Vision', 'Image Processing', 'Feature Detection', 'Object Recognition'],
    enrolled: 4100000,
    price: 'Free',
    image: 'computer vision technology',
    description: 'Build toward a degree in Computer Vision',
    productType: 'Specialization',
    badge: 'Free Trial'
  },
  {
    id: '5',
    title: 'Convolutional Neural Networks',
    provider: 'DeepLearning.AI',
    rating: 4.9,
    reviews: 45820,
    level: 'Intermediate',
    duration: '1 Month',
    category: 'Data Science',
    skills: ['Deep Learning', 'Convolutional Neural Network', 'Tensorflow', 'Object Detection', 'Image Recognition'],
    enrolled: 890000,
    price: 'Free',
    image: 'neural networks ai',
    description: 'Learn to build convolutional neural networks',
    productType: 'Course',
    badge: 'Free Trial'
  },
  {
    id: '6',
    title: 'Self-Driving Cars Specialization',
    provider: 'University of Toronto',
    rating: 4.7,
    reviews: 3210,
    level: 'Advanced',
    duration: '3 - 6 Months',
    category: 'Computer Science',
    skills: ['Computer Vision', 'Autonomous Driving', 'Sensor Fusion', 'Motion Planning', 'Deep Learning'],
    enrolled: 1500000,
    price: 49,
    image: 'self driving car',
    description: 'Learn the skills to build self-driving cars',
    productType: 'Specialization',
    badge: 'Free Trial'
  },
  {
    id: '7',
    title: 'Deep Learning Specialization',
    provider: 'DeepLearning.AI',
    rating: 4.9,
    reviews: 98000,
    level: 'Intermediate',
    duration: '3 - 5 Months',
    category: 'Data Science',
    skills: ['Neural Networks', 'TensorFlow', 'Computer Vision', 'NLP', 'Deep Learning'],
    enrolled: 1200000,
    price: 49,
    image: 'deep learning ai',
    description: 'Build and train neural networks for real-world applications',
    productType: 'Specialization',
    badge: 'Free Trial'
  },
  {
    id: '8',
    title: 'AI for Medical Diagnosis',
    provider: 'DeepLearning.AI',
    rating: 4.6,
    reviews: 2340,
    level: 'Intermediate',
    duration: '3 Weeks',
    category: 'Data Science',
    skills: ['Medical Imaging', 'Computer Vision', 'Deep Learning', 'Diagnostic AI', 'Healthcare'],
    enrolled: 1900000,
    price: 'Free',
    image: 'medical diagnosis doctor',
    description: 'Apply AI to medical diagnosis and imaging',
    productType: 'Course',
    badge: 'Free Trial'
  },
  {
    id: '9',
    title: 'Machine Learning',
    provider: 'Stanford University',
    rating: 4.9,
    reviews: 178000,
    level: 'Beginner',
    duration: '2 Months',
    category: 'Data Science',
    skills: ['Machine Learning', 'Logistic Regression', 'Neural Networks', 'Computer Vision'],
    enrolled: 5800000,
    price: 'Free',
    image: 'machine learning code',
    description: 'Learn the fundamentals of machine learning',
    productType: 'Course',
    badge: 'Free Trial'
  },
  {
    id: '10',
    title: 'Object Detection and Segmentation',
    provider: 'University of Washington',
    rating: 4.5,
    reviews: 1560,
    level: 'Advanced',
    duration: '4 - 6 Weeks',
    category: 'Computer Science',
    skills: ['Object Detection', 'Image Segmentation', 'YOLO', 'Mask R-CNN', 'Computer Vision'],
    enrolled: 750000,
    price: 49,
    image: 'object detection camera',
    description: 'Master object detection and image segmentation',
    productType: 'Course',
    badge: 'New'
  },
  {
    id: '11',
    title: 'Introduction to Computer Vision with Watson and OpenCV',
    provider: 'IBM',
    rating: 4.4,
    reviews: 890,
    level: 'Beginner',
    duration: '3 Weeks',
    category: 'Computer Science',
    skills: ['Computer Vision', 'OpenCV', 'Watson AI', 'Python', 'Image Processing'],
    enrolled: 620000,
    price: 'Free',
    image: 'opencv programming',
    description: 'Learn computer vision with IBM Watson and OpenCV',
    productType: 'Course',
    badge: 'Free Trial'
  },
  {
    id: '12',
    title: 'Robotics: Perception',
    provider: 'University of Pennsylvania',
    rating: 4.6,
    reviews: 2100,
    level: 'Advanced',
    duration: '2 - 3 Months',
    category: 'Computer Science',
    skills: ['Computer Vision', 'Robotics', 'Perception', 'SLAM', '3D Reconstruction'],
    enrolled: 450000,
    price: 49,
    image: 'robotics robot arm',
    description: 'Learn how robots perceive and understand their environment',
    productType: 'Course',
    badge: 'Free Trial'
  },
  {
    id: '13',
    title: 'Advanced Machine Learning with TensorFlow on GCP',
    provider: 'Google Cloud',
    rating: 4.5,
    reviews: 3450,
    level: 'Advanced',
    duration: '2 - 4 Months',
    category: 'Data Science',
    skills: ['TensorFlow', 'Computer Vision', 'Google Cloud Platform', 'Machine Learning', 'Image Classification'],
    enrolled: 580000,
    price: 'Free',
    image: 'google cloud platform',
    description: 'Advanced ML with TensorFlow on Google Cloud',
    productType: 'Specialization',
    badge: 'Free Trial'
  },
  {
    id: '14',
    title: 'Applied Data Science with Python',
    provider: 'University of Michigan',
    rating: 4.6,
    reviews: 56789,
    level: 'Intermediate',
    duration: '4 - 5 Months',
    category: 'Data Science',
    skills: ['Python', 'Data Science', 'Machine Learning', 'Computer Vision', 'Data Visualization'],
    enrolled: 2100000,
    price: 49,
    image: 'python data science',
    description: 'Learn applied data science with Python',
    productType: 'Specialization',
    badge: 'Free Trial'
  },
  {
    id: '15',
    title: 'Computer Vision with Embedded Machine Learning',
    provider: 'Edge Impulse',
    rating: 4.8,
    reviews: 456,
    level: 'Intermediate',
    duration: '1 Month',
    category: 'Computer Science',
    skills: ['Embedded Systems', 'Computer Vision', 'TinyML', 'Edge Computing', 'IoT'],
    enrolled: 320000,
    price: 'Free',
    image: 'embedded systems iot',
    description: 'Deploy computer vision on embedded devices',
    productType: 'Course',
    badge: 'New'
  },
  {
    id: '16',
    title: 'Practical Deep Learning for Coders',
    provider: 'fast.ai',
    rating: 4.8,
    reviews: 8900,
    level: 'Intermediate',
    duration: '2 Months',
    category: 'Data Science',
    skills: ['Deep Learning', 'PyTorch', 'Computer Vision', 'NLP', 'Transfer Learning'],
    enrolled: 1200000,
    price: 'Free',
    image: 'coding programming screen',
    description: 'Practical deep learning for programmers',
    productType: 'Course',
    badge: 'Free Trial'
  }
];

export const categories = [
  'All Categories',
  'Data Science',
  'Computer Science',
  'Business',
  'Information Technology',
  'Design'
];

export const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

export const durations = [
  'All Durations',
  'Less than 2 months',
  '2-4 months',
  '4-6 months',
  'More than 6 months'
];