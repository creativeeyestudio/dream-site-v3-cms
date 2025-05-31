module.exports = ({ env }) => ({
    'strapi-plugin-populate-deep': {
        config: {
            defaultDepth: 3, // Default is 5
        }
    },
    migrations5p: {
        enabled: false,
        config: {
            autoStart: true,
            migrationFolderPath: env('MIGRATION_PATH'),
        }
    },
    matomo: {
        config: {
            widgetURL: env('MATOMO_WIDGET_URL'),
        }
    },
    navigation: {
        additionalFields: ['audience', { name: 'new_window', type: 'boolean', label: 'New window' }],
        contentTypes: ['api::page.page'],
        contentTypesNameFields: {
            'api::page.page': ['title']
        },
        pathDefaultFields: {
            'api::page.page': ['slug']
        },
        allowedLevels: 2,
    }
});
