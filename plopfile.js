module.exports = function (plop) {
    plop.setGenerator('page', {
        description: 'Generate new tsx react FC page',
        prompts: [
            {
                type: 'input',
                name: 'title',
                message: 'Name of FC page?'
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'src/pages/{{properCase title}}/{{properCase title}}.tsx',
                templateFile: '_templates/functionalComponent.hbs'
            },
            {
                type: 'add',
                path: 'src/pages/{{properCase title}}/index.ts',
                templateFile: '_templates/indexComponent.hbs'
            },
            {
                type: 'add',
                path: 'src/pages/{{properCase title}}/{{camelCase title}}.module.sass',
                templateFile: '_templates/styleSassPage.hbs'
            },
            {
                type: 'append',
                path: 'src/app/App.tsx',
                pattern: /(\/\/ COMPONENT IMPORTS)/g,
                template: 'import { {{properCase title}} } from \'pages/{{properCase title}}/{{properCase title}}\';'
            },
            {
                type: 'append',
                path: 'src/app/App.tsx',
                pattern: /\{\/\* COMPONENT ROUTES \*\/\}$/gm,
                template: '                        <Route path=\'/{{snakeCase title}}\' element={<{{properCase title}} />}/>'
            },
            {
                type: 'append',
                path: 'src/widgets/Navigation/Navigation.tsx',
                pattern: /\{\/\* COMPONENT LINKS \*\/\}$/gm,
                template: '                    <NavLink className={s.link} to=\'{{snakeCase title}}\'>{{camelCase title}}</NavLink>'
            }
        ]
    });
    plop.setGenerator('Feature', {
        description: 'Generate new tsx react FC feature',
        prompts: [
            {
                type: 'input',
                name: 'title',
                message: 'Name of FC?'
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'src/features/{{properCase title}}/{{properCase title}}.tsx',
                templateFile: '_templates/functionalComponent.hbs'
            },
            {
                type: 'add',
                path: 'src/features/{{properCase title}}/index.ts',
                templateFile: '_templates/indexComponent.hbs'
            },
            {
                type: 'add',
                path: 'src/features/{{properCase title}}/{{camelCase title}}.module.sass',
                templateFile: '_templates/styleSassComponent.hbs'
            }
        ]
    });
    plop.setGenerator('Widget', {
        description: 'Generate new tsx react FC widget',
        prompts: [
            {
                type: 'input',
                name: 'title',
                message: 'Name of FC?'
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'src/widgets/{{properCase title}}/{{properCase title}}.tsx',
                templateFile: '_templates/functionalComponent.hbs'
            },
            {
                type: 'add',
                path: 'src/widgets/{{properCase title}}/index.ts',
                templateFile: '_templates/indexComponent.hbs'
            },
            {
                type: 'add',
                path: 'src/widgets/{{properCase title}}/{{camelCase title}}.module.sass',
                templateFile: '_templates/styleSassComponent.hbs'
            }
        ]
    });
};