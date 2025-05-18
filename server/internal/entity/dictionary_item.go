package entity

import (
	"github.com/uptrace/bun"
	"time"
)

type DictionaryItem struct {
	bun.BaseModel `bun:"table:dictionary_items"`

	ID           int64     `bun:",pk,autoincrement"`
	DictionaryID int64     `bun:",notnull"` // 外键关联 Dictionary
	Key          string    `bun:",notnull"` // 例如 "male"
	Value        string    `bun:",notnull"` // 例如 "男"
	Sort         int       `bun:",notnull,default:0"`
	CreatedAt    time.Time `bun:",nullzero,notnull,default:current_timestamp"`
	UpdatedAt    time.Time `bun:",nullzero,notnull,default:current_timestamp"`

	Dictionary *Dictionary `bun:"rel:belongs-to,join:dictionary_id=id"`
}
