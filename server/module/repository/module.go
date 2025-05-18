package repository

import (
	"go.uber.org/fx"
	"mapit/internal/repository"
)

var Module = fx.Module("repository", fx.Provide(repository.NewProjectRepository))
