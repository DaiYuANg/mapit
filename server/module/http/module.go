package http

import (
	"context"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/session"
	"go.uber.org/fx"
)

var Module = fx.Module("http", fx.Provide(newFiber, newSession), fx.Invoke(startHttp))

func newFiber() *fiber.App {
	return fiber.New(
		fiber.Config{
			DisableStartupMessage: false,
			EnablePrintRoutes:     true,
			StrictRouting:         true,
		})
}

func startHttp(lc fx.Lifecycle, app *fiber.App) {
	lc.Append(fx.Hook{
		OnStart: func(ctx context.Context) error {
			return app.Listen(":8080")
		},
	})
}

func newSession() *session.Store {
	return session.New()
}
