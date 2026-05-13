CREATE TABLE `reservations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`vehicle_id` integer NOT NULL,
	`customer_name` text NOT NULL,
	`customer_email` text NOT NULL,
	`customer_phone` text NOT NULL,
	`pickup_location` text NOT NULL,
	`dropoff_location` text NOT NULL,
	`pickup_date` text NOT NULL,
	`return_date` text NOT NULL,
	`total_price` integer NOT NULL,
	`status` text DEFAULT 'pending',
	`payment_status` text DEFAULT 'unpaid',
	`notes` text,
	`created_at` integer,
	FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `vehicles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`marque` text NOT NULL,
	`modele` text NOT NULL,
	`prix` integer NOT NULL,
	`description` text NOT NULL,
	`image_data` text,
	`image_url` text,
	`categorie` text DEFAULT 'classique',
	`created_at` integer
);
