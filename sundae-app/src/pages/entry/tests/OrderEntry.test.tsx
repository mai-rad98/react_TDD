
import {render,screen,waitFor} from '../../../test-utils/testing-library'
import OrderEntry from '../OrderEntry'
import {rest} from 'msw'
import {server} from '../../../mocks/server'
import { expect,test } from '@jest/globals'
import React from 'react'

test('handles error for scoops and toppings routes', async () => {
    server.resetHandlers(
        rest.get('http://localhost:3030/scoops',(req, res,ctx ) =>
        res(ctx.status(500))
    ),
    rest.get('http://localhost:3030/toppings',(req, res,ctx ) =>
    res(ctx.status(500))
    )
    )

    render(<OrderEntry setOrderPhase={undefined} />,{})
    
    await waitFor(async () => {
        const alerts = await screen.findAllByRole('alert')
        expect(alerts).toHaveLength(2)
    })
   
})