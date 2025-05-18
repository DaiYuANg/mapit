package cmd

import (
	"go.uber.org/fx"
	"go.uber.org/fx/fxevent"
	"go.uber.org/zap"
	"mapit/module/cache"
	"mapit/module/config"
	"mapit/module/controller"
	"mapit/module/database"
	"mapit/module/http"
	"mapit/module/logger"
	"mapit/module/repository"
	"mapit/module/service"
)

func container() *fx.App {
	return fx.New(
		logger.Module,
		config.Module,
		cache.Module,
		database.Module,
		repository.Module,
		service.Module,
		controller.Module,
		http.Module,
		fx.WithLogger(func(log *zap.Logger) fxevent.Logger {
			return &fxevent.ZapLogger{Logger: log}
		}),
	)
}
