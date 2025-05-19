package entity

import (
	"time"
)

type Dictionary struct {
	ID        int64     `gorm:"primaryKey;autoIncrement"`
	ProjectID int64     `gorm:"not null;index"`
	Code      string    `gorm:"not null"`
	Name      string    `gorm:"not null"`
	CreatedAt time.Time `gorm:"not null;default:CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `gorm:"not null;default:CURRENT_TIMESTAMP"`

	Project Project          `gorm:"foreignKey:ProjectID"`
	Items   []DictionaryItem `gorm:"foreignKey:DictionaryID"`
}
