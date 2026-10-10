-- TripCraft MySQL Database Schema for XAMPP
CREATE DATABASE IF NOT EXISTS tripcraft_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tripcraft_db;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(50),
  password_hash VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user',
  avatar VARCHAR(500),
  badge VARCHAR(100) DEFAULT 'Verified Traveler',
  auth_provider VARCHAR(50) DEFAULT 'local',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pre-seed admin user
INSERT IGNORE INTO users (id, name, email, phone, role, badge, auth_provider)
VALUES ('TC-ADMIN-01', 'TripCraft Administrator', 'admin@tripcraft.com', '+91 98765 00000', 'admin', 'Master Admin', 'system');

-- 2. Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_ref VARCHAR(64) NOT NULL UNIQUE,
  user_id VARCHAR(64),
  user_name VARCHAR(255),
  user_email VARCHAR(255),
  user_phone VARCHAR(50),
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  travel_date VARCHAR(50),
  guests INT DEFAULT 1,
  adults INT DEFAULT 1,
  children INT DEFAULT 0,
  base_price DECIMAL(10, 2) DEFAULT 0.00,
  gst DECIMAL(10, 2) DEFAULT 0.00,
  discount DECIMAL(10, 2) DEFAULT 0.00,
  total_price DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'Confirmed',
  payment_mode VARCHAR(50) DEFAULT 'Prepaid',
  payment_status VARCHAR(50) DEFAULT 'Paid',
  specs_json TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Inquiries & Contact Table
CREATE TABLE IF NOT EXISTS inquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  category VARCHAR(100) DEFAULT 'General',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Wishlist Table
CREATE TABLE IF NOT EXISTS wishlist (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  price VARCHAR(50),
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Photo Albums Marketplace Table
CREATE TABLE IF NOT EXISTS marketplace_albums (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  creator_name VARCHAR(255),
  destination VARCHAR(255),
  price DECIMAL(10, 2) DEFAULT 0.00,
  photo_count INT DEFAULT 0,
  sales_count INT DEFAULT 0,
  cover_image VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
