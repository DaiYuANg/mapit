package http

import (
	"context"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/html/v2"
	"go.uber.org/fx"
	"mapit/views"
	"net/http"
)

var Module = fx.Module("http", fx.Provide(newTemplateEngine, newFiber), fx.Invoke(startHttp))

func newTemplateEngine() *html.Engine {
	return html.NewFileSystem(http.FS(views.Views), ".html")
}

func newFiber(engine *html.Engine) *fiber.App {
	return fiber.New(
		fiber.Config{
			Views:                 engine,
			ViewsLayout:           "layout/main",
			PassLocalsToViews:     true,
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
