package database

import (
	"go.uber.org/fx"
	"go.uber.org/zap"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	gormLogger "gorm.io/gorm/logger"
	"mapit/internal/entity"
)

var Module = fx.Module("database", fx.Provide(newDatabase), fx.Invoke(executeMigrations))

func newDatabase(logger *zap.Logger) (*gorm.DB, error) {
	zapGormLogger := NewZapLogger(logger, gormLogger.Info)
	db, err := gorm.Open(sqlite.Open("file::memory:?cache=shared"), &gorm.Config{
		Logger: zapGormLogger,
	})
	return db, err
}

func executeMigrations(db *gorm.DB) error {
	return db.AutoMigrate(
		&entity.Project{},
		&entity.AccessKey{},
		&entity.Dictionary{},
		&entity.DictionaryItem{},
	)
}
