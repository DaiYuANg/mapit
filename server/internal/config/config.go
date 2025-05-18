package config

type MapitConfig struct {
	Http     HttpConfig
	Database DatabaseConfig
}

type HttpConfig struct {
	port int
}

type CacheConfig struct {
	Type string
}
