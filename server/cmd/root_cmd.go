package cmd

import (
	"context"
	"github.com/spf13/cobra"
)

var rootCmd = cobra.Command{
	Use: "mapit",
	RunE: func(cmd *cobra.Command, args []string) error {
		return container().Start(context.Background())
	},
}

func Execute() error {
	if err := rootCmd.Execute(); err != nil {
		return err
	}
	return nil
}
