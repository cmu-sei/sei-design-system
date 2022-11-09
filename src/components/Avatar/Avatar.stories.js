import SdsAvatar from './Avatar.vue';

export default {
    title: 'Data Visualization/Avatar',
    parameters: {
        docs: {
            description: {
                component: 'An Avatar is a visual component used to represent a person or entity.',
            },
        },
    },
    component: SdsAvatar,
    argTypes: {
        size: {
            options: ['sm', 'md', 'lg', 'auto'],
            control: {type: 'select'},
            description: 'Set the size of the avatar. Accepts "sm", "md" and "lg". Defaults to "md".'
        },
        variant: {
            options: ['random', 'gray', 'red', 'pink', 'orange', 'yellow', 'green', 'teal', 'blue', 'indigo', 'purple'],
            control: {type: 'select'},
            description: 'Set the background color of the avatar when no image is present. Defaults to "random".'
        },
        shape: {
            options: ['portrait', 'circle'],
            control: {type: 'select'},
            description: 'Set the shape of the avatar. Accepts "portrait" and "circle".'
        }
    }
};

const Template = (args) => ({
    components: {SdsAvatar},
    setup() {
        return {args}
    },
    template: `
      <div class="w-36 h-36 text-6xl font-light">
      <sds-avatar v-bind="args"/>
      </div>`
});

export const Default = Template.bind({});
Default.args = {};

