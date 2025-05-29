module.exports = ({ env }) => ({
    'strapi-plugin-populate-deep': {
        config: {
            defaultDepth: 3, // Default is 5
        }
    },
    migrations5p: {
        enabled: true,
        config: {
            autoStart: true,
            migrationFolderPath: env('MIGRATION_PATH'),
        }
    },
    matomo: {
        config: {
            widgetURL: env('MATOMO_WIDGET_URL'),
        }
    }
});
