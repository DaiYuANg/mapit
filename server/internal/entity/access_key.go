package entity

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"time"
)

type AccessKey struct {
	gorm.Model
	ProjectID int64      `gorm:"not null;index"`        // 外键字段
	Key       string     `gorm:"not null;uniqueIndex"`  // 唯一 key，用于鉴权
	Name      string     `gorm:"not null"`              // 命名标识，方便管理
	Enabled   bool       `gorm:"not null;default:true"` // 启用状态
	ExpiresAt *time.Time `gorm:"default:null"`          // 可空，表示永不过期

	Project Project `gorm:"foreignKey:ProjectID"` // 外键关联
}

func GenerateAccessKey() AccessKey {
	// 推荐使用 UUIDv4 或 NanoID（如果需要短码）
	return AccessKey{
		Key: uuid.NewString(),
	}
}
