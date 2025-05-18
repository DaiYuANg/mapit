package entity

import (
	"github.com/uptrace/bun"
	"time"
)

type Dictionary struct {
	bun.BaseModel `bun:"table:dictionaries"`

	ID        int64     `bun:",pk,autoincrement"`
	ProjectID int64     `bun:",notnull"` // 外键关联 Project
	Code      string    `bun:",notnull"` // 例如 "GENDER"
	Name      string    `bun:",notnull"` // 例如 "性别"
	CreatedAt time.Time `bun:",nullzero,notnull,default:current_timestamp"`
	UpdatedAt time.Time `bun:",nullzero,notnull,default:current_timestamp"`

	Project *Project          `bun:"rel:belongs-to,join:project_id=id"`
	Items   []*DictionaryItem `bun:"rel:has-many,join:id=dictionary_id"`
}
