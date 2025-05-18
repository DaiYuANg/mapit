package config

func DefaultConfig() *MapitConfig {
	return &MapitConfig{
		Http: HttpConfig{port: 7890},
		Database: DatabaseConfig{
			Type: SQLITE,
		},
	}
}
