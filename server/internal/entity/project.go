package entity

import (
	"time"
)

type Project struct {
	ID          int64     `gorm:"primaryKey;autoIncrement"`
	Name        string    `gorm:"not null;unique"`
	Description string    `gorm:"not null"`
	AccessKey   string    `gorm:"not null;unique"`
	CreatedAt   time.Time `gorm:"not null;default:CURRENT_TIMESTAMP"`
	UpdatedAt   time.Time `gorm:"not null;default:CURRENT_TIMESTAMP"`

	Dictionaries []Dictionary `gorm:"foreignKey:ProjectID"`
	AccessKeys   []AccessKey  `gorm:"foreignKey:ProjectID"`
}
