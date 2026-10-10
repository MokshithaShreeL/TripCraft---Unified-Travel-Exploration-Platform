-- ==============================================================================
-- TRIPCRAFT - TRAVEL PLATFORM DATABASE SCHEMA (MySQL / SQL)
-- National Engineering College - 23CS54C Modern Web Technologies
-- Relational Database Definition with Foreign Keys, Constraints, and Indexes
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS `tripcraft_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `tripcraft_db`;

-- Drop existing tables in reverse dependency order
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `wishlists`;
DROP TABLE IF EXISTS `api_keys`;
DROP TABLE IF EXISTS `meetup_proposals`;
DROP TABLE IF EXISTS `bookings`;
DROP TABLE IF EXISTS `photo_albums`;
DROP TABLE IF EXISTS `community_buddies`;
DROP TABLE IF EXISTS `solo_trips`;
DROP TABLE IF EXISTS `transport_cabs`;
DROP TABLE IF EXISTS `transport_buses`;
DROP TABLE IF EXISTS `transport_trains`;
DROP TABLE IF EXISTS `transport_flights`;
DROP TABLE IF EXISTS `hotels`;
DROP TABLE IF EXISTS `packages`;
DROP TABLE IF EXISTS `destinations`;
DROP TABLE IF EXISTS `users`;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. USERS TABLE
CREATE TABLE `users` (
  `id` VARCHAR(50) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('admin', 'traveler', 'guide') NOT NULL DEFAULT 'traveler',
  `avatar` VARCHAR(500) DEFAULT NULL,
  `phone` VARCHAR(20) DEFAULT NULL,
  `loyalty_tier` VARCHAR(50) NOT NULL DEFAULT 'Silver',
  `loyalty_points` INT NOT NULL DEFAULT 0,
  `member_since` VARCHAR(50) DEFAULT NULL,
  `bio` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_users_email` (`email`),
  INDEX `idx_users_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. DESTINATIONS TABLE
CREATE TABLE `destinations` (
  `id` VARCHAR(50) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `state` VARCHAR(100) NOT NULL,
  `tagline` VARCHAR(255) DEFAULT NULL,
  `category` VARCHAR(50) NOT NULL,
  `hero_image` VARCHAR(500) NOT NULL,
  `rating` DECIMAL(3,2) NOT NULL DEFAULT 4.80,
  `reviews_count` INT NOT NULL DEFAULT 0,
  `base_price` DECIMAL(10,2) NOT NULL,
  `best_time_to_visit` VARCHAR(100) DEFAULT NULL,
  `weather_temp` VARCHAR(20) DEFAULT NULL,
  `weather_condition` VARCHAR(100) DEFAULT NULL,
  `weather_humidity` VARCHAR(20) DEFAULT NULL,
  `safety_score` INT NOT NULL DEFAULT 90,
  `women_safe_score` INT NOT NULL DEFAULT 90,
  `description` TEXT NOT NULL,
  `highlights` JSON DEFAULT NULL,
  `suggested_duration` VARCHAR(50) DEFAULT NULL,
  `ideal_for` JSON DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_dest_name` (`name`),
  INDEX `idx_dest_category` (`category`),
  INDEX `idx_dest_safety` (`safety_score`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. PACKAGES TABLE
CREATE TABLE `packages` (
  `id` VARCHAR(50) NOT NULL,
  `destination_id` VARCHAR(50) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `duration` VARCHAR(50) NOT NULL,
  `base_adult_price` DECIMAL(10,2) NOT NULL,
  `rating` DECIMAL(3,2) NOT NULL DEFAULT 4.90,
  `reviews_count` INT NOT NULL DEFAULT 0,
  `image` VARCHAR(500) NOT NULL,
  `theme` VARCHAR(100) NOT NULL,
  `group_discount_threshold` INT NOT NULL DEFAULT 4,
  `group_discount_percent` INT NOT NULL DEFAULT 10,
  `inclusions` JSON DEFAULT NULL,
  `exclusions` JSON DEFAULT NULL,
  `itinerary` JSON DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`destination_id`) REFERENCES `destinations`(`id`) ON DELETE CASCADE,
  INDEX `idx_pkg_destination` (`destination_id`),
  INDEX `idx_pkg_theme` (`theme`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. HOTELS TABLE
CREATE TABLE `hotels` (
  `id` VARCHAR(50) NOT NULL,
  `destination_id` VARCHAR(50) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `type` VARCHAR(100) NOT NULL,
  `stars` DECIMAL(2,1) NOT NULL DEFAULT 4.5,
  `rating` DECIMAL(3,2) NOT NULL DEFAULT 4.85,
  `reviews_count` INT NOT NULL DEFAULT 0,
  `image` VARCHAR(500) NOT NULL,
  `base_price_per_night` DECIMAL(10,2) NOT NULL,
  `max_occupancy_per_room` INT NOT NULL DEFAULT 3,
  `child_friendly` BOOLEAN NOT NULL DEFAULT TRUE,
  `amenities` JSON DEFAULT NULL,
  `location` VARCHAR(255) NOT NULL,
  `verified_partner` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`destination_id`) REFERENCES `destinations`(`id`) ON DELETE CASCADE,
  INDEX `idx_hotel_dest` (`destination_id`),
  INDEX `idx_hotel_child_friendly` (`child_friendly`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. TRANSPORT FLIGHTS TABLE
CREATE TABLE `transport_flights` (
  `id` VARCHAR(50) NOT NULL,
  `carrier` VARCHAR(100) NOT NULL,
  `flight_no` VARCHAR(50) NOT NULL,
  `from_city` VARCHAR(100) NOT NULL,
  `to_city` VARCHAR(100) NOT NULL,
  `dep_time` VARCHAR(20) NOT NULL,
  `arr_time` VARCHAR(20) NOT NULL,
  `duration` VARCHAR(50) NOT NULL,
  `stops` VARCHAR(50) NOT NULL DEFAULT 'Non-Stop',
  `adult_price` DECIMAL(10,2) NOT NULL,
  `available_seats` INT NOT NULL DEFAULT 10,
  `baggage` VARCHAR(100) DEFAULT NULL,
  `meal` VARCHAR(100) DEFAULT NULL,
  `aircraft` VARCHAR(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_flight_route` (`from_city`, `to_city`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. TRANSPORT TRAINS TABLE
CREATE TABLE `transport_trains` (
  `id` VARCHAR(50) NOT NULL,
  `train_no` VARCHAR(50) NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `from_city` VARCHAR(100) NOT NULL,
  `to_city` VARCHAR(100) NOT NULL,
  `from_station` VARCHAR(150) NOT NULL,
  `to_station` VARCHAR(150) NOT NULL,
  `dep_time` VARCHAR(20) NOT NULL,
  `arr_time` VARCHAR(20) NOT NULL,
  `duration` VARCHAR(50) NOT NULL,
  `adult_price` DECIMAL(10,2) NOT NULL,
  `available_seats` INT NOT NULL DEFAULT 20,
  `coach_class` VARCHAR(100) NOT NULL,
  `pantry` VARCHAR(150) DEFAULT NULL,
  `pnr_confirmation_rate` VARCHAR(20) DEFAULT '98%',
  PRIMARY KEY (`id`),
  INDEX `idx_train_route` (`from_city`, `to_city`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. TRANSPORT BUSES TABLE
CREATE TABLE `transport_buses` (
  `id` VARCHAR(50) NOT NULL,
  `operator` VARCHAR(150) NOT NULL,
  `bus_type` VARCHAR(150) NOT NULL,
  `from_city` VARCHAR(100) NOT NULL,
  `to_city` VARCHAR(100) NOT NULL,
  `dep_time` VARCHAR(20) NOT NULL,
  `arr_time` VARCHAR(20) NOT NULL,
  `duration` VARCHAR(50) NOT NULL,
  `adult_price` DECIMAL(10,2) NOT NULL,
  `available_seats` INT NOT NULL DEFAULT 15,
  `amenities` JSON DEFAULT NULL,
  `boarding_points` JSON DEFAULT NULL,
  `drop_points` JSON DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_bus_route` (`from_city`, `to_city`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. TRANSPORT CABS TABLE
CREATE TABLE `transport_cabs` (
  `id` VARCHAR(50) NOT NULL,
  `model` VARCHAR(150) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `capacity` INT NOT NULL,
  `luggage_capacity` VARCHAR(100) DEFAULT NULL,
  `ac` BOOLEAN NOT NULL DEFAULT TRUE,
  `per_km_rate` DECIMAL(6,2) NOT NULL,
  `base_fare` DECIMAL(10,2) NOT NULL,
  `includes_tolls_and_state_tax` BOOLEAN NOT NULL DEFAULT TRUE,
  `driver_allowance_per_day` DECIMAL(8,2) NOT NULL DEFAULT 400.00,
  `verified_chauffeur` BOOLEAN NOT NULL DEFAULT TRUE,
  `image` VARCHAR(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_cab_capacity` (`capacity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 9. SOLO TRIPS TABLE
CREATE TABLE `solo_trips` (
  `id` VARCHAR(50) NOT NULL,
  `destination_id` VARCHAR(50) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `duration` VARCHAR(50) NOT NULL,
  `stay_type` VARCHAR(255) NOT NULL,
  `safety_score` INT NOT NULL DEFAULT 95,
  `women_safe` BOOLEAN NOT NULL DEFAULT TRUE,
  `social_activities` JSON DEFAULT NULL,
  `image` VARCHAR(500) NOT NULL,
  `verified_badges` JSON DEFAULT NULL,
  `itinerary_highlight` TEXT DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`destination_id`) REFERENCES `destinations`(`id`) ON DELETE CASCADE,
  INDEX `idx_solo_safety` (`safety_score`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 10. COMMUNITY BUDDIES TABLE
CREATE TABLE `community_buddies` (
  `id` VARCHAR(50) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `avatar` VARCHAR(500) NOT NULL,
  `destination` VARCHAR(100) NOT NULL,
  `planned_dates` VARCHAR(100) NOT NULL,
  `travel_style` VARCHAR(100) NOT NULL,
  `bio` TEXT DEFAULT NULL,
  `verified_id` BOOLEAN NOT NULL DEFAULT TRUE,
  `looking_for` JSON DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_buddy_dest` (`destination`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 11. PHOTO ALBUMS TABLE
CREATE TABLE `photo_albums` (
  `id` VARCHAR(50) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `author` VARCHAR(100) NOT NULL,
  `author_avatar` VARCHAR(500) DEFAULT NULL,
  `destination` VARCHAR(150) NOT NULL,
  `price` DECIMAL(8,2) NOT NULL,
  `rating` DECIMAL(3,2) NOT NULL DEFAULT 5.00,
  `sales_count` INT NOT NULL DEFAULT 0,
  `pages_count` INT NOT NULL DEFAULT 16,
  `cover_image` VARCHAR(500) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `preview_pages` JSON DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_album_author` (`author`),
  INDEX `idx_album_dest` (`destination`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 12. BOOKINGS TABLE
CREATE TABLE `bookings` (
  `id` VARCHAR(50) NOT NULL,
  `user_id` VARCHAR(50) DEFAULT NULL,
  `item_title` VARCHAR(255) NOT NULL,
  `item_type` VARCHAR(50) NOT NULL,
  `destination` VARCHAR(150) DEFAULT NULL,
  `travel_date` DATE NOT NULL,
  `return_date` DATE DEFAULT NULL,
  `adults` INT NOT NULL DEFAULT 1,
  `children` INT NOT NULL DEFAULT 0,
  `child_ages` JSON DEFAULT NULL,
  `infants` INT NOT NULL DEFAULT 0,
  `rooms` INT NOT NULL DEFAULT 1,
  `nights` INT NOT NULL DEFAULT 1,
  `contact_info` JSON NOT NULL,
  `fare_summary` JSON NOT NULL,
  `payment_details` JSON NOT NULL,
  `status` ENUM('Confirmed', 'In-Transit', 'Completed', 'Cancelled') NOT NULL DEFAULT 'Confirmed',
  `payment_status` VARCHAR(50) NOT NULL DEFAULT 'Paid',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_booking_user` (`user_id`),
  INDEX `idx_booking_status` (`status`),
  INDEX `idx_booking_date` (`travel_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 13. MEETUP PROPOSALS TABLE
CREATE TABLE `meetup_proposals` (
  `id` VARCHAR(50) NOT NULL,
  `user_id` VARCHAR(50) NOT NULL,
  `buddy_id` VARCHAR(50) NOT NULL,
  `meetup_type` VARCHAR(150) NOT NULL,
  `proposed_date` DATE NOT NULL,
  `message` TEXT DEFAULT NULL,
  `status` ENUM('Pending', 'Accepted', 'Declined') NOT NULL DEFAULT 'Pending',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_proposal_user` (`user_id`),
  INDEX `idx_proposal_buddy` (`buddy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 14. API KEYS TABLE
CREATE TABLE `api_keys` (
  `id` VARCHAR(50) NOT NULL,
  `user_id` VARCHAR(50) NOT NULL,
  `api_key` VARCHAR(100) NOT NULL UNIQUE,
  `label` VARCHAR(100) NOT NULL DEFAULT 'Sandbox Key',
  `quota` VARCHAR(50) NOT NULL DEFAULT '10,000 req/month',
  `status` ENUM('Active', 'Revoked') NOT NULL DEFAULT 'Active',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_api_key_str` (`api_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 15. WISHLISTS TABLE
CREATE TABLE `wishlists` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `user_id` VARCHAR(50) NOT NULL,
  `item_id` VARCHAR(50) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_user_item` (`user_id`, `item_id`),
  INDEX `idx_wishlist_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
