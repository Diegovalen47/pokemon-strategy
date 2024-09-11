CREATE TABLE `POKEMON` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`sprite` text
);
--> statement-breakpoint
CREATE TABLE `TYPE` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `ABILITY` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`effect` text
);
--> statement-breakpoint
CREATE TABLE `ORIGIN_TYPE` (
	`pokemon_id` integer NOT NULL,
	`ability_id` integer NOT NULL,
	PRIMARY KEY(`pokemon_id`, `ability_id`),
	FOREIGN KEY (`pokemon_id`) REFERENCES `POKEMON`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`ability_id`) REFERENCES `ABILITY`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `DAMAGE_RELATION` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`relation` text DEFAULT 'normal_damage' NOT NULL,
	`origin_type_id` integer NOT NULL,
	`destiny_type_id` integer NOT NULL,
	FOREIGN KEY (`origin_type_id`) REFERENCES `TYPE`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`destiny_type_id`) REFERENCES `TYPE`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `MOVEMENT` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`type_id` integer NOT NULL,
	FOREIGN KEY (`type_id`) REFERENCES `TYPE`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `POKEMON_name_unique` ON `POKEMON` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `name_idx` ON `POKEMON` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `TYPE_name_unique` ON `TYPE` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `name_idx` ON `TYPE` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `ABILITY_name_unique` ON `ABILITY` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `name_idx` ON `ABILITY` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `MOVEMENT_name_unique` ON `MOVEMENT` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `name_idx` ON `MOVEMENT` (`name`);