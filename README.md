# xstate-vue
Simple xstate and vue3 integration  

## Quick Start
```
npm i xstate xstate-vue
```

## Usage Example

Dark mode toggling machine

```
<template>
    <div :class="{
        light: theme.state.matches('light'),
        dark: theme.state.matches('dark')
    }">
        <label class="toggle">
            Dark mode <input type="checkbox" @change="theme.send('TOGGLE')">
        </label>
    </div>
</template>

<script>
import { useMachine } from 'xstate-vue'
import { Machine } from 'xstate'

const themeMachine = Machine({
    id: 'theme',
    initial: 'light',
    states: {
        light: {
            on: { TOGGLE: 'dark' }
        },
        dark: {
            on: { TOGGLE: 'light' }
        }
    }
})

export default {
    data: () => ({
        theme: useMachine({ machine: themeMachine })
    })
}
</script>

<style lang="scss">
body {
    margin: 0;
    padding: 0;
}
#app {
    &, .light, .dark {
        display: block;
        min-height: 100vh;
    }

    .light {
        color: #2c3e50;
    }
    .dark {
        background: #2c3e50;
        color: #ffffff;
    }
}

.toggle {
    position: fixed;
    right: 0;
    top: 50px;
    padding: 8px 8px 8px 16px;
    background: #888888;
    border-radius: 8px 0 0 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    cursor: pointer;
}
</style>

```
