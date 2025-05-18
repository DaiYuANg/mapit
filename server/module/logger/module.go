package logger

import (
	"context"
	"go.uber.org/fx"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"os"
)

var Module = fx.Module("logger_module", fx.Provide(newLogger, sugaredLogger), fx.Invoke(deferLogger))

func newLogger() *zap.Logger {
	encoderCfg := zap.NewDevelopmentEncoderConfig()           // 可用 zap.NewProductionEncoderConfig() 视需求选择
	encoderCfg.EncodeLevel = zapcore.CapitalColorLevelEncoder // 日志级别带颜色（INFO、ERROR 等）

	core := zapcore.NewCore(
		zapcore.NewConsoleEncoder(encoderCfg), // 关键：使用 ConsoleEncoder 而不是 JSONEncoder
		zapcore.AddSync(os.Stdout),
		zapcore.DebugLevel,
	)

	logger := zap.New(core)
	return logger
}

func sugaredLogger(log *zap.Logger) *zap.SugaredLogger {
	return log.Sugar()
}

func deferLogger(lc fx.Lifecycle, logger *zap.Logger) {
	lc.Append(fx.Hook{
		OnStop: func(ctx context.Context) error {
			return logger.Sync()
		},
	})
}
