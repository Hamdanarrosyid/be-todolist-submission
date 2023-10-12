-- CreateTable
CREATE TABLE `activities` (
    `activity_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `activities_email_key`(`email`),
    PRIMARY KEY (`activity_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `todos` (
    `todo_id` INTEGER NOT NULL AUTO_INCREMENT,
    `activity_group_id` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `priority` ENUM('VERY_HIGH', 'HIGH', 'MEDIUM', 'LOW', 'VERY_LOW') NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`todo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `todos` ADD CONSTRAINT `todos_activity_group_id_fkey` FOREIGN KEY (`activity_group_id`) REFERENCES `activities`(`activity_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
