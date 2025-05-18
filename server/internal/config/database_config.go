package config

type DatabaseType string

const (
	SQLITE   DatabaseType = "sqlite"
	MYSQL    DatabaseType = "mysql"
	MARIADB  DatabaseType = "mariadb"
	POSTGRES DatabaseType = "postgres"
)

type DatabaseConfig struct {
	Type DatabaseType
}
