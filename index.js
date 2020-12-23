import { interpret } from 'xstate'
import { reactive } from 'vue'

class VueXstate {
    constructor (machine) {
        /**
         * Vue obsevable containing xstate's current
         * "state value" and
         * Xstate context
         */
        this.state = reactive({
            value: null,
            context: {}
        })

        /**
         * instance of the Xstate service
         */
        this.service = machine
            ? interpret(machine).onTransition(state => {
                this.state.value = state.value
                this.state.context = state.context
            })
            : {
                start () {},
                onTransition () {}
            }
    }
}

export default useMachine = new VueXstate