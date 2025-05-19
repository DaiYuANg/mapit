package entity

import (
	"time"
)

type DictionaryItem struct {
	ID           int64     `gorm:"primaryKey;autoIncrement"`
	DictionaryID int64     `gorm:"not null;index"`
	Key          string    `gorm:"not null"`
	Value        string    `gorm:"not null"`
	Sort         int       `gorm:"not null;default:0"`
	CreatedAt    time.Time `gorm:"not null;default:CURRENT_TIMESTAMP"`
	UpdatedAt    time.Time `gorm:"not null;default:CURRENT_TIMESTAMP"`

	Dictionary Dictionary `gorm:"foreignKey:DictionaryID"`
}
