-- One-course outline MVP schema extension
-- Run this in your Postgres database before relying on outline-specific fields.

BEGIN;

ALTER TABLE courses
  ADD COLUMN IF NOT EXISTS course_tagline VARCHAR(255),
  ADD COLUMN IF NOT EXISTS review_count INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS course_duration_hours DECIMAL(5, 2),
  ADD COLUMN IF NOT EXISTS instructor_image_url VARCHAR(255),
  ADD COLUMN IF NOT EXISTS instructor_title VARCHAR(255),
  ADD COLUMN IF NOT EXISTS instructor_organization VARCHAR(255),
  ADD COLUMN IF NOT EXISTS instructor_bio TEXT,
  ADD COLUMN IF NOT EXISTS instructor_rating DECIMAL(3, 2),
  ADD COLUMN IF NOT EXISTS instructor_review_count INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS instructor_student_count INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS instructor_course_count INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS skills JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS learning_outcomes JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS curriculum JSONB DEFAULT '[]'::jsonb;

COMMIT;

-- Example one-course seed payload (replace course_id with your actual ID):
UPDATE courses
SET
  course_tagline = 'In the first course of the Deep Learning Specialization, you will study the foundational concept of neural networks and deep learning.',
  review_count = 120654,
  course_duration_hours = 29,
  instructor_title = 'CEO/Founder Landing AI; Co-founder, Coursera',
  instructor_organization = 'DeepLearning.AI',
  instructor_bio = 'Andrew Ng is a globally recognized leader in AI.',
  instructor_rating = 4.9,
  instructor_review_count = 345678,
  instructor_student_count = 4234567,
  instructor_course_count = 25,
  skills = '["Deep Learning","Artificial Neural Network","Backpropagation","Python Programming","Neural Network Architecture","Tensorflow","Machine Learning"]'::jsonb,
  learning_outcomes = '["Build and train deep neural networks","Use best practices to train and develop test sets","Build a Convolutional Neural Network","Build and train Recurrent Neural Networks"]'::jsonb,
  curriculum = '[{"id":1,"title":"Introduction to Deep Learning","duration":"4 hours","description":"Understand the major trends driving the rise of deep learning.","items":[{"type":"video","title":"Welcome","duration":"1 min"}]}]'::jsonb
WHERE course_id = 'cse_326';
