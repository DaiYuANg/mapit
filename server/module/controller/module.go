package controller

import (
	"github.com/gofiber/fiber/v2"
	"github.com/samber/lo"
	"go.uber.org/fx"
	"mapit/internal/controller"
)

var Module = fx.Module("controller",
	fx.Provide(
		fx.Annotate(
			controller.NewProjectController,
			fx.As(new(Controller)),
			fx.ResultTags(`group:"controllers"`),
		),
	),
	fx.Invoke(registerRoutes),
)

type RegisterParams struct {
	fx.In
	App        *fiber.App
	Controller []Controller `group:"controllers"`
}

func registerRoutes(params RegisterParams) {
	lo.ForEach(params.Controller, func(item Controller, index int) {
		item.RegisterRoutes(params.App)
	})
}
