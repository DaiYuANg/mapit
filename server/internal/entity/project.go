package entity

import (
	"github.com/google/uuid"
	"github.com/uptrace/bun"
	"time"
)

type Project struct {
	bun.BaseModel `bun:"table:projects"`

	ID        int64     `bun:",pk,autoincrement"`
	Name      string    `bun:",notnull,unique"`
	AccessKey string    `bun:",notnull,unique"` // 用于 API 鉴权，可为随机生成
	CreatedAt time.Time `bun:",nullzero,notnull,default:current_timestamp"`
	UpdatedAt time.Time `bun:",nullzero,notnull,default:current_timestamp"`

	Dictionaries []*Dictionary `bun:"rel:has-many,join:id=project_id"`
	AccessKeys   []*AccessKey  `bun:"rel:has-many,join:id=project_id"`
}
