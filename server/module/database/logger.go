package database

import (
	"context"
	"time"

	"go.uber.org/zap"
	"gorm.io/gorm/logger"
	"gorm.io/gorm/utils"
)

type ZapLogger struct {
	zapLogger  *zap.Logger
	LogLevel   logger.LogLevel
	SlowThresh time.Duration
}

// 创建新的 GORM Logger
func NewZapLogger(zapLogger *zap.Logger, level logger.LogLevel) logger.Interface {
	return &ZapLogger{
		zapLogger:  zapLogger,
		LogLevel:   level,
		SlowThresh: 200 * time.Millisecond, // 慢查询阈值，可自定义
	}
}

func (l *ZapLogger) LogMode(level logger.LogLevel) logger.Interface {
	return &ZapLogger{
		zapLogger:  l.zapLogger,
		LogLevel:   level,
		SlowThresh: l.SlowThresh,
	}
}

func (l *ZapLogger) Info(ctx context.Context, msg string, data ...interface{}) {
	if l.LogLevel >= logger.Info {
		l.zapLogger.Sugar().Infof(msg, data...)
	}
}

func (l *ZapLogger) Warn(ctx context.Context, msg string, data ...interface{}) {
	if l.LogLevel >= logger.Warn {
		l.zapLogger.Sugar().Warnf(msg, data...)
	}
}

func (l *ZapLogger) Error(ctx context.Context, msg string, data ...interface{}) {
	if l.LogLevel >= logger.Error {
		l.zapLogger.Sugar().Errorf(msg, data...)
	}
}

func (l *ZapLogger) Trace(ctx context.Context, begin time.Time, fc func() (string, int64), err error) {
	if l.LogLevel <= logger.Silent {
		return
	}

	elapsed := time.Since(begin)
	sql, rows := fc()

	switch {
	case err != nil && l.LogLevel >= logger.Error:
		l.zapLogger.Error("SQL error",
			zap.String("sql", sql),
			zap.Int64("rows", rows),
			zap.Duration("elapsed", elapsed),
			zap.Error(err),
			zap.String("source", utils.FileWithLineNum()),
		)
	case elapsed > l.SlowThresh && l.LogLevel >= logger.Warn:
		l.zapLogger.Warn("Slow query",
			zap.String("sql", sql),
			zap.Int64("rows", rows),
			zap.Duration("elapsed", elapsed),
			zap.String("source", utils.FileWithLineNum()),
		)
	case l.LogLevel >= logger.Info:
		l.zapLogger.Info("Query",
			zap.String("sql", sql),
			zap.Int64("rows", rows),
			zap.Duration("elapsed", elapsed),
			zap.String("source", utils.FileWithLineNum()),
		)
	}
}
