package service

import (
	"go.uber.org/fx"
	"mapit/internal/service"
)

var Module = fx.Module("service", fx.Provide(service.NewProjectService))
