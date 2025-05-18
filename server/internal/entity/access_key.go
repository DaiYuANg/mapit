package entity

import (
	"github.com/google/uuid"
	"github.com/uptrace/bun"
	"time"
)

type AccessKey struct {
	bun.BaseModel `bun:"table:project_access_keys"`

	ID        int64      `bun:",pk,autoincrement"`
	ProjectID int64      `bun:",notnull"`              // 外键关联 Project
	Key       string     `bun:",notnull,unique"`       // 可使用 UUID 或短码
	Name      string     `bun:",notnull"`              // 例如："默认访问密钥"、"外部系统A"
	Enabled   bool       `bun:",notnull,default:true"` // 是否启用
	ExpiresAt *time.Time `bun:",nullzero"`             // 可选：过期时间
	CreatedAt time.Time  `bun:",nullzero,notnull,default:current_timestamp"`
	UpdatedAt time.Time  `bun:",nullzero,notnull,default:current_timestamp"`

	Project *Project `bun:"rel:belongs-to,join:project_id=id"`
}

func GenerateAccessKey() AccessKey {
	// 推荐使用 UUIDv4 或 NanoID（如果需要短码）
	return AccessKey{
		Key: uuid.NewString(),
	}
}
