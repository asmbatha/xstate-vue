import { interpret, State } from 'xstate'
import { shallowRef } from 'vue'

export function useMachine ({ machine, config, context = {}, rehydratedState }) {
    const createdMachine = config ? machine.withConfig(config, {
        ...machine.context,
        ...context
    }) : machine

    const service = interpret(createdMachine).start(
        rehydratedState ? State.create(rehydratedState) : undefined
    )

    const state = shallowRef(service.state)

    service.onTransition((currentState) => {
        if (currentState.changed) state.value = currentState
    })

    state.value = service.state

    return { state, send: service.send, service }
}
