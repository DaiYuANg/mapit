package cache

import (
	"github.com/allegro/bigcache/v3"
	"github.com/eko/gocache/lib/v4/cache"
	big_store "github.com/eko/gocache/store/bigcache/v4"
	"go.uber.org/fx"
	"time"
)

var Module = fx.Module("cache", fx.Provide(newCache))

func newCache() *cache.Cache[[]byte] {
	bigcacheClient, _ := bigcache.NewBigCache(bigcache.DefaultConfig(5 * time.Minute))
	bigcacheStore := big_store.NewBigcache(bigcacheClient)

	return cache.New[[]byte](bigcacheStore)
}
